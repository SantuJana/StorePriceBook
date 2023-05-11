import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        setProducts(state, action) {
            state = action.payload;
            return state;
        },

        addProduct(state, action){
            state = {...state, [action.payload.productName]:action.payload.obj}
            return state;
        },

        deleteProduct(state, action){
            console.log(action.payload)
            delete state[action.payload];
            return state;
        }
    }
})

export default productsSlice.reducer;
export const { setProducts, addProduct, deleteProduct } = productsSlice.actions;