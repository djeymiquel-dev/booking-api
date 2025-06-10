import express from "express";
import getUsers from "../../src/services/users/getUsers.js";
import getUserById from "../../src/services/users/getUserById.js";
import createUser from "../../src/services/users/createUser.js";
import updateUser from "../../src/services/users/updateUser.js";
import deleteUser from "../../src/services/users/deleteUser.js";
import notFoundErrorHandler from "../../src/middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { username, email } = req.query;
  console.log("filters", req.query);
  const users = await getUsers({ username, email });
  res.status(200).json(users);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    if (!username || !password || !name || !email) {
      return res.status(400).json({
        error: "Missing required fields: username, password, name, or email",
      });
    }
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
    next(error);
  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
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
      const deletedUser = await deleteUser(id);
      res.status(200).json({
        message: `User with id ${deletedUser} was deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
