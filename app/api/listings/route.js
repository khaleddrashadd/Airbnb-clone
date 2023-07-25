import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function POST(req) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to create a listing' },
      { status: 401 }
    );
  }
  if (
    !category ||
    !location ||
    !guestCount ||
    !roomCount ||
    !bathroomCount ||
    !imageSrc ||
    price===undefined ||
    price===null ||
    !title ||
    !description
  ) {
    return NextResponse.json(
      { error: 'You must fill out all fields' },
      { status: 400 }
    );
  }

  const listings = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price),
      title,
      description,
      userId: currentUser.id,
    },
  });
  return NextResponse.json({ listings });
}
