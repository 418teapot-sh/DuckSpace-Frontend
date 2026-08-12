import { create } from "zustand";

export const useDisplayStore = create((set) => ({
  editingItems: [],

  isEditing: false,

  setIsEditing: (value) =>
    set({
      isEditing: value,
    }),

  setEditingItems: (items) =>
    set({
      editingItems: items,
    }),

  addItem: (item) =>
    set((state) => ({
      editingItems: [...state.editingItems, item],
    })),

  updateItem: (updatedItem) =>
    set((state) => ({
      editingItems: state.editingItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),

  clearEditingItems: () =>
    set({
      editingItems: [],
    }),
}));