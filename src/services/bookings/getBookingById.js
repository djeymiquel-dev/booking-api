import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: { id },
    include: {
      properties: true,
      user: true,
    },
  });
};

export default getBookingById;
