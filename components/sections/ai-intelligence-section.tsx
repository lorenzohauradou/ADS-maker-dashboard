export function AIIntelligenceSection() {
    return (
        <section className="py-20 px-4 bg-[#000000]">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white leading-tight">
                        AI that enhances
                        <br />
                        your video
                    </h2>
                    <p className="text-lg md:text-xl text-[#9ca3af] max-w-4xl mx-auto leading-relaxed">
                        The most powerful AI editing models that work on any video. Built for speed, accuracy, and
                        creative flexibility.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden bg-[#2a2a2a] border border-[#3a3a3a] p-8">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold text-white mb-6">ClipAnything</h3>

                                <div className="mb-8">
                                    <label className="text-sm text-[#9ca3af] mb-2 block">Prompt</label>
                                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                        <p className="text-[#d1d5db]">Moment most likely to go viral on social media</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {["Shower", "Airplane", "Surprise"].map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm text-[#d1d5db]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="aspect-video bg-black/40 rounded-lg overflow-hidden">
                                        <video
                                            className="w-full h-full object-cover"
                                            src="/demo_clip1.mp4"
                                            loop
                                            muted
                                            autoPlay
                                            playsInline
                                        />
                                    </div>
                                    <div className="aspect-video bg-black/40 rounded-lg overflow-hidden">
                                        <video
                                            className="w-full h-full object-cover"
                                            src="/demo_clip2.mp4"
                                            loop
                                            muted
                                            autoPlay
                                            playsInline
                                        />
                                    </div>
                                    <div className="aspect-video bg-black/40 rounded-lg overflow-hidden">
                                        <video
                                            className="w-full h-full object-cover"
                                            src="/demo_clip3.mp4"
                                            loop
                                            muted
                                            autoPlay
                                            playsInline
                                        />
                                    </div>
                                </div>

                                <p className="text-[#9ca3af] text-sm leading-relaxed">
                                    Every other AI clipping tool only works with video podcasts. ClipAnything is the only
                                    AI clipping model that turns any genre — vlogs, gaming, sports, interviews, explainer
                                    videos — into viral clips in 1 click.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden bg-[#2a2a2a] border border-[#3a3a3a] p-8">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold text-white mb-6">ReframeAnything</h3>

                                <div className="aspect-video bg-black/40 rounded-lg overflow-hidden mb-8">
                                    <div className="relative w-full h-full">
                                        <video
                                            className="w-full h-full object-cover"
                                            src="/demo_reframe.mp4"
                                            loop
                                            muted
                                            autoPlay
                                            playsInline
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
                                            16:9
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[#9ca3af] text-sm leading-relaxed">
                                    The only AI reframe model that resizes any video for any platform and keeps moving
                                    subjects centered with AI object tracking. If you want more control, use manual
                                    tracking to instruct AI exactly what to follow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 