'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalProjects: number
  totalExperiments: number
  totalPublications: number
  totalContributions: number
  impactScore: number
  citationCount: number
  followers: number
  streak: number
}

interface TrendingTopic {
  id: string
  name: string
  category: string
  posts: number
  growth: number
}

interface RecentActivity {
  id: string
  type: 'project' | 'experiment' | 'publication' | 'resource' | 'discussion'
  title: string
  date: string
  icon: string
}

const DASHBOARD_STATS: DashboardStats = {
  totalProjects: 12,
  totalExperiments: 8,
  totalPublications: 5,
  totalContributions: 234,
  impactScore: 87,
  citationCount: 67,
  followers: 156,
  streak: 45
}

const TRENDING_TOPICS: TrendingTopic[] = [
  { id: '1', name: 'Kubernetes Security', category: 'Security', posts: 89, growth: 23 },
  { id: '2', name: 'Multi-Cloud', category: 'Cloud Infrastructure', posts: 67, growth: 18 },
  { id: '3', name: 'AI/ML Infrastructure', category: 'AI/ML', posts: 134, growth: 35 },
  { id: '4', name: 'GitOps', category: 'DevOps', posts: 78, growth: 15 },
  { id: '5', name: 'Service Mesh', category: 'Networking', posts: 56, growth: 12 }
]

const RECENT_ACTIVITY: RecentActivity[] = [
  {
    id: '1',
    type: 'publication',
    title: 'Published "Zero-Trust Architecture Patterns in Kubernetes"',
    date: '2025-12-18T10:30:00Z',
    icon: '📄'
  },
  {
    id: '2',
    type: 'experiment',
    title: 'Completed experiment: Kubernetes Auto-Scaling under Variable Load',
    date: '2025-12-17T14:20:00Z',
    icon: '🧪'
  },
  {
    id: '3',
    type: 'discussion',
    title: 'Replied in "Multi-Cloud Cost Optimization Strategies"',
    date: '2025-12-16T09:15:00Z',
    icon: '💬'
  },
  {
    id: '4',
    type: 'project',
    title: 'Updated project: Service Mesh Security Toolkit',
    date: '2025-12-15T16:45:00Z',
    icon: '🛠️'
  },
  {
    id: '5',
    type: 'resource',
    title: 'Shared resource: Terraform Best Practices Guide',
    date: '2025-12-14T11:30:00Z',
    icon: '📚'
  }
]

const MONTHLY_CONTRIBUTION_DATA = [
  { month: 'Jul', value: 45 },
  { month: 'Aug', value: 52 },
  { month: 'Sep', value: 38 },
  { month: 'Oct', value: 61 },
  { month: 'Nov', value: 48 },
  { month: 'Dec', value: 67 }
]

const CATEGORY_CONTRIBUTIONS = [
  { category: 'Projects', count: 12, percentage: 30, color: 'bg-blue-500' },
  { category: 'Experiments', count: 8, percentage: 20, color: 'bg-green-500' },
  { category: 'Publications', count: 5, percentage: 13, color: 'bg-purple-500' },
  { category: 'Resources', count: 9, percentage: 23, color: 'bg-orange-500' },
  { category: 'Discussions', count: 6, percentage: 14, color: 'bg-teal-500' }
]

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>('month')

  const maxValue = Math.max(...MONTHLY_CONTRIBUTION_DATA.map(d => d.value))

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            📊 Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your research impact, contributions, and community engagement
          </p>
        </div>

        {/* Overview Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Impact Score</div>
            <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              {DASHBOARD_STATS.impactScore}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">↗ +12 this month</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Contributions</div>
            <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              {DASHBOARD_STATS.totalContributions}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">↗ +28 this month</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Citations</div>
            <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              {DASHBOARD_STATS.citationCount}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">↗ +8 this month</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              {DASHBOARD_STATS.streak} 🔥
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Keep it going!</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Contribution Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Contribution Activity
                </h2>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value as 'week' | 'month' | 'year')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 6 months</option>
                  <option value="year">Last year</option>
                </select>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-4" style={{ height: '200px' }}>
                {MONTHLY_CONTRIBUTION_DATA.map((data, idx) => {
                  const height = (data.value / maxValue) * 100
                  return (
                    <div key={idx} className="flex flex-1 flex-col items-center justify-end">
                      <div
                        className="w-full rounded-t-lg bg-upepo-500 transition-all hover:bg-upepo-600"
                        style={{ height: `${height}%` }}
                        title={`${data.month}: ${data.value} contributions`}
                      />
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {data.month}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {DASHBOARD_STATS.totalProjects}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {DASHBOARD_STATS.totalExperiments}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Experiments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {DASHBOARD_STATS.totalPublications}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Publications</div>
                </div>
              </div>
            </div>

            {/* Contribution Breakdown */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Contribution Breakdown
              </h2>

              <div className="mb-4 flex h-8 w-full overflow-hidden rounded-full">
                {CATEGORY_CONTRIBUTIONS.map((cat, idx) => (
                  <div
                    key={cat.category}
                    className={`${cat.color} ${idx === 0 ? 'rounded-l-full' : ''} ${idx === CATEGORY_CONTRIBUTIONS.length - 1 ? 'rounded-r-full' : ''}`}
                    style={{ width: `${cat.percentage}%` }}
                    title={`${cat.category}: ${cat.count} (${cat.percentage}%)`}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {CATEGORY_CONTRIBUTIONS.map(cat => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded ${cat.color}`}></div>
                      <span className="text-gray-900 dark:text-white">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 dark:text-gray-400">{cat.count}</span>
                      <span className="w-16 text-right text-sm text-gray-500 dark:text-gray-400">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {RECENT_ACTIVITY.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTimeAgo(activity.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Link
                  href="/projects"
                  className="block rounded-lg bg-upepo-50 px-4 py-3 text-sm font-medium text-upepo-700 transition-all hover:bg-upepo-100 dark:bg-upepo-900 dark:text-upepo-300 dark:hover:bg-upepo-800"
                >
                  🛠️ Start New Project
                </Link>
                <Link
                  href="/experiments"
                  className="block rounded-lg bg-upepo-50 px-4 py-3 text-sm font-medium text-upepo-700 transition-all hover:bg-upepo-100 dark:bg-upepo-900 dark:text-upepo-300 dark:hover:bg-upepo-800"
                >
                  🧪 Log Experiment
                </Link>
                <Link
                  href="/research/publish"
                  className="block rounded-lg bg-upepo-50 px-4 py-3 text-sm font-medium text-upepo-700 transition-all hover:bg-upepo-100 dark:bg-upepo-900 dark:text-upepo-300 dark:hover:bg-upepo-800"
                >
                  📄 Write Paper
                </Link>
                <Link
                  href="/resources"
                  className="block rounded-lg bg-upepo-50 px-4 py-3 text-sm font-medium text-upepo-700 transition-all hover:bg-upepo-100 dark:bg-upepo-900 dark:text-upepo-300 dark:hover:bg-upepo-800"
                >
                  📚 Share Resource
                </Link>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                🔥 Trending Topics
              </h2>
              <div className="space-y-3">
                {TRENDING_TOPICS.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        #{idx + 1} {topic.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {topic.posts} posts
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <span>↗</span>
                      <span>{topic.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                🎯 Your Goals
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-white">Publications Goal</span>
                    <span className="text-gray-600 dark:text-gray-400">5/10</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-2 rounded-full bg-upepo-500" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-white">Experiments Goal</span>
                    <span className="text-gray-600 dark:text-gray-400">8/12</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '67%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-white">Contribution Streak</span>
                    <span className="text-gray-600 dark:text-gray-400">45/60 days</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-2 rounded-full bg-orange-500" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Community
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Followers</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {DASHBOARD_STATS.followers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Groups Joined</span>
                  <span className="font-bold text-gray-900 dark:text-white">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Discussion Replies</span>
                  <span className="font-bold text-gray-900 dark:text-white">89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
