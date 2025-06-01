import { PrismaClient } from "../../../src/generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();
const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      property: true,
      user: true,
    },
  });
  if (!booking) {
    throw new NotFoundError("Booking", id);
  }
  return booking;
};

export default getBookingById;
