import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getPropertyById = async (id) => {
  return prisma.property.findUnique({
    where: {
      id,
    },
  });
};

export default getPropertyById;
