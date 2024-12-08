import React, { useState } from "react";

const IterationTwo = () => {
  const [chat, setChat] = useState([]);
  const [language, _setLanguage] = useState("Spanish");
  const [situation, _setSituation] = useState("ordering food at a restaurant");
  const [vocabList, _setVocabList] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const setLanguage = (value) => {
    _setLanguage(value);
    setChat([]);
  };

  const setSituation = (value) => {
    _setSituation(value);
    setChat([]);
  };

  const setVocabList = (value) => {
    _setVocabList(value);
    setChat([]);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input) return;

    const vocab = vocabList
      .split(",")
      .map((word) => word.trim())
      .join(", ");
    const prompt = `You are a helpful language tutor. Converse in ${language} and act like you're ${situation}. Tend to use the following vocabulary words in your responses: ${vocab}. Provide feedback on grammar and vocabulary.`;

    const messages = [...chat, { role: "user", content: input }];
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "system", content: prompt }, ...messages],
        }),
      });

      const data = await res.json();
      messages.push({
        role: "assistant",
        content: data.choices[0]?.message.content,
      });
      setChat(messages);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        Iteration 2: Introducing Vocabulary Lists
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
        <label className="block font-medium mb-1">Language:</label>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <label className="block font-medium mb-1">Situation:</label>
        <input
          type="text"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <label className="block font-medium mb-1">
          Vocabulary List (comma-separated):
        </label>
        <input
          type="text"
          value={vocabList}
          onChange={(e) => setVocabList(e.target.value)}
          className="w-full border p-2"
          placeholder="e.g., comida, restaurante, mesero"
        />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-md font-semibold">Resulting Prompt:</h3>
        <p>
          You are a helpful language tutor. Converse in{" "}
          <strong>{language}</strong> and act like you're{" "}
          <strong>{situation}</strong>. Tend to use the following vocabulary
          words in your responses: <strong>{vocabList || "(none)"}</strong>.
          Provide feedback on grammar and vocabulary.
        </p>
      </div>
      <form onSubmit={handleSend} className="mb-4">
        <label className="block font-medium mb-1">Your Input:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border p-2 mb-2"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          Send
        </button>
      </form>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-md font-semibold">Chat Output:</h3>
        {chat.length > 0 ? (
          chat.map(({ role, content }, idx) => (
            <div key={idx} className="mb-2">
              <strong>{role === "user" ? "You:" : "ChatGPT:"}</strong> {content}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>
    </div>
  );
};

export default IterationTwo;
