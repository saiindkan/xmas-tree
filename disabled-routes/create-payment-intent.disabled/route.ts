import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Type for cart items coming from the client
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    // Check if Stripe secret key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe configuration not available' },
        { status: 500 }
      );
    }

    // Initialize Stripe with the project's required API version
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    });

    const { items } = (await request.json()) as { items: CartItem[] };
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }
    
    // Calculate the total amount from cart items (in cents)
    const total = items.reduce((acc: number, item: CartItem) => {
      return acc + Math.round(item.price * 100 * item.quantity);
    }, 0);

    // Validate the total amount
    if (total < 50) { // Minimum amount is $0.50
      return NextResponse.json(
        { error: 'The order total is too low' },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        })))
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Failed to create payment intent');
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || 'Error creating payment intent' },
      { status: 500 }
    );
  }
}
