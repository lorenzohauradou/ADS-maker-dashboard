"use client"

import Image from "next/image"

export function LogoExport() {
    return (
        <div className="p-8 space-y-12">
            {/* Logo Principale Header (400x100) */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Header Logo (400x100px) - Ready for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center space-x-3 w-[400px] h-[100px] justify-center bg-white"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            FAST ADS AI
                        </span>
                    </div>
                </div>
            </div>

            {/* Logo Grande Alta Risoluzione (800x200) */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">High Resolution (800x200px) - Ready for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center space-x-6 w-[800px] h-[200px] justify-center bg-white"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                        <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            FAST ADS AI
                        </span>
                    </div>
                </div>
            </div>

            {/* Logo per Social Media OG (1200x630) - Versione REALE */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Social Media OG (1200x630px) - FULL SIZE for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex flex-col items-center justify-center space-y-6 w-[1200px] h-[630px] bg-gradient-to-br from-slate-50 to-blue-50"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                        <span className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                            FAST ADS AI
                        </span>
                        <p className="text-3xl text-slate-600 text-center font-medium">
                            Create Viral Video Ads in Minutes
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Quadrato per Social (1200x1200) - Versione REALE */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Square Social (1200x1200px) - FULL SIZE for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex flex-col items-center justify-center space-y-8 w-[1200px] h-[1200px] bg-gradient-to-br from-slate-50 to-blue-50"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                        <span className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center leading-none">
                            FAST ADS AI
                        </span>
                        <p className="text-4xl text-slate-600 text-center font-medium">
                            AI-Powered Video Ads
                        </p>
                    </div>
                </div>
            </div>

            {/* Twitter Card (1200x600) */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Twitter Card (1200x600px) - Ready for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center justify-center space-x-12 w-[1200px] h-[600px] bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={200}
                            height={200}
                            className="object-contain filter brightness-0 invert"
                        />
                        <div className="text-center">
                            <span className="text-8xl font-bold text-white block">
                                FAST ADS AI
                            </span>
                            <p className="text-3xl text-blue-100 mt-4">
                                Create Viral Video Ads in 3 Minutes! 🚀
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apple Touch Icon (180x180) */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Apple Touch Icon (180x180px) - Ready for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center justify-center w-[180px] h-[180px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-[40px]"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={120}
                            height={120}
                            className="object-contain filter brightness-0 invert"
                        />
                    </div>
                </div>
            </div>

            {/* Favicon (32x32) */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Favicon (32x32px) - Ready for Screenshot</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center justify-center w-[32px] h-[32px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={24}
                            height={24}
                            className="object-contain filter brightness-0 invert"
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Screenshot this and save as favicon.ico</p>
            </div>

            {/* Versione Solo Testo */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Text Only Version (400x80px)</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center justify-center w-[400px] h-[80px] bg-white"
                    >
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            FAST ADS AI
                        </span>
                    </div>
                </div>
            </div>

            {/* Versione Dark */}
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-4">Dark Version (400x100px)</h3>
                <div className="border-2 border-dashed border-red-300 p-1 inline-block">
                    <div
                        className="flex items-center space-x-3 w-[400px] h-[100px] justify-center bg-gray-900 rounded-lg"
                    >
                        <Image
                            src="/adsmakerlogo.png"
                            alt="Fast Ads AI"
                            width={60}
                            height={60}
                            className="object-contain filter brightness-0 invert"
                        />
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                            FAST ADS AI
                        </span>
                    </div>
                </div>
            </div>

            {/* Istruzioni */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-4">📸 Screenshot Instructions</h3>
                <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>🎯 Red Dashed Border:</strong> Shows EXACT area to screenshot</p>
                    <p><strong>💾 How to save:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                        <li><strong>og-image.png:</strong> Screenshot the "Social Media OG" area</li>
                        <li><strong>twitter-image.png:</strong> Screenshot the "Twitter Card" area</li>
                        <li><strong>og-square.png:</strong> Screenshot the "Square Social" area</li>
                        <li><strong>apple-touch-icon.png:</strong> Screenshot the "Apple Touch Icon" area</li>
                        <li><strong>favicon.ico:</strong> Screenshot the "Favicon" area and convert to .ico</li>
                        <li><strong>header-logo.png:</strong> Screenshot the "Header Logo" area</li>
                        <li><strong>logo-dark.png:</strong> Screenshot the "Dark Version" area</li>
                    </ul>
                    <p><strong>✅ PNG Advantages:</strong> Supports transparency, better quality for logos</p>
                    <p><strong>🔧 Tools:</strong> Use browser dev tools or screenshot extensions for pixel-perfect capture</p>
                    <p><strong>📱 Social Platforms Accept:</strong> PNG, JPG, WEBP - PNG is recommended!</p>
                </div>
            </div>
        </div>
    )
} 