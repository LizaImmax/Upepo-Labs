import Link from 'next/link'

export default function ResearchPage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Research & Publications</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Cutting-edge insights in cloud, AI, security, and emerging technologies
          </p>
        </div>

        {/* Featured Research */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-upepo-50 to-upepo-100 p-8 dark:from-upepo-900 dark:to-upepo-800">
          <div className="flex items-start gap-6">
            <div className="text-5xl">🧠</div>
            <div className="flex-1">
              <div className="mb-2 text-sm font-semibold text-upepo-600">
                Featured Research
              </div>
              <h2 className="mb-3 text-2xl font-bold">
                The Future of Multi-Cloud Orchestration: A Comprehensive Analysis
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                An in-depth exploration of orchestration patterns, challenges, and solutions 
                for managing workloads across AWS, Azure, and GCP. This whitepaper presents 
                novel approaches to cross-cloud service mesh integration and unified IAM strategies.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-white px-3 py-1 text-sm font-medium text-upepo-700 dark:bg-upepo-950">
                  Cloud Architecture
                </span>
                <span className="rounded-md bg-white px-3 py-1 text-sm font-medium text-upepo-700 dark:bg-upepo-950">
                  Multi-Cloud
                </span>
                <span className="rounded-md bg-white px-3 py-1 text-sm font-medium text-upepo-700 dark:bg-upepo-950">
                  Orchestration
                </span>
              </div>
              <div className="flex gap-4">
                <button className="btn-primary">Read Full Paper</button>
                <button className="btn-secondary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>

        {/* Research Categories */}
        <div className="mb-8 flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition-all hover:bg-upepo-100 hover:text-upepo-700 dark:bg-gray-800 dark:hover:bg-upepo-900"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 gap-8">
          {RESEARCH_PAPERS.map((paper) => (
            <div key={paper.id} className="card">
              <div className="flex items-start gap-6">
                <div className="text-4xl">{paper.icon}</div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-800">
                      {paper.category}
                    </span>
                    <span className="text-sm text-gray-500">{paper.date}</span>
                    <span className="text-sm text-gray-500">• {paper.readTime} min read</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{paper.title}</h3>
                  <p className="mb-3 text-gray-600 dark:text-gray-300">
                    {paper.abstract}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>👤</span>
                      <span>{paper.authors.join(', ')}</span>
                    </div>
                    <button className="text-sm font-medium text-upepo-600 hover:underline">
                      Read Paper →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Contribute to Research</h2>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
            Have research insights to share? Join our research community.
          </p>
          <Link href="/submit" className="btn-primary">
            Submit Research Proposal
          </Link>
        </div>
      </div>
    </div>
  )
}

const CATEGORIES = [
  'All',
  'Cloud Architecture',
  'Security',
  'AI/ML',
  'DevOps',
  'Edge Computing',
  'Blockchain',
  'IoT',
]

const RESEARCH_PAPERS = [
  {
    id: 1,
    icon: '🔐',
    category: 'Security',
    title: 'Zero-Trust Architecture in Cloud-Native Environments',
    abstract:
      'This paper presents a comprehensive framework for implementing zero-trust principles in Kubernetes-based cloud environments. We explore identity-based access controls, micro-segmentation, and continuous verification patterns.',
    tags: ['Kubernetes', 'Security', 'Zero-Trust', 'Service Mesh'],
    authors: ['Dr. Sarah Chen', 'Alex Kumar'],
    date: 'Nov 2025',
    readTime: 15,
  },
  {
    id: 2,
    icon: '🤖',
    category: 'AI/ML',
    title: 'MLOps Best Practices for Edge Computing',
    abstract:
      'An exploration of deploying and managing machine learning models at the edge. We discuss model optimization, federated learning, and efficient inference strategies for resource-constrained devices.',
    tags: ['MLOps', 'Edge Computing', 'TensorFlow Lite', 'Model Optimization'],
    authors: ['Prof. Michael Zhang', 'Emily Rodriguez'],
    date: 'Oct 2025',
    readTime: 20,
  },
  {
    id: 3,
    icon: '⚡',
    category: 'DevOps',
    title: 'GitOps at Scale: Patterns and Anti-Patterns',
    abstract:
      'A study of GitOps implementation patterns in large-scale enterprise environments. We analyze common pitfalls, security considerations, and strategies for managing hundreds of clusters.',
    tags: ['GitOps', 'Kubernetes', 'ArgoCD', 'Flux'],
    authors: ['James Williams', 'Priya Patel'],
    date: 'Sep 2025',
    readTime: 18,
  },
  {
    id: 4,
    icon: '🌐',
    category: 'Edge Computing',
    title: 'Distributed Computing at the Edge: A Survey',
    abstract:
      'This survey paper examines the current state of edge computing architectures, distributed consensus algorithms, and real-time data processing frameworks for IoT applications.',
    tags: ['Edge Computing', 'IoT', 'Distributed Systems', '5G'],
    authors: ['Dr. Lisa Park', 'Ahmed Hassan'],
    date: 'Aug 2025',
    readTime: 25,
  },
]
