import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../Image";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 ROLE STATE
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Owner";
  });

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // 🧱 ROLE-BASED MENU
  const sidebarMenu = {
    Admin: [
      { name: "Dashboard", path: "/admin/home", icon: "material-symbols:dashboard-outline" },
      { name: "SOP Management", path: "/admin/sop/management", icon: "material-symbols:news-outline-rounded" },
      { name: "User Management", path: "/admin/user/management", icon: "material-symbols:group" },
      { name: "Task Oversight", path: "/admin/task/oversight", icon: "material-symbols:select-check-box" },
      { name: "Messaging", path: "/admin/messaging/oversight", icon: "material-symbols:chat-bubble-outline" },
      { name: "Subscription", path: "/admin/subscription", icon: "material-symbols:credit-card-outline" },
      { name: "Settings", path: "/admin/farm/settings", icon: "material-symbols:settings-outline" },
    ],
    Owner: [
      { name: "Dashboard", path: "/", icon: "material-symbols:dashboard-outline" },
      { name: "Farm Management", path: "/owner/farm/management", icon: "material-symbols:agriculture-outline" },
      { name: "Subscription", path: "/owner/subscription/plans", icon: "material-symbols:credit-card-outline" },
      { name: "Settings", path: "/owner/system/settings", icon: "material-symbols:settings-outline" },
    ],
  };

  const roleText = {
    Admin: { title: "Farm Check", name: "John Anderson", subtitle: "Farm Admin" },
    Owner: { title: "Farm Check", subtitle: "Platform Owner" },
  };

  const navLinks = sidebarMenu[role] || [];

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    navigate(newRole === "Admin" ? "/admin/home" : "/");
    if (window.innerWidth < 1536) onClose(); // mobile close
  };

  return (
    <>
      {/* 🔹 Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 2xl:hidden"
          onClick={onClose}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-[#364153]
        border-r border-[#E5E7EB]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        2xl:static 2xl:translate-x-0`}
      >
        {/* ❌ Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-md bg-[#F6A62D] text-white 2xl:hidden cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="flex h-full flex-col">
          {/* Logo + Role */}
          <div className="px-6 py-6 border-b border-[#E5E7EB]">
            <Image src="/logo.png" alt="Company Logo" />

            <p className="text-sm mt-4 text-[#4A5565]">
              {roleText[role]?.title}
            </p>

            {roleText[role]?.name && (
              <p className="text-sm text-[#6A7282] mt-2">
                {roleText[role]?.name}
              </p>
            )}

            <p className="text-xs text-[#F6A62D] bg-[#FFF6E9] inline-block px-2 py-1 rounded mt-2">
              {roleText[role]?.subtitle}
            </p>

            {/* 🔀 Role Switch */}
            <div className="mt-4 flex gap-2">
              {["Owner", "Admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer
                    ${
                      role === r
                        ? "bg-[#F6A62D] text-white"
                        : "bg-[#F1F5F9] text-[#364153]"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto hide-scrollbar px-3 py-4">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1536 && onClose()}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition 
                  ${
                    isActivePath(item.path)
                      ? "bg-[#FFF6E9] text-[#F6A62D]"
                      : "text-[#364153] hover:bg-[#F6A62D] hover:text-white"
                  }`}
              >
                <Icon icon={item.icon} width="20" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#E5E7EB]">
            <Link to="/auth/login" onClick={onClose}>
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#E7000B] hover:bg-[#F6A62D] hover:text-white transition cursor-pointer">
                <Icon icon="material-symbols:logout" width="20" />
                Log Out
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
