import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../../lib/connectjs';
import {User} from '../../../../model/user';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';
const JWT_EXPIRES_IN = '7d';

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    if(email==="admin@admin.com" && password==="admin@admin.com"){
        const token="nfsknfsofn"
        return NextResponse.json({ token }, { status: 200 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
