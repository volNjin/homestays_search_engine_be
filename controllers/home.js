import homeService from "../services/homeService.js";

export const getHomeById = async (req, res, next) => {
  try {
    const home = await homeService.getHomeById(req.params.id);
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};
export const getHomeByName = async (req, res) => {
  try {
    const home = await homeService.getHomeByName(req.params.homename);
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};
const isEnoughOccupancy = (rooms, neededOccupancy) => {
  const totalOccupancy = { agoda: 0, booking: 0, traveloka: 0 };

  rooms.forEach((room) => {
    for (const [platform, availabilities] of Object.entries(room.availables)) {
      if (availabilities) {
        availabilities.forEach((availability) => {
          totalOccupancy[platform] += availability.occupancy;
        });
      }
    }
  });
  return Object.values(totalOccupancy).some(
    (occupancy) => occupancy >= neededOccupancy
  );
};
export const getHomes = async (req, res, next) => {
  const { city, adult, child, room, min, max, ...others } = req.query;
  console.log(req.query);
  try {
    const homes = await homeService.findHomesByCity(city);
    console.log(homes);
    let filteredList = await Promise.all(
      homes.map(async (home) => {
        const homeRooms = home.rooms;
        if (
          homeRooms.length >= parseInt(room) &&
          isEnoughOccupancy(homeRooms, parseInt(adult) + parseInt(child))
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
            if (
              homeRooms.some((room) => {
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
    const list = await homeService.countHomesByCities(cities);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
