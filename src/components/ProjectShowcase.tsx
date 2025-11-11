import Link from 'next/link'

export function ProjectShowcase() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions built by our community
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <div key={index} className="card group hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <div className="text-4xl">{project.icon}</div>
                <span className="rounded-full bg-upepo-100 px-3 py-1 text-xs font-semibold text-upepo-800">
                  {project.category}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold group-hover:text-upepo-600">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
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
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>⭐ {project.stars}</span>
                <span>🍴 {project.forks}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

const FEATURED_PROJECTS = [
  {
    icon: '☁️',
    title: 'CloudSync',
    category: 'Infrastructure',
    description:
      'Multi-cloud synchronization tool for seamless data migration across AWS, Azure, and GCP.',
    tags: ['TypeScript', 'Terraform', 'Multi-Cloud'],
    stars: 234,
    forks: 45,
  },
  {
    icon: '🔐',
    title: 'SecureVault',
    category: 'Security',
    description:
      'Zero-trust secrets management system with automated rotation and audit logging.',
    tags: ['Go', 'Kubernetes', 'Security'],
    stars: 189,
    forks: 32,
  },
  {
    icon: '🤖',
    title: 'MLFlow Edge',
    category: 'AI/ML',
    description:
      'Lightweight MLOps platform optimized for edge computing and IoT devices.',
    tags: ['Python', 'TensorFlow', 'Edge'],
    stars: 312,
    forks: 67,
  },
]
