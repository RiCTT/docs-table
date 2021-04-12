<template>
  <div class="docs-table-wrapper">
    <table class="docs-table-header">
      <thead class="table-thead">
        <tr class="thead-tr">
          <th class="thead-th" v-for="(item, index) in headers" :key="index" @click="handleSelectCol(index, $event)">
            {{item.text}}
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
let headerHeight = null

export default {
  name: 'docs-table-header',
  props: {
    headers: {
      type: Array
    },
    scrollLeft: {
      type: Number,
      default: 0
    }
  },
  setup (props, context) {
    const handleSelectCol = (colIndex, e) => {
      if (colIndex === 0) return
      const rect = e.target.getBoundingClientRect()
      if (!headerHeight) {
        const e = document.querySelector('.docs-table-body .table-body')
        const boxRect = e.getBoundingClientRect()
        headerHeight = boxRect.height
      }
      rect.x = rect.x + props.scrollLeft
      rect.y = rect.top + rect.height
      rect.height = headerHeight
      context.emit('set-box', rect)
    }
    return {
      handleSelectCol
    }
  }
}
</script>

<style lang="stylus" scoped>
.docs-table-wrapper {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 12;
}

.docs-table-header {
  width: 100%;
  border-collapse: separate;
  overflow: auto;
}
.table-thead {
  color: #666;
}

.thead-tr {
}

.thead-th {
  min-width: 50px;
  line-height: 30px;
  font-size: 13px;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
  background-color #fff;
  box-sizing: border-box;
  &:first-child {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    border: 1px solid #e9ecef;
  }
}
</style>
