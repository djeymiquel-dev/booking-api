import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  if (!user) {
    throw new Error(`User with id ${id} not found.`);
  }
  return {
    message: `User with id ${id} deleted successfully`,
  };
};
export default deleteUser;
