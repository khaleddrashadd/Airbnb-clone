import { getCurrentUser } from '@/app/actions';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { totalPrice, startDate, endDate, listingId } = body;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to create a reservation' },
      { status: 401 }
    );
  }
  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.json(
      { error: 'You must fill out all fields' },
      { status: 400 }
    );
  }
  const reservation = await prisma.reservation.create({
    data: {
      totalPrice: totalPrice,
      startDate,
      endDate,
      userId: currentUser.id,
      listingId,
    },
  });
  return NextResponse.json({ reservation });
}

