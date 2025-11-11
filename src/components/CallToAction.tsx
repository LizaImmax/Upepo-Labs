import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="rounded-2xl bg-gradient-to-r from-upepo-600 to-upepo-800 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Transform Your Ideas?
          </h2>
          <p className="mb-8 text-xl">
            Join Upepo Labs and be part of a community that's shaping the future 
            of cloud, AI, and open-source innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-upepo-600 shadow-sm transition-all hover:bg-gray-100"
            >
              Submit a Project
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Join an Event
            </Link>
          </div>

          {/* Values */}
          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div>
              <div className="mb-2 text-2xl">💡</div>
              <h3 className="mb-2 font-bold">Curiosity</h3>
              <p className="text-upepo-100">
                Ask questions and explore the unknown without limits
              </p>
            </div>
            <div>
              <div className="mb-2 text-2xl">🎯</div>
              <h3 className="mb-2 font-bold">Freedom</h3>
              <p className="text-upepo-100">
                Experiment without fear of failure in a safe space
              </p>
            </div>
            <div>
              <div className="mb-2 text-2xl">🌟</div>
              <h3 className="mb-2 font-bold">Impact</h3>
              <p className="text-upepo-100">
                Create solutions that matter and move the world forward
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
