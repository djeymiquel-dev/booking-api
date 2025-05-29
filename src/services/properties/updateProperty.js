import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const updateProperty = async (
  id,
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
  const property = await prisma.property.updateMany({
    where: { id },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating: rating || 0, // Default to 0 if not provided
    },
  });
  if (!property || property.count === 0) {
    throw new Error(`Property with id ${id} not found or no changes made.`);
  }
  return {
    message: `Property with id ${id} updated successfully`,
  };
};

export default updateProperty;
