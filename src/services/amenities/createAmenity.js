import ConflictError from "../../errors/ConflictError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const createAmenity = async (name) => {
  const existing = await prisma.amenity.findUnique({
    where: { name },
  });

  if (existing) {
    return existing;
  }

  const newAmenity = await prisma.amenity.create({
    data: {
      name,
    },
  });

  return newAmenity;
};

export default createAmenity;
