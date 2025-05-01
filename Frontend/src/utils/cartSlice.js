import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each item: { itemData, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.itemData.card.info.id === item.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ itemData: item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const index = state.items.findIndex(
        (i) => i.itemData.card.info.id === itemId
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
