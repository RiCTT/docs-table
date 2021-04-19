<template>
  <button class="wheel-button" :class="btnClass">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { toRefs, computed } from 'vue'
const classPrefix = 'wheel-button'

export default {
  props: {
    type: {
      type: String,
      default: 'plain' // plain primary
    },
    size: {
      type: String,
      default: 'normal' // small normal large
    }
  },
  setup (props) {
    const { type, size } = toRefs(props)
    const btnClass = computed(() => {
      console.log(type)
      console.log(size)
      const classList = []
      type && classList.push(`${classPrefix}-${type.value}`)
      size && classList.push(`${classPrefix}-${size.value}`)
      return classList
    })

    return {
      btnClass
    }
  }
}
</script>

<style lang="stylus" scoped>
$color = #515a6e;
$subColor = #dcdee2;
$primaryColor = #2d8cf0;

.wheel-button {
  display: inline-block;
  font-weight: 400;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  transition: all .2s linear;

  &:focus,
  &:active {
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
  }

  &:hover {
    border-color: $primaryColor;
  }

  &-plain {
    border-color: $subColor;
    color: $color;
    background-color: #fff;
  }
  &-primary {
    border: 1px solid $primaryColor;
    color: #fff !important;
    background-color: $primaryColor;
    &:hover {
      opacity: .7;
    }
  }

  &-large {
    height: 35px;
    padding: 0 18px;
    line-height: 2;
  }
  &-normal {
    height: 32px;
    padding: 0 15px;
    line-height: 1.5;
  }
  &-small {
    line-height: 1;
  }
}
</style>
