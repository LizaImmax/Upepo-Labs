'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    projectName: '',
    tagline: '',
    description: '',
    category: '',
    techStack: '',
    cloudProviders: [] as string[],
    repoUrl: '',
    demoUrl: '',
    license: '',
    contributorName: '',
    contributorEmail: '',
    contributorGithub: '',
    hasCI: false,
    hasTests: false,
    hasIaC: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleCloudProviderChange = (provider: string) => {
    setFormData((prev) => ({
      ...prev,
      cloudProviders: prev.cloudProviders.includes(provider)
        ? prev.cloudProviders.filter((p) => p !== provider)
        : [...prev.cloudProviders, provider],
    }))
  }

  if (submitted) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 text-7xl">🎉</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Submission Received!
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Thank you for submitting your project to Upepo Labs. Our team will review your 
              submission and get back to you within 7 days.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects" className="btn-primary">
                Browse Projects
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">📦</div>
          <h1 className="mb-4 text-4xl font-bold">Submit Your Project</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Share your innovative cloud, AI, or open-source project with the Upepo Labs community. 
            Fill out the form below and we'll review your submission.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="space-y-8">
            {/* Project Information */}
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold">Project Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="e.g., CloudSync Pro"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="One-sentence description of your project"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Provide a clear description of your project, what it does, and the problem it solves..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option value="">Select a category</option>
                    <option value="infrastructure">Cloud Infrastructure</option>
                    <option value="security">Security & DevSecOps</option>
                    <option value="ai-ml">AI/ML & MLOps</option>
                    <option value="devops">DevOps & Automation</option>
                    <option value="iot">Edge Computing & IoT</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Tech Stack *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="e.g., TypeScript, React, Node.js, Kubernetes, Terraform"
                  />
                  <p className="mt-1 text-sm text-gray-500">Comma-separated list of technologies</p>
                </div>
              </div>
            </div>

            {/* Cloud Integration */}
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold">Cloud Integration</h2>
              
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Which cloud provider(s) does your project use? *
                </label>
                <div className="space-y-2">
                  {['AWS', 'Azure', 'GCP', 'Multi-cloud', 'Other'].map((provider) => (
                    <label key={provider} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.cloudProviders.includes(provider)}
                        onChange={() => handleCloudProviderChange(provider)}
                        className="h-4 w-4 rounded border-gray-300 text-upepo-600 focus:ring-upepo-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{provider}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* URLs & License */}
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold">Links & License</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.repoUrl}
                    onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="https://demo.example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    License *
                  </label>
                  <select
                    required
                    value={formData.license}
                    onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option value="">Select a license</option>
                    <option value="apache-2.0">Apache 2.0</option>
                    <option value="mit">MIT</option>
                    <option value="gpl-3.0">GPL 3.0</option>
                    <option value="bsd-3-clause">BSD 3-Clause</option>
                    <option value="other">Other OSI-approved</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contributor Information */}
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold">Your Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contributorName}
                    onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contributorEmail}
                    onChange={(e) => setFormData({ ...formData, contributorEmail: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    GitHub Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contributorGithub}
                    onChange={(e) => setFormData({ ...formData, contributorGithub: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold">Additional Features (Optional)</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hasCI}
                    onChange={(e) => setFormData({ ...formData, hasCI: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-upepo-600 focus:ring-upepo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Project includes CI/CD pipeline (GitHub Actions, etc.)
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hasTests}
                    onChange={(e) => setFormData({ ...formData, hasTests: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-upepo-600 focus:ring-upepo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Project includes tests (unit, integration, or e2e)
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hasIaC}
                    onChange={(e) => setFormData({ ...formData, hasIaC: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-upepo-600 focus:ring-upepo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Project includes Infrastructure as Code (Terraform, Pulumi, etc.)
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary min-w-[200px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
              <Link href="/" className="btn-secondary min-w-[200px]">
                Cancel
              </Link>
            </div>

            {/* Terms */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              By submitting your project, you agree to our{' '}
              <a href="https://github.com/LizaImmax/Upepo-Labs/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-upepo-600 hover:underline">
                Contributing Guidelines
              </a>{' '}
              and confirm that your project is licensed under an OSI-approved open-source license.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
