<script setup lang="ts">
import InventoryGrid from "@/components/InventoryGrid.vue";
import { useInventoryStore } from "./store/inventory";
import { onMounted } from "vue";

const store = useInventoryStore();

onMounted(() => {
  console.log("До загрузки:", store.items);
  console.log("localStorage:", localStorage.getItem("inventory"));

  store.loadFromStorage(); // Загружаем данные из localStorage

  console.log("После загрузки:", store.items);

  // Загружаем предметы, если localStorage пуст
  if (!store.items.length) {
    store.addItem(
      {
        id: "sword-1",
        name: "Меч",
        description: "Острый стальной меч.",
        quantity: 1,
        position: { x: 1, y: 1 },
      },
      {
        id: "apple-1",
        name: "Яблоко",
        description: "Исцеляющее яблоко.",
        quantity: 3,
        position: { x: 2, y: 1 },
      },
      {
        id: "shield-1",
        name: "Щит",
        description: "Прочный деревянный щит.",
        quantity: 1,
        position: { x: 3, y: 1 },
      },
      {
        id: "potion-1",
        name: "Зелье здоровья",
        description: "Восстанавливает 50 HP.",
        quantity: 2,
        position: { x: 0, y: 0 },
      },
      {
        id: "bow-1",
        name: "Лук",
        description: "Оружие дальнего боя.",
        quantity: 1,
        position: { x: 4, y: 0 },
      }
    );
    store.saveToStorage();
  }
});
</script>

<template>
  <InventoryGrid />
</template>
