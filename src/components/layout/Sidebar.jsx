import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../Image";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  // ROLE (ONLY READ FROM LOCALSTORAGE)
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (!savedRole) {
      navigate("/auth/login");
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  //  ROLE-BASED MENU
  const sidebarMenu = {
    Admin: [
      { name: "Dashboard", path: "/admin/home", icon: "material-symbols:dashboard-outline" },
      { name: "SOP Management", path: "/admin/sop/management", icon: "material-symbols:news-outline-rounded" },
      { name: "User Management", path: "/admin/user/management", icon: "material-symbols:group" },
      { name: "Task Oversight", path: "/admin/task/oversight", icon: "material-symbols:select-check-box" },
      { name: "Messaging", path: "/admin/messaging/oversight", icon: "material-symbols:chat-bubble-outline" },
      { name: "Subscription", path: "/admin/subscription/billing", icon: "material-symbols:credit-card-outline" },
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

  //  LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    navigate("/auth/login");
  };

  if (!role) return null; // prevent flicker

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 2xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-[#364153]
        border-r border-[#E5E7EB]
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        2xl:static 2xl:translate-x-0`}
      >
        {/* Mobile Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-md bg-[#F6A62D] text-white 2xl:hidden cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="px-6 py-6">
            <Image src="/logo.png" alt="Company Logo" />

            <p className="text-sm mt-4">{roleText[role]?.title}</p>

            {roleText[role]?.name && (
              <p className="text-sm text-gray-500 mt-1">
                {roleText[role]?.name}
              </p>
            )}

            <p className="text-xs mt-2 px-2 py-1 rounded bg-[#FFF6E9] text-[#F6A62D] inline-block">
              {roleText[role]?.subtitle}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto border-y border-[#E5E7EB]">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1536 && onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    isActivePath(item.path)
                      ? "bg-[#FFF6E9] text-[#F6A62D]"
                      : "hover:bg-[#F6A62D] hover:text-white"
                  }`}
              >
                <Icon icon={item.icon} width="20" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 ">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-[#E7000B] hover:bg-[#F6A62D] hover:text-white transition cursor-pointer"
            >
              <Icon icon="material-symbols:logout" width="20" />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
