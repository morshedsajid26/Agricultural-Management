import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../Image";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 ROLE STATE (default = Owner)
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Owner";
  });

  // 💾 persist role
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // 🧱 ROLE-BASED MENU
  const sidebarMenu = {
    Admin: [
      {
        name: "Dashboard",
        path: "/",
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
        path: "/",
        icon: "material-symbols:dashboard-outline",
      },
      {
        name: "Farm Management",
        path: "/owner/farm/management",
        icon: "material-symbols:agriculture-outline",
      },
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

  // 🏷️ ROLE TEXT
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

  // 🔥 ACTIVE PATH CHECK (nested routes)
  const isActivePath = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  // 🔁 ROLE CHANGE HANDLER
  const handleRoleChange = (newRole) => {
    setRole(newRole);

    if (newRole === "Admin") {
      navigate("/");
    } else {
      navigate("/");
    }

    if (window.innerWidth < 768) onClose();
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

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-[#364153]
        transition-transform duration-300 ease-in-out border-r border-[#E5E7EB]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo + Role */}
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

            {/* 🔀 ROLE SWITCHER */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleRoleChange("Owner")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer
                  ${
                    role === "Owner"
                      ? "bg-[#F6A62D] text-white"
                      : "bg-[#F1F5F9] text-[#364153]"
                  }`}
              >
                Owner
              </button>

              <button
                onClick={() => handleRoleChange("Admin")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer
                  ${
                    role === "Admin"
                      ? "bg-[#F6A62D] text-white"
                      : "bg-[#F1F5F9] text-[#364153]"
                  }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Navigation */}
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
                        : "text-[#364153] hover:bg-[#F6A62D] hover:text-white"
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

          {/* Logout */}
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
