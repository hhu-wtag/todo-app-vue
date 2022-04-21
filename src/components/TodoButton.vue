<template>
  <div @click="$emit('click')" class="btn">
    <slot></slot>
  </div>
</template>
