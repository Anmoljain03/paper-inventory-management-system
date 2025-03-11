import { useEffect, useState } from "react";
import axios from "axios";
import "./PaperList.css"; // Import styles

const PaperList = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editQuantity, setEditQuantity] = useState({});

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/papers");
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
      setError("Failed to fetch papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePaper = async (paperName) => {
    if (!window.confirm(`Are you sure you want to delete ${paperName}?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/papers/${paperName}`);
      setPapers((prevPapers) => prevPapers.filter((paper) => paper.paperName !== paperName));
      alert("Paper deleted successfully!");
    } catch (error) {
      console.error("Error deleting paper:", error);
      setError("Failed to delete paper. Please try again.");
    }
  };

  const handleQuantityChange = (paperName, value) => {
    setEditQuantity((prev) => ({
      ...prev,
      [paperName]: value,
    }));
  };

  const saveChanges = async (paperName) => {
    const additionalQuantity = parseInt(editQuantity[paperName], 10);

    if (isNaN(additionalQuantity) || additionalQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/papers/${paperName}`, {
        quantity: additionalQuantity, // Send additional quantity, not replacement
      });

      if (response.status === 200) {
        alert("Paper updated successfully!");
        fetchPapers();
      } else {
        throw new Error("Failed to update paper.");
      }
    } catch (error) {
      console.error("Error updating paper:", error);
      alert(error.response?.data?.message || "Something went wrong while updating the paper.");
    }
  };

  return (
    <div className="paper-list-container">
      <h2>Available Papers</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : papers.length === 0 ? (
        <p>No papers available.</p>
      ) : (
        <ul className="paper-list">
          {papers.map((paper) => (
            <li key={paper._id} className="paper-item">
              <h3>{paper.paperName}</h3>
              <p>
                🗓️ Added on:{" "}
                {new Date(paper.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>📦 First Stock: {paper.initialQuantity} sheets</p>
              <p>📌 Current Stock: {paper.quantity} sheets</p>

              {/* Update history */}
              {paper.history?.length > 0 && (
                <div className="history-section">
                  <h4>📌 Update History:</h4>
                  <ul>
                    {paper.history.map((entry, index) => (
                      <li key={index}>
                        {new Date(entry.updatedOn).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        - {entry.quantity} sheets added
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add new quantity */}
              {/* <input
                type="number"
                value={editQuantity[paper.paperName] || ""}
                onChange={(e) => handleQuantityChange(paper.paperName, e.target.value)}
                placeholder="Add quantity"
              />
              <button className="save-button" onClick={() => saveChanges(paper.paperName)}>
                Save
              </button> */}

              <button className="delete-button" onClick={() => deletePaper(paper.paperName)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaperList;
