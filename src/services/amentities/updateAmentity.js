import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const updateAmentity = async (id, name) => {
  const amentity = await prisma.amentity.updateMany({
    where: { id },
    data: {
      name,
    },
  });
  if (!amentity || amentity.count === 0) {
    throw new Error(`Amentity with id ${id} not found or no changes made.`);
  }
  return {
    message: `Amentity with id ${id} updated successfully`,
  };
};

export default updateAmentity;
