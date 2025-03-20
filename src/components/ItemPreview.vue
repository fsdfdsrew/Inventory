<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  squareColor: string;
  blurColor: string;
}>();
</script>

<template>
  <div class="cell">
    <div class="cell__square" :style="{ backgroundColor: squareColor }"></div>
    <div
      class="cell__square_blur"
      :style="{ backgroundColor: blurColor }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.cell {
  position: relative;
  width: 60%;
  height: 60%;
  display: flex;

  &__square {
    position: absolute;
    width: 85%;
    aspect-ratio: 1 / 1;
    bottom: 0;
    left: 0;
  }

  &__square_blur {
    position: absolute;
    width: 85%;
    aspect-ratio: 1 / 1;
    top: 0;
    right: 0;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
</style>
