import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id)

        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
    const { province, adult, child, room, min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({ province: province }).limit(req.query.limit);
        const list = await Promise.all(
            hotels.map(async (hotel) => {
                const hotelRooms = await Room.find({ home_name: hotel.name });
                const totalRooms = hotelRooms.length;
                const totalAdults = hotelRooms.reduce((total, room) => total + room.adult, 0);
                const totalChildren = hotelRooms.reduce((total, room) => total + room.child, 0);
                if (totalRooms >= parseInt(room) && totalAdults >= parseInt(adult) && totalChildren >= parseInt(child)) {
                    return hotel;
                }
            })
        );
        // Convert min and max to numbers
        const minPrice = parseInt(min.replace(/\./g, ''));
        const maxPrice = parseInt(max.replace(/\./g, ''));
        let filteredList = list.filter((hotel) => {
            const cheapestPrice = parseInt(hotel?.cheapest_price?.replace(/\./g, ''));
            return cheapestPrice >= minPrice && cheapestPrice <= maxPrice;
        })

        if (req.query.score) {
            filteredList = filteredList.filter((hotel) =>
                parseFloat(hotel?.score) >= parseFloat(req.query.score),
            );
        }

        if (req.query.highlight) {
            filteredList = await Promise.all(
                filteredList.map(async (hotel) => {
                    const hotelRooms = await Room.find({ home_name: hotel.name }).lean().exec(); // Use exec() to get a regular array
                    const highlightsToCheck = Array.isArray(req.query.highlight) ? req.query.highlight : [req.query.highlight];

                    if (hotelRooms.some((room) => {
                        return room.highlights.some((highlight) => {
                            const highlightText = highlight.toLowerCase();
                            return highlightsToCheck.some((highlight) => highlightText.includes(highlight.toLowerCase()));
                        });
                    })) {
                        return hotel;
                    }
                }))
        }
        filteredList = filteredList.filter((item) => item); // Loại bỏ các giá trị undefined trong list
        res.status(200).json(filteredList);
    } catch (error) {
        next(error);
    }
}


export const countByProvince = async (req, res, next) => {
    const provinces = req.query.provinces.split(',');
    try {
        const list = await Promise.all(provinces.map(province => {
            return Hotel.countDocuments({ province: province })
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Room.find({ home_name: hotel.name })
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
