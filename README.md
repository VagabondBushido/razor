# Course Landing Page with Razorpay + WhatsApp

Simple React landing page: user pays for a course via Razorpay, then gets redirected to join a WhatsApp group.

## Setup

1. **Install dependencies** (already done if you cloned this):
   ```bash
   npm install
   ```

2. **Get Razorpay keys** from [Razorpay Dashboard → API Keys](https://dashboard.razorpay.com/app/keys). Use **Test Mode** keys while developing.

3. **Create a `.env` file** from the example:
   ```bash
   cp .env.example .env
   ```

4. **Fill in your `.env`**:
   - `RAZORPAY_KEY_ID` — your Razorpay Key ID (e.g. `rzp_test_...`)
   - `RAZORPAY_KEY_SECRET` — your Razorpay Key Secret
   - `COURSE_AMOUNT` — price in **paise** (99900 = ₹999)
   - `VITE_WHATSAPP_GROUP_LINK` — your WhatsApp group invite link
   - `VITE_COURSE_NAME` — course title shown on the page
   - `VITE_COURSE_PRICE` — price shown on the page (in rupees, for display only)

5. **Run the app**:
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## How it works

1. User lands on `/` and clicks **Pay via UPI & Join Group**
2. Backend creates a Razorpay **Payment Link**
3. User is redirected to Razorpay's hosted page (UPI QR + UPI apps)
4. After payment, Razorpay redirects to `/success`
5. Backend verifies payment, user sees **Join WhatsApp Group** button

## UPI not showing?

UPI must be **enabled on your Razorpay account**:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com) → **Account & Settings** → **Payment Methods**
2. Enable **UPI** (request it if not listed)
3. For real UPI payments, switch to **Live Mode** keys in `.env`

Note: UPI-only payment links require **Live Mode**. Test mode supports UPI via the hosted payment page QR/apps if UPI is enabled on your account.

## Production

- Switch to **Live Mode** keys in Razorpay
- Deploy frontend + backend (e.g. Vercel + Railway, or a single VPS)
- Set environment variables on your host
