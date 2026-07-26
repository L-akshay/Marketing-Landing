import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import HeroSystem from '@/components/HeroSystem';
import ServiceCards from '@/components/ServiceCards';
import MotionCards from '@/components/MotionCards';
import Showreel from '@/components/Showreel';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import HorizontalWords from '@/components/HorizontalWords';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/structured-data';

/* Server component — every child that needs the browser marks itself 'use
   client', so the page shell itself never ships to the bundle. */
export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            <header className="main-header">
                <Navbar />
                <HeroSystem />
            </header>

            <HorizontalWords />

            <main>
                <div className="content-section motion-cards-wrapper">
                    <MotionCards />
                </div>

                <Showreel />

                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>

                <section className="brand-story-section" id="about">
                    <div className="brand-story__inner">
                        <p className="brand-story__eyebrow">where businesses rise with intelligence</p>
                        <h2 className="brand-story__title">
                            aarohiq means <span className="italic-text">intelligent rise.</span>
                        </h2>
                        <p className="brand-story__copy">
                            Aarohiq comes from &ldquo;Aaroh,&rdquo; meaning rise or ascent, and
                            &ldquo;IQ,&rdquo; for intelligence, logic and systems. We started it to help
                            businesses use technology with more clarity &mdash; designing around the
                            customer journey and the team&rsquo;s actual workflow instead of adding
                            software for the sake of looking modern.
                        </p>
                        <p className="brand-story__line">
                            Technology should make the business easier to run and easier to buy from.
                        </p>
                    </div>
                </section>
            </main>

            <section className="Double-marquee">
                <DoubleMarquee />
            </section>

            <footer className="main-footer">
                <Footer />
            </footer>

            <TransitionScribble />

            <JsonLd data={[organizationSchema(), websiteSchema()]} />
        </>
    );
}
