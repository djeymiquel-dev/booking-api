import express from "express";
import * as Sentry from "@sentry/node";
import log from "../src/middleware/logMiddleware.js";
import userRouter from "../src/routes/users.js";
import reviewRouter from "../src/routes/reviews.js";
import propertyRouter from "../src/routes/properties.js";
import hostRouter from "../src/routes/hosts.js";
import bookingRouter from "../src/routes/bookings.js";
import amentityRouter from "../src/routes/amenities.js";
import loginRouter from "../src/routes/login.js";
import errorHandler from "../src/middleware/errorHandler.js";

import "dotenv/config";

const app = express();
const PORT = 3000;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(log);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("Sentry test error"); // deze fout moet in Sentry komen
});

// Routes
app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/properties", propertyRouter);
app.use("/hosts", hostRouter);
app.use("/bookings", bookingRouter);
app.use("/amenities", amentityRouter);
app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});
