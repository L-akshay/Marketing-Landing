import { content } from '@/lib/content'

export function PricingSection() {
  return (
    <section className="tw-mt-5 tw-flex tw-w-full tw-flex-col tw-gap-6 tw-place-items-center tw-p-[2%]" id="pricing">
      <h3 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-2xl">あなたに合ったプランを選ぶ</h3>
      <div className="tw-mt-10 tw-flex tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col">
        {content.pricing.map((plan, index) => (
          <div
            key={plan.name}
            className={`reveal-up tw-flex tw-w-[350px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg ${
              index === 1 ? 'tw-border-2 dark:tw-border-[#595858]' : 'tw-border-[1px] dark:tw-border-[#1f2123]'
            } tw-border-outlineColor tw-bg-white dark:tw-bg-[#080808] tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]`}
          >
            <h3>
              <span className="tw-text-5xl max-md:tw-text-3xl tw-font-semibold">{plan.price}</span>
              <span className="tw-text-2xl tw-text-gray-600 dark:tw-text-gray-300">/月</span>
            </h3>
            <p className="tw-mt-3 tw-text-center tw-text-gray-800 dark:tw-text-gray-100">{plan.desc}</p>
            <hr />
            <ul className="tw-mt-4 tw-flex tw-flex-col tw-gap-4 tw-text-base tw-text-gray-800 dark:tw-text-gray-200">
              {plan.features.map((feature, featureIndex) => (
                <li className="tw-flex tw-gap-2" key={feature}>
                  <i className={`bi bi-check-circle-fill ${index === 0 && featureIndex > 2 ? 'tw-text-gray-400 dark:tw-text-gray-500' : ''}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`btn tw-mt-auto !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02] ${
                index === 1 ? '' : '!tw-text-black !tw-bg-transparent !tw-border-[1px] tw-border-black dark:tw-border-white dark:!tw-text-white'
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
