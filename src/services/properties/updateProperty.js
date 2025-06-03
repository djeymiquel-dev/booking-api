import { PrismaClient } from "../../generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";
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
  // amenities = []
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
      rating, // Default to 0 if not provided
      // amenities: {
      //   connect: [{ name: "Heating" }, { name: "Washer" }],
      // },
    },
  });
  // console.log(property);

  if (!property || property.count === 0) {
    throw new NotFoundError("Property", id);
  }
  return {
    message: `Property with id ${id} updated successfully`,
  };
};

export default updateProperty;
