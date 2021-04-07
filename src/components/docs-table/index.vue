<template>
	<div class="table-wrapper">
    <div class="inner-wrapper">
      <docs-table-header :headers="headers"></docs-table-header>
      <docs-table-body :columns="columns" @set-box="handleSetBox"></docs-table-body>
      <docs-table-choiceBox ref="choiceBox" v-model="showBox"></docs-table-choiceBox>
    </div>
	</div>
</template>

<script>
import { ref } from 'vue'
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
      console.log('___rect')
      console.log(rect)
      const { x, y, width, height } = rect
      console.log(choiceBoxRef)
      console.log(choiceBoxRef.value)
      choiceBoxRef.value.choiceBox.setBoxStyle(x, y, width, height)
    }

    return {
      headers,
      columns,
      showBox,
      handleSetBox,
      choiceBoxRef
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
