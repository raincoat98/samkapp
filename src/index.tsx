// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

// i18next - 다국어 지원
import "./i18n/";

// chakra - UI 라이브러리
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

// redux - 상태 저장소
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "store";

// Moment (시간 관리 라이브러리) - 한국어 지원
import "moment/locale/ko";

import { Font as ReactPdfFont } from "@react-pdf/renderer";
ReactPdfFont.register({
  family: "Nanum Gothic",
  fonts: [
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf",
      fontWeight: 800,
    },
  ],
});

// redux 미들웨어 적용
let logger: any;

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");

  logger = createLogger({
    collapsed: true,
  });
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const serializableCheck = {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        "realm/insertData/fulfilled",
        "realm/updateData/fulfilled",
        "realm/deleteData/fulfilled",
        "realm/getData/fulfilled",
      ],
      ignoredPaths: ["realm"],
    };

    if (logger)
      return getDefaultMiddleware({ serializableCheck }).concat(logger);
    else return getDefaultMiddleware({ serializableCheck });
  },
});
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
