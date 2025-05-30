import { PrismaClient } from "../../../src/generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });
  if (!user) {
    throw new NotFoundError("User", id);
  }
  return user;
};
export default getUserById;
