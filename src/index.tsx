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
import { createStore, applyMiddleware } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import rootReducer, { rootSaga } from "store";
import createSagaMiddleware from "redux-saga";

// Moment (시간 관리 라이브러리) - 한국어 지원
import "moment/locale/ko";

const sagaMiddleware = createSagaMiddleware();

// redux 미들웨어 적용
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");

  const logger = createLogger({
    collapsed: true,
  });

  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

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
