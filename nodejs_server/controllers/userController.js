import User from "../models/User.js";

export const getUserById = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: { $eq: req.params.id } }).select({
      password: 0,
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select({
      email: 1,
      username: 1,
      firstname: 1,
      lastname: 1,
    });
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update user
export const updateUser = async (req, res) => {
  if (req.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

//delete user
export const deleteUser = async (req, res) => {
  if (req.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};
