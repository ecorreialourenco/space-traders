import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import bcrypt from "bcrypt";
import { USER_URL } from "@/constants";

interface LoginResponse {
  token?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const { username, password } = req.body;
  const savedData = fs.readFileSync(USER_URL, "utf8");
  const parsedSavedData = JSON.parse(savedData);

  const user = parsedSavedData.find(
    (item: { username: string; password: string }) => item.username === username
  );

  const match = user && (await bcrypt.compare(password, user.password));

  if (match) {

    res.status(200).json({ token: user.token });
  }

  res.status(200).json({ error: "Username or password doesn't match" });
}
