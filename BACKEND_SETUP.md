# Backend API Setup Guide

## Overview

The application now uses a real backend API with:
- **Database**: SQLite (using Prisma ORM)
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Routes**: Next.js API routes for authentication, products, and orders

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `akshaya-app` directory (if not already present):

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# API URL (for production, set this to your API URL)
NEXT_PUBLIC_API_URL="/api"
```

### 2. Database Setup

Run the following commands to set up the database:

```bash
# Push the schema to create the database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed the database with products
npm run db:seed
```

If seeding fails, you can manually create products through the API or use Prisma Studio:

```bash
npm run db:studio
```

### 3. Start the Development Server

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login and get JWT token
  - Body: `{ email, password }`
  - Returns: `{ user, token }`
  
- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Products

- `GET /api/products` - Get all products
  - Query params: `?category=lab-equipment&search=balance`
  
- `GET /api/products/[id]` - Get a specific product

### Orders

- `POST /api/orders` - Create a new order (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ items, totalAmount, shippingAmount, paymentMethod, address }`
  
- `GET /api/orders` - Get user's orders (requires authentication)
  - Headers: `Authorization: Bearer <token>`

## Database Schema

- **User**: Stores user accounts with hashed passwords
- **Product**: Stores product information
- **Order**: Stores order information with shipping address
- **OrderItem**: Stores individual items in each order

## Troubleshooting

### Database Issues

If you encounter database errors:
1. Delete `dev.db` file
2. Run `npx prisma db push` again
3. Run `npm run db:seed`

### Prisma Client Issues

If Prisma Client is not found:
1. Run `npx prisma generate`
2. Restart your development server

### Authentication Issues

- Make sure JWT_SECRET is set in `.env`
- Check that tokens are being stored in localStorage
- Verify API routes are receiving the Authorization header

## Next Steps

- [ ] Add email verification for signup
- [ ] Implement password reset functionality
- [ ] Add order status updates
- [ ] Integrate payment gateway (Razorpay/Stripe)
- [ ] Add admin panel for managing products and orders
- [ ] Set up production database (PostgreSQL/MySQL)
