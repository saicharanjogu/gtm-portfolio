export const profile = {
  name: 'Sai Charan Jogu',
  role: 'Product & GTM',
  focus: 'I build signal-based outbound systems that book high-intent demos.',
  email: 'saicharanjogu0@gmail.com',
  // Add your LinkedIn URL here to show the LinkedIn button.
  linkedin: '',
  whatsapp: '919398171029',
  whatsappDisplay: '+91 93981 71029',
}

export const whatsappLink = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  "Hi Sai, I'd like to talk about signal-based outbound for us. Our ICP and demo target:",
)}`

// Real counts from the Fotos and Prava CRMs. Rates are derived, not invented.
export const proof = {
  leads: 198,
  demos: 65,
  conversions: 40,
  leadToDemo: Math.round((65 / 198) * 100), // 33
  demoToConversion: Math.round((40 / 65) * 100), // 62
  leadToConversion: Math.round((40 / 198) * 100), // 20
}

// Where I work in the stack. Fotos and Prava are the CRMs I ran in production; the rest are the
// building blocks of the system. Swap in tool brands with honest levels when you want to name them.
export const stack = [
  { name: 'Buying signals', role: 'Who is in-market' },
  { name: 'Enrichment', role: 'Account and contact data' },
  { name: 'ICP scoring', role: 'Who to work first' },
  { name: 'Outbound sequences', role: 'Signal-based plays' },
  { name: 'Booking links', role: 'High-intent bookings' },
  { name: 'ROI models', role: 'Value engineering' },
  { name: 'Fotos CRM', role: 'CRM, run end to end' },
  { name: 'Prava CRM', role: 'CRM, run end to end' },
]

export const caseFiles = [
  {
    title: 'Signal-based outbound engine',
    body: 'Outbound aimed at accounts showing buying intent and qualified against ICP before a rep spent time on them, so booked meetings came from buyers already in-market rather than a volume list.',
    stats: [
      { value: '198 → 65', label: 'leads to held demos' },
      { value: `${proof.leadToDemo}%`, label: 'lead-to-demo rate' },
    ],
  },
  {
    title: 'High-intent demos with value engineering',
    body: 'Demos that test buyer-agreed success criteria instead of touring features, backed by an ROI case in the language the champion has to defend: productivity, revenue, quality and risk.',
    stats: [
      { value: `${proof.conversions}+`, label: 'reported conversions' },
      { value: `${proof.demoToConversion}%`, label: 'demo-to-conversion rate' },
    ],
  },
  {
    title: 'Signal-to-revenue tracking in two CRMs',
    body: 'Ran the system end to end across Fotos and Prava CRM, from first signal to commercial next step, and kept the records clean enough that every number on this page can be trusted.',
    stats: [
      { value: '2', label: 'CRMs run end to end' },
      { value: `~${proof.leadToConversion}%`, label: 'lead-to-conversion' },
    ],
  },
]

export const pocLocks = [
  { title: 'Business outcome', body: 'The revenue, cost, time or risk win everyone agrees on.' },
  { title: 'Data scope', body: 'Access agreed before day one, so nothing blocks mid-POC.' },
  { title: 'Success metric', body: 'Numeric pass criteria the buyer helped define.' },
  { title: 'Decision path', body: 'Security and procurement mapped before kickoff.' },
  { title: 'Champion-ready ROI', body: 'Conservative and upside cases, kept separate.' },
]
