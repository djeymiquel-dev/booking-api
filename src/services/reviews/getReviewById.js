import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: {
      id,
    },
  });
};

export default getReviewById;
