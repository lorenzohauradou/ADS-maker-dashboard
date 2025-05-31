"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle, Zap } from "lucide-react"

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "Quanto tempo ci vuole davvero per creare un video?",
            answer: "Il processo completo richiede 3-5 minuti: 30 secondi per l'upload delle immagini, 1-2 minuti per l'analisi AI, 1-2 minuti per la generazione del video e 30 secondi per il download. È letteralmente più veloce di preparare un caffè!"
        },
        {
            question: "Quali tipi di business funzionano meglio?",
            answer: "ADS MAKER AI è ottimizzato per e-commerce, SaaS, servizi professionali, app mobile, ristoranti e retail. L'AI riconosce automaticamente il tipo di prodotto e adatta voce, script e stile di conseguenza. Se vendi prodotti fisici o servizi digitali, funzionerà perfettamente."
        },
        {
            question: "La voce sembra davvero umana?",
            answer: "Sì! Utilizziamo la tecnologia TTS più avanzata disponibile. La voce è indistinguibile da un attore professionale, con intonazione naturale, pause corrette e enfasi sui punti chiave. Molti clienti ci chiedono se usiamo veri doppiatori!"
        },
        {
            question: "Posso rimuovere il watermark dal piano gratuito?",
            answer: "Il piano gratuito include il watermark 'ADS MAKER AI' per permetterti di testare la qualità. Per rimuoverlo e avere video completamente brandizzati, è necessario il piano Starter (€39/mese) o superiore."
        },
        {
            question: "Su quali social posso pubblicare i video?",
            answer: "I video sono ottimizzati automaticamente per Instagram (Feed, Stories, Reels), TikTok, YouTube (Shorts e video standard), Facebook, LinkedIn e Pinterest. Ogni formato ha dimensioni e durata perfette per massimizzare l'engagement."
        },
        {
            question: "Cosa succede se non sono soddisfatto?",
            answer: "Offriamo una garanzia ROI di 30 giorni. Se i tuoi video non generano risultati misurabili entro 30 giorni, ti rimborsiamo completamente. Inoltre, puoi cancellare in qualsiasi momento senza penali."
        },
        {
            question: "Avete un team di supporto italiano?",
            answer: "Assolutamente! Il nostro team di supporto parla italiano e conosce perfettamente il mercato locale. Siamo disponibili via email, chat e telefono negli orari lavorativi italiani."
        },
        {
            question: "Posso integrare ADS MAKER AI con i miei tool?",
            answer: "Sì! Dal piano Pro in su hai accesso alle API complete per integrare ADS MAKER AI nel tuo workflow. Funziona con Zapier, webhooks e la maggior parte dei CRM e e-commerce platform."
        }
    ]

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 px-4 relative overflow-hidden bg-muted/20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-muted/30 to-background"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-sm"
                    >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Domande Frequenti
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Tutto quello che devi{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Sapere
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Le risposte alle domande più comuni sui nostri video ads AI. Non trovi quello che cerchi? Contattaci!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="bg-card/80 border-border backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-6 text-left focus:outline-none focus:ring-2rounded-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-foreground pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6">
                                    <div className="border-l-2 border-blue-500 pl-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                            <span className="text-lg font-semibold text-foreground">
                                Hai altre domande?
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Il nostro team è qui per aiutarti. Rispondiamo entro 2 ore negli orari lavorativi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:support@adsmaker.ai"
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
                            >
                                📧 support@adsmaker.ai
                            </a>
                            <a
                                href="https://wa.me/3394464650"
                                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200"
                            >
                                💬 WhatsApp Business
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 