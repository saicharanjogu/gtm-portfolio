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

// Wedding-tech products I took to market. The 198 / 65 / 40 record comes from PRAVA CRM and Fotos;
// BookMore is in beta, so its card states facts about the product, not results.
export type ProductMarkKind = 'prava' | 'fotos' | 'bookmore'
export const products: { mark: ProductMarkKind; name: string; url: string; host: string; what: string }[] = [
  { mark: 'prava', name: 'PRAVA CRM', url: 'https://pravacrm.com/', host: 'pravacrm.com', what: 'CRM for wedding photographers' },
  { mark: 'fotos', name: 'Fotos', url: 'https://fotosm.neorun.in/', host: 'fotosm.neorun.in', what: 'Wireless tethering for studios' },
  { mark: 'bookmore', name: 'BookMore', url: 'https://bookmore.neorun.in/', host: 'bookmore.neorun.in', what: 'AI DM nurturing for studios' },
]

export const caseFiles = [
  {
    product: products[0],
    title: 'Closed-loop outbound for a wedding-photographer CRM',
    body: 'PRAVA sends booked weddings back to Meta, so ads learn from bookings instead of enquiries. I took that story to studios with signal-based outbound and demos built around the loop, qualified against ICP before anyone spent a call on them.',
    stats: [
      { value: '198 → 65', label: 'leads to demos, Prava + Fotos' },
      { value: `${proof.leadToDemo}%`, label: 'lead-to-demo rate' },
    ],
  },
  {
    product: products[1],
    title: 'Product-led demos for wireless studio tethering',
    body: 'Fotos replaces the tether cable with instant wireless RAW transfer. Demos proved exactly that against each studio’s own success criteria, with the value case in their terms (no downtime, no port repairs), and ended on a defined next step.',
    stats: [
      { value: `${proof.conversions}+`, label: 'conversions, Prava + Fotos' },
      { value: `${proof.demoToConversion}%`, label: 'demo-to-conversion rate' },
    ],
  },
  {
    product: products[2],
    title: 'Speed-to-lead for Instagram and WhatsApp DMs',
    body: 'BookMore’s AI answers studio DMs, qualifies intent and moves couples to a booking. It is the same signal-first idea applied to inbound: respond in the first minutes, qualify, then book.',
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
