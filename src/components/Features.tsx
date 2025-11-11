export function Features() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">What We Build</h2>
          <p className="section-subtitle">
            Four pillars of innovation driving the Upepo ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="card group transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              <div className="text-sm font-semibold text-upepo-600">
                {feature.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: '🧠',
    title: 'Upepo Labs Research',
    description:
      'Digital R&D space for cloud automation, cybersecurity, DevSecOps, and AI in cloud management.',
    outcome: 'Research insights & whitepapers',
  },
  {
    icon: '⚙️',
    title: 'Upepo Labs Projects',
    description:
      'Hands-on sandbox for building cloud-native apps, security tools, ML integrations, and automation.',
    outcome: 'Portfolio-ready projects',
  },
  {
    icon: '🧩',
    title: 'Upepo Labs Collaborations',
    description:
      'Cross-discipline innovation pairing engineers with designers, storytellers, and researchers.',
    outcome: 'Community innovation culture',
  },
  {
    icon: '🚀',
    title: 'Upepo Labs Launchpad',
    description:
      'Bridge between innovation and entrepreneurship. Validated projects graduate to Upepo Ventures.',
    outcome: 'Real startups born from Upepo',
  },
]
