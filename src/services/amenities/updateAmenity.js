import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const updateAmenity = async (id, name) => {
  const updatAmenity = await prisma.amenity.updateMany({
    where: { id },
    data: {
      name,
    },
  });
  if (!updatAmenity || updatAmenity.count === 0) {
    throw new NotFoundError(`Amenity`, id);
  }
  return {
    message: `Amenity with id ${id} updated successfully`,
  };
};

export default updateAmenity;
