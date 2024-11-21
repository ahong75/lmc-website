import React, { useState } from "react";
import PromptDemo from "./PromptDemo";

const Playground = () => {
  const [customPrompt, setCustomPrompt] = useState("");

  return (
    <div className="p-4">
      <textarea
        className="w-full border p-2"
        placeholder="Create your own prompt..."
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
      ></textarea>
      <PromptDemo iteration={0} customPrompt={customPrompt} />
    </div>
  );
};

export default Playground;
