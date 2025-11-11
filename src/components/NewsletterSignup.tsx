'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      if (email.includes('@')) {
        setSuccess(true)
        setEmail('')
      } else {
        setError('Please enter a valid email address')
      }
      setLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="rounded-lg bg-gradient-to-r from-upepo-600 to-upepo-700 p-8 text-white">
        <div className="text-center">
          <div className="mb-4 text-4xl">🎉</div>
          <h3 className="mb-2 text-2xl font-bold">You're subscribed!</h3>
          <p className="mb-4 text-upepo-100">
            Check your inbox for a confirmation email. You'll receive our next update soon!
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-sm text-white underline hover:text-upepo-100"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-gradient-to-r from-upepo-600 to-upepo-700 p-8 text-white">
      <div className="text-center">
        <div className="mb-4 text-4xl">📬</div>
        <h3 className="mb-2 text-2xl font-bold">Stay in the Loop</h3>
        <p className="mb-6 text-upepo-100">
          Get weekly updates on new projects, research papers, events, and community highlights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-upepo-500 bg-white/10 px-4 py-3 text-white placeholder-upepo-200 backdrop-blur-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-upepo-600 transition-all hover:bg-upepo-50 disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-upepo-100">
          <span>✅ Weekly digest</span>
          <span>✅ Event reminders</span>
          <span>✅ No spam</span>
        </div>
      </form>
    </div>
  )
}
