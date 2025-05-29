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
  if (
    !title ||
    !description ||
    !location ||
    pricePerNight === undefined ||
    bedroomCount === undefined ||
    bathRoomCount === undefined ||
    maxGuestCount === undefined ||
    !hostId
  ) {
    throw new Error("All fields are required.");
  }

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
      rating: rating || 0, // Default to 0 if not provided
    },
  });

  return newProperty;
};

export default createProperty;
