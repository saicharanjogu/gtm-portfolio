export const profile = {
  name: 'Sai Charan Jogu',
  role: 'Product & GTM',
  email: 'saicharanjogu0@gmail.com',
  // Add your LinkedIn URL here to show the LinkedIn button.
  linkedin: '',
  whatsapp: '919398171029',
  whatsappDisplay: '+91 93981 71029',
}

export const whatsappLink = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  "Hi Sai, our funnel is leaking between demo and paid POC. Can we talk?",
)}`

export const stages = [
  {
    key: 'lead',
    title: 'Lead gen',
    body: 'Build pipeline against your ICP, not just a volume target.',
  },
  {
    key: 'demo',
    title: 'Demos',
    body: 'Run demos that test buyer-agreed success criteria, not feature tours.',
  },
  {
    key: 'value',
    title: 'Value engineering',
    body: 'Build the ROI case in language your champion can defend internally: productivity, revenue, quality, and risk.',
  },
  {
    key: 'poc',
    title: 'Paid POC',
    body: 'Scope data access, baseline, success metrics, and the next buying step before kickoff.',
  },
  {
    key: 'prod',
    title: 'Production',
    body: 'Stay through the compliance, guardrail, and pipeline-hygiene gaps that stall POCs after the technical win.',
  },
] as const

export const proof = [
  { value: 198, suffix: '+', label: 'Leads generated', note: 'Top-of-funnel volume that fed the system.' },
  { value: 65, suffix: '+', label: 'Demos delivered', note: 'Qualified demos, not calendar fills.' },
  { value: 40, suffix: '+', label: 'Reported conversions', note: 'Leads that moved to a commercial next step.' },
  { value: 20, suffix: '%', prefix: '~', label: 'Lead-to-conversion', note: 'Across Fotos and Prava CRM.' },
]

export const pocLocks = [
  {
    title: 'Business outcome',
    body: 'The revenue, cost, time, or risk improvement everyone agrees matters.',
  },
  {
    title: 'Data scope and access',
    body: 'Agreed before day one, so no one discovers a blocker mid-POC.',
  },
  {
    title: 'Baseline and success metric',
    body: 'Numeric pass criteria your buyer helped define.',
  },
  {
    title: 'Decision path',
    body: 'The buying, security, and procurement steps that happen after success.',
  },
  {
    title: 'Value model your champion can explain',
    body: 'Conservative and upside assumptions separated, so it survives internal scrutiny.',
  },
]

export const stallReasons = [
  "The data scope wasn't settled early enough.",
  'Success criteria stayed fuzzy.',
  "Your champion needed internal cover they didn't get.",
  'Security and procurement entered late.',
]
