import React from "react";
import PromptDemo from "./PromptDemo";

const Iteration = ({ iteration }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Iteration {iteration}</h2>
      <PromptDemo iteration={iteration} />
    </div>
  );
};

export default Iteration;
