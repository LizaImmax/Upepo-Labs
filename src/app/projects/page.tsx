'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SearchFilter, type FilterOptions } from '@/components/SearchFilter'

const SAMPLE_PROJECTS = [
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
