import { Poller_One } from "next/font/google";

const pollerOne = Poller_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poller-one",
  weight: ["400"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pollerOne.variable}>
      <body>{children}</body>
    </html>
  );
}
