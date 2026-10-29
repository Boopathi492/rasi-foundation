import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const TAMIL_NADU_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
  'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai',
  'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
  'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
  'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const COLLEGE_TYPES = [
  'Engineering',
  'Arts & Science',
  'Medical',
  'Polytechnic',
  'Law',
  'Management',
  'Education',
  'Agriculture',
  'Other'
];

export function normalizeName(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // remove parenthetical like (Autonomous)
    .replace(/[^a-z0-9]/g, '')
    .trim();
}
