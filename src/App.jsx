import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ScanPrescription from "./pages/ScanPrescription";
import DDIChecker from "./pages/DDIChecker";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPrescription />} />
        <Route path="/ddi" element={<DDIChecker />} />
      </Routes>
    </BrowserRouter>
  );
}