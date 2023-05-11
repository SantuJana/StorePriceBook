import { createSlice } from "@reduxjs/toolkit";
import readUnits from "../../utils/loadUnis";

const unitsSlice = createSlice({
    name: "unit",
    initialState: [],
    reducers: {
        setUnits(state, action){
            state = action.payload;
            return state;
        },

        addUnits(state, action) {
            state = [...state, action.payload]
            return state;
        },

        deleteUnit(state, action){
            let index = state.indexOf(action.payload);
            state.splice(index, 1);
            return state;
        }
    }

})

export default unitsSlice.reducer;
export const {addUnits, deleteUnit, setUnits} = unitsSlice.actions;