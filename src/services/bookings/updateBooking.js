import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const updateBooking = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const booking = await prisma.booking.updateMany({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
  if (!booking || booking.count === 0) {
    throw new Error(`Booking with id ${id} not found.`);
  }
  return {
    message: `Booking with id ${id} updated successfully`,
  };
};
export default updateBooking;
