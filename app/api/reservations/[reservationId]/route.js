import { getCurrentUser } from '@/app/actions';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params: { reservationId } }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to delete a reservation' },
      { status: 401 }
    );
  }
  if (!reservationId || typeof reservationId !== 'string') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });
  return NextResponse.json({ reservation });
}
