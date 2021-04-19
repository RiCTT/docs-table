<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconName = computed(() => `#icon-${props.name}`)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>

<style lang="stylus" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
