import { useState, useCallback } from 'react'

const COURSE_NAME = import.meta.env.VITE_COURSE_NAME || 'Crypto Education Webinar'

async function parseJsonResponse(res) {
  const text = await res.text()
  if (!text) {
    throw new Error(
      'Backend server is not running. Stop the app and run: npm run dev'
    )
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Invalid server response. Check the terminal for errors.')
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function getCheckoutConfig(testMode) {
  if (testMode) {
    // Test mode: QR/intent don't work — only UPI ID (collect) with success@razorpay
    return {
      display: {
        hide: [{ method: 'upi', flows: ['qr', 'intent'] }],
        blocks: {
          upi_id: {
            name: 'Enter UPI ID to pay',
            instruments: [{ method: 'upi', flows: ['collect'] }],
          },
        },
        sequence: ['block.upi_id'],
        preferences: { show_default_blocks: false },
      },
    }
  }

  // Live mode: QR + UPI apps work with real payments
  return {
    display: {
      sequence: ['upi'],
      preferences: { show_default_blocks: true },
    },
  }
}

export function usePayment(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = useCallback(async () => {
    setLoading(true)
    setError('')

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setError('Failed to load payment gateway. Please refresh and try again.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/create-order', { method: 'POST' })
      const data = await parseJsonResponse(res)

      if (!res.ok) {
        throw new Error(data.error || 'Could not start payment')
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: COURSE_NAME,
        description: 'Webinar registration',
        order_id: data.orderId,
        config: getCheckoutConfig(data.testMode),
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })
            const verifyData = await parseJsonResponse(verifyRes)

            if (verifyRes.ok && verifyData.success) {
              onSuccess?.()
            } else {
              setError('Payment verification failed. Contact support with your payment ID.')
            }
          } catch {
            setError('Payment verification failed. Contact support.')
          } finally {
            setLoading(false)
          }
        },
        theme: { color: '#00e5c3' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        setError('Payment failed. Please try again.')
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }, [onSuccess])

  return { loading, error, handlePayment }
}
