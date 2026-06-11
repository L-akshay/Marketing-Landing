import { content } from '@/lib/content'

export function FeaturesSection() {
  return (
    <section className="tw-relative tw-flex tw-w-full tw-min-h-[110vh] max-md:tw-min-h-[80vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden">
      <div className="tw-w-full max-lg:tw-max-w-full tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[80%] tw-gap-4 tw-p-4">
        <h3 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-3xl tw-text-center tw-leading-normal">追加機能</h3>
        <div className="tw-mt-8 tw-relative tw-gap-10 tw-p-4 tw-grid tw-place-items-center tw-grid-cols-3 max-lg:tw-flex max-lg:tw-flex-col">
          {content.features.map(([image, title, desc]) => (
            <div key={title} className="reveal-up tw-w-[350px] tw-border-[1px] tw-h-[400px] tw-rounded-md tw-place-items-center tw-p-4 tw-bg-[#f2f3f4] max-md:tw-w-[320px] dark:tw-bg-[#141414] dark:tw-border-[#1f2123] tw-flex tw-flex-col tw-gap-3">
              <div className="tw-w-full tw-h-[250px] tw-p-4 tw-rounded-xl tw-backdrop-blur-2xl tw-overflow-hidden tw-flex tw-place-content-center">
                <img src={image} alt={title} className="tw-w-auto tw-h-full tw-object-contain" />
              </div>
              <h3 className="tw-text-2xl">{title}</h3>
              <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-px-4 tw-text-center tw-text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
