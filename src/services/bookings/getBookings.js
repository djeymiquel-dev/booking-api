import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getBookings = async (filter = {}) => {
  const { userId } = filter;
  return await prisma.booking.findMany({
    where: { ...(userId && { userId }) },
    include: {
      user: true,
      property: true,
    },
  });
};

export default getBookings;
