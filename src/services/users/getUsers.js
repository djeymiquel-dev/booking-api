import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getUsers = async (filters = {}) => {
  const { username, email } = filters;
  return await prisma.user.findMany({
    where: {
      ...(username && { username }),
      ...(email && { email }),
    },
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
