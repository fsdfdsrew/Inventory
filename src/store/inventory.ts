import { defineStore } from "pinia";

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  position: { x: number; y: number };
  color?: string;
}

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    items: [] as InventoryItem[],
  }),

  actions: {
    loadFromStorage() {
      const data = localStorage.getItem("inventory");
      if (data) {
        this.items = JSON.parse(data);
      }
    },

    saveToStorage() {
      localStorage.setItem("inventory", JSON.stringify(this.items));
    },

    addItem(...newItems: InventoryItem[]) {
      this.items.push(...newItems);
      this.saveToStorage();
    },

    moveItem(id: string, newPosition: { x: number; y: number }) {
      const item = this.items.find((i) => i.id === id);
      if (item) {
        item.position = newPosition;
        this.saveToStorage();
      }
    },

    removeItem(id: string, count: number) {
      const item = this.items.find((i) => i.id === id);
      if (item) {
        item.quantity -= count;
        if (item.quantity <= 0) {
          this.items = this.items.filter((i) => i.id !== id);
        }
        this.saveToStorage();
      }
    },
  },
});
