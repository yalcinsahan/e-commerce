import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllProducts } from '../services/product-service'

export const fetchProducts = createAsyncThunk('/products', async () => {
    const response = await getAllProducts()
    return response.data
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.products = action.payload
            console.log("eşittir")
        })
    }
})

export default productSlice

export const productAction = productSlice.actions