import React from "react";
import Sidebar from "../components/layout/Sidebar";

const scanCards = [
  {
    title: "Light Scan",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-blue-500 mr-2"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
      </svg>
    ),
    description: "Quick scan for common vulnerabilities and open ports.",
    usage: "1/month",
    button: { text: "Start Scan", enabled: true },
  },
  {
    title: "Medium Scan",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-blue-500 mr-2"
      >
        <path d="M12 20v-6m0 0V4m0 10l3-3m-3 3l-3-3" strokeWidth="2" />
      </svg>
    ),
    description: "Deeper scan including web vulnerabilities and SSL checks.",
    usage: "0",
    button: { text: "Not Available", enabled: false },
  },
  {
    title: "Deep Scan",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-blue-500 mr-2"
      >
        <path d="M12 4v16m8-8H4" strokeWidth="2" />
      </svg>
    ),
    description: "Comprehensive scan including CMS, API, and advanced checks.",
    usage: "0",
    button: { text: "Not Available", enabled: false },
  },
  {
    title: "Authenticated Scan",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-blue-500 mr-2"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path d="M12 16v-4m0 0V8m0 4l3-3m-3 3l-3-3" strokeWidth="2" />
      </svg>
    ),
    description:
      "Simulates attacks as an authenticated user for maximum coverage.",
    usage: "0",
    button: { text: "Not Available", enabled: false },
  },
];

const AvailableScansFree: React.FC = () => {
  const userRole = localStorage.getItem("role") || "admin";
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex h-screen">
        <Sidebar userRole={userRole} />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 flex flex-col items-center justify-center bg-[#f7fafd] overflow-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">
              Available Scans (Free Plan)
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {scanCards.map((card, idx) => (
                <div
                  key={card.title}
                  className={`rounded-xl bg-white shadow-md p-6 flex flex-col border ${
                    idx === 0 ? "border-blue-400" : "border-transparent"
                  } ${idx === 0 ? "shadow-lg" : ""}`}
                  style={
                    idx === 0
                      ? { boxShadow: "0 2px 12px 0 rgba(59,130,246,0.15)" }
                      : {}
                  }
                >
                  <div className="flex items-center mb-2">
                    {card.icon}
                    <span className="text-xl font-semibold">{card.title}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{card.description}</p>
                  <div className="mb-4 text-gray-700 font-medium">
                    <span className="font-semibold">Usage:</span> {card.usage}
                  </div>
                  <button
                    className={`mt-auto w-full py-2 rounded-md font-semibold text-base transition-colors ${
                      card.button.enabled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!card.button.enabled}
                  >
                    {card.button.text}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableScansFree;
