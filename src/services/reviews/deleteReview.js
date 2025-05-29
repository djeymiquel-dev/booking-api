import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const deleteReview = async (id) => {
  const review = await prisma.review.delete({
    where: { id },
  });
  if (!review) {
    throw new Error(`Review with id ${id} not found.`);
  }
  return {
    message: `Review with id ${id} deleted successfully`,
  };
};

export default deleteReview;
