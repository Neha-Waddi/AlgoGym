import axios from "axios";
import dbConnectMongoose from "../lib/mongoose";
import UserHandle from "./user-handles";

export async function getUserProgress(email) {
  await dbConnectMongoose();
  const user = await UserHandle.findOne({ email });

  const leetcodeLink = user?.leetcode;

  if (!leetcodeLink) throw new Error("LeetCode handle not found");

  const leetcodeUsername = leetcodeLink.split("/").filter(Boolean).pop();

  const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
  const stats = response.data;


  const weakTopics = [];
  if (stats.easySolved < 150) {
    weakTopics.push("Arrays");
    weakTopics.push("Strings");
    weakTopics.push("Sortings");
    weakTopics.push("LinkedList");

   }
  if (stats.mediumSolved < 150) {
    weakTopics.push("Sliding Window");
    weakTopics.push("2 pointers");
    weakTopics.push("Trees");

  };
  if (stats.hardSolved < 30) {
    weakTopics.push("Dynamic Programming");
    weakTopics.push("Greedy");
    weakTopics.push("Graphs");
  }
  console.log("weak topics generated in lib/get-userprogress.js",weakTopics);

  return weakTopics;
}