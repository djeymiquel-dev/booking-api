import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const deleteHost = async (id) => {
  const host = await prisma.host.delete({
    where: { id },
  });
  if (!host) {
    throw new Error(`Host with id ${id} not found.`);
  }
  return {
    message: `Host with id ${id} deleted successfully`,
  };
};
export default deleteHost;
