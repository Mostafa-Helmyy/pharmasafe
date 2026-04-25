import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ScanPrescription from "./pages/ScanPrescription";
import DDIChecker from "./pages/DDIChecker";
import Alternatives from "./pages/Alternatives";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPrescription />} />
        <Route path="/ddi" element={<DDIChecker />} />
        <Route path="/alternatives" element={<Alternatives />} />
      </Routes>
    </BrowserRouter>
  );
}