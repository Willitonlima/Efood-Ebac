import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderState, OrderConfirmation } from '../types'

const initialState: OrderState = {
  confirmation: null,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setConfirmation: (state, action: PayloadAction<OrderConfirmation>) => {
      state.confirmation = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearOrder: (state) => {
      state.confirmation = null
      state.loading = false
      state.error = null
    },
  },
})

export const { setConfirmation, setLoading, setError, clearOrder } = orderSlice.actions
export default orderSlice.reducer
