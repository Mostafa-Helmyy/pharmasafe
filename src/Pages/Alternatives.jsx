import React, { useState } from "react";
import {
    Stethoscope,
    Bell,
    User,
    Pill,
    Search,
    Loader2,
    RefreshCw,
    CheckCircle2,
    DollarSign,
    ShieldCheck,
    PackageCheck,
    X,
    Sparkles,
} from "lucide-react";

export default function Alternatives() {
    const prescriptionMeds = [
        "Panadol",
        "Amoxicillin",
        "Brufen",
        "Metformin",
    ];

    const historyChips = [
        "Panadol",
        "Augmentin",
        "Brufen",
        "Metformin",
    ];

    const allResults = [
        {
            original: "Panadol",
            alternative: "Paracetamol Generic",
            type: "Same Ingredient",
            availability: "Available",
            price: 4,
            note:
                "Same active ingredient and commonly available in pharmacies.",
        },
        {
            original: "Amoxicillin",
            alternative: "Augmentin",
            type: "Similar Effect",
            availability: "Limited",
            price: 8,
            note:
                "Alternative antibiotic with similar therapeutic effect.",
        },
        {
            original: "Brufen",
            alternative: "Ibuprofen Generic",
            type: "Lower Price",
            availability: "Available",
            price: 3,
            note:
                "Same pain relief effect with lower average price.",
        },
        {
            original: "Metformin",
            alternative: "Glucophage",
            type: "Lower Interaction Risk",
            availability: "Out of Stock",
            price: 7,
            note:
                "May be preferred depending on tolerance and profile.",
        },
    ];

    const [tab, setTab] = useState("prescription");
    const [selectedMed, setSelectedMed] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState("All");

    const runSearch = (medicine) => {
        if (!medicine) return;

        setLoading(true);
        setResults([]);

        setTimeout(() => {
            setLoading(false);

            const filtered = allResults.filter((r) =>
                r.original
                    .toLowerCase()
                    .includes(medicine.toLowerCase())
            );

            setResults(
                filtered.length > 0 ? filtered : allResults
            );
        }, 1800);
    };

    const clearAll = () => {
        setSearch("");
        setSelectedMed("");
        setResults([]);
        setFilter("All");
    };

    const filteredResults = [...results].filter((item) => {
        if (filter === "All") return true;
        if (filter === "Cheapest")
            return item.price <= 4;
        if (filter === "Same Ingredient")
            return item.type === "Same Ingredient";
        if (filter === "Similar Effect")
            return item.type === "Similar Effect";
        if (filter === "Best Availability")
            return item.availability === "Available";
        return true;
    });

    const cheapest =
        results.length > 0
            ? `$${Math.min(...results.map((r) => r.price))}`
            : "-";

    const sameMatches = results.filter(
        (r) => r.type === "Same Ingredient"
    ).length;

    const availableNow = results.filter(
        (r) => r.availability === "Available"
    ).length;

    const badgeType = (type) => {
        if (type === "Same Ingredient")
            return "bg-blue-100 text-blue-700";
        if (type === "Similar Effect")
            return "bg-emerald-100 text-emerald-700";
        if (type === "Lower Price")
            return "bg-yellow-100 text-yellow-700";
        return "bg-purple-100 text-purple-700";
    };

    const badgeAvailability = (value) => {
        if (value === "Available")
            return "bg-green-100 text-green-700";
        if (value === "Limited")
            return "bg-yellow-100 text-yellow-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
                            <Stethoscope className="text-white w-5 h-5" />
                        </div>

                        <div>
                            <h1 className="font-bold text-xl">
                                PharmaSafe
                            </h1>
                            <p className="text-xs text-slate-500">
                                AI Medication Safety
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex gap-7 text-sm font-medium">
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
                                className={`transition hover:text-blue-600 ${item === "Alternatives"
                                        ? "text-blue-600 font-semibold"
                                        : ""
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-xl hover:bg-slate-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Drug Alternatives Finder
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                    Find safer, cheaper, or available
                    alternatives instantly.
                </p>
            </section>

            {/* Search Card */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setTab("prescription")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${tab === "prescription"
                                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Prescription Medicines
                        </button>

                        <button
                            onClick={() => setTab("search")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${tab === "search"
                                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Search by Drug Name
                        </button>
                    </div>

                    {/* Prescription Tab */}
                    {tab === "prescription" && (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {prescriptionMeds.map((med) => (
                                    <button
                                        key={med}
                                        onClick={() =>
                                            setSelectedMed(med)
                                        }
                                        className={`p-5 rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-md ${selectedMed === med
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-slate-200 bg-white"
                                            }`}
                                    >
                                        <Pill className="w-5 h-5 text-blue-600 mb-3" />
                                        <div className="font-semibold">
                                            {med}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={() =>
                                        runSearch(selectedMed)
                                    }
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:scale-105 transition"
                                >
                                    View Alternatives
                                </button>
                            </div>
                        </>
                    )}

                    {/* Search Tab */}
                    {tab === "search" && (
                        <>
                            <div className="relative">
                                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Enter medicine name..."
                                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <button
                                    onClick={() => runSearch(search)}
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold"
                                >
                                    Search
                                </button>

                                <button
                                    onClick={clearAll}
                                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-medium flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Clear
                                </button>
                            </div>

                            {/* Search History */}
                            <div className="mt-6">
                                <p className="text-sm text-slate-500 mb-3">
                                    Recent Searches
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {historyChips.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => {
                                                setSearch(chip);
                                                runSearch(chip);
                                            }}
                                            className="px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-sm"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="font-medium">
                                AI is searching best
                                alternatives...
                            </span>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading &&
                        results.length === 0 && (
                            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                                <Sparkles className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                                <h3 className="font-bold text-lg">
                                    Ready to Search
                                </h3>
                                <p className="text-slate-500 mt-1">
                                    Select or search a medicine to
                                    discover alternatives.
                                </p>
                            </div>
                        )}

                    {/* Results */}
                    {results.length > 0 && !loading && (
                        <>
                            {/* Filters */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "All",
                                    "Cheapest",
                                    "Same Ingredient",
                                    "Similar Effect",
                                    "Best Availability",
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

                            {/* Summary */}
                            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
                                {[
                                    [
                                        "Alternatives Found",
                                        results.length,
                                        "bg-blue-50 text-blue-700",
                                    ],
                                    [
                                        "Cheapest Option",
                                        cheapest,
                                        "bg-yellow-50 text-yellow-700",
                                    ],
                                    [
                                        "Same Ingredient Matches",
                                        sameMatches,
                                        "bg-emerald-50 text-emerald-700",
                                    ],
                                    [
                                        "Available Now",
                                        availableNow,
                                        "bg-green-50 text-green-700",
                                    ],
                                ].map(([title, value, style]) => (
                                    <div
                                        key={title}
                                        className={`rounded-2xl p-5 ${style}`}
                                    >
                                        <div className="text-sm">
                                            {title}
                                        </div>
                                        <div className="text-3xl font-bold mt-2">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cards */}
                            <div className="mt-8 grid lg:grid-cols-2 gap-5">
                                {filteredResults.map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-slate-200 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-xl transition"
                                    >
                                        <div className="flex justify-between gap-4 flex-wrap">
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Original Medicine
                                                </p>
                                                <h3 className="font-bold text-lg">
                                                    {item.original}
                                                </h3>
                                            </div>

                                            <span
                                                className={`px-3 py-2 rounded-full text-xs font-semibold ${badgeAvailability(
                                                    item.availability
                                                )}`}
                                            >
                                                {item.availability}
                                            </span>
                                        </div>

                                        <div className="mt-5">
                                            <p className="text-sm text-slate-500">
                                                Suggested Alternative
                                            </p>
                                            <h4 className="font-bold text-xl text-blue-700">
                                                {item.alternative}
                                            </h4>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span
                                                className={`px-3 py-2 rounded-full text-xs font-semibold ${badgeType(
                                                    item.type
                                                )}`}
                                            >
                                                {item.type}
                                            </span>

                                            <span className="px-3 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
                                                <DollarSign className="w-3 h-3" />
                                                ${item.price}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                                            {item.note}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Re-search */}
                            <div className="mt-6">
                                <button
                                    onClick={() =>
                                        runSearch(
                                            selectedMed || search
                                        )
                                    }
                                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-semibold flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Re-search
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}