import { prisma } from '@/lib/prismadb';

export const getListings = async userId => {
  let query = {};
  if (userId) query.userId = userId;

  try {
    const linstings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return linstings;
  } catch (err) {
    throw new Error(err);
  }
};
