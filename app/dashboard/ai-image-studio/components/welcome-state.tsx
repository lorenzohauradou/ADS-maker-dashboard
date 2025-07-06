import { Palette, Zap, Scissors } from "lucide-react"

export const WelcomeState = () => (
    <div className="text-center py-20 px-8 relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-gentle-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-xl animate-gentle-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl animate-float" />
        </div>

        {/* Welcome Content */}
        <div className="space-y-6 max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
                    Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Image Studio
                </span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
                Transform any product photo into
                <span className="font-semibold text-blue-600 dark:text-blue-400"> professional assets</span> for
                e-commerce and marketing, ready for
                <span className="font-semibold text-purple-600 dark:text-purple-400"> Amazon, Shopify</span> and
                social media.
            </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 relative z-10 stagger-fade-in">
            {[
                { icon: <Palette className="w-4 h-4" />, text: "Professional Studio", color: "blue" },
                { icon: <Zap className="w-4 h-4" />, text: "Cinematic Lighting", color: "amber" },
                { icon: <Scissors className="w-4 h-4" />, text: "Transparent Background", color: "purple" }
            ].map((feature, index) => (
                <div
                    key={index}
                    className={`
                        group flex items-center gap-3 px-6 py-3 
                        bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm 
                        rounded-full shadow-lg border border-slate-200/50 dark:border-zinc-700/50
                        hover-lift hover:shadow-xl transition-all duration-300
                        ${feature.color === 'blue' ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : ''}
                        ${feature.color === 'amber' ? 'hover:bg-amber-50 dark:hover:bg-amber-900/20' : ''}
                        ${feature.color === 'purple' ? 'hover:bg-purple-50 dark:hover:bg-purple-900/20' : ''}
                    `}
                >
                    <div className={`
                        p-2 rounded-lg text-white transition-all duration-300
                        ${feature.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700' : ''}
                        ${feature.color === 'amber' ? 'bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700' : ''}
                        ${feature.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700' : ''}
                    `}>
                        {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {feature.text}
                    </span>
                </div>
            ))}
        </div>

        {/* Subtle Call to Action */}
        <div className="mt-16 text-slate-500 dark:text-zinc-500 text-lg font-light">
            Upload your first image to get started ✨
        </div>
    </div>
) 