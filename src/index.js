import express from "express";
import userRouter from "../src/routes/users.js";
import reviewRouter from "../src/routes/reviews.js";
import propertyRouter from "../src/routes/properties.js";
import hostRouter from "../src/routes/hosts.js";
import bookingRouter from "../src/routes/bookings.js";
import amentityRouter from "../src/routes/amenities.js";
import loginRouter from "../src/routes/login.js";
import errorHandler from "../src/middleware/errorHandler.js";
import log from "../src/middleware/logMiddleware.js";

import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(express.json());

app.use(log);

app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/properties", propertyRouter);
app.use("/hosts", hostRouter);
app.use("/bookings", bookingRouter);
app.use("/amenities", amentityRouter);
app.use("/login", loginRouter);

// Global error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
