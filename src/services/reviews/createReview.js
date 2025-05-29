import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const createReview = async (userId, propertyId, rating, comment) => {
  if (!userId || !propertyId || rating === undefined || !comment) {
    throw new Error("User ID, Property ID, rating, and comment are required.");
  }

  const newReview = await prisma.review.create({
    data: {
      user: {
        connect: { id: userId },
      },
      properties: {
        connect: { id: propertyId },
      },

      rating,
      comment,
    },
  });

  return newReview;
};

export default createReview;
