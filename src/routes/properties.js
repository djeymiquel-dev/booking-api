import express from "express";
import getProperties from "../../src/services/properties/getProperties.js";
import getPropertyById from "../../src/services/properties/getPropertyById.js";
import createProperty from "../../src/services/properties/createProperty.js";
import updateProperty from "../../src/services/properties/updateProperty.js";
import deleteProperty from "../../src/services/properties/deleteProperty.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const properties = await getProperties();
  res.status(200).json(properties);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await getPropertyById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await deleteProperty(id);
    res.status(200).json(deletedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
