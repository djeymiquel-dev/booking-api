import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const deleteBooking = async (id) => {
  const booking = await prisma.booking.delete({
    where: { id },
  });
  if (!booking) {
    throw new Error(`Booking with id ${id} not found.`);
  }
  return {
    message: `Booking with id ${id} deleted successfully`,
  };
};

export default deleteBooking;
