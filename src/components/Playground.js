import React, { useState } from "react";

const Playground = () => {
  const [language, setLanguage] = useState("");
  const [situation, setSituation] = useState("");
  const [vocabList, setVocabList] = useState("");
  const [grammarRule, setGrammarRule] = useState("");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input) return;

    const vocab = vocabList
      .split(",")
      .map((word) => word.trim())
      .join(", ");
    const prompt = `You are a helpful language tutor. Converse in ${
      language || "English"
    } and act like you're ${situation || "having a general conversation"}. ${
      vocab ? `Tend to use the following vocabulary: ${vocab}.` : ""
    } ${
      grammarRule
        ? `Ensure that your responses follow this grammar rule: ${grammarRule}.`
        : ""
    } Provide feedback on grammar and vocabulary.`;

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
        <label className="block font-medium mb-1">Grammar Rule:</label>
        <input
          type="text"
          value={grammarRule}
          onChange={(e) => setGrammarRule(e.target.value)}
          className="w-full border p-2"
          placeholder="e.g., Use only present tense verbs"
        />
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
