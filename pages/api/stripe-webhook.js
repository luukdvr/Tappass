import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '../../lib/stripe'; // Ensure this path is correct

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

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
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const email = session.customer_details.email;

      // Create a new user in Supabase
      const { user, error } = await supabase.auth.admin.createUser({
        email: email,
        password: 'temporaryPassword', // You can generate a random password here
        email_confirm: false,
      });

      if (error) {
        console.error('Error creating user:', error.message);
        return res.status(400).send(`User creation error: ${error.message}`);
      }

      // Send an email with a link to create an account
      const { error: emailError } = await supabase.auth.api.sendMagicLinkEmail(email, {
        redirectTo: `http://tappass.vercel.app/create-account?user_id=${user.id}`, // Update this URL to match your domain
      });

      if (emailError) {
        console.error('Error sending email:', emailError.message);
        return res.status(400).send(`Email sending error: ${emailError.message}`);
      }

      console.log(`Successfully created new user: ${user.id}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
