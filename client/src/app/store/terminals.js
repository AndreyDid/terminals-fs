import {createAction, createSlice} from "@reduxjs/toolkit";
import terminalService from "../services/terminal.services";
import {nanoid} from "nanoid";
import {toast} from "react-toastify";

const TerminalSlice = createSlice({
    name: "terminals",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        isLoggedIn: true
    },
    reducers: {
        terminalsRequested: (state) => {
            state.isLoading = true;
        },
        terminalsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true
        },
        terminalsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        terminalCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        terminalUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        terminalRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const {reducer: terminalsReducer, actions} = TerminalSlice;
const {
    terminalsRequested,
    terminalsReceived,
    terminalsRequestFailed,
    terminalCreated,
    terminalRemove,
    terminalUpdate
} = actions;

const terminalCreateRequested = createAction("terminals/terminalCreateRequested");
const terminalRemoveRequested = createAction("terminals/terminalRemoveRequested");
const terminalUpdateRequested = createAction("terminals/terminalUpdateRequested");
// const terminalUpdateFailed = createAction("terminals/terminalUpdateFailed");

export const getTerminal = () => (state) => state.terminals.entities;
export const getDataStatus = () => (state) => state.terminals.dataLoaded
export const getTerminalLoadingStatus = () => (state) =>
    state.terminals.isLoading;

export const loadTerminalList = () => async (dispatch) => {
    dispatch(terminalsRequested());
    try {
        const {content} = await terminalService.getTerminal();
        dispatch(terminalsReceived(content));
    } catch (error) {
        dispatch(terminalsRequestFailed(error.message));
    }
};
export const removeTerminal = (terminalId) => async (dispatch) => {
    dispatch(terminalRemoveRequested());
    try {
        const {content} = await terminalService.removeTerminal(terminalId);
        if (!content) {
            dispatch(terminalRemove(terminalId));
        }
    } catch (error) {
        dispatch(terminalsRequestFailed(error.message));
    }
};

// export const removeTerminal = (terminalId) => async (dispatch) => {
//     await terminalService.removeTerminal(terminalId);
//     dispatch(terminalRemove(terminalId));
// };

// export const createTerminal = (payload) => async (dispatch) => {
//     // dispatch(terminalCreateRequested());
//     const terminal = {
//         ...payload,
//         _id: nanoid(),
//         created_at: Date.now()
//     }
//     await terminalService.createTerminal(terminal);
//         dispatch(terminalCreated(terminal));
//         // history.push("/");
// };

// export const createTerminal = (payload) =>
//     async (dispatch) => {
//         dispatch(terminalCreateRequested());
//         try {
//             const terminal = {
//                 ...payload,
//                 _id: nanoid(),
//                 created_at: Date.now()
//             }
//             await terminalService.createTerminal(terminal);
//             dispatch(terminalCreated(terminal));
//             toast.info(`${payload.number} успешно добавлен`, {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//
//         } catch (error) {
//             toast('Error')
//         }
//
//         // history.push("/");
// };

export const createTerminal = (payload) =>
    async (dispatch) => {
        dispatch(terminalCreateRequested());
        try {
            const {content} = await terminalService.createTerminal(payload);
            dispatch(terminalCreated(content));
            toast.info(`${payload.number} успешно добавлен`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (error) {
            toast('Error')
            dispatch(terminalsRequestFailed(error.message));
        }

        // history.push("/");
    };


export const getIsLoggedIn = () => state => state.terminals.isLoggedIn


export const updateTerminal = (payload) => async (dispatch) => {
    dispatch(terminalUpdateRequested());
    await terminalService.updateTerminal(payload);
    dispatch(terminalUpdate(payload));

};

export const getTerminalById = (id) => (state) => {
    if (state.terminals.entities) {
        return state.terminals.entities.find((a) => a._id === id);
    }
};

export const getTerminalByOrderId = (id) => (state) => {
    if (state.terminals.entities) {
        return state.terminals.entities.filter((a) => a.singleOrder === id);
    }
}

export default terminalsReducer;