import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increaseItem: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find(item => item.id === itemId)
      cartItem.amount = cartItem.amount + 1
    },
    decreaseItem: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find(item => item.id === itemId)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.cartItems.forEach(item => {
        totalAmount += item.amount
        totalPrice += item.amount * item.price
      })
      state.amount = totalAmount
      state.total = totalPrice
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
})

export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotals } = cartSlice.actions
export default cartSlice.reducer