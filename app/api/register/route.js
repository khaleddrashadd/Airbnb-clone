import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';

export async function POST(req) {
  const { email, password, name } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);
console.log(email, password, name);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json({ user });
}
