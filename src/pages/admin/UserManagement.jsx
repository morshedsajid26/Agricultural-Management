import React, { useState } from "react";
import Breadcrumb from "../../components/Bredcumb";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";

const UserManagement = () => {
  // 🔹 Raw users data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      role: "Manager",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@gmail.com",
      role: "Employee",
      status: "Inactive",
    joinDate: "2022-11-22",
    },
  ];

  // 🔍 Search state
  const [search, setSearch] = useState("");

  // 🔹 Filtered rows (TableRows)
  const filteredData = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 TableHeads EXACTLY how Table expects
  const TableHeads = [
    {
      Title: "Name",
      key: "name",
      width: "15%",
    },
    {
      Title: "Email",
      key: "email",
      width: "15%",
    },
    {
      Title: "Role",
      key: "role",
      width: "15%",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            row.status === "Active"
              ? "bg-[#F3E8FF] text-[#8200DB]"
              : "bg-[#DBEAFE] text-[#1447E6]"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      Title: "Status",
      key: "status",
      width: "15%",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            row.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
        Title: "Join Date",
        key: "joinDate",
        width: "15%",
    },
    {
      Title: "Actions",
      key: "actions",
      width: "15%",
      render: (row) => (
        <button className="text-blue-600 hover:underline">Edit</button>
      ),
    },
      
  ];

  return (
    <div>
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb />
          <p className="text-[#4A5565] mt-1.5">
            Manage employees and managers for Farm check
          </p>
        </div>

        <button className="bg-[#F6A62D] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#e5942b] cursor-pointer">
          <FaPlus />
          Add User
        </button>
      </div>

      {/* ===== Search ===== */}
      <div className="relative mt-6">
        <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-[#99A1AF]" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[40%] pl-10 p-4 border border-[#D1D5DC] rounded-md outline-none text-[#0A0A0A]/50 placeholder:text-[#0A0A0A]/50"
        />
      </div>

      {/* ===== Stats + Table ===== */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-4 bg-white p-6 rounded-lg border-2 border-[#E5E7EB]">
          <p className="text-[#4A5565]">Total Users</p>
          <p className="text-xl font-semibold text-[#0A0A0A] my-1">
            {users.length}
          </p>
        </div>

        <div className="col-span-4 bg-white p-6 rounded-lg border-2 border-[#E5E7EB]">
          <p className="text-[#4A5565]">Active Users</p>
          <p className="text-xl font-semibold text-[#00A63E] my-1">
            {users.filter((u) => u.status === "Active").length}
          </p>
        </div>

        <div className="col-span-4 bg-white p-6 rounded-lg border-2 border-[#E5E7EB]">
          <p className="text-[#4A5565]">Managers</p>
          <p className="text-xl font-semibold text-[#155DFC] my-1">
            {users.filter((u) => u.role === "Manager").length}
          </p>
        </div>

        {/* ===== Table ===== */}
        <div className="col-span-12 bg-white rounded-lg border-2 border-[#E5E7EB] text-black">
          <Table
            TableHeads={TableHeads}
            TableRows={filteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
