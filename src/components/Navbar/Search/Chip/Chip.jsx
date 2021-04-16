import React from "react";

function Chip({ label, handleAdd, active }) {
  return (
    <div
      className={`genres__item ${active ? "genres__item-active" : ""}`}
      onClick={handleAdd}
    >
      {label}
    </div>
  );
}

export default Chip;
