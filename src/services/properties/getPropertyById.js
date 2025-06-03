import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      amenities: true,
      bookings: true,
      reviews: true,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", id);
  }
  return property;
};

export default getPropertyById;
