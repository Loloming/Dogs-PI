import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { dogsReducer } from './reducers/dogsReducer';

export const store = createStore(dogsReducer, applyMiddleware(thunk))