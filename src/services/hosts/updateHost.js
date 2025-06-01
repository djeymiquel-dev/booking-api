import NotFoundError from "../../errors/NotFoundError.js";
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
    throw new NotFoundError(`Host`, id);
  }

  return {
    message: `Host with id ${id} updated successfully`,
  };
};

export default updateHost;
