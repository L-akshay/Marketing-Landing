import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy - Pixa',
  description: 'Cookie Policy for Pixa.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="June 12, 2026"
      intro="This Cookie Policy explains how Pixa uses cookies and similar technologies on our website and services."
      sections={[
        {
          heading: 'What Cookies Are',
          body: 'Cookies are small text files stored on your device. Similar technologies include local storage, pixels, tags, and SDKs.',
        },
        {
          heading: 'How We Use Cookies',
          body: 'We use cookies to keep you signed in, remember preferences such as theme, protect the service, measure performance, and understand product usage.',
        },
        {
          heading: 'Types of Cookies',
          body: 'Essential cookies are required for core functionality. Analytics cookies help us improve the product. Preference cookies remember settings such as language and color mode.',
        },
        {
          heading: 'Third-Party Cookies',
          body: 'Some cookies may be set by trusted providers that help us with hosting, payments, analytics, customer support, or security.',
        },
        {
          heading: 'Managing Cookies',
          body: 'You can control cookies through your browser settings. Disabling some cookies may affect parts of the service.',
        },
        {
          heading: 'Updates',
          body: 'We may update this Cookie Policy as our services and technology providers change.',
        },
        {
          heading: 'Contact',
          body: 'For cookie questions, contact us at privacy@pixa.example.',
        },
      ]}
    />
  )
}
