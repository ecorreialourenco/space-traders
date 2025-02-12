import store from "@/store/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <main className={pollerOne.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </main>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
