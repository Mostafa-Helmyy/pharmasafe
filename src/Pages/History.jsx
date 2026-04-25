import React, { useState } from "react";
import {
    Stethoscope,
    Bell,
    User,
    Search,
    ScanLine,
    ShieldAlert,
    Pill,
    Eye,
    Trash2,
    Download,
    Trash,
    CalendarDays,
    CheckCircle2,
    AlertTriangle,
    Clock3,
    Plus,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function History() {
    const initialHistory = [
        {
            id: 1,
            type: "Prescription Scan",
            title: "Prescription Scan",
            date: "Apr 25, 2026",
            desc: "Detected 4 medicines and 1 warning.",
            status: "Warning",
        },
        {
            id: 2,
            type: "DDI Check",
            title: "DDI Check",
            date: "Apr 24, 2026",
            desc: "Checked Panadol + Brufen.",
            status: "Safe",
        },
        {
            id: 3,
            type: "Alternatives",
            title: "Alternatives Search",
            date: "Apr 23, 2026",
            desc: "Found 3 alternatives for Amoxicillin.",
            status: "Completed",
        },
        {
            id: 4,
            type: "Prescription Scan",
            title: "Prescription Scan",
            date: "Apr 21, 2026",
            desc: "Detected 2 medicines successfully.",
            status: "Safe",
        },
        {
            id: 5,
            type: "Alternatives",
            title: "Alternatives Search",
            date: "Apr 20, 2026",
            desc: "Found cheaper options for Brufen.",
            status: "Alternatives Found",
        },
        {
            id: 6,
            type: "DDI Check",
            title: "DDI Check",
            date: "Apr 18, 2026",
            desc: "Checked Metformin + Ibuprofen.",
            status: "Warning",
        },
    ];

    const [history, setHistory] =
        useState(initialHistory);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [visible, setVisible] = useState(4);

    const filtered = history.filter((item) => {
        const matchSearch =
            item.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.desc
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchFilter =
            filter === "All"
                ? true
                : filter === "Prescription Scans"
                    ? item.type === "Prescription Scan"
                    : filter === "DDI Checks"
                        ? item.type === "DDI Check"
                        : item.type === "Alternatives";

        return matchSearch && matchFilter;
    });

    const visibleItems = filtered.slice(0, visible);

    const deleteItem = (id) => {
        setHistory((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const iconByType = (type) => {
        if (type === "Prescription Scan")
            return ScanLine;
        if (type === "DDI Check")
            return ShieldAlert;
        return Pill;
    };

    const badgeByStatus = (status) => {
        if (status === "Safe")
            return "bg-green-100 text-green-700";
        if (status === "Warning")
            return "bg-red-100 text-red-700";
        if (status === "Alternatives Found")
            return "bg-blue-100 text-blue-700";
        return "bg-slate-100 text-slate-700";
    };

    const totalScans = history.filter(
        (i) => i.type === "Prescription Scan"
    ).length;

    const ddiChecks = history.filter(
        (i) => i.type === "DDI Check"
    ).length;

    const altSearch = history.filter(
        (i) => i.type === "Alternatives"
    ).length;

    const lastDate =
        history.length > 0 ? history[0].date : "-";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    History & Reports
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                    Track your previous medication scans and
                    safety checks.
                </p>
            </section>

            {/* Main */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14">
                {/* Summary */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    {[
                        [
                            "Total Scans",
                            totalScans,
                            "bg-blue-50 text-blue-700",
                        ],
                        [
                            "DDI Checks",
                            ddiChecks,
                            "bg-emerald-50 text-emerald-700",
                        ],
                        [
                            "Alternatives Searches",
                            altSearch,
                            "bg-yellow-50 text-yellow-700",
                        ],
                        [
                            "Last Activity Date",
                            lastDate,
                            "bg-purple-50 text-purple-700",
                        ],
                    ].map(([title, value, style]) => (
                        <div
                            key={title}
                            className={`rounded-3xl p-5 ${style}`}
                        >
                            <div className="text-sm">
                                {title}
                            </div>
                            <div className="text-2xl font-bold mt-2 break-words">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search + Filters */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

                            <input
                                placeholder="Search reports..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "All",
                                "Prescription Scans",
                                "DDI Checks",
                                "Alternatives",
                            ].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`px-4 py-2 rounded-full text-sm transition ${filter === item
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 hover:bg-slate-200"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                        <button className="px-4 py-3 rounded-2xl bg-blue-50 text-blue-700 font-medium flex items-center gap-2 hover:shadow-md transition">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>

                        <button
                            onClick={clearHistory}
                            className="px-4 py-3 rounded-2xl bg-red-50 text-red-700 font-medium flex items-center gap-2 hover:shadow-md transition"
                        >
                            <Trash className="w-4 h-4" />
                            Clear History
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center">
                        <Clock3 className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-2xl font-bold">
                            No reports yet
                        </h3>
                        <p className="text-slate-500 mt-2">
                            Your previous scans and checks will
                            appear here.
                        </p>
                    </div>
                )}

                {/* History List */}
                {filtered.length > 0 && (
                    <div className="space-y-5">
                        {visibleItems.map((item) => {
                            const Icon = iconByType(item.type);

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-2xl transition"
                                >
                                    <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
                                        {/* Left */}
                                        <div className="flex gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-blue-600" />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-xl">
                                                    {item.title}
                                                </h3>

                                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                    <CalendarDays className="w-4 h-4" />
                                                    {item.date}
                                                </div>

                                                <p className="text-slate-600 mt-3">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                            <span
                                                className={`px-3 py-2 rounded-full text-xs font-semibold ${badgeByStatus(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>

                                            <button className="px-4 py-2 rounded-2xl bg-blue-50 text-blue-700 font-medium flex items-center gap-2 hover:shadow-md transition">
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteItem(item.id)
                                                }
                                                className="px-4 py-2 rounded-2xl bg-red-50 text-red-700 font-medium flex items-center gap-2 hover:shadow-md transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Load More */}
                        {visible < filtered.length && (
                            <div className="pt-3">
                                <button
                                    onClick={() =>
                                        setVisible((prev) => prev + 3)
                                    }
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:scale-105 transition flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}