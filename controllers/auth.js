import authService from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(200).send(result);
  } catch (error) {
    if (error.message === "USER_EXISTED") {
      res.status(400).send({ message: "USER_EXISTED" });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
};

export const signin = async (req, res) => {
  try {
    const result = await authService.signin(req.body);
    res.status(200).send(result);
  } catch (error) {
    if (error.message === "INVALID_EMAIL") {
      res.status(404).send({ message: "INVALID_EMAIL" });
    } else if (error.message === "INVALID_PASSWORD") {
      res.status(401).send({
        accessToken: null,
        message: "INVALID_PASSWORD",
      });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
};
