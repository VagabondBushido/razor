import { useState } from 'react'

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={item.q} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div className="faq-answer">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}
