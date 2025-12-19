'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Publication {
  id: string
  title: string
  type: 'research-paper' | 'technical-report' | 'whitepaper' | 'case-study'
  date: string
  citations: number
  doi?: string
  url: string
}

interface Experiment {
  id: string
  title: string
  status: 'planning' | 'running' | 'completed' | 'failed'
  startDate: string
  url: string
}

interface Project {
  id: string
  title: string
  role: 'owner' | 'contributor'
  stars: number
  url: string
}

interface Activity {
  date: string
  count: number
}

interface UserProfile {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  location: string
  website?: string
  githubUrl?: string
  linkedinUrl?: string
  memberSince: string
  
  // Research Focus
  researchInterests: string[]
  expertise: string[]
  currentFocus: string
  
  // Statistics
  stats: {
    projects: number
    experiments: number
    publications: number
    contributions: number
    followers: number
    following: number
  }
  
  // Research Impact
  impactScore: number
  totalCitations: number
  hIndex: number
  
  // Activity
  contributionActivity: Activity[]
  
  // Content
  publications: Publication[]
  experiments: Experiment[]
  projects: Project[]
}

// Sample profile data
const SAMPLE_PROFILE: UserProfile = {
  id: '1',
  name: 'David Kamau',
  username: 'davidkamau',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
  bio: 'Cloud Infrastructure Engineer passionate about Kubernetes, distributed systems, and chaos engineering. Building reliable systems at scale.',
  location: 'Nairobi, Kenya',
  website: 'https://davidkamau.dev',
  githubUrl: 'https://github.com/davidkamau',
  linkedinUrl: 'https://linkedin.com/in/davidkamau',
  memberSince: '2024-01-15',
  
  researchInterests: [
    'Kubernetes Security',
    'Distributed Systems',
    'Chaos Engineering',
    'Cloud Cost Optimization',
    'Service Mesh Architecture'
  ],
  
  expertise: [
    'Kubernetes',
    'AWS',
    'Terraform',
    'Python',
    'Go',
    'PostgreSQL',
    'Observability'
  ],
  
  currentFocus: 'Investigating zero-trust security patterns for multi-tenant Kubernetes clusters and their impact on performance and operational complexity.',
  
  stats: {
    projects: 12,
    experiments: 8,
    publications: 5,
    contributions: 234,
    followers: 156,
    following: 89
  },
  
  impactScore: 87,
  totalCitations: 67,
  hIndex: 4,
  
  contributionActivity: [
    // Generate 52 weeks of activity
    ...Array.from({ length: 52 }, (_, weekIdx) => {
      const date = new Date()
      date.setDate(date.getDate() - (51 - weekIdx) * 7)
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 15)
      }
    })
  ],
  
  publications: [
    {
      id: '1',
      title: 'Zero-Trust Architecture Patterns in Kubernetes',
      type: 'research-paper',
      date: '2024-11-28',
      citations: 23,
      doi: '10.12345/upepo.2024.001',
      url: '/research/zero-trust-kubernetes'
    },
    {
      id: '2',
      title: 'Cost Optimization Strategies for Multi-Cloud Deployments',
      type: 'whitepaper',
      date: '2024-09-15',
      citations: 18,
      url: '/research/multi-cloud-cost'
    },
    {
      id: '3',
      title: 'Implementing Chaos Engineering at Scale',
      type: 'case-study',
      date: '2024-07-20',
      citations: 15,
      url: '/research/chaos-engineering-scale'
    },
    {
      id: '4',
      title: 'Service Mesh Performance Benchmarks',
      type: 'technical-report',
      date: '2024-05-10',
      citations: 11,
      url: '/research/service-mesh-benchmarks'
    }
  ],
  
  experiments: [
    {
      id: '1',
      title: 'Kubernetes Auto-Scaling under Variable Load',
      status: 'completed',
      startDate: '2024-11-01',
      url: '/experiments/k8s-autoscaling-load'
    },
    {
      id: '2',
      title: 'Multi-Region Database Replication Latency',
      status: 'running',
      startDate: '2024-12-01',
      url: '/experiments/multi-region-db-latency'
    },
    {
      id: '3',
      title: 'Edge Caching Strategy for API Gateway',
      status: 'planning',
      startDate: '2024-12-20',
      url: '/experiments/edge-caching-api-gateway'
    }
  ],
  
  projects: [
    {
      id: '1',
      title: 'Kubernetes Cost Optimizer',
      role: 'owner',
      stars: 234,
      url: '/projects/kubernetes-cost-optimizer'
    },
    {
      id: '2',
      title: 'Multi-Cloud Terraform Modules',
      role: 'owner',
      stars: 187,
      url: '/projects/multi-cloud-terraform'
    },
    {
      id: '3',
      title: 'Service Mesh Security Toolkit',
      role: 'contributor',
      stars: 156,
      url: '/projects/service-mesh-security'
    }
  ]
}

const PUBLICATION_TYPE_LABELS = {
  'research-paper': { label: 'Research Paper', icon: '📄', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  'technical-report': { label: 'Technical Report', icon: '📊', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  'whitepaper': { label: 'Whitepaper', icon: '📋', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  'case-study': { label: 'Case Study', icon: '📖', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' }
}

const EXPERIMENT_STATUS_CONFIG = {
  planning: { label: 'Planning', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  running: { label: 'Running', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'publications' | 'experiments' | 'projects'>('overview')
  const profile = SAMPLE_PROFILE

  // Calculate contribution color
  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
    if (count < 3) return 'bg-green-200 dark:bg-green-900'
    if (count < 6) return 'bg-green-400 dark:bg-green-700'
    if (count < 10) return 'bg-green-600 dark:bg-green-500'
    return 'bg-green-800 dark:bg-green-400'
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Profile Header */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Avatar */}
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-32 w-32 rounded-full border-4 border-upepo-500"
            />

            {/* Basic Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h1>
                <span className="text-xl text-gray-600 dark:text-gray-400">
                  @{profile.username}
                </span>
                <button className="ml-auto rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600">
                  Edit Profile
                </button>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {profile.bio}
              </p>

              <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>📍 {profile.location}</span>
                <span>📅 Member since {new Date(profile.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-upepo-600 hover:underline dark:text-upepo-400">
                    🌐 {profile.website.replace('https://', '')}
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    GitHub
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    LinkedIn
                  </a>
                )}
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  Follow
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.stats.projects}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.stats.experiments}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Experiments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.stats.publications}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.stats.followers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'overview'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('publications')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'publications'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Publications ({profile.publications.length})
          </button>
          <button
            onClick={() => setActiveTab('experiments')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'experiments'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Experiments ({profile.experiments.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'projects'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Projects ({profile.projects.length})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {/* Current Focus */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  🎯 Current Research Focus
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {profile.currentFocus}
                </p>
              </div>

              {/* Contribution Activity */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  📊 Contribution Activity
                </h2>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {profile.stats.contributions} contributions in the last year
                </div>
                
                {/* Activity Grid (52 weeks) */}
                <div className="overflow-x-auto">
                  <div className="inline-grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
                    {profile.contributionActivity.map((activity, idx) => (
                      <div
                        key={idx}
                        className={`h-3 w-3 rounded-sm ${getActivityColor(activity.count)}`}
                        title={`${activity.date}: ${activity.count} contributions`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>Less</span>
                  <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
                  <div className="h-3 w-3 rounded-sm bg-green-200 dark:bg-green-900" />
                  <div className="h-3 w-3 rounded-sm bg-green-400 dark:bg-green-700" />
                  <div className="h-3 w-3 rounded-sm bg-green-600 dark:bg-green-500" />
                  <div className="h-3 w-3 rounded-sm bg-green-800 dark:bg-green-400" />
                  <span>More</span>
                </div>
              </div>

              {/* Recent Publications */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    📄 Recent Publications
                  </h2>
                  <button
                    onClick={() => setActiveTab('publications')}
                    className="text-sm text-upepo-600 hover:underline dark:text-upepo-400"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {profile.publications.slice(0, 3).map(pub => {
                    const typeConfig = PUBLICATION_TYPE_LABELS[pub.type]
                    return (
                      <div
                        key={pub.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${typeConfig.color}`}>
                            {typeConfig.icon} {typeConfig.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(pub.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Link
                          href={pub.url as any}
                          className="mb-2 block font-semibold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                        >
                          {pub.title}
                        </Link>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          📚 {pub.citations} citations
                          {pub.doi && <span className="ml-3">DOI: {pub.doi}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Active Experiments */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    🧪 Active Experiments
                  </h2>
                  <button
                    onClick={() => setActiveTab('experiments')}
                    className="text-sm text-upepo-600 hover:underline dark:text-upepo-400"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {profile.experiments.filter(e => e.status === 'running' || e.status === 'planning').map(exp => {
                    const statusConfig = EXPERIMENT_STATUS_CONFIG[exp.status]
                    return (
                      <div
                        key={exp.id}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Started {new Date(exp.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Link
                          href={exp.url as any}
                          className="block font-semibold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                        >
                          {exp.title}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Research Impact */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  🏆 Research Impact
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Impact Score</span>
                      <span className="text-2xl font-bold text-upepo-600 dark:text-upepo-400">
                        {profile.impactScore}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-upepo-500"
                        style={{ width: `${profile.impactScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {profile.totalCitations}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Citations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {profile.hIndex}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">h-index</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Interests */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  🔍 Research Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.researchInterests.map(interest => (
                    <span
                      key={interest}
                      className="rounded-lg bg-upepo-100 px-3 py-1 text-sm font-medium text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  💡 Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map(skill => (
                    <span
                      key={skill}
                      className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Projects */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  ⭐ Top Projects
                </h2>
                <div className="space-y-3">
                  {profile.projects.slice(0, 3).map(project => (
                    <div
                      key={project.id}
                      className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                    >
                      <Link
                        href={project.url as any}
                        className="mb-2 block font-semibold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                      >
                        {project.title}
                      </Link>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>⭐ {project.stars}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                          {project.role === 'owner' ? 'Owner' : 'Contributor'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Publications Tab */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            {profile.publications.map(pub => {
              const typeConfig = PUBLICATION_TYPE_LABELS[pub.type]
              return (
                <div
                  key={pub.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${typeConfig.color}`}>
                      {typeConfig.icon} {typeConfig.label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(pub.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    {pub.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📚 {pub.citations} citations</span>
                    {pub.doi && <span>DOI: {pub.doi}</span>}
                  </div>
                  <Link
                    href={pub.url as any}
                    className="inline-block rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                  >
                    Read Paper
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Experiments Tab */}
        {activeTab === 'experiments' && (
          <div className="space-y-6">
            {profile.experiments.map(exp => {
              const statusConfig = EXPERIMENT_STATUS_CONFIG[exp.status]
              return (
                <div
                  key={exp.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Started {new Date(exp.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <Link
                    href={exp.url as any}
                    className="inline-block rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                  >
                    View Experiment
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {profile.projects.map(project => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {project.role === 'owner' ? '👤 Owner' : '🤝 Contributor'}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ⭐ {project.stars} stars
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <Link
                  href={project.url as any}
                  className="inline-block rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
