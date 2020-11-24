import dataReducer from './reducers/dataReducer.js';
import mainReducer from './reducers/mainReducer.js';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let reducers = combineReducers({ data: dataReducer, main: mainReducer });
const store = createStore(reducers, applyMiddleware(thunk));

export default store;