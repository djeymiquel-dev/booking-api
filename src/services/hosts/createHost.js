import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  if (!username || !password || !name || !email) {
    throw new Error("Username, password, name, and email are required.");
  }
  const newHost = await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
  return newHost;
};

export default createHost;
