import User from "../models/User.js";

const getUserById = async (userId) => {
  return User.findById(userId);
};

export default {
  getUserById,
};
