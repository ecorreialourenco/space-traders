import React, { FormEvent, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getFactions } from "@/utils/getFactions";
import { FactionModel } from "@/models";
import { Dropdown, Feedback, Input, InputPassword, Layout } from "@/components";
import { useRouter } from "next/router";

export const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [faction, setFaction] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["factions"],
    queryFn: () => getFactions({ page: 1 }),
  });

  const formatedList = data?.data
    ? data.data.map((item: FactionModel) => ({
        value: item.symbol,
        name: item.name,
      }))
    : [];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password && password === password2) {
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
      } else if (error) {
        setError("");
        router.push("/");
      }
    } else {
      setError("Passwords doesn't match!");
    }
  };

  return (
    <Layout>
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
            <div className="m-2">
              <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
                className="w-full"
              />
            </div>
            <div className="m-2">
              <InputPassword
                label="Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required={true}
                className="w-full"
              />
            </div>
            <div className="m-2">
              <InputPassword
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                className="w-full"
              />
            </div>
            <div className="m-2">
              <Dropdown
                value={faction}
                label="Faction"
                options={formatedList}
                onChange={(faction) => setFaction(faction.target.value)}
              />
            </div>
            <div className="m-2">
              <Button variant="contained" className="w-full" type="submit">
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
