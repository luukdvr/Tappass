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
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log("Stripe session data:", session);

      // Ensure client_reference_id is present
      if (!session.client_reference_id) {
        console.error("Missing client_reference_id in session.");
        return res.status(400).send("Missing client_reference_id.");
      }

      // Update the user's subscription status in Supabase
      const { error } = await supabase
        .from('users')
        .update({ is_subscribed: true })
        .eq('id', session.client_reference_id);

      if (error) {
        console.error("Error updating user subscription status:", error.message);
        return res.status(400).send(`Supabase Error: ${error.message}`);
      }

      console.log(`User ${session.client_reference_id} subscription updated successfully.`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
