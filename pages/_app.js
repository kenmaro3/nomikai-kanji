import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../store/store";

function MyApp({ Component, pageProps }) {
  const [id, setId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const store = useStore();
  const persistor = persistStore(store);


  useEffect(() => {
    // if env is dev, ignore liff
    if (process.env.NEXT_PUBLIC_ENV == "dev") {
      return;
    }
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(() => {

          if (!liff.isLoggedIn()) {
            liff.login();
          }
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
        });
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
