import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Clean and sanitize a connection URI:
 * 1. Trims whitespace
 * 2. Strips surrounding quotes (single or double)
 */
export function sanitizeMongoUri(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let uri = raw.trim();
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }
  return uri;
}

/**
 * Returns a completely safe, non-sensitive diagnostic snapshot of the URI.
 * NEVER returns or prints the password.
 */
export function getSafeMongoDiagnostics(uri) {
  if (!uri) {
    return { configured: false, error: 'MONGODB_URI is not set' };
  }

  try {
    const parsed = new URL(uri);
    const hasPassword = Boolean(parsed.password);
    const searchParams = parsed.searchParams;
    const queryKeys = Array.from(searchParams.keys());
    const authSourceParam = searchParams.get('authSource');

    return {
      configured: true,
      protocol: parsed.protocol,
      host: parsed.host,
      database: parsed.pathname ? parsed.pathname.replace(/^\//, '') : '',
      username: parsed.username || '(anonymous)',
      passwordConfigured: hasPassword,
      passwordLength: hasPassword ? parsed.password.length : 0,
      authSource: authSourceParam || (parsed.username ? 'defaulted_to_admin' : 'none'),
      params: queryKeys,
    };
  } catch (err) {
    const isSrv = uri.startsWith('mongodb+srv://');
    return {
      configured: true,
      protocol: isSrv ? 'mongodb+srv:' : (uri.startsWith('mongodb://') ? 'mongodb:' : 'unknown'),
      parseError: err.message,
    };
  }
}

async function dbConnect() {
  const rawUri = process.env.MONGODB_URI || MONGODB_URI;
  const uri = sanitizeMongoUri(rawUri);

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Optimizations for serverless (Vercel)
      maxPoolSize: 5,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 30000,
    };

    // If connecting to an authenticated cluster (like MongoDB Atlas) and authSource
    // is not explicitly specified in the URI, default authSource to 'admin' where
    // Atlas database users are created by default.
    try {
      const parsed = new URL(uri);
      if (parsed.username && !parsed.searchParams.has('authSource')) {
        opts.authSource = 'admin';
      }
    } catch {
      // If URL parsing fails (e.g. unencoded character in password), proceed
      // and let the mongoose driver handle or report diagnostic error.
    }

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    const diag = getSafeMongoDiagnostics(uri);
    console.error('MongoDB connection error:', e.message);
    console.error('[MongoDB Safe Diagnostics]:', JSON.stringify({
      code: e.code || 'UNKNOWN',
      codeName: e.codeName || 'UNKNOWN',
      protocol: diag.protocol,
      host: diag.host,
      database: diag.database,
      username: diag.username,
      passwordConfigured: diag.passwordConfigured,
      passwordLength: diag.passwordLength,
      authSource: diag.authSource,
      params: diag.params,
    }));

    if (e.message && e.message.includes('bad auth')) {
      console.error(
        '[MongoDB Atlas Auth Resolution Guide]:\n' +
        '1. Ensure the database user exists in MongoDB Atlas under Security > Database Access.\n' +
        `2. Ensure user "${diag.username}" has Read & Write privileges on database "${diag.database || 'rasi-foundation'}".\n` +
        '3. Verify or reset the database user password in Atlas, ensuring alphanumeric characters or URL-encoded special characters.\n' +
        '4. In Vercel Project Settings > Environment Variables, verify MONGODB_URI matches:\n' +
        '   mongodb+srv://<username>:<password>@' + (diag.host || 'cluster1.n12u8v2.mongodb.net') + '/' + (diag.database || 'rasi-foundation') + '?retryWrites=true&w=majority&authSource=admin\n' +
        '   (Ensure NO surrounding quotes or accidental spaces in Vercel).'
      );
    }
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
