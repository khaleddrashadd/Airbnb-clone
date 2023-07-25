import { prisma } from '@/lib/prismadb';

export const getListings = async () => {
  try {
    const linstings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return linstings;
  } catch (err) {
    throw new Error(err);
  }
};
