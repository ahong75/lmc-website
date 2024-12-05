import React, { useState } from "react";

const IterationOne = () => {
  const [chat, setChat] = useState([]);

  const [language, _setLanguage] = useState("Spanish");
  const [situation, _setSituation] = useState("ordering food at a restaurant");

  const setLanguage = (value) => {
    _setLanguage(value);
    setChat([]);
  }

  const setSituation = (value) => {
    _setSituation(value);
    setChat([]);
  }

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    const prompt = `You are a helpful language tutor. Converse in ${language} and act like you're ${situation}. Provide feedback on grammar and vocabulary.`;
    const messages = [
      ...chat,
      { role: "user", content: input },
    ];

    setLoading(true);
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
          ...messages,
        ],
      }),
    });

    const data = await res.json();
    messages.push({ role: "assistant", content: data.choices[0].message.content });
    setChat(messages);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">
        Iteration 1: Setting Language and Context
      </h2>
      <p className="mt-2">
        In this step, you'll learn how to specify the language and context for
        ChatGPT. A simple prompt template is provided below, and you can modify
        some of the variables to experiment with different languages and
        scenarios.
      </p>
      <div className="mt-4">
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
        <h3 className="text-md font-semibold">Resulting Prompt:</h3>
        You are a helpful language tutor. Converse in <strong>{language}</strong> and act like you're <strong>{situation}</strong>. Provide feedback on grammar and vocabulary.
      </div>
      {!!chat.length && <div className="mt-4">
        <h3 className="text-md font-semibold">Chat Output</h3>
        <div className="p-4 border mt-2">{chat.map(({ role, content }, i) => (
          <div key={i} className="mb-2">
            <strong>{role === "user" ? "You:" : "ChatGPT:"}</strong> {content}
          </div>
        ))}</div>
      </div>}
      <div className="mt-4">
        <h3 className="text-md font-semibold">Chat Input</h3>
        <form onSubmit={handleSend} className="mt-2">
          <input
            className="w-full border p-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to ChatGPT here..."
            disabled={loading}
          ></input>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
            disabled={loading}
          >
            Send Message
          </button>
        </form>
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
