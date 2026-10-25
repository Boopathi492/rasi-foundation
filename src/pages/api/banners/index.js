import dbConnect from '@/backend/lib/mongodb';
import Banner from '@/backend/models/Banner';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { placement = 'home_hero', page } = req.query;
    const now = new Date();

    const query = {
      isActive: true,
      archived: { $ne: true },
      $and: [
        { $or: [{ startsAt: null }, { startsAt: { $exists: false } }, { startsAt: { $lte: now } }] },
        { $or: [{ endsAt: null }, { endsAt: { $exists: false } }, { endsAt: { $gte: now } }] },
      ],
    };

    if (placement && placement !== 'all') {
      query.placement = placement;
    }

    if (page && typeof page === 'string') {
      query.$or = [{ targetPages: { $size: 0 } }, { targetPages: page }];
    }

    const banners = await Banner.find(query).sort({ order: 1, createdAt: -1 }).lean();

    const formatted = banners.map((b) => ({
      id: b._id,
      title: b.title,
      description: b.description || '',
      altText: b.altText || b.title,
      ctaText: b.ctaText || '',
      ctaUrl: b.ctaUrl || '',
      placement: b.placement,
      order: b.order || 0,
      transitionMs: b.transitionMs || 5000,
      desktopImageUrl: b.desktopImage?.storageKey
        ? `/api/banners/${b._id}/image?type=desktop`
        : '',
      mobileImageUrl: b.mobileImage?.storageKey
        ? `/api/banners/${b._id}/image?type=mobile`
        : (b.desktopImage?.storageKey ? `/api/banners/${b._id}/image?type=desktop` : ''),
    }));

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ success: true, banners: formatted });
  } catch (err) {
    console.error('[Public Banners Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
}
