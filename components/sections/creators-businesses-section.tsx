"use client"

export function CreatorsBusinessesSection() {
    // Prima fila - Creators con avatar circolari
    const creators = [
        { name: "Vultertainment", followers: "12M", avatar: "V" },
        { name: "Jubilee Media", followers: "9.79M", avatar: "J" },
        { name: "Tom Bilyeu", followers: "4.5M", avatar: "T" },
        { name: "Jacksfilms", followers: "5.08M", avatar: "J" },
        { name: "Mark Rober", followers: "65.9M", avatar: "M" },
        { name: "Grant Cardone", followers: "4.7M", avatar: "G" },
        { name: "Scott Galloway", followers: "192K", avatar: "S" },
        { name: "What If", followers: "7.9M", avatar: "W" },
        { name: "Jenny Hoyos", followers: "1.2M", avatar: "J" },
    ]

    // Seconda fila - Brands/Companies
    const companies = [
        { name: "VISA", logo: "VISA" },
        { name: "Audacy", logo: "audacy" },
        { name: "Univision", logo: "univision" },
        { name: "CHILI PIPER", logo: "CHILI PIPER" },
        { name: "GitHub", logo: "GitHub" },
        { name: "Telefónica", logo: "Telefónica" },
        { name: "NVIDIA", logo: "NVIDIA" },
        { name: "iHeartMedia", logo: "iHeartMedia" },
    ]

    return (
        <section className="py-16 px-4 bg-black text-white overflow-hidden">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-lg text-gray-400 font-normal">
                        Used by 12M+ creators and businesses
                    </h2>
                </div>

                {/* Prima striscia - Creators (sinistra → destra) */}
                <div className="relative mb-8">
                    <div className="flex animate-scroll-left">
                        {[...creators, ...creators, ...creators].map((creator, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center mx-8">
                                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                                    {creator.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{creator.name}</div>
                                    <div className="text-gray-400 text-sm">{creator.followers}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seconda striscia - Companies (destra → sinistra) */}
                <div className="relative">
                    <div className="flex animate-scroll-right">
                        {[...companies, ...companies, ...companies].map((company, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center justify-center mx-12">
                                <div className="text-white font-bold text-lg">
                                    {company.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
} 