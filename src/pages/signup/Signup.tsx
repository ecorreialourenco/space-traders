import { Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";

import { Button, Dropdown, Feedback, Input, InputPassword } from "@/components";
import { useFactions } from "@/hooks";
import { FactionModel } from "@/models";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [faction, setFaction] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { data, error: factionsError } = useFactions({ page: 1 });
  console.log("🚀 ~ Signup ~ factionsError:", factionsError);
  console.log("🚀 ~ Signup ~ data:", data);

  const formatedList = data?.data
    ? data.data.map((item: FactionModel) => ({
        value: item.symbol,
        name: item.name,
      }))
    : [];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!faction) {
      setError("Please select our faction!");
      return;
    }

    if (password && faction && password === password2) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          faction,
        }),
      };

      const response = await fetch("/api/auth/register", options);
      const resJson = await response.json();

      if (resJson.error) {
        setError(resJson.error);
      } else {
        if (error) {
          setError("");
        }
        await signIn("credentials", {
          username,
          password,
          redirect: true,
          callbackUrl: "http://localhost:3000",
        });
      }
    } else {
      setError("Passwords doesn't match!");
    }
  };

  useEffect(() => {
    if (data?.error) {
      setError(data.error.message);
    }
  }, [data]);

  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Signup
        </Typography>
        <Feedback
          isOpen={!!error}
          severity="error"
          message={error}
          onClose={() => setError("")}
        />
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <InputPassword
            label="Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required={true}
          />
          <InputPassword
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <Dropdown
            value={faction}
            label="Faction"
            options={formatedList}
            onChange={(faction) => setFaction(faction.target.value)}
          />
          <Button type="submit" label="Signup" />
        </form>
      </div>
    </div>
  );
};
