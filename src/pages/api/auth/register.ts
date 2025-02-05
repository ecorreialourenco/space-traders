import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import bcrypt from "bcrypt";
import { BASE_URL, USER_URL } from "@/constants";

type Data = {
  token: string;
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password, faction } = req.body;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: username,
      faction,
    }),
  };

  const response = await fetch(`${BASE_URL}/register`, options);
  const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const { data, error } = await response.json();

  if (data?.token) {
    let previousContent: string | null = null;
    try {
      previousContent = fs.readFileSync(USER_URL, "utf8");
    } catch {}

    const newUser = {
      username,
      password: newPassword,
      token: data.token,
    };

    const parsedPreviousContent =
      previousContent && JSON.parse(previousContent);
    const newContent = parsedPreviousContent
      ? [...parsedPreviousContent, newUser]
      : [newUser];

    fs.writeFileSync(USER_URL, JSON.stringify(newContent));
  }

  res.status(200).json({ token: data?.token, error: error?.message });
}
