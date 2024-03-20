import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// to disable automatic static optimization completely
// required to create a CSP with nonce for every requested
MyApp.getInitialProps = () => {
  return {};
};

export default api.withTRPC(MyApp);
