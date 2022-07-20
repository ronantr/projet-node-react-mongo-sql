import { io } from "socket.io-client";
import { host } from "./ApiRoutes";

let socket;

export const initiateSocketConnection = () => {
  socket = io(host);
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
