// Code modified by Tharun
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user from database or create if OAuth user doesn't exist
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      // Create user for OAuth users who don't exist in database yet
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'OAuth User',
          password: '' // OAuth users don't have passwords
        }
      });
      console.log(`[Checkout] Created new OAuth user: ${user.email}`);
    }

    // Parse request body
    const body = await request.json();
    const {
      billingInfo,
      paymentInfo,
      cart,
      subtotal,
      shipping,
      tax,
      total
    } = body;

    // Validate required fields
    if (!billingInfo || !cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const orderNumber = `XTS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        
        // Billing Information
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        email: billingInfo.email,
        phone: billingInfo.phone,
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        zipCode: billingInfo.zipCode,
        country: billingInfo.country || 'United States',
        
        // Order Totals
        subtotal: parseFloat(subtotal.toString()),
        shipping: parseFloat(shipping.toString()),
        tax: parseFloat(tax.toString()),
        total: parseFloat(total.toString()),
        
        // Order Status
        status: 'pending',
        paymentStatus: 'pending',
        
        // Order Items
        orderItems: {
          create: cart.map((item: any) => ({
            productId: item.id,
            productName: item.name,
            productImg: item.img,
            price: parseFloat(item.price.toString()),
            quantity: item.quantity
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    // In a real application, you would process payment here
    // For demo purposes, we'll mark as paid immediately
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'processing',
        paymentStatus: 'paid'
      }
    });

    console.log(`[Checkout] Order created successfully: ${orderNumber}`);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error('[Checkout] Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user's orders
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user from database or create if OAuth user doesn't exist
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      // Create user for OAuth users who don't exist in database yet
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'OAuth User',
          password: '' // OAuth users don't have passwords
        }
      });
      console.log(`[Checkout] Created new OAuth user: ${user.email}`);
    }

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        orderItems: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('[Checkout] Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
