import { PrismaClient } from "../../generated/prisma/index.js";
import NotFoundError from "../../errors/NotFoundError.js";
const prisma = new PrismaClient();

const updateProperty = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
  // amenities = [] // Assuming amenities is an array of amenity IDs
) => {
  // let amenityConnections = undefined;
  // if (amenities.length > 0) {
  //   const allAmenities = await prisma.amenity.findMany({
  //     where: {
  //       name: { in: amenities },
  //     },
  //     select: { name: true },
  //   });

  //   const foundAmenityNames = allAmenities.map((a) => a.name);
  //   const missing = amenities.filter((a) => !foundAmenityNames.includes(a));
  //   if (missing.length > 0) {
  //     throw new Error(`Amenities not found: ${missing.join(", ")}`);
  //   }

  //   // connect via .set (vervangt oude relaties)
  //   amenityConnections = {
  //     set: foundAmenityNames.map((name) => ({ name })),
  //   };
  // }

  const property = await prisma.property.updateMany({
    where: { id },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating: rating || 0, // Default to 0 if not provided
      // ...(amenityConnections ? { amenities: amenityConnections } : {}),
    },
  });
  console.log("property", property);

  if (!property || property.count === 0) {
    throw new NotFoundError("Property", id);
  }
  return {
    message: `Property with id ${id} updated successfully`,
  };
};

export default updateProperty;
