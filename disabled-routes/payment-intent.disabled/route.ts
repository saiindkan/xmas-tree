import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { amount, currency = 'usd' } = await request.json();
    
    if (!amount || isNaN(amount)) {
      return new NextResponse('Invalid amount', { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: currency.toLowerCase(),
      metadata: {
        userId: session.user.email,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
