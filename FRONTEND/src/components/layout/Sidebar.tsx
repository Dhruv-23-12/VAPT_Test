import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  HardDrive,
  AlertTriangle,
  Globe,
  Settings,
  Bot,
  Users,
  FileText,
  Plug,
  List,
  ChevronDown,
  Shield,
  Search,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const userMenuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Scan", icon: Search, path: "/pricing" },
  { name: "Assets", icon: HardDrive, path: "/assets" },
  { name: "Findings", icon: AlertTriangle, path: "/findings" },
  { name: "Attack Surface", icon: Globe, path: "/attack-surface" },
  { name: "Handlers", icon: Settings, path: "/handlers" },
  { name: "Automation", icon: Bot, collapsible: true },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Integration", icon: Plug, path: "/integration" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Wordlist", icon: List, path: "/wordlist" },
];

const superAdminMenuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/NS-MS-1127" },
  { name: "Users", icon: Users, path: "/NS-MS-1127/users" },
  { name: "Subscriptions", icon: List, path: "/NS-MS-1127/subscriptions" },
  { name: "Scans", icon: Search, path: "/NS-MS-1127/scans" },
  { name: "Reports", icon: FileText, path: "/NS-MS-1127/reports" },
  { name: "System Logs", icon: HardDrive, path: "/NS-MS-1127/logs" },
  { name: "Settings", icon: Settings, path: "/NS-MS-1127/settings" },
];

const automationSubItems = [
  { name: "Robots", icon: Bot, path: "/automation/robots" },
];

const settingsItems = [{ name: "Workspace", icon: Settings }];

function Sidebar({ userRole }: { userRole: string }) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems =
    userRole === "superadmin" ? superAdminMenuItems : userMenuItems;
  const panelTitle =
    userRole === "superadmin" ? "NS-MS-1127 Panel" : "SecureScan";
  const logoText = userRole === "superadmin" ? "NS-MS-1127" : "SecureScan";

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-64 h-screen overflow-hidden ${
        userRole === "superadmin"
          ? "bg-gradient-to-b from-[#081B28] to-[#0C1F2E] border-r border-cyan-500/20"
          : "bg-slate-800 border-r-0"
      }`}
    >
      {/* Logo */}
      <div
        className={`p-6 ${
          userRole === "superadmin"
            ? "border-b border-cyan-500/20"
            : "border-b border-slate-700"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 ${
              userRole === "superadmin"
                ? "bg-gradient-to-r from-green-400 to-cyan-400"
                : "bg-teal-500"
            } rounded-lg flex items-center justify-center`}
          >
            <Shield
              className={`w-5 h-5 ${
                userRole === "superadmin" ? "text-black" : "text-white"
              }`}
            />
          </div>
          <div>
            <span className="text-xl font-bold text-white">{logoText}</span>
            {userRole === "superadmin" ? (
              <p className="text-xs text-cyan-300">{panelTitle}</p>
            ) : (
              <p className="text-xs text-slate-400">{panelTitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          if (item.name === "Automation") {
            return (
              <div key={item.name}>
                <motion.div
                  whileHover={{ x: 4 }}
                  onClick={() => setIsAutomationOpen((open) => !open)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer select-none
                    transition-colors transition-shadow transition-border duration-200
                    ${
                      isAutomationOpen
                        ? userRole === "superadmin"
                          ? "bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 shadow-lg shadow-green-500/10"
                          : "bg-teal-500 text-white shadow-lg scale-105"
                        : userRole === "superadmin"
                        ? "hover:bg-cyan-500/10 text-gray-300"
                        : "text-slate-300 hover:bg-teal-500/20 hover:text-white hover:scale-105"
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isAutomationOpen
                        ? userRole === "superadmin"
                          ? "text-green-400"
                          : "text-white"
                        : userRole === "superadmin"
                        ? "text-gray-400"
                        : "text-slate-300"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isAutomationOpen
                        ? "text-white"
                        : userRole === "superadmin"
                        ? "text-gray-300"
                        : "text-slate-300"
                    }`}
                  >
                    {item.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-auto transition-transform ${
                      isAutomationOpen ? "rotate-180" : ""
                    } ${
                      isAutomationOpen
                        ? "text-white"
                        : userRole === "superadmin"
                        ? "text-gray-400"
                        : "text-slate-300"
                    }`}
                  />
                </motion.div>
                {isAutomationOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-1 space-y-1"
                  >
                    {automationSubItems.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                            isActive
                              ? "bg-teal-500 text-white"
                              : "text-gray-300 hover:bg-cyan-500/10"
                          }`
                        }
                      >
                        <sub.icon className="w-4 h-4" />
                        <span className="text-sm">{sub.name}</span>
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          }
          if (item.path) {
            // Special logic for Scan: highlight for /pricing, /scans, and /free-scans
            const isScan = item.name === "Scan";
            const scanActive =
              isScan &&
              (location.pathname === "/pricing" ||
                location.pathname === "/scans" ||
                location.pathname === "/free-scans");
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => {
                  const active = scanActive || isActive;
                  return `flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer select-none transition-colors transition-shadow transition-border duration-200
                    ${
                      active
                        ? userRole === "superadmin"
                          ? "bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 shadow-lg shadow-green-500/10 text-white"
                          : "bg-teal-500 text-white shadow-lg scale-105"
                        : userRole === "superadmin"
                        ? "hover:bg-cyan-500/10 text-gray-300"
                        : "text-slate-300 hover:bg-teal-500/20 hover:text-white hover:scale-105"
                    }
                  `;
                }}
                end={item.path === "/dashboard" || item.path === "/NS-MS-1127"}
              >
                <item.icon className={`w-5 h-5`} />
                <span className={`text-sm font-medium`}>{item.name}</span>
              </NavLink>
            );
          }
          return null;
        })}

        {/* Settings & Configurations */}
        <div className="pt-6">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors ${
              userRole === "superadmin"
                ? "text-gray-400 hover:text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Settings & Configurations
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isSettingsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1"
            >
              {settingsItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-cyan-500/10"
                >
                  <item.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{item.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
