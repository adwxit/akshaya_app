import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    console.log('Health check: Attempting MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Check if products exist
    const productCount = await Product.countDocuments();
    console.log('Product count:', productCount);
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'MongoDB connected successfully',
      mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      productCount: productCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
        error: error
      },
      { status: 500 }
    );
  }
}
