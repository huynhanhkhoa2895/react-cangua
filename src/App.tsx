import React from 'react';
import './App.css';
import './bootstrap.min.css'
import Main from './Main/Main'
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import appReducers from './reducer/index';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(
	appReducers, /* preloadedState, */
	composeWithDevTools()
);
function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
    
  );
}

export default App;
