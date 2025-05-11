import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from './store/store';
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import {HelmetProvider} from "react-helmet-async"

const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
  <HelmetProvider>
  <Provider store={store}> 
  <PayPalScriptProvider deferLoading={true}>
  <App />
  </PayPalScriptProvider>
  </Provider>
  </HelmetProvider>
);

