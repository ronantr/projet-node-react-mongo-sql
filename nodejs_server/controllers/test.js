import Friend from "../models/Friend.js";
import User from "../models/User.js";

 const sendFriendResuest = (req, res) => {
  const { requesterId, recipientId } = req.body;

  const docA = await Friend.findOneAndUpdate(
    { requester: requesterId, recipient: recipientId },
    { $set: { status: 1 }},
    { upsert: true, new: true }
)
const docB = await Friend.findOneAndUpdate(
  { recipient: recipientId, requester: requesterId },
  { $set: { status: 2 }},
  { upsert: true, new: true }
)
// update requester
await User.findOneAndUpdate(
  { _id: requesterId },
  { $push: { friends: docA._id }}
)
// update recipient
await User.findOneAndUpdate(
  { _id: recipientId },
  { $push: { friends: docB._id }}
)
res.status(200).json({
        message: "Friend request sent",
        friend : recipientId,
      });
};

const deleteFriend = (req, res) => {
  const { requesterId, recipientId } = req.body;

  Friend.findOneAndRemove(
    { requester: requesterId, recipient: recipientId }
)
Friend.findOneAndRemove(
    { recipient: requesterId, requester: recipientId }
)
res.status(200).json({
  message: "Friend deleted",
  // friend : recipientId,
});
};

const accepteFriendRequest = (req, res) => {
  const { requesterId, recipientId } = req.body;

  Friend.findOneAndUpdate(
    { requester: requesterId, recipient: recipientId },
    { $set: { status: 3 }}
)
Friend.findOneAndUpdate(
    { recipient: requesterId,requester: recipientId },
    { $set: { status: 3 }}
)

// update requester
await User.findOneAndUpdate(
  { _id: requesterId },
  { $pull: { friends: docA._id }}
)
// update recipient
const updateRecipient= await User.findOneAndUpdate(
  { _id: recipientId },
  { $pull: { friends: docB._id }}
)

res.status(200).json({
  message: "Friend request accepted",
  friend : recipientId,
});
}

const rejectFriendRequest = (req, res) => {
  const docA = await Friend.findOneAndRemove(
    { requester: requesterId, recipient: recipientId }
)
const docB = await Friend.findOneAndRemove(
    { recipient: requesterId, requester: recipientId }
)
// update requester
await User.findOneAndUpdate(
    { _id: requesterId },
    { $pull: { friends: docA._id }}
)
// update recipient
const updateRecipient= await User.findOneAndUpdate(
    { _id: recipientId },
    { $pull: { friends: docB._id }}
)

};

const getAllFriends = (req, res) => {};


export { sendFriendResuest, deleteFriend, accepteFriendRequest, rejectFriendRequest, getAllFriends };