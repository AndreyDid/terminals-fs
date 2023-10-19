import {createAction, createSlice} from "@reduxjs/toolkit";
import workService from "../services/works.services";

const WorkSlice = createSlice({
    name: "work",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        worksRequested: (state) => {
            state.isLoading = true;
        },
        worksReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        worksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        workCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        workUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        workRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const {reducer: worksReducer, actions} = WorkSlice;
const {
    worksRequested,
    worksReceived,
    worksRequestFailed,
    workCreated,
    workRemove,
    workUpdate
} = actions;

const workCreateRequested = createAction("works/workCreateRequested");
const workRemoveRequested = createAction("works/workRemoveRequested");
const workUpdateRequested = createAction("works/workUpdateRequested");
// const workUpdateFailed = createAction("works/terminalUpdateFailed");

export const getWork = () => (state) => state.work.entities;
export const getWorkLoadingStatus = () => (state) =>
    state.work.isLoading;

export const loadWorkList = () => async (dispatch) => {
    dispatch(worksRequested());
    try {
        const {content} = await workService.getWork();
        dispatch(worksReceived(content));
    } catch (error) {
        dispatch(worksRequestFailed(error.message));
    }
};
export const removeWork = (workId) => async (dispatch) => {
    dispatch(workRemoveRequested());
    await workService.removeWork(workId);
            dispatch(workRemove(workId));
};

export const createWork = (payload) =>
    async (dispatch) => {
    dispatch(workCreateRequested());
    try {
        const {content} = await workService.createWork(payload)
        dispatch(workCreated(content))
    } catch (error) {
        dispatch(worksRequestFailed(error.message))
    }
};

export const updateWork = (payload) => async (dispatch) => {
    dispatch(workUpdateRequested());
    await workService.updateWork(payload);
    dispatch(workUpdate(payload));
};

export const getWorksByIds = worksIds => state => {
    if (state.work.entities) {
        const worksArray = []
        for (const wId of worksIds) {
            for (const work of state.work.entities) {
                if (work._id === wId) {
                    worksArray.push(work)
                    break
                }
            }
        }
        return worksArray
    }
    return []
}
export const getWorkById = (id) => (state) => {
    if (state.work.entities) {
        return state.work.entities.find((a) => a._id === id);
    }
};

export default worksReducer;