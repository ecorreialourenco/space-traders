import React from "react";
import { Footer, Header } from "./components";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div style={{ height: "calc(100vh - 8rem)" }}>{children}</div>
      <Footer />
    </div>
  );
};
