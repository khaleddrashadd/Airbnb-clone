import { getCurrentUser } from '@/app/actions';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params: {listingId} }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to delete a listing' },
      { status: 401 }
    );
  }

  if (!listingId || typeof listingId !== 'string') {
    NextResponse({ error: 'Invalid ID' }, { status: 400 });
  }

  const listings = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });
  return NextResponse.json({ listings });
}
