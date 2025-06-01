import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getProperties = async (filters = {}) => {
  const { location, pricePerNight } = filters;
  console.log("filters", filters);

  return await prisma.property.findMany({
    where: {
      ...(location && { location }),
      ...(pricePerNight && {
        pricePerNight: {
          lte: pricePerNight,
        },
      }),
    },

    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      hostId: true,
      rating: true,
    },
  });
  // return properties.map((property) => ({
  //   id: property.id,
  //   title: property.title,
  //   description: property.description,
  //   location: property.location,
  //   pricePerNight: property.pricePerNight,
  //   bedroomCount: property.bedroomCount,
  //   bathRoomCount: property.bathRoomCount,
  //   maxGuestCount: property.maxGuestCount,
  //   hostId: property.hostId,
  //   rating: property.rating || 0,
  //   amenities: property.amenities.map((amenity) => amenity.name),
  //   review: property.review.map((review) => review),
  //   // amenities: property.amenities.map((amenity) => amenity.name),
  // }));
};

export default getProperties;
