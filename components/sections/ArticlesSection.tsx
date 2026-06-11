import { content } from '@/lib/content'

export function ArticlesSection() {
  return (
    <section className="tw-mt-5 tw-flex tw-min-h-[80vh] tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-p-[2%] max-lg:tw-p-3">
      <h3 className="reveal-up tw-text-4xl tw-font-medium max-md:tw-text-2xl">専門家によるリソースを読む</h3>
      <div className="reveal-up tw-mt-10 tw-flex tw-flex-wrap tw-place-content-center tw-gap-10 max-lg:tw-flex-col">
        {content.articles.map(([image, category, date, title]) => (
          <a href="#" key={title} className="tw-flex tw-h-[500px] tw-w-[400px] tw-flex-col tw-gap-2 tw-overflow-clip tw-rounded-lg tw-p-4 max-lg:tw-w-[350px]">
            <div className="tw-h-[350px] tw-min-h-[350px] tw-w-full tw-overflow-hidden tw-rounded-2xl">
              <img src={image} alt={title} className="tw-h-full tw-w-full tw-object-cover tw-transition-transform tw-duration-700 hover:tw-scale-[1.3]" />
            </div>
            <div className="tw-text-gray-600 dark:tw-text-gray-300 tw-justify-between tw-flex tw-gap-2">
              <div className="tw-text-gray-800 dark:tw-text-gray-200">{category}</div>
              <div className="tw-text-gray-600 dark:tw-text-gray-400">{date}</div>
            </div>
            <h3 className="tw-mt-1 tw-font-medium tw-text-xl max-md:tw-text-xl">{title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}
