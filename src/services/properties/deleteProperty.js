import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const deleteProperty = async (id) => {
  const property = await prisma.property.delete({
    where: { id },
  });
  if (!property) {
    throw new Error(`Property with id ${id} not found.`);
  }
  return {
    message: `Property with id ${id} deleted successfully`,
  };
};

export default deleteProperty;
