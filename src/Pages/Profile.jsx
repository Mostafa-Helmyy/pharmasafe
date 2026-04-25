import React, { useState, useEffect } from "react";
import {
    Stethoscope,
    Bell,
    User,
    Edit3,
    Save,
    Plus,
    Trash2,
    ShieldCheck,
    Lock,
    BellRing,
    Eye,
    LogOut,
    CheckCircle2,
    AlertTriangle,
    Pill,
    HeartPulse,
} from "lucide-react";

export default function Profile() {
    const [toast, setToast] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "Mostafa Helmy",
        age: "22",
        gender: "Male",
        weight: "78",
        email: "mostafa@email.com",
    });

    const [medications, setMedications] = useState([
        {
            id: 1,
            name: "Panadol",
            dosage: "500mg",
            frequency: "Once Daily",
        },
        {
            id: 2,
            name: "Metformin",
            dosage: "850mg",
            frequency: "Twice Daily",
        },
    ]);

    const [allergies, setAllergies] = useState([
        "Penicillin",
        "Aspirin",
    ]);

    const [conditions, setConditions] = useState([
        "Diabetes",
        "Asthma",
    ]);

    const conditionOptions = [
        "Diabetes",
        "Hypertension",
        "Asthma",
        "Heart Disease",
    ];

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(
                () => setToast(false),
                2500
            );
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = () => setToast(true);

    const updateProfile = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addMedication = () => {
        setMedications((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                dosage: "",
                frequency: "",
            },
        ]);
    };

    const updateMedication = (
        id,
        field,
        value
    ) => {
        setMedications((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    const deleteMedication = (id) => {
        setMedications((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const addAllergy = () => {
        const value = prompt("Enter allergy:");
        if (
            value &&
            !allergies.includes(value)
        ) {
            setAllergies((prev) => [
                ...prev,
                value,
            ]);
        }
    };

    const removeAllergy = (name) => {
        setAllergies((prev) =>
            prev.filter((a) => a !== name)
        );
    };

    const toggleCondition = (item) => {
        setConditions((prev) =>
            prev.includes(item)
                ? prev.filter((c) => c !== item)
                : [...prev, item]
        );
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
                                className={`transition hover:text-blue-600 ${item === "Profile"
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
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                    My Health Profile
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                    Manage your medications and health
                    information safely.
                </p>
            </section>

            {/* Layout */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14 grid xl:grid-cols-3 gap-6">
                {/* LEFT SIDE */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Personal Info */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-bold">
                                Personal Information
                            </h3>

                            <button className="text-blue-600 flex items-center gap-2 font-medium">
                                <Edit3 className="w-4 h-4" />
                                Edit
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                value={profile.fullName}
                                onChange={(e) =>
                                    updateProfile(
                                        "fullName",
                                        e.target.value
                                    )
                                }
                                placeholder="Full Name"
                                className="px-4 py-3 rounded-2xl border"
                            />

                            <input
                                value={profile.age}
                                onChange={(e) =>
                                    updateProfile(
                                        "age",
                                        e.target.value
                                    )
                                }
                                placeholder="Age"
                                className="px-4 py-3 rounded-2xl border"
                            />

                            <select
                                value={profile.gender}
                                onChange={(e) =>
                                    updateProfile(
                                        "gender",
                                        e.target.value
                                    )
                                }
                                className="px-4 py-3 rounded-2xl border"
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <input
                                value={profile.weight}
                                onChange={(e) =>
                                    updateProfile(
                                        "weight",
                                        e.target.value
                                    )
                                }
                                placeholder="Weight"
                                className="px-4 py-3 rounded-2xl border"
                            />

                            <input
                                value={profile.email}
                                onChange={(e) =>
                                    updateProfile(
                                        "email",
                                        e.target.value
                                    )
                                }
                                placeholder="Email"
                                className="px-4 py-3 rounded-2xl border md:col-span-2"
                            />
                        </div>

                        <button
                            onClick={showToast}
                            className="mt-5 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>

                    {/* Daily Medications */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <h3 className="text-xl font-bold mb-5">
                            Daily Medications
                        </h3>

                        <div className="space-y-4">
                            {medications.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid md:grid-cols-4 gap-4"
                                >
                                    <input
                                        value={item.name}
                                        onChange={(e) =>
                                            updateMedication(
                                                item.id,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Medicine"
                                        className="px-4 py-3 rounded-2xl border"
                                    />

                                    <input
                                        value={item.dosage}
                                        onChange={(e) =>
                                            updateMedication(
                                                item.id,
                                                "dosage",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Dosage"
                                        className="px-4 py-3 rounded-2xl border"
                                    />

                                    <input
                                        value={item.frequency}
                                        onChange={(e) =>
                                            updateMedication(
                                                item.id,
                                                "frequency",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Frequency"
                                        className="px-4 py-3 rounded-2xl border"
                                    />

                                    <button
                                        onClick={() =>
                                            deleteMedication(item.id)
                                        }
                                        className="rounded-2xl bg-red-50 text-red-700 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-5">
                            <button
                                onClick={addMedication}
                                className="px-5 py-3 rounded-2xl bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Medication
                            </button>

                            <button
                                onClick={showToast}
                                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold"
                            >
                                Save Medications
                            </button>
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-bold">
                                Allergies
                            </h3>

                            <button
                                onClick={addAllergy}
                                className="text-blue-600 font-medium flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Allergy
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {allergies.map((item) => (
                                <button
                                    key={item}
                                    onClick={() =>
                                        removeAllergy(item)
                                    }
                                    className="px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
                                >
                                    {item} ×
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Conditions */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <h3 className="text-xl font-bold mb-5">
                            Medical Conditions
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {conditionOptions.map((item) => {
                                const active =
                                    conditions.includes(item);

                                return (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            toggleCondition(item)
                                        }
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-100 hover:bg-slate-200"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    {/* Completion */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <h3 className="text-xl font-bold mb-4">
                            Profile Completion
                        </h3>

                        <div className="text-4xl font-bold text-blue-600">
                            85%
                        </div>

                        <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="h-full w-[85%] bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
                        </div>

                        <div className="mt-5 space-y-3 text-sm">
                            <div className="flex gap-2 items-center text-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                Personal Info Completed
                            </div>

                            <div className="flex gap-2 items-center text-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                Medications Added
                            </div>

                            <div className="flex gap-2 items-center text-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                Allergies Added
                            </div>

                            <div className="flex gap-2 items-center text-yellow-700">
                                <AlertTriangle className="w-4 h-4" />
                                Add Emergency Contact
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <h3 className="text-xl font-bold mb-5">
                            Account Settings
                        </h3>

                        <div className="space-y-3">
                            {[
                                [
                                    "Change Password",
                                    Lock,
                                    "bg-blue-50 text-blue-700",
                                ],
                                [
                                    "Notifications Settings",
                                    BellRing,
                                    "bg-emerald-50 text-emerald-700",
                                ],
                                [
                                    "Privacy Settings",
                                    Eye,
                                    "bg-purple-50 text-purple-700",
                                ],
                                [
                                    "Logout",
                                    LogOut,
                                    "bg-red-50 text-red-700",
                                ],
                            ].map(
                                ([label, Icon, style]) => (
                                    <button
                                        key={label}
                                        className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 font-medium transition hover:shadow-md ${style}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Smart Health Box */}
                    <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white">
                        <HeartPulse className="w-8 h-8 mb-4" />
                        <h3 className="text-xl font-bold">
                            Smart Health Insights
                        </h3>
                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                            Keeping your profile updated helps
                            PharmaSafe deliver more accurate
                            interaction checks and safer medicine
                            recommendations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3 z-50">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                    <span className="font-medium">
                        Profile updated successfully!
                    </span>
                </div>
            )}
        </div>
    );
}