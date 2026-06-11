'use client'

import { useEffect, useRef, useState } from 'react'
import { content } from '@/lib/content'

const RESPONSIVE_WIDTH = 1024

export function Header() {
  const [collapsed, setCollapsed] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('tw-dark'))
    const onResize = () => {
      const nextIsMobile = window.innerWidth < RESPONSIVE_WIDTH
      setIsMobile(nextIsMobile)
      if (nextIsMobile) setCollapsed(true)
      else setCollapsed(false)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', !collapsed && window.innerWidth < RESPONSIVE_WIDTH)
    return () => document.body.classList.remove('modal-open')
  }, [collapsed])

  useEffect(() => {
    if (collapsed) return
    const close = (event: MouseEvent) => {
      if (!headerItemsRef.current?.contains(event.target as Node)) setCollapsed(true)
    }
    window.setTimeout(() => window.addEventListener('click', close), 1)
    return () => window.removeEventListener('click', close)
  }, [collapsed])

  const toggleMode = () => {
    document.documentElement.classList.toggle('tw-dark')
    const next = document.documentElement.classList.contains('tw-dark')
    localStorage.setItem('color-mode', next ? 'dark' : 'light')
    setIsDark(next)
  }

  const collapsedClasses = !collapsed && isMobile ? 'max-lg:!tw-opacity-100 tw-min-h-[90vh]' : ''

  return (
    <header className="lg:tw-px-4 tw-max-w-[100vw] tw-max-w-lg:tw-mr-auto max-lg:tw-top-0 tw-fixed tw-top-4 lg:tw-left-1/2 lg:tw--translate-x-1/2 tw-z-20 tw-flex tw-h-[60px] tw-w-full tw-text-gray-700 tw-bg-white dark:tw-text-gray-200 dark:tw-bg-[#17181b] tw-px-[3%] tw-rounded-md lg:tw-max-w-5xl tw-shadow-md dark:tw-shadow-gray-700 lg:tw-justify-around lg:!tw-backdrop-blur-lg lg:tw-opacity-[0.99]">
      <a className="tw-flex tw-p-[4px] tw-gap-2 tw-place-items-center" href="#">
        <div className="tw-h-[30px] tw-max-w-[100px]">
          <img src="/assets/logo/logo.png" alt="logo" className="tw-object-contain tw-h-full tw-w-full dark:tw-invert" />
        </div>
        <span className="tw-uppercase tw-text-base tw-font-medium">{content.nav.logo}</span>
      </a>
      <div
        ref={headerItemsRef}
        className={`collapsible-header animated-collapse max-lg:tw-shadow-md ${collapsedClasses}`}
        id="collapsed-header-items"
        style={{ height: !collapsed && isMobile ? '90vh' : undefined }}
      >
        <nav className="tw-relative tw-flex tw-h-full max-lg:tw-h-max tw-w-max tw-gap-5 tw-text-base max-lg:tw-mt-[30px] max-lg:tw-flex-col max-lg:tw-gap-5 lg:tw-mx-auto tw-place-items-center">
          {content.nav.links.map((link) => (
            <a key={link} className="header-links" href="#">
              {link}
            </a>
          ))}
          <div className="tw-relative tw-flex tw-flex-col tw-place-items-center">
            <div
              id="nav-dropdown-toggle-0"
              className="max-lg:tw-max-w-fit tw-flex header-links tw-gap-1 tw-place-items-center"
              onClick={() => setDropdownOpen((value) => !value)}
              onMouseEnter={() => window.innerWidth > RESPONSIVE_WIDTH && setDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth > RESPONSIVE_WIDTH && setTimeout(() => setDropdownOpen(false), 100)}
            >
              <span>{content.nav.features}</span>
              <i className="tw-text-sm bi bi-chevron-down" />
            </div>
            <nav
              id="nav-dropdown-list-0"
              data-open={dropdownOpen}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className={`tw-scale-0 tw-opacity-0 lg:tw-fixed tw-flex lg:tw-top-[80px] lg:tw-left-1/2 lg:tw--translate-x-1/2 tw-w-[90%] tw-rounded-lg max-lg:tw-h-0 max-lg:tw-w-0 lg:tw-h-[450px] tw-overflow-hidden tw-bg-white dark:tw-bg-[#17181B] tw-duration-300 tw-transition-opacity tw-transition-height tw-shadow-lg tw-p-4 ${
                dropdownOpen ? 'tw-opacity-100 tw-scale-100 max-lg:tw-min-h-[450px] max-lg:!tw-h-fit tw-min-w-[320px]' : ''
              }`}
            >
              <div className="tw-grid max-xl:tw-flex max-xl:tw-flex-col tw-justify-around tw-grid-cols-2 tw-w-full">
                {content.nav.dropdown.map(([icon, title, desc]) => (
                  <a key={title} className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4" href="#">
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className={`bi ${icon}`} />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">{title}</div>
                      <p>{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <a className="header-links" href="#pricing">
            {content.nav.pricing}
          </a>
        </nav>
        <div className="lg:tw-mx-4 tw-flex tw-place-items-center tw-gap-[20px] tw-text-base max-md:tw-w-full max-md:tw-flex-col max-md:tw-place-content-center">
          <button type="button" onClick={toggleMode} className="header-links tw-text-gray-600 dark:tw-text-gray-300" title="toggle-theme" id="theme-toggle">
            <i className={`bi ${isDark ? 'bi-moon' : 'bi-sun'}`} id="toggle-mode-icon" />
          </button>
          <a href="#" aria-label={content.nav.playground} className="btn tw-flex tw-gap-3 tw-px-3 tw-py-2 tw-transition-transform tw-duration-[0.3s] hover:tw-translate-x-2">
            <span>{content.nav.playground}</span>
            <i className="bi bi-arrow-right" />
          </a>
        </div>
      </div>
      <button
        className={`bi ${collapsed ? 'bi-list' : 'bi-x max-lg:tw-fixed'} tw-absolute tw-right-3 tw-top-3 tw-z-50 tw-text-3xl tw-text-gray-500 lg:tw-hidden`}
        onClick={() => setCollapsed((value) => !value)}
        aria-label="menu"
        id="collapse-btn"
      />
    </header>
  )
}
