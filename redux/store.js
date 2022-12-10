import { configureStore } from '@reduxjs/toolkit'
import productSlice from './product-slice'

const store = configureStore({
    reducer: {
        products: productSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store