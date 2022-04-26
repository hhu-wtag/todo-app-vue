<template>
  <div @click="$emit('click')" class="btn btn-action">
    <slot></slot>
    <slot name="tooltip"></slot>
  </div>
</template>

<style>
.btn-action {
  position: relative;
}
</style>
