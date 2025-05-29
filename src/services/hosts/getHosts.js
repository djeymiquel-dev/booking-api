import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getHosts = async () => {
  return await prisma.host.findMany({
    select: {
      id: true,
      username: true,
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });
};

export default getHosts;
