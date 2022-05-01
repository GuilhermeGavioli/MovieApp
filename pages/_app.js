import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (



    <SessionProvider session={session}>
      {/* adicionar em next js config depois... */}
      <Head><link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /></Head>


      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
