import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, ShoppingCart, Briefcase, Target, Palette, BarChart } from "lucide-react"

export function FeaturesSection() {
  const specializations = [
    {
      icon: Code,
      title: "SaaS/Tech",
      description: "Script professionali, voce autorevole, focus su ROI e metriche",
      example: '"Ancora perdi tempo con deployment manuali?"',
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Voce coinvolgente, lifestyle shots, focus su qualità prodotto",
      example: '"Ecco perché 10K+ clienti amano questo prodotto"',
    },
    {
      icon: Briefcase,
      title: "Servizi Professionali",
      description: "Voce credibile, before/after, testimonianze e case study",
      example: '"Come aziende Fortune 500 ottengono risultati straordinari"',
    },
  ]

  const differentiators = [
    {
      icon: Target,
      title: "vs Canva/CapCut",
      points: ["Specializzato per ADS", "AI Script Generation", "Voce umana realistica"],
    },
    {
      icon: Palette,
      title: "vs Agenzie",
      points: ["5 minuti vs 2-4 settimane", "€20/mese vs €10K", "Infinite varianti A/B"],
    },
    {
      icon: BarChart,
      title: "vs Luma/Runway",
      points: ["Business-focused", "Immagini reali", "ROI immediato"],
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Specializations */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
            >
              Specializzazione AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Non un Video Editor Generico</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI specializzata che comprende il tuo tipo di business e crea contenuti ottimizzati
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mb-4">
                  <spec.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{spec.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{spec.description}</p>
                <div className="bg-muted/50 rounded-lg p-3 border-l-2 border-purple-500">
                  <div className="text-xs text-muted-foreground mb-1">Esempio Script:</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 italic">{spec.example}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perché ADS MAKER AI è <span className="text-yellow-600 dark:text-yellow-400">Diverso</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Non siamo l'ennesimo tool di editing. Siamo la prima AI specializzata per video ads che convertono.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg mb-4">
                  <diff.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{diff.title}</h3>
                <ul className="space-y-2">
                  {diff.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mr-3"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
