import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.method === 'POST') {
    console.log(request.body);
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1LQZZjGXj9X5ccsSgTIXVQcX' }],
        line_items: request.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/bnnl5ddp/production/'
            )
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${request.headers.origin}/success`,
        cancel_url: `${request.headers.origin}/?canceled=true`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      response.status(200).json(session);
    } catch (err) {
      response.status(err.statusCode || 500).json(err.message);
    }
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method Not Allowed');
  }
}
