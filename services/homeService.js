import Home from "../models/Home.js";

const getHomeById = async (id) => {
  return Home.findById(id);
};

const getHomeByName = async (homename) => {
  return Home.findOne({ homename: homename });
};

const findHomesByCity = async (city) => {
  return Home.find({
    $or: [{ "city.vn": city }, { "city.en": city }],
  });
};

const countHomesByCities = async (cities) => {
  return Promise.all(
    cities.map((city) => {
      return Home.countDocuments({
        $or: [{ "city.vn": city }, { "city.en": city }],
      });
    })
  );
};

export default {
  getHomeById,
  getHomeByName,
  findHomesByCity,
  countHomesByCities,
};
