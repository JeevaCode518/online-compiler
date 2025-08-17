import React from "react";
import Header from "../Header/Header";

const ContestPage = () => {
  return (
    <div style={{
      backgroundColor: "#4b5563", // dark background
      minHeight: "100vh",         // full viewport height
      color: "#f9fafb"            // optional: light text color
    }}>
      <Header />
      <div style={{
        textAlign: "center",
        marginTop: "50px",
        fontSize: "24px",
        fontWeight: "bold"
      }}>
        🚀 Coming Soon!
      </div>
    </div>
  );
};

export default ContestPage;