import Friend from "../models/Friend.js";
import User from "../models/User.js";

const sendFriendRequest = async (req, res) => {
  console.log(req.body);
  try {
    const requesterId = req.userId;
    const { recipientId } = req.body;
    console.log(
      requesterId,
      "************test add***********************",
      recipientId
    );
    const docFriend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 1 } },
      { upsert: true, new: true }
    );
    await User.updateMany(
      { _id: { $in: [requesterId, recipientId] } },
      { $push: { friends: docFriend._id } }
    );

    res.status(200).json({
      message: "Friend request sent",
      friend: recipientId,
      status: docFriend.status,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteFriend = async (req, res) => {
  const requesterId = req.userId;

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
    const requesterId = req.userId;

    const { recipientId } = req.body;

    const docFriend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 3 } }
    );
    await User.updateMany(
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
    const requesterId = req.userId;
    const { recipientId } = req.body;

    const docFriend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { $set: { status: 2 } }
    );
    await User.updateMany(
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
    const userId = req.userId;
    const data = await User.findOne({ _id: userId }).populate("friends", {
      // match: { $or: [{ requester: userId }, { requester: userId }] },
      status: 3,
    });
    const friends = data.friends;
    console.log(friends);

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
    const user = req.userId;
    const { personId } = req.body;
    console.log("currentUser" + user);
    console.log("user" + personId);
    const status = await Friend.findOne({
      $or: [
        { requester: user, recipient: personId },
        { requester: personId, recipient: user },
      ],
      // $and: [
      //   { $or: [{ requester: currentUser, recipient: user }] },
      //   { $or: [{ requester: user, recipient: currentUser }] },
      // ],
    }).select("status");

    console.log("sdtatus : " + status);
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

const getAllFriendRequests = async (req, res) => {
  try {
    console.log("*******GeetAllFriends************");
    const { personId } = req.body;
    const data = await User.findOne({ _id: personId }).populate("friends", {
      status: 1,
    });
    const friends = data.friends;
    console.log("request*******************" + friends);

    res.status(200).json({
      message: "All friend requests",
      requests: friends,
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
  getAllFriendRequests,
};
