import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      password: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });
};

export default getUsers;
