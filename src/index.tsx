import React from "react";

import { ConnectedRouter } from "connected-react-router";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./app";
import * as serviceWorker from "./service-worker";
import { store, persistor, history } from "./services/store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <BrowserRouter basename={process.env.REACT_APP_URL}>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </BrowserRouter>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
