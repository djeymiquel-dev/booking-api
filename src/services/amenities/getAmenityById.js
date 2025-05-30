import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getAmenityById = async (id) => {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });
  if (!amenity) {
    throw new NotFoundError("Amenity", id);
  }
  return amenity;
};

export default getAmenityById;
