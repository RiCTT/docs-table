<template>
	<div ref="scrollRef" class="table-wrapper" @scroll="handleScroll">
    <div class="inner-wrapper">
      <docs-table-header :headers="headers" :scrollLeft="scrollLeft" @set-box="handleSetBox"></docs-table-header>
      <docs-table-body :columns="columns" :scrollTop="scrollTop" :scrollLeft="scrollLeft" @set-box="handleSetBox"></docs-table-body>
      <docs-table-choiceBox ref="choiceBoxRef" v-model="showBox" @go-scroll="handleGoScroll"></docs-table-choiceBox>
    </div>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import docsTableHeader from './components/docs-table-header.vue'
import docsTableBody from './components/docs-table-body.vue'
import docsTableChoiceBox from './components/docs-table-choicebox.vue'

export default {
  components: { docsTableHeader, docsTableBody, docsTableChoiceBox },
  setup () {
    const headers = ref([])
    const columns = ref([])
    const showBox = ref(false)
    const choiceBoxRef = ref(null)
    const scrollRef = ref(null)
    const data = reactive({ scrollTop: 0, scrollLeft: 0 })

    const getHeaders = () => {
      const array = []
      for (let i = 0; i < 15; i++) {
        array.push({ text: '列' + i })
      }
      return array
    }
    const getColumns = () => {
      const array = []
      for (let i = 0; i < 50; i++) {
        const obj = { text: 'col' + i, data: [] }
        for (let j = 0; j < 14; j++) {
          obj.data.push({ x: j, y: i, text: '' })
        }
        array.push(obj)
      }
      return array
    }
    headers.value = getHeaders()
    columns.value = getColumns()

    const handleSetBox = (rect) => {
      const { x, y, width, height } = rect
      // 因为容器 + 内滚动 + 定位的关系，left top轴要分别减掉容器offset值来实现定位正常
      choiceBoxRef.value.setBoxStyle(x - 15, y - 10, width, height)
    }

    const handleScroll = (e) => {
      const target = e.target
      const { scrollTop, scrollLeft } = target
      data.scrollTop = scrollTop
      data.scrollLeft = scrollLeft
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleGoScroll = (x, y) => {
      scrollRef.value.scrollLeft += 25
    }

    const dataAsRefs = toRefs(data)

    return {
      headers,
      columns,
      showBox,
      handleSetBox,
      choiceBoxRef,
      scrollRef,
      handleScroll,
      handleGoScroll,
      ...dataAsRefs
    }
  }
}

</script>

<style lang="stylus" scoped>
.table-wrapper {
  position: relative;
	width: 100%;
  height: 100%;
  overflow: auto;
}

.inner-wrapper {
  position: relative;
  width: 100%;
  // 不能height 100%，100%了滚动超过100%的时候会sticky失效
}

</style>
