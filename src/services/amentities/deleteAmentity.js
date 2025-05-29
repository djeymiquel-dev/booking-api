import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const deleteAmentity = async (id) => {
  const amentity = await prisma.amentity.delete({
    where: { id },
  });
  if (!amentity) {
    throw new Error(`Amentity with id ${id} not found.`);
  }
  return {
    message: `Amentity with id ${id} deleted successfully`,
  };
};

export default deleteAmentity;
