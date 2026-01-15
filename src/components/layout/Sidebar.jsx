import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../Image";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  // 🔐 Role (later auth/context/localStorage)
  const role = "Admin"; // Admin | Owner

  // 🧱 Role-based menu config
  const sidebarMenu = {
    Admin: [
      {
        name: "Dashboard",
        path: "/admin/home",
        icon: "material-symbols:dashboard-outline",
      },
      {
        name: "SOP Management",
        path: "/admin/sop/management",
        icon: "material-symbols:news-outline-rounded",
      },
      {
        name: "User Management",
        path: "/admin/user/management",
        icon: "material-symbols:group",
      },
      {
        name: "Task Oversight",
        path: "/admin/task/oversight",
        icon: "material-symbols:select-check-box",
      },
      {
        name: "Messaging",
        path: "/admin/messaging/oversight",
        icon: "material-symbols:chat-bubble-outline",
      },
      {
        name: "Subscription",
        path: "/admin/subscription",
        icon: "material-symbols:credit-card-outline",
      },
      {
        name: "Settings",
        path: "/admin/farm/settings",
        icon: "material-symbols:settings-outline",
      },
    ],

    Owner: [
      {
        name: "Dashboard",
        path: "/owner/dashboard",
        icon: "material-symbols:dashboard-outline",
      },
      {
        name: "Farm Management",
        path: "/owner/farm/management",
        icon: "material-symbols:agriculture-outline",
      },
      // {
      //   name: "Analytics & Report",
      //   path: "/analytics",
      //   icon: "material-symbols:analytics-outline-rounded",
      // },
      {
        name: "Subscription",
        path: "/owner/subscription/plans",
        icon: "material-symbols:credit-card-outline",
      },
      {
        name: "Settings",
        path: "/owner/system/settings",
        icon: "material-symbols:settings-outline",
      },
    ],
  };

  const roleText = {
    Admin: {
      title: "Farm Check",
      name: "John Anderson",
      subtitle: "Farm Admin",
    },
    Owner: {
      title: "Farm Check",
      subtitle: "Platform Owner",
    },
  };

  const navLinks = sidebarMenu[role] || [];

  // 🔥 CUSTOM ACTIVE CHECK (nested route support)
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-[#364153]
        transition-transform duration-300 ease-in-out border-r border-[#E5E7EB]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="px-6 py-6 border-b border-[#E5E7EB]">
            <Image src="/logo.png" alt="Company Logo" />
            <p className="text-sm mt-4 text-[#4A5565]">
              {roleText[role]?.title}
            </p>
            {roleText[role]?.name && (
              <p className="text-sm text-[#6A7282] my-2">
                {roleText[role]?.name}
              </p>
            )}
            <p className="text-xs text-[#F6A62D] bg-[#FFF6E9] inline-block px-2 py-1 rounded">
              {roleText[role]?.subtitle}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
            {navLinks.map((item) => {
              const active = isActivePath(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                    ${
                      active
                        ? "bg-[#FFF6E9] text-[#F6A62D]"
                        : "text-[#364153] hover:bg-[#F6A62D]"
                    }`}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                >
                  <Icon icon={item.icon} width="20" height="20" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#E5E7EB]">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#E7000B] transition hover:bg-[#F6A62D] hover:text-white">
              <Icon icon="material-symbols:logout" width="20" height="20" />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}