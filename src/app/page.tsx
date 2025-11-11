import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { CallToAction } from '@/components/CallToAction'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ProjectShowcase />
      
      {/* Stats Section */}
      <section className="bg-upepo-900 py-16 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">50+</div>
              <div className="text-upepo-200">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">200+</div>
              <div className="text-upepo-200">Contributors</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">12</div>
              <div className="text-upepo-200">Hackathons</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">8</div>
              <div className="text-upepo-200">Research Papers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">Latest Research</h2>
            <p className="section-subtitle">
              Explore cutting-edge insights from our research team
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card">
              <div className="mb-2 text-sm font-semibold text-upepo-600">
                Cloud Architecture
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Multi-Cloud Orchestration Patterns
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                A comprehensive study of orchestration strategies across AWS, Azure, and GCP.
              </p>
              <Link href="/research" className="text-upepo-600 hover:underline">
                Read more →
              </Link>
            </div>

            <div className="card">
              <div className="mb-2 text-sm font-semibold text-upepo-600">
                Security
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Zero-Trust Architecture in Kubernetes
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Implementing zero-trust principles in cloud-native environments.
              </p>
              <Link href="/research" className="text-upepo-600 hover:underline">
                Read more →
              </Link>
            </div>

            <div className="card">
              <div className="mb-2 text-sm font-semibold text-upepo-600">
                AI/ML
              </div>
              <h3 className="mb-2 text-xl font-bold">
                MLOps Best Practices for Edge Computing
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Deploying and managing ML models at the edge with efficiency.
              </p>
              <Link href="/research" className="text-upepo-600 hover:underline">
                Read more →
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/research" className="btn-secondary">
              View All Research
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      {/* Newsletter */}
      <section className="container-custom py-16">
        <NewsletterSignup />
      </section>
    </main>
  )
}
