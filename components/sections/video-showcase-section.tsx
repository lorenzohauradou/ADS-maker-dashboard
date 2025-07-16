export function VideoShowcaseSection() {
    return (
        <section className="py-12 md:py-20 px-4 bg-[#000000]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                            AI VIDEO CREATION
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
                        AI that creates with you,
                        <br />
                        <span className="text-gray-400">not just for you</span>
                    </h2>

                    <p className="text-base md:text-xl text-[#9ca3af] max-w-3xl mx-auto px-4">
                        Take full product control, or let our AI take over. Either way, it's effortless.
                    </p>
                </div>

                {/* Video Container - responsive padding */}
                <div className="relative rounded-2xl md:rounded-3xl p-4 md:p-8">
                    <div className="relative aspect-video bg-transparent rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center">
                        {/* Video Placeholder */}
                        <div className="absolute inset-0 bg-[#1a1a1a]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
} 