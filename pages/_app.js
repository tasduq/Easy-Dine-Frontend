import "../styles/globals.css";
import { AuthProvider } from "../Context/Auth-context";
import { BucketProvider } from "../Context/Bucket-context";
import Layout from "../components/Layout";
import IndexHome from "./index";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("app is running");
  });
  return (
    <>
      <AuthProvider>
        <BucketProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BucketProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
