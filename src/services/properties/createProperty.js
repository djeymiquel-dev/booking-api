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
    },
  });
  return newProperty;
};

export default createProperty;
