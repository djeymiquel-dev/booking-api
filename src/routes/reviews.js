import express from "express";
import getReviews from "../../src/services/reviews/getReviews.js";
import getReviewById from "../../src/services/reviews/getReviewById.js";
import createReview from "../../src/services/reviews/createReview.js";
import authMiddleware from "../middleware/auth.js";
import updateReview from "../../src/services/reviews/updateReview.js";
import deleteReview from "../../src/services/reviews/deleteReview.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const review = await getReviewById(id);
      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  if (!userId || !propertyId || rating === undefined || !comment) {
    return res.status(400).json({
      error: "Missing required fields: userId, propertyId, rating, or comment",
    });
  }
  try {
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    try {
      const updatedReview = await updateReview(
        id,
        userId,
        propertyId,
        rating,
        comment
      );

      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedReview = await deleteReview(id);
      res.status(200).json({
        message: `Review with id ${deletedReview} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
