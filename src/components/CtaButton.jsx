export default function CtaButton({ onClick, loading, children, variant = 'primary' }) {
  return (
    <button
      className={`cta-btn cta-btn--${variant}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Redirecting…' : children}
    </button>
  )
}
