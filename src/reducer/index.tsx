import { combineReducers } from 'redux';
import chess from './chess';
import lastAction from './lastAction';
const appReducers = combineReducers({
	chess,lastAction 
});

export default appReducers;