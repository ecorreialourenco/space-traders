import bcrypt from "bcrypt";
import fs from "fs";
import { sign as signToken, verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL, USER_URL } from "@/constants";
import { ServerResponseModel, User } from "@/models";

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
      Authorization: `Bearer ${process.env.ACCOUNT_TOKEN}`,
    },
    body: JSON.stringify({
      symbol: username,
      faction,
    }),
  };

  const serverResponse = await fetch(BASE_URL);
  const serverResponseJson: ServerResponseModel = await serverResponse.json();

  const response = await fetch(`${BASE_URL}/register`, options);
  const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const { data, error } = await response.json();

  if (data?.token) {
    let previousContent: string | null = null;
    try {
      previousContent = fs.readFileSync(USER_URL, "utf8");
    } catch {}

    const newUser = {
      id: data.token,
      username,
      password: newPassword,
      token: data.token,
      expire: serverResponseJson.serverResets.next,
    };
    const jwtToken = signToken(
      newUser,
      process.env.NEXT_PUBLIC_JWT_SECRET ?? ""
    );
    const parsedPreviousContent =
      previousContent && JSON.parse(previousContent);
    const today = new Date();

    const previousContentVerified = parsedPreviousContent?.filter(
      (token: string) => {
        try {
          const user = verify(
            token,
            process.env.NEXT_PUBLIC_JWT_SECRET ?? ""
          ) as User;
          return new Date(user.expire) > today;
        } catch {
          return null;
        }
      }
    );

    const newContent = previousContentVerified
      ? [...previousContentVerified, jwtToken]
      : [jwtToken];

    fs.writeFileSync(USER_URL, JSON.stringify(newContent));
  }

  res.status(200).json({ token: data?.token, error: error?.message });
}
