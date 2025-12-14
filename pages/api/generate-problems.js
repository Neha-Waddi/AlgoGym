import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getUserProgress } from "../../lib/get-userprogress";
import dbConnectMongoose from "../../lib/mongoose";
import UserHandle from "../../lib/user-handles";

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

    await dbConnectMongoose();
    const user = await UserHandle.findOne({ email });

    const solvedTitlesSet = new Set(
      user.solvedProblems.map((p) => p.title.toLowerCase())
    );

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const allProblems = [];

    for (const topic of weakTopics) {
      const prompt = `
Generate 1 unique DSA problem on the topic "${topic}".
Avoid these titles: ${Array.from(solvedTitlesSet).join(", ")}.

Respond ONLY with valid JSON like:
[
  {
    "title": "Two Sum",
    "link": "https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy",
    "topic": "${topic}",
    "time": 15,
    "hint": "Use a hashmap"
  }
]
`;

      let text = "";

      try {
        const result = await model.generateContent({
          contents: [{ parts: [{ text: prompt }] }],
        });

        text = result.response.text();

        if (text.startsWith("```")) {
          text = text.replace(/```json\s*|```/g, "").trim();
        }

        const parsed = JSON.parse(text);
        allProblems.push(...parsed);

      } catch (error) {
        if (error?.status === 429) {
          return res.status(429).json({
            error: "AI quota exceeded. Please wait 1 minute and try again."
          });
        }

        console.error("Gemini error for topic:", topic, error);
      }
    }

    return res.status(200).json({ problems: allProblems });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
