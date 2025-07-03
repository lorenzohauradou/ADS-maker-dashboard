'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Video, Camera, Plus, Brain } from 'lucide-react'
import { useMultiScene } from '../hooks/use-multi-scene'
import { RESOLUTIONS, SCENE_DURATIONS } from '../constants'

export function MultiSceneTab() {
    const {
        form,
        loading,
        updateForm,
        addScene,
        removeScene,
        updateScene,
        createMultiScene,
        isFormValid
    } = useMultiScene()

    const handleSubmit = async () => {
        await createMultiScene()
    }

    return (
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
            <CardHeader className="border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center border border-purple-200 dark:border-purple-800">
                        <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <CardTitle className="text-slate-900 dark:text-white">Multi-Scene Video Creator</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-zinc-400">
                            Create complex videos with multiple scenes and different avatars
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {/* Global Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <div>
                        <Label className="text-slate-700 dark:text-zinc-300">Overall Theme</Label>
                        <Input
                            placeholder="e.g. Product launch campaign"
                            value={form.overallTheme}
                            onChange={(e) => updateForm({ overallTheme: e.target.value })}
                            className="mt-1 border-slate-200 dark:border-zinc-700"
                        />
                    </div>
                    <div>
                        <Label className="text-slate-700 dark:text-zinc-300">Resolution</Label>
                        <Select value={form.resolution} onValueChange={(value) => updateForm({ resolution: value })}>
                            <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {RESOLUTIONS.map((res) => (
                                    <SelectItem key={res.value} value={res.value}>
                                        {res.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Scenes */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <Camera className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            Scenes ({form.scenes.length})
                        </h3>
                        <Button
                            onClick={addScene}
                            variant="outline"
                            size="sm"
                            className="border-slate-200 dark:border-zinc-700"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Scene
                        </Button>
                    </div>

                    {form.scenes.map((scene, index) => (
                        <Card key={index} className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">Scene {index + 1}</span>
                                    </div>
                                    {form.scenes.length > 1 && (
                                        <Button
                                            onClick={() => removeScene(index)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-slate-700 dark:text-zinc-300">Scene Content</Label>
                                    <Textarea
                                        placeholder="Describe what happens in this scene..."
                                        value={scene.content}
                                        onChange={(e) => updateScene(index, 'content', e.target.value)}
                                        className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-slate-700 dark:text-zinc-300">Avatar ID</Label>
                                        <Input
                                            placeholder="Optional avatar ID"
                                            value={scene.avatarId}
                                            onChange={(e) => updateScene(index, 'avatarId', e.target.value)}
                                            className="mt-1 border-slate-200 dark:border-zinc-700"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-slate-700 dark:text-zinc-300">Duration (seconds)</Label>
                                        <Select
                                            value={scene.duration}
                                            onValueChange={(value) => updateScene(index, 'duration', value)}
                                        >
                                            <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {SCENE_DURATIONS.map((duration) => (
                                                    <SelectItem key={duration.value} value={duration.value}>
                                                        {duration.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !isFormValid}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12"
                        size="lg"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                                Creating Multi-Scene Video...
                            </>
                        ) : (
                            <>
                                <Brain className="w-5 h-5 mr-2" />
                                Create Multi-Scene Video
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 