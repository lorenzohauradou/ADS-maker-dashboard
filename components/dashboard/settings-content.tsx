"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Download,
  Trash2,
  Save,
  Camera,
  Settings,
  AlertTriangle,
} from "lucide-react"

export function SettingsContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    bio: "",
    notifications: {
      email: true,
      push: true,
      marketing: false,
      analytics: true,
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "Europe/London",
      autoSave: true,
    },
  })

  const [activeTab, setActiveTab] = useState("profile")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as any),
        [field]: value,
      },
    }))
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-zinc-400 mt-1">Manage your account preferences and settings</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <>
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h3>
                  <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-900 dark:text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-900 dark:text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-900 dark:text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-slate-900 dark:text-white">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="bio" className="text-slate-900 dark:text-white">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    className="mt-2 bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                  />
                </div>
              </Card>

              {/* Account Status */}
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Status</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-500 text-white px-3 py-1">Pro Plan</Badge>
                    <span className="text-slate-600 dark:text-zinc-400">Active until March 2024</span>
                  </div>
                  <Button variant="outline" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    Upgrade Plan
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Notification Preferences</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-900 dark:text-white font-medium">Email Notifications</Label>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Receive updates about your projects via email</p>
                  </div>
                  <Switch
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => handleNestedChange("notifications", "email", checked)}
                  />
                </div>

                <Separator className="bg-slate-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-900 dark:text-white font-medium">Push Notifications</Label>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Get notified about real-time activity</p>
                  </div>
                  <Switch
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => handleNestedChange("notifications", "push", checked)}
                  />
                </div>

                <Separator className="bg-slate-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-900 dark:text-white font-medium">Marketing Updates</Label>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Receive news about features and promotions</p>
                  </div>
                  <Switch
                    checked={formData.notifications.marketing}
                    onCheckedChange={(checked) => handleNestedChange("notifications", "marketing", checked)}
                  />
                </div>

                <Separator className="bg-slate-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-900 dark:text-white font-medium">Analytics Reports</Label>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Weekly analytics and performance summaries</p>
                  </div>
                  <Switch
                    checked={formData.notifications.analytics}
                    onCheckedChange={(checked) => handleNestedChange("notifications", "analytics", checked)}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Preferences Settings */}
          {activeTab === "preferences" && (
            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Application Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-900 dark:text-white">Theme</Label>
                  <Select
                    value={formData.preferences.theme}
                    onValueChange={(value) => handleNestedChange("preferences", "theme", value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900 dark:text-white">Language</Label>
                  <Select
                    value={formData.preferences.language}
                    onValueChange={(value) => handleNestedChange("preferences", "language", value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900 dark:text-white">Timezone</Label>
                  <Select
                    value={formData.preferences.timezone}
                    onValueChange={(value) => handleNestedChange("preferences", "timezone", value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                      <SelectItem value="Europe/Rome">Europe/Rome</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-900 dark:text-white font-medium">Auto Save</Label>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">Automatically save your work</p>
                  </div>
                  <Switch
                    checked={formData.preferences.autoSave}
                    onCheckedChange={(checked) => handleNestedChange("preferences", "autoSave", checked)}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <>
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Password & Security</h3>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>

                  <Button variant="outline" className="w-full border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    <Shield className="w-4 h-4 mr-2" />
                    Enable Two-Factor Authentication
                  </Button>

                  <Button variant="outline" className="w-full border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download Account Data
                  </Button>
                </div>
              </Card>

              {/* Active Sessions */}
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Current Session</p>
                      <p className="text-sm text-slate-600 dark:text-zinc-400">MacBook Pro • Chrome • Milan, Italy</p>
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <>
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Current Plan</h3>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Pro Plan</h4>
                    <p className="text-slate-600 dark:text-zinc-400">$29/month • Unlimited projects</p>
                  </div>
                  <Button variant="outline" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    Manage Plan
                  </Button>
                </div>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">•••• •••• •••• 4242</p>
                      <p className="text-sm text-slate-600 dark:text-zinc-400">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                    Update
                  </Button>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Danger Zone</h3>
                </div>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
