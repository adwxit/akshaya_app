import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IOrderItem extends Document {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

// This is embedded in Order, so we don't need a separate model
// But we export the interface for TypeScript typing

export { IOrderItem };
