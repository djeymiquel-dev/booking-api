import express from "express";
import getHosts from "../../src/services/hosts/getHosts.js";
import getHostById from "../../src/services/hosts/getHostById.js";
import createHost from "../../src/services/hosts/createHost.js";
import updateHost from "../../src/services/hosts/updateHost.js";
import deleteHost from "../../src/services/hosts/deleteHost.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const hosts = await getHosts();
  res.status(200).json(hosts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const host = await getHostById(id);
    if (!host) {
      return res.status(404).json({ error: "Host not found" });
    }
    res.status(200).json(host);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;
  try {
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;
  try {
    const updatedHost = await updateHost(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).json(updatedHost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteHost(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
