'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProposeEventPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: 'Workshop',
    description: '',
    date: '',
    duration: '',
    location: 'Virtual',
    capacity: '',
    organizerName: '',
    organizerEmail: '',
    organizerOrg: '',
    topics: [] as string[],
    requiresSponsorship: false,
    additionalInfo: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const toggleTopic = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 text-6xl">🎉</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Event Proposal Submitted!
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Thank you for proposing an event. Our team will review your submission and get back to
              you within 5-7 business days.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events" className="btn-primary">
                View All Events
              </Link>
              <button
                onClick={() => {
                  setSuccess(false)
                  setFormData({
                    eventName: '',
                    eventType: 'Workshop',
                    description: '',
                    date: '',
                    duration: '',
                    location: 'Virtual',
                    capacity: '',
                    organizerName: '',
                    organizerEmail: '',
                    organizerOrg: '',
                    topics: [],
                    requiresSponsorship: false,
                    additionalInfo: '',
                  })
                }}
                className="btn-secondary"
              >
                Propose Another Event
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="mb-12">
          <Link href="/events" className="mb-4 inline-flex items-center text-upepo-600 hover:text-upepo-700">
            ← Back to Events
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Propose an Event
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your event idea with the Upepo Labs community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
          {/* Event Details */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Event Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Cloud Innovation Summit 2025"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option>Workshop</option>
                    <option>Hackathon</option>
                    <option>Conference</option>
                    <option>Meetup</option>
                    <option>Webinar</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option>Virtual</option>
                    <option>In-Person</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe the event, objectives, and what attendees will learn..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Duration (hours) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Expected Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Topics (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Cloud', 'AI/ML', 'Security', 'DevOps', 'IoT', 'Blockchain'].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        formData.topics.includes(topic)
                          ? 'bg-upepo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Organizer Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Organizer Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organizerOrg"
                    value={formData.organizerOrg}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Additional Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="requiresSponsorship"
                  checked={formData.requiresSponsorship}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-upepo-600 focus:ring-upepo-500"
                />
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Requires Sponsorship
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check this if you need financial or resource support
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Additional Notes
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Any additional information, special requirements, or questions..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Event Proposal'}
            </button>
            <Link href="/events" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
