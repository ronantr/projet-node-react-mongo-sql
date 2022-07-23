import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: Number,
      enums: [
        // 0, //'add friend',
        1, //'requested',
        2, //'rejected',
        3, //'friends'
      ],
    },
  },
  { timestamps: true }
);
const Friend = mongoose.model("Friend", friendsSchema);
export default Friend;
