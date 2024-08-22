import userService from "../services/userService.js";
import favhomeService from "../services/favhomeService.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user_id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addFavhome = async (req, res) => {
  try {
    const { user_id, homename, homephoto } = req.body;

    const savedFavhome = await favhomeService.findFavhome(user_id, homename);
    if (!savedFavhome) {
      await favhomeService.createFavhome({ user_id, homename, homephoto });
      res.status(201).send({ message: "Favhome added successfully" });
    } else {
      res.status(400).json({ message: "Favhome already exists" });
    }
  } catch (error) {
    console.error("Error adding favhome:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFavhome = async (req, res) => {
  try {
    const { user_id, homename } = req.body;
    const favhome = await favhomeService.deleteFavhome(user_id, homename);

    if (!favhome) {
      return res.status(404).json({ message: "Favhome not found" });
    }

    res.status(200).json({ message: "Favhome removed successfully" });
  } catch (err) {
    console.error("Error removing favhome:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFavhomes = async (req, res) => {
  const userId = req.userId;
  try {
    const favhomes = await favhomeService.getFavhomesByUserId(userId);
    res.status(200).send(favhomes);
  } catch (err) {
    console.error("Error fetching favhomes:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

