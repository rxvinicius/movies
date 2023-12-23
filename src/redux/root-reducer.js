import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from './movies/slice';

const rootReducer = combineReducers({ moviesReducer });

export default rootReducer;
