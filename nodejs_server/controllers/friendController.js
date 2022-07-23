import Friend from "../models/Friend.js";
import User from "../models/User.js";

const sendFriendRequest = async (req, res) => {
  console.log("test");
  try {
    requesterId = req.userId;
    const { recipientId } = req.body;
    console.log(
      requesterId,
      "***********************************",
      recipientId
    );
    const docFriend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 1 } },
      { upsert: true, new: true }
    );
    console.log(
      await User.findOneAndUpdate(
        { _id: { $in: [requesterId, recipientId] } },
        { $push: { friends: docFriend._id } }
      )
    );
    await User.findOneAndUpdate(
      { _id: { $in: [requesterId, recipientId] } },
      { $push: { friends: docFriend._id } }
    );

    console.log(docFriend);
    res.status(200).json({
      message: "Friend request sent",
      friend: recipientId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteFriend = async (req, res) => {
  requesterId = req.userId;

  const { recipientId } = req.body;

  Friend.findOneAndRemove({ requester: requesterId, recipient: recipientId });
  Friend.findOneAndRemove({ recipient: requesterId, requester: recipientId });
  res.status(200).json({
    message: "Friend deleted",
    // friend : recipientId,
  });
};

const accepteFriendRequest = async (req, res) => {
  try {
    requesterId = req.userId;

    const { recipientId } = req.body;

    const docFriend = Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 3 } }
    );
    await User.findOneAndUpdate(
      { _id: { $in: [requesterId, recipientId] } },
      { $pull: { friends: docFriend._id } }
    );

    res.status(200).json({
      message: "Friend request accepted",
      friend: recipientId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    requesterId = req.userId;
    const { recipientId } = req.body;

    const docFriend = Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 2 } }
    );
    await User.findOneAndUpdate(
      { _id: { $in: [recipientId] } },
      { $pull: { friends: docFriend._id } }
    );

    res.status(200).json({
      message: "Friend request rejected",
      friend: recipientId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  //   const docA = await Friend.findOneAndRemove(
  //     { requester: requesterId, recipient: recipientId }
  // )
  // const docB = await Friend.findOneAndRemove(
  //     { recipient: requesterId, requester: recipientId }
  // )
  // // update requester
  // await User.findOneAndUpdate(
  //     { _id: requesterId },
  //     { $pull: { friends: docA._id }}
  // )
  // // update recipient
  // const updateRecipient= await User.findOneAndUpdate(
  //     { _id: recipientId },
  //     { $pull: { friends: docB._id }}
  // )
};

const getAllFriends = async (req, res) => {
  try {
    userId = req.userId;
    const friends = User.findOne({ _id: userId }).populate("friends", {
      $or: [{ requester: userId }, { requester: userId }],
      status: 3,
    });
    res.status(200).json({
      message: "All friends",
      friends,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFriendStatus = async (req, res) => {
  try {
    const { currentUser, user } = req.body;

    const status = await Friend.findOne({
      $or: [
        { requester: currentUser, recipient: user },
        { requester: user, recipient: currentUser },
      ],
    }).select("status");

    if (!status) {
      return res.status(200).json({
        message: "not friends",
        friendStatus: status,
      });
    }

    return res.status(200).json({
      message: "Friend status",
      friendStatus: status,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  sendFriendRequest,
  deleteFriend,
  accepteFriendRequest,
  rejectFriendRequest,
  getAllFriends,
  getFriendStatus,
};
