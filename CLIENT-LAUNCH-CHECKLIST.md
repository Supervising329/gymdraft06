# Client Launch Checklist

Use this file after the trainer supplies their real business details. The customer-facing site is functional with placeholders, but Calendly and Stripe cannot be made live without account URLs from the client.

## 1. Business and local SEO

- Replace `Peak Performance Training`, `Alex Morgan`, `Your City`, `ST`, the address, phone, email, certifications, hours, prices, and social links in every HTML file.
- Replace `https://www.example.com` in `index.html`, `sitemap.xml`, and `robots.txt` with the final HTTPS domain.
- Replace the local service area text and verify every claim before launch.
- Connect the final domain in Vercel, submit `sitemap.xml` in Google Search Console, and use the same name, address, phone, and hours in the client's Google Business Profile.

## 2. Formspree delivery and automatic reply

- Create a Formspree form owned by the client and verify the inbox that should receive leads.
- Replace `https://formspree.io/f/xjgnoold` near the top of `script.js` and in `contact.html`.
- In Formspree, open the form's Workflow and add an Autoresponse action.
- Suggested subject: `Your consultation request is in`
- Suggested message: `Thanks for contacting Peak Performance Training. We received your consultation request and will confirm the appointment details shortly. If your request is urgent, call (555) 014-8820.`
- Submit one real test and confirm both the business notification and visitor reply arrive.

## 3. Live Calendly scheduling

- Create a free 20-minute consultation event and connect the trainer's real calendar.
- Add availability, buffers, minimum notice, meeting method, and confirmation reminders in Calendly.
- Replace `https://calendly.com/REPLACE_WITH_YOUR_CALENDAR_LINK` near the top of `script.js`.
- Test desktop and mobile booking. The existing drawer will automatically switch from requested times to live Calendly openings.

## 4. Stripe payments

- Create recurring products named Starter, Transformation, and Elite Coaching in Stripe.
- Create one Payment Link for each product and first test with Stripe test-mode links.
- Replace the three Stripe placeholders near the top of `script.js`.
- Set each Payment Link to redirect after payment to `https://YOUR-DOMAIN.com/payment-success.html`.
- Never put Stripe secret keys in this repository.

## 5. Vercel analytics and conversion funnel

- In Vercel, enable Web Analytics and Speed Insights, then redeploy.
- Check page views and paths on any supported plan.
- If the Vercel plan supports custom events, review: `plan_quiz_started`, `plan_quiz_completed`, `pricing_plan_selected`, `consultation_drawer_opened`, `consultation_date_selected`, `consultation_slot_selected`, `consultation_details_reached`, `consultation_submitted`, `consultation_scheduled`, `stripe_checkout_started`, `payment_completed_return`, and `phone_clicked`.
- Compare Vercel's counts with Formspree submissions, Calendly scheduled events, and Stripe successful payments. Those three services are the authoritative records.

## 6. Final test

- Test every navigation item, phone link, quiz answer, plan button, booking flow, form submission, payment link, success return, and legal page.
- Check the site at 390px, 768px, and desktop widths.
- Confirm no placeholder business claims remain and no private account keys were committed.
