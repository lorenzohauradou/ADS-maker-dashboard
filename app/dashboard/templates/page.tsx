"use client"

import { useState } from 'react'
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout, Search, Play, Eye, Download, Star, Grid3X3, List } from 'lucide-react'
import { toast } from 'sonner'

export default function TemplatesPage() {
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    // 📺 FETCH TEMPLATES
    const handleGetTemplates = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/creatify/templates')
            const result = await response.json()

            if (result.success) {
                toast.success(`Found ${result.count} templates!`)
                console.log('Templates:', result.templates)
            } else {
                toast.error(result.error || 'Error loading templates')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error loading templates')
        } finally {
            setLoading(false)
        }
    }

    // Template categories - clean and focused
    const templateCategories = [
        {
            id: 'product-showcase',
            name: 'Product Showcase',
            description: 'Perfect templates for product presentations',
            count: 12,
            popular: true,
            color: 'bg-blue-500'
        },
        {
            id: 'social-media',
            name: 'Social Media',
            description: 'Optimized for social platforms',
            count: 8,
            popular: true,
            color: 'bg-purple-500'
        },
        {
            id: 'e-commerce',
            name: 'E-commerce',
            description: 'Designed for online sales',
            count: 15,
            popular: false,
            color: 'bg-green-500'
        },
        {
            id: 'saas',
            name: 'SaaS & Tech',
            description: 'Software and technology focused',
            count: 6,
            popular: false,
            color: 'bg-orange-500'
        }
    ]

    const mockTemplates = [
        {
            id: 'dynamic-product',
            name: 'Dynamic Product Showcase',
            description: 'Cinematic template for physical products',
            thumbnail: '/placeholder.jpg',
            category: 'product-showcase',
            rating: 4.8,
            usage: 1250,
            premium: false,
            duration: '30s'
        },
        {
            id: 'avatar-bubble',
            name: 'Avatar Bubble Template',
            description: 'Professional avatar with speech bubble',
            thumbnail: '/placeholder.jpg',
            category: 'social-media',
            rating: 4.9,
            usage: 890,
            premium: true,
            duration: '15s'
        },
        {
            id: 'motion-cards',
            name: 'Motion Cards',
            description: 'Modern animated cards for presentations',
            thumbnail: '/placeholder.jpg',
            category: 'e-commerce',
            rating: 4.7,
            usage: 645,
            premium: false,
            duration: '25s'
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />

            <main className="flex-1 p-6 space-y-8">
                {/* Clean Header Section */}
                <div className="space-y-6">
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                Video Templates
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 mt-2">
                                Professional templates to create amazing videos in seconds
                            </p>
                        </div>

                        {/* Search and Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    placeholder="Search templates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-11 h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                {/* View Mode Toggle */}
                                <div className="flex items-center bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-700 p-1">
                                    <Button
                                        size="sm"
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        onClick={() => setViewMode('grid')}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        onClick={() => setViewMode('list')}
                                        className="h-8 w-8 p-0"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleGetTemplates}
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6"
                                >
                                    <Layout className="w-4 h-4 mr-2" />
                                    {loading ? 'Loading...' : 'Load Templates'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories - Simplified */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Browse by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {templateCategories.map((category) => (
                            <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                                        {category.popular && (
                                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Popular
                                            </Badge>
                                        )}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-slate-900 dark:text-white">{category.name}</CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-zinc-400 mt-1">
                                            {category.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-sm text-slate-500 dark:text-zinc-500">
                                        {category.count} templates
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Filter Tabs - Simplified */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Popular Templates</h2>
                        <Tabs defaultValue="all" className="w-auto">
                            <TabsList className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
                                <TabsTrigger value="all" className="text-slate-600 dark:text-zinc-400">All</TabsTrigger>
                                <TabsTrigger value="free" className="text-slate-600 dark:text-zinc-400">Free</TabsTrigger>
                                <TabsTrigger value="premium" className="text-slate-600 dark:text-zinc-400">Premium</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Templates Grid */}
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {mockTemplates.map((template) => (
                            <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 group">
                                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                        <div className="w-16 h-16 bg-white/90 dark:bg-zinc-900/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-slate-600 dark:text-zinc-400 ml-1" />
                                        </div>
                                    </div>

                                    {/* Template Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <Badge variant="secondary" className="bg-black/60 text-white border-0">
                                            {template.duration}
                                        </Badge>
                                    </div>

                                    {template.premium && (
                                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 border-0">
                                            Premium
                                        </Badge>
                                    )}
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="space-y-3">
                                        <div>
                                            <CardTitle className="text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {template.name}
                                            </CardTitle>
                                            <CardDescription className="text-slate-600 dark:text-zinc-400 mt-1">
                                                {template.description}
                                            </CardDescription>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-zinc-500">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{template.rating}</span>
                                            </div>
                                            <div>{template.usage.toLocaleString()} uses</div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="flex-1 border-slate-200 dark:border-zinc-700">
                                            <Eye className="w-4 h-4 mr-2" />
                                            Preview
                                        </Button>
                                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                            <Download className="w-4 h-4 mr-2" />
                                            Use Template
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section - More Elegant */}
                <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white border-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50"></div>
                    <CardContent className="p-8 relative">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold mb-3">
                                    Need a custom template?
                                </h3>
                                <p className="text-blue-100 text-lg">
                                    Get in touch to create bespoke templates for your brand
                                </p>
                            </div>
                            <Button variant="secondary" size="lg" className="whitespace-nowrap bg-white text-blue-600 hover:bg-slate-50">
                                Request Custom Template
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
} 