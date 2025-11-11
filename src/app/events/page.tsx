import Link from 'next/link'

export default function EventsPage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Events & Hackathons</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join innovation sprints, hackathons, and community events
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Upcoming Events</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="card border-l-4 border-upepo-500"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-upepo-600">
                      {event.type}
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">{event.title}</h3>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    Upcoming
                  </span>
                </div>

                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>

                <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>
                      {event.registered} registered • {event.capacity} max
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary flex-1">Register Now</button>
                  <button className="btn-secondary">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">Past Events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PAST_EVENTS.map((event) => (
              <div key={event.id} className="card">
                <div className="mb-3 flex items-start justify-between">
                  <div className="text-sm font-semibold text-gray-500">
                    {event.type}
                  </div>
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                    Completed
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{event.title}</h3>
                <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {event.date}
                </div>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div>👥 {event.participants} participants</div>
                  <div>🏆 {event.projects} projects submitted</div>
                </div>
                <button className="text-sm font-medium text-upepo-600 hover:underline">
                  View Results →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Host Event CTA */}
        <div className="mt-16 rounded-xl bg-gradient-to-r from-upepo-500 to-upepo-700 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Want to Host an Event?</h2>
          <p className="mb-6 text-lg">
            Partner with Upepo Labs to organize hackathons and innovation sprints
          </p>
          <Link
            href="/propose-event"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-upepo-600 transition-all hover:bg-gray-100"
          >
            Propose an Event
          </Link>
        </div>
      </div>
    </div>
  )
}

const UPCOMING_EVENTS = [
  {
    id: 1,
    type: 'Hackathon',
    title: 'Cloud Native Challenge 2025',
    description:
      'Build innovative cloud-native applications using Kubernetes, service meshes, and serverless technologies. Prizes totaling $10,000!',
    date: 'December 15-17, 2025',
    location: 'Virtual + Nairobi Hub',
    registered: 156,
    capacity: 200,
    tags: ['Kubernetes', 'Cloud Native', 'Serverless', 'Prizes'],
  },
  {
    id: 2,
    type: 'Workshop',
    title: 'MLOps Masterclass',
    description:
      'Learn to build production-ready ML pipelines with CI/CD, monitoring, and automated retraining. Hands-on labs included.',
    date: 'November 28, 2025',
    location: 'Virtual',
    registered: 89,
    capacity: 100,
    tags: ['MLOps', 'Machine Learning', 'DevOps', 'Hands-on'],
  },
]

const PAST_EVENTS = [
  {
    id: 1,
    type: 'Hackathon',
    title: 'SecureCloud Sprint',
    date: 'Oct 2025',
    participants: 142,
    projects: 28,
  },
  {
    id: 2,
    type: 'Workshop',
    title: 'Terraform Deep Dive',
    date: 'Sep 2025',
    participants: 67,
    projects: 0,
  },
  {
    id: 3,
    type: 'Hackathon',
    title: 'AI at the Edge',
    date: 'Aug 2025',
    participants: 98,
    projects: 19,
  },
]
