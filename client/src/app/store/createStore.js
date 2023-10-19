import { combineReducers, configureStore } from "@reduxjs/toolkit";
import terminalsReducer from "./terminals";
import bodyReducer from "./body";
import worksReducer from "./works";
import extraWorksReducer from "./extraWorks";
import infoReducer from "./info";
import usersReducer from "./user";
import settingReducer from "./settings";

const rootReducer = combineReducers({
    terminals: terminalsReducer,
    body: bodyReducer,
    work: worksReducer,
    extraWorks: extraWorksReducer,
    info: infoReducer,
    user: usersReducer,
    setting: settingReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}