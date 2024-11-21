import React, { useState } from "react";

const PromptDemo = ({ iteration }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const systemPrompt = {
      1: "Act as a language tutor focusing on conversation in {language}. Give feedback on grammar and vocabulary.",
      2: "Act as a language tutor focusing on conversation. Integrate vocabulary from: {vocabulary_list}.",
      3: "Act as a language tutor focusing on conversation. Encourage use of grammar structures: {grammar_structure}.",
    };

    const prompt = systemPrompt[iteration].replace("{language}", "Spanish"); // Replace with dynamic inputs

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
    <div>
      <textarea
        className="w-full border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
      ></textarea>
      <button onClick={handleSend} className="bg-blue-500 text-white p-2 mt-2">
        Send
      </button>
      <div className="mt-4 p-2 border">{response}</div>
    </div>
  );
};

export default PromptDemo;
