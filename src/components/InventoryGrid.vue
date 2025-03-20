<script setup lang="ts">
import { computed, ref } from "vue";
import { useInventoryStore } from "../store/inventory";
import InventoryItem from "./InventoryItem.vue";

const store = useInventoryStore();
const columns = ref(5); // Количество колонок

// Генерация ячеек
const gridCells = computed(() => {
  const totalCells = 25;
  return Array.from({ length: totalCells }, (_, index) => ({
    x: index % columns.value,
    y: Math.floor(index / columns.value),
  }));
});

// Поиск предмета в конкретной ячейке
const findItem = (x: number, y: number) => {
  return store.items.find(
    (item) => item.position.x === x && item.position.y === y
  );
};

// Drag & Drop
const onDrop = (event: DragEvent, x: number, y: number) => {
  event.preventDefault();
  const itemId = event.dataTransfer?.getData("text/plain");
  if (itemId) {
    store.moveItem(itemId, { x, y });
  }
};

const allowDrop = (event: DragEvent) => {
  event.preventDefault();
};
</script>

<template>
  <div class="inventory">
    <div class="inventory__NA">
      <img src="/images/img.webp" alt="N/A" loading="lazy" />
    </div>

    <div class="inventory__modal_grid_container">
      <div class="inventory__grid">
        <div
          v-for="cell in gridCells"
          :key="`${cell.x}-${cell.y}`"
          class="inventory__cell"
          @dragover="allowDrop"
          @drop="onDrop($event, cell.x, cell.y)"
        >
          <InventoryItem
            v-if="findItem(cell.x, cell.y)"
            :item="findItem(cell.x, cell.y)!"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inventory {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__NA {
    width: 100%;
    max-width: 30%;
    height: 57%;
    background: var(--primary-color);
    border-radius: 16px;
    border: 2px solid var(--border-color);
    max-height: 60%;

    img {
      padding: 18px 14px;
      width: -webkit-fill-available;
      max-height: -webkit-fill-available;
    }
  }

  &__modal_grid_container {
    position: relative;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(v-bind(columns), 1fr);
    width: 100%;
    min-width: 500px;
    max-width: 60%;

    border-radius: 16px;
    border: 2px solid var(--border-color);
    overflow: hidden;
  }

  &__cell {
    width: 100%;
    aspect-ratio: 1;
    border: 2px solid var(--border-color);
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
}
</style>
