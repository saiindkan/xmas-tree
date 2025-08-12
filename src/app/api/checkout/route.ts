import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    const { billingInfo, cart, subtotal, shipping, tax, total } = body;

    if (!billingInfo || !cart || cart.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = `XTS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: userId,
        first_name: billingInfo.firstName,
        last_name: billingInfo.lastName,
        email: billingInfo.email,
        phone: billingInfo.phone,
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        zip_code: billingInfo.zipCode,
        country: billingInfo.country || 'United States',
        subtotal: parseFloat(subtotal.toString()),
        shipping: parseFloat(shipping.toString()),
        tax: parseFloat(tax.toString()),
        total: parseFloat(total.toString()),
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    const orderItems = cart.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_img: item.img,
      price: parseFloat(item.price.toString()),
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);
    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'processing', payment_status: 'paid' })
      .eq('id', order.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating order status:', updateError);
      throw updateError;
    }

    console.log(`[Checkout] Order created successfully: ${orderNumber}`);

    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.order_number,
        total: updatedOrder.total,
        status: updatedOrder.status,
        paymentStatus: updatedOrder.payment_status,
        createdAt: updatedOrder.created_at,
      },
    });
  } catch (error) {
    console.error('[Checkout] Error processing order:', error);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    const userId = session.user.id;

    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      throw ordersError;
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('[Checkout] Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
