import axios from "axios";
import dbConnectMongoose from "../lib/mongoose";
import UserHandle from "./user-handles";

export async function getUserProgress(email) {
  await dbConnectMongoose();
  const user = await UserHandle.findOne({ email });

  const leetcodeLink = user?.leetcode;

  if (!leetcodeLink) throw new Error("LeetCode handle not found");

  const leetcodeUsername = leetcodeLink.split("/").filter(Boolean).pop();

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const variables = {
    username: leetcodeUsername
  };

  let stats;
  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const acStats = response.data.data.matchedUser?.submitStats?.acSubmissionNum;
    if (!acStats) throw new Error("Stats not found in response");

    const easy = acStats.find(item => item.difficulty === "Easy")?.count || 0;
    const medium = acStats.find(item => item.difficulty === "Medium")?.count || 0;
    const hard = acStats.find(item => item.difficulty === "Hard")?.count || 0;

    stats = {
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard
    };

  } catch (error) {
    console.error("LeetCode GraphQL fetch error:", error.message);
    throw new Error("Failed to fetch LeetCode data");
  }

  const weakTopics = [];
  if (stats.easySolved < 150) {
    weakTopics.push("Arrays", "Strings","Searchings", "Sortings", "LinkedList","Two Pointers",);
  }
  else if (stats.mediumSolved < 150) {
    weakTopics.push("Sliding Window","Bit Manipulation","Stacks","Queues", "Binary Trees","Binary Search Trees");
  }
  else if (stats.hardSolved < 30) {
    weakTopics.push("Recursion","Heaps","Dynamic Programming", "Greedy", "Graphs","Tries");
  }

  return weakTopics;
}
