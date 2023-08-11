import { getCurrentUser } from '@/app/actions';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to create a listing' },
      { status: 401 }
    );
  }

  if (!listingId || typeof listingId !== 'string') {
    NextResponse({ error: 'Invalid ID' }, { status: 400 });
  }

  const favoriteIds = [...currentUser.favoriteIds];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json({ user });
}

export async function DELETE(req, { params }) {
  const currentUser = await getCurrentUser();

  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to create a listing' },
      { status: 401 }
    );
  }

  if (!listingId || typeof listingId !== 'string') {
    NextResponse({ error: 'Invalid ID' }, { status: 400 });
  }

  const favoriteIds =currentUser?.favoriteIds;
  const filteredFavoriteIds = favoriteIds.filter(id => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds:filteredFavoriteIds,
    },
  });
  return NextResponse.json({ user });
}
