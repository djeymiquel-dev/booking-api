import express from "express";
import getHosts from "../../src/services/hosts/getHosts.js";
import getHostById from "../../src/services/hosts/getHostById.js";
import createHost from "../../src/services/hosts/createHost.js";
import updateHost from "../../src/services/hosts/updateHost.js";
import deleteHost from "../../src/services/hosts/deleteHost.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const hosts = await getHosts({ name });
  res.status(200).json(hosts);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      res.status(200).json(host);
    } catch (error) {
      console.error(error);
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
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const requiredFields = {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      };
      const missingFields = Object.keys(requiredFields).filter(
        (field) => !requiredFields[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      const newHost = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json({
        success: true,
        data: newHost,
        message: "Host created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
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
      const result = await deleteHost(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);
export default router;
