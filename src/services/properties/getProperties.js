import { PrismaClient } from "../../../src/generated/prisma/index.js";

const prisma = new PrismaClient();
const getProperties = async (filters = {}) => {
  // const { location, pricePerNight, amenities } = filters;
  const properties = await prisma.property.findMany({
    include: {
      amenities: {
        select: {
          name: true,
        },
      },
    },
  });
  return properties.map((property) => ({
    id: property.id,
    title: property.title,
    description: property.description,
    location: property.location,
    pricePerNight: property.pricePerNight,
    bedroomCount: property.bedroomCount,
    bathRoomCount: property.bathRoomCount,
    maxGuestCount: property.maxGuestCount,
    hostId: property.hostId,
    rating: property.rating || 0,
    amenities: property.amenities.map((amenity) => amenity.name),
    // amenities: property.amenities.map((amenity) => amenity.name),
  }));
};

export default getProperties;
