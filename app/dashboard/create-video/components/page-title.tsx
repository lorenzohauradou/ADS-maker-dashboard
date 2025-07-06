"use client"

interface PageTitleProps {
    title: string
    subtitle?: string
    centered?: boolean
}

export function PageTitle({ title, subtitle, centered = true }: PageTitleProps) {
    return (
        <div className={`space-y-6 ${centered ? 'text-center' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    )
} 