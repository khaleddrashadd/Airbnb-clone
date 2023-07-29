import { prisma } from '@/lib/prismadb';

export const getListingById = async id => {
  try {
    const linsting = await prisma.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    if (!linsting) return null;

    return linsting;
  } catch (err) {
    throw new Error(err);
  }
};
