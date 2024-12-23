import React from "react";
import "./CommonTable.css";

const CommonTable = ({ headings, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {headings.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default CommonTable;
