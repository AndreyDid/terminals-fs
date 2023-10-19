import {createAction, createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import infoService from "../services/info.services";

const infoSlice = createSlice({
    name: "info",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        infoRequested: (state) => {
            state.isLoading = true;
        },
        infoReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        infoRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        infoCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        infoUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        infoRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const {reducer: infoReducer, actions} = infoSlice;
const {
    infoRequested,
    infoReceived,
    infoRequestFailed,
    infoCreated,
    infoRemove,
    infoUpdate
} = actions;

const infoCreateRequested = createAction("info/workCreateRequested");
const infoRemoveRequested = createAction("info/infoRemoveRequested");
const infoUpdateRequested = createAction("info/infoUpdateRequested");
// const workUpdateFailed = createAction("info/terminalUpdateFailed");

export const getInfo = () => (state) => state.info.entities;
export const getInfoLoadingStatus = () => (state) =>
    state.info.isLoading;

export const loadInfoList = () => async (dispatch) => {
    dispatch(infoRequested());
    try {
        const {content} = await infoService.getInfo();
        dispatch(infoReceived(content));
    } catch (error) {
        dispatch(infoRequestFailed(error.message));
    }
};
// export const removeWork = (workId) => async (dispatch) => {
//     dispatch(workRemoveRequested());
//     await workService.removeWork(workId);
//     dispatch(workRemove(workId));
// };

export const createInfo = (payload) =>
    async (dispatch) => {
    dispatch(infoCreateRequested());
    try {
        const { content } = await infoService.createInfo(payload)
        dispatch(infoCreated(content))
    } catch (error) {
        dispatch(infoRequestFailed(error.message))
    }
};

export const removeInfo = (infoId) => async (dispatch) => {
    dispatch(infoRemoveRequested());
    await infoService.removeInfo(infoId);
    dispatch(infoRemove(infoId));
};

export const updateInfo = (payload) => async (dispatch) => {
    dispatch(infoUpdateRequested());
    await infoService.updateInfo(payload);
    dispatch(infoUpdate(payload));
};


export const getInfoById = (id) => (state) => {
    if (state.info.entities) {
        return state.info.entities.find((a) => a._id === id);
    }
};

export default infoReducer;