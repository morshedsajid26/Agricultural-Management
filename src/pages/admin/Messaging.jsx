import React, { useMemo, useState } from "react";
import Breadcrumb from "../../components/Bredcumb";
import { FaSearch } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import Pagination from "../../components/Pagination";

const initialMessages = [
  {
    id: 1,
    from: "Sarah Johnson",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "Equipment maintenance completed as requested.",
    time: "2026-01-07 14:30",
    unread: false,
  },
  {
    id: 2,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Jan de Vries",
    toRole: "Employee",
    text: "Please check the irrigation system in sector B.",
    time: "2026-01-07 13:15",
    unread: false,
  },
  {
    id: 3,
    from: "Jan de Vries",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "I need clarification on the new safety SOP.",
    time: "2026-01-07 10:45",
    unread: true,
  },
  {
    id: 4,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Sarah Johnson",
    toRole: "Employee",
    text: "Great work on the weekly report!",
    time: "2026-01-06 16:20",
    unread: false,
  },
  {
    id: 5,
    from: "Sarah Johnson",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "Equipment maintenance completed as requested.",
    time: "2026-01-07 14:30",
    unread: false,
  },
  {
    id: 6,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Jan de Vries",
    toRole: "Employee",
    text: "Please check the irrigation system in sector B.",
    time: "2026-01-07 13:15",
    unread: false,
  },
  {
    id: 7,
    from: "Jan de Vries",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "I need clarification on the new safety SOP.",
    time: "2026-01-07 10:45",
    unread: true,
  },
  {
    id: 8,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Sarah Johnson",
    toRole: "Employee",
    text: "Great work on the weekly report!",
    time: "2026-01-06 16:20",
    unread: false,
  },
  {
    id: 9,
    from: "Sarah Johnson",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "Equipment maintenance completed as requested.",
    time: "2026-01-07 14:30",
    unread: false,
  },
  {
    id: 10,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Jan de Vries",
    toRole: "Employee",
    text: "Please check the irrigation system in sector B.",
    time: "2026-01-07 13:15",
    unread: false,
  },
  {
    id: 11,
    from: "Jan de Vries",
    fromRole: "Employee",
    to: "Tom Wilson",
    toRole: "Manager",
    text: "I need clarification on the new safety SOP.",
    time: "2026-01-07 10:45",
    unread: true,
  },
  {
    id: 12,
    from: "Tom Wilson",
    fromRole: "Manager",
    to: "Sarah Johnson",
    toRole: "Employee",
    text: "Great work on the weekly report!",
    time: "2026-01-06 16:20",
    unread: false,
  },
];

const Messaging = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 📊 counts
  const totalMessages = messages.length;
  const unreadCount = messages.filter((m) => m.unread).length;

  // 🔍 search filter
  const filteredMessages = useMemo(() => {
    return messages.filter(
      (m) =>
        m.text.toLowerCase().includes(search.toLowerCase()) ||
        m.from.toLowerCase().includes(search.toLowerCase()) ||
        m.to.toLowerCase().includes(search.toLowerCase())
    );
  }, [messages, search]);

  // 🗑 delete single
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // ❌ clear all
  const clearAll = () => {
    setMessages([]);
  };
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredMessages.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <div>
        <Breadcrumb />
        <p className="text-[#4A5565] mt-1.5">
          Monitor communication between employees and managers
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className=" p-6 bg-white rounded-lg border-2 border-[#E5E7EB] col-span-4">
          <p className="text-sm text-gray-500">Total Messages</p>
          <p className={`text-2xl text-[#0A0A0A] font-semibold mt-1 `}>
            {totalMessages}
          </p>
        </div>

        <div className=" p-6 bg-white rounded-lg border-2 border-[#E5E7EB] col-span-4">
          <p className="text-sm text-gray-500">Unread Messages</p>
          <p className={`text-2xl text-[#F54900] font-semibold mt-1 `}>
            {unreadCount}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-[#E5E7EB] p-6 col-span-4 ">
          <div>
            <p className="text-sm text-gray-500">Messaging Status</p>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`w-11 h-6 rounded-full flex items-center px-1 ${
                  enabled
                    ? " border-2 border-[#00A63E]"
                    : "border-2 border-red-600"
                }`}
              >
                <span
                  className={`border-2 border-[#00A63E] w-4 h-4 rounded-full transform transition ${
                    enabled ? "translate-x-4 " : "border-red-600 border"
                  }`}
                />
              </button>
              <p
                className={`font-medium ${
                  enabled ? "text-[#00A63E]" : "text-red-600"
                }`}
              >
                {enabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== SEARCH + CLEAR ===== */}

        <div className="relative col-span-8">
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 p-4 border border-[#D1D5DC] rounded-md outline-none text-[#0A0A0A]/50 placeholder:text-[#0A0A0A]/50"
          />
        </div>

        <div className="col-span-4 flex justify-end items-center">
          <button
            onClick={clearAll}
            className="bg-[#E7000B]  text-white px-4 py-3 rounded-lg whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <FiTrash2 size={20} />
            Clear All Messages
          </button>
        </div>

        {/* ===== MESSAGE LIST ===== */}
        <div className="bg-white rounded-lg border-2 border-[#E5E7EB] overflow-hidden col-span-12">
          {paginatedData.length === 0 ? (
            <p className="text-center py-10 text-gray-400">No messages found</p>
          ) : (
            paginatedData.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 border-b border-[#E5E7EB] flex justify-between gap-4 ${
                  msg.unread ? "bg-orange-50" : "bg-white"
                }`}
              >
                <div className="space-y-1">
                  <p className=" text-[#101828]">
                    {msg.from} ({msg.fromRole}) → {msg.to} ({msg.toRole})
                    {msg.unread && (
                      <span className="ml-2 text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded">
                        Unread
                      </span>
                    )}
                  </p>

                  <p className="text-[#364153] space-y-2">{msg.text}</p>
                  <p className="text-xs text-[#6A7282]">{msg.time}</p>
                </div>

                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Messaging;
