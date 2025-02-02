import React, { FormEvent, useState } from "react";
import { Typography } from "@mui/material";
import { Button, Feedback, Input, InputPassword, Layout } from "@/components";
import { signIn } from "next-auth/react";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username) {
      await signIn("credentials", {
        username,
        password,
        redirect: true,
        callbackUrl: "http://localhost:3000",
      });
    }
  };

  return (
    <Layout>
      <Feedback
        isOpen={!!error}
        severity="error"
        message={error}
        onClose={() => setError("")}
      />
      <div className="flex h-full justify-center items-center">
        <div>
          <Typography
            variant="h3"
            className={"pollarOne"}
            style={{ textAlign: "center" }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputPassword
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" label="Login" />
          </form>
        </div>
      </div>
    </Layout>
  );
};
