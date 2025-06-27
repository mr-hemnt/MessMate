import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../../lib/connectjs';
import {User} from '../../../../model/user';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';
const JWT_EXPIRES_IN = '7d';

export async function POST(req) {
  await dbConnect();

  let name, email, password;
  try {
    const body = await req.json();
    name = body.name;
    email = body.email;
    password = body.password;
  } catch (err) {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ displayName: name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
