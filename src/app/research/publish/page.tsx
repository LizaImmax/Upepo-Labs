'use client'

import { useState } from 'react'
import Link from 'next/link'

type ResearchStatus = 'draft' | 'under-review' | 'published'

interface ResearchPaper {
  id: string
  title: string
  slug: string
  abstract: string
  authors: string[]
  category: string
  tags: string[]
  status: ResearchStatus
  publishedDate?: string
  lastModified: string
  views: number
  citations: number
  downloads: number
  doi?: string
  pdfUrl?: string
}

const SAMPLE_PAPERS: ResearchPaper[] = [
  {
    id: '1',
    title: 'Zero-Trust Architecture Patterns in Kubernetes',
    slug: 'zero-trust-kubernetes',
    abstract: 'This paper presents a comprehensive analysis of implementing zero-trust security principles in Kubernetes clusters, including network policies, service mesh integration, and identity-based access controls.',
    authors: ['David Kamau', 'Sarah Johnson'],
    category: 'Security',
    tags: ['Kubernetes', 'Security', 'Zero-Trust', 'Network Policies'],
    status: 'published',
    publishedDate: '2025-11-28',
    lastModified: '2025-11-28',
    views: 1234,
    citations: 12,
    downloads: 456,
    doi: '10.12345/upepo.2025.001',
    pdfUrl: '/papers/zero-trust-kubernetes.pdf'
  },
  {
    id: '2',
    title: 'Multi-Cloud Cost Optimization Strategies',
    slug: 'multi-cloud-cost-optimization',
    abstract: 'An in-depth study of cost optimization techniques across AWS, Azure, and GCP, including automated resource management, reserved instances, and workload placement strategies.',
    authors: ['Mary Wanjiku', 'Peter Kimani', 'Alice Mutua'],
    category: 'Cloud Computing',
    tags: ['Multi-Cloud', 'Cost Optimization', 'AWS', 'Azure', 'GCP'],
    status: 'published',
    publishedDate: '2025-12-01',
    lastModified: '2025-12-01',
    views: 2156,
    citations: 23,
    downloads: 789,
    doi: '10.12345/upepo.2025.002',
    pdfUrl: '/papers/multi-cloud-cost.pdf'
  },
  {
    id: '3',
    title: 'Edge Computing for IoT: Performance Analysis',
    slug: 'edge-computing-iot',
    abstract: 'Comparative analysis of edge computing frameworks for IoT applications, measuring latency, bandwidth usage, and resource consumption across various deployment scenarios.',
    authors: ['James Otieno'],
    category: 'IoT',
    tags: ['Edge Computing', 'IoT', 'Performance', 'Benchmarking'],
    status: 'under-review',
    lastModified: '2025-12-15',
    views: 234,
    citations: 0,
    downloads: 45
  },
  {
    id: '4',
    title: 'AI-Driven Infrastructure Scaling Patterns',
    slug: 'ai-infrastructure-scaling',
    abstract: 'Investigation of machine learning approaches to predictive infrastructure scaling, including workload prediction models and automated resource provisioning strategies.',
    authors: ['Grace Mwangi', 'John Ochieng'],
    category: 'AI/ML',
    tags: ['AI', 'ML', 'Infrastructure', 'Auto-Scaling', 'Cloud'],
    status: 'draft',
    lastModified: '2025-12-18',
    views: 89,
    citations: 0,
    downloads: 12
  }
]

const RESEARCH_CATEGORIES = [
  'Cloud Computing',
  'Security',
  'AI/ML',
  'DevOps',
  'IoT',
  'Networking',
  'Data Science',
  'Architecture Patterns'
]

export default function ResearchPublishPage() {
  const [activeTab, setActiveTab] = useState<'my-papers' | 'published' | 'new'>('published')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const filteredPapers = SAMPLE_PAPERS.filter(paper => {
    if (activeTab === 'published' && paper.status !== 'published') return false
    if (activeTab === 'my-papers') return false // Would filter by current user

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!paper.title.toLowerCase().includes(query) &&
          !paper.abstract.toLowerCase().includes(query) &&
          !paper.authors.some(a => a.toLowerCase().includes(query))) {
        return false
      }
    }

    if (selectedCategory && paper.category !== selectedCategory) return false

    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Research Publications
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Browse, publish, and collaborate on cloud research and technical papers
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('published')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'published'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Published Papers
          </button>
          <button
            onClick={() => setActiveTab('my-papers')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'my-papers'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Papers
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'new'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span>+</span> New Paper
            </span>
          </button>
        </div>

        {activeTab === 'new' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Start a New Research Paper
            </h2>

            <form className="space-y-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Paper Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Advanced Kubernetes Security Patterns"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                  <option value="">Select a category</option>
                  {RESEARCH_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kubernetes, Security, Zero-Trust"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Abstract */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Abstract *
                </label>
                <textarea
                  rows={4}
                  placeholder="Write a brief summary of your research..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Co-Authors */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Co-Authors (optional)
                </label>
                <input
                  type="text"
                  placeholder="Search for collaborators..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You can add co-authors from the Upepo Labs community
                </p>
              </div>

              {/* Paper Content */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Paper Content *
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
                      Image
                    </button>
                  </div>
                  <textarea
                    rows={12}
                    placeholder="Write your research paper in Markdown format...

# Introduction
Start writing here...

## Methodology
...

## Results
...

## Conclusion
..."
                    className="w-full border-0 bg-transparent p-2 text-gray-900 focus:outline-none dark:text-white"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Supports Markdown formatting. <a href="#" className="text-upepo-600 hover:underline dark:text-upepo-400">View formatting guide</a>
                </p>
              </div>

              {/* Template Selection */}
              <div className="rounded-lg bg-upepo-50 p-4 dark:bg-upepo-900/20">
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  📄 Use a Template
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  Start with a pre-structured template
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Research Paper
                  </button>
                  <button type="button" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Technical Report
                  </button>
                  <button type="button" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Case Study
                  </button>
                  <button type="button" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Whitepaper
                  </button>
                </div>
              </div>

              {/* Actions */}
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
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-upepo-500 px-6 py-3 font-semibold text-white transition-all hover:bg-upepo-600"
                  >
                    Submit for Review
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {(activeTab === 'published' || activeTab === 'my-papers') && (
          <>
            {/* Search and Filters */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Search papers by title, author, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Categories</option>
                {RESEARCH_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''}
            </div>

            {/* Papers List */}
            <div className="space-y-6">
              {filteredPapers.map(paper => (
                <div
                  key={paper.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {paper.title}
                        </h3>
                        {paper.status === 'published' && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                            ✓ Published
                          </span>
                        )}
                        {paper.status === 'under-review' && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                            Under Review
                          </span>
                        )}
                        {paper.status === 'draft' && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="mb-3 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                          {paper.category}
                        </span>
                        <span>By {paper.authors.join(', ')}</span>
                        <span>•</span>
                        <span>{paper.publishedDate ? new Date(paper.publishedDate).toLocaleDateString() : `Updated ${new Date(paper.lastModified).toLocaleDateString()}`}</span>
                      </div>
                    </div>
                    {paper.doi && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">DOI</div>
                        <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                          {paper.doi}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {paper.abstract}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {paper.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <span>👁️ {paper.views} views</span>
                      <span>📄 {paper.downloads} downloads</span>
                      <span>📚 {paper.citations} citations</span>
                    </div>

                    <div className="flex gap-2">
                      {paper.pdfUrl && (
                        <a
                          href={paper.pdfUrl}
                          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Download PDF
                        </a>
                      )}
                      <Link
                        href={`/research/${paper.slug}` as any}
                        className="rounded-lg bg-upepo-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-upepo-600"
                      >
                        Read Paper
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">📄</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  No papers found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeTab === 'my-papers' 
                    ? "You haven't published any papers yet"
                    : 'Try adjusting your search or filters'
                  }
                </p>
              </div>
            )}
          </>
        )}

        {/* CTA for new researchers */}
        {activeTab === 'published' && (
          <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Have Research to Share?</h2>
            <p className="mb-6 text-lg">
              Publish your cloud research, technical investigations, or whitepapers with Upepo Labs
            </p>
            <button
              onClick={() => setActiveTab('new')}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
            >
              Start Writing
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
