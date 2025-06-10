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
