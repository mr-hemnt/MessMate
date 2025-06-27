import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/connectjs';
import { Order } from '../../../model/user';  // Make sure the Order model is correct
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();
  
  // Extract token from Authorization header
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    // Verify the token
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Replace JWT_SECRET with your secret key
    console.log(decoded)
    const userId = decoded.id;  // Assuming the JWT contains user ID as `id`
    console.log(userId)
    // Now, extract order data from the request body
    const { items, totalAmount } = await req.json();
    const orderId = 'ORD-' + Date.now(); // Generate a unique order ID

    // Validate items
    if (!items || items.length === 0 || totalAmount <= 0) {
      return NextResponse.json({ message: 'Invalid order data' }, { status: 400 });
    }

    // Create and save order
    const order = new Order({
      userId,  // Use the extracted user ID from the token
      items,
      totalAmount,
      orderId,
    });

    await order.save();

    return NextResponse.json({ message: 'Order placed successfully', orderId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid or expired token', status: 403 }, { status: 403 });
  }
}
