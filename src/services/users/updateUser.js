import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const updateUser = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const updateUser = await prisma.user.updateMany({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  if (!updateUser || updateUser.count === 0) {
    throw new Error(`User with id ${id} not found or no changes made.`);
  }
  return {
    message: `User with id ${id} updated successfully`,
  };
};

export default updateUser;
