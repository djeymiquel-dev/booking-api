import express from "express";
import getUsers from "../../src/services/users/getUsers.js";
import getUserById from "../../src/services/users/getUserById.js";
import createUser from "../../src/services/users/createUser.js";
import updateUser from "../../src/services/users/updateUser.js";
import deleteUser from "../../src/services/users/deleteUser.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  try {
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  try {
    const updatedUser = await updateUser(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
