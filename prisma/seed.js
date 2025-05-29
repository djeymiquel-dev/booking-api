import { PrismaClient } from "../src/generated/prisma/index.js";
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const { amenities } = amenityData;
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { users } = userData;

  for (const user of users) {
    console.log(`Upserting user with ID: ${user.id}`);

    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  for (const amentity of amenities) {
    await prisma.amentity.upsert({
      where: { id: amentity.id },
      update: {},
      create: amentity,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
