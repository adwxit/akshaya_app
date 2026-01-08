# MongoDB Setup Guide

## Overview

The application now uses **MongoDB** with **Mongoose** as the ODM (Object Document Mapper). This is much simpler than Prisma and doesn't require schema migrations.

## Setup Instructions

### 1. Install MongoDB

You have two options:

#### Option A: Local MongoDB Installation

1. **Windows**: Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. **macOS**: `brew install mongodb-community`
3. **Linux**: Follow instructions at [mongodb.com/docs/manual/installation](https://www.mongodb.com/docs/manual/installation/)

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Sign up for free at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### 2. Environment Variables

Create or update your `.env` file in the `akshaya-app` directory:

```env
# MongoDB Connection String
# For local MongoDB:
MONGODB_URI="mongodb://localhost:27017/akshaya-associates"

# For MongoDB Atlas (cloud):
# MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/akshaya-associates?retryWrites=true&w=majority"

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# API URL
NEXT_PUBLIC_API_URL="/api"
```

### 3. Start MongoDB (if using local installation)

```bash
# Windows (if installed as service, it should start automatically)
# Or run: mongod

# macOS/Linux
mongod
```

### 4. Seed the Database

```bash
cd akshaya-app
npm run db:seed
```

This will create 30 sample products in your database.

### 5. Start the Development Server

```bash
npm run dev
```

## Database Structure

The database uses the following collections:

- **users** - User accounts with hashed passwords
- **products** - Product catalog
- **orders** - Customer orders with embedded order items

## Advantages of MongoDB

1. ✅ **No migrations** - Schema changes are automatic
2. ✅ **Flexible schema** - Easy to add/remove fields
3. ✅ **Simple setup** - Just connection string needed
4. ✅ **Cloud-ready** - MongoDB Atlas free tier available
5. ✅ **Better for rapid development** - No complex ORM setup

## Troubleshooting

### Connection Issues

- Make sure MongoDB is running (if using local)
- Check your connection string is correct
- For Atlas: Ensure your IP is whitelisted in network settings

### Database Not Seeding

```bash
# Make sure MongoDB is running first
# Then try:
npm run db:seed
```

### Check Database Connection

You can verify the connection by checking the console logs when the app starts or when making API calls.

## Next Steps

- [ ] Set up MongoDB Atlas for production
- [ ] Add indexes for better performance
- [ ] Set up database backups
- [ ] Configure MongoDB Atlas monitoring
