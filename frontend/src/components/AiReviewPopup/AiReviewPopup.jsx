import React from "react";
import "./AiReviewPopup.css"; // optional for styling

const AiReviewPopup = ({ review, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>✖</button>
        <h2>AI Review</h2>
        <div className="popup-content">
          <pre>{review}</pre>
        </div>
      </div>
    </div>
  );
};

export default AiReviewPopup;
