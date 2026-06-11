'use client'

import { useEffect, useRef, useState } from 'react'

type Option = {
  name: string
  logo: string
  alt: string
}

export function Dropdown({ options, onChange }: { options: readonly Option[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const choose = (option: Option) => {
    setSelected(option)
    onChange(option.name.toLowerCase())
    setOpen(false)
  }

  return (
    <div ref={ref} className="dropdown tw-p-2 tw-rounded-md tw-bg-[#f3f4f6] dark:tw-bg-[#171717]">
      <input type="hidden" className="dropdown-input" value={selected.name} readOnly />
      <button type="button" className="dropdown-toggle tw-flex tw-gap-5" onClick={() => setOpen((value) => !value)}>
        <span className="tw-flex tw-w-fit tw-gap-2 tw-place-items-center">
          <span className="tw-w-[20px] tw-h-[20px]">
            <img src={selected.logo} alt={selected.alt} className="dropdown-select-icon dark:tw-invert" />
          </span>
          <span className="dropdown-select-text">{selected.name}</span>
        </span>
        <i className="bi bi-chevron-down tw-ml-auto lg:tw-hidden" />
        <i className="bi bi-chevron-up tw-ml-auto lg:tw-block tw-hidden" />
      </button>
      <ul
        className="dropdown-menu tw-shadow-md tw-bottom-[50px] max-lg:tw-top-[105%] max-lg:tw-bottom-[unset]"
        style={{ display: open ? 'block' : 'none' }}
      >
        {options.map((option) => (
          <li key={option.name} className="tw-flex tw-gap-2 tw-place-items-center" onClick={() => choose(option)}>
            <span className="tw-w-[20px] tw-h-[20px]">
              <img src={option.logo} alt={option.alt} className="dropdown-menu-icon dark:tw-invert" />
            </span>
            <span className="dropdown-text">{option.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
