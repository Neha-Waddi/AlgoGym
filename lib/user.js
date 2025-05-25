import clientPromise from "./mongodb";
import bcrypt from "bcryptjs";

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db("algogym");
  return await db.collection("users").findOne({ email });
}

export async function createUser({ email, password }) {
  const client = await clientPromise;
  const db = client.db("algogym");
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({ email, password: hashedPassword });
  return result;
}

export async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
