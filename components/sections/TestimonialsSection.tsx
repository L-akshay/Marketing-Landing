import { content } from '@/lib/content'

export function TestimonialsSection() {
  return (
    <section className="tw-flex tw-min-h-[100vh] tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-p-[2%]">
      <h3 className="reveal-up tw-text-4xl tw-font-medium tw-text-center max-md:tw-text-2xl">Pixaを使うプロたちの声</h3>
      <div className="tw-mt-20 tw-gap-10 tw-space-y-8 max-md:tw-columns-1 lg:tw-columns-2 xl:tw-columns-3">
        {content.testimonials.map(([avatar, name, title, text]) => (
          <div key={name} className="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-bg-[#f6f7fb] dark:tw-bg-[#080808] dark:tw-border-[#1f2123] tw-p-4 max-lg:tw-w-[320px]">
            <div className="tw-flex tw-place-items-center tw-gap-3">
              <div className="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full">
                <img src={`/assets/images/people/${avatar}`} className="tw-h-full tw-w-full tw-object-cover" alt={name} />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-1">
                <div className="tw-font-semibold">{name}</div>
                <div className="tw-text-gray-700 dark:tw-text-gray-300">{title}</div>
              </div>
            </div>
            <p className="tw-mt-4 tw-text-gray-800 dark:tw-text-gray-200">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
