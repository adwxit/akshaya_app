import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected');

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    interface QueryFilter {
      category?: string;
      $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
    }
    const query: QueryFilter = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('Fetching products with query:', query);
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    console.log('Found products:', products.length);

    interface MongoProduct {
      _id: { toString(): string };
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
      inStock: boolean;
      createdAt: Date;
      updatedAt: Date;
    }

    // Convert MongoDB documents to plain objects with string IDs
    const formattedProducts = (products as MongoProduct[]).map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
