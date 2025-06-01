import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getHosts = async (filter = {}) => {
  const { name } = filter;
  return await prisma.host.findMany({
    where: {
      ...(name && { name }),
    },
    select: {
      id: true,
      username: true,
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      listings: true,
    },
  });
};

export default getHosts;
