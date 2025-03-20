<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from "vue";
import type { InventoryItem } from "../store/inventory";
import InventoryModal from "./InventoryModal.vue";
import ItemPreview from "./ItemPreview.vue";

const props = defineProps<{ item: InventoryItem }>();
const showModal = ref(false);

// Drag & Drop
const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData("text/plain", props.item.id);

  // Изображение с ячейки
  const dragElement = event.target as HTMLElement;
  const clone = dragElement.cloneNode(true) as HTMLElement;

  // Убираем количество
  const quantity = clone.querySelector(".item__quantity");
  if (quantity) quantity.remove();

  // Добавляем стили
  clone.style.position = "absolute";
  clone.style.top = "-9999px"; // создаем копию далеко за пределами экрана
  clone.style.border = "2px solid var(--border-color)";
  clone.style.opacity = "1"; // Полностью видимый

  const rect = dragElement.getBoundingClientRect();
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;

  document.body.appendChild(clone);

  // Используем этот элемент как изображение при перетаскивании
  event.dataTransfer?.setDragImage(clone, rect.width / 2, rect.height / 2);

  // Удаляем элемент после начала перетаскивания
  setTimeout(() => {
    document.body.removeChild(clone);
  }, 0);
};

// Случайный цвета квадрата
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // 100-255
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

// Вычисляем цвет круга на основе квадрата
const getBlurColor = (color: string) => {
  if (!color) return "rgba(255, 255, 255, 0.35)"; // Защита от ошибки

  const match = color.match(/\d+/g); // Из rgba(127, 170, 101, 0.5) получаем ["127", "170", "101", "0", "5"]
  if (!match) return "rgba(255, 255, 255, 0.35)";

  let [r, g, b] = match.map(Number);
  r = Math.min(255, r + 50);
  g = Math.min(255, g + 50);
  b = Math.min(255, b + 50);

  return `rgba(${r}, ${g}, ${b}, 0.35)`;
};

// Сохраняем цвет в item, если его нет
onMounted(() => {
  if (!props.item.color) {
    props.item.color = getRandomColor(); // Генерируем 1 раз
  }
});

// Цвет квадрата берём из item
const squareColor = computed(
  () => props.item.color ?? "rgba(255, 255, 255, 0.35)"
);
const blurColor = computed(() => getBlurColor(squareColor.value));
</script>

<template>
  <div
    class="item"
    draggable="true"
    @click="showModal = true"
    @dragstart="onDragStart"
  >
    <ItemPreview :squareColor="squareColor" :blurColor="blurColor" />

    <span class="item__quantity">{{ item.quantity }}</span>
  </div>

  <Teleport to=".inventory__modal_grid_container">
    <InventoryModal
      v-if="showModal"
      :item="item"
      :squareColor="squareColor"
      :blurColor="blurColor"
      @close="showModal = false"
    />
  </Teleport>
</template>

<style lang="scss" scoped>
.item {
  position: relative;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  border-radius: 4px;

  &__quantity {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 2px 8px;
    border-top: 2px solid var(--border-color);
    border-left: 2px solid var(--border-color);
    border-radius: 50% 0 0 0;
    font-size: 14px;
    font-weight: bold;
  }
}
.item:active {
  cursor: grabbing;
}
</style>
