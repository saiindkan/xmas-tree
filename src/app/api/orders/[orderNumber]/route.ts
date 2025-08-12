// Code modified by Tharun
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    // Get user session
    const session = await getServerSession(authOptions) as { user?: { email?: string; name?: string } } | null;
    
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
      console.log(`[Orders] Created new OAuth user: ${user.email}`);
    }

    // Get order by order number and user
    const order = await prisma.order.findFirst({
      where: {
        orderNumber: params.orderNumber,
        userId: user.id
      },
      include: {
        orderItems: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('[Orders] Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
