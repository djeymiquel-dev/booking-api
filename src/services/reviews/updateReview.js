import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const updateReview = async (id, userId, propertyId, rating, comment) => {
  const updateReview = await prisma.review.updateMany({
    where: { id },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
  if (!updateReview || updateReview.count === 0) {
    throw new Error(`Review with id ${id} not found.`);
  }

  return {
    message: `Review with id ${id} updated successfully`,
  };
};

export default updateReview;
