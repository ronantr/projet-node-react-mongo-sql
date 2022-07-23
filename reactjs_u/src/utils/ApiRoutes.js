const host = "http://localhost:4001";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getAllUsersRoute = `${host}/api/auth/allUsers`;
export const getAllMessagesRoute = `${host}/api/messages/allMessages`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;

export const sendFriendRequestRoute = `${host}/api/friend/send-friend-request`;
export const accepteFriendRequestRoute = `${host}/api/friend/accept-friend-request`;
export const rejectFriendRequestRoute = `${host}/api/friend/reject-friend-request`;
export const getAllFriendsRoute = `${host}/api/friend/all`;
export const deleteFriendRoute = `${host}/api/friend/`;
export const getFriendStatusRoute = `${host}/api/friend/friendStatus`;