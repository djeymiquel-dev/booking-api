import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const deleteReview = async (id) => {
  const review = await prisma.review.deleteMany({
    where: { id },
  });
  if (!review || review.count === 0) {
    throw new NotFoundError("Review", id);
  }
  return id;
};

export default deleteReview;
