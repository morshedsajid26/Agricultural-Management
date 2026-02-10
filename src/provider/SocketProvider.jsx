import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config/api";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const reconnectTimeoutRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const connectSocket = () => {
      // Only connect if user exists and has an ID
      if (!user?.id) return;

      // Construct WS URL
      // Ensure we don't have double slashes if BASE_URL ends with /
      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
      const wsUrl = baseUrl.replace(/^http/, "ws") + `?userId=${user.id}`;
      
      console.log("Initializing WebSocket to:", wsUrl);

      try {
          const ws = new WebSocket(wsUrl);

          ws.onopen = () => {
            console.log("WebSocket connected");
            setSocket(ws);
            setError(null);
          };

          ws.onclose = (event) => {
            console.warn("WebSocket disconnected:", event.code, event.reason);
            setSocket(null);
            socketRef.current = null;
            
            // Reconnect logic
            if (user?.id) {
                 clearTimeout(reconnectTimeoutRef.current);
                 reconnectTimeoutRef.current = setTimeout(() => {
                     console.log("Attempting to reconnect WebSocket...");
                     connectSocket();
                 }, 3000);
            }
          };

          ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            setError(`Connection Failed to ${wsUrl}`);
            ws.close();
          };

          socketRef.current = ws;

      } catch (e) {
          console.error("WebSocket setup error:", e);
          setError(e.message);
      }
    };

    if (user?.id && !socketRef.current) {
        connectSocket();
    }

    return () => {
      if (socketRef.current) {
        console.log("Cleaning up WebSocket connection");
        socketRef.current.close();
        socketRef.current = null;
      }
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, error }}>
      {children}
    </SocketContext.Provider>
  );
};
