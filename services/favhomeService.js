import Favhome from "../models/Favhome.js";

const findFavhome = async (userId, homename) => {
  return Favhome.findOne({ user_id: userId, homename: homename });
};

const createFavhome = async (favhomeData) => {
  const favhome = new Favhome(favhomeData);
  return favhome.save();
};

const deleteFavhome = async (userId, homename) => {
  return Favhome.findOneAndDelete({ user_id: userId, homename: homename });
};

const getFavhomesByUserId = async (userId) => {
  return Favhome.find({ user_id: userId });
};

export default {
  findFavhome,
  createFavhome,
  deleteFavhome,
  getFavhomesByUserId,
};
