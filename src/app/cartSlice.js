import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage()
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const newItem = { ...action.payload, id: `${id}-${Date.now()}` };
      state.items.push(newItem);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      saveCartToLocalStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },
    updateCartItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        state.items[itemIndex] = { ...state.items[itemIndex], ...updatedItem };
        saveCartToLocalStorage(state.items);
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
