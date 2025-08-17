import React from "react";
import "./AiReviewPopup.css";
import Markdown from "react-markdown";

const AiReviewPopup = ({ show, loading, review, onClose }) => {
  if (!show) return null; // don't render if not visible

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        {/* Close Button */}
        <button className="popup-close" onClick={onClose}>
          ✖
        </button>

        <h3 className="popup-title">AI Code Review</h3>

        <div className="popup-content">
          {loading ? (
            <div className="popup-loading">⏳ Loading review...</div>
          ) : (
            <Markdown>{review || "No review available."}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiReviewPopup;