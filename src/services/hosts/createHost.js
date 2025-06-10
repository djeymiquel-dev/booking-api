import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const existingHost = await prisma.host.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });

  if (existingHost) {
    return "Host already exist";
  }

  const newHost = await prisma.host.create({
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
  return newHost;
};

export default createHost;
