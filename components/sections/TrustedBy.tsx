import { content } from '@/lib/content'

export function TrustedBy() {
  return (
    <section className="tw-relative tw-flex tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-8">
      <h2 className="reveal-up tw-text-3xl max-md:tw-text-xl">{content.trustedBy.heading}</h2>
      <div className="reveal-up carousel-container">
        <div className="carousel lg:w-place-content-center tw-mt-10 tw-flex tw-w-full tw-gap-5 max-md:tw-gap-2">
          {content.trustedBy.logos.map((logo) => (
            <div className="carousel-img tw-h-[30px] tw-w-[150px]" key={logo}>
              <img src={`/assets/images/brand-logos/${logo}.svg`} alt={logo} className="tw-h-full tw-w-full tw-object-contain tw-grayscale tw-transition-colors hover:tw-grayscale-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
