import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata = {
  title: 'Learning Resources | Upepo Labs',
  description: 'Hands-on labs, tutorials, and guides for cloud computing, AI/ML, and open-source development.',
}

const HANDS_ON_LABS = [
  {
    title: '☁️ Multi-Cloud Deployment Lab',
    description: 'Deploy the same application across AWS, Azure, and GCP',
    level: 'Intermediate',
    duration: '2 hours',
    tasks: 5,
    topics: ['IaC', 'Terraform', 'Cloud CLI', 'Cross-Cloud Networking'],
  },
  {
    title: '🤖 Build an ML Pipeline',
    description: 'Create an end-to-end machine learning pipeline from data to deployment',
    level: 'Intermediate',
    duration: '3 hours',
    tasks: 7,
    topics: ['Data Processing', 'Model Training', 'MLOps', 'API Deployment'],
  },
  {
    title: '☸️ Kubernetes Security Hardening',
    description: 'Implement security best practices in a Kubernetes cluster',
    level: 'Advanced',
    duration: '2.5 hours',
    tasks: 6,
    topics: ['RBAC', 'Network Policies', 'Pod Security', 'Secrets Management'],
  },
  {
    title: '⚡ Serverless Event-Driven App',
    description: 'Build a real-time serverless application with event triggers',
    level: 'Beginner',
    duration: '1.5 hours',
    tasks: 4,
    topics: ['Lambda', 'EventBridge', 'DynamoDB', 'API Gateway'],
  },
  {
    title: '🔐 Zero-Trust Security Implementation',
    description: 'Set up zero-trust architecture in a cloud environment',
    level: 'Advanced',
    duration: '3 hours',
    tasks: 8,
    topics: ['Identity & Access', 'Network Segmentation', 'Encryption', 'Audit Logging'],
  },
  {
    title: '🌐 Edge Computing with IoT',
    description: 'Deploy ML models to edge devices and manage IoT fleet',
    level: 'Intermediate',
    duration: '2 hours',
    tasks: 6,
    topics: ['Edge Runtime', 'Model Optimization', 'Device Management', 'Data Sync'],
  },
]

const TUTORIALS = [
  {
    title: 'Deploy Your First Serverless App',
    category: 'Serverless',
    time: '30 min',
    level: 'Beginner',
    icon: '⚡',
  },
  {
    title: 'Building a Multi-Cloud CI/CD Pipeline',
    category: 'DevOps',
    time: '45 min',
    level: 'Intermediate',
    icon: '🔧',
  },
  {
    title: 'Training Custom ML Models on the Cloud',
    category: 'AI/ML',
    time: '60 min',
    level: 'Advanced',
    icon: '🤖',
  },
  {
    title: 'Kubernetes Security Best Practices',
    category: 'Security',
    time: '40 min',
    level: 'Intermediate',
    icon: '🔒',
  },
  {
    title: 'Building Real-time Data Pipelines',
    category: 'Data Engineering',
    time: '50 min',
    level: 'Advanced',
    icon: '📊',
  },
  {
    title: 'Infrastructure as Code with Terraform',
    category: 'IaC',
    time: '35 min',
    level: 'Beginner',
    icon: '🏗️',
  },
]

const RESOURCES = [
  {
    title: '📚 Documentation',
    description: 'Comprehensive guides and API references',
    link: '#',
  },
  {
    title: '🎥 Video Library',
    description: 'Watch tutorials and conference talks',
    link: '#',
  },
  {
    title: '💬 Community Forum',
    description: 'Ask questions and share knowledge',
    link: '#',
  },
  {
    title: '📝 Blog',
    description: 'Read articles from experts and contributors',
    link: '#',
  },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <div className="text-center">
          <div className="mb-6 inline-block animate-float text-6xl">🧪</div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            Hands-On Labs
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Learn by doing with practical, hands-on labs covering cloud computing, AI/ML, security,
            and modern development practices.
          </p>
        </div>
      </section>

      {/* Hands-On Labs */}
      <section className="container-custom py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Featured Labs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {HANDS_ON_LABS.map((lab) => (
            <div
              key={lab.title}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lab.title}</h3>
                <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300">
                  {lab.level}
                </span>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300">{lab.description}</p>

              <div className="mb-4 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>⏱️ {lab.duration}</span>
                <span>✓ {lab.tasks} tasks</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {lab.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <Link
                href="/lab/multi-cloud-deployment"
                className="inline-flex items-center gap-2 font-semibold text-upepo-600 transition-colors hover:text-upepo-700 dark:text-upepo-400"
              >
                Start Lab
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tutorials */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Quick Tutorials
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TUTORIALS.map((tutorial) => (
              <Link
                key={tutorial.title}
                href="#"
                className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-upepo-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-3xl">{tutorial.icon}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {tutorial.level}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-gray-900 group-hover:text-upepo-600 dark:text-white">
                  {tutorial.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>{tutorial.category}</span>
                  <span>•</span>
                  <span>⏱️ {tutorial.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upepo Learn Platform CTA */}
      <section className="bg-gradient-to-br from-upepo-600 via-upepo-700 to-upepo-800 py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-6 text-6xl">🎓</div>
            <h2 className="mb-6 text-4xl font-bold">Ready for Structured Learning?</h2>
            <p className="mb-8 text-xl text-upepo-100">
              Master cloud computing, AI/ML, and modern development practices with our comprehensive
              courses and get certification-ready on{' '}
              <span className="font-bold text-white">Upepo Learn</span>
            </p>

            <div className="mb-8 grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">📚</div>
                <h3 className="mb-2 text-lg font-bold">Structured Courses</h3>
                <p className="text-sm text-upepo-100">
                  Follow comprehensive learning paths with video lessons, quizzes, and projects
                </p>
              </div>

              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">🏆</div>
                <h3 className="mb-2 text-lg font-bold">Certifications</h3>
                <p className="text-sm text-upepo-100">
                  Earn industry-recognized certificates to showcase your expertise
                </p>
              </div>

              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">👨‍🏫</div>
                <h3 className="mb-2 text-lg font-bold">Expert Instructors</h3>
                <p className="text-sm text-upepo-100">
                  Learn from experienced practitioners and industry leaders
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://learn.upepo.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-upepo-600 transition-all hover:bg-upepo-50"
              >
                Visit Upepo Learn
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                Join Community
              </Link>
            </div>

            <p className="mt-6 text-sm text-upepo-200">
              Free tier available • 30-day money-back guarantee • Access to community forums
            </p>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="container-custom py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          More Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              className="rounded-lg border border-gray-200 bg-white p-6 text-center transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
