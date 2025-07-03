'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Upload, FileVideo, User, Info, CheckCircle } from 'lucide-react'
import { useByoa } from '../hooks/use-byoa'
import { BYOA_GENDERS, VIDEO_SCENES } from '../constants'

export function UploadAvatarTab() {
    const {
        form,
        loading,
        personaId,
        updateForm,
        uploadAvatar,
        checkPersonaStatus,
        isFormValid
    } = useByoa()

    const handleSubmit = async () => {
        await uploadAvatar()
    }

    const handleCheckStatus = async () => {
        await checkPersonaStatus()
    }

    return (
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
            <CardHeader className="border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-800">
                        <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <CardTitle className="text-slate-900 dark:text-white">Upload Custom Avatar</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-zinc-400">
                            Upload your videos to create personalized avatars from real people
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Upload */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <FileVideo className="w-4 h-4 text-green-600 dark:text-green-400" />
                            Video Files
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-slate-700 dark:text-zinc-300">Lipsync Video *</Label>
                                <div className="mt-1">
                                    <input
                                        type="file"
                                        accept="video/mp4,video/quicktime"
                                        onChange={(e) => updateForm({ lipsyncVideo: e.target.files?.[0] || null })}
                                        className="block w-full text-sm text-slate-500 dark:text-zinc-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100
                        dark:file:bg-green-900/20 dark:file:text-green-400"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                                    Person speaking for 10-30 seconds
                                </p>
                            </div>

                            <div>
                                <Label className="text-slate-700 dark:text-zinc-300">Consent Video *</Label>
                                <div className="mt-1">
                                    <input
                                        type="file"
                                        accept="video/mp4,video/quicktime"
                                        onChange={(e) => updateForm({ consentVideo: e.target.files?.[0] || null })}
                                        className="block w-full text-sm text-slate-500 dark:text-zinc-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100
                        dark:file:bg-green-900/20 dark:file:text-green-400"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                                    Clear consent statement
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                            Avatar Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-slate-700 dark:text-zinc-300">Creator Name *</Label>
                                <Input
                                    placeholder="e.g. John Smith"
                                    value={form.creatorName}
                                    onChange={(e) => updateForm({ creatorName: e.target.value })}
                                    className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20"
                                />
                            </div>

                            <div>
                                <Label className="text-slate-700 dark:text-zinc-300">Gender *</Label>
                                <Select value={form.gender} onValueChange={(value) => updateForm({ gender: value })}>
                                    <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BYOA_GENDERS.map((gender) => (
                                            <SelectItem key={gender.value} value={gender.value}>
                                                {gender.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-slate-700 dark:text-zinc-300">Background Scene</Label>
                                <Select value={form.videoScene} onValueChange={(value) => updateForm({ videoScene: value })}>
                                    <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {VIDEO_SCENES.map((scene) => (
                                            <SelectItem key={scene.value} value={scene.value}>
                                                {scene.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requirements Info */}
                <Card className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-800">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                                    Video Requirements
                                </h4>
                                <ul className="text-sm text-slate-600 dark:text-zinc-400 space-y-1">
                                    <li>• MP4 or QuickTime format with good quality</li>
                                    <li>• Duration: 10-30 seconds for each video</li>
                                    <li>• Good lighting and neutral background</li>
                                    <li>• Person centered in frame, clear audio</li>
                                    <li>• Manual approval required (up to 24 hours)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !isFormValid}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12"
                        size="lg"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 mr-2" />
                                Upload Avatar Videos
                            </>
                        )}
                    </Button>

                    {personaId && (
                        <Button
                            onClick={handleCheckStatus}
                            variant="outline"
                            className="border-slate-200 dark:border-zinc-700"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Check Status
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 