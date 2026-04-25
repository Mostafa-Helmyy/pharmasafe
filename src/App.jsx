import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ScanPrescription from "./pages/ScanPrescription";
import DDIChecker from "./pages/DDIChecker";
import Alternatives from "./pages/Alternatives";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPrescription />} />
        <Route path="/ddi" element={<DDIChecker />} />
        <Route path="/alternatives" element={<Alternatives />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}