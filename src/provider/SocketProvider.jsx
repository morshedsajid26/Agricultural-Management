import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config/api";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth(); // Assuming useAuth provides the current user

  useEffect(() => {
    // Only connect if user exists and has an ID
    if (user?.id) {
      // Prevent multiple connections if user reference changes but ID is same
      if (socket && socket.connected) return;

      console.log("Initializing socket for user:", user.id);

      const newSocket = io(BASE_URL, {
        query: { userId: user.id },
        transports: ["websocket"],
        reconnection: true,             // Enable reconnection
        reconnectionAttempts: 5,        // Limit attempts to avoid infinite spam
        reconnectionDelay: 1000,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });

      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
      };
    } else {
      // If no user, ensure socket is closed
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // Depend on user.id instead of user object to avoid loops

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
