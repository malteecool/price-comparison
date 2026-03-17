'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import type { CategoryNode } from '@/lib/database.types'

interface Props {
  tree: CategoryNode[]
}

export function CategoryNav({ tree }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleMouseEnter(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(id)
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(null), 120)
  }

  return (
    <nav className="hidden md:flex items-center gap-1">
      {tree.map(parent => (
        <div
          key={parent.id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(parent.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={`/?category=${parent.slug}`}
            className="px-3 py-1.5 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            {parent.name}
          </Link>

          {parent.children.length > 0 && open === parent.id && (
            <div
              className="absolute top-full left-0 mt-1 min-w-44 border border-foreground/10 rounded-xl bg-background shadow-lg py-1 z-50"
              onMouseEnter={() => handleMouseEnter(parent.id)}
              onMouseLeave={handleMouseLeave}
            >
              {parent.children.map(child => (
                <Link
                  key={child.id}
                  href={`/?category=${child.slug}`}
                  className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  onClick={() => setOpen(null)}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
