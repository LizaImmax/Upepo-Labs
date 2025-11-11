import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-3xl">🧪</span>
              <span className="text-xl font-bold">Upepo Labs</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Where Innovation Takes Flight
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/LizaImmax/Upepo-Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-upepo-600 dark:text-gray-400"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LizaImmax/Upepo-Labs/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-upepo-600 dark:text-gray-400"
                >
                  Discussions
                </a>
              </li>
              <li>
                <Link href="/submit" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Submit Project
                </Link>
              </li>
              <li>
                <a href="https://github.com/LizaImmax/Upepo-Labs/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/LizaImmax/Upepo-Labs/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LizaImmax/Upepo-Labs/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-upepo-600 dark:text-gray-400"
                >
                  Contributing Guide
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LizaImmax/Upepo-Labs/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-upepo-600 dark:text-gray-400"
                >
                  License
                </a>
              </li>
              <li>
                <a href="mailto:labs@upepo.io" className="text-gray-600 hover:text-upepo-600 dark:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Upepo Labs. Licensed under{' '}
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-upepo-600"
            >
              Apache 2.0
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
