import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    const body = await request.json();
    const {
      items,
      totalAmount,
      shippingAmount,
      paymentMethod,
      address,
      transactionId,
    } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }

    if (!address || !address.fullName || !address.phone || !address.addressLine1) {
      return NextResponse.json(
        { error: 'Complete address is required' },
        { status: 400 }
      );
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Create order with items
    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(decoded.userId),
      totalAmount,
      shippingAmount,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      transactionId: transactionId || undefined,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || undefined,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country || 'India',
      items: items.map((item: any) => ({
        productId: new mongoose.Types.ObjectId(item.id),
        quantity: item.quantity,
        price: item.price,
      })),
    });

    // Populate product details for response
    await order.populate({
      path: 'items.productId',
      model: 'Product',
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: {
          id: order._id.toString(),
          userId: order.userId.toString(),
          totalAmount: order.totalAmount,
          shippingAmount: order.shippingAmount,
          status: order.status,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          transactionId: order.transactionId,
          fullName: order.fullName,
          phone: order.phone,
          addressLine1: order.addressLine1,
          addressLine2: order.addressLine2,
          city: order.city,
          state: order.state,
          pincode: order.pincode,
          country: order.country,
          items: order.items.map((item: any) => ({
            id: item._id?.toString(),
            productId: item.productId._id?.toString() || item.productId.toString(),
            product: item.productId?.name ? {
              id: item.productId._id.toString(),
              name: item.productId.name,
              description: item.productId.description,
              price: item.productId.price,
              image: item.productId.image,
              category: item.productId.category,
            } : null,
            quantity: item.quantity,
            price: item.price,
          })),
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(decoded.userId),
    })
      .populate({
        path: 'items.productId',
        model: 'Product',
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order: any) => ({
      id: order._id.toString(),
      userId: order.userId.toString(),
      totalAmount: order.totalAmount,
      shippingAmount: order.shippingAmount,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transactionId: order.transactionId,
      fullName: order.fullName,
      phone: order.phone,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
      country: order.country,
      items: order.items.map((item: any) => ({
        id: item._id?.toString(),
        productId: item.productId?._id?.toString() || item.productId?.toString(),
        product: item.productId?.name ? {
          id: item.productId._id.toString(),
          name: item.productId.name,
          description: item.productId.description,
          price: item.productId.price,
          image: item.productId.image,
          category: item.productId.category,
        } : null,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
