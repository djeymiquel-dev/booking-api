import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
  // amenities = []
) => {
  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      host: {
        connect: { id: hostId },
      },
      rating: rating || 0,
      // amenities: {
      //   connect: amenities.map((name) => ({ name })),
      // },
    },
    // include: {
    //   amenities: {
    //     select: {
    //       name: true,
    //     },
    //   },
    // },
  });

  return newProperty;
};

export default createProperty;
