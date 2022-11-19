import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../store/store";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [id, setId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const store = useStore();
  const persistor = persistStore(store);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
          console.log(liff);
          // console.log("login test")
          // liff.login();
          // console.log("login okay")
          // const context = liff.getContext()
          // const liffToken = liff.getAccessToken()
          // setId(context.userId)
          // setAccessToken(liffToken)
          // console.log(id)
          // console.log(accessToken)
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
