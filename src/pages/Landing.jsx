import { useNavigate } from 'react-router-dom'
import CtaButton from '../components/CtaButton'
import FaqAccordion from '../components/FaqAccordion'
import {
  WEBINAR,
  LEARN_ITEMS,
  WHO_ITEMS,
  TIMELINE,
  ABOUT_ITEMS,
  FAQ_ITEMS,
} from '../config/webinar'
import { usePayment } from '../hooks/usePayment'

function MetaRow() {
  return (
    <div className="meta-row">
      <span>📅 {WEBINAR.date}</span>
      <span>🕒 {WEBINAR.time}</span>
      <span>💻 Live Online</span>
      <span>⏱️ 2–3 Hours</span>
    </div>
  )
}

function PriceTag({ size = 'md' }) {
  return (
    <div className={`price-tag price-tag--${size}`}>
      <span className="price-tag__currency">₹</span>
      <span className="price-tag__amount">{WEBINAR.price}</span>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { loading, error, handlePayment } = usePayment(() => navigate('/success'))

  return (
    <div className="landing">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--1" aria-hidden="true" />
      <div className="bg-glow bg-glow--2" aria-hidden="true" />

      {/* Hero */}
      <header className="section hero">
        <div className="container hero__inner">
          <p className="eyebrow">Live Online Crypto Education Webinar</p>
          <h1 className="hero__title">
            Understand Crypto<br />
            <span className="gradient-text">Before You Trade.</span>
          </h1>
          <p className="hero__desc">
            A live 2–3 hour webinar covering how crypto works, how markets and prices move,
            trading concepts, analysis, risk management, psychology, scams, and security.
          </p>
          <MetaRow />
          <PriceTag size="lg" />
          <CtaButton onClick={handlePayment} loading={loading}>
            Register Now →
          </CtaButton>
          {error && <p className="error">{error}</p>}
        </div>
      </header>

      {/* Problem */}
      <section className="section">
        <div className="container container--narrow">
          <p className="section-label">The Problem</p>
          <h2 className="section-title">
            Trading Without Understanding Can Be Expensive.
          </h2>
          <p className="section-text">
            People enter crypto because of tips, influencers, market hype, FOMO, or leverage.
            Without understanding the market, trading becomes guesswork.
          </p>
          <p className="highlight-line">
            Understand the market before risking your money.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section section--alt">
        <div className="container">
          <p className="section-label">What You&apos;ll Learn</p>
          <h2 className="section-title">A Structured Path to Understanding</h2>
          <ul className="learn-grid">
            {LEARN_ITEMS.map((item) => (
              <li key={item} className="learn-card">
                <span className="learn-card__icon" aria-hidden="true">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section">
        <div className="container">
          <p className="section-label">Who It&apos;s For</p>
          <h2 className="section-title">Built for Curious, Serious Learners</h2>
          <div className="who-grid">
            {WHO_ITEMS.map((item) => (
              <div key={item} className="who-card">
                <span className="who-card__check" aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="section-label">What Makes This Different</p>
          <div className="diff-block">
            <p className="diff-block__line">We don&apos;t tell you what to buy.</p>
            <p className="diff-block__emphasis">
              We teach you how to understand crypto before you trade.
            </p>
          </div>
          <p className="section-text">
            Focus areas: crypto history, blockchain, markets, trading, analysis, risk,
            psychology, scams, security.
          </p>
          <ul className="no-list">
            <li>No guaranteed profits.</li>
            <li>No &ldquo;100X coin&rdquo; promises.</li>
            <li>No blind trading calls.</li>
          </ul>
        </div>
      </section>

      {/* After Registration */}
      <section className="section">
        <div className="container">
          <p className="section-label">After Registration</p>
          <h2 className="section-title">Your Path to the Live Session</h2>
          <ol className="timeline">
            {TIMELINE.map((item, i) => (
              <li key={item.step} className="timeline__item">
                <div className="timeline__dot">{item.step}</div>
                <p className="timeline__label">{item.label}</p>
                {i < TIMELINE.length - 1 && (
                  <div className="timeline__connector" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section className="section section--alt">
        <div className="container">
          <p className="section-label">About the Webinar</p>
          <h2 className="section-title">More Than Just a Trading Webinar.</h2>
          <p className="section-text">
            The session first builds an understanding of crypto, blockchain and markets
            before moving into trading concepts.
          </p>
          <ul className="about-list">
            {ABOUT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="goal-banner">
            The goal is simple: <strong>Understand crypto before you trade.</strong>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container container--narrow">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta">
        <div className="container container--narrow final-cta__inner">
          <p className="final-cta__eyebrow">Don&apos;t follow the hype.</p>
          <h2 className="final-cta__title">
            Understand Crypto<br />
            <span className="gradient-text">Before You Trade.</span>
          </h2>
          <p className="section-text">
            Live online session covering crypto, technology, markets, trading, risks and psychology.
          </p>
          <div className="meta-row meta-row--center">
            <span>📅 {WEBINAR.date}</span>
            <span>🕒 {WEBINAR.time}</span>
            <span>💻 Live Online Webinar</span>
            <span>⏱️ 2–3 Hours</span>
          </div>
          <PriceTag size="lg" />
          <CtaButton onClick={handlePayment} loading={loading}>
            Secure My Seat — ₹{WEBINAR.price}
          </CtaButton>
          {error && <p className="error">{error}</p>}
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="disclaimer">
        <div className="container container--narrow">
          <p>
            This webinar is strictly educational and informational. It does not provide
            investment, financial, legal or tax advice. No specific cryptocurrency, trade or
            investment recommendation is provided. Crypto and digital assets involve significant
            risk, including potential loss of capital. Participants should conduct their own
            research and make decisions based on their circumstances. No profits or returns are
            guaranteed.
          </p>
        </div>
      </footer>
    </div>
  )
}
