'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { User, Info, Palette, Wand2, ImageIcon, CheckCircle, Clock } from 'lucide-react'
import { useAvatarCreator } from '../hooks/use-avatar-creator'
import { AGE_GROUPS, GENDERS } from '../constants'

export function AvatarCreatorTab() {
    const {
        form,
        loading,
        photos,
        status,
        step,
        selectedPhotoId,
        updateForm,
        createAvatar,
        submitForReview,
        setSelectedPhotoId,
        isFormValid
    } = useAvatarCreator()

    const handleCreateAvatar = async () => {
        await createAvatar()
    }

    const handleSubmitReview = async () => {
        await submitForReview()
    }

    const renderStepContent = () => {
        if (step === 'form') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Basic Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="avatar-name" className="text-slate-700 dark:text-zinc-300">
                                    Avatar Name *
                                </Label>
                                <Input
                                    id="avatar-name"
                                    placeholder="e.g. Sarah the Sales Expert"
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                    className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-slate-700 dark:text-zinc-300">Age Group *</Label>
                                    <Select value={form.age_group} onValueChange={(value) => updateForm({ age_group: value })}>
                                        <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                            <SelectValue placeholder="Select age" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {AGE_GROUPS.map((age) => (
                                                <SelectItem key={age.value} value={age.value}>
                                                    {age.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-slate-700 dark:text-zinc-300">Gender *</Label>
                                    <Select value={form.gender} onValueChange={(value) => updateForm({ gender: value })}>
                                        <SelectTrigger className="mt-1 border-slate-200 dark:border-zinc-700">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {GENDERS.map((gender) => (
                                                <SelectItem key={gender.value} value={gender.value}>
                                                    {gender.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appearance Details */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Appearance Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="more-details" className="text-slate-700 dark:text-zinc-300">
                                    Avatar Description *
                                </Label>
                                <Textarea
                                    id="more-details"
                                    placeholder="Describe the avatar's physical appearance, personality, and style..."
                                    value={form.more_details}
                                    onChange={(e) => updateForm({ more_details: e.target.value })}
                                    className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20 min-h-[100px]"
                                />
                            </div>

                            <div>
                                <Label htmlFor="outfit-description" className="text-slate-700 dark:text-zinc-300">
                                    Outfit Description *
                                </Label>
                                <Textarea
                                    id="outfit-description"
                                    placeholder="Describe the avatar's clothing and accessories..."
                                    value={form.outfit_description}
                                    onChange={(e) => updateForm({ outfit_description: e.target.value })}
                                    className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20"
                                />
                            </div>

                            <div>
                                <Label htmlFor="background-description" className="text-slate-700 dark:text-zinc-300">
                                    Background Setting
                                </Label>
                                <Textarea
                                    id="background-description"
                                    placeholder="Describe the background environment..."
                                    value={form.background_description}
                                    onChange={(e) => updateForm({ background_description: e.target.value })}
                                    className="mt-1 border-slate-200 dark:border-zinc-700 focus:border-slate-400 focus:ring-slate-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (step === 'photos') {
            return (
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            {photos.length > 0 ? (
                                <ImageIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            ) : (
                                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            )}
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                            {photos.length > 0 ? 'Select Your Favorite Photo' : 'Generating Avatar Photos...'}
                        </h3>
                        <p className="text-slate-600 dark:text-zinc-400 mt-2">
                            {photos.length > 0
                                ? 'Choose the photo that best represents your avatar'
                                : 'AI is creating multiple photos of your avatar. This may take a few minutes.'
                            }
                        </p>
                    </div>

                    {photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className={`relative border-2 rounded-lg cursor-pointer transition-all ${selectedPhotoId === photo.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600'
                                        }`}
                                    onClick={() => setSelectedPhotoId(photo.id)}
                                >
                                    <img
                                        src={photo.image}
                                        alt={`Avatar option ${photo.id}`}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    {selectedPhotoId === photo.id && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )
        }

        if (step === 'review') {
            return (
                <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Avatar Submitted for Review</h3>
                        <p className="text-slate-600 dark:text-zinc-400 mt-2">
                            Your custom avatar is being reviewed by our team. You'll receive a notification once it's approved and ready to use.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Status:</strong> {status === 'pending' ? 'Pending Review' : status}
                        </p>
                    </div>
                </div>
            )
        }

        return null
    }

    const getActionButton = () => {
        if (step === 'form') {
            return (
                <Button
                    onClick={handleCreateAvatar}
                    disabled={loading || !isFormValid}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                    size="lg"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                            Creating Avatar...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Create Custom Avatar
                        </>
                    )}
                </Button>
            )
        }

        if (step === 'photos' && photos.length > 0) {
            return (
                <Button
                    onClick={handleSubmitReview}
                    disabled={loading || !selectedPhotoId}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                    size="lg"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Submit for Review
                        </>
                    )}
                </Button>
            )
        }

        return null
    }

    return (
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
            <CardHeader className="border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <CardTitle className="text-slate-900 dark:text-white">Custom Avatar Creator</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-zinc-400">
                            Design your perfect avatar using AI-powered text descriptions
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {renderStepContent()}

                {getActionButton() && (
                    <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
                        {getActionButton()}
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 