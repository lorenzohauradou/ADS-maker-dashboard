import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Download, Eye, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

const stats = [
  {
    title: "Videos Created",
    value: "24",
    change: "+12%",
    changeType: "positive",
    period: "from last month",
    icon: Video,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-slate-200 dark:border-zinc-800",
  },
  {
    title: "Total Downloads",
    value: "156",
    change: "+23%",
    changeType: "positive",
    period: "from last month",
    icon: Download,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-slate-200 dark:border-zinc-800",
  },
  {
    title: "Total Views",
    value: "2.4K",
    change: "+18%",
    changeType: "positive",
    period: "from last month",
    icon: Eye,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-slate-200 dark:border-zinc-800",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+5%",
    changeType: "positive",
    period: "from last month",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-slate-200 dark:border-zinc-800",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border p-4 lg:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
            >
              <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <Badge
              className={`text-xs px-2 py-1 ${stat.changeType === "positive"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
                }`}
            >
              {stat.changeType === "positive" ? (
                <ArrowUp className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDown className="w-3 h-3 mr-1" />
              )}
              {stat.change}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 font-medium">{stat.title}</p>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
              {stat.change} {stat.period}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
