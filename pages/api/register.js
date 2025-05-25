import { createUser, findUserByEmail } from "../../lib/user";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password ,cpassword} = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  if (password!=cpassword) return res.status(400).json({ error: "Passwords do not match" });


  const existing = await findUserByEmail(email);
  if (existing) return res.status(409).json({ error: "User already exists" });

  const result = await createUser({ email, password });
  res.status(201).json({ message: "User created", id: result.insertedId });
}
