import ConflictError from "../../errors/ConflictError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const createAmenity = async (name) => {
  const newAmenity = await prisma.amenity.create({
    data: {
      name,
    },
  });
  // const existingAmenity = await prisma.amenity.findMany({
  //   select: {
  //     name: true,
  //   },
  // });
  // console.log("existingAmenity", existingAmenity);
  if (!name || name.length === 0) {
    throw new Error("Name required");
  }
  return newAmenity;
};

export default createAmenity;
