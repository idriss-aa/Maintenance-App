import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import thunk from 'redux-thunk';
import logger from 'redux-logger'


export default configureStore({
    reducer:{
        user: userReducer,
    },
    middlewares : [thunk, logger]
});