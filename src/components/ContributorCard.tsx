'use client'

import Link from 'next/link'

export interface Contributor {
  id: string
  name: string
  avatar: string
  role: string
  points: number
  badges: string[]
  projects: number
  contributions: number
  github?: string
}

interface ContributorCardProps {
  contributor: Contributor
  rank?: number
}

export function ContributorCard({ contributor, rank }: ContributorCardProps) {
  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Cloud Master': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'AI Pioneer': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Top Contributor': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Innovation Leader': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Community Hero': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    }
    return colors[badge] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-upepo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {rank && (
        <div className="absolute right-4 top-4 text-2xl font-bold text-gray-300 dark:text-gray-600">
          {getRankEmoji(rank)}
        </div>
      )}

      <div className="mb-4 flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-upepo-400 to-upepo-600">
            {contributor.avatar ? (
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                {contributor.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-upepo-600 dark:bg-gray-800">
            {contributor.points}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {contributor.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{contributor.role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-upepo-600">{contributor.projects}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-upepo-600">{contributor.contributions}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Contributions</div>
        </div>
      </div>

      {/* Badges */}
      {contributor.badges.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            Achievements
          </div>
          <div className="flex flex-wrap gap-2">
            {contributor.badges.map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-2 py-1 text-xs font-medium ${getBadgeColor(badge)}`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Link */}
      {contributor.github && (
        <Link
          href={`https://github.com/${contributor.github}`}
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          View GitHub
        </Link>
      )}
    </div>
  )
}
