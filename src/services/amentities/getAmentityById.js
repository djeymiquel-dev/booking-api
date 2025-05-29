import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getAmentityById = async (id) => {
  return await prisma.amentity.findMany({
    where: {
      id,
    },
  });
};

export default getAmentityById;
