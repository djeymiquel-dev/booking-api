import express from "express";
import getProperties from "../../src/services/properties/getProperties.js";
import getPropertyById from "../../src/services/properties/getPropertyById.js";
import createProperty from "../../src/services/properties/createProperty.js";
import updateProperty from "../../src/services/properties/updateProperty.js";
import deleteProperty from "../../src/services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { location, pricePerNight, amenities } = req.query;
  const properties = await getProperties(location, pricePerNight, amenities);
  res.status(200).json(properties);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      console.log("Property details:", property);
      console.log("req params:", req.params);

      res.status(200).json(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", async (req, res, next) => {
  const {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
    amenities,
  } = req.body;
  console.log("request body:", req.body);

  try {
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenities
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",

  async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    try {
      const updatedProperty = await updateProperty(
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
      );
      res.status(200).json(updatedProperty);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProperty = await deleteProperty(id);
      res.status(200).json({
        message: `Property with id ${deletedProperty} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
