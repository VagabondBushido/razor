import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/create-order', async (_req, res) => {
  try {
    const razorpay = getRazorpay()
    if (!razorpay) {
      return res.status(500).json({
        error: 'Razorpay keys not configured. Copy .env.example to .env and add your keys.',
      })
    }

    const amount = Number(process.env.COURSE_AMOUNT || 49900)

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `webinar_${Date.now()}`,
    })

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error('Create order error:', err)
    const msg =
      err?.statusCode === 401
        ? 'Invalid Razorpay keys. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env'
        : err?.error?.description || 'Failed to create order'
    res.status(500).json({ error: msg })
  }
})

app.post('/api/verify-payment', (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      return res.status(500).json({ error: 'Razorpay keys not configured' })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' })
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Verify payment error:', err)
    res.status(500).json({ error: 'Payment verification failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
