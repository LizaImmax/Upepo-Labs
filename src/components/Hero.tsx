import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-upepo-50 to-white py-20 dark:from-upepo-950 dark:to-gray-900">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 animate-slide-up">
            <span className="text-6xl animate-float">🧪</span>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
              Upepo Labs
            </h1>
          </div>
          <h2 className="mb-6 animate-slide-up text-3xl font-semibold text-upepo-600 dark:text-upepo-400 md:text-4xl">
            Where Innovation Takes Flight
          </h2>
          <p className="mb-8 animate-fade-in text-xl text-gray-600 dark:text-gray-300">
            Upepo Labs is the research, innovation, and experimentation hub for cloud, AI, and 
            open-source projects. Join our community of creators, developers, and thinkers 
            building the future of technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              Explore Projects
            </Link>
            <Link href="/events" className="btn-secondary">
              View Events
            </Link>
          </div>

          {/* Key Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold text-upepo-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-upepo-600">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Contributors</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-upepo-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hackathons</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-upepo-600">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Research Papers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
