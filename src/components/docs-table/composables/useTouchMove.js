import { reactive, ref, watch } from 'vue'

const CELL_WIDTH = 50
const CELL_HEIGHT = 30

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useTouchMove (style, setBoxStyle, context, choiceboxRef) {
  const boxStyle = ref({})
  const timer = ref(null)
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
    console.log('move')
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
    handleScrollWrapper(isPositiveX, touch, left, top, width, height)
    e.preventDefault()
  }

  const _handleTimerForGC = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const handleTouchEnd = () => {
    console.log('!!! touch end !!')
    _handleTimerForGC()
    _data.beforeTouchBoxRect = { ...boxStyle.value }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleScrollWrapper = (isPositiveX, touch) => {
    /**
     * 0、开始参数
     *  0.1、获得可以滚动的边界值，left，right（水平）
     *  0.2、checkbox当前的位置（用来判断是否需要更新choickbox的位置和大小）
     *  0.3、鼠标的当前位置（用来判断是否需要开启定时器）
     * 1、move的时候开启一个定时器（用来滚动容器），结束end事件清除
     *  1.1、轮询判断是否需要判断滚动 + 更新choicebox的位置大小（需要同步，最好每次都+25）
     * */
  }

  return {
    handleHorizontalMove,
    handleVerticalMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScrollWrapper
  }
}
