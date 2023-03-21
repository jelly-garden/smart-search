import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import commonReducer from "./common/common-slice";
import initDataReducer from "./common/init-data-slice";

/**
 * persist (store 페이지 새로고침시 유지) 에서 제외 하고자 하는 대상 state 는
 * 아래와 같이 config로 blacklist에 추가한다.
 */
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["common", "initData", "ws"],
};

const commonConfig = {
    key: "common",
    storage,
    blacklist: ["pageLoading"],
};

const initDataConfig = {
    key: "initData",
    storage,
    blacklist: [],
};

export const reducers = {
    common: persistReducer(commonConfig, commonReducer),
    initData: persistReducer(initDataConfig, initDataReducer),
};

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
export const history = createBrowserHistory({ basename: baseUrl });

const middleware = [routerMiddleware(history)];

const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
