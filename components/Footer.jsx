'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WIGGLE_CONFIG } from '@/lib/data';
import { site, whatsappUrl } from '@/config/site';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => { tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' }); };
    const onLeave = () => {
        if (tween) {
            tween.kill();
            gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' });
        }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

const STICKERS = [
    { file: 'footer-sticker-boom', className: 'sticker-boom' },
    { file: 'footer-sticker-smiley', className: 'sticker-smiley' },
    { file: 'footer-sticker-heart', className: 'sticker-heart' },
    { file: 'footer-sticker-hands', className: 'sticker-hands' },
    { file: 'footer-sticker-100', className: 'sticker-100' },
    { file: 'footer-sticker-camera', className: 'sticker-camera' },
];

export default function Footer() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const cleanups = [];

        const ctx = gsap.context(() => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!reduced) {
                const stickers = gsap.utils.toArray('.footer-sticker');
                gsap.set(stickers, { scale: 0, opacity: 0, transformOrigin: 'center' });
                gsap.to(stickers, {
                    scale: 1,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'elastic.out(1, 0.5)',
                    stagger: 0.09,
                    scrollTrigger: {
                        trigger: '.footer-stickers',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            [
                { selector: '.footer-column h3', key: 'jobHeading' },
                { selector: '.footer-email', key: 'email' },
                { selector: '.footer-whatsapp', key: 'whatsapp' },
            ].forEach(({ selector, key }) => {
                document.querySelectorAll(selector).forEach((el) =>
                    cleanups.push(initWiggle(el, WIGGLE_CONFIG[key]))
                );
            });
        });

        return () => {
            cleanups.forEach((fn) => fn && fn());
            ctx.revert();
        };
    }, []);

    return (
        <div className="footer-inner" id="contact">
            <div className="footer-top">
                <div className="footer-column">
                    <span className="footer-badge">start a project</span>
                    <h3>tell us what is slowing the business down.</h3>
                    <p className="footer-note">
                        A website that does not convert, a process nobody wants to do twice, or a system
                        that does not exist yet. Say which one and we will tell you what we would build
                        first.
                    </p>
                </div>

                <div className="footer-column">
                    <span className="footer-badge">contact</span>
                    <a href={`mailto:${site.email}`} className="footer-email">
                        {site.email}
                    </a>
                    {whatsappUrl && (
                        <a
                            href={whatsappUrl}
                            className="footer-whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            whatsapp us
                        </a>
                    )}
                    <p className="footer-note">
                        {site.location.city}, {site.location.region} &mdash; working remotely worldwide.
                    </p>
                </div>

                <div className="footer-column">
                    <span className="footer-badge">aarohiq</span>
                    <p className="footer-line">where businesses rise with intelligence.</p>
                    <p className="footer-note">
                        Websites, ecommerce, workflow automation and AI systems &mdash; designed around
                        how the business actually runs.
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-stickers" aria-hidden="true">
                    {STICKERS.map(({ file, className }) => (
                        <img
                            key={file}
                            src={`/assets/Footer-Sticker SVG/${file}.svg`}
                            alt=""
                            className={`footer-sticker ${className}`}
                            loading="lazy"
                        />
                    ))}
                </div>

                <div className="footer-big-text" aria-hidden="true">
                    <span className="footer-wordmark">aarohiq</span>
                </div>

                <div className="footer-bottom-row">
                    <nav className="footer-legal" aria-label="Legal">
                        <span>&copy; {new Date().getFullYear()} {site.legalName}</span>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms-of-service">Terms</a>
                    </nav>
                </div>
            </div>
        </div>
    );
}
