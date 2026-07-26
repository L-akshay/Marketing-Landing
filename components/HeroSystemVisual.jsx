'use client';

/**
 * The hero's animated composition — presentational only. HeroSystem owns the
 * GSAP timeline and reaches in through its shared context selector.
 *
 * Everything here is drawn from the site's existing vocabulary: the cream card
 * on dark, the rotated colour pills with the speech-bubble corner, and the
 * hand-drawn stroke language used by the section underlines.
 *
 * It reads as: website → enquiry → enriched data → workflow → customer.
 */
export default function HeroSystemVisual() {
    return (
        <div className="hero-sys__board" aria-hidden="true">
            {/* Hand-drawn connectors. Same 400×560 space as the pill positions,
                so the wires land where the nodes actually are. */}
            <svg
                className="hero-sys__wires"
                viewBox="0 0 400 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {[
                    { i: 1, d: 'M150 192 C150 226 196 214 248 246' },
                    { i: 2, d: 'M312 276 C312 316 234 300 172 338' },
                    { i: 3, d: 'M96 366 C96 406 160 394 213 426' },
                    { i: 4, d: 'M292 456 C292 490 250 480 200 504' },
                ].map(({ i, d }) => (
                    <g key={i} className={`hero-sys__wire hero-sys__wire--${i}`}>
                        <path
                            className="hero-sys__wire-line"
                            d={d}
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        {/* A short dash chased along the same curve — the signal
                            moving through the system. */}
                        <path
                            className="hero-sys__wire-pulse"
                            d={d}
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </g>
                ))}

                {/* Mobile shortcut: with the third node hidden, this carries the
                    flow straight from the data node to the outcome. */}
                <g className="hero-sys__wire hero-sys__wire--mobile">
                    <path
                        className="hero-sys__wire-line"
                        d="M96 366 C96 442 140 474 176 502"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        className="hero-sys__wire-pulse"
                        d="M96 366 C96 442 140 474 176 502"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                </g>
            </svg>

            {/* ── The website itself ── */}
            <div className="hero-sys__browser">
                <div className="hero-sys__browser-bar">
                    <span className="hero-sys__dots">
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className="hero-sys__url">yourbrand.com</span>
                </div>

                <div className="hero-sys__browser-body">
                    <span className="hero-sys__skeleton hero-sys__skeleton--head" />
                    <div className="hero-sys__tiles">
                        <span className="hero-sys__tile hero-sys__tile--a" />
                        <span className="hero-sys__tile hero-sys__tile--b" />
                        <span className="hero-sys__tile hero-sys__tile--c" />
                    </div>
                    <span className="hero-sys__shop">get a quote</span>
                </div>
            </div>

            {/* ── Workflow nodes ── */}
            <span className="hero-sys__node hero-sys__node--enquiry">
                <i className="hero-sys__node-dot" />
                new enquiry
            </span>

            <span className="hero-sys__node hero-sys__node--data">
                <i className="hero-sys__node-dot" />
                data enriched
            </span>

            <span className="hero-sys__node hero-sys__node--flow">
                <i className="hero-sys__node-dot" />
                workflow active
            </span>

            {/* ── The business outcome ── */}
            <div className="hero-sys__outcome">
                <span className="hero-sys__outcome-check">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                        <path
                            d="M3 8.4 6.4 11.8 13 4.8"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                customer converted
            </div>
        </div>
    );
}
