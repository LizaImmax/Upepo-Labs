export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 text-7xl">🧪</div>
          <h1 className="mb-6 text-5xl font-bold">About Upepo Labs</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Where Innovation Takes Flight — A research, innovation, and experimentation hub 
            transforming ideas into scalable, impactful cloud and AI solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="card">
            <div className="mb-4 text-4xl">🎯</div>
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To empower creators, developers, and thinkers to experiment with cloud, AI, 
              and emerging technologies — and turn their ideas into scalable, impactful projects.
            </p>
          </div>

          <div className="card">
            <div className="mb-4 text-4xl">🌬️</div>
            <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              A world where every idea has space to breathe, evolve, and become wind that 
              moves others forward. We believe in collective intelligence and the power of 
              community-driven innovation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {VALUES.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="mb-3 text-4xl">{value.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">What We Build</h2>
          <div className="space-y-8">
            {PILLARS.map((pillar, index) => (
              <div key={index} className="card">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{pillar.icon}</div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-bold">{pillar.title}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {pillar.description}
                    </p>
                    <div className="rounded-lg bg-upepo-50 p-3 text-sm font-semibold text-upepo-700 dark:bg-upepo-900 dark:text-upepo-200">
                      Outcome: {pillar.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Focus */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Technology Focus Areas</h2>
          <div className="card">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {TECH_AREAS.map((area, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-100 p-3 text-center text-sm font-medium dark:bg-gray-800"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Culture */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-upepo-600 to-upepo-800 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Build. Break. Evolve.</h2>
          <p className="mb-8 text-xl">
            Our culture is built on curiosity, freedom, and collective intelligence. 
            It's not about perfection — it's about exploration.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <div className="mb-2 text-3xl">🔍</div>
              <div className="font-semibold">Curiosity</div>
            </div>
            <div>
              <div className="mb-2 text-3xl">🎨</div>
              <div className="font-semibold">Freedom</div>
            </div>
            <div>
              <div className="mb-2 text-3xl">🤝</div>
              <div className="font-semibold">Collaboration</div>
            </div>
            <div>
              <div className="mb-2 text-3xl">🚀</div>
              <div className="font-semibold">Impact</div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-bold">Join Our Community</h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Whether you're a student, engineer, researcher, or entrepreneur — 
            there's a place for you at Upepo Labs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/LizaImmax/Upepo-Labs" className="btn-primary">
              GitHub
            </a>
            <a href="/events" className="btn-secondary">
              Join an Event
            </a>
            <a href="/submit" className="btn-secondary">
              Submit Project
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const VALUES = [
  {
    icon: '💡',
    title: 'Curiosity',
    description: 'Ask questions and explore the unknown without limits',
  },
  {
    icon: '🎯',
    title: 'Freedom',
    description: 'Experiment without fear of failure in a safe space',
  },
  {
    icon: '🤝',
    title: 'Collective Intelligence',
    description: 'Learn and grow together as a community',
  },
  {
    icon: '🌟',
    title: 'Impact',
    description: 'Create solutions that matter and move the world forward',
  },
]

const PILLARS = [
  {
    icon: '🧠',
    title: 'Upepo Labs Research',
    description:
      'A digital R&D space focusing on cloud automation, cybersecurity frameworks, DevSecOps, AI in cloud management, and community-driven research challenges.',
    outcome: 'Research insights and open-source findings published on Upepo Insights',
  },
  {
    icon: '⚙️',
    title: 'Upepo Labs Projects',
    description:
      'The hands-on sandbox where members build cloud-native apps, security projects, machine learning integrations, and infrastructure automation tools.',
    outcome: 'Real-world, portfolio-ready projects deployable on Upepo Cloud',
  },
  {
    icon: '🧩',
    title: 'Upepo Labs Collaborations',
    description:
      'A space for cross-discipline innovation, pairing cloud engineers with designers, storytellers, or researchers through innovation sprints and hackathons.',
    outcome: 'Community innovation culture featured on Upepo Voices and Upepo Network',
  },
  {
    icon: '🚀',
    title: 'Upepo Labs Launchpad',
    description:
      "The bridge between innovation and entrepreneurship. Once a project is validated, it's handed off to Upepo Ventures for incubation as part of our mini-accelerator.",
    outcome: 'Real startups born from Upepo',
  },
]

const TECH_AREAS = [
  'AWS',
  'Azure',
  'GCP',
  'Terraform',
  'Kubernetes',
  'Docker',
  'AI & ML',
  'MLOps',
  'Cybersecurity',
  'DevSecOps',
  'Edge Computing',
  'IoT',
  'Serverless',
  'Service Mesh',
  'GitOps',
  'Open Source',
]
