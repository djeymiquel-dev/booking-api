import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const updateAmenity = async (id, name) => {
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: {
      name,
    },
  });
  if (!amenity || amenity.count === 0) {
    throw new Error(`Amenity with id ${id} not found or no changes made.`);
  }
  return {
    message: `Amenity with id ${id} updated successfully`,
  };
};

export default updateAmenity;
