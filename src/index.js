import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from "redux"
import { Provider } from 'react-redux'

import {
  initialManuscriptId,
  manuscriptIdReducer
}
  from './redux/reducers/manuscriptIdReducer';

const combinedReducers = combineReducers({
  manuscriptId: manuscriptIdReducer
})

const store = createStore(combinedReducers, initialManuscriptId)
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
