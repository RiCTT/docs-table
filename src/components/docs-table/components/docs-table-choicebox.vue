<template>
  <div class="choicebox-wrapper" v-show="visible" :style="boxStyleWithPx">
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

const CELL_WIDTH = 50
const CELL_HEIGHT = 30

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
  setup (props) {
    const { modelValue } = toRefs(props)
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

    const handleHorizontalMove = (direction, moveX, isOppositeX) => {
      const { left, width } = data.beforeTouchBoxRect
      if (!isOppositeX && moveX < width) {
        return {
          left,
          width
        }
      }

      // moveCount的计算需要根据当前占据了多少个单元
      const moveCount = !isOppositeX
        ? Math.ceil(moveX / CELL_WIDTH) - Math.floor(width / CELL_WIDTH)
        : Math.ceil(moveX / CELL_WIDTH)

      const movePx = moveCount * CELL_WIDTH
      const resultLeft = isOppositeX
        ? direction === 'left' ? left - movePx : left
        : direction === 'left' ? left : left - movePx
      const resultWidth = width + movePx
      return {
        left: resultLeft,
        width: resultWidth
      }
    }
    const handleVerticalMove = (direction, moveY, isOppositeY) => {
      const { top, height } = data.beforeTouchBoxRect
      if (!isOppositeY && moveY < height) {
        return {
          top,
          height
        }
      }
      const moveCount = !isOppositeY
        ? Math.ceil(moveY / CELL_HEIGHT) - Math.floor(height / CELL_HEIGHT)
        : Math.ceil(moveY / CELL_HEIGHT)

      const movePx = moveCount * CELL_HEIGHT
      const resultY = isOppositeY
        ? direction === 'top' ? top - movePx : top
        : direction === 'top' ? top : top - movePx

      const resultHeight = height + (moveCount * CELL_HEIGHT)
      return {
        top: resultY,
        height: resultHeight
      }
    }

    const handleTouchStart = (direction, e) => {
      const touch = e.touches[0]
      data.beforeTouchBoxRect = { ...style.value }
      data.startTouch = touch
    }
    const handleTouchMove = (direction, e) => {
      const touch = e.touches[0]
      const { clientX, clientY } = touch
      const moveDisX = Math.abs(clientX - data.startTouch.clientX)
      const moveDisY = Math.abs(clientY - data.startTouch.clientY)
      // 垂直方向上是自定义的，根据left、right来取值
      const moveYDirection = direction === 'left' ? 'top' : 'bottom'
      const isOppositeX = (direction === 'left' && data.startTouch.clientX > clientX) || (direction === 'right' && data.startTouch.clientX < clientX)
      const isOppositeY = (moveYDirection === 'top' && data.startTouch.clientY > clientY) || (moveYDirection === 'bottom' && data.startTouch.clientY < clientY)
      const { left, width } = handleHorizontalMove(direction, moveDisX, isOppositeX)
      const { top, height } = handleVerticalMove(moveYDirection, moveDisY, isOppositeY)
      setBoxStyle(left, top, width, height)
      e.preventDefault()
    }
    const handleTouchEnd = (direction, e) => {
      data.beforeTouchBoxRect = { ...style.value }
    }

    const dataAsRefs = toRefs(data)

    return {
      style,
      boxStyleWithPx,
      setBoxStyle,
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
  background-color: #fff;
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
