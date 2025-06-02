import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import NotFoundError from "../errors/NotFoundError.js";
NotFoundError;

const router = express.Router();

router.get("/", async (req, res) => {
  const { location, pricePerNight } = req.query;
  console.log("req query:", req.query);
  const properties = await getProperties({ location, pricePerNight });
  res.status(200).json(properties);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      // if (!property) {
      //   throw new NotFoundError("Property", id);
      // }
      // console.log("eas statusCode", res.statusCode);

      console.log("property", property);
      // console.log("req.params", req.params);

      res.status(200).json(property);
      // console.log("property returned", property);
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post(
  "/",
  // authMiddleware,
  async (req, res, next) => {
    try {
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
      console.log(req.body);

      if (
        !title ||
        !description ||
        !location ||
        !pricePerNight ||
        !bedroomCount ||
        !bathRoomCount ||
        !maxGuestCount ||
        !hostId
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, amenities or hostId",
        });
      }

      const newProperty = await createProperty(
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
      res.status(201).json(newProperty);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  // authMiddleware,

  async (req, res, next) => {
    try {
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
  // authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProperty = await deleteProperty(id);
      res.status(200).json({
        message: `Property with id ${deletedProperty} deleted succesfully`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
