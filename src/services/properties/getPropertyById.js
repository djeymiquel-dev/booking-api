import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getPropertyById = async (id) => {
  // console.log("get id propery", id);

  const property = await prisma.property.findUnique({
    where: {
      id,
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
      amenities: true,
      bookings: true,
      reviews: true,
    },

    // include: {
    //   amenities: true,
    //   bookings: true,
    //   reviews: true,
    // },
  });

  if (!property) {
    throw new NotFoundError("Property", id);
  }
  return property;
};

export default getPropertyById;
