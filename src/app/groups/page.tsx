'use client'

import { useState } from 'react'
import Link from 'next/link'

type GroupCategory = 'Cloud Infrastructure' | 'Security' | 'Kubernetes' | 'Databases' | 'Networking' | 'AI/ML' | 'DevOps'
type GroupPrivacy = 'public' | 'private'

interface GroupMember {
  id: string
  name: string
  avatar: string
  role: 'admin' | 'moderator' | 'member'
  joinedDate: string
}

interface Discussion {
  id: string
  title: string
  author: string
  authorAvatar: string
  replies: number
  views: number
  lastActivity: string
}

interface ResearchGroup {
  id: string
  name: string
  slug: string
  description: string
  category: GroupCategory
  tags: string[]
  privacy: GroupPrivacy
  memberCount: number
  projectCount: number
  resourceCount: number
  discussionCount: number
  createdDate: string
  coverImage: string
  icon: string
  admins: GroupMember[]
  recentDiscussions: Discussion[]
  upcomingEvents?: {
    title: string
    date: string
  }[]
}

const SAMPLE_GROUPS: ResearchGroup[] = [
  {
    id: '1',
    name: 'Kubernetes Security Research',
    slug: 'k8s-security',
    description: 'Dedicated to researching and implementing advanced security patterns in Kubernetes clusters. Topics include RBAC, network policies, pod security standards, zero-trust architecture, and threat detection.',
    category: 'Security',
    tags: ['Kubernetes', 'Security', 'Zero-Trust', 'RBAC', 'Network Policies'],
    privacy: 'public',
    memberCount: 234,
    projectCount: 12,
    resourceCount: 45,
    discussionCount: 89,
    createdDate: '2024-08-15',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=200&fit=crop',
    icon: '🔒',
    admins: [
      {
        id: '1',
        name: 'David Kamau',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        role: 'admin',
        joinedDate: '2024-08-15'
      }
    ],
    recentDiscussions: [
      {
        id: '1',
        title: 'Zero-Trust Implementation Patterns',
        author: 'David Kamau',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        replies: 23,
        views: 456,
        lastActivity: '2025-12-18T10:30:00Z'
      },
      {
        id: '2',
        title: 'Pod Security Standards vs OPA Gatekeeper',
        author: 'Sarah Johnson',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        replies: 18,
        views: 342,
        lastActivity: '2025-12-17T15:45:00Z'
      }
    ],
    upcomingEvents: [
      {
        title: 'K8s Security Workshop',
        date: '2025-12-25T14:00:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Multi-Cloud Architecture',
    slug: 'multi-cloud',
    description: 'Exploring strategies for building portable, cost-effective applications across AWS, Azure, and GCP. Focus on abstraction layers, cost optimization, and workload placement.',
    category: 'Cloud Infrastructure',
    tags: ['Multi-Cloud', 'AWS', 'Azure', 'GCP', 'Cost Optimization'],
    privacy: 'public',
    memberCount: 187,
    projectCount: 8,
    resourceCount: 32,
    discussionCount: 67,
    createdDate: '2024-09-10',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=200&fit=crop',
    icon: '☁️',
    admins: [
      {
        id: '2',
        name: 'Mary Wanjiku',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
        role: 'admin',
        joinedDate: '2024-09-10'
      }
    ],
    recentDiscussions: [
      {
        id: '3',
        title: 'Terraform Modules for Multi-Cloud',
        author: 'Mary Wanjiku',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary',
        replies: 31,
        views: 678,
        lastActivity: '2025-12-18T09:15:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Database Performance Research',
    slug: 'database-performance',
    description: 'Research group focused on database optimization, replication strategies, query performance, and distributed database patterns. Covers PostgreSQL, MySQL, MongoDB, and more.',
    category: 'Databases',
    tags: ['Databases', 'Performance', 'PostgreSQL', 'Replication', 'Query Optimization'],
    privacy: 'public',
    memberCount: 156,
    projectCount: 15,
    resourceCount: 28,
    discussionCount: 102,
    createdDate: '2024-07-20',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=200&fit=crop',
    icon: '🗄️',
    admins: [
      {
        id: '3',
        name: 'James Otieno',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
        role: 'admin',
        joinedDate: '2024-07-20'
      }
    ],
    recentDiscussions: [
      {
        id: '4',
        title: 'Multi-Region Replication Strategies',
        author: 'James Otieno',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
        replies: 27,
        views: 512,
        lastActivity: '2025-12-17T16:20:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'AI/ML Infrastructure',
    slug: 'aiml-infra',
    description: 'Building and optimizing infrastructure for AI/ML workloads. Topics include GPU clusters, model serving, training pipelines, MLOps, and cost optimization for ML.',
    category: 'AI/ML',
    tags: ['AI', 'ML', 'MLOps', 'GPU', 'Model Serving'],
    privacy: 'public',
    memberCount: 298,
    projectCount: 10,
    resourceCount: 56,
    discussionCount: 134,
    createdDate: '2024-10-05',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=200&fit=crop',
    icon: '🤖',
    admins: [
      {
        id: '4',
        name: 'Grace Mwangi',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
        role: 'admin',
        joinedDate: '2024-10-05'
      }
    ],
    recentDiscussions: [
      {
        id: '5',
        title: 'GPU Sharing in Kubernetes',
        author: 'Grace Mwangi',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
        replies: 42,
        views: 892,
        lastActivity: '2025-12-18T11:45:00Z'
      }
    ]
  },
  {
    id: '5',
    name: 'DevOps Automation',
    slug: 'devops-automation',
    description: 'Research and experimentation with CI/CD pipelines, infrastructure automation, GitOps, and deployment strategies. Sharing best practices and tools.',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'GitOps', 'Automation', 'Terraform'],
    privacy: 'public',
    memberCount: 312,
    projectCount: 18,
    resourceCount: 67,
    discussionCount: 156,
    createdDate: '2024-06-12',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=200&fit=crop',
    icon: '⚙️',
    admins: [
      {
        id: '5',
        name: 'Peter Kimani',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peter',
        role: 'admin',
        joinedDate: '2024-06-12'
      }
    ],
    recentDiscussions: [
      {
        id: '6',
        title: 'ArgoCD vs Flux: Production Experiences',
        author: 'Peter Kimani',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peter',
        replies: 38,
        views: 734,
        lastActivity: '2025-12-18T08:30:00Z'
      }
    ]
  },
  {
    id: '6',
    name: 'Network Engineering Lab',
    slug: 'network-lab',
    description: 'Experimental network architectures, SDN, service mesh, API gateways, and edge computing. Focused on performance, security, and reliability.',
    category: 'Networking',
    tags: ['Networking', 'SDN', 'Service Mesh', 'API Gateway', 'Edge'],
    privacy: 'public',
    memberCount: 143,
    projectCount: 9,
    resourceCount: 34,
    discussionCount: 78,
    createdDate: '2024-11-01',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=200&fit=crop',
    icon: '🌐',
    admins: [
      {
        id: '6',
        name: 'Alice Mutua',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        role: 'admin',
        joinedDate: '2024-11-01'
      }
    ],
    recentDiscussions: [
      {
        id: '7',
        title: 'Istio vs Linkerd Performance Comparison',
        author: 'Alice Mutua',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        replies: 19,
        views: 423,
        lastActivity: '2025-12-16T14:10:00Z'
      }
    ]
  }
]

const CATEGORIES: GroupCategory[] = [
  'Cloud Infrastructure',
  'Security',
  'Kubernetes',
  'Databases',
  'Networking',
  'AI/ML',
  'DevOps'
]

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-groups' | 'create'>('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<GroupCategory | ''>('')
  const [sortBy, setSortBy] = useState<'members' | 'activity' | 'newest'>('members')

  const filteredGroups = SAMPLE_GROUPS.filter(group => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!group.name.toLowerCase().includes(query) &&
          !group.description.toLowerCase().includes(query) &&
          !group.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false
      }
    }

    if (selectedCategory && group.category !== selectedCategory) return false

    return true
  }).sort((a, b) => {
    if (sortBy === 'members') return b.memberCount - a.memberCount
    if (sortBy === 'activity') return b.discussionCount - a.discussionCount
    if (sortBy === 'newest') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    return 0
  })

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
            👥 Research Groups
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join communities focused on specific cloud topics, collaborate on research, and share knowledge
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('discover')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'discover'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Discover Groups
          </button>
          <button
            onClick={() => setActiveTab('my-groups')}
            className={`pb-4 text-lg font-semibold transition-all ${
              activeTab === 'my-groups'
                ? 'border-b-2 border-upepo-500 text-upepo-600 dark:text-upepo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Groups
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
              <span>+</span> Create Group
            </span>
          </button>
        </div>

        {/* Create Group Tab */}
        {activeTab === 'create' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Create a Research Group
            </h2>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kubernetes Security Research"
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
                  Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the purpose and focus of your research group..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

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

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Privacy Setting *
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-upepo-500 dark:border-gray-700">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      defaultChecked
                      className="mt-1 h-4 w-4 text-upepo-500 focus:ring-upepo-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        🌍 Public
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Anyone can discover and join this group
                      </div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-upepo-500 dark:border-gray-700">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      className="mt-1 h-4 w-4 text-upepo-500 focus:ring-upepo-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        🔒 Private
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Members must be invited or request to join
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Group Icon (emoji)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 🔒 🌐 ⚙️"
                  maxLength={2}
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
                  Create Group
                </button>
              </div>
            </form>
          </div>
        )}

        {/* My Groups Tab */}
        {activeTab === 'my-groups' && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">👥</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              You haven't joined any groups yet
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Discover research groups that match your interests
            </p>
            <button
              onClick={() => setActiveTab('discover')}
              className="rounded-lg bg-upepo-500 px-8 py-3 font-semibold text-white transition-all hover:bg-upepo-600"
            >
              Discover Groups
            </button>
          </div>
        )}

        {/* Discover Groups Tab */}
        {activeTab === 'discover' && (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Search groups by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as GroupCategory | '')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'members' | 'activity' | 'newest')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="members">Most Members</option>
                  <option value="activity">Most Active</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Groups Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map(group => (
                <div
                  key={group.id}
                  className="rounded-xl border border-gray-200 bg-white transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Cover Image */}
                  <div
                    className="h-32 rounded-t-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${group.coverImage})` }}
                  >
                    <div className="flex h-full items-end p-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-white text-4xl dark:border-gray-800 dark:bg-gray-800">
                        {group.icon}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {group.name}
                      </h3>
                      {group.privacy === 'private' && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          🔒 Private
                        </span>
                      )}
                    </div>

                    <span className="mb-3 inline-block rounded-full bg-upepo-100 px-3 py-1 text-sm font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                      {group.category}
                    </span>

                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                      {group.description.length > 120 ? group.description.substring(0, 120) + '...' : group.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-4 gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {group.memberCount}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {group.projectCount}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {group.resourceCount}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Resources</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {group.discussionCount}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Topics</div>
                      </div>
                    </div>

                    {/* Recent Discussion Preview */}
                    {group.recentDiscussions.length > 0 && (
                      <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                        <div className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          💬 Latest Discussion
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {group.recentDiscussions[0].title}
                        </div>
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {group.recentDiscussions[0].replies} replies · {formatTimeAgo(group.recentDiscussions[0].lastActivity)}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-1">
                      {group.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {group.tags.length > 3 && (
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          +{group.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/groups/${group.slug}` as any}
                      className="block w-full rounded-lg bg-upepo-500 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-upepo-600"
                    >
                      View Group
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  No groups found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        {activeTab === 'discover' && (
          <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Can't Find the Right Group?</h2>
            <p className="mb-6 text-lg">
              Create your own research group and build a community around your interests
            </p>
            <button
              onClick={() => setActiveTab('create')}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
            >
              Create a Group
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
