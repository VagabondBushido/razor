export const WEBINAR = {
  date: import.meta.env.VITE_WEBINAR_DATE || '[DATE]',
  time: import.meta.env.VITE_WEBINAR_TIME || '[TIME]',
  price: import.meta.env.VITE_COURSE_PRICE || '499',
  name: import.meta.env.VITE_COURSE_NAME || 'Crypto Education Webinar',
}

export const LEARN_ITEMS = [
  'Story and evolution of crypto',
  'Blockchain & how crypto works',
  'How crypto markets work',
  'Why prices move',
  'Spot vs Futures',
  'Market analysis',
  'Risk management',
  'Trading psychology',
  'Scams & security',
  'Building a structured trading approach',
]

export const WHO_ITEMS = [
  'Are beginners wanting to understand crypto',
  'Want to understand why crypto was created/evolved',
  'Want to understand markets and price movement',
  'Already trade without a structured approach',
  'Want to understand spot, futures, margin & leverage',
  'Want market-analysis fundamentals',
  'Want to understand risk before trading',
  'Are tired of tips, hype and FOMO',
  'Want a disciplined trading approach',
]

export const TIMELINE = [
  { step: 1, label: 'Register' },
  { step: 2, label: 'Pay ₹499' },
  { step: 3, label: 'Get Confirmation' },
  { step: 4, label: 'Join WhatsApp Community' },
  { step: 5, label: 'Attend Live Webinar' },
]

export const ABOUT_ITEMS = [
  'Why crypto was created and how it evolved',
  'Blockchain and the crypto ecosystem',
  'Why crypto prices move',
  'Spot and futures trading',
  'Market analysis and risk management',
  'Trading mistakes, scams and emotional decisions',
]

export const FAQ_ITEMS = [
  {
    q: 'Is this suitable for beginners?',
    a: 'Yes. It starts with fundamentals and progresses into markets and trading.',
  },
  {
    q: 'Do I need previous experience?',
    a: 'No. Both beginners and existing traders can attend.',
  },
  {
    q: 'Will you provide trading signals or tell me what to buy?',
    a: 'No. The focus is education, analysis and risk awareness.',
  },
  {
    q: 'Will futures and leverage be explained?',
    a: 'Yes, including how they work and their risks.',
  },
  {
    q: 'Will scams and security be covered?',
    a: 'Yes, including common scams and basic security awareness.',
  },
  {
    q: 'How long is the webinar?',
    a: 'Approximately 2–3 hours.',
  },
  {
    q: 'How will I receive the webinar link?',
    a: 'Joining details and updates will be shared through the official WhatsApp community after registration.',
  },
]
