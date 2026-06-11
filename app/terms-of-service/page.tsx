import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service - Pixa',
  description: 'Terms of Service for Pixa.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 12, 2026"
      intro="These Terms of Service govern your access to and use of Pixa. By using Pixa, you agree to these terms."
      sections={[
        {
          heading: 'Use of the Service',
          body: 'You may use Pixa only in compliance with these terms, applicable laws, and any usage policies or plan limits presented in the product.',
        },
        {
          heading: 'Accounts',
          body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
        },
        {
          heading: 'Acceptable Use',
          body: 'You may not use Pixa to violate laws, infringe rights, generate harmful content, attempt unauthorized access, disrupt the service, or bypass safety and rate-limit systems.',
        },
        {
          heading: 'Content',
          body: 'You retain rights to content you submit and outputs generated for you, subject to applicable law and third-party rights. You are responsible for how you use generated outputs.',
        },
        {
          heading: 'Subscriptions and Billing',
          body: 'Paid plans renew according to the billing terms shown at checkout. Fees are non-refundable except where required by law or expressly stated otherwise.',
        },
        {
          heading: 'Disclaimers',
          body: 'Pixa is provided on an “as is” and “as available” basis. AI outputs may be inaccurate, incomplete, or unsuitable for your intended use.',
        },
        {
          heading: 'Contact',
          body: 'For questions about these terms, contact us at legal@pixa.example.',
        },
      ]}
    />
  )
}
