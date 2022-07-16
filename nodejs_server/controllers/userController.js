const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    console.log(user);

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

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }
    delete user.password;
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
