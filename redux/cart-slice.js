import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserCart } from '../services/user-service'

export const getCart = createAsyncThunk('cart', async (id) => {
    const response = await getUserCart(id)

    return response.data
})


const initialState = {
    items: [],
    display: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        changeDisplay: (state) => {
            state.display = !state.display;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.items = action.payload.cart
            })
    }
})

// Action creators are generated for each case reducer function
export const { changeDisplay, addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer