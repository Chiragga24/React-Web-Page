import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Comments } from "./comments";
import { Dishes } from './dishes';
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
    const store =  createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );
    
    
    return store;
}