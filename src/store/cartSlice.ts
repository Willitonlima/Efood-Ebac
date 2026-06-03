import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, Product } from '../types'

const initialState: CartState = {
  items: [],
  isOpen: false,
  restaurantId: null,
  restaurantName: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ item: Product; restaurantId: number; restaurantName: string }>) => {
      const { item, restaurantId, restaurantName } = action.payload
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = []
      }
      state.restaurantId = restaurantId
      state.restaurantName = restaurantName
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
      state.isOpen = true
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
      state.restaurantId = null
      state.restaurantName = null
      state.isOpen = false
    },
    openCart: (state) => { state.isOpen = true },
    closeCart: (state) => { state.isOpen = false },
  },
})

export const { addItem, removeItem, clearCart, openCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
