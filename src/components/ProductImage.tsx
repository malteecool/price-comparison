import Image from 'next/image'

const brandColors: Record<string, { bg: string; fg: string }> = {
  Apple:   { bg: '#1d1d1f', fg: '#f5f5f7' },
  Samsung: { bg: '#1428a0', fg: '#ffffff' },
  Sony:    { bg: '#000000', fg: '#ffffff' },
  LG:      { bg: '#a50034', fg: '#ffffff' },
  Bose:    { bg: '#2c2c2c', fg: '#ffffff' },
  Google:  { bg: '#4285f4', fg: '#ffffff' },
  Dell:    { bg: '#007db8', fg: '#ffffff' },
  Lenovo:  { bg: '#e2231a', fg: '#ffffff' },
  ASUS:    { bg: '#00539b', fg: '#ffffff' },
}

function getColors(brand: string | null) {
  if (brand && brand in brandColors) return brandColors[brand]
  return { bg: '#2a2a2a', fg: '#ffffff' }
}

interface ProductImageProps {
  src: string | null
  alt: string
  brand: string | null
  /** Tailwind classes applied to the outer container — must set dimensions */
  className?: string
  sizes?: string
}

export function ProductImage({ src, alt, brand, className = '', sizes }: ProductImageProps) {
  const { bg, fg } = getColors(brand)
  const initial = brand?.[0]?.toUpperCase() ?? '?'

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center select-none ${className}`}
        style={{ background: bg }}
        aria-label={alt}
      >
        <span
          className="font-semibold text-4xl opacity-30"
          style={{ color: fg }}
        >
          {initial}
        </span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '(max-width: 768px) 100vw, 400px'}
        className="object-contain p-4"
      />
    </div>
  )
}
