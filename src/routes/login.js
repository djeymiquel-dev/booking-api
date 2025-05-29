import { Router } from "express";
import jwt from "jsonwebtoken";
import getUsers from "../services/users/getUsers.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;
  const users = await getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }
  console.log("User logged in:", users);

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
