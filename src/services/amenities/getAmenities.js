import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getAmenities = async () => {
  return await prisma.amenity.findMany({
    include: {
      properties: true,
    },
  });
};

export default getAmenities;
