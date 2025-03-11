import { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedPaperList.css";

const AssignedPaperList = ({ fetchPapers }) => {
  const [assignedPapers, setAssignedPapers] = useState([]);

  useEffect(() => {
    fetchAssignedPapers();
  }, []);

  // Fetch assigned papers
  const fetchAssignedPapers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/assignedPapers");
      setAssignedPapers(response.data);
    } catch (error) {
      console.error("Error fetching assigned papers:", error);
    }
  };

  // Delete assigned paper (without updating stock)
  const deleteAssignedPaper = async (paperName) => {
    try {
      const paperToDelete = assignedPapers.find((paper) => paper.paperName === paperName);
      if (!paperToDelete) {
        alert("Paper not found!");
        return;
      }

      // ✅ Delete assigned paper (no stock update)
      await axios.delete(`http://localhost:5000/api/assignedPapers/assigned/${paperName}`);

      alert("Assigned paper deleted successfully!");
      fetchAssignedPapers();
      fetchPapers();
    } catch (error) {
      console.error("Error deleting assigned paper:", error);
      alert("Failed to delete assigned paper.");
    }
  };

  return (
    <div className="assigned-container">
      <h2 className="assigned-title">Assigned Papers</h2>
      {assignedPapers.length === 0 ? (
        <p className="no-data">No assigned papers available.</p>
      ) : (
        <ul className="assigned-list">
          {assignedPapers.map((paper) => (
            <li key={paper._id} className="assigned-item">
              <p><strong>Paper Name:</strong> {paper.paperName}</p>
              <p><strong>Printer Name:</strong> {paper.printerName}</p>
              <p><strong>Quantity:</strong> {paper.quantity}</p>
              <p><strong>Money Paid:</strong> ₹{paper.moneyPaid}</p>
              <p><strong>Description:</strong> {paper.description}</p>
              <p><strong>Assigned On:</strong> {new Date(paper.assignedOn).toLocaleString()}</p>

              <button className="delete-btn" onClick={() => deleteAssignedPaper(paper.paperName)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedPaperList;
