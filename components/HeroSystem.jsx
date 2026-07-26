'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSystemVisual from '@/components/HeroSystemVisual';

/* Split into words so the headline can reveal on a stagger, the way the rest of
   the site reveals its section headings. */
const LINE_TWO = ['that', 'move', 'businesses'];

export default function HeroSystem() {
    const rootRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context((self) => {
            const q = self.selector;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            /* CSS holds the "before" state — same approach the section
               underlines already use — so nothing flashes before this runs.
               Under reduced motion the stylesheet has already resolved
               everything to its final state and we simply do nothing. */
            if (reduced) return;

            const wire = (i) => q(`.hero-sys__wire--${i} .hero-sys__wire-line`)[0];

            /* Measure each connector so the draw-on is exact rather than a
               guessed dash length. */
            q('.hero-sys__wire-line, .hero-sys__wire-pulse').forEach((path) => {
                const len = path.getTotalLength();
                if (path.classList.contains('hero-sys__wire-pulse')) {
                    gsap.set(path, { strokeDasharray: `26 ${len}`, strokeDashoffset: len + 26 });
                } else {
                    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
                }
            });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            /* ── 1. Copy ─────────────────────────────────────────────────── */
            tl.to('.hero-sys__eyebrow', {
                scale: 1,
                opacity: 1,
                rotation: -1.5,
                duration: 1.4,
                ease: 'elastic.out(1, 0.5)',
            })
                .to(
                    '.hero-sys__word',
                    { y: 0, opacity: 1, duration: 0.85, stagger: 0.045 },
                    0.12
                )
                /* The oval draws itself under "forward" — the site's signature move. */
                .to(
                    '.hero-sys__underline path',
                    { strokeDashoffset: 0, duration: 1.3, ease: 'power2.out' },
                    '-=0.45'
                )
                .to(
                    '.hero-sys__smiley',
                    { scale: 1, opacity: 1, rotation: -18, duration: 1.7, ease: 'elastic.out(1, 0.4)' },
                    '-=1.4'
                )
                .to(
                    '.hero-sys__star',
                    { scale: 1, opacity: 1, rotation: 12, duration: 1.7, ease: 'elastic.out(1, 0.4)' },
                    '-=1.5'
                )
                .to('.hero-sys__lede', { y: 0, opacity: 1, duration: 0.75 }, '-=1.25')
                .to(
                    '.hero-sys__actions > *',
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
                    '-=0.5'
                )
                .to('.hero-sys__micro', { opacity: 1, duration: 0.6 }, '-=0.3');

            /* ── 2. The system builds itself ─────────────────────────────── */
            tl.to(
                '.hero-sys__browser',
                { scale: 1, opacity: 1, rotation: -2, duration: 1.5, ease: 'elastic.out(1, 0.55)' },
                0.4
            );

            const stages = [
                { line: 1, node: '.hero-sys__node--enquiry', rotation: 3 },
                { line: 2, node: '.hero-sys__node--data', rotation: -3.5 },
                { line: 3, node: '.hero-sys__node--flow', rotation: 2.5 },
            ];

            stages.forEach(({ line, node, rotation }, i) => {
                tl.to(wire(line), { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 1.0 + i * 0.42)
                    .to(
                        node,
                        { scale: 1, opacity: 1, rotation, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
                        '-=0.22'
                    );
            });

            tl.to(wire(4), { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 2.26)
                .to(
                    '.hero-sys__outcome',
                    { scale: 1, opacity: 1, rotation: 2, duration: 1.6, ease: 'elastic.out(1, 0.45)' },
                    '-=0.25'
                );

            /* ── 3. Idle life ────────────────────────────────────────────── */
            /* Signals keep moving through the wires, one after another. */
            const pulses = q('.hero-sys__wire-pulse');
            const pulseTl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 3.4 });
            pulses.forEach((path, i) => {
                const len = path.getTotalLength();
                pulseTl.fromTo(
                    path,
                    { strokeDashoffset: len + 26 },
                    { strokeDashoffset: 0, duration: 0.85, ease: 'power1.inOut' },
                    i * 0.5
                );
            });

            /* Nodes breathe rather than bounce — slow, offset, easy to ignore. */
            gsap.to('.hero-sys__node, .hero-sys__outcome', {
                y: '+=7',
                duration: () => gsap.utils.random(3.2, 4.6),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 3.4,
                stagger: { each: 0.35, from: 'random' },
            });

            /* ── 4. Mouse parallax — same quickTo feel as the cursor bubble ─ */
            const board = q('.hero-sys__board')[0];
            const browser = q('.hero-sys__browser')[0];
            if (board && window.matchMedia('(hover: hover)').matches) {
                const boardX = gsap.quickTo(board, 'x', { duration: 0.9, ease: 'power3' });
                const boardY = gsap.quickTo(board, 'y', { duration: 0.9, ease: 'power3' });
                const browserX = gsap.quickTo(browser, 'x', { duration: 1.1, ease: 'power3' });
                const browserY = gsap.quickTo(browser, 'y', { duration: 1.1, ease: 'power3' });

                const onMove = (e) => {
                    const nx = e.clientX / window.innerWidth - 0.5;
                    const ny = e.clientY / window.innerHeight - 0.5;
                    boardX(nx * 26);
                    boardY(ny * 18);
                    /* The browser card leads slightly, which gives the stack depth. */
                    browserX(nx * 14);
                    browserY(ny * 10);
                };

                window.addEventListener('mousemove', onMove);
                self.add(() => window.removeEventListener('mousemove', onMove));
            }

            /* ── 5. Scroll hand-off into the next section ────────────────── */
            gsap.to('.hero-sys__visual', {
                yPercent: -12,
                opacity: 0.35,
                ease: 'none',
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            });

            gsap.to('.hero-sys__copy', {
                yPercent: -6,
                ease: 'none',
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-sys" ref={rootRef}>
            {/* Colour bleeding up from behind the card — the same palette the
                cards and marquee use, just softened. */}
            <div className="hero-sys__glow" aria-hidden="true" />

            <div className="hero-sys__inner">
                <div className="hero-sys__copy">
                    <span className="hero-sys__eyebrow">websites &middot; automation &middot; ai systems</span>

                    <h1 className="hero-sys__title">
                        <span className="hero-sys__word">we&nbsp;</span>

                        {/* Smiley, star and hand-drawn oval — the same three
                            marks the previous hero used, redistributed. */}
                        <span className="hero-sys__word is--relative">
                            build&nbsp;
                            <span className="hero-sys__smiley">
                                <img src="/assets/VimeoHero SVG/smiley-face.svg" alt="" aria-hidden="true" />
                            </span>
                        </span>

                        <span className="hero-sys__word is--relative">
                            <em>digital systems</em>
                            <span className="hero-sys__star">
                                <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" aria-hidden="true" />
                            </span>
                        </span>

                        {/* Forces a line break inside the wrapping flex row. */}
                        <span className="hero-sys__break" />

                        {LINE_TWO.map((word) => (
                            <span className="hero-sys__word" key={word}>
                                {word}&nbsp;
                            </span>
                        ))}

                        <span className="hero-sys__word is--relative">
                            <svg
                                className="hero-sys__underline"
                                viewBox="0 0 268 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M133 4C61 4 4 15 4 30c0 15 57 26 129 26s131-11 131-26C264 15 205 4 133 4Z"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span>forward.</span>
                        </span>
                    </h1>

                    <p className="hero-sys__lede">
                        Aarohiq designs engaging websites, ecommerce experiences and intelligent
                        automations that help businesses attract customers, reduce repetitive work and
                        operate more efficiently.
                    </p>

                    <div className="hero-sys__actions">
                        <a href="#contact" className="hero-sys__btn hero-sys__btn--primary">
                            <span className="hero-sys__btn-text">start a project</span>
                        </a>
                        <a href="#showreel-section" className="hero-sys__btn hero-sys__btn--ghost">
                            <span className="hero-sys__btn-text">explore our work</span>
                        </a>
                    </div>

                    <p className="hero-sys__micro">
                        from strategy and design to development and automation.
                    </p>
                </div>

                <div className="hero-sys__visual">
                    <HeroSystemVisual />
                </div>
            </div>
        </section>
    );
}
