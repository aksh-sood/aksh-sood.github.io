import { SITE_URL } from '../site.config.mjs';

export { SITE_URL };

/**
 * Sitewide metadata. Anything a human might want to change lives in
 * src/content/site.json instead — this file is for values the build needs
 * before content collections are available.
 */
export const SITE_TITLE = 'Aksh Sood';
export const SITE_DESCRIPTION =
  'Platform engineer building AWS and Kubernetes infrastructure for ' +
  'financial-infrastructure customers, and the LLM agent systems that run on it.';

/**
 * The nav bar follows the reference template's run of items. "Home" carries a
 * dropdown of page sections, matching the chevron in the reference.
 */
export const NAV = [
  {
    label: 'Home',
    href: '/',
    children: [
      { label: 'What I do', href: '/#services' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Toolbox', href: '/#toolbox' },
      { label: 'Writing', href: '/notes' },
    ],
  },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/#work' },
  { label: 'Resume', href: '/#experience' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const NAV_CTA = { label: "Let's Talk", href: '/#contact' } as const;
