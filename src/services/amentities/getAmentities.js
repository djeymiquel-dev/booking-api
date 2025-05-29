import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getAmentities = async () => {
  return await prisma.amentity.findMany();
};

export default getAmentities;
