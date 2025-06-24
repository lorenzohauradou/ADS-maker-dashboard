import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
    current?: boolean
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export function BreadcrumbsSEO({ items, className = '' }: BreadcrumbsProps) {
    // Genera structured data per i breadcrumbs
    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://fastadsai.com${item.href}`
        }))
    }

    return (
        <>
            {/* Structured Data per SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbStructuredData)
                }}
            />

            {/* Breadcrumbs visivi */}
            <nav
                aria-label="Breadcrumb"
                className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
            >
                <Link
                    href="/"
                    className="hover:text-foreground transition-colors flex items-center"
                    aria-label="Home"
                >
                    <Home className="w-4 h-4" />
                </Link>

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        {item.current ? (
                            <span
                                className="text-foreground font-medium"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </>
    )
} 