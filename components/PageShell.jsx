import Link from 'next/link';
import { site, whatsappUrl } from '@/config/site';

/**
 * Shared layout for the sub-pages. Uses the same shell language as the
 * homepage — cream page, a dark rounded card for the hero, speech-bubble pills
 * and the display face for headings.
 */
export default function PageShell({ eyebrow, title, lede, children, showCta = true }) {
    return (
        <div className="page-shell">
            <header className="page-topbar">
                <Link href="/" className="page-topbar__logo">aarohiq</Link>
                <a href="#page-contact" className="page-topbar__cta">start a project</a>
            </header>

            <section className="page-hero">
                <div className="page-hero__inner">
                    {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
                    <h1 className="page-hero__title">{title}</h1>
                    {lede && <p className="page-hero__lede">{lede}</p>}
                </div>
            </section>

            <main className="page-body">{children}</main>

            {showCta && (
                <section className="page-cta" id="page-contact">
                    <h2>tell us what is slowing the business down.</h2>
                    <p>
                        A website that does not convert, a process nobody wants to do twice, or a system
                        that does not exist yet.
                    </p>
                    <div className="page-cta__actions">
                        <a href={`mailto:${site.email}`} className="page-cta__btn">
                            {site.email}
                        </a>
                        {whatsappUrl && (
                            <a
                                href={whatsappUrl}
                                className="page-cta__btn page-cta__btn--ghost"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                whatsapp us
                            </a>
                        )}
                    </div>
                </section>
            )}

            <footer className="page-foot">
                <nav className="page-foot__links">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-service">Terms of Service</Link>
                </nav>
                <span className="page-foot__brand">
                    &copy; {new Date().getFullYear()} {site.legalName} &mdash; where businesses rise with intelligence.
                </span>
            </footer>
        </div>
    );
}
