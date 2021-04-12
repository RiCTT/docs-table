<template>
  <div class="docs-table-body">
    <table class="table-body">
      <tbody>
        <tr class="body-tr" v-for="(col, $index) in columns" :key="$index">
          <td class="body-td left" @click="handleSelectRow($index, $event)">{{col.text}}</td>
          <td class="body-td" v-for="(d, $$index) in col.data" :key="$$index" @click="handleCellClick(d, $event)">
            {{d.text}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let tableBodyEleWidth = null

export default {
  name: 'docs-table-body',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    scrollLeft: {
      type: Number,
      default: 0
    }
  },
  setup (props, context) {
    const handleCellClick = (cell, e) => {
      const rect = e.target.getBoundingClientRect()
      rect.x = rect.x + props.scrollLeft
      rect.y = rect.y + props.scrollTop
      context.emit('set-box', rect)
    }
    const handleSelectRow = (rowIndex, e) => {
      const rect = e.target.getBoundingClientRect()
      const { left, width } = rect
      rect.x = left + width
      if (!tableBodyEleWidth) {
        const e = document.querySelector('.docs-table-body .table-body')
        const { width: wrpWidth } = e.getBoundingClientRect()
        tableBodyEleWidth = wrpWidth
      }
      rect.y = rect.y + props.scrollTop
      rect.width = tableBodyEleWidth - rect.width
      context.emit('set-box', rect)
    }

    return {
      handleCellClick,
      handleSelectRow
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-body {
  border-collapse: separate;
}

.docs-table-body {
  position: relative;
}

.body-tr {
  .body-td {
    min-width: 50px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid #e9ecef;
    border-right: 1px solid #e9ecef;
    background-color #fff;
    &.left {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      left: 0;
      border: 1px solid #e9ecef;
      border-top: none;
      z-index: 11;
    }
  }
}
</style>
