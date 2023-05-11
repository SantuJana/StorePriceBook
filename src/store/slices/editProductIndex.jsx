import { createSlice } from "@reduxjs/toolkit";

const editProductIndex = createSlice({
    name: "editProductIndex",
    initialState: -1,
    reducers: {
        setEditProductIndex(state, action) {
            state = action.payload;
            return state;
        },

        resetEditIndex(state, action) {
            state = -1;
            return state;
        }
    }
})

export default editProductIndex.reducer;
export const { setEditProductIndex, resetEditIndex } = editProductIndex.actions;