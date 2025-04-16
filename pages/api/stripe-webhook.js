import { buffer } from 'micro';
import Stripe from 'stripe';
import supabase from '../../supabaseClient'; // Import Supabase client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
      console.log('✅ Webhook event received:', event.type);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Checkout session completed:', session);

      const email = session.customer_details.email;

      // Update is_subscribed field in Supabase
      const { data, error } = await supabase
        .from('users')
        .update({ is_subscribed: true })
        .eq('email', email);

      if (error) {
        console.error('❌ Error updating is_subscribed:', error.message);
        return res.status(400).send(`Subscription update error: ${error.message}`);
      }

      console.log('✅ is_subscribed updated for user:', data);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
