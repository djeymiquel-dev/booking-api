import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const deleteHost = async (id) => {
  const host = await prisma.host.deleteMany({
    where: { id },
  });
  if (!host || host.count === 0) {
    throw new NotFoundError("Host", id);
  }
  return id;
};
export default deleteHost;
