import React, { useState, useEffect } from "react";
import {
    Stethoscope,
    Bell,
    User,
    Plus,
    Trash2,
    Upload,
    Camera,
    ScanLine,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    RefreshCw,
    Save,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function ScanPrescriptionPage() {
    const [activeTab, setActiveTab] = useState("manual");

    const [manualMeds, setManualMeds] = useState([
        { id: 1, name: "", dosage: "", frequency: "" },
    ]);

    const [preview, setPreview] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scanDone, setScanDone] = useState(false);
    const [toast, setToast] = useState(false);
    const [error, setError] = useState(false);

    const [ocrRows, setOcrRows] = useState([
        {
            id: 1,
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3x Daily",
            confidence: 96,
        },
        {
            id: 2,
            name: "Panadol",
            dosage: "1 Tablet",
            frequency: "When Needed",
            confidence: 91,
        },
    ]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const addManualRow = () => {
        setManualMeds([
            ...manualMeds,
            {
                id: Date.now(),
                name: "",
                dosage: "",
                frequency: "",
            },
        ]);
    };

    const updateManualRow = (id, field, value) => {
        setManualMeds((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const deleteManualRow = (id) => {
        setManualMeds((prev) => prev.filter((row) => row.id !== id));
    };

    const startFakeScan = () => {
        setScanning(true);
        setScanDone(false);
        setError(false);

        setTimeout(() => {
            setScanning(false);

            // simulate random unclear image chance
            const unclear = Math.random() < 0.2;

            if (unclear) {
                setError(true);
                return;
            }

            setScanDone(true);
        }, 2500);
    };

    const updateOCR = (id, field, value) => {
        setOcrRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const deleteOCR = (id) => {
        setOcrRows((prev) => prev.filter((row) => row.id !== id));
    };

    const addMissingMedicine = () => {
        setOcrRows((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                dosage: "",
                frequency: "",
                confidence: 0,
            },
        ]);
    };

    const saveAll = () => {
        setToast(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 pt-10 pb-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Scan Prescription
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                    Upload or manually enter medicines safely
                </p>
            </section>

            {/* Main Card */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 pb-14">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <button
                            onClick={() => setActiveTab("manual")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${activeTab === "manual"
                                ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Manual Entry
                        </button>

                        <button
                            onClick={() => setActiveTab("scan")}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${activeTab === "scan"
                                ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Camera Scan
                        </button>
                    </div>

                    {/* MANUAL ENTRY */}
                    {activeTab === "manual" && (
                        <div className="space-y-5">
                            {manualMeds.map((row) => (
                                <div
                                    key={row.id}
                                    className="grid md:grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-200 hover:shadow-md transition"
                                >
                                    <input
                                        placeholder="Medicine Name"
                                        value={row.name}
                                        onChange={(e) =>
                                            updateManualRow(
                                                row.id,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        placeholder="Dosage"
                                        value={row.dosage}
                                        onChange={(e) =>
                                            updateManualRow(
                                                row.id,
                                                "dosage",
                                                e.target.value
                                            )
                                        }
                                        className="px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        placeholder="Frequency"
                                        value={row.frequency}
                                        onChange={(e) =>
                                            updateManualRow(
                                                row.id,
                                                "frequency",
                                                e.target.value
                                            )
                                        }
                                        className="px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        onClick={() => deleteManualRow(row.id)}
                                        className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            ))}

                            <div className="flex flex-wrap gap-4 pt-2">
                                <button
                                    onClick={addManualRow}
                                    className="px-5 py-3 rounded-2xl bg-blue-50 text-blue-700 font-semibold hover:shadow-md transition flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Another Medicine
                                </button>

                                <button
                                    onClick={saveAll}
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:scale-105 transition flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Confirm & Save
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CAMERA SCAN */}
                    {activeTab === "scan" && (
                        <div>
                            {/* Upload */}
                            <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center hover:border-blue-500 transition">
                                <div className="flex justify-center mb-4">
                                    <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-xl">
                                    Upload Prescription Image
                                </h3>

                                <p className="text-slate-500 mt-2 mb-5">
                                    JPG / PNG / Camera capture simulation
                                </p>

                                <label className="cursor-pointer px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold inline-flex gap-2 items-center">
                                    <Upload className="w-4 h-4" />
                                    Upload Image
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setPreview(
                                                    URL.createObjectURL(file)
                                                );
                                                setScanDone(false);
                                                setError(false);
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Preview */}
                            {preview && (
                                <div className="mt-6">
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full max-h-72 object-cover rounded-3xl border"
                                    />
                                </div>
                            )}

                            {/* Scan button */}
                            <div className="mt-6 flex flex-wrap gap-4">
                                <button
                                    onClick={startFakeScan}
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
                                >
                                    <ScanLine className="w-4 h-4" />
                                    Start Scan
                                </button>

                                <button
                                    onClick={() => {
                                        setPreview(null);
                                        setScanDone(false);
                                        setError(false);
                                    }}
                                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-semibold flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Re-Scan
                                </button>
                            </div>

                            {/* Loading */}
                            {scanning && (
                                <div className="mt-6 p-5 rounded-2xl bg-blue-50 flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                    AI is extracting medicines from image...
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="mt-6 p-5 rounded-2xl bg-red-50 text-red-700 flex items-center gap-3">
                                    <AlertTriangle className="w-5 h-5" />
                                    Image unclear. Please upload a clearer image.
                                </div>
                            )}

                            {/* Results */}
                            {scanDone && (
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-5">
                                        OCR Extraction Results
                                    </h3>

                                    <div className="space-y-4">
                                        {ocrRows.map((row) => (
                                            <div
                                                key={row.id}
                                                className="grid md:grid-cols-5 gap-4 p-4 rounded-2xl border border-slate-200 hover:shadow-md transition"
                                            >
                                                <input
                                                    value={row.name}
                                                    onChange={(e) =>
                                                        updateOCR(
                                                            row.id,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-4 py-3 rounded-xl border"
                                                />

                                                <input
                                                    value={row.dosage}
                                                    onChange={(e) =>
                                                        updateOCR(
                                                            row.id,
                                                            "dosage",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-4 py-3 rounded-xl border"
                                                />

                                                <input
                                                    value={row.frequency}
                                                    onChange={(e) =>
                                                        updateOCR(
                                                            row.id,
                                                            "frequency",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-4 py-3 rounded-xl border"
                                                />

                                                <div className="flex items-center">
                                                    <span className="px-3 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                        {row.confidence}%
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        deleteOCR(row.id)
                                                    }
                                                    className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-6">
                                        <button
                                            onClick={addMissingMedicine}
                                            className="px-5 py-3 rounded-2xl bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Missing Medicine
                                        </button>

                                        <button
                                            onClick={saveAll}
                                            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
                                        >
                                            <Save className="w-4 h-4" />
                                            Confirm & Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3 z-50">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                    <span className="font-medium">
                        Prescription saved successfully!
                    </span>
                </div>
            )}
        </div>
    );
}