import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getAmenities = async () => {
  return await prisma.amenity.findMany({
    include: {
      property: {
        select: {
          title: true,
          description: true,
          location: true,
        },
      },
    },
  });
};

export default getAmenities;
