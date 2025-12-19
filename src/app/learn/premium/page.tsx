'use client'

import Link from 'next/link'
import { useState } from 'react'

interface PremiumLab {
  id: string
  title: string
  description: string
  duration: string
  level: 'Intermediate' | 'Advanced' | 'Expert'
  technologies: string[]
  outcomes: string[]
  modules: number
  icon: string
  featured?: boolean
}

const PREMIUM_LABS: PremiumLab[] = [
  {
    id: 'enterprise-kubernetes-security',
    title: 'Enterprise Kubernetes Security Hardening',
    description: 'Master production-grade Kubernetes security with advanced RBAC, network policies, admission controllers, and security scanning pipelines.',
    duration: '8-10 hours',
    level: 'Advanced',
    technologies: ['Kubernetes', 'Istio', 'Falco', 'OPA', 'Trivy', 'Cert-Manager'],
    outcomes: [
      'Implement zero-trust networking in K8s',
      'Configure advanced RBAC and PSP',
      'Set up runtime security monitoring',
      'Deploy admission controllers',
      'Automate security scanning'
    ],
    modules: 12,
    icon: '🔒',
    featured: true
  },
  {
    id: 'production-multi-cloud-architecture',
    title: 'Production Multi-Cloud Architecture',
    description: 'Design and deploy a production-grade application across AWS, Azure, and GCP with automated failover, data replication, and unified monitoring.',
    duration: '10-12 hours',
    level: 'Expert',
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Consul', 'Prometheus', 'Grafana'],
    outcomes: [
      'Design multi-cloud architectures',
      'Implement cross-cloud data replication',
      'Set up global traffic management',
      'Configure unified monitoring',
      'Automate disaster recovery'
    ],
    modules: 15,
    icon: '☁️',
    featured: true
  },
  {
    id: 'devsecops-pipeline',
    title: 'Complete DevSecOps Pipeline',
    description: 'Build an enterprise-grade CI/CD pipeline with integrated security scanning, compliance checking, and automated remediation.',
    duration: '6-8 hours',
    level: 'Advanced',
    technologies: ['Jenkins', 'GitLab CI', 'SonarQube', 'Snyk', 'Vault', 'ArgoCD'],
    outcomes: [
      'Build secure CI/CD pipelines',
      'Integrate security scanning',
      'Implement secret management',
      'Automate compliance checks',
      'Deploy with GitOps'
    ],
    modules: 10,
    icon: '🔐',
    featured: true
  },
  {
    id: 'ai-ml-infrastructure',
    title: 'AI/ML Infrastructure on Kubernetes',
    description: 'Deploy production ML infrastructure with Kubeflow, model serving, experiment tracking, and automated training pipelines.',
    duration: '8-10 hours',
    level: 'Advanced',
    technologies: ['Kubeflow', 'MLflow', 'Seldon', 'KServe', 'Ray', 'Feast'],
    outcomes: [
      'Deploy Kubeflow on K8s',
      'Build ML training pipelines',
      'Implement model serving',
      'Set up experiment tracking',
      'Automate model deployment'
    ],
    modules: 11,
    icon: '🤖'
  },
  {
    id: 'serverless-microservices',
    title: 'Serverless Microservices Architecture',
    description: 'Build event-driven microservices using Lambda, API Gateway, EventBridge, and Step Functions with observability and cost optimization.',
    duration: '6-8 hours',
    level: 'Intermediate',
    technologies: ['AWS Lambda', 'API Gateway', 'EventBridge', 'DynamoDB', 'Step Functions', 'X-Ray'],
    outcomes: [
      'Design event-driven architectures',
      'Build serverless APIs',
      'Implement saga patterns',
      'Optimize Lambda costs',
      'Monitor serverless apps'
    ],
    modules: 9,
    icon: '⚡'
  },
  {
    id: 'infrastructure-chaos-engineering',
    title: 'Infrastructure Chaos Engineering',
    description: 'Learn to build resilient systems by intentionally breaking them. Master chaos engineering with Chaos Mesh, Litmus, and custom experiments.',
    duration: '5-7 hours',
    level: 'Advanced',
    technologies: ['Chaos Mesh', 'Litmus', 'Gremlin', 'Kubernetes', 'Prometheus', 'Grafana'],
    outcomes: [
      'Design chaos experiments',
      'Implement fault injection',
      'Test system resilience',
      'Build recovery automation',
      'Measure reliability metrics'
    ],
    modules: 8,
    icon: '💥'
  }
]

const PRICING_TIERS = [
  {
    name: 'Single Lab',
    price: 49,
    period: 'one-time',
    description: 'Perfect for trying premium content',
    features: [
      'Access to 1 premium lab',
      'Lifetime access to purchased lab',
      'All lab materials & resources',
      'Completion certificate',
      'Community support'
    ],
    cta: 'Purchase Single Lab',
    popular: false
  },
  {
    name: 'All Access',
    price: 299,
    period: 'year',
    description: 'Best value for serious learners',
    features: [
      'Access to ALL premium labs',
      'New labs added monthly',
      'Priority support',
      'Certificates for all labs',
      'Exclusive office hours',
      'Early access to new content',
      'Downloadable resources'
    ],
    cta: 'Get All Access',
    popular: true
  },
  {
    name: 'Team',
    price: 899,
    period: 'year',
    description: 'For teams of 5-10 members',
    features: [
      'Everything in All Access',
      '5-10 team member accounts',
      'Team progress dashboard',
      'Private team workspace',
      'Custom learning paths',
      'Dedicated support',
      'Volume discounts available'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

export default function PremiumLabsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-upepo-600 to-upepo-700 py-20 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              ⭐ Premium Content
            </div>
            <h1 className="mb-6 text-5xl font-bold">
              Master Advanced Cloud & DevOps
            </h1>
            <p className="mb-8 text-xl text-upepo-100">
              Production-grade labs designed by industry experts. Go beyond tutorials with real-world scenarios, 
              advanced architectures, and enterprise best practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-upepo-600 transition-all hover:bg-upepo-50"
              >
                View Pricing
              </a>
              <a
                href="#labs"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore Labs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Premium Section */}
      <section className="container-custom py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Why Premium Labs?
          </h2>
          <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
            Take your skills from beginner to expert with hands-on scenarios you won't find anywhere else
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-4xl">🎯</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Production-Ready Skills
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn by building real production environments, not toy examples. Every lab mirrors actual enterprise scenarios.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-4xl">👨‍🏫</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Expert-Designed Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Created by engineers with 10+ years experience at companies like AWS, Google, and leading startups.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-4xl">🏆</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Career-Boosting Credentials
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earn verified certificates that prove advanced skills. Add to LinkedIn and stand out to employers.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Labs Showcase */}
      <section id="labs" className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Premium Labs Library
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              6 advanced labs available now, with new content added monthly
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PREMIUM_LABS.map((lab) => (
              <div
                key={lab.id}
                className={`group relative overflow-hidden rounded-xl border-2 bg-white p-6 transition-all hover:shadow-lg dark:bg-gray-800 ${
                  lab.featured
                    ? 'border-upepo-500 dark:border-upepo-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {lab.featured && (
                  <div className="absolute right-4 top-4 rounded-full bg-upepo-500 px-3 py-1 text-xs font-bold text-white">
                    Featured
                  </div>
                )}

                <div className="mb-4 text-4xl">{lab.icon}</div>

                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {lab.level}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ⏱️ {lab.duration}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {lab.title}
                </h3>

                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {lab.description}
                </p>

                <div className="mb-4">
                  <div className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lab.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-upepo-50 px-2 py-1 text-xs text-upepo-700 dark:bg-upepo-900 dark:text-upepo-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {lab.technologies.length > 4 && (
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        +{lab.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    What You'll Build
                  </div>
                  <ul className="space-y-1">
                    {lab.outcomes.slice(0, 3).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-upepo-500">✓</span>
                        {outcome}
                      </li>
                    ))}
                    {lab.outcomes.length > 3 && (
                      <li className="text-xs text-gray-500 dark:text-gray-400">
                        + {lab.outcomes.length - 3} more outcomes
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {lab.modules} Modules
                  </span>
                  <Link
                    href={`/learn/premium/${lab.id}` as any}
                    className="inline-flex items-center gap-2 rounded-lg bg-upepo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-upepo-700"
                  >
                    View Lab
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container-custom py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start with a single lab or get unlimited access to everything
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border-2 bg-white p-8 transition-all dark:bg-gray-800 ${
                tier.popular
                  ? 'border-upepo-500 shadow-xl dark:border-upepo-400'
                  : 'border-gray-200 hover:border-upepo-300 dark:border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-upepo-500 px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{tier.period}
                  </span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-upepo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedTier(tier.name)}
                className={`w-full rounded-lg px-6 py-3 font-semibold transition-all ${
                  tier.popular
                    ? 'bg-upepo-600 text-white hover:bg-upepo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          All prices in USD. Cancel anytime. 30-day money-back guarantee.
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Trusted by 500+ Cloud Engineers
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                "The enterprise K8s security lab helped me land a DevOps role at a Fortune 500 company. 
                Worth every penny!"
              </p>
              <div className="font-semibold text-gray-900 dark:text-white">
                Sarah M.
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                DevOps Engineer
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                "Best investment in my career. The multi-cloud lab taught me more than my AWS certification course."
              </p>
              <div className="font-semibold text-gray-900 dark:text-white">
                James K.
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cloud Architect
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                "Production-quality content. Our entire team went through the DevSecOps pipeline lab. Game changer."
              </p>
              <div className="font-semibold text-gray-900 dark:text-white">
                David O.
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Engineering Manager
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                What's the difference between free and premium labs?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free labs cover foundational concepts and basic implementations. Premium labs dive into 
                production-grade scenarios, enterprise architectures, and advanced security/optimization patterns 
                used by top companies.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Do I need cloud credits to complete the labs?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Most labs can be completed within free tier limits. We provide cost estimates and optimization 
                tips. For All Access members, we occasionally provide cloud credit vouchers.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Can I get a refund if I'm not satisfied?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! We offer a 30-day money-back guarantee. If you're not satisfied with any premium lab or 
                subscription, contact us for a full refund.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                How often are new labs added?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We add 1-2 new premium labs every month. All Access subscribers get automatic access to all 
                new content at no additional cost.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Do you offer discounts for students?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! Students get 50% off All Access subscriptions. Email us with your student ID or school 
                email to apply for the discount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-upepo-600 to-upepo-700 py-16 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Level Up Your Cloud Skills?
          </h2>
          <p className="mb-8 text-xl text-upepo-100">
            Join 500+ engineers mastering production-grade cloud infrastructure
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-upepo-600 transition-all hover:bg-upepo-50"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  )
}
