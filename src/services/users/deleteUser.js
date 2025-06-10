import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const deleteUser = async (id) => {
  const deleteUser = await prisma.user.deleteMany({
    where: { id },
  });
  console.log(deleteUser);
  console.log(id);

  if (!deleteUser || deleteUser.count === 0) {
    throw new NotFoundError("User", id);
  }
  return id;
};
export default deleteUser;
