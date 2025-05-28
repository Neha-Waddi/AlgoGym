import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic, level } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate 3 DSA problems on the topic "${topic}" with difficulty "${level}". Respond with only a valid JSON array like:
[
  {
    "title": "Two Sum",
    "link":"https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy",
    "topic": "Arrays",
    "time": 15,
    "hint": "Use a hashmap to track complements"
  },
  ...
]`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    let text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (text.startsWith("```")) {
      text = text.replace(/```json\s*|```/g, "").trim();
    }

    let problems = [];
    try {
      problems = JSON.parse(text);
    } catch (err) {
      console.warn("Gemini returned non-JSON text:", text);
    }

    res.status(200).json({ problems });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Gemini API Error" });
  }
}
