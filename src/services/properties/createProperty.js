import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
  // amenities = []
) => {
  // // Fetch all amenities from DB
  // const allAmenities = await prisma.amenity.findMany();
  // // console.log("Alle amenities in DB:", allAmenities);
  // // Map amenity names to a Set for quick lookup
  // const amenitySet = new Set(allAmenities.map((a) => a.name));
  // console.log("Available amenities in DB:", amenitySet);

  // console.log("Amenities to connect:", amenities);

  // // Check if all provided amenities exist
  // for (const name of amenities) {
  //   if (!amenitySet.has(name)) {
  //     throw new Error("amenity not found");
  //   }
  //   console.log(`Amenity "${name}" exists in the database.`);
  // }

  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      host: {
        connect: { id: hostId },
      },
      rating: rating || 0,
      // amenities: {
      //   connect: amenities.map((name) => ({ name })),
      // },
    },
    // include: {
    //   amenities: {
    //     select: {
    //       name: true,
    //     },
    //   },
    // },
  });

  return newProperty;
};

export default createProperty;
