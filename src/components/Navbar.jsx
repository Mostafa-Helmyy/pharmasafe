import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stethoscope, Bell, User } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "Scan Prescription", path: "/scan" },
        { name: "History", path: "/history" },
        { name: "DDI Checker", path: "/ddi" },
        { name: "Alternatives", path: "/alternatives" },
        { name: "Profile", path: "/profile" },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
                        <Stethoscope className="text-white w-5 h-5" />
                    </div>

                    <div>
                        <h1 className="font-bold text-xl">PharmaSafe</h1>
                        <p className="text-xs text-slate-500">
                            AI Medication Safety
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="hidden lg:flex gap-7 text-sm font-medium">
                    {links.map((item) => {
                        const active =
                            location.pathname === item.path;

                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`transition hover:text-blue-600 ${active
                                        ? "text-blue-600 font-semibold"
                                        : ""
                                    }`}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-xl hover:bg-slate-100">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    <div
                        onClick={() => navigate("/profile")}
                        className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white cursor-pointer"
                    >
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
}