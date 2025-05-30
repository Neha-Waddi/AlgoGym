import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getUserProgress } from "../../lib/get-userprogress";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = session.user.email;

    const weakTopics = await getUserProgress(email);

    if (!weakTopics || weakTopics.length === 0) {
      return res.status(200).json({ problems: [] });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const allProblems = [];

    for (const topic of weakTopics) {
      const prompt = `Generate a DSA problem on the topic "${topic}" with difficulty random. Respond with a valid JSON array like:
[
  {
    "title": "Two Sum",
    "link": "https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy",
    "topic": "Arrays",
    "time": 15,
    "hint": "Use a hashmap to track complements"
  }
]`;

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
      });

      let text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (text.startsWith("```")) {
        text = text.replace(/```json\s*|```/g, "").trim();
      }

      try {
        const topicProblems = JSON.parse(text);
        allProblems.push(...topicProblems);
      } catch (err) {
      }
    }

    res.status(200).json({ problems: allProblems });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Gemini API Error" });
  }
}
