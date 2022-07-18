import mongoose from "mongoose";

const Schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
});

const User = mongoose.model("User", Schema);
export default User;
