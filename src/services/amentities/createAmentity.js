import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const createAmentity = async (name) => {
  const amentity = await prisma.amentity.create({
    data: {
      name,
    },
  });
  if (!amentity) {
    throw new Error("Failed to create amentity.");
  }
  return {
    message: `Amentity with name ${name} created successfully`,
    amentity,
  };
};

export default createAmentity;
