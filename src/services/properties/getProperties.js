import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getProperties = async (filters = {}) => {
  const { location, pricePerNight } = filters;
  console.log("filters", filters);

  return await prisma.property.findMany({
    where: {
      ...(location && { location }),
      ...(pricePerNight && {
        pricePerNight: {
          lte: pricePerNight,
        },
      }),
    },

    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      hostId: true,
      rating: true,
    },
  });
};

export default getProperties;
