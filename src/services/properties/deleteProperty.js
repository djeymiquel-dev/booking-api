import { PrismaClient } from "../../generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();
const deleteProperty = async (id) => {
  const property = await prisma.property.deleteMany({
    where: { id },
  });
  if (property.count === 0) {
    throw new NotFoundError("Property", id);
  }
  return property;
};
export default deleteProperty;
