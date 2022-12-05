import type { AppProps } from "next/app";
import "reflect-metadata";

import Layout from "../components/Layouts/Document";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

