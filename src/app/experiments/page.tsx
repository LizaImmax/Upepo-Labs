'use client'

import { useState } from 'react'
import Link from 'next/link'

type ExperimentStatus = 'planning' | 'running' | 'completed' | 'failed'

interface ExperimentIteration {
  id: string
  date: string
  hypothesis: string
  changes: string
  results: string
  learnings: string
}

interface Experiment {
  id: string
  title: string
  slug: string
  author: string
  authorAvatar: string
  description: string
  hypothesis: string
  methodology: string
  expectedOutcome: string
  actualOutcome?: string
  status: ExperimentStatus
  category: string
  tags: string[]
  startDate: string
  endDate?: string
  iterations: ExperimentIteration[]
  metrics: {
    successRate?: number
    performanceImprovement?: string
    costImpact?: string
  }
  relatedProjects?: string[]
  githubRepo?: string
}

const SAMPLE_EXPERIMENTS: Experiment[] = [
  {
    id: '1',
    title: 'Kubernetes Cluster Auto-Scaling under Variable Load',
    slug: 'k8s-autoscaling-load',
    author: 'David Kamau',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    description: 'Testing different auto-scaling strategies for Kubernetes clusters under variable workload patterns to optimize cost and performance.',
    hypothesis: 'Combining Horizontal Pod Autoscaler (HPA) with Cluster Autoscaler will provide better cost efficiency than HPA alone for workloads with unpredictable traffic patterns.',
    methodology: 'Deploy test application with varying traffic patterns (spike, gradual increase, sustained high load). Measure response times, resource utilization, and costs with three configurations: HPA only, CA only, and HPA+CA combined.',
    expectedOutcome: 'HPA+CA combination should reduce costs by 30-40% while maintaining 95th percentile response times under 500ms.',
    actualOutcome: 'Achieved 38% cost reduction with 98% of requests under 500ms. HPA alone caused resource waste during low traffic, while CA alone had slow scale-up times.',
    status: 'completed',
    category: 'Cloud Infrastructure',
    tags: ['Kubernetes', 'Auto-Scaling', 'Performance', 'Cost Optimization'],
    startDate: '2024-11-01',
    endDate: '2024-11-28',
    iterations: [
      {
        id: 'iter-1',
        date: '2024-11-05',
        hypothesis: 'Default HPA settings will handle spike traffic adequately',
        changes: 'Configured HPA with target CPU 70%, min 2 replicas, max 10',
        results: 'HPA scaled too slowly during traffic spikes, causing 15% request timeout rate',
        learnings: 'Default HPA behavior is too conservative for spike patterns. Need faster scaling triggers.'
      },
      {
        id: 'iter-2',
        date: '2024-11-12',
        hypothesis: 'Lowering CPU target to 50% will enable faster scaling',
        changes: 'Reduced CPU target to 50%, added custom metrics (request rate)',
        results: 'Faster scaling reduced timeout rate to 3%, but idle costs increased by 25%',
        learnings: 'Custom metrics provide better scaling signals. Need to combine with Cluster Autoscaler for cost efficiency.'
      },
      {
        id: 'iter-3',
        date: '2024-11-20',
        hypothesis: 'Adding Cluster Autoscaler will optimize node-level costs',
        changes: 'Enabled Cluster Autoscaler with scale-down delay of 10min',
        results: 'Cost reduced by 38%, response times improved to <500ms for 98% of requests',
        learnings: 'HPA+CA combination provides best balance. Scale-down delay prevents thrashing during variable load.'
      }
    ],
    metrics: {
      successRate: 98,
      performanceImprovement: '38% cost reduction',
      costImpact: '$450/month savings'
    },
    relatedProjects: ['kubernetes-cost-optimizer'],
    githubRepo: 'https://github.com/upepo-labs/k8s-autoscaling-experiment'
  },
  {
    id: '2',
    title: 'Multi-Region Database Replication Latency',
    slug: 'multi-region-db-latency',
    author: 'Mary Wanjiku',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
    description: 'Comparing different database replication strategies across AWS regions to minimize latency while ensuring data consistency.',
    hypothesis: 'Active-active replication with conflict resolution will provide better read performance than primary-replica setup with minimal consistency trade-offs.',
    methodology: 'Deploy PostgreSQL with pglogical extension in three AWS regions (us-east-1, eu-west-1, ap-southeast-1). Test with e-commerce workload simulation measuring read latency, write latency, and consistency lag.',
    expectedOutcome: 'Active-active should reduce average read latency by 60% with consistency lag under 100ms for 95% of writes.',
    status: 'running',
    category: 'Database',
    tags: ['Database', 'Multi-Region', 'Replication', 'Performance', 'AWS'],
    startDate: '2024-12-01',
    iterations: [
      {
        id: 'iter-1',
        date: '2024-12-05',
        hypothesis: 'Primary-replica setup will have high read latency for distant regions',
        changes: 'Set up primary in us-east-1 with read replicas in eu-west-1 and ap-southeast-1',
        results: 'Average read latency: us-east-1 (15ms), eu-west-1 (120ms), ap-southeast-1 (250ms)',
        learnings: 'Geographic distance significantly impacts read latency. Users in Asia experience poor performance.'
      },
      {
        id: 'iter-2',
        date: '2024-12-12',
        hypothesis: 'Active-active replication will reduce cross-region read latency',
        changes: 'Configured pglogical for bidirectional replication with last-write-wins conflict resolution',
        results: 'Read latency reduced to <30ms in all regions. Consistency lag averaging 85ms.',
        learnings: 'Active-active dramatically improves read performance. Conflict resolution working well for this workload. Continuing to monitor consistency edge cases.'
      }
    ],
    metrics: {
      performanceImprovement: '75% read latency reduction',
    },
    githubRepo: 'https://github.com/upepo-labs/multi-region-db-experiment'
  },
  {
    id: '3',
    title: 'Edge Caching Strategy for API Gateway',
    slug: 'edge-caching-api-gateway',
    author: 'James Otieno',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    description: 'Experimenting with different edge caching strategies for RESTful APIs to reduce latency and backend load.',
    hypothesis: 'Intelligent cache invalidation based on cache tags will provide 80%+ hit rates while keeping data fresh within 5 seconds.',
    methodology: 'Deploy API behind CloudFront with Lambda@Edge for cache control. Test three strategies: TTL-based (60s), surrogate-key invalidation, and predictive cache warming.',
    expectedOutcome: 'Surrogate-key approach should achieve 85% cache hit rate with data freshness under 5 seconds.',
    status: 'planning',
    category: 'API Design',
    tags: ['API Gateway', 'Caching', 'CDN', 'Performance', 'AWS CloudFront'],
    startDate: '2024-12-20',
    iterations: [],
    metrics: {},
    relatedProjects: ['api-gateway-optimization']
  },
  {
    id: '4',
    title: 'Chaos Engineering: Network Partition Resilience',
    slug: 'chaos-network-partition',
    author: 'Grace Mwangi',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
    description: 'Testing microservices resilience to network partitions using Chaos Mesh in Kubernetes environment.',
    hypothesis: 'Services with circuit breakers and retry logic will maintain 99% availability during network partition scenarios.',
    methodology: 'Use Chaos Mesh to simulate network partitions between microservices. Measure request success rate, latency, and recovery time with different resilience patterns.',
    expectedOutcome: 'Circuit breaker pattern should prevent cascade failures and maintain 99%+ availability.',
    actualOutcome: 'Achieved 97.5% availability. Circuit breakers prevented cascades but recovery time was slower than expected (45s vs 30s target).',
    status: 'failed',
    category: 'Reliability',
    tags: ['Chaos Engineering', 'Resilience', 'Microservices', 'Kubernetes'],
    startDate: '2024-10-15',
    endDate: '2024-11-10',
    iterations: [
      {
        id: 'iter-1',
        date: '2024-10-20',
        hypothesis: 'Basic circuit breakers will handle network partitions gracefully',
        changes: 'Implemented circuit breakers with 50% failure threshold, 30s timeout',
        results: 'Circuit breakers opened correctly but caused 2.5% request failures due to aggressive threshold',
        learnings: 'Need more sophisticated failure detection. Simple percentage thresholds too coarse-grained.'
      },
      {
        id: 'iter-2',
        date: '2024-10-28',
        hypothesis: 'Time-window based failure detection will improve accuracy',
        changes: 'Switched to sliding window (5 requests in 10s) instead of percentage',
        results: 'Improved availability to 97.5% but recovery time still 45s after partition heals',
        learnings: 'Better failure detection but need faster health check intervals for quicker recovery.'
      }
    ],
    metrics: {
      successRate: 97.5,
      performanceImprovement: 'Prevented cascade failures',
    },
    githubRepo: 'https://github.com/upepo-labs/chaos-network-experiment'
  }
]

const EXPERIMENT_CATEGORIES = [
  'Cloud Infrastructure',
  'Database',
  'Networking',
  'Security',
  'Performance',
  'Reliability',
  'API Design',
  'Cost Optimization'
]

const STATUS_CONFIG = {
  planning: { label: 'Planning', color: 'text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300', icon: '📋' },
  running: { label: 'Running', color: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300', icon: '🧪' },
  completed: { label: 'Completed', color: 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300', icon: '✅' },
  failed: { label: 'Failed', color: 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300', icon: '❌' }
}

export default function ExperimentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my-experiments' | 'new'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<ExperimentStatus | ''>('')
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid')

  const filteredExperiments = SAMPLE_EXPERIMENTS.filter(exp => {
    if (activeTab === 'my-experiments') return false // Would filter by current user

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!exp.title.toLowerCase().includes(query) &&
          !exp.description.toLowerCase().includes(query) &&
          !exp.author.toLowerCase().includes(query)) {
        return false
      }
    }

    if (selectedCategory && exp.category !== selectedCategory) return false
    if (selectedStatus && exp.status !== selectedStatus) return false

    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            🧪 Experiment Journal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Document, track, and share your cloud infrastructure experiments and findings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'all'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            All Experiments
          </button>
          <button
            onClick={() => setActiveTab('my-experiments')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'my-experiments'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Experiments
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
              <span>+</span> New Experiment
            </span>
          </button>
        </div>

        {activeTab === 'new' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Start a New Experiment
            </h2>

            <form className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Experiment Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kubernetes Auto-Scaling Performance"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select a category</option>
                    {EXPERIMENT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of what you're testing..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Scientific Method Section */}
              <div className="rounded-lg bg-upepo-50 p-6 dark:bg-upepo-900/20">
                <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  🔬 Scientific Method
                </h3>

                <div className="space-y-4">
                  {/* Hypothesis */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Hypothesis *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What do you believe will happen? e.g., 'Combining HPA with Cluster Autoscaler will reduce costs by 30% while maintaining response times under 500ms'"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Methodology */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Methodology *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="How will you test this? Include setup, variables, and measurements..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Expected Outcome */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Expected Outcome *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What results do you expect to see? Include specific metrics..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kubernetes, Auto-Scaling, Performance"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* GitHub Repo */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  GitHub Repository (optional)
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/username/repo"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Actions */}
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
                  Create Experiment
                </button>
              </div>
            </form>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'my-experiments') && (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Search experiments by title, author, or description..."
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
                  {EXPERIMENT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ExperimentStatus | '')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.icon} {config.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredExperiments.length} experiment{filteredExperiments.length !== 1 ? 's' : ''}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      viewMode === 'grid'
                        ? 'bg-upepo-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    📊 Grid
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      viewMode === 'timeline'
                        ? 'bg-upepo-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    📅 Timeline
                  </button>
                </div>
              </div>
            </div>

            {/* Experiments Display */}
            {viewMode === 'grid' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredExperiments.map(exp => {
                  const statusConfig = STATUS_CONFIG[exp.status]
                  return (
                    <div
                      key={exp.id}
                      className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color}`}>
                          {statusConfig.icon} {statusConfig.label}
                        </span>
                        <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                          {exp.category}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>

                      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                        {exp.description}
                      </p>

                      <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                        <div className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          Hypothesis:
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {exp.hypothesis.length > 100 ? exp.hypothesis.substring(0, 100) + '...' : exp.hypothesis}
                        </div>
                      </div>

                      <div className="mb-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <img
                          src={exp.authorAvatar}
                          alt={exp.author}
                          className="h-6 w-6 rounded-full"
                        />
                        <span>{exp.author}</span>
                      </div>

                      {exp.iterations.length > 0 && (
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                          🔄 {exp.iterations.length} iteration{exp.iterations.length !== 1 ? 's' : ''}
                        </div>
                      )}

                      {exp.metrics.successRate && (
                        <div className="mb-4">
                          <div className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Success Rate
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: `${exp.metrics.successRate}%` }}
                            />
                          </div>
                          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            {exp.metrics.successRate}%
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <Link
                          href={`/experiments/${exp.slug}`}
                          className="block w-full rounded-lg bg-upepo-500 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-upepo-600"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-8">
                {filteredExperiments.map((exp, idx) => {
                  const statusConfig = STATUS_CONFIG[exp.status]
                  return (
                    <div key={exp.id} className="relative pl-8">
                      {/* Timeline line */}
                      {idx !== filteredExperiments.length - 1 && (
                        <div className="absolute left-2 top-8 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                      )}
                      
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 ${
                        exp.status === 'completed' ? 'bg-green-500' :
                        exp.status === 'running' ? 'bg-yellow-500' :
                        exp.status === 'failed' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />

                      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color}`}>
                            {statusConfig.icon} {statusConfig.label}
                          </span>
                          <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                            {exp.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Started {new Date(exp.startDate).toLocaleDateString()}
                          </span>
                          {exp.endDate && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              • Ended {new Date(exp.endDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>

                        <div className="mb-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Hypothesis:
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {exp.hypothesis}
                            </div>
                          </div>
                          {exp.actualOutcome && (
                            <div>
                              <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Actual Outcome:
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {exp.actualOutcome}
                              </div>
                            </div>
                          )}
                        </div>

                        {exp.iterations.length > 0 && (
                          <div className="mb-4">
                            <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Iterations ({exp.iterations.length}):
                            </div>
                            <div className="space-y-2">
                              {exp.iterations.map((iter, iterIdx) => (
                                <div
                                  key={iter.id}
                                  className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-900"
                                >
                                  <div className="mb-1 font-semibold text-gray-900 dark:text-white">
                                    Iteration {iterIdx + 1} - {new Date(iter.date).toLocaleDateString()}
                                  </div>
                                  <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Changes:</strong> {iter.changes}
                                  </div>
                                  <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Results:</strong> {iter.results}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={exp.authorAvatar}
                              alt={exp.author}
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {exp.author}
                            </span>
                          </div>
                          <Link
                            href={`/experiments/${exp.slug}`}
                            className="rounded-lg bg-upepo-500 px-6 py-2 font-semibold text-white transition-all hover:bg-upepo-600"
                          >
                            View Full Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {filteredExperiments.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🧪</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  No experiments found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeTab === 'my-experiments'
                    ? "You haven't started any experiments yet"
                    : 'Try adjusting your search or filters'}
                </p>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        {activeTab === 'all' && (
          <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Running an Experiment?</h2>
            <p className="mb-6 text-lg">
              Document your hypothesis, methodology, iterations, and findings to share with the community
            </p>
            <button
              onClick={() => setActiveTab('new')}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
            >
              Start New Experiment
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
