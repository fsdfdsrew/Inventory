<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
import type { InventoryItem } from "@/store/inventory";
import { useInventoryStore } from "@/store/inventory";
import ItemPreview from "./ItemPreview.vue";

const store = useInventoryStore();
const emit = defineEmits(["close"]);

const isDeleting = ref(false);
const deleteQuantity = ref(1);

const props = defineProps<{
  item: InventoryItem;
  squareColor: string;
  blurColor: string;
}>();

// Закрытие модального окна
const closeModal = () => {
  emit("close");
};

// Подтверждение удаления
const confirmDelete = () => {
  store.removeItem(props.item.id, deleteQuantity.value);
  closeModal();
};
</script>

<template>
  <div class="modal">
    <button class="modal__close" @click="emit('close')">✖</button>

    <div class="modal__item_preview_container">
      <ItemPreview :squareColor="squareColor" :blurColor="blurColor" />
    </div>

    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>

    <div v-if="isDeleting" class="confirmation">
      <input
        type="number"
        v-model="deleteQuantity"
        min="1"
        :max="item.quantity"
      />
      <div class="confirmation__cc_container">
        <button class="confirmation__cancel" @click="isDeleting = false">
          Отмена
        </button>
        <button class="confirmation__confirm" @click="confirmDelete">
          Подтвердить
        </button>
      </div>
    </div>
    <button class="modal__delete" @click="isDeleting = true">
      Удалить предмет
    </button>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: var(--second-color);
  border: 2px solid var(--border-color);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__item_preview_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
  }

  &__delete {
    background-color: var(--cancel-color);
    border-radius: 10px;
    padding: 11px 46px;
  }

  &__close {
    background: transparent;
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
  }
}

.confirmation {
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: center;
  padding: 20px 0;
  background: var(--primary-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  input {
    height: 40px;
    width: 80%;
    border-radius: 10px;
    padding: 0 12px;
    box-sizing: border-box;
  }

  &__cc_container {
    display: flex;
    gap: 10px;
  }

  &__cancel {
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 8px 15px;
  }

  &__confirm {
    background-color: var(--cancel-color);
    border-radius: 10px;
    padding: 8px 15px;
  }
}
</style>
