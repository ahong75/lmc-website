import React, { useState } from "react";

const Playground = () => {
  const [language, setLanguage] = useState("");
  const [situation, setSituation] = useState("");
  const [vocabList, setVocabList] = useState("");
  const [grammarRules, setGrammarRules] = useState([]);
  const [newGrammarRule, setNewGrammarRule] = useState("");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const addGrammarRule = () => {
    if (newGrammarRule.trim()) {
      setGrammarRules([...grammarRules, newGrammarRule.trim()]);
      setNewGrammarRule("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input) return;

    const vocab = vocabList
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean)
      .join(", ");

    const rules = grammarRules.length
      ? `Follow these grammar rules: ${grammarRules.join("; ")}.`
      : "";

    const prompt = `You are a helpful language tutor. Converse in ${
      language || "English"
    } and act like you're ${situation || "having a general conversation"}. ${
      vocab ? `Tend to use the following vocabulary: ${vocab}.` : ""
    } ${rules} Provide feedback on grammar and vocabulary.`;

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
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Playground</h2>
      <p className="text-gray-700 mb-6">
        Experiment with your own prompts! Customize the language, situation,
        vocabulary list, and grammar rules to see how the AI responds.
      </p>
      <div className="mb-4">
        <label className="block font-medium mb-1">Language:</label>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="e.g., Spanish"
        />
        <label className="block font-medium mb-1">Situation:</label>
        <input
          type="text"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="e.g., ordering food at a restaurant"
        />
        <label className="block font-medium mb-1">
          Vocabulary List (comma-separated):
        </label>
        <input
          type="text"
          value={vocabList}
          onChange={(e) => setVocabList(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="e.g., comida, restaurante, mesero"
        />
        <label className="block font-medium mb-1">Add Grammar Rule:</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newGrammarRule}
            onChange={(e) => setNewGrammarRule(e.target.value)}
            className="flex-grow border p-2"
            placeholder="e.g., Use only present tense verbs"
          />
          <button
            onClick={addGrammarRule}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Rule
          </button>
        </div>
        {grammarRules.length > 0 && (
          <div className="bg-gray-100 p-2 rounded mb-4">
            <h3 className="font-medium mb-2">Grammar Rules:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {grammarRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
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
      <div className="bg-white p-4 rounded-lg shadow-sm">
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

export default Playground;
