import { prisma } from '@/lib/prismadb';

export const getReservations = async ({listingId,userId,authorId}) => {
  const query = {};
  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        createdAt: query,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return reservations;
  } catch (err) {
    throw new Error(err);
  }
};
