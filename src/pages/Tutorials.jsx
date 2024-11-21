import React from "react";
import Iteration from "../components/Iteration";
import IterationOne from "../components/IterationOne";
import Playground from "../components/Playground";

const Tutorials = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tutorials</h1>
      <IterationOne />
      <Iteration iteration={2} />
      <Iteration iteration={3} />
      <Playground />
    </div>
  );
};

export default Tutorials;
