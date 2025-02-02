import { Layout } from "@/components";
import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <Typography variant="h3" className="app-text">
          Wellcome <br />
          to
        </Typography>
        <Typography variant="h2" className="app-text">
          Space Traders
        </Typography>

        <Button onClick={() => signOut()}>signup</Button>
      </div>
    </Layout>
  );
}
