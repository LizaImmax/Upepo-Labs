import Link from 'next/link'
import { ContributorCard, type Contributor } from '@/components/ContributorCard'

export const metadata = {
  title: 'Community | Upepo Labs',
  description: 'Meet our amazing contributors, earn badges, and join the leaderboard.',
}

const TOP_CONTRIBUTORS: Contributor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '',
    role: 'Cloud Architect',
    points: 2850,
    badges: ['Cloud Master', 'Top Contributor', 'AI Pioneer'],
    projects: 12,
    contributions: 156,
    github: 'sarahchen',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: '',
    role: 'DevOps Engineer',
    points: 2340,
    badges: ['Innovation Leader', 'Community Hero'],
    projects: 8,
    contributions: 142,
    github: 'marcusj',
  },
  {
    id: '3',
    name: 'Amina Osei',
    avatar: '',
    role: 'ML Engineer',
    points: 2120,
    badges: ['AI Pioneer', 'Top Contributor'],
    projects: 10,
    contributions: 128,
    github: 'aminaosei',
  },
  {
    id: '4',
    name: 'Raj Patel',
    avatar: '',
    role: 'Full Stack Developer',
    points: 1890,
    badges: ['Cloud Master', 'Community Hero'],
    projects: 7,
    contributions: 115,
    github: 'rajpatel',
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    avatar: '',
    role: 'Data Scientist',
    points: 1750,
    badges: ['Innovation Leader'],
    projects: 6,
    contributions: 98,
    github: 'elenarodriguez',
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: '',
    role: 'Security Engineer',
    points: 1620,
    badges: ['Top Contributor'],
    projects: 5,
    contributions: 87,
    github: 'davidkim',
  },
]

const BADGES = [
  {
    name: 'Cloud Master',
    icon: '☁️',
    description: 'Complete 5 cloud projects',
    points: 500,
    rarity: 'Epic',
  },
  {
    name: 'AI Pioneer',
    icon: '🤖',
    description: 'Build 3 AI/ML projects',
    points: 400,
    rarity: 'Rare',
  },
  {
    name: 'Top Contributor',
    icon: '⭐',
    description: 'Make 100+ contributions',
    points: 600,
    rarity: 'Epic',
  },
  {
    name: 'Innovation Leader',
    icon: '💡',
    description: 'Create an innovative project',
    points: 300,
    rarity: 'Rare',
  },
  {
    name: 'Community Hero',
    icon: '🦸',
    description: 'Help 50+ community members',
    points: 350,
    rarity: 'Rare',
  },
  {
    name: 'First Contribution',
    icon: '🎉',
    description: 'Make your first contribution',
    points: 50,
    rarity: 'Common',
  },
  {
    name: 'Event Organizer',
    icon: '📅',
    description: 'Host 3 community events',
    points: 250,
    rarity: 'Uncommon',
  },
  {
    name: 'Code Reviewer',
    icon: '👀',
    description: 'Review 50+ pull requests',
    points: 300,
    rarity: 'Rare',
  },
]

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <div className="text-center">
          <div className="mb-6 inline-block animate-float text-6xl">👥</div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            Community & Achievements
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Join our vibrant community, earn badges, and compete on the leaderboard!
          </p>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="container-custom py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            🏆 Hall of Fame
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our top contributors making an impact
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOP_CONTRIBUTORS.map((contributor, index) => (
            <ContributorCard key={contributor.id} contributor={contributor} rank={index + 1} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/submit" className="btn-primary">
            Join the Leaderboard
          </Link>
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              🎖️ Badges & Achievements
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Unlock achievements as you contribute to the community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BADGES.map((badge) => (
              <div
                key={badge.name}
                className="rounded-lg border border-gray-200 bg-white p-6 text-center transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 text-5xl">{badge.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {badge.name}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
                <div className="mb-2 flex items-center justify-center gap-2 text-sm">
                  <span className="font-bold text-upepo-600">+{badge.points} pts</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      badge.rarity === 'Epic'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : badge.rarity === 'Rare'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : badge.rarity === 'Uncommon'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Points Work */}
      <section className="container-custom py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            💯 How Points Work
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Earn Points By:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg">🚀</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Creating Projects
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">100-300 points</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">💻</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Code Contributions
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">10-50 points</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Writing Documentation
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">20-80 points</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">👥</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Helping Others
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">5-25 points</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Unlock Rewards:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg">🎖️</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Exclusive Badges
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Show off your achievements
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🏆</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Leaderboard Rank
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Climb to the top
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">⭐</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Featured Profile
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Get highlighted monthly
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🎁</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Special Perks
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Early access & swag
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-upepo-600 to-upepo-700 py-16 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Start Contributing?</h2>
          <p className="mb-8 text-xl text-upepo-100">
            Join our community and start earning points today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit" className="btn-secondary bg-white text-upepo-600 hover:bg-upepo-50">
              Submit Your Project
            </Link>
            <Link href="/projects" className="btn-secondary border-white text-white hover:bg-white/10">
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
