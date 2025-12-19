'use client'

import { useState } from 'react'
import Link from 'next/link'

interface GitHubRepo {
  id: string
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  lastUpdated: string
  url: string
  isImported: boolean
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalContributions: number
  streak: number
  languages: {
    name: string
    percentage: number
    color: string
  }[]
}

const SAMPLE_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: '1',
    name: 'kubernetes-security-toolkit',
    fullName: 'davidkamau/kubernetes-security-toolkit',
    description: 'Collection of tools and scripts for Kubernetes security auditing and hardening',
    language: 'Python',
    stars: 234,
    forks: 45,
    lastUpdated: '2025-12-18',
    url: 'https://github.com/davidkamau/kubernetes-security-toolkit',
    isImported: true
  },
  {
    id: '2',
    name: 'multi-cloud-terraform',
    fullName: 'davidkamau/multi-cloud-terraform',
    description: 'Terraform modules for deploying infrastructure across AWS, Azure, and GCP',
    language: 'HCL',
    stars: 187,
    forks: 32,
    lastUpdated: '2025-12-15',
    url: 'https://github.com/davidkamau/multi-cloud-terraform',
    isImported: true
  },
  {
    id: '3',
    name: 'chaos-mesh-experiments',
    fullName: 'davidkamau/chaos-mesh-experiments',
    description: 'Chaos engineering experiments using Chaos Mesh for Kubernetes resilience testing',
    language: 'Go',
    stars: 156,
    forks: 28,
    lastUpdated: '2025-12-10',
    url: 'https://github.com/davidkamau/chaos-mesh-experiments',
    isImported: false
  },
  {
    id: '4',
    name: 'cloud-cost-optimizer',
    fullName: 'davidkamau/cloud-cost-optimizer',
    description: 'Automated cloud cost optimization tool with recommendations engine',
    language: 'TypeScript',
    stars: 312,
    forks: 67,
    lastUpdated: '2025-12-17',
    url: 'https://github.com/davidkamau/cloud-cost-optimizer',
    isImported: false
  },
  {
    id: '5',
    name: 'service-mesh-benchmarks',
    fullName: 'davidkamau/service-mesh-benchmarks',
    description: 'Performance benchmarks comparing Istio, Linkerd, and Consul service meshes',
    language: 'Shell',
    stars: 98,
    forks: 19,
    lastUpdated: '2025-11-28',
    url: 'https://github.com/davidkamau/service-mesh-benchmarks',
    isImported: false
  }
]

const SAMPLE_STATS: GitHubStats = {
  totalRepos: 24,
  totalStars: 987,
  totalContributions: 1543,
  streak: 45,
  languages: [
    { name: 'Python', percentage: 35, color: 'bg-blue-500' },
    { name: 'TypeScript', percentage: 28, color: 'bg-blue-400' },
    { name: 'Go', percentage: 20, color: 'bg-cyan-500' },
    { name: 'HCL', percentage: 12, color: 'bg-purple-500' },
    { name: 'Shell', percentage: 5, color: 'bg-green-500' }
  ]
}

const LANGUAGE_COLORS: { [key: string]: string } = {
  'Python': 'bg-blue-500',
  'TypeScript': 'bg-blue-400',
  'JavaScript': 'bg-yellow-400',
  'Go': 'bg-cyan-500',
  'Rust': 'bg-orange-600',
  'HCL': 'bg-purple-500',
  'Shell': 'bg-green-500',
  'Java': 'bg-red-500'
}

export default function GitHubIntegrationPage() {
  const [isConnected, setIsConnected] = useState(true) // Would check auth status
  const [activeTab, setActiveTab] = useState<'repos' | 'stats' | 'settings'>('repos')
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set(['1', '2']))

  const toggleRepo = (repoId: string) => {
    const newSelected = new Set(selectedRepos)
    if (newSelected.has(repoId)) {
      newSelected.delete(repoId)
    } else {
      newSelected.add(repoId)
    }
    setSelectedRepos(newSelected)
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 text-8xl">🔗</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Connect Your GitHub Account
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Link your GitHub account to automatically import projects, sync experiments, and showcase your contributions
            </p>

            <div className="mb-12 rounded-xl border border-gray-200 bg-white p-8 text-left dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Why Connect GitHub?
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Automatically import your repositories as Upepo Labs projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Sync experiment code and documentation from GitHub</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Display your contribution stats and coding activity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Enable one-click access to repository resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Share your open-source work with the community</span>
                </li>
              </ul>
            </div>

            <button className="inline-flex items-center gap-3 rounded-lg bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Connect with GitHub
            </button>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              We'll never post to GitHub without your permission
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              GitHub Integration
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Connected as <span className="font-semibold">@davidkamau</span>
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-green-700 dark:bg-green-900 dark:text-green-300">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Connected
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('repos')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'repos'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Repositories
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'stats'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'settings'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Repositories Tab */}
        {activeTab === 'repos' && (
          <>
            <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 Select repositories to import as Upepo Labs projects. Imported projects will sync automatically with GitHub.
              </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRepos.size} of {SAMPLE_GITHUB_REPOS.length} repositories selected
              </div>
              <button
                className="rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                disabled={selectedRepos.size === 0}
              >
                Import Selected ({selectedRepos.size})
              </button>
            </div>

            <div className="space-y-4">
              {SAMPLE_GITHUB_REPOS.map(repo => (
                <div
                  key={repo.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedRepos.has(repo.id)}
                      onChange={() => toggleRepo(repo.id)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-upepo-500 focus:ring-upepo-500"
                    />

                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                        >
                          {repo.name}
                        </a>
                        {repo.isImported && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                            ✓ Imported
                          </span>
                        )}
                      </div>

                      <p className="mb-3 text-gray-600 dark:text-gray-300">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <div className={`h-3 w-3 rounded-full ${LANGUAGE_COLORS[repo.language] || 'bg-gray-500'}`}></div>
                          {repo.language}
                        </span>
                        <span>⭐ {repo.stars}</span>
                        <span>🔀 {repo.forks} forks</span>
                        <span>Updated {new Date(repo.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {/* Overview Stats */}
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {SAMPLE_STATS.totalRepos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {SAMPLE_STATS.totalStars}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {SAMPLE_STATS.totalContributions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Contributions</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {SAMPLE_STATS.streak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak 🔥</div>
                </div>
              </div>

              {/* Language Breakdown */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Language Breakdown
                </h2>
                <div className="mb-4 flex h-4 w-full overflow-hidden rounded-full">
                  {SAMPLE_STATS.languages.map((lang, idx) => (
                    <div
                      key={lang.name}
                      className={`${lang.color} ${idx === 0 ? 'rounded-l-full' : ''} ${idx === SAMPLE_STATS.languages.length - 1 ? 'rounded-r-full' : ''}`}
                      style={{ width: `${lang.percentage}%` }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  {SAMPLE_STATS.languages.map(lang => (
                    <div key={lang.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${lang.color}`}></div>
                        <span className="text-gray-900 dark:text-white">{lang.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Repositories */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Top Repositories
                </h2>
                <div className="space-y-4">
                  {SAMPLE_GITHUB_REPOS.sort((a, b) => b.stars - a.stars).slice(0, 5).map(repo => (
                    <div key={repo.id} className="flex items-center justify-between">
                      <div>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                        >
                          {repo.name}
                        </a>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {repo.language}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ⭐ {repo.stars}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Sync Status
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Sync</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      5 min ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Active
                    </span>
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-upepo-500 px-4 py-2 font-semibold text-white transition-all hover:bg-upepo-600">
                    Sync Now
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Pushed to main
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      kubernetes-security-toolkit · 2h ago
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Created release v2.1.0
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      cloud-cost-optimizer · 1d ago
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Opened PR #45
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      multi-cloud-terraform · 3d ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Sync Settings
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Auto-sync repositories
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically sync changes from GitHub
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-upepo-500 focus:ring-upepo-500" />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Import new repositories
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically import new public repos
                    </div>
                  </div>
                  <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-upepo-500 focus:ring-upepo-500" />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Show contribution stats
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Display GitHub stats on your profile
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-upepo-500 focus:ring-upepo-500" />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
              <h2 className="mb-4 text-xl font-bold text-red-900 dark:text-red-200">
                Danger Zone
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 font-medium text-red-900 dark:text-red-200">
                    Disconnect GitHub
                  </div>
                  <div className="mb-4 text-sm text-red-800 dark:text-red-300">
                    This will remove the connection and stop syncing your repositories
                  </div>
                  <button
                    onClick={() => setIsConnected(false)}
                    className="rounded-lg border border-red-600 bg-red-600 px-6 py-2 font-semibold text-white transition-all hover:bg-red-700"
                  >
                    Disconnect Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
