import { Twitter, Linkedin, Youtube, Instagram, Globe } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const links = {
    company: [
      { name: "About us", href: "/about" },
      { name: "Contact Us", href: "#contact" },
    ],
    product: [
      { name: "AI Video Creation", href: "#ai-video" },
      { name: "Dropshipping Ads", href: "/dropshipping-video-ads" },
      { name: "TikTok Ads", href: "/tiktok-video-ads" },
      { name: "Instagram Ads", href: "/instagram-video-ads" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Help center", href: "#help" },
      { name: "Learning center", href: "#learning" },
    ],
    bestPractices: [
      { name: "How to Create Viral Video Ads: The Ultimate Guide for 2024", href: "#guide-2024" },
      { name: "AI Video Marketing: Best Practices", href: "#ai-marketing-guide" },
    ],
    trustAndLegal: [
      { name: "Terms and Conditions", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Cookies Preferences", href: "#cookies" },
    ],
  }

  return (
    <footer className="px-4 py-8">
      <div className="container mx-auto">
        <div className="bg-[#1F1F1F] rounded-3xl p-8 lg:p-12">
          {/* Language Selector */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Globe className="w-4 h-4" />
              <span className="text-sm">English</span>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-base">Company</h3>
              <ul className="space-y-4">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-base">Product</h3>
              <ul className="space-y-4">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-base">Resources</h3>
              <ul className="space-y-4">
                {links.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Practices */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-base">Best Practices</h3>
              <ul className="space-y-4">
                {links.bestPractices.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm leading-relaxed"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust and Legal */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-base">Trust and Legal</h3>
              <ul className="space-y-4">
                {links.trustAndLegal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-600 pt-8 flex flex-col lg:flex-row justify-between items-center">

            {/* Left side - Logo and Copyright */}
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/fastadslogo.png"
                    alt="FAST ADS AI Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FAST ADS AI
                </span>
              </div>

              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © 2025 Fast Ads AI by FastAds Inc. All rights reserved.
              </p>
            </div>

            {/* Right side - Social Icons */}
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
