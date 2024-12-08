import React from "react";
import IterationOne from "../components/IterationOne";
import IterationThree from "../components/IterationThree";
import IterationTwo from "../components/IterationTwo";
import Playground from "../components/Playground";

const Tutorials = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Learn to Create Effective Prompts
        </h1>
        <p className="text-gray-700 mb-6">
          Use these tutorials to explore how to create effective AI-powered
          prompts for foreign language practice. Follow each step to learn how
          to set language, context, vocabulary, and grammar rules.
        </p>
        <IterationOne />
        <IterationTwo />
        <IterationThree />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Playground</h2>
        <p className="text-gray-700 mb-4">
          Now it's your turn! Use the playground below to create your own
          prompts and practice what you've learned. Experiment with different
          settings, vocabulary lists, and grammar rules to see how the AI
          responds.
        </p>
        <Playground />
      </div>
    </div>
  );
};

export default Tutorials;
