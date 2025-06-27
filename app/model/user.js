import mongoose from 'mongoose';

// User schema definition
const UserSchema = new mongoose.Schema({
  displayName: String,
  email: { type: String, unique: true },
  password: String,
});

// Order schema definition
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create models for User and Order
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export { User, Order };
