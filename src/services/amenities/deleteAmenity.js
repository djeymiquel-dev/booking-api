import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const deleteAmenity = async (id) => {
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });
  if (!amenity || amenity.count === 0) {
    throw new NotFoundError("Amenity", id);
  }
  return id
};

export default deleteAmenity;
