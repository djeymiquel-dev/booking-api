import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const booking = await prisma.booking.create({
    data: {
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};
export default createBooking;
