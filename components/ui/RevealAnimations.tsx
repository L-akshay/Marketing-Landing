'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const RESPONSIVE_WIDTH = 1024

export function RevealAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to('.reveal-up', { opacity: 0, y: '100%' })
    gsap.to('#hero-section .reveal-up', {
      opacity: 1,
      duration: 0.8,
      y: '0%',
      stagger: 0.2,
      delay: 0.1,
    })
    gsap.to('#dashboard', {
      scale: 1,
      translateY: 0,
      rotateX: '0deg',
      scrollTrigger: {
        trigger: '#hero-section',
        start: window.innerWidth > RESPONSIVE_WIDTH ? 'top 95%' : 'top 70%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    const sections = gsap.utils.toArray<HTMLElement>('section')
    sections.forEach((sec) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: '10% 80%',
          end: '20% 90%',
        },
      })

      timeline.to(sec.querySelectorAll('.reveal-up'), {
        opacity: 1,
        duration: 0.8,
        y: '0%',
        stagger: 0.2,
      })
    })

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }, [])

  return null
}
