const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_GROUP_LINK || '#'

export default function Success() {
  return (
    <div className="page page--dark">
      <div className="success-card">
        <div className="checkmark">✓</div>
        <h1 className="section-title">Registration Confirmed!</h1>
        <p className="section-text">
          Welcome aboard. Join the WhatsApp community for webinar updates and joining details.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          Join WhatsApp Community
        </a>
        <p className="note">Save this link to access updates anytime.</p>
      </div>
    </div>
  )
}
