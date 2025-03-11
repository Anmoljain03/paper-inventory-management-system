import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PaperList from "./components/PaperList";
import AssignedPapers from "./components/AssignedPaperList";
import AssignPaperForm from "./components/AssignPaperForm";
import PaperForm from "./components/PaperForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [papers, setPapers] = useState([]); // Store available papers

  // Function to fetch available papers
  const fetchPapers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/papers`);
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-paper" element={<PaperForm fetchPapers={fetchPapers} />} />
          <Route path="/papers" element={<PaperList papers={papers} fetchPapers={fetchPapers} />} />
          <Route path="/assigned-papers" element={<AssignedPapers fetchPapers={fetchPapers} />} />
          <Route path="/assign-paper" element={<AssignPaperForm fetchPapers={fetchPapers} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
