import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import NProgress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

import styles from "./styles.module.scss";
import { store } from "../../../store";
import Header from "../../Header";
import GetProfile from "../GetProfile";

interface IProps {
  children: React.ReactElement;
}

const Layout = (props: IProps) => {
  NProgress.configure({
    showSpinner: false
  });

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <SessionProvider session={props.children.props.session}>
      <Provider store={store}>
        <Head>
          <title>Image loader App</title>
          <meta name="description" content="My SPA for img loading" />
          <link rel="icon" href="/apple.ico" />
        </Head>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          theme="colored"
          closeOnClick
        />

        <Header />
        <div className={styles.document}>
          <GetProfile>{props.children}</GetProfile>
        </div>
      </Provider>
    </SessionProvider>
  );
};

export default Layout;

