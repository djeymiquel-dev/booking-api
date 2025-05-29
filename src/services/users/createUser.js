import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  if (!username || !password || !name || !email) {
    throw new Error("Username, password, name, and email are required.");
  }
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  return newUser;
};

export default createUser;
