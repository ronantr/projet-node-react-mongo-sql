import mongoose from "mongoose";
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
    console.log("******  Accept   *************");
    const recipientId = req.userId;

    const { requesterId } = req.body;
    console.log("recipientId" + recipientId, "requesterId" + requesterId);

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
    const recipientId = req.userId;
    const { requesterId } = req.body;

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
};

// const getAllFriends = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const data = await User.findOne({ _id: userId }).populate("friends", {
//       // match: { $or: [{ requester: userId }, { requester: userId }] },
//       status: 3,
//     });
//     const friends = data.friends;
//     console.log(friends);

//     res.status(200).json({
//       message: "All friends",
//       friends,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

const getAllFriends = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await User.aggregate([
      {
        $match: {
          _id: { $eq: mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $lookup: {
          from: Friend.collection.name,
          let: { friends: "$friends" },
          pipeline: [
            {
              $match: {
                status: 3,
              },
            },
            { $project: { status: 1 } },
          ],
          as: "friends",
        },
      },
      {
        $addFields: {
          friendsStatus: {
            $ifNull: ["$friends.status", 0],
          },
        },
      },
      {
        $project: {
          username: 1,
          friendsStatus: 1,
        },
      },
    ]);

    const friends = data;

    console.log("All friends*******************" + JSON.stringify(friends));

    res.status(200).json({
      message: "All friend requests",
      friends: friends,
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

// const getAllFriendRequests = async (req, res) => {
//   try {
//     console.log("*******GeetAllFriends************");
//     const userId = req.userId;
// const data = await User.findOne({ _id: userId })
//   .populate("friends", {
//     status: 1,
//   })

//     const data = await User.aggregate([
//       {
//         $match: {
//           _id: { $eq: mongoose.Types.ObjectId(userId) },
//         },
//       },
//       { $project: { friends: 1, username: 1 } },
//       // { $unwind: "$friends" },
//       {
//         $lookup: {
//           from: Friend.collection.name,
//           let: { friends: "$friends" },
//           pipeline: [
//             {
//               $match: {
//                 // recipient: mongoose.Types.ObjectId(userId),
//                 status: 1,

//                 // $expr: { $in: ["$_id", "$$friends"] },
//               },
//             },
//             // {
//             //   $lookup: {
//             //     from: User.collection.name,
//             //     pipeline: [
//             //       {
//             //         $match: {
//             //           recipient: mongoose.Types.ObjectId(userId),
//             //         },
//             //       },
//             //     ],
//             //     as: "user",
//             //   },
//             // },
//             {
//               $project: {
//                 frienId: {
//                   $cond: [{ $eq: [$$friends, userId] }, $requester, $recipient],
//                 },
//                 recipient: 1,
//                 requester: 1,
//                 status: 1,
//               },
//             },
//           ],
//           as: "friends",
//         },
//       },
//       // {
//       //   $addFields: {
//       //     friendsStatus: {
//       //       $ifNull: [{ $min: "$friends.status" }, 0],
//       //     },
//       //     frienId: {
//       //       $cond: [
//       //         { $eq: ["$friends.recipient", userId] },
//       //         "$friends.requester",
//       //         "$friends.recipient",
//       //       ],
//       //     },
//       //   },
//       // },
//       // {
//       //   $project: {
//       //     username: 1,

//       //   },
//       // },
//     ]);
//     const friends = data;

//     console.log("request*******************" + JSON.stringify(friends));

//     res.status(200).json({
//       message: "All friend requests",
//       requests: friends,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

const getAllFriendRequests = async (req, res) => {
  try {
    console.log("*******Get All Friends Requests************");
    const userId = req.userId;
    const data = await User.aggregate([
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $lookup: {
          from: Friend.collection.name,
          let: { friends: "$friends" },
          pipeline: [
            {
              $match: {
                recipient: mongoose.Types.ObjectId(userId),
                $expr: { $in: ["$_id", "$$friends"] },
              },
            },
            { $project: { status: 1 } },
          ],
          as: "friends",
        },
      },
      {
        $addFields: {
          friendsStatus: {
            $ifNull: [{ $min: "$friends.status" }, 0],
          },
        },
      },
      {
        $project: {
          username: 1,
          friendsStatus: 1,
        },
      },
      {
        $match: {
          friendsStatus: { $eq: 1 },
        },
      },
    ]);

    const friends = data;

    console.log("request*******************" + JSON.stringify(friends));

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

export const getPeopleWithFriendStatusWithUser = async (req, res) => {
  try {
    console.log("*******Get All People with friends status************");
    const userId = req.userId;
    const data = await User.aggregate([
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $lookup: {
          from: Friend.collection.name,
          let: { friends: "$friends" },
          pipeline: [
            {
              $match: {
                recipient: mongoose.Types.ObjectId(userId),
                $expr: { $in: ["$_id", "$$friends"] },
              },
            },
            { $project: { status: 1 } },
          ],
          as: "friends",
        },
      },
      {
        $addFields: {
          friendsStatus: {
            $ifNull: [{ $min: "$friends.status" }, 0],
          },
        },
      },
      {
        $project: {
          username: 1,
          friendsStatus: 1,
        },
      },
    ]);

    const friends = data;

    console.log("request*******************" + JSON.stringify(friends));

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
