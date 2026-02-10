import React, { useState, useEffect } from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useSocket } from "../../provider/SocketProvider";

import { useSearchParams } from "react-router-dom";

export default function Inbox() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const currentUserRole = "admin";

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("conversation");

  const setSelectedId = (id) => {
      const newParams = new URLSearchParams(searchParams);
      if (id) {
          newParams.set("conversation", id);
      } else {
          newParams.delete("conversation");
      }
      setSearchParams(newParams);
  };

  const [newMessage, setNewMessage] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");
  // Removed local messages state to avoid duplication and loops

  // =========================
  // 📥 GET CONVERSATIONS
  // =========================
  const { data: conversations = [] } = useQuery({
    queryKey: ["inboxConversations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/farm-admin/messages/inbox");

      return (res.data.data || []).map((item) => ({
        id: item.userId,
        name: item.name,
        role: item.jobTitle || "User",
        avatar: item.name?.charAt(0),
        unread: item.unreadCount > 0,
        lastMessage: item.lastMessage,
        lastMessageAt: item.lastMessageAt,
      }));
    },
  });

  // =========================
  // 📥 GET MESSAGES FOR SELECTED CONVERSATION
  // =========================
  const { data: messages = [] } = useQuery({
    queryKey: ["conversationMessages", selectedId],
    queryFn: async () => {
        if (!selectedId) return [];
        const res = await axiosSecure.get(`/farm-admin/messages/history/${selectedId}`);
        return res.data.data || []; 
    },
    enabled: !!selectedId, 
  });

  // =========================
  // 🔌 SOCKET LISTENERS
  // =========================
  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on("receive_message", (newMessage) => {
        console.log("New message received:", newMessage);

        // Check if the message belongs to the currently selected conversation
        // Case 1: Message is FROM the selected user (Incoming) -> newMessage.senderId === selectedId
        // Case 2: Message is TO the selected user (Outgoing from another tab) -> newMessage.receiverId === selectedId
        const isRelatedToCurrentChat = selectedId && (newMessage.senderId === selectedId || newMessage.receiverId === selectedId);

        if (isRelatedToCurrentChat) {
            queryClient.setQueryData(["conversationMessages", selectedId], (oldMessages = []) => {
                // Prevent duplicates if socket fires multiple times
                const isDuplicate = oldMessages.some(m => m.id === newMessage.id);
                if (isDuplicate) return oldMessages;
                return [...oldMessages, newMessage];
            });
        }
        
        // Refresh conversation list to show new last message/unread count
        queryClient.invalidateQueries(["inboxConversations"]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, selectedId, queryClient]);


  // =========================
  // ✉ SEND MESSAGE
  // =========================
  /* ===== MEDIA UPLOAD STATE ===== */
  const [selectedFile, setSelectedFile] = useState(null);

  // =========================
  // ✉ SEND MESSAGE
  // =========================
  const sendMutation = useMutation({
    mutationFn: async () => {
      // If we have a file, use FormData
      if (selectedFile) {
          const formData = new FormData();
          formData.append("receiverId", selectedId);
          formData.append("content", newMessage); // Message text is optional but good to send
          formData.append("image", selectedFile); // Assuming backend expects "image" or "file"

          return await axiosSecure.post("/farm-admin/messages", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
      }

      // Otherwise, standard JSON for text-only
      return await axiosSecure.post("/farm-admin/messages", {
        receiverId: selectedId,
        content: newMessage,
      });
    },
    onSuccess: (data) => {
      // Optimistically update or rely on socket
      setNewMessage("");
      setSelectedFile(null);
      setImagePreview(null);
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const selectedConversation = conversations.find(
    (c) => c.id === selectedId
  );

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ===============================
  // 📥 INBOX VIEW (DESIGN UNCHANGED)
  // ===============================
  if (!selectedConversation) {
    return (
      <>
        <div className="relative  mb-6 bg-white rounded-lg border-2 border-[#E5E7EB] p-6">
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-10 text-[#99A1AF]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search conversation..."
            className="w-full pl-10 p-4 border border-[#D1D5DC] rounded-md outline-none text-[#0A0A0A]/50 placeholder:text-[#0A0A0A]/50"
          />
        </div>

        <div className="bg-white border rounded-lg">
          <div className="px-4 py-5 border-b border-[#0a0a0a]/10 text-[#0A0A0A] flex items-center gap-2">
            <FiMessageSquare className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Inbox</h3>
          </div>

          <div className="h-[535px] overflow-y-scroll hide-scrollbar">
            {filteredConversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex items-start gap-4 px-4 py-5 border-b cursor-pointer
                  ${
                    c.unread
                      ? "bg-orange-50 hover:bg-orange-100"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {c.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-[#0A0A0A]">{c.name}</p>
                    <span className="text-sm text-gray-400">
                      {new Date(c.lastMessageAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {c.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  const manager = selectedConversation.name;

  // ===============================
  // 💬 CONVERSATION VIEW (DESIGN UNCHANGED)
  // ===============================
  return (
    <div className="flex flex-col  rounded-lg h-[740px]">
      <div className="flex items-center gap-3 px-4 py-5 border-b bg-white">
        <button
          onClick={() => setSelectedId(null)}
          className="text-xl text-[#0A0A0A]"
        >
          <FaArrowLeft />
        </button>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {selectedConversation.avatar}
        </div>

        <div className="flex-1">
          <p className="font-medium text-sm text-[#0A0A0A]">
            {selectedConversation.name}
          </p>
          <p className="text-xs text-gray-500">
            {selectedConversation.role}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto hide-scrollbar">
        {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
            Start messaging {manager}
            </div>
        ) : (
            messages.map((msg, index) => {
                const isMe = msg.senderId === "admin" || !msg.senderId; // Adjust logic based on real ID
                // For now, assuming if it's not from the selected user, it's from me
                const isRightSide = msg.senderId !== selectedId; 

                return (
                    <div key={index} className={`flex ${isRightSide ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] ${isRightSide ? "text-right" : "text-left"}`}>
                            <div className={`px-4 py-2 rounded-lg text-base ${isRightSide ? "bg-[#F6A62D] text-white rounded-br-none" : "bg-[#F3F4F6] text-[#101828] rounded-bl-none"}`}>
                                {msg.image && (
                                    <div className="mb-2">
                                        {msg.image.endsWith(".mp4") || msg.image.endsWith(".webm") ? (
                                             <video src={msg.image} controls className="max-w-full rounded-md" />
                                        ) : (
                                            <img src={msg.image} alt="attachment" className="max-w-full rounded-md" />
                                        )}
                                    </div>
                                )}
                                {msg.content}
                                <p className="text-xs mt-1 opacity-70 text-right">{new Date(msg.createdAt || Date.now()).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        )}
      </div>

      {currentUserRole === "admin" && (
        <div className="p-4 border-t space-y-2">
          {imagePreview && (
            <div className="relative w-25 h-25  overflow-hidden">
             {selectedFile?.type.startsWith("video/") ? (
                 <video src={imagePreview} className="rounded-md border w-full h-full object-cover" controls={false} />
             ) : (
                <img src={imagePreview} alt="" className="rounded-md border w-full h-full object-cover" />
             )}
              
              <button
                onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                }}
                className="absolute top-0 right-0 bg-[#F6A62D] text-white w-5 h-5 rounded-full text-sm flex items-center justify-center cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex gap-2 px-1.5 items-center border border-[#0A0A0A]/10 rounded-full">
            <label className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-[#F6A62D]">
              <input
                type="file"
                accept="image/*, video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                      setSelectedFile(file);
                      setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              <AiFillPicture className="w-5 h-5" />
            </label>

            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (newMessage.trim()) sendMutation.mutate();
                }
              }}
              className="flex-1  text-[#0A0A0A] rounded-md px-3 py-3 outline-0"
              placeholder="Type message..."
            />

            <button
              onClick={() => {
                if (newMessage.trim()) sendMutation.mutate();
              }}
              className="bg-[#F6A62D] rounded-full text-white px-2 py-2 cursor-pointer"
            >
              <IoSend className="w-5 h-5 " />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
