import { useEffect, useState } from 'react'

export default function TestPaymentBanner() {
  const [testMode, setTestMode] = useState(false)

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((d) => setTestMode(Boolean(d.testMode)))
      .catch(() => {})
  }, [])

  if (!testMode) return null

  return (
    <div className="test-banner" role="alert">
      <p className="test-banner__title">⚠ Test mode — do not scan the QR code</p>
      <p className="test-banner__text">
        QR payments cannot work in Razorpay test mode. Real UPI apps (GPay, PhonePe)
        cannot process test QR codes. Use this instead:
      </p>
      <ol className="test-banner__steps">
        <li>Click Register → enter mobile number → Continue</li>
        <li>Tap <strong>Enter UPI ID to pay</strong></li>
        <li>Type <code>success@razorpay</code> → Pay</li>
      </ol>
      <p className="test-banner__note">
        QR scan only works in <strong>Live Mode</strong> with real ₹ payments after KYC.
      </p>
    </div>
  )
}
