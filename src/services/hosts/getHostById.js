import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getHostById = async (id) => {
  return await prisma.host.findUnique({
    where: { id },
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

export default getHostById;
