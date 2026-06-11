import type { ReactNode } from 'react'

type Section = {
  heading: string
  body: ReactNode
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: Section[]
}) {
  return (
    <main className="hero-section tw-min-h-screen tw-bg-black tw-text-white">
      <section className="hero-bg-gradient tw-flex tw-min-h-screen tw-w-full tw-place-content-center tw-px-[5%] tw-pb-20 tw-pt-36">
        <article className="tw-w-full tw-max-w-4xl">
          <div className="reveal-up tw-mb-10">
            <a href="/" className="footer-link tw-inline-flex tw-items-center tw-gap-2 tw-text-sm">
              <i className="bi bi-arrow-left" />
              <span>Back to Pixa</span>
            </a>
          </div>

          <div className="tw-rounded-xl tw-border tw-border-[#1f2123] tw-bg-[#080808]/80 tw-p-8 tw-shadow-xl max-md:tw-p-5">
            <p className="tw-text-sm tw-text-gray-400">Last updated: {updated}</p>
            <h1 className="tw-mt-4 tw-text-5xl tw-font-semibold tw-leading-tight max-md:tw-text-3xl">{title}</h1>
            <p className="tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-200 max-md:tw-text-base">{intro}</p>

            <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-8">
              {sections.map((section) => (
                <section key={section.heading} className="tw-flex tw-flex-col tw-gap-3">
                  <h2 className="tw-text-2xl tw-font-medium max-md:tw-text-xl">{section.heading}</h2>
                  <div className="tw-leading-7 tw-text-gray-300">{section.body}</div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
