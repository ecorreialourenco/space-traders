import store from "@/store/store";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Poller_One } from "next/font/google";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components";

const pollerOne = Poller_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Provider store={store}>
            <main className={pollerOne.className}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </main>
          </Provider>
        </HydrationBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
}
