<template>
  <div ref="choiceboxRef" class="choicebox-wrapper" v-show="visible" :style="boxStyleWithPx">
    <span
      class="dot dot-lefttop"
      @touchstart="handleTouchStart('left', $event)"
      @touchmove="handleTouchMove('left', $event)"
      @touchend="handleTouchEnd('left', $event)"
    >
    </span>
    <span
      class="dot dot-rightbottom"
      @touchstart="handleTouchStart('right', $event)"
      @touchmove="handleTouchMove('right', $event)"
      @touchend="handleTouchEnd('right', $event)"
    >
    </span>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed } from 'vue'
import useTouchMove from '../composables/useTouchMove.js'

export default {
  name: 'docs-table-choicebox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },
  setup (props, context) {
    const { modelValue } = toRefs(props)
    const choiceboxRef = ref(null)
    const style = ref({})
    const data = reactive({
      visible: modelValue.value,
      startTouch: null,
      beforeTouchBoxRect: null
    })

    watch(modelValue, (val) => {
      data.visible = val
    })

    const setBoxStyle = (x, y, w, h) => {
      if (!x || !y || !w || !h) return
      data.visible = true
      style.value = {
        left: x,
        top: y,
        width: w,
        height: h
      }
    }

    const boxStyleWithPx = computed(() => {
      return Object.keys(style.value).reduce((total, key) => {
        total[key] = style.value[key] + 'px'
        return total
      }, {})
    })

    const dataAsRefs = toRefs(data)

    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchMove(style, setBoxStyle, context, choiceboxRef)

    return {
      style,
      boxStyleWithPx,
      setBoxStyle,
      choiceboxRef,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      ...dataAsRefs
    }
  }
}
</script>

<style lang="stylus" scoped>
.choicebox-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid #e6674a;
  z-index: 10;
  box-sizing: border-box;
}

$dotOffset = -4px;

.dot {
  position: absolute;
  z-index: 11;
  width: 6px;
  height: 6px;
  border: 1px solid #e6674a;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
  }

  &.dot-lefttop {
    top: $dotOffset;
    left: $dotOffset;
  }

  &.dot-rightbottom {
    right: $dotOffset;
    bottom: $dotOffset;
  }
}
</style>
