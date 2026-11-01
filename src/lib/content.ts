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
  "Hi Sai, I'd like someone to own our demos per month, from lead gen to the demo. Can we talk?",
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

export const pocLocks = [
  { title: 'Business outcome', body: 'The revenue, cost, time or risk win everyone agrees on.' },
  { title: 'Data scope', body: 'Access agreed before day one, so nothing blocks mid-POC.' },
  { title: 'Success metric', body: 'Numeric pass criteria the buyer helped define.' },
  { title: 'Decision path', body: 'Security and procurement steps mapped before kickoff.' },
  { title: 'Champion-ready ROI', body: 'Conservative and upside cases, kept separate.' },
]
