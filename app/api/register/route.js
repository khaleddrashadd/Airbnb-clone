import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password, name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json({ user });
}
