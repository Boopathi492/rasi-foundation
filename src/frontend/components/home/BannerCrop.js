import Image from 'next/image';

// The only photography supplied is the five banner artworks (2000x750 reference grid). This shows one clean
// region of a banner as a photo. `region` is {x, y, w, h} in that 2000x750 grid; the box takes the region's
// aspect ratio unless `fill` is set (then the parent decides the size and the region must match its ratio).
const GRID_W = 2000;

export default function BannerCrop({ src, alt, region, fill = false, sizes = '(min-width: 1024px) 40vw, 90vw', className = '', priority = false }) {
  const { x, y, w, h } = region;
  return (
    <div
      className={`relative overflow-hidden bg-brand-100 ${className}`}
      style={fill ? undefined : { aspectRatio: `${w} / ${h}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={2048}
        height={768}
        sizes={sizes}
        priority={priority}
        className="absolute max-w-none"
        style={{
          width: `${(GRID_W / w) * 100}%`,
          height: 'auto',
          left: `${-(x / w) * 100}%`,
          top: `${-(y / h) * 100}%`,
        }}
      />
    </div>
  );
}
