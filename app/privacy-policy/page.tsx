import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Pixa',
  description: 'Privacy Policy for Pixa.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 12, 2026"
      intro="This Privacy Policy explains how Pixa collects, uses, and protects information when you use our website, products, and AI services."
      sections={[
        {
          heading: 'Information We Collect',
          body: 'We may collect account details, contact information, usage data, device information, and content you provide when using Pixa features such as prompts, uploads, and API requests.',
        },
        {
          heading: 'How We Use Information',
          body: 'We use information to provide and improve the service, personalize your experience, maintain security, process payments, communicate updates, and comply with legal obligations.',
        },
        {
          heading: 'AI Content',
          body: 'Prompts, generated outputs, uploaded files, and related metadata may be processed to deliver AI functionality, prevent abuse, debug issues, and improve reliability.',
        },
        {
          heading: 'Sharing',
          body: 'We do not sell personal information. We may share information with service providers, payment processors, infrastructure partners, analytics providers, or authorities when required by law.',
        },
        {
          heading: 'Data Retention',
          body: 'We retain information only as long as needed for the purposes described in this policy, unless a longer period is required for legal, security, or operational reasons.',
        },
        {
          heading: 'Your Choices',
          body: 'You may request access, correction, deletion, or export of your personal information by contacting Pixa support.',
        },
        {
          heading: 'Contact',
          body: 'For privacy questions, contact us at privacy@pixa.example.',
        },
      ]}
    />
  )
}
