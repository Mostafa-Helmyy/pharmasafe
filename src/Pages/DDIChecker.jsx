import React, { useState } from "react";
import {
    Stethoscope,
    Bell,
    User,
    Search,
    CheckCircle2,
    AlertTriangle,
    ShieldCheck,
    Loader2,
    Plus,
    Trash2,
    RefreshCw,
    X,
    Pill,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function DDIChecker() {
    const savedMedicines = [
        "Panadol",
        "Amoxicillin",
        "Brufen",
        "Metformin",
    ];

    const [activeTab, setActiveTab] = useState("saved");
    const [selectedMeds, setSelectedMeds] = useState([]);
    const [manualRows, setManualRows] = useState([
        { id: 1, name: "" },
        { id: 2, name: "" },
    ]);

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [search, setSearch] = useState("");

    const filteredSaved = savedMedicines.filter((med) =>
        med.toLowerCase().includes(search.toLowerCase())
    );

    const toggleMedicine = (name) => {
        setSelectedMeds((prev) =>
            prev.includes(name)
                ? prev.filter((m) => m !== name)
                : [...prev, name]
        );
    };

    const selectAll = () => {
        setSelectedMeds(savedMedicines);
    };

    const clearAll = () => {
        setSelectedMeds([]);
        setResults([]);
        setErrorMsg("");
        setManualRows([
            { id: 1, name: "" },
            { id: 2, name: "" },
        ]);
    };

    const addManualRow = () => {
        setManualRows([
            ...manualRows,
            { id: Date.now(), name: "" },
        ]);
    };

    const updateManualRow = (id, value) => {
        setManualRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, name: value } : row
            )
        );
    };

    const deleteManualRow = (id) => {
        setManualRows((prev) =>
            prev.filter((row) => row.id !== id)
        );
    };

    const runAnalysis = (medicines) => {
        const clean = medicines.filter((m) => m.trim() !== "");

        if (clean.length < 2) {
            setErrorMsg("Please add at least 2 medicines.");
            setResults([]);
            return;
        }

        setErrorMsg("");
        setLoading(true);
        setResults([]);

        setTimeout(() => {
            setLoading(false);

            const fakeResults = [
                {
                    severity: "Severe",
                    pair: "Warfarin + Aspirin",
                    note: "High bleeding risk",
                    color:
                        "bg-red-50 border-red-200 text-red-700",
                    icon: AlertTriangle,
                },
                {
                    severity: "Moderate",
                    pair: "Ibuprofen + Metformin",
                    note: "May affect kidney function",
                    color:
                        "bg-yellow-50 border-yellow-200 text-yellow-700",
                    icon: AlertTriangle,
                },
                {
                    severity: "Safe",
                    pair: "Panadol + Vitamin C",
                    note: "No major known interaction",
                    color:
                        "bg-green-50 border-green-200 text-green-700",
                    icon: CheckCircle2,
                },
            ];

            setResults(fakeResults);
        }, 2200);
    };

    const analyzeSaved = () => runAnalysis(selectedMeds);

    const analyzeManual = () =>
        runAnalysis(manualRows.map((r) => r.name));

    const totalChecked =
        activeTab === "saved"
            ? selectedMeds.length
            : manualRows.filter((r) => r.name.trim() !== "")
                .length;

    const severeCount = results.filter(
        (r) => r.severity === "Severe"
    ).length;

    const safeCount = results.filter(
        (r) => r.severity === "Safe"
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Drug Interaction Checker
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                    Check if medicines can be safely taken
                    together.
                </p>
            </section>

            {/* Main Card */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${activeTab === "saved"
                                ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            My Saved Medications
                        </button>

                        <button
                            onClick={() => setActiveTab("manual")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${activeTab === "manual"
                                ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Manual Checker
                        </button>
                    </div>

                    {/* Search + actions */}
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search medicines..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={clearAll}
                                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-medium flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Clear All
                            </button>

                            <button
                                onClick={() =>
                                    activeTab === "saved"
                                        ? analyzeSaved()
                                        : analyzeManual()
                                }
                                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:scale-105 transition"
                            >
                                {activeTab === "saved"
                                    ? "Check Interactions"
                                    : "Analyze DDI"}
                            </button>
                        </div>
                    </div>

                    {/* Saved Tab */}
                    {activeTab === "saved" && (
                        <>
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={selectAll}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Select All
                                </button>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredSaved.map((med) => {
                                    const selected =
                                        selectedMeds.includes(med);

                                    return (
                                        <button
                                            key={med}
                                            onClick={() =>
                                                toggleMedicine(med)
                                            }
                                            className={`p-5 rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-md ${selected
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-slate-200 bg-white"
                                                }`}
                                        >
                                            <Pill className="w-5 h-5 mb-3 text-blue-600" />
                                            <div className="font-semibold">
                                                {med}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* Manual Tab */}
                    {activeTab === "manual" && (
                        <div className="space-y-4">
                            {manualRows.map((row) => (
                                <div
                                    key={row.id}
                                    className="grid md:grid-cols-[1fr_auto] gap-4 p-4 rounded-2xl border border-slate-200"
                                >
                                    <input
                                        placeholder="Medicine Name"
                                        value={row.name}
                                        onChange={(e) =>
                                            updateManualRow(
                                                row.id,
                                                e.target.value
                                            )
                                        }
                                        className="px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        onClick={() =>
                                            deleteManualRow(row.id)
                                        }
                                        className="px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addManualRow}
                                className="px-5 py-3 rounded-2xl bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Medicine
                            </button>
                        </div>
                    )}

                    {/* Error */}
                    {errorMsg && (
                        <div className="mt-8 p-5 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-700 flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5" />
                            {errorMsg}
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="font-medium">
                                AI is analyzing drug
                                interactions...
                            </span>
                        </div>
                    )}

                    {/* Summary */}
                    {results.length > 0 && (
                        <>
                            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
                                {[
                                    [
                                        "Total Drugs Checked",
                                        totalChecked,
                                        "bg-blue-50 text-blue-700",
                                    ],
                                    [
                                        "Interactions Found",
                                        results.length,
                                        "bg-yellow-50 text-yellow-700",
                                    ],
                                    [
                                        "Safe Pairs",
                                        safeCount,
                                        "bg-green-50 text-green-700",
                                    ],
                                    [
                                        "High Risk Alerts",
                                        severeCount,
                                        "bg-red-50 text-red-700",
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

                            {/* Results Cards */}
                            <div className="mt-8 space-y-4">
                                {results.map((item, i) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={i}
                                            className={`p-5 rounded-2xl border transition duration-500 hover:-translate-y-1 hover:shadow-md ${item.color}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <Icon className="w-5 h-5 mt-1" />

                                                <div>
                                                    <p className="font-bold text-lg">
                                                        {item.severity} Interaction
                                                    </p>

                                                    <p className="font-semibold mt-1">
                                                        {item.pair}
                                                    </p>

                                                    <p className="mt-1 text-sm">
                                                        {item.note}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Recheck */}
                            <div className="mt-6">
                                <button
                                    onClick={() =>
                                        activeTab === "saved"
                                            ? analyzeSaved()
                                            : analyzeManual()
                                    }
                                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-semibold flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Recheck
                                </button>
                            </div>
                        </>
                    )}

                    {/* No interactions */}
                    {!loading &&
                        results.length === 0 &&
                        !errorMsg && (
                            <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5" />
                                Ready to analyze medicines safely.
                            </div>
                        )}
                </div>
            </section>
        </div>
    );
}