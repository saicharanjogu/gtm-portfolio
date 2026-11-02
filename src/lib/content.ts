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

// The tools I build with, in the same set and categories as the Quota GTM template.
export const stack = [
  { name: 'Clay', role: 'Enrichment' },
  { name: 'HubSpot', role: 'CRM' },
  { name: 'Salesforce', role: 'CRM' },
  { name: 'n8n', role: 'Automation' },
  { name: 'Slack', role: 'Alerts and routing' },
  { name: 'Claude', role: 'AI research' },
  { name: 'OpenAI', role: 'Personalisation' },
  { name: 'Snowflake', role: 'Warehouse' },
]

// Products I took to market, framed by the B2B motion each one proves for startups and enterprise teams.
// Product descriptions stay true to what each product does. The 198 / 65 / 40 record comes from PRAVA CRM
// and Fotos; BookMore is in beta, so its card states facts about the product, not results.
export type ProductMarkKind = 'prava' | 'fotos' | 'bookmore'
export const products: { mark: ProductMarkKind; name: string; url: string; host: string; what: string }[] = [
  { mark: 'prava', name: 'PRAVA CRM', url: 'https://pravacrm.com/', host: 'pravacrm.com', what: 'CRM that feeds real conversions back to Meta' },
  { mark: 'fotos', name: 'Fotos', url: 'https://fotosm.neorun.in/', host: 'fotosm.neorun.in', what: 'Wireless tethering software' },
  { mark: 'bookmore', name: 'BookMore', url: 'https://bookmore.neorun.in/', host: 'bookmore.neorun.in', what: 'AI lead nurturing on Instagram and WhatsApp' },
]

export const caseFiles = [
  {
    product: products[0],
    title: 'Closed-loop conversion signals',
    body: 'PRAVA CRM sends real conversions back to Meta, so ads optimise for customers instead of raw enquiries. I took it to market with signal-based outbound and demos built around that loop, with every lead qualified against ICP before a call was spent on it.',
    applies: 'wire CRM outcomes back into your ads and outbound, so spend chases revenue, not form fills.',
    stats: [
      { value: '198 → 65', label: 'leads to demos, Prava + Fotos' },
      { value: `${proof.leadToDemo}%`, label: 'lead-to-demo rate' },
    ],
  },
  {
    product: products[1],
    title: 'Product-led demos that sell the outcome',
    body: 'Fotos replaces a fragile hardware cable with instant wireless file transfer. Demos proved exactly that against each buyer’s own success criteria, with the value case in their terms (no downtime, no repair costs), and ended on a defined next step.',
    applies: 'demos that test the buyer’s success criteria and carry an ROI case the champion can defend internally.',
    stats: [
      { value: `${proof.conversions}+`, label: 'conversions, Prava + Fotos' },
      { value: `${proof.demoToConversion}%`, label: 'demo-to-conversion rate' },
    ],
  },
  {
    product: products[2],
    title: 'AI speed-to-lead on Instagram and WhatsApp',
    body: 'BookMore’s AI answers inbound DMs within minutes, qualifies intent and moves prospects to a booking. It is the same signal-first idea, applied to inbound.',
    applies: 'route and qualify inbound in minutes, not hours, before the lead goes cold.',
    stats: [
      { value: 'IG + WA', label: 'Instagram and WhatsApp DMs' },
      { value: 'Beta', label: 'live, invite-only' },
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
