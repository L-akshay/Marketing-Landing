'use client'

import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { content } from '@/lib/content'
import { Dropdown } from './Dropdown'

type Message = {
  role: 'user' | 'ai'
  text: string
}

const responses: Record<string, string> = {
  'gpt 4o': 'GPT 4oからこんにちは。あと3つプロンプトを追加できます。',
  gemini: 'Geminiからこんにちは。あと3つプロンプトを追加できます。',
  'llama 3': 'Meta Llama 3からこんにちは。あと3つプロンプトを追加できます。',
  claude: 'Claudeからこんにちは。あと3つプロンプトを追加できます。',
}

export function PromptPlayground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [model, setModel] = useState('gpt 4o')
  const [input, setInput] = useState('')
  const [locked, setLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: [...content.hero.typedStrings],
      typeSpeed: 80,
      smartBackspace: true,
      loop: true,
      backDelay: 2000,
    })
    return () => typed.destroy()
  }, [])

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages])

  const addPrompt = () => {
    const text = input.trim()
    if (!text || locked || messages.filter((message) => message.role === 'user').length >= 3) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: responses[model] ?? responses['gpt 4o'] }])
    }, 100)

    if (messages.filter((message) => message.role === 'user').length + 1 >= 3) setLocked(true)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') addPrompt()
  }

  return (
    <div className="tw-flex tw-w-full tw-p-4 tw-bg-white dark:tw-bg-black tw-h-full tw-flex-col" id="pixa-playground">
      <div className="tw-relative tw-w-full tw-flex tw-place-content-center tw-h-full">
        <div className="tw-absolute tw-top-[20%] max-lg:tw-top-[30%] tw-left-1/2 tw--translate-x-1/2 tw-w-[150px] tw-h-[150px]">
          <img src="/assets/logo/logo.png" className="tw-w-full tw-h-full dark:tw-invert tw-object-contain tw-opacity-20" alt="Pixa logo" />
        </div>
        <div
          ref={containerRef}
          className="prompt-container tw-overflow-y-auto tw-px-[5%] max-lg:tw-px-2 scrollbar max-lg:tw-max-h-[80%] tw-max-h-[550px] max-lg:tw-mt-12 tw-w-full tw-h-full tw-z-10 tw-flex tw-flex-col"
          id="prompt-container"
        >
          {messages.length === 0 ? (
            <div className="tw-w-full tw-flex tw-text-center tw-flex-col tw-place-content-center">
              <h2 className="tw-text-4xl max-md:tw-text-2xl max-md:tw-mt-3 tw-opacity-80">{content.hero.tryPrompts}</h2>
              <div className="tw-inline tw-mt-6 max-md:tw-mt-3">
                <span ref={typedRef} id="prompts-sample" />
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div className="tw-w-full tw-flex tw-p-2" key={`${message.role}-${index}`}>
                <div className={`tw-w-fit tw-p-2 ${message.role === 'user' ? 'tw-ml-auto tw-rounded-xl tw-bg-gray-100 dark:tw-bg-[#171717]' : 'tw-mr-auto'}`}>
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        id="prompt-form"
        className="tw-place-content-center tw-mt-auto tw-h-[50px] tw-p-1 tw-place-items-center tw-justify-around tw-flex tw-gap-1 tw-bottom-2 tw-w-full tw-rounded-md tw-bg-[#f3f4f6] dark:tw-bg-[#171717]"
      >
        <div className="tw-min-w-[140px] tw-min-h-[80px] max-lg:tw-absolute tw-z-10 tw-top-1 tw-left-1/2 max-lg:tw--translate-x-1/2 tw-flex tw-flex-col tw-text-sm tw-gap-1 tw-place-content-center">
          <Dropdown options={content.hero.aiModels} onChange={setModel} />
        </div>
        <input
          placeholder={content.hero.promptPlaceholder}
          type="text"
          className="tw-p-2 !tw-outline-none tw-bg-transparent tw-border-none tw-w-full tw-placehoder-gray-500 dark:tw-placeholder-opacity-60 dark:tw-placeholder-gray-300 tw-max-w-[80%] tw-h-full"
          name="prompt"
          value={input}
          disabled={locked}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <button type="button" onClick={addPrompt} className="btn !tw-bg-[#6366f1] !tw-p-2 !tw-px-3 !tw-text-white" title="submit" disabled={locked}>
          <i className="bi bi-arrow-up" />
        </button>
      </div>
    </div>
  )
}
