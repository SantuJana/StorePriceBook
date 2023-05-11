import { createSlice } from "@reduxjs/toolkit";

const viewProductsSlice = createSlice({
    name: "viewProduct",
    initialState: {},
    reducers: {
        setViewProducts(state, action) {
            state = action.payload;
            return state;
        },
    }
})

export default viewProductsSlice.reducer;
export const { setViewProducts } = viewProductsSlice.actions;