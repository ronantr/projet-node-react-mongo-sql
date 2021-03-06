import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      isModerated: {
        type: Boolean,
        default: false,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", Schema);
export default Message;
