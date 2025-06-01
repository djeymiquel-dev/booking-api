import { PrismaClient } from "../../../src/generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const deleteBooking = async (id) => {
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });
  if (!booking || booking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return id;
};

export default deleteBooking;
