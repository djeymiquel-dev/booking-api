import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      user: true,
      properties: true,
    },
  });
};

export default getBookings;
