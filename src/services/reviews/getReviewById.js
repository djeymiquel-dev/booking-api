import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      property: true,
    },
  });
  if (!review) {
    throw new NotFoundError(`Review`, id);
  }
  console.log("review", review);

  return review;
};

export default getReviewById;
