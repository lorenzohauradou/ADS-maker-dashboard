"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Play,
  Share2,
  Clock,
  Users,
  Target,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react"

const performanceData = [
  {
    project: "iPhone 15 Pro Campaign",
    views: 12500,
    downloads: 234,
    ctr: 4.2,
    engagement: 8.7,
    conversionRate: 2.1,
    revenue: 1250,
    trend: "up",
    status: "Active",
  },
  {
    project: "SaaS Dashboard Demo",
    views: 8200,
    downloads: 156,
    ctr: 3.8,
    engagement: 7.2,
    conversionRate: 1.8,
    revenue: 890,
    trend: "up",
    status: "Active",
  },
  {
    project: "E-commerce Store Launch",
    views: 15800,
    downloads: 312,
    ctr: 5.1,
    engagement: 9.3,
    conversionRate: 2.7,
    revenue: 1680,
    trend: "up",
    status: "Completed",
  },
  {
    project: "Restaurant Menu Showcase",
    views: 9400,
    downloads: 187,
    ctr: 3.2,
    engagement: 6.8,
    conversionRate: 1.4,
    revenue: 620,
    trend: "down",
    status: "Paused",
  },
]

const metricsCards = [
  {
    title: "Total Views",
    value: "45.9K",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Total Downloads",
    value: "889",
    change: "+8.2%",
    trend: "up",
    icon: Download,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Avg. CTR",
    value: "4.1%",
    change: "+0.3%",
    trend: "up",
    icon: Target,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Revenue Generated",
    value: "$4,440",
    change: "+15.8%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
]

export function AnalyticsContent() {
  const [dateRange, setDateRange] = useState("30d")
  const [projectFilter, setProjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = performanceData.filter((project) => {
    const matchesProject = projectFilter === "all" || project.project.includes(projectFilter)
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter
    return matchesProject && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-slate-600 dark:text-zinc-400 mt-1">Monitor performance and insights of your video ads</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32 rounded-xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsCards.map((metric, index) => (
          <Card key={index} className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${metric.bg}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex items-center text-sm">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm mt-1">{metric.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Overview */}
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Overview</h3>
            <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>

          {/* Mock Chart */}
          <div className="h-64 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-zinc-700">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-400 dark:text-zinc-500 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-zinc-400 text-sm">Performance Chart</p>
              <p className="text-xs text-slate-500 dark:text-zinc-500">(Chart implementation needed)</p>
            </div>
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Engagement Metrics</h3>
            <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
              <Users className="w-4 h-4 mr-2" />
              Audience
            </Button>
          </div>

          {/* Engagement Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Average Watch Time</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">2:45</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Completion Rate</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">78%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Share Rate</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">12%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Click-through Rate</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">4.1%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Performance Table */}
      <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Project Performance</h3>
            <div className="flex items-center gap-3">
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-40 rounded-xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="iPhone">iPhone Campaign</SelectItem>
                  <SelectItem value="SaaS">SaaS Demo</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Project</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Views</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Downloads</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">CTR</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Engagement</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Conversion</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Revenue</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((project, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="font-medium text-slate-900 dark:text-white">{project.project}</span>
                      {project.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 ml-2" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{project.views.toLocaleString()}</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{project.downloads}</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{project.ctr}%</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{project.engagement}%</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{project.conversionRate}%</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">${project.revenue}</td>
                  <td className="p-4">
                    <Badge
                      className={`text-xs px-2 py-1 ${project.status === "Active"
                        ? "bg-green-500 text-white"
                        : project.status === "Completed"
                          ? "bg-blue-500 text-white"
                          : "bg-yellow-500 text-white"
                        }`}
                    >
                      {project.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-16 border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center space-y-1"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm">Export Data</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center space-y-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Schedule Report</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center space-y-1"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Share Insights</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
