'use client'

import { useState } from 'react'
import { content } from '@/lib/content'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="tw-relative tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%]">
      <h3 className="tw-text-4xl tw-font-medium max-md:tw-text-2xl">よくある質問</h3>
      <div className="tw-mt-5 tw-flex tw-min-h-[300px] tw-w-full tw-max-w-[850px] tw-flex-col tw-gap-4">
        {content.faq.map(([question, answer], index) => (
          <div key={question}>
            <div className="faq tw-w-full">
              <button className="faq-accordion tw-flex tw-w-full tw-select-none tw-text-xl max-md:tw-text-lg" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span>{question}</span>
                <i className="bi bi-plus tw-text-xl tw-origin-center tw-duration-300 tw-transition-transform tw-ml-auto tw-font-semibold" style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }} />
              </button>
              <div className="content max-lg:tw-text-sm" style={{ maxHeight: openIndex === index ? '240px' : '0px', padding: openIndex === index ? '20px 18px' : '0px 18px' }}>
                {answer}
              </div>
            </div>
            {index < content.faq.length - 1 ? <hr /> : null}
          </div>
        ))}
      </div>
      <div className="purple-bg-grad max-md:tw-hidden reveal-up tw-absolute tw-bottom-14 tw-right-[20%] tw-h-[150px] tw-w-[150px] tw-rounded-full" />
    </section>
  )
}
