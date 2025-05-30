import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getPropertyById = async (id) => {
  const property = prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      amenities: true,
      booking: true,
      review: true,
    },
  });
  if (!property || (await property) === null) {
    throw new NotFoundError("Property", id);
  }
  return property;
};

export default getPropertyById;
