<template>
  <div class="choicebox-wrapper" v-show="visible">
    {{style}}
    {{visible}}
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
      style.value = {
        top: y + 'px',
        left: x + 'px',
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
  z-index: 100;
  background-color: #fff;
}
</style>
