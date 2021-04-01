<template>
  <div class="docs-table-body">
    <table class="table-body">
      <tbody>
        <tr class="body-tr" v-for="(col, $index) in columns" :key="$index">
          <td class="body-td left">{{col.text}}</td>
          <td class="body-td" v-for="(d, $$index) in col.data" :key="$$index">
            {{d.text}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'docs-table-body',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    columns () {
      console.log('__watch')
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-body {
  position: relative;
  z-index: -1;
  border-collapse: separate;
}

.docs-table-body {
  position: relative;
  width: 100%;
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
    }
  }
}
</style>
