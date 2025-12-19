'use client'

import { useState } from 'react'
import Link from 'next/link'

type ProjectType = 'poc' | 'research' | 'tool' | 'prototype' | 'investigation' | 'data-analysis'
type MaturityLevel = 'early' | 'stable' | 'production'
type ProjectStatus = 'active' | 'completed' | 'paused' | 'archived'

interface Project {
  id: number
  icon: string
  title: string
  category: string
  description: string
  longDescription?: string
  tags: string[]
  stars: number
  forks: number
  contributors: number
  cloudProviders: string[]
  techStack: string[]
  projectType: ProjectType
  maturity: MaturityLevel
  status: ProjectStatus
  author: string
  authorAvatar: string
  lastUpdated: string
  demoUrl?: string
  githubUrl?: string
  screenshot?: string
}

interface FilterOptions {
  searchQuery: string
  cloudProviders: string[]
  techStack: string[]
  projectTypes: ProjectType[]
  maturityLevels: MaturityLevel[]
  statuses: ProjectStatus[]
  sortBy: 'newest' | 'popular' | 'alphabetical' | 'trending'
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: 1,
    icon: '☁️',
    title: 'CloudSync Pro',
    category: 'Infrastructure',
    description: 'Multi-cloud synchronization tool for seamless data migration across AWS, Azure, and GCP.',
    longDescription: 'Enterprise-grade solution for synchronizing data across multiple cloud providers with built-in encryption, monitoring, and cost optimization.',
    tags: ['TypeScript', 'Terraform', 'AWS', 'Azure', 'GCP'],
    stars: 234,
    forks: 45,
    contributors: 12,
    cloudProviders: ['aws', 'azure', 'gcp'],
    techStack: ['devops', 'terraform'],
    projectType: 'tool',
    maturity: 'stable',
    status: 'active',
    author: 'Sarah Johnson',
    authorAvatar: '👩‍💻',
    lastUpdated: '2025-12-15',
    githubUrl: 'https://github.com/example/cloudsync',
    demoUrl: 'https://demo.cloudsync.io'
  },
  {
    id: 2,
    icon: '🔐',
    title: 'Zero-Trust Network Study',
    category: 'Security',
    description: 'Research on implementing zero-trust architecture in Kubernetes clusters.',
    longDescription: 'Comprehensive research paper examining security patterns and implementation strategies for zero-trust networking in cloud-native environments.',
    tags: ['Research', 'Kubernetes', 'Security', 'Whitepaper'],
    stars: 89,
    forks: 12,
    contributors: 5,
    cloudProviders: ['multi'],
    techStack: ['kubernetes', 'security'],
    projectType: 'research',
    maturity: 'stable',
    status: 'completed',
    author: 'David Kamau',
    authorAvatar: '👨‍🔬',
    lastUpdated: '2025-11-28'
  },
  {
    id: 3,
    icon: '🤖',
    title: 'MLFlow Edge',
    category: 'AI/ML',
    description: 'Lightweight MLOps platform optimized for edge computing and IoT devices.',
    longDescription: 'Production-ready MLOps solution designed for resource-constrained environments with automated model deployment and monitoring.',
    tags: ['Python', 'TensorFlow', 'Docker', 'Edge'],
    stars: 312,
    forks: 67,
    contributors: 15,
    cloudProviders: ['aws'],
    techStack: ['ai-ml', 'iot', 'docker'],
    projectType: 'tool',
    maturity: 'production',
    status: 'active',
    author: 'Grace Mwangi',
    authorAvatar: '👩‍🚀',
    lastUpdated: '2025-12-18',
    githubUrl: 'https://github.com/example/mlflow-edge',
    demoUrl: 'https://mlflow-edge.demo.com'
  },
  {
    id: 4,
    icon: '🧪',
    title: 'Serverless Cost Optimizer POC',
    category: 'DevOps',
    description: 'Proof of concept for automated serverless cost optimization using ML predictions.',
    longDescription: 'Experimental project exploring machine learning approaches to predict and optimize AWS Lambda costs.',
    tags: ['Python', 'AWS Lambda', 'ML', 'POC'],
    stars: 56,
    forks: 8,
    contributors: 3,
    cloudProviders: ['aws'],
    techStack: ['ai-ml', 'devops'],
    projectType: 'poc',
    maturity: 'early',
    status: 'active',
    author: 'John Ochieng',
    authorAvatar: '👨‍💼',
    lastUpdated: '2025-12-10'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Cloud Cost Analysis 2025',
    category: 'Data Analysis',
    description: 'Comprehensive data analysis of cloud computing costs across providers.',
    longDescription: 'In-depth analysis of pricing trends, cost optimization opportunities, and ROI comparisons across major cloud providers.',
    tags: ['Python', 'Data Science', 'Analysis', 'Jupyter'],
    stars: 145,
    forks: 23,
    contributors: 7,
    cloudProviders: ['aws', 'azure', 'gcp'],
    techStack: ['data-science'],
    projectType: 'data-analysis',
    maturity: 'stable',
    status: 'completed',
    author: 'Mary Wanjiku',
    authorAvatar: '👩‍🔬',
    lastUpdated: '2025-12-01'
  },
  {
    id: 6,
    icon: '🎨',
    title: 'K8s Dashboard Redesign',
    category: 'UI/UX',
    description: 'Modern, intuitive Kubernetes dashboard with improved UX and accessibility.',
    longDescription: 'Complete redesign of Kubernetes dashboard focusing on user experience, accessibility, and real-time monitoring capabilities.',
    tags: ['React', 'TypeScript', 'Kubernetes', 'UI/UX'],
    stars: 278,
    forks: 51,
    contributors: 14,
    cloudProviders: ['multi'],
    techStack: ['kubernetes', 'devops'],
    projectType: 'prototype',
    maturity: 'stable',
    status: 'active',
    author: 'Peter Kimani',
    authorAvatar: '👨‍🎨',
    lastUpdated: '2025-12-16',
    githubUrl: 'https://github.com/example/k8s-dashboard',
    demoUrl: 'https://k8s-dashboard-demo.io'
  },
  {
    id: 7,
    icon: '🔍',
    title: 'Multi-Cloud Performance Investigation',
    category: 'Research',
    description: 'Investigation into performance characteristics of identical workloads across cloud providers.',
    longDescription: 'Systematic investigation comparing compute, storage, and network performance across AWS, Azure, and GCP.',
    tags: ['Research', 'Benchmarking', 'Performance', 'Multi-Cloud'],
    stars: 92,
    forks: 15,
    contributors: 6,
    cloudProviders: ['aws', 'azure', 'gcp'],
    techStack: ['devops'],
    projectType: 'investigation',
    maturity: 'stable',
    status: 'completed',
    author: 'Alice Mutua',
    authorAvatar: '👩‍🔧',
    lastUpdated: '2025-11-20'
  },
  {
    id: 8,
    icon: '🌐',
    title: 'EdgeRouter',
    category: 'IoT',
    description: 'High-performance edge routing for IoT networks with built-in security.',
    longDescription: 'Production-ready edge routing solution with end-to-end encryption, load balancing, and real-time monitoring.',
    tags: ['Rust', 'MQTT', 'IoT', 'Edge'],
    stars: 201,
    forks: 34,
    contributors: 9,
    cloudProviders: ['aws', 'azure'],
    techStack: ['iot'],
    projectType: 'tool',
    maturity: 'production',
    status: 'active',
    author: 'James Otieno',
    authorAvatar: '👨‍💻',
    lastUpdated: '2025-12-17',
    githubUrl: 'https://github.com/example/edgerouter'
  }
]

const PROJECT_TYPE_LABELS: Record<ProjectType, { label: string; icon: string }> = {
  'poc': { label: 'Proof of Concept', icon: '🧪' },
  'research': { label: 'Research', icon: '🔬' },
  'tool': { label: 'Tool/Utility', icon: '🛠️' },
  'prototype': { label: 'Prototype', icon: '🎨' },
  'investigation': { label: 'Investigation', icon: '🔍' },
  'data-analysis': { label: 'Data Analysis', icon: '📊' }
}

const MATURITY_LABELS: Record<MaturityLevel, { label: string; color: string }> = {
  'early': { label: 'Early Stage', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  'stable': { label: 'Stable', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  'production': { label: 'Production', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' }
}

const STATUS_LABELS: Record<ProjectStatus, { label: string; color: string }> = {
  'active': { label: 'Active', color: 'bg-green-500' },
  'completed': { label: 'Completed', color: 'bg-blue-500' },
  'paused': { label: 'Paused', color: 'bg-yellow-500' },
  'archived': { label: 'Archived', color: 'bg-gray-500' }
}

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    cloudProviders: [],
    techStack: [],
    projectTypes: [],
    maturityLevels: [],
    statuses: [],
    sortBy: 'newest',
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter projects
  const filteredProjects = SAMPLE_PROJECTS.filter((project) => {
    // Search filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        project.author.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Cloud provider filter
    if (filters.cloudProviders.length > 0) {
      const matchesCloud = filters.cloudProviders.some((provider) =>
        project.cloudProviders.includes(provider)
      )
      if (!matchesCloud) return false
    }

    // Tech stack filter
    if (filters.techStack.length > 0) {
      const matchesTech = filters.techStack.some((tech) => project.techStack.includes(tech))
      if (!matchesTech) return false
    }

    // Project type filter
    if (filters.projectTypes.length > 0) {
      if (!filters.projectTypes.includes(project.projectType)) return false
    }

    // Maturity filter
    if (filters.maturityLevels.length > 0) {
      if (!filters.maturityLevels.includes(project.maturity)) return false
    }

    // Status filter
    if (filters.statuses.length > 0) {
      if (!filters.statuses.includes(project.status)) return false
    }

    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sortBy === 'popular') {
      return b.stars - a.stars
    } else if (filters.sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title)
    } else if (filters.sortBy === 'trending') {
      return (b.stars + b.forks * 2) - (a.stars + a.forks * 2)
    }
    // Default: newest
    return b.id - a.id
  })

  const toggleFilter = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value]
      return { ...prev, [filterType]: newArray }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore innovative cloud, AI, and open-source projects built by our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects, authors, or tags..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          {/* Project Type Filter */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Project Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter('projectTypes', type)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filters.projectTypes.includes(type)
                      ? 'bg-upepo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {PROJECT_TYPE_LABELS[type].icon} {PROJECT_TYPE_LABELS[type].label}
                </button>
              ))}
            </div>
          </div>

          {/* Maturity Level Filter */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Maturity Level
            </h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MATURITY_LABELS) as MaturityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => toggleFilter('maturityLevels', level)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filters.maturityLevels.includes(level)
                      ? 'bg-upepo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {MATURITY_LABELS[level].label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => toggleFilter('statuses', status)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filters.statuses.includes(status)
                      ? 'bg-upepo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className={`mr-2 inline-block h-2 w-2 rounded-full ${STATUS_LABELS[status].color}`}></span>
                  {STATUS_LABELS[status].label}
                </button>
              ))}
            </div>
          </div>

          {/* Cloud Provider Filter */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Cloud Provider
            </h3>
            <div className="flex flex-wrap gap-2">
              {['aws', 'azure', 'gcp', 'multi'].map((provider) => (
                <button
                  key={provider}
                  onClick={() => toggleFilter('cloudProviders', provider)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filters.cloudProviders.includes(provider)
                      ? 'bg-upepo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {provider === 'aws' && '☁️ AWS'}
                  {provider === 'azure' && '☁️ Azure'}
                  {provider === 'gcp' && '☁️ GCP'}
                  {provider === 'multi' && '🌐 Multi-Cloud'}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Filter */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['kubernetes', 'docker', 'terraform', 'ai-ml', 'devops', 'security', 'iot', 'data-science'].map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleFilter('techStack', tech)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filters.techStack.includes(tech)
                      ? 'bg-upepo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tech.charAt(0).toUpperCase() + tech.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {(filters.projectTypes.length > 0 || filters.maturityLevels.length > 0 || 
            filters.statuses.length > 0 || filters.cloudProviders.length > 0 || 
            filters.techStack.length > 0 || filters.searchQuery) && (
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <button
                onClick={() => setFilters({
                  searchQuery: '',
                  cloudProviders: [],
                  techStack: [],
                  projectTypes: [],
                  maturityLevels: [],
                  statuses: [],
                  sortBy: 'newest'
                })}
                className="text-sm font-medium text-upepo-600 hover:text-upepo-700 dark:text-upepo-400"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{sortedProjects.length}</span> of <span className="font-semibold">{SAMPLE_PROJECTS.length}</span> projects
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="alphabetical">A-Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-upepo-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-upepo-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-upepo-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-4xl">{project.icon}</div>
                    <div className="flex flex-col gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${MATURITY_LABELS[project.maturity].color}`}>
                        {MATURITY_LABELS[project.maturity].label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${STATUS_LABELS[project.status].color}`}></span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{STATUS_LABELS[project.status].label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-800 dark:bg-upepo-900 dark:text-upepo-300">
                      {PROJECT_TYPE_LABELS[project.projectType].icon} {PROJECT_TYPE_LABELS[project.projectType].label}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-lg">{project.authorAvatar}</span>
                    <span>{project.author}</span>
                    <span>•</span>
                    <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>⭐ {project.stars}</span>
                    <span>🍴 {project.forks}</span>
                    <span>👥 {project.contributors}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        View Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg bg-upepo-500 px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:bg-upepo-600"
                      >
                        Live Demo
                      </a>
                    )}
                    {!project.githubUrl && !project.demoUrl && (
                      <button className="flex-1 rounded-lg bg-upepo-500 px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:bg-upepo-600">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProjects.map((project) => (
              <div key={project.id} className="flex gap-6 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="text-5xl">{project.icon}</div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-800 dark:bg-upepo-900 dark:text-upepo-300">
                        {PROJECT_TYPE_LABELS[project.projectType].icon} {PROJECT_TYPE_LABELS[project.projectType].label}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${MATURITY_LABELS[project.maturity].color}`}>
                        {MATURITY_LABELS[project.maturity].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${STATUS_LABELS[project.status].color}`}></span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{STATUS_LABELS[project.status].label}</span>
                    </div>
                  </div>

                  <p className="mb-3 text-gray-600 dark:text-gray-300">
                    {project.longDescription || project.description}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="text-lg">{project.authorAvatar}</span>
                        {project.author}
                      </span>
                      <span>⭐ {project.stars}</span>
                      <span>🍴 {project.forks}</span>
                      <span>👥 {project.contributors}</span>
                      <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          View Code
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-upepo-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-upepo-600"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {sortedProjects.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Submit Project CTA */}
        <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Have a Project?</h2>
          <p className="mb-6 text-lg">
            Submit your research, experiment, or tool to Upepo Labs
          </p>
          <Link
            href="/submit"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
          >
            Submit Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}
  {
    id: 1,
    icon: '☁️',
    title: 'CloudSync',
    category: 'Infrastructure',
    description: 'Multi-cloud synchronization tool for seamless data migration across AWS, Azure, and GCP.',
    tags: ['TypeScript', 'Terraform', 'AWS', 'Azure', 'GCP'],
    stars: 234,
    forks: 45,
    contributors: 12,
    cloudProviders: ['aws', 'azure', 'gcp'],
    techStack: ['devops'],
  },
  {
    id: 2,
    icon: '🔐',
    title: 'SecureVault',
    category: 'Security',
    description: 'Zero-trust secrets management system with automated rotation and audit logging.',
    tags: ['Go', 'Kubernetes', 'Vault', 'Security'],
    stars: 189,
    forks: 32,
    contributors: 8,
    cloudProviders: ['multi'],
    techStack: ['kubernetes'],
  },
  {
    id: 3,
    icon: '🤖',
    title: 'MLFlow Edge',
    category: 'AI/ML',
    description: 'Lightweight MLOps platform optimized for edge computing and IoT devices.',
    tags: ['Python', 'TensorFlow', 'Docker', 'Edge'],
    stars: 312,
    forks: 67,
    contributors: 15,
    cloudProviders: ['aws'],
    techStack: ['ai-ml', 'iot'],
  },
  {
    id: 4,
    icon: '📊',
    title: 'ObservabilityHub',
    category: 'DevOps',
    description: 'Unified observability platform combining metrics, logs, and traces.',
    tags: ['TypeScript', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    stars: 156,
    forks: 28,
    contributors: 10,
    cloudProviders: ['multi'],
    techStack: ['devops'],
  },
  {
    id: 5,
    icon: '🚀',
    title: 'DeployMaster',
    category: 'DevOps',
    description: 'GitOps-based deployment automation with canary releases and rollbacks.',
    tags: ['Python', 'Kubernetes', 'ArgoCD', 'Flux'],
    stars: 278,
    forks: 51,
    contributors: 14,
    cloudProviders: ['multi'],
    techStack: ['kubernetes', 'devops'],
  },
  {
    id: 6,
    icon: '🌐',
    title: 'EdgeRouter',
    category: 'IoT',
    description: 'High-performance edge routing for IoT networks with built-in security.',
    tags: ['Rust', 'MQTT', 'IoT', 'Edge'],
    stars: 145,
    forks: 23,
    contributors: 7,
    cloudProviders: ['aws', 'azure'],
    techStack: ['iot'],
  },
]

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    cloudProviders: [],
    techStack: [],
    sortBy: 'newest',
  })

  // Filter projects based on search and filters
  const filteredProjects = SAMPLE_PROJECTS.filter((project) => {
    // Search filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Cloud provider filter
    if (filters.cloudProviders.length > 0) {
      const matchesCloud = filters.cloudProviders.some((provider) =>
        project.cloudProviders.includes(provider)
      )
      if (!matchesCloud) return false
    }

    // Tech stack filter
    if (filters.techStack.length > 0) {
      const matchesTech = filters.techStack.some((tech) => project.techStack.includes(tech))
      if (!matchesTech) return false
    }

    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sortBy === 'popular') {
      return b.stars - a.stars
    } else if (filters.sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title)
    }
    // Default: newest (by id in this case)
    return b.id - a.id
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore innovative cloud, AI, and open-source projects built by our community
          </p>
        </div>

        {/* Search & Filter Component */}
        <SearchFilter onFilterChange={setFilters} />

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedProjects.length} of {SAMPLE_PROJECTS.length} projects
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => (
            <div key={project.id} className="card group hover:border-upepo-500">
              <div className="mb-4 flex items-start justify-between">
                <div className="text-3xl">{project.icon}</div>
                <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-800 dark:bg-upepo-900 dark:text-upepo-300">
                  {project.category}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>⭐ {project.stars}</span>
                <span>🍴 {project.forks}</span>
                <span>👥 {project.contributors}</span>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {sortedProjects.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Submit Project CTA */}
        <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Have a Project?</h2>
          <p className="mb-6 text-lg">
            Submit your cloud, AI, or open-source project to Upepo Labs
          </p>
          <Link
            href="/submit"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
          >
            Submit Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}
