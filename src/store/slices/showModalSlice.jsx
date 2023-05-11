import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: "showModal",
    initialState: false,
    reducers: {
        show(state, action) {
            state = !state;
            return state;
        },

        hide(state, action) {
            state = !state;
            return state;
        }

    }
})

export default showModalSlice.reducer;
export const { show, hide } = showModalSlice.actions;