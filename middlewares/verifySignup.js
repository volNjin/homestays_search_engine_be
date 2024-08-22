import User from "../models/User.js";

const checkDuplicateEmail = (req, res, next) => {
  // Kiểm tra xem email đã tồn tại chưa
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

export default checkDuplicateEmail