import React from "react";
import "./TestItem.css";

function TestItem({ data, index }: any) {
  return (
    <div className="test-item">
      <div>
        <p>content: {data.content}</p>
        <p>index: {index}</p>
      </div>
    </div>
  );
}

export default TestItem;
