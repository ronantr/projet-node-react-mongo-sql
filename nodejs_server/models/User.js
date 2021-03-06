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
  profile_pic: {
    type: String,
    required: false,
  },
  cover_pic: {
    type: String,
    required: false,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
    },
  ],
});

const User = mongoose.model("User", Schema);
export default User;
