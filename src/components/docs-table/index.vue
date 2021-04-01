<template>
	<div class="table-wrapper">
    <div class="inner-wrapper">
      <docs-table-header :headers="headers"></docs-table-header>
      <docs-table-body :columns="columns"></docs-table-body>
    </div>
	</div>
</template>

<script>
import { ref } from 'vue'
import docsTableHeader from './components/docs-table-header.vue'
import docsTableBody from './components/docs-table-body.vue'

export default {
  components: { docsTableHeader, docsTableBody },
  setup () {
    const headers = ref([])
    const columns = ref([])

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
          obj.data.push({ text: 'data' + j })
        }
        array.push(obj)
      }
      return array
    }

    headers.value = getHeaders()
    columns.value = getColumns()

    return {
      headers,
      columns
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
  width: 100%;
  // 不能height 100%，100%了滚动超过100%的时候会sticky失效
}

</style>
