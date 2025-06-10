import express from "express";
import getBookings from "../../src/services/bookings/getBookings.js";
import getBookingById from "../../src/services/bookings/getBookingById.js";
import createBooking from "../../src/services/bookings/createBooking.js";
import updateBooking from "../services/bookings/updateBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const bookings = await getBookings({ userId });
  res.status(200).json(bookings);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      if (!booking) {
        res.status(404).json(booking);
      } else {
        res.status(200).json(booking);
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

router.post(
  "/",
  authMiddleware,
  async (req, res, next) => {
    try {
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;

      if (
        !userId ||
        !propertyId ||
        !checkinDate ||
        !checkoutDate ||
        !numberOfGuests ||
        !totalPrice ||
        !bookingStatus
      ) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const newBooking = await createBooking(
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );

      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const updatedBooking = await updateBooking(
        id,
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      res.status(200).json(updatedBooking);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBooking = await deleteBooking(id);
      res.status(200).json(deletedBooking);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
