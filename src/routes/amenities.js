import express from "express";
import getAmenities from "../../src/services/amenities/getAmenities.js";
import getAmenityById from "../../src/services/amenities/getAmenityById.js";
import createAmenity from "../../src/services/amenities/createAmenity.js";
import updateAmenity from "../../src/services/amenities/updateAmenity.js";
import deleteAmenity from "../../src/services/amenities/deleteAmenity.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";
import ConflictError from "../errors/ConflictError.js";
// import conflictErrorHandler from "../middleware/conflictErrorHandler.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const amenities = await getAmenities();
  res.status(200).json(amenities);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      // if (!amenity) {
      //   return res.status(404).json({ error: "Amenity not found" });
      // }
      res.status(200).json(amenity);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post(
  "/",

  async (req, res, next) => {
    try {
      const { name } = req.body;
      console.log("req body:", req.body);

      const newAmenity = await createAmenity(name);
      res.status(201).json(newAmenity);
    } catch (error) {
      next(error);
    }
  }
  // conflictErrorHandler
);

router.put(
  "/:id",
  // authMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedAmenity = await updateAmenity(id, name);
      res.status(200).json(updatedAmenity);
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
    try {
      const { id } = req.params;
      const deletedAmenity = await deleteAmenity(id);
      res.status(200).json({
        message: `Amenity with id ${deletedAmenity} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
