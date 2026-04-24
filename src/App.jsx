import React from "react";
import {
  Bell,
  User,
  ShieldCheck,
  AlertTriangle,
  Pill,
  ScanLine,
  Upload,
  Search,
  History,
  Activity,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

export default function PharmaSafeHomePage() {
  const cards = [
    {
      title: "Recent Scan",
      value: "Panadol + Amoxil",
      sub: "Status: Safe",
      icon: ScanLine,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "DDI Alerts",
      value: "2 Found",
      sub: "Review recommended",
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Suggested Alternatives",
      value: "5 Options",
      sub: "Safer substitutes available",
      icon: Pill,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Daily Medications",
      value: "3 Active",
      sub: "Stored in profile",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const historyData = [
    {
      name: "Prescription #241",
      date: "Apr 23, 2026",
      result: "Safe",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Prescription #240",
      date: "Apr 21, 2026",
      result: "Warning",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Prescription #239",
      date: "Apr 19, 2026",
      result: "Alternatives Found",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Prescription #238",
      date: "Apr 16, 2026",
      result: "Safe",
      color: "bg-green-100 text-green-700",
    },
  ];

  const quickActions = [
    { label: "Scan Again", icon: ScanLine },
    { label: "Upload Prescription", icon: Upload },
    { label: "Check Interactions", icon: AlertTriangle },
    { label: "Find Alternatives", icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
              <Stethoscope className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-xl">PharmaSafe</h1>
              <p className="text-xs text-slate-500">AI Medication Safety</p>
            </div>
          </div>

          {/* Menu */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {[
              "Home",
              "Scan Prescription",
              "History",
              "DDI Checker",
              "Alternatives",
              "Profile",
            ].map((item) => (
              <button
                key={item}
                className="hover:text-blue-600 transition"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white shadow">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-5">
              Trusted Healthcare AI Platform
            </span>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Smart Medication Safety
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                Powered by AI
              </span>
            </h2>

            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
              Scan prescriptions, detect harmful drug interactions, and discover
              safer alternatives instantly.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                Scan Now
              </button>

              <button className="px-6 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 font-semibold transition">
                View History
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                ["12K+", "Scans"],
                ["98.6%", "Accuracy"],
                ["24/7", "AI Monitoring"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
                >
                  <div className="text-2xl font-bold text-blue-600">{num}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Live Safety Overview</h3>
              <Activity className="text-emerald-500" />
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-green-50 flex justify-between">
                <span>Current Safety Score</span>
                <span className="font-bold text-green-600">92%</span>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 flex justify-between">
                <span>Potential Interactions</span>
                <span className="font-bold text-red-600">2</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 flex justify-between">
                <span>Available Alternatives</span>
                <span className="font-bold text-blue-600">5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>

                <h4 className="text-sm text-slate-500">{card.title}</h4>
                <p className="font-bold text-xl mt-1">{card.value}</p>
                <p className="text-sm text-slate-500 mt-2">{card.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-5">Quick Actions</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 hover:shadow-md hover:-translate-y-1 transition flex items-center gap-3 font-medium"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-14">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search history..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="pb-3">Prescription Name</th>
                  <th className="pb-3">Scan Date</th>
                  <th className="pb-3">Result</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {historyData.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="py-4 font-medium">{item.name}</td>
                    <td className="py-4 text-slate-500">{item.date}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}
                      >
                        {item.result}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        View <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 text-center text-slate-500 text-sm">
          PharmaSafe © 2026 — Smart AI Healthcare Protection
        </div>
      </footer>
    </div>
  );
}