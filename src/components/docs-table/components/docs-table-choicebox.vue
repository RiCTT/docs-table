<template>
  <div class="choicebox-wrapper" v-show="visible" :style="style">
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue'
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
    const data = reactive({ visible: modelValue.value })
    watch(modelValue, (val) => {
      data.visible = val
    })
    const setBoxStyle = (x, y, w, h) => {
      data.visible = true
      // 因为容器 + 内滚动 + 定位的关系，xy轴要分别减掉容器offset值来实现定位正常
      style.value = {
        left: x - 15 + 'px',
        top: y - 10 + 'px',
        width: w + 'px',
        height: h + 'px'
      }
    }

    const dataAsRefs = toRefs(data)

    return {
      style,
      setBoxStyle,
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
</style>
