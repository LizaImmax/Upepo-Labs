'use client'

import { useState } from 'react'
import Link from 'next/link'

type WikiCategory = 'Cloud Infrastructure' | 'Security' | 'Kubernetes' | 'Databases' | 'Networking' | 'DevOps' | 'Best Practices'

interface WikiPage {
  id: string
  title: string
  slug: string
  category: WikiCategory
  excerpt: string
  content: string
  tags: string[]
  author: string
  authorAvatar: string
  contributors: number
  views: number
  lastEdited: string
  versions: number
  isPopular: boolean
}

interface WikiVersion {
  id: string
  author: string
  date: string
  changeDescription: string
}

const SAMPLE_WIKI_PAGES: WikiPage[] = [
  {
    id: '1',
    title: 'Kubernetes Deployment Best Practices',
    slug: 'kubernetes-deployment-best-practices',
    category: 'Best Practices',
    excerpt: 'Comprehensive guide to deploying applications on Kubernetes following industry best practices for reliability, security, and performance.',
    content: `# Kubernetes Deployment Best Practices

## Overview
This guide covers essential best practices for deploying applications on Kubernetes...

## Resource Limits and Requests
Always define resource limits and requests for your containers...

## Health Checks
Implement liveness and readiness probes...

## Security Context
Use pod security policies and security contexts...`,
    tags: ['Kubernetes', 'Deployment', 'Best Practices', 'Production'],
    author: 'David Kamau',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    contributors: 12,
    views: 3421,
    lastEdited: '2025-12-18T10:30:00Z',
    versions: 24,
    isPopular: true
  },
  {
    id: '2',
    title: 'Multi-Cloud Networking Patterns',
    slug: 'multi-cloud-networking',
    category: 'Networking',
    excerpt: 'Architectural patterns for connecting applications across AWS, Azure, and GCP. Covers VPN, VPC peering, and service mesh options.',
    content: `# Multi-Cloud Networking Patterns

## Introduction
Connecting applications across multiple cloud providers...

## VPN Solutions
Site-to-site VPN configurations...

## Service Mesh
Using Istio for cross-cloud service communication...`,
    tags: ['Multi-Cloud', 'Networking', 'VPN', 'Service Mesh'],
    author: 'Mary Wanjiku',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
    contributors: 8,
    views: 2156,
    lastEdited: '2025-12-15T14:20:00Z',
    versions: 15,
    isPopular: true
  },
  {
    id: '3',
    title: 'Zero-Trust Security Implementation Guide',
    slug: 'zero-trust-security-guide',
    category: 'Security',
    excerpt: 'Step-by-step guide to implementing zero-trust security principles in cloud infrastructure. Covers identity, network segmentation, and continuous verification.',
    content: `# Zero-Trust Security Implementation Guide

## Core Principles
Zero-trust assumes no trust by default...

## Identity-Based Access
Implementing strong authentication and authorization...

## Network Segmentation
Micro-segmentation with network policies...`,
    tags: ['Security', 'Zero-Trust', 'Identity', 'Network Policies'],
    author: 'David Kamau',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    contributors: 15,
    views: 4567,
    lastEdited: '2025-12-17T09:15:00Z',
    versions: 31,
    isPopular: true
  },
  {
    id: '4',
    title: 'PostgreSQL Replication Strategies',
    slug: 'postgresql-replication',
    category: 'Databases',
    excerpt: 'Deep dive into PostgreSQL replication options including streaming replication, logical replication, and multi-master setups.',
    content: `# PostgreSQL Replication Strategies

## Streaming Replication
Physical replication for high availability...

## Logical Replication
Selective table replication across regions...

## Performance Considerations
Monitoring and tuning replication lag...`,
    tags: ['PostgreSQL', 'Databases', 'Replication', 'High Availability'],
    author: 'James Otieno',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    contributors: 10,
    views: 1892,
    lastEdited: '2025-12-10T16:45:00Z',
    versions: 18,
    isPopular: false
  },
  {
    id: '5',
    title: 'Terraform Module Design Patterns',
    slug: 'terraform-module-patterns',
    category: 'Cloud Infrastructure',
    excerpt: 'Best practices for designing reusable, maintainable Terraform modules. Covers composition, versioning, and testing strategies.',
    content: `# Terraform Module Design Patterns

## Module Structure
Organizing files and directories...

## Input Variables
Designing flexible interfaces...

## Output Values
Exposing the right information...`,
    tags: ['Terraform', 'IaC', 'Modules', 'Best Practices'],
    author: 'Grace Mwangi',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
    contributors: 9,
    views: 2734,
    lastEdited: '2025-12-12T11:30:00Z',
    versions: 22,
    isPopular: true
  },
  {
    id: '6',
    title: 'CI/CD Pipeline Security',
    slug: 'cicd-security',
    category: 'DevOps',
    excerpt: 'Security best practices for CI/CD pipelines including secrets management, dependency scanning, and secure deployments.',
    content: `# CI/CD Pipeline Security

## Secrets Management
Never commit secrets to version control...

## Dependency Scanning
Automated vulnerability detection...

## Secure Deployments
Signing and verification...`,
    tags: ['CI/CD', 'Security', 'DevOps', 'Best Practices'],
    author: 'Peter Kimani',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peter',
    contributors: 7,
    views: 1543,
    lastEdited: '2025-12-08T13:20:00Z',
    versions: 12,
    isPopular: false
  },
  {
    id: '7',
    title: 'Istio Service Mesh Configuration',
    slug: 'istio-configuration',
    category: 'Kubernetes',
    excerpt: 'Complete guide to configuring Istio service mesh including traffic management, security policies, and observability.',
    content: `# Istio Service Mesh Configuration

## Installation
Setting up Istio in your cluster...

## Traffic Management
Routing rules and load balancing...

## Security
mTLS and authorization policies...`,
    tags: ['Istio', 'Service Mesh', 'Kubernetes', 'Microservices'],
    author: 'Alice Mutua',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    contributors: 11,
    views: 3156,
    lastEdited: '2025-12-14T15:10:00Z',
    versions: 19,
    isPopular: true
  }
]

const CATEGORIES: WikiCategory[] = [
  'Cloud Infrastructure',
  'Security',
  'Kubernetes',
  'Databases',
  'Networking',
  'DevOps',
  'Best Practices'
]

export default function WikiPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<WikiCategory | ''>('')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'alphabetical'>('popular')

  const filteredPages = SAMPLE_WIKI_PAGES.filter(page => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!page.title.toLowerCase().includes(query) &&
          !page.excerpt.toLowerCase().includes(query) &&
          !page.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false
      }
    }

    if (selectedCategory && page.category !== selectedCategory) return false

    return true
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views
    if (sortBy === 'recent') return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title)
    return 0
  })

  const popularPages = SAMPLE_WIKI_PAGES.filter(p => p.isPopular).slice(0, 5)

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
            📚 Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Collaborative documentation for cloud infrastructure, curated by the community
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('browse')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'browse'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Browse Wiki
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'create'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span>+</span> New Page
            </span>
          </button>
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Create a New Wiki Page
            </h2>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kubernetes Deployment Best Practices"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Summary *
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary that will appear in search results..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Content * (Markdown supported)
                </label>
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <div className="mb-4 flex gap-2 border-b border-gray-200 pb-2 dark:border-gray-700">
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      <em>I</em>
                    </button>
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      {'</>'}
                    </button>
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      Link
                    </button>
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      H1
                    </button>
                    <button type="button" className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                      List
                    </button>
                  </div>
                  <textarea
                    rows={15}
                    placeholder="# Page Title

## Introduction
Write your content here...

## Section 1
...

## Code Examples
```yaml
apiVersion: v1
kind: Pod
```"
                    className="w-full border-0 bg-transparent p-2 text-gray-900 focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kubernetes, Deployment, Best Practices"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Change Description
                </label>
                <input
                  type="text"
                  placeholder="Brief description of what you're adding/changing"
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
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Preview
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-upepo-500 px-6 py-3 font-semibold text-white transition-all hover:bg-upepo-600"
                  >
                    Publish Page
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {/* Search and Filters */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search wiki pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />

                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as WikiCategory | '')}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent' | 'alphabetical')}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="recent">Recently Updated</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Wiki Pages */}
              <div className="space-y-6">
                {filteredPages.map(page => (
                  <div
                    key={page.id}
                    className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-upepo-100 px-3 py-1 text-sm font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                        {page.category}
                      </span>
                      {page.isPopular && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                          🔥 Popular
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/wiki/${page.slug}` as any}
                      className="mb-3 block text-2xl font-bold text-gray-900 hover:text-upepo-600 dark:text-white dark:hover:text-upepo-400"
                    >
                      {page.title}
                    </Link>

                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {page.excerpt}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {page.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <img
                            src={page.authorAvatar}
                            alt={page.author}
                            className="h-6 w-6 rounded-full"
                          />
                          <span>{page.author}</span>
                        </div>
                        <span>👥 {page.contributors} contributors</span>
                        <span>👁️ {page.views} views</span>
                        <span>📝 {page.versions} versions</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Updated {formatTimeAgo(page.lastEdited)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Pages */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  🔥 Popular Pages
                </h2>
                <div className="space-y-3">
                  {popularPages.map(page => (
                    <Link
                      key={page.id}
                      href={`/wiki/${page.slug}` as any}
                      className="block rounded-lg border border-gray-200 p-3 transition-all hover:border-upepo-500 dark:border-gray-700"
                    >
                      <div className="mb-1 font-semibold text-gray-900 dark:text-white">
                        {page.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        👁️ {page.views} views
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  📂 Categories
                </h2>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => {
                    const count = SAMPLE_WIKI_PAGES.filter(p => p.category === cat).length
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                          selectedCategory === cat
                            ? 'bg-upepo-100 text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{cat}</span>
                        <span className="text-gray-600 dark:text-gray-400">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contribution Stats */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  📊 Wiki Stats
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Pages</span>
                    <span className="font-bold text-gray-900 dark:text-white">{SAMPLE_WIKI_PAGES.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Views</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {SAMPLE_WIKI_PAGES.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Edits</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {SAMPLE_WIKI_PAGES.reduce((sum, p) => sum + p.versions, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {activeTab === 'browse' && (
          <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Share Your Knowledge</h2>
            <p className="mb-6 text-lg">
              Contribute to the community by creating or improving wiki pages
            </p>
            <button
              onClick={() => setActiveTab('create')}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
            >
              Create a Page
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
