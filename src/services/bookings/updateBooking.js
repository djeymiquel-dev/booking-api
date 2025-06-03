import { PrismaClient } from "../../../src/generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";

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
    throw new NotFoundError("Booking", id);
  }
  return {
    message: `Booking with id ${id} updated successfully`,
  };
};
export default updateBooking;
