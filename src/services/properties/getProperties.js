import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getProperties = async () => {
  return await prisma.property.findMany();
};

export default getProperties;
