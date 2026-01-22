'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRef, useState, useEffect } from 'react'

interface NavigationPillProps {
    items: Array<{ key: string; label: string; href: string }>
    selectedKey: string | null
}

export function NavigationPill({ items, selectedKey }: NavigationPillProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const activeIndex = items.findIndex(item => item.key === selectedKey)
        const activeElement = container.children[activeIndex] as HTMLElement | undefined

        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
            })
        } else {
            // Default to first item if nothing selected
            const firstElement = container.children[0] as HTMLElement | undefined
            if (firstElement) {
                setIndicatorStyle({
                    left: firstElement.offsetLeft,
                    width: firstElement.offsetWidth,
                })
            }
        }
    }, [selectedKey, items])

    return (
        <div className="relative inline-flex items-center rounded-full bg-muted/60 p-1 backdrop-blur-sm">
            {/* Animated background indicator */}
            <motion.div
                className="absolute h-[calc(100%-8px)] rounded-full bg-background shadow-sm"
                initial={false}
                animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                }}
            />

            {/* Navigation items */}
            <div ref={containerRef} className="relative z-10 flex items-center">
                {items.map((item) => (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={cn(
                            'relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap',
                            selectedKey === item.key
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground/80'
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
