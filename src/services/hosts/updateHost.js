import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const updateHost = await prisma.host.updateMany({
    where: { id },
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
  if (!updateHost || updateHost.count === 0) {
    throw new Error(`Host with id ${id} not found or no changes made.`);
  }

  return {
    message: `Host with id ${id} updated successfully`,
  };
};

export default updateHost;
