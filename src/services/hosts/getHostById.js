import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
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
  if (!host) {
    throw new NotFoundError("Host", id);
  }
  return host;
};

export default getHostById;
