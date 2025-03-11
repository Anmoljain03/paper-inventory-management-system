import { useState, useEffect } from "react";
import axios from "axios";
import "./AssignPaperForm.css";

const AssignPaperForm = ({ editingAssignment, setEditingAssignment }) => {
  const [paperName, setPaperName] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [moneyPaid, setMoneyPaid] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [availablePapers, setAvailablePapers] = useState([]);

  // ✅ Fetch available papers on component mount
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/papers");
        setAvailablePapers(response.data);
      } catch (error) {
        console.error("Error fetching available papers:", error);
      }
    };
    fetchPapers();
  }, []);

  // ✅ Prefill form if editing an assignment
  useEffect(() => {
    if (editingAssignment) {
      setPaperName(editingAssignment.paperName);
      setPrinterName(editingAssignment.printerName);
      setQuantity(editingAssignment.quantity);
      setMoneyPaid(editingAssignment.moneyPaid);
      setDescription(editingAssignment.description);
    } else {
      setPaperName("");
      setPrinterName("");
      setQuantity("");
      setMoneyPaid("");
      setDescription("");
    }
  }, [editingAssignment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paperName || !printerName || !quantity || !moneyPaid) {
      alert("Please fill in all required fields.");
      return;
    }

    const paperData = {
      paperName,
      printerName,
      quantity: Number(quantity),
      moneyPaid: Number(moneyPaid),
      description: description || "No description provided",
    };

    try {
      if (editingAssignment) {
        // ✅ Correct API route for updating assigned paper
        await axios.put(
          `http://localhost:5000/api/assignedPapers/assigned/${editingAssignment._id}`,
          paperData
        );
        setMessage("Paper assignment updated successfully!");
      } else {
        // ✅ Assign new paper
        await axios.post("http://localhost:5000/api/assignedPapers/assign", paperData);
        setMessage("Paper assigned successfully!");
      }

      // ✅ Reset form after submission
      setPaperName("");
      setPrinterName("");
      setQuantity("");
      setMoneyPaid("");
      setDescription("");
      
      if (typeof setEditingAssignment === "function") {
        setEditingAssignment(null);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setMessage("Failed to process request. Please try again.");
    }
  };

  return (
    <div className="assign-container">
      <h2>{editingAssignment ? "Edit Assigned Paper" : "Assign Paper"}</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="assign-form">
        {/* ✅ Dropdown for selecting available papers */}
        <select
          value={paperName}
          onChange={(e) => setPaperName(e.target.value)}
          required
          disabled={!!editingAssignment} // Prevent changing paper name when editing
        >
          <option value="">Select Paper</option>
          {availablePapers.map((paper) => (
            <option key={paper._id} value={paper.paperName}>
              {paper.paperName} (Available: {paper.quantity})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Printer Name"
          value={printerName}
          onChange={(e) => setPrinterName(e.target.value)}
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
          type="number"
          placeholder="Money Paid"
          value={moneyPaid}
          onChange={(e) => setMoneyPaid(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="assign-button">
          {editingAssignment ? "Update Assignment" : "Assign"}
        </button>
        {editingAssignment && typeof setEditingAssignment === "function" && (
          <button type="button" onClick={() => setEditingAssignment(null)} className="cancel-btn">
            Cancel Edit
          </button>
        )}
      </form>

      {/* ✅ Display Available Papers */}
      <div className="available-papers">
        <h3>Available Papers</h3>
        <ul className="paper-list">
          {availablePapers.length > 0 ? (
            availablePapers.map((paper) => (
              <li key={paper._id} className="paper-item">
                <strong>{paper.paperName}</strong> - {paper.quantity} left
              </li>
            ))
          ) : (
            <p>No papers available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AssignPaperForm;
