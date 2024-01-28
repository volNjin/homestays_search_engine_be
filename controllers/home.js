import Home from "../models/Home.js";

export const getHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};
const countOccupancy = (rooms) => {
  const totalOccupancy = rooms.reduce((acc, room) => {
    if (room.availables && room.availables.length > 0) {
      const roomOccupancy = room.availables.reduce(
        (roomAcc, available) => roomAcc + parseInt(available.occupancy || 0),
        0
      );
      return acc + roomOccupancy;
    }
    return acc;
  }, 0);
  return totalOccupancy;
};
export const getHomes = async (req, res, next) => {
  const { city, adult, child, room, min, max, ...others } = req.query;
  try {
    const homes = await Home.find({
      $or: [{ "city.vn": city }, { "city.en": city }],
    }).limit(req.query.limit);
    let filteredList = await Promise.all(
      homes.map(async (home) => {
        const homeRooms = home.rooms;
        const agodaRooms = homeRooms.agoda;
        const bookingRooms = homeRooms.booking;
        const travelokaRooms = homeRooms.traveloka;

        if (
          (agodaRooms.length >= parseInt(room) &&
            countOccupancy(agodaRooms) >= parseInt(adult) + parseInt(child)) ||
          (bookingRooms.length >= parseInt(room) &&
            countOccupancy(bookingRooms) >=
              parseInt(adult) + parseInt(child)) ||
          (travelokaRooms.length >= parseInt(room) &&
            countOccupancy(travelokaRooms) >= parseInt(adult) + parseInt(child))
        ) {
          return home;
        }
      })
    );
    // Convert min and max to numbers
    const minPrice = parseInt(min.replace(/\./g, ""));
    const maxPrice = parseInt(max.replace(/\./g, ""));
    filteredList = await Promise.all(
      filteredList.map(async (home) => {
        const agoda_cheapest_price = parseInt(
          (home?.cheapest_prices?.agoda || "0").replace(/\./g, "")
        );
        const booking_cheapest_price = parseInt(
          (home?.cheapest_prices?.booking || "0").replace(/\./g, "")
        );
        const traveloka_cheapest_price = parseInt(
          (home?.cheapest_prices?.traveloka || "0").replace(/\./g, "")
        );

        if (
          (agoda_cheapest_price >= minPrice &&
            agoda_cheapest_price <= maxPrice) ||
          (booking_cheapest_price >= minPrice &&
            booking_cheapest_price <= maxPrice) ||
          (traveloka_cheapest_price >= minPrice &&
            traveloka_cheapest_price <= maxPrice)
        )
          return home;
      })
    );

    if (req.query.rating) {
      filteredList = filteredList.filter((home) => {
        const agoda_rating = parseFloat(home?.ratings?.agoda || "0");
        const booking_rating = parseFloat(home?.ratings?.booking || "0");
        const traveloka_rating = parseFloat(
          (home?.ratings?.traveloka || "0").replace(/\./g, ",")
        );
        return (
          parseFloat(agoda_rating) >= parseFloat(req.query.rating) ||
          parseFloat(booking_rating) >= parseFloat(req.query.rating) ||
          parseFloat(traveloka_rating) >= parseFloat(req.query.rating)
        );
      });
    }

    if (req.query.facility) {
      filteredList = await Promise.all(
        filteredList.map(async (home) => {
          if (home != undefined) {
            const facilitiesToCheck = Array.isArray(req.query.facility)
              ? req.query.facility
              : [req.query.facility];
            const homeRooms = home.rooms;
            const agodaRooms = homeRooms.agoda;
            const bookingRooms = homeRooms.booking;
            const travelokaRooms = homeRooms.traveloka;
            if (
              agodaRooms.some((room) => {
                return facilitiesToCheck.every((facility) => {
                  const facilityText = facility.toLowerCase();
                  return room.facilities.some((facility) =>
                    facility.toLowerCase().includes(facilityText)
                  );
                });
              }) ||
              bookingRooms.some((room) => {
                return facilitiesToCheck.every((facility) => {
                  const facilityText = facility.toLowerCase();
                  return room.facilities.some((facility) =>
                    facility.toLowerCase().includes(facilityText)
                  );
                });
              }) ||
              travelokaRooms.some((room) => {
                return facilitiesToCheck.every((facility) => {
                  const facilityText = facility.toLowerCase();
                  return room.facilities.some((facility) =>
                    facility.toLowerCase().includes(facilityText)
                  );
                });
              })
            ) {
              return home;
            }
          }
        })
      );
    }
    filteredList = filteredList.filter((item) => item); // Loại bỏ các giá trị undefined trong list
    res.status(200).json(filteredList);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Home.countDocuments({
          $or: [{ "city.vn": city }, { "city.en": city }],
        });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
