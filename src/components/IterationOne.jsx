import React, { useState } from "react";

const IterationOne = () => {
  const [language, setLanguage] = useState("Spanish");
  const [situation, setSituation] = useState("ordering food at a restaurant");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const prompt = `You are a helpful language tutor. Converse in ${language} and act like you're ${situation}. Provide feedback on grammar and vocabulary.`;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: input },
        ],
      }),
    });

    const data = await res.json();
    setResponse(data.choices[0].message.content);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">
        Iteration 1: Setting Language and Context
      </h2>
      <p className="mt-2">
        In this step, you’ll learn how to specify the language and context for
        ChatGPT. Use the example prompt below to start, then modify it to test a
        different language and situation.
      </p>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Editable Prompt</h3>
        <textarea
          className="w-full border p-2 mt-2"
          value={`You are a helpful language tutor. Converse in ${language} and act like you're ${situation}. Provide feedback on grammar and vocabulary.`}
          readOnly
        ></textarea>
        <div className="mt-4">
          <label className="block font-medium">Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block font-medium">Situation:</label>
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-full border p-2 mt-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Chat Input</h3>
        <textarea
          className="w-full border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message to ChatGPT here..."
        ></textarea>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
        >
          Send to ChatGPT
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Chat Output</h3>
        <div className="p-4 border mt-2">{response}</div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Your Task:</h3>
        <p>
          Try modifying the <strong>Language</strong> and{" "}
          <strong>Situation</strong> above. Experiment with different scenarios
          and test the resulting chat until you're satisfied. For example, you
          could try:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Language: French, Situation: asking for directions</li>
          <li>Language: Japanese, Situation: shopping in a grocery store</li>
          <li>Language: German, Situation: booking a hotel room</li>
        </ul>
      </div>
    </div>
  );
};

export default IterationOne;
