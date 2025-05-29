import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getReviews = async () => {
  return await prisma.review.findMany();
};

export default getReviews;
