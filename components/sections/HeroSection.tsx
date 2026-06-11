'use client'

import { useState } from 'react'
import { content } from '@/lib/content'
import { PromptPlayground } from '@/components/ui/PromptPlayground'
import { VideoModal } from '@/components/ui/VideoModal'

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="hero-section tw-relative tw-mt-20 tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-overflow-hidden max-lg:tw-mt-[100px]" id="hero-section">
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <div className="hero-bg-gradient tw-relative tw-flex tw-h-full tw-min-h-[100vh] tw-w-full tw-flex-col tw-place-content-center tw-gap-6 tw-p-[5%] max-xl:tw-place-items-center max-lg:tw-p-4">
        <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-1/2 tw-top-[10%] tw-h-[120px] tw-w-[120px]" />
        <div className="tw-flex tw-flex-col tw-min-h-[60vh] tw-place-content-center tw-items-center">
          <h2 className="reveal-up tw-text-center tw-text-7xl tw-font-semibold tw-uppercase tw-leading-[90px] max-lg:tw-text-4xl max-md:tw-leading-snug">
            <span>{content.hero.headline1}</span>
            <br />
            <span className="tw-font-thin tw-font-serif">{content.hero.headline2}</span>
          </h2>
          <div className="reveal-up tw-mt-8 tw-max-w-[450px] tw-text-lg max-lg:tw-text-base tw-p-2 tw-text-center tw-text-gray-800 dark:tw-text-white max-lg:tw-max-w-full">
            {content.hero.subheadline}
          </div>
          <div className="reveal-up tw-mt-10 max-md:tw-flex-col tw-flex tw-place-items-center tw-gap-4">
            <button
              onClick={() => setVideoOpen(true)}
              className="btn !tw-w-[170px] max-lg:!tw-w-[160px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-flex tw-gap-2 tw-group !tw-bg-transparent !tw-text-black dark:!tw-text-white tw-transition-colors tw-duration-[0.3s] tw-border-[1px] tw-border-black dark:tw-border-white"
            >
              <span className="tw-relative tw-flex tw-place-items-center tw-place-content-center tw-w-6 tw-h-6">
                <span className="tw-absolute tw-inset-0 tw-top-0 tw-left-0 tw-scale-0 tw-duration-300 group-hover:tw-scale-100 tw-border-2 tw-border-gray-600 dark:tw-border-gray-200 tw-rounded-full tw-w-full tw-h-full" />
                <span className="bi bi-play-circle-fill" />
              </span>
              <span>{content.hero.watchVideo}</span>
            </button>
            <a className="btn tw-group max-lg:!tw-w-[160px] tw-flex tw-gap-2 tw-shadow-lg !tw-w-[170px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.03]" href="#">
              <span>{content.hero.getStarted}</span>
              <i className="bi bi-arrow-right group-hover:tw-translate-x-1 tw-duration-300" />
            </a>
          </div>
        </div>

        <div className="reveal-up tw-relative tw-mt-8 tw-flex tw-w-full tw-place-content-center tw-place-items-center" id="dashboard-container">
          <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-x-1/2 tw-top-[5%] tw-h-[200px] tw-w-[200px]" />
          <div className="tw-relative tw-max-w-[80%] tw-bg-white dark:tw-bg-black tw-border-[1px] dark:tw-border-[#36393c] lg:tw-w-[1024px] lg:tw-h-[650px] tw-flex tw-shadow-xl max-lg:tw-h-[450px] max-lg:tw-w-full tw-overflow-hidden tw-min-w-[320px] md:tw-w-full tw-min-h-[450px] tw-rounded-xl tw-bg-transparent max-md:tw-max-w-full" id="dashboard">
            <div className="purple-bg-grad tw-max-w-[80%] reveal-up tw-absolute tw-left-1/2 tw--translate-x-1/2 tw-top-[0%] lg:tw-max-w-[1000px] tw-h-full tw-w-full" />
            <div className="animated-border tw-w-full tw-h-full tw-p-[2px]">
              <div className="tw-w-full tw-h-full tw-rounded-xl tw-overflow-hidden tw-flex">
                <div className="tw-absolute tw-rounded-xl tw-text-center tw-transition-transform tw-duration-300 tw-scale-0 tw-backdrop-blur-lg tw-flex tw-flex-col tw-p-10 tw-place-items-center tw-gap-4 tw-w-full tw-h-full dark:tw-bg-[#000000b4] tw-bg-[#ffffff6a] firefox:tw-bg-white tw-top-0 tw-left-0 tw-z-20" id="signup-prompt">
                  <h4 className="tw-mt-6 tw-text-3xl max-md:tw-text-xl">{content.hero.signupPrompt}</h4>
                  <div className="tw-flex tw-gap-1 tw-place-items-center">
                    <div className="tw-flex tw--space-x-4">
                      {['man.jpg', 'women.jpg', 'man2.jpg', 'man.jpg', 'women.jpg'].map((avatar, index) => (
                        <img key={`${avatar}-${index}`} className={`tw-z-[${5 - index}] tw-w-10 tw-h-10 tw-object-cover tw-rounded-full tw-border-2 tw-border-white`} src={`/assets/images/people/${avatar}`} alt={`Avatar ${index + 1}`} />
                      ))}
                    </div>
                    <p>{content.hero.userCount}</p>
                  </div>
                  <div className="tw-mt-3 tw-text-lg">{content.hero.userCountDesc}</div>
                  <a href="#" className="btn">{content.hero.signUp}</a>
                </div>
                <div className="tw-min-w-[250px] max-lg:tw-hidden tw-p-2 tw-gap-2 tw-flex tw-flex-col tw-bg-gray-100 dark:tw-bg-[#171717] tw-h-full">
                  <div className="tw-h-[30px] tw-w-fit tw-max-w-[100px]">
                    <img src="/assets/logo/logo.png" alt="logo" className="tw-object-contain tw-opacity-80 tw-h-full tw-w-full dark:tw-invert" />
                  </div>
                  <div className="tw-flex tw-mt-2 tw-gap-2 tw-flex-col">
                    {content.hero.sidebar.map(([icon, label]) => (
                      <a key={label} href="#" className="tw-flex tw-rounded-sm tw-gap-2 tw-p-2 dark:hover:tw-bg-[#2d2d2ddb] hover:tw-bg-gray-200">
                        <i className={`bi ${icon}`} />
                        <span>{label}</span>
                      </a>
                    ))}
                    <a href="#" className="tw-flex tw-rounded-sm tw-group tw-gap-2 tw-p-2 dark:hover:tw-bg-[#2d2d2ddb] hover:tw-bg-gray-200">
                      <span>{content.hero.showAll}</span>
                      <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1" />
                    </a>
                  </div>
                  <div className="tw-mt-auto tw-w-full tw-flex tw-px-6 tw-place-content-center">
                    <a href="#" className="btn !tw-w-full !tw-bg-transparent tw-duration-[0.3s] hover:!tw-bg-black hover:!tw-text-white dark:hover:!tw-bg-white dark:hover:!tw-text-black !tw-border-[1px] !tw-border-black !tw-text-black dark:!tw-border-white dark:!tw-text-white">
                      {content.hero.signUp}
                    </a>
                  </div>
                </div>
                <PromptPlayground />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
