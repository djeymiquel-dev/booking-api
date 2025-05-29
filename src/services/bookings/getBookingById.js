import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getBookingById = async (id) => {
  return await prisma.booking.findMany({
    where: { id },
  });
};

export default getBookingById;
