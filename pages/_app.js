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
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(() => {

          if (!liff.isLoggedIn()) {
            console.log("liff.init() done");
            //liff.login({ redirectUri: location.href });
            liff.login();
            //const token = liff.getDecodedIDToken();
          }

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
        });
    });
  }, []);

  // Execute liff.init() when the app is initialized

  // Provide `liff` object and `liffError` object
  // to page component as property
  // pageProps.liff = liffObject;
  // pageProps.liffError = liffError;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
