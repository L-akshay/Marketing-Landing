'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/data';

/**
 * Delivered work. Sits in the dark band between the motion cards and the
 * service cards, so the page keeps its cream → dark → cream rhythm.
 */
export default function Showreel() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context((self) => {
            const q = self.selector;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (reduced) {
                gsap.set(q('.showreel__title-line, .project-card'), { opacity: 1, y: 0, rotation: 0 });
                gsap.set(q('.showreel__underline path'), { strokeDashoffset: 0 });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.to('.showreel__title-line', {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
            })
                .to(
                    '.showreel__underline path',
                    { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' },
                    '-=0.5'
                )
                /* Cards land with the same elastic settle the service cards use. */
                .to(
                    '.project-card',
                    {
                        y: 0,
                        opacity: 1,
                        rotation: (i) => (i % 2 === 0 ? -1.5 : 1.5),
                        duration: 1.2,
                        stagger: 0.14,
                        ease: 'elastic.out(1, 0.65)',
                    },
                    '-=0.7'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="showreel-section" id="showreel-section" ref={sectionRef}>
            <div className="showreel__inner">
                <div className="showreel__head">
                    <h2 className="showreel__title">
                        <span className="showreel__title-line">things we have</span>
                        <span className="showreel__title-line">
                            already <span className="italic-text">shipped:</span>
                        </span>
                    </h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        viewBox="0 0 159 17"
                        fill="none"
                        className="showreel__underline"
                        aria-hidden="true"
                    >
                        <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="showreel__grid">
                    {PROJECTS.map((project) => (
                        <article className={`project-card project-card--${project.id}`} key={project.id}>
                            <span className={`project-card__badge ${project.badgeColor}`}>
                                {project.badge}
                            </span>

                            <h3 className="project-card__title">{project.title}</h3>

                            <p className="project-card__challenge">{project.challenge}</p>

                            <ul className="project-card__built">
                                {project.built.map((item) => (
                                    <li key={item}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="16"
                                            className="services-card__bullet-svg"
                                            aria-hidden="true"
                                        >
                                            <use href="#bullet-icon" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <p className="project-card__outcome">{project.outcome}</p>

                            {project.notice && (
                                <p className="project-card__notice">{project.notice}</p>
                            )}

                            <ul className="project-card__tech">
                                {project.tech.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>

                            {/* No URL → an honest status, never a dead anchor. */}
                            {project.href ? (
                                <a
                                    className="project-card__link"
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="project-card__link-text">{project.cta}</span>
                                </a>
                            ) : (
                                <span
                                    className={`project-card__pending${project.confidential ? ' project-card__pending--locked' : ''}`}
                                >
                                    {project.confidential && (
                                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                                            <rect x="3.2" y="7" width="9.6" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    )}
                                    {project.pending}
                                </span>
                            )}

                            {project.confidential && (
                                <p className="project-card__private-note">
                                    Built under NDA. We can walk through the architecture on a call.
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
