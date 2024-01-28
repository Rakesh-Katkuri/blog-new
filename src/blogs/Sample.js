import React, { useState } from "react";

const Sample = () => {
  const [name, setName] = useState("rakesh");
  return (
    <div className="container">
      <p>{name}</p>
      <h2>Sample</h2>
    </div>
  );
};

export default Sample;
