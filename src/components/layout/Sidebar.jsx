import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../Image";

export default function Sidebar({ isOpen, onClose }) {
  // 🔐 Role (later backend / auth context / localStorage থেকে আসবে)
  const role = "Admin"; // Admin | Owner

  // 🧱 Role-based menu config
  const sidebarMenu = {
    Admin: [
      {
        name: "Dashboard",
        path: "/",
        icon: "material-symbols:dashboard-outline",
      },
      {
        name: "SOP Management",
        path: "/users",
        icon: "material-symbols:group-outline",
      },
      {
        name: "User Management",
        path: "/profile",
        icon: "material-symbols:group",
      },
      {
        name: "Task Oversight",
        path: "/tasks",
        icon: "material-symbols:select-check-box",
      },
      {
        name: "Messaging",
        path: "/messages",
        icon: "material-symbols:chat-bubble-outline",
      },
      {
        name: "Subscription",
        path: "/subscription",
        icon: "material-symbols:credit-card-outline",
      },
      {
        name: "Settings",
        path: "/settings",
        icon: "material-symbols:settings-outline",
      },
    ],

    Owner: [
      {
        name: "Dashboard",
        path: "/",
        icon: "material-symbols:dashboard-outline",
      },
      {
        name: "Farm Management",
        path: "/farms",
        icon: "material-symbols:agriculture-outline",
      },
      {
        name: "Analytics & Report",
        path: "/analytics",
        icon: "material-symbols:bar-chart-outline",
      },
      {
        name: "Subscription",
        path: "/subscription",
        icon: "material-symbols:credit-card-outline",
      },
      {
        name: "Settings",
        path: "/settings",
        icon: "material-symbols:settings-outline",
      },
    ],
  };

  const roleText = {
    Admin: {
      title: "Farm Check Support",
      name: "John Anderson",
      subtitle: "Farm Admin",
    },
    Owner: {
      title: "Farm Check Support",
      subtitle: "Platform Owner",
    },
    User: {
      title: "Farm Check Support",
      subtitle: "User Portal",
    },
  };

  const navLinks = sidebarMenu[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-[#FFFFFF] text-[#364153] transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#E5E7EB] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="flex h-16 items-center justify-between px-6 py-25 border-[#E5E7EB]">
            <div className="py-1  ">
              <Image src="/logo.png" alt="Company Logo" />
              <p className="text-sm mt-4 text-[#4A5565]">
                {roleText[role]?.title}
              </p>
              <p className="text-sm text-[#6A7282] my-2 ">{roleText[role]?.name}</p>
              <p className="text-sm text-[#F6A62D] bg-[#FFF6E9] w-30 flex items-center justify-center p-1 ">
                {roleText[role]?.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
            >
              <Icon icon="material-symbols:close" width="20" height="20" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1  space-y-2 overflow-y-auto hide-scrollbar px-3 py-4 border-y border-[#E5E7EB]">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-[#FFF6E9] text-[#F6A62D]"
                      : "text-[#364153] hover:bg-[#F6A62D]"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
              >
                <Icon icon={item.icon} width="20" height="20" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className=" p-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#E7000B] transition-colors hover:bg-[#F6A62D] hover:text-white">
              <Icon icon="material-symbols:logout" width="20" height="20" />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
