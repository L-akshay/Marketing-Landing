import { content } from '@/lib/content'

const legalHrefs = ['/privacy-policy', '/terms-of-service', '/cookie-policy']

export function Footer() {
  return (
    <footer className="tw-mt-auto tw-flex tw-flex-col tw-w-full tw-gap-4 tw-text-sm tw-pt-[5%] tw-pb-10 tw-px-[10%] tw-text-black dark:tw-text-white max-md:tw-flex-col">
      <div className="tw-flex max-md:tw-flex-col max-md:tw-gap-6 tw-gap-3 tw-w-full tw-place-content-around">
        <div className="tw-flex tw-h-full tw-w-[250px] tw-flex-col tw-place-items-center tw-gap-6 max-md:tw-w-full">
          <a href="#" className="tw-w-full tw-place-items-center tw-flex tw-flex-col tw-gap-6">
            <img src="/assets/logo/logo.png" alt="logo" className="tw-max-w-[120px] dark:tw-invert" />
            <div className="tw-max-w-[120px] tw-text-center tw-text-3xl tw-h-fit">PIXA</div>
          </a>
          <div className="tw-flex tw-gap-4 tw-text-lg">
            <a href="https://github.com/PaulleDemon/" aria-label="Github"><i className="bi bi-github" /></a>
            <a href="https://twitter.com/pauls_freeman" aria-label="Twitter"><i className="bi bi-twitter" /></a>
            <a href="https://www.linkedin.com/" aria-label="Linkedin"><i className="bi bi-linkedin" /></a>
          </div>
        </div>
        <div className="tw-flex max-md:tw-flex-col tw-flex-wrap tw-gap-6 tw-h-full tw-w-full tw-justify-around">
          {content.footer.columns.map(([heading, links], columnIndex) => (
            <div key={heading} className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
              <h2 className="tw-text-xl">{heading}</h2>
              <div className="tw-flex tw-flex-col tw-gap-3">
                {links.map((link, linkIndex) => (
                  <a key={link} href={columnIndex === 2 ? legalHrefs[linkIndex] : '#'} className="footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="tw-mt-8" />
      <div className="tw-text-center tw-text-gray-700 dark:tw-text-gray-300">{content.footer.copyright}</div>
    </footer>
  )
}
