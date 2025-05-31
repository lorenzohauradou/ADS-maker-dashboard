import { Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Prezzi", href: "#pricing" },
      { name: "Demo", href: "#demo" },
      { name: "API", href: "#api" },
    ],
    company: [
      { name: "Chi Siamo", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Carriere", href: "#careers" },
      { name: "Contatti", href: "#contact" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Documentazione", href: "#docs" },
      { name: "Status", href: "#status" },
      { name: "Community", href: "#community" },
    ],
    legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Termini", href: "#terms" },
      { name: "Cookie", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/adsmakerlogo.png"
                  alt="ADS MAKER AI Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                ADS MAKER AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              L'AI che trasforma le tue immagini in video ads professionali in 1 minuto.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Prodotto</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Azienda</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Supporto</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legale</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 ADS MAKER AI. Tutti i diritti riservati.</p>
          <p className="text-muted-foreground text-xs mt-4 md:mt-0">Made with ❤️ in Italy</p>
        </div>
      </div>
    </footer>
  )
}
