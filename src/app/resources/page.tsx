'use client'

import { useState } from 'react'
import Link from 'next/link'

type ResourceType = 'article' | 'video' | 'tutorial' | 'course' | 'book' | 'tool' | 'documentation' | 'github-repo'
type ResourceCategory = 'Cloud Infrastructure' | 'Kubernetes' | 'Security' | 'DevOps' | 'Databases' | 'Networking' | 'AI/ML' | 'API Design' | 'Monitoring' | 'Cost Optimization'

interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  category: ResourceCategory
  tags: string[]
  url: string
  author: string
  submittedBy: string
  submittedByAvatar: string
  submittedDate: string
  upvotes: number
  views: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: string
  isCurated: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  resourceCount: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  icon: string
  color: string
}

const SAMPLE_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Kubernetes Security Best Practices - Complete Guide',
    description: 'Comprehensive guide covering RBAC, network policies, pod security standards, secrets management, and security scanning in Kubernetes clusters.',
    type: 'article',
    category: 'Security',
    tags: ['Kubernetes', 'Security', 'RBAC', 'Network Policies'],
    url: 'https://kubernetes.io/docs/concepts/security/',
    author: 'Kubernetes Documentation Team',
    submittedBy: 'David Kamau',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    submittedDate: '2024-12-15',
    upvotes: 234,
    views: 3421,
    difficulty: 'intermediate',
    estimatedTime: '45 min read',
    isCurated: true
  },
  {
    id: '2',
    title: 'Terraform Best Practices Video Series',
    description: 'In-depth video series on Infrastructure as Code with Terraform, including module design, state management, and multi-environment deployments.',
    type: 'video',
    category: 'Cloud Infrastructure',
    tags: ['Terraform', 'IaC', 'AWS', 'Azure', 'GCP'],
    url: 'https://www.youtube.com/playlist?example',
    author: 'HashiCorp',
    submittedBy: 'Mary Wanjiku',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
    submittedDate: '2024-12-10',
    upvotes: 187,
    views: 2156,
    difficulty: 'intermediate',
    estimatedTime: '3 hours',
    isCurated: true
  },
  {
    id: '3',
    title: 'Building Microservices with Service Mesh',
    description: 'Step-by-step tutorial on implementing Istio service mesh for microservices, covering traffic management, observability, and security.',
    type: 'tutorial',
    category: 'Kubernetes',
    tags: ['Microservices', 'Service Mesh', 'Istio', 'Kubernetes'],
    url: 'https://example.com/istio-tutorial',
    author: 'Cloud Native Labs',
    submittedBy: 'James Otieno',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    submittedDate: '2024-12-08',
    upvotes: 156,
    views: 1892,
    difficulty: 'advanced',
    estimatedTime: '2 hours',
    isCurated: false
  },
  {
    id: '4',
    title: 'AWS Solutions Architect Professional Course',
    description: 'Comprehensive course covering advanced AWS services, architecture patterns, cost optimization, and security for the Solutions Architect Professional exam.',
    type: 'course',
    category: 'Cloud Infrastructure',
    tags: ['AWS', 'Architecture', 'Certification'],
    url: 'https://example.com/aws-course',
    author: 'A Cloud Guru',
    submittedBy: 'Grace Mwangi',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
    submittedDate: '2024-12-05',
    upvotes: 312,
    views: 4567,
    difficulty: 'advanced',
    estimatedTime: '30 hours',
    isCurated: true
  },
  {
    id: '5',
    title: 'Designing Data-Intensive Applications',
    description: 'The definitive book on distributed systems, data modeling, replication, partitioning, and transactions. Essential reading for backend engineers.',
    type: 'book',
    category: 'Databases',
    tags: ['Databases', 'Distributed Systems', 'Architecture'],
    url: 'https://example.com/ddia',
    author: 'Martin Kleppmann',
    submittedBy: 'Peter Kimani',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peter',
    submittedDate: '2024-12-01',
    upvotes: 445,
    views: 6234,
    difficulty: 'advanced',
    isCurated: true
  },
  {
    id: '6',
    title: 'K9s - Kubernetes CLI Tool',
    description: 'Terminal UI for managing Kubernetes clusters. Fast, efficient, and packed with features for daily Kubernetes operations.',
    type: 'tool',
    category: 'Kubernetes',
    tags: ['Kubernetes', 'CLI', 'DevOps', 'Tools'],
    url: 'https://github.com/derailed/k9s',
    author: 'Fernand Galiana',
    submittedBy: 'Alice Mutua',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    submittedDate: '2024-11-28',
    upvotes: 523,
    views: 8912,
    difficulty: 'beginner',
    isCurated: true
  },
  {
    id: '7',
    title: 'Prometheus Monitoring Complete Documentation',
    description: 'Official documentation for Prometheus monitoring system, including installation, configuration, query language (PromQL), and alerting.',
    type: 'documentation',
    category: 'Monitoring',
    tags: ['Prometheus', 'Monitoring', 'Observability', 'Metrics'],
    url: 'https://prometheus.io/docs/',
    author: 'Prometheus Team',
    submittedBy: 'John Ochieng',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    submittedDate: '2024-11-25',
    upvotes: 289,
    views: 4123,
    difficulty: 'intermediate',
    isCurated: true
  },
  {
    id: '8',
    title: 'Awesome Kubernetes Resources',
    description: 'Curated list of Kubernetes resources including tools, tutorials, books, and community projects. Regularly updated with new content.',
    type: 'github-repo',
    category: 'Kubernetes',
    tags: ['Kubernetes', 'Awesome List', 'Resources'],
    url: 'https://github.com/ramitsurana/awesome-kubernetes',
    author: 'Ramit Surana',
    submittedBy: 'Sarah Johnson',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    submittedDate: '2024-11-20',
    upvotes: 678,
    views: 12345,
    difficulty: 'beginner',
    isCurated: true
  },
  {
    id: '9',
    title: 'Zero Trust Network Architecture',
    description: 'Tutorial on implementing zero trust principles in cloud infrastructure, including identity verification, least privilege access, and micro-segmentation.',
    type: 'tutorial',
    category: 'Security',
    tags: ['Security', 'Zero Trust', 'Network', 'Architecture'],
    url: 'https://example.com/zero-trust',
    author: 'CNCF Security Team',
    submittedBy: 'David Kamau',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    submittedDate: '2024-11-18',
    upvotes: 198,
    views: 2734,
    difficulty: 'advanced',
    estimatedTime: '90 min',
    isCurated: false
  },
  {
    id: '10',
    title: 'GitOps with ArgoCD',
    description: 'Complete guide to implementing GitOps workflows using ArgoCD for Kubernetes deployments, including best practices and troubleshooting.',
    type: 'article',
    category: 'DevOps',
    tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'CI/CD'],
    url: 'https://example.com/argocd-guide',
    author: 'ArgoCD Community',
    submittedBy: 'Mary Wanjiku',
    submittedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
    submittedDate: '2024-11-15',
    upvotes: 267,
    views: 3891,
    difficulty: 'intermediate',
    estimatedTime: '60 min read',
    isCurated: true
  }
]

const LEARNING_PATHS: LearningPath[] = [
  {
    id: '1',
    title: 'Kubernetes Fundamentals',
    description: 'Master Kubernetes from basics to advanced concepts including deployments, services, networking, and security.',
    resourceCount: 12,
    difficulty: 'beginner',
    estimatedTime: '8 weeks',
    icon: '☸️',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: '2',
    title: 'Cloud Security Specialist',
    description: 'Comprehensive path covering security best practices, compliance, identity management, and threat detection across cloud platforms.',
    resourceCount: 15,
    difficulty: 'intermediate',
    estimatedTime: '10 weeks',
    icon: '🔒',
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    id: '3',
    title: 'DevOps Engineer Track',
    description: 'Complete DevOps journey including CI/CD, infrastructure as code, monitoring, and automation tools.',
    resourceCount: 18,
    difficulty: 'intermediate',
    estimatedTime: '12 weeks',
    icon: '🔧',
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: '4',
    title: 'Multi-Cloud Architect',
    description: 'Learn to design and implement solutions across AWS, Azure, and GCP with focus on portability and cost optimization.',
    resourceCount: 20,
    difficulty: 'advanced',
    estimatedTime: '14 weeks',
    icon: '☁️',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  }
]

const RESOURCE_TYPE_CONFIG = {
  'article': { icon: '📄', label: 'Article', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  'video': { icon: '🎥', label: 'Video', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  'tutorial': { icon: '📚', label: 'Tutorial', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  'course': { icon: '🎓', label: 'Course', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  'book': { icon: '📖', label: 'Book', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  'tool': { icon: '🛠️', label: 'Tool', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
  'documentation': { icon: '📋', label: 'Docs', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300' },
  'github-repo': { icon: '💻', label: 'GitHub', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' }
}

const DIFFICULTY_CONFIG = {
  'beginner': { label: 'Beginner', color: 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300' },
  'intermediate': { label: 'Intermediate', color: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300' },
  'advanced': { label: 'Advanced', color: 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300' }
}

const CATEGORIES: ResourceCategory[] = [
  'Cloud Infrastructure',
  'Kubernetes',
  'Security',
  'DevOps',
  'Databases',
  'Networking',
  'AI/ML',
  'API Design',
  'Monitoring',
  'Cost Optimization'
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'resources' | 'learning-paths' | 'submit'>('resources')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<ResourceType | ''>('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | ''>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'most-viewed'>('popular')
  const [showCuratedOnly, setShowCuratedOnly] = useState(false)

  const filteredResources = SAMPLE_RESOURCES.filter(resource => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!resource.title.toLowerCase().includes(query) &&
          !resource.description.toLowerCase().includes(query) &&
          !resource.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false
      }
    }

    if (selectedType && resource.type !== selectedType) return false
    if (selectedCategory && resource.category !== selectedCategory) return false
    if (selectedDifficulty && resource.difficulty !== selectedDifficulty) return false
    if (showCuratedOnly && !resource.isCurated) return false

    return true
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes
    if (sortBy === 'most-viewed') return b.views - a.views
    if (sortBy === 'recent') return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    return 0
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            📚 Resource Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Curated collection of cloud computing resources, tutorials, and learning paths
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'resources'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveTab('learning-paths')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'learning-paths'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'submit'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span>+</span> Submit Resource
            </span>
          </button>
        </div>

        {/* Submit Tab */}
        {activeTab === 'submit' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Submit a Resource
            </h2>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kubernetes Security Best Practices"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/resource"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the resource and why it's valuable..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Type *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select type</option>
                    {Object.entries(RESOURCE_TYPE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>{config.icon} {config.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Difficulty *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="Resource author/creator"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 45 min read, 2 hours"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kubernetes, Security, RBAC"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                <button
                  type="button"
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-upepo-500 px-8 py-3 font-semibold text-white transition-all hover:bg-upepo-600"
                >
                  Submit Resource
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'learning-paths' && (
          <div className="grid gap-6 md:grid-cols-2">
            {LEARNING_PATHS.map(path => (
              <div
                key={path.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="text-4xl">{path.icon}</div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${DIFFICULTY_CONFIG[path.difficulty].color}`}>
                    {DIFFICULTY_CONFIG[path.difficulty].label}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  {path.title}
                </h3>

                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {path.description}
                </p>

                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>📚 {path.resourceCount} resources</span>
                  <span>⏱️ {path.estimatedTime}</span>
                </div>

                <Link
                  href={`/resources/learning-paths/${path.id}`}
                  className="block w-full rounded-lg bg-upepo-500 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-upepo-600"
                >
                  Start Learning
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <input
                type="text"
                placeholder="Search resources by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as ResourceType | '')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Types</option>
                  {Object.entries(RESOURCE_TYPE_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.icon} {config.label}</option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | '')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced' | '')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent' | 'most-viewed')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                  <option value="most-viewed">Most Viewed</option>
                </select>

                <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800">
                  <input
                    type="checkbox"
                    checked={showCuratedOnly}
                    onChange={(e) => setShowCuratedOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-upepo-500 focus:ring-upepo-500"
                  />
                  <span className="text-gray-900 dark:text-white">Curated only</span>
                  <span className="text-xl">✨</span>
                </label>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="space-y-6">
              {filteredResources.map(resource => {
                const typeConfig = RESOURCE_TYPE_CONFIG[resource.type]
                const difficultyConfig = DIFFICULTY_CONFIG[resource.difficulty]
                
                return (
                  <div
                    key={resource.id}
                    className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${typeConfig.color}`}>
                        {typeConfig.icon} {typeConfig.label}
                      </span>
                      <span className="rounded-full bg-upepo-100 px-3 py-1 text-sm font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                        {resource.category}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${difficultyConfig.color}`}>
                        {difficultyConfig.label}
                      </span>
                      {resource.isCurated && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                          ✨ Curated
                        </span>
                      )}
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                      {resource.title}
                    </h3>

                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {resource.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {resource.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>👤 {resource.author}</span>
                      {resource.estimatedTime && <span>⏱️ {resource.estimatedTime}</span>}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <img
                            src={resource.submittedByAvatar}
                            alt={resource.submittedBy}
                            className="h-6 w-6 rounded-full"
                          />
                          <span>Shared by {resource.submittedBy}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <button className="flex items-center gap-1 transition-colors hover:text-upepo-600 dark:hover:text-upepo-400">
                            <span>⬆️</span>
                            <span>{resource.upvotes}</span>
                          </button>
                          <span>👁️ {resource.views}</span>
                        </div>
                      </div>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                      >
                        View Resource →
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">📚</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  No resources found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        {activeTab === 'resources' && (
          <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Found a Great Resource?</h2>
            <p className="mb-6 text-lg">
              Share it with the community and help others learn
            </p>
            <button
              onClick={() => setActiveTab('submit')}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
            >
              Submit Resource
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
