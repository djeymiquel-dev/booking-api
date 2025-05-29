import express from "express";
import getAmentities from "../../src/services/amentities/getAmentities.js";
import getAmentityById from "../../src/services/amentities/getAmentityById.js";
import createAmentity from "../../src/services/amentities/createAmentity.js";
import updateAmentity from "../../src/services/amentities/updateAmentity.js";
import deleteAmentity from "../../src/services/amentities/deleteAmentity.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const amentities = await getAmentities();
  res.status(200).json(amentities);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const amentity = await getAmentityById(id);
    if (!amentity) {
      return res.status(404).json({ error: "Amentity not found" });
    }
    res.status(200).json(amentity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newAmentity = await createAmentity(name);
    res.status(201).json(newAmentity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedAmentity = await updateAmentity(id, name);
    res.status(200).json(updatedAmentity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAmentity = await deleteAmentity(id);
    res.status(200).json(deletedAmentity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
