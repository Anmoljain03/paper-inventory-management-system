import { useState, useEffect } from "react";
import axios from "axios";
import "./PaperForm.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PaperForm = () => {
  // Add Paper Form State
  const [paperName, setPaperName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  // Edit Paper Form State
  const [editPaperName, setEditPaperName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editMessage, setEditMessage] = useState({ text: "", type: "" });

  // Store available papers
  const [availablePapers, setAvailablePapers] = useState([]);

  // Fetch available papers on component mount
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/papers`);
        setAvailablePapers(response.data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };
    fetchPapers();
  }, []);

  // Handle paper selection in edit form
  const handlePaperSelect = (e) => {
    const selectedPaperName = e.target.value;
    setEditPaperName(selectedPaperName);

    // Find the selected paper details and pre-fill the fields
    const selectedPaper = availablePapers.find(paper => paper.paperName === selectedPaperName);
    if (selectedPaper) {
      setEditQuantity(selectedPaper.quantity);
      setEditDescription(selectedPaper.description);
    } else {
      setEditQuantity("");
      setEditDescription("");
    }
  };

  // Add New Paper
  const handleAddPaperSubmit = async (e) => {
    e.preventDefault();
    if (!paperName || !quantity || !description) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/papers`, {
        paperName,
        quantity: Number(quantity),
        description,
      });

      setMessage({ text: "Paper added successfully!", type: "success" });

      // Clear input fields
      setPaperName("");
      setQuantity("");
      setDescription("");
    } catch (error) {
      console.error("Error adding paper:", error.response?.data || error);
      setMessage({ text: "Failed to add paper.", type: "error" });
    }
  };

  // Edit Existing Paper
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editPaperName || !editQuantity || !editDescription) {
      setEditMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/papers/${editPaperName}`, {
        paperName: editPaperName,
        quantity: Number(editQuantity),
        description: editDescription,
      });

      setEditMessage({ text: "Paper updated successfully!", type: "success" });

      // Clear edit fields
      setEditPaperName("");
      setEditQuantity("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating paper:", error.response?.data || error);
      setEditMessage({ text: "Failed to update paper.", type: "error" });
    }
  };

  return (
    <div className="paper-form-container">
      {/* Add New Paper */}
      <h2>Add New Paper</h2>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
      <form onSubmit={handleAddPaperSubmit} className="paper-form">
        <input
          type="text"
          placeholder="Paper Name"
          value={paperName}
          onChange={(e) => setPaperName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Paper</button>
      </form>

      {/* Edit Existing Paper */}
      <h2>Edit Existing Paper</h2>
      {editMessage.text && <p className={`message ${editMessage.type}`}>{editMessage.text}</p>}
      <form onSubmit={handleEditSubmit} className="paper-form">
        {/* Dropdown to Select Paper */}
        <select value={editPaperName} onChange={handlePaperSelect} required>
          <option value="">Select Paper to Edit</option>
          {availablePapers.map((paper) => (
            <option key={paper._id} value={paper.paperName}>
              {paper.paperName} (Available: {paper.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="New Quantity"
          value={editQuantity}
          onChange={(e) => setEditQuantity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          required
        />
        <button type="submit">Update Paper</button>
      </form>
    </div>
  );
};

export default PaperForm;
