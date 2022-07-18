import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateToken.js";

const register = async (req, res, next) => {
  try {
    // const { error } = signUpBodyValidation(req.body);
    // if (error)
    //   return res
    //     .status(400)
    //     .json({ error: true, message: error.details[0].message });

    const { firstname, lastname, username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    console.log(req.body);
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    console.log("---SUCCESS", user);

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    if (
      err.errors &&
      Object.keys(err.errors).length > 0 &&
      err.name === "ValidationError"
    ) {
      return res.status(422).json({ message: err.message });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("---USER", user);
    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user);
    delete user.password;
    console.log("---SUCCESS", user);

    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select({
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

export { register, login, getAllUsers };
