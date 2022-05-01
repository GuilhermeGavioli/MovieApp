import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (



    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
