import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/productsSlice'
import viewProductsSlice from './slices/viewProductsSlice';
import editProductIndex from './slices/editProductIndex';
import showModalSlice from './slices/showModalSlice';
import unitsSlice from './slices/unitsSlice';

const store = configureStore({
    reducer: {
        products: productsSlice,
        viewProducts: viewProductsSlice,
        editProductIndex: editProductIndex,
        showModal: showModalSlice,
        units: unitsSlice
    }
})

export default store;