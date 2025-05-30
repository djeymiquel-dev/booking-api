import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const createAmenity = async (name) => {
  const amenity = await prisma.amenity.create({
    data: {
      name,
    },
  });
  if (!amenity) {
    throw new Error("Failed to create amenity.");
  }
  return {
    message: `Amenity with name ${name} created successfully`,
    amenity,
  };
};

export default createAmenity;
