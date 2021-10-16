import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import signupReducer from './store/reducers/signup';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
  signup: signupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

let persistor = persistStore(store);

const app = (
  <Provider store={store}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
