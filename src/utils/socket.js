import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:3000");
  } else {
    return io("/");
  }
};