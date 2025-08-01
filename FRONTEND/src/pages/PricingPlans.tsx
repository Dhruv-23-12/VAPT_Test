import React from "react";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    domains: "1 Domain",
    scans: [
      { label: "Light Scans", value: "1/month" },
      { label: "Medium Scans", value: "0" },
      { label: "Deep Scans", value: "0" },
      { label: "Authenticated", value: "0" },
    ],
    coverage: ["Basic"],
    tools: ["Nmap"],
    reporting: "PDF",
    features: ["Basic vulnerability scan", "Email support"],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Basic",
    price: "$299",
    period: "/month",
    domains: "1-3 Domains",
    scans: [
      { label: "Light Scans", value: "5/month" },
      { label: "Medium Scans", value: "3/month" },
      { label: "Deep Scans", value: "1/month" },
      { label: "Authenticated", value: "0" },
    ],
    coverage: ["OWASP Top 10", "SSL/TLS"],
    tools: ["Nmap", "OpenVAS", "SSLyze"],
    reporting: "1 PDF per scan",
    features: [
      "Basic vulnerability scanning",
      "Email support",
      "Monthly reports",
    ],
    button: "Choose Plan",
    highlight: false,
  },
  {
    name: "Advanced",
    price: "$599",
    period: "/month",
    domains: "5-10 Domains",
    scans: [
      { label: "Light Scans", value: "15/month" },
      { label: "Medium Scans", value: "8/month" },
      { label: "Deep Scans", value: "4/month" },
      { label: "Authenticated", value: "2/month" },
    ],
    coverage: ["OWASP Top 10", "SSL", "CMS CVEs", "API Testing"],
    tools: ["Nmap", "ZAP", "Nikto", "Burp Suite"],
    reporting: "Detailed PDF + Executive Summary",
    features: [
      "Advanced threat detection",
      "Risk scoring & prioritization",
      "24/7 email support",
      "Bi-weekly reports",
    ],
    button: "Choose Plan",
    highlight: true,
    badge: "Most Popular",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PricingPlans: React.FC = () => {
  // Get userRole from localStorage, default to 'admin' if not set
  const userRole = localStorage.getItem("role") || "admin";
  const navigate = useNavigate();

  const planNameToKey: Record<string, string> = {
    Basic: "basic",
    Advanced: "advance",
    Team: "team",
  };

  const handlePlanClick = async (planName: string) => {
    if (planName === "Free") {
      navigate("/free-scans");
    } else {
      if (userRole === "superadmin") {
        alert("Superadmin cannot purchase plans.");
        return;
      }
      const planKey = planNameToKey[planName];
      if (!planKey) {
        alert("Invalid plan selected.");
        return;
      }
      try {
        const res = await fetch(
          "http://localhost:8000/create-checkout-session",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan: planKey }),
          }
        );
        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
        } else {
          alert(data.error || "Failed to initiate payment.");
        }
      } catch (err) {
        alert("Error connecting to payment gateway.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex h-screen">
        <Sidebar userRole={userRole} />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={userRole} />
          <div className="flex-1 p-6 space-y-6 overflow-auto mt-16 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-3xl font-extrabold text-center mb-8 text-gray-900"
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Choose Your Plan
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {plans.map((plan, idx) => (
                  <motion.div
                    key={plan.name}
                    className={`relative flex flex-col rounded-2xl shadow-lg bg-white p-8 border ${
                      plan.highlight
                        ? "border-blue-600 scale-105 z-10"
                        : "border-gray-200"
                    } transition-transform`}
                    variants={fadeInUp}
                  >
                    {plan.badge && (
                      <span className="absolute -top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">
                      {plan.name}
                    </h3>
                    <div className="flex items-end justify-center mb-2">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-base text-gray-500 ml-1">
                        {plan.period}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 text-center mb-4">
                      {plan.domains}
                    </div>
                    <div className="mb-4">
                      <div className="font-semibold text-gray-700 mb-1">
                        Scans Included
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.scans.map((scan) => (
                          <li key={scan.label} className="flex justify-between">
                            <span>{scan.label}:</span>
                            <span className="font-medium text-gray-900">
                              {scan.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-700 mb-1">
                        Coverage
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {plan.coverage.map((c) => (
                          <span
                            key={c}
                            className="bg-gray-100 text-xs px-2 py-1 rounded font-medium text-gray-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-700 mb-1">
                        Tools Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {plan.tools.map((tool) => (
                          <span
                            key={tool}
                            className="bg-gray-100 text-xs px-2 py-1 rounded font-medium text-gray-700"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-700 mb-1">
                        Reporting
                      </div>
                      <div className="text-sm text-gray-600">
                        {plan.reporting}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-semibold text-gray-700 mb-1">
                        Features
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <span className="text-blue-500">●</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`mt-auto w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                        plan.highlight
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                      onClick={() => handlePlanClick(plan.name)}
                    >
                      {plan.button}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
