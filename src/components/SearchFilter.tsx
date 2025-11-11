'use client'

import { useState } from 'react'

export interface FilterOptions {
  searchQuery: string
  cloudProviders: string[]
  techStack: string[]
  sortBy: 'newest' | 'popular' | 'alphabetical'
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void
}

const CLOUD_PROVIDERS = [
  { id: 'aws', label: 'AWS', icon: '☁️' },
  { id: 'azure', label: 'Azure', icon: '☁️' },
  { id: 'gcp', label: 'GCP', icon: '☁️' },
  { id: 'multi', label: 'Multi-Cloud', icon: '🌐' },
]

const TECH_STACKS = [
  { id: 'ai-ml', label: 'AI/ML', icon: '🤖' },
  { id: 'kubernetes', label: 'Kubernetes', icon: '☸️' },
  { id: 'serverless', label: 'Serverless', icon: '⚡' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
  { id: 'iot', label: 'IoT', icon: '📡' },
  { id: 'devops', label: 'DevOps', icon: '🔧' },
]

export function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [cloudProviders, setCloudProviders] = useState<string[]>([])
  const [techStack, setTechStack] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'alphabetical'>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (
    newSearch?: string,
    newCloud?: string[],
    newTech?: string[],
    newSort?: 'newest' | 'popular' | 'alphabetical'
  ) => {
    const filters = {
      searchQuery: newSearch ?? searchQuery,
      cloudProviders: newCloud ?? cloudProviders,
      techStack: newTech ?? techStack,
      sortBy: newSort ?? sortBy,
    }
    onFilterChange(filters)
  }

  const toggleCloudProvider = (provider: string) => {
    const newProviders = cloudProviders.includes(provider)
      ? cloudProviders.filter((p) => p !== provider)
      : [...cloudProviders, provider]
    setCloudProviders(newProviders)
    handleFilterChange(undefined, newProviders)
  }

  const toggleTechStack = (tech: string) => {
    const newTech = techStack.includes(tech)
      ? techStack.filter((t) => t !== tech)
      : [...techStack, tech]
    setTechStack(newTech)
    handleFilterChange(undefined, undefined, newTech)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterChange(value)
  }

  const handleSortChange = (value: 'newest' | 'popular' | 'alphabetical') => {
    setSortBy(value)
    handleFilterChange(undefined, undefined, undefined, value)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setCloudProviders([])
    setTechStack([])
    setSortBy('newest')
    onFilterChange({
      searchQuery: '',
      cloudProviders: [],
      techStack: [],
      sortBy: 'newest',
    })
  }

  const activeFilterCount = cloudProviders.length + techStack.length + (searchQuery ? 1 : 0)

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      {/* Search Bar */}
      <div className="mb-4 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects, research, or topics..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-upepo-600 px-2 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          {/* Cloud Providers */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cloud Providers
            </h3>
            <div className="flex flex-wrap gap-2">
              {CLOUD_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => toggleCloudProvider(provider.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    cloudProviders.includes(provider.id)
                      ? 'bg-upepo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {provider.icon} {provider.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACKS.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => toggleTechStack(tech.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    techStack.includes(tech.id)
                      ? 'bg-upepo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tech.icon} {tech.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sort By
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange('newest')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'newest'
                    ? 'bg-upepo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🆕 Newest
              </button>
              <button
                onClick={() => handleSortChange('popular')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-upepo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🔥 Popular
              </button>
              <button
                onClick={() => handleSortChange('alphabetical')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === 'alphabetical'
                    ? 'bg-upepo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🔤 A-Z
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-upepo-600 hover:text-upepo-700 dark:text-upepo-400"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
