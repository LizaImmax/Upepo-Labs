'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

type Language = 'en' | 'sw' | 'fr'

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    research: 'Research',
    events: 'Events',
    learn: 'Learn',
    community: 'Community',
    submit: 'Submit Project',
  },
  sw: {
    home: 'Nyumbani',
    about: 'Kuhusu',
    projects: 'Miradi',
    research: 'Utafiti',
    events: 'Matukio',
    learn: 'Jifunze',
    community: 'Jamii',
    submit: 'Wasilisha Mradi',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    research: 'Recherche',
    events: 'Événements',
    learn: 'Apprendre',
    community: 'Communauté',
    submit: 'Soumettre un projet',
  },
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  const t = translations[language]

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const savedLanguage = localStorage.getItem('language') as Language | null
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }

    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🧪</span>
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Upepo Labs
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.home}
          </Link>
          <Link
            href="/about"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.about}
          </Link>
          <Link
            href="/projects"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.projects}
          </Link>
          <Link
            href="/research"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.research}
          </Link>
          <Link
            href="/events"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.events}
          </Link>
          <Link
            href="/learn"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.learn}
          </Link>
          <Link
            href="/community"
            className="text-gray-700 transition-colors hover:text-upepo-600 dark:text-gray-300 dark:hover:text-upepo-400"
          >
            {t.community}
          </Link>
          <Link href="/submit" className="btn-primary">
            {t.submit}
          </Link>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              <span className="text-lg">🌐</span>
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
            <div className="absolute right-0 mt-2 hidden w-32 rounded-lg border border-gray-200 bg-white shadow-lg group-hover:block dark:border-gray-700 dark:bg-gray-800">
              <button
                onClick={() => changeLanguage('en')}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => changeLanguage('sw')}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                🇰🇪 Kiswahili
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                🇫🇷 Français
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href="/projects"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.projects}
            </Link>
            <Link
              href="/research"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.research}
            </Link>
            <Link
              href="/events"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.events}
            </Link>
            <Link
              href="/learn"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.learn}
            </Link>
            <Link
              href="/community"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.community}
            </Link>
            <Link href="/submit" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
              {t.submit}
            </Link>

            {/* Mobile Language Selector */}
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                🌐 Language
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`rounded px-3 py-1 text-sm ${
                    language === 'en'
                      ? 'bg-upepo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('sw')}
                  className={`rounded px-3 py-1 text-sm ${
                    language === 'sw'
                      ? 'bg-upepo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  SW
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`rounded px-3 py-1 text-sm ${
                    language === 'fr'
                      ? 'bg-upepo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  FR
                </button>
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </span>
              <div className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</div>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
