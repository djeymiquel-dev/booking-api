import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getBookings = async () => {
  return await prisma.booking.findMany();
};

export default getBookings;
