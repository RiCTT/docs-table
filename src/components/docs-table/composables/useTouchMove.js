import { reactive, ref, watch } from 'vue'

const CELL_WIDTH = 50
const CELL_HEIGHT = 30

export default function useTouchMove (style, setBoxStyle) {
  const boxStyle = ref({})
  const _data = reactive({
    startTouch: null,
    beforeTouchBoxRect: null
  })

  watch(style, (val) => {
    boxStyle.value = val
  })

  const handleHorizontalMove = (direction, moveX, isPositiveX) => {
    const { left, width } = _data.beforeTouchBoxRect
    if (!isPositiveX && moveX < width) {
      return {
        left,
        width
      }
    }

    // moveCount的计算需要根据当前占据了多少个单元
    const moveCount = !isPositiveX
      ? Math.ceil(moveX / CELL_WIDTH) - Math.floor(width / CELL_WIDTH)
      : Math.ceil(moveX / CELL_WIDTH)

    const movePx = moveCount * CELL_WIDTH
    const resultLeft = isPositiveX
      ? direction === 'left' ? left - movePx : left
      : direction === 'left' ? left : left - movePx
    const resultWidth = width + movePx
    return {
      left: resultLeft,
      width: resultWidth
    }
  }

  const handleVerticalMove = (direction, moveY, isPositiveY) => {
    const { top, height } = _data.beforeTouchBoxRect
    if (!isPositiveY && moveY < height) {
      return {
        top,
        height
      }
    }
    const moveCount = !isPositiveY
      ? Math.ceil(moveY / CELL_HEIGHT) - Math.floor(height / CELL_HEIGHT)
      : Math.ceil(moveY / CELL_HEIGHT)

    const movePx = moveCount * CELL_HEIGHT
    const resultY = isPositiveY
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
    _data.startTouch = touch
    _data.beforeTouchBoxRect = { ...boxStyle.value }
  }
  const handleTouchMove = (direction, e) => {
    const touch = e.touches[0]
    const { clientX, clientY } = touch
    const moveDisX = Math.abs(clientX - _data.startTouch.clientX)
    const moveDisY = Math.abs(clientY - _data.startTouch.clientY)
    // 垂直方向上是自定义的，根据left、right来取值
    const moveYDirection = direction === 'left' ? 'top' : 'bottom'
    // isPositiveX是否从起点出发，直接正方向的移动
    const isPositiveX = (direction === 'left' && _data.startTouch.clientX > clientX) || (direction === 'right' && _data.startTouch.clientX < clientX)
    const isPositiveY = (moveYDirection === 'top' && _data.startTouch.clientY > clientY) || (moveYDirection === 'bottom' && _data.startTouch.clientY < clientY)
    const { left, width } = handleHorizontalMove(direction, moveDisX, isPositiveX)
    const { top, height } = handleVerticalMove(moveYDirection, moveDisY, isPositiveY)
    setBoxStyle(left, top, width, height)
    e.preventDefault()
  }
  const handleTouchEnd = () => {
    _data.beforeTouchBoxRect = { ...boxStyle.value }
  }

  return {
    handleHorizontalMove,
    handleVerticalMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
