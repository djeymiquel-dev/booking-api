import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
const getPropertyById = async (id) => {
  console.log("get id propery", id);

  const property = await prisma.property.findUnique({
    where: {
      id,
    },

    include: {
      amenities: true,
      bookings: true,
      reviews: true,
    },
  });

  // if (!property ) {
  //   throw new NotFoundError("Property", id);
  // }
  return property;

  // if (!property) {
  //   return {
  //     id, // geef het gevraagde id gewoon terug
  //     title: null,
  //     description: null,
  //     location: null,
  //     pricePerNight: null,
  //     bedroomCount: null,
  //     bathRoomCount: null,
  //     maxGuestCount: null,
  //     hostId: null,
  //     rating: 0,
  //     amenities: [],
  //     review: [],
  //   };
  // }

  // return {
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
  //   // amenities: property.amenities.map((a) => a.name),
  //   review: property.review,
  // };

  // return {
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
  //   review: property.review,
  // };
};

export default getPropertyById;
