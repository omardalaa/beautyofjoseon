# Beauty of Joseon - Deployment Quick Start

**Status:** ✅ Ready for Production Deployment  
**Target Date:** 2026-08-14  
**Domain:** beautyofjoseon.me  
**Region:** UAE  

## Prerequisites

- [ ] GitHub account created
- [ ] Vercel account created (free tier sufficient)
- [ ] Stripe account (test mode ready)
- [ ] Domain beautyofjoseon.me owned/registered
- [ ] Node.js 18+ installed locally

## Step 1: Push to GitHub (5 minutes)

```bash
# Initialize repository if not done
git init
git add .
git commit -m "Initial commit: Beauty of Joseon ecommerce"

# Create repo on github.com/new
# Then:
git remote add origin https://github.com/YOUR_USERNAME/beautyofjoseon.git
git branch -M main
git push -u origin main
```

**Verify:** Check that repo appears on GitHub with all files

## Step 2: Connect to Vercel (5 minutes)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Search for your beautyofjoseon repository
5. Click "Import"
6. Leave framework detection as automatic
7. Click "Deploy"

**Verify:** Wait for build to complete (should take ~2-3 minutes)

## Step 3: Configure Environment Variables (5 minutes)

1. In Vercel project, go to Settings → Environment Variables
2. Add these variables (from your Stripe account):

```
STRIPE_SECRET_KEY = sk_test_xxxxx (from Stripe Dashboard)
STRIPE_PUBLIC_KEY = pk_test_xxxxx (from Stripe Dashboard)
```

3. Make sure both "Production" and "Preview" are checked
4. Click "Save"

**Verify:** Re-deploy after adding variables

## Step 4: Get Stripe API Keys (5 minutes)

1. Go to https://dashboard.stripe.com
2. Navigate to Developers → API Keys
3. Copy "Secret key" (starts with sk_test_)
4. Copy "Publishable key" (starts with pk_test_)
5. Paste into Vercel environment variables (Step 3 above)

**Verify:** Test card: 4242 4242 4242 4242 (any future date, any CVC)

## Step 5: Configure Custom Domain (10 minutes)

1. In Vercel project, go to Settings → Domains
2. Add domain: beautyofjoseon.me
3. Vercel will show DNS records to add:
   - Type: CNAME
   - Name: @ (or leave blank)
   - Value: cname.vercel.com
4. Add these records to your domain registrar (Namecheap, GoDaddy, etc.)
5. Wait for DNS to propagate (usually 5-30 minutes)

**Verify:** Visit https://beautyofjoseon.me in browser

## Step 6: Test Checkout Flow (10 minutes)

1. Visit https://beautyofjoseon.me (or staging URL)
2. Click "Shop Now"
3. Add a product to cart
4. Click "Proceed to Checkout"
5. Use test card: 4242 4242 4242 4242
6. Enter any future date for expiry
7. Enter any 3 digits for CVC
8. Click "Pay"

**Verify:** Success page appears after payment

## Step 7: Database Setup

> **Note:** Currently using sample products. To add 35 products from Noon.com:

Option A: Manual (quick start)
- Edit `app/src/routes/shop.tsx`
- Replace PRODUCTS array with 35 products
- Add images to `app/public/products/`
- Redeploy

Option B: D1 Database (recommended)
- See DEPLOYMENT.md for full D1 setup
- Create database on Vercel
- Populate with Noon.com products
- Update database queries in shop.tsx

**For now:** Use Option A to launch quickly

## Step 8: Verify PageSpeed Score

1. Go to https://pagespeed.web.dev/
2. Enter: https://beautyofjoseon.me
3. Check Mobile score (target: 90+, goal: 100)
4. Check Desktop score

**If score < 90:**
- See PAGESPEED_OPTIMIZATION.md
- Optimize images (WebP, <100KB)
- Compress static assets
- Enable caching headers (already in vercel.json)

## Step 9: Enable SSL Certificate

Vercel auto-provisions SSL for beautyofjoseon.me. Verify:

1. Visit https://beautyofjoseon.me
2. Click lock icon in browser
3. Check certificate is valid
4. Should show "Verified by Vercel"

**Verify:** No SSL warnings or errors

## Step 10: Webhook Setup (Stripe Order Confirmations)

1. In Stripe Dashboard, go to Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: https://beautyofjoseon.me/api/webhook
4. Events to send: payment_intent.succeeded
5. Click "Add endpoint"
6. Copy "Signing secret"
7. Add to Vercel environment as: STRIPE_WEBHOOK_SECRET

**Verify:** Orders appear in database after payment

## Production Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Environment variables set
- [ ] Custom domain working (beautyofjoseon.me)
- [ ] SSL certificate active
- [ ] Test payment processed
- [ ] Success page displays
- [ ] PageSpeed score verified
- [ ] Webhook configured
- [ ] Database populated with products

## Rollback Plan

If issues occur:

```bash
# Revert to previous version
git revert HEAD
git push

# Vercel auto-redeploys on push
# Monitor deployment logs
```

Or in Vercel:
- Settings → Deployments
- Find previous working deployment
- Click "Promote to Production"

## Support & Troubleshooting

**Build Fails:**
- Check Vercel deployment logs
- Verify all environment variables set
- Run `npm install` locally and test

**Checkout Not Working:**
- Verify STRIPE_PUBLIC_KEY is set
- Check browser console for errors
- Test with Stripe test card

**Images Not Showing:**
- Verify image paths in shop.tsx
- Check public/ directory for images
- Ensure images are WebP format

**PageSpeed Low:**
- Compress images to <100KB
- Convert to WebP format
- Enable gzip compression
- See PAGESPEED_OPTIMIZATION.md

## Next Steps After Launch

1. Monitor performance for 24 hours
2. Test customer checkout flow
3. Verify email confirmations
4. Check analytics tracking
5. Collect feedback
6. Fix any issues
7. Prepare for scaling

---

**Estimated Total Time:** 1-2 hours  
**Difficulty:** Medium  
**Support:** See DEPLOYMENT.md for detailed setup
