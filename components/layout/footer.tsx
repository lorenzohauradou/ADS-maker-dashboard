import { Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" },
      { name: "API", href: "#api" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Documentation", href: "#docs" },
      { name: "Status", href: "#status" },
      { name: "Community", href: "#community" },
    ],
    legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Cookies", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Mobile: Stack tutto verticalmente, Tablet: 2 colonne, Desktop: 5 colonne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">

          {/* Brand Section - Su mobile prende tutta la larghezza, su desktop 1 colonna */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/adsmakerlogo.png"
                  alt="ADS MAKER AI Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                FAST ADS AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto sm:mx-0">
              The AI that transforms your images into professional video ads in 1 minute.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Link Sections - Su mobile ogni sezione prende tutta la larghezza */}

          {/* Product Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-base">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm block py-1 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm block py-1 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-base">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm block py-1 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm block py-1 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section - Responsive layout */}
        <div className="border-t border-border mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © 2024 ADS MAKER AI. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs text-center sm:text-right">
            Made with ❤️ in Italy
          </p>
        </div>
      </div>
    </footer>
  )
}
