import express from "express";
import getReviews from "../../src/services/reviews/getReviews.js";
import getReviewById from "../../src/services/reviews/getReviewById.js";
import createReview from "../../src/services/reviews/createReview.js";
import authMiddleware from "../middleware/auth.js";
import updateReview from "../../src/services/reviews/updateReview.js";
import deleteReview from "../../src/services/reviews/deleteReview.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  try {
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
