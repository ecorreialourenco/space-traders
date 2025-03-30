import "@/styles/globals.css";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Poller_One } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Provider } from "react-redux";

import { AuthProvider, Layout } from "@/components";
import store from "@/store/store";

const pollerOne = Poller_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider
      session={pageProps.session}
      refetchOnWindowFocus={false}
      refetchInterval={60}
    >
      <AuthProvider>
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
      </AuthProvider>
    </SessionProvider>
  );
}
