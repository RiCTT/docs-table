<template>
  <div class="docs-table-wrapper">
    <table class="docs-table-header">
      <thead class="table-thead">
        <tr class="thead-tr">
          <th class="thead-th" v-for="(item, index) in headers" :key="index">
            {{item.text}}
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name: 'docs-table-header',
  props: {
    headers: {
      type: Array
    }
  },
  setup (props) {
    const { headers } = toRefs(props)
    console.log('__headers')
    console.log(headers)
    return {

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
  z-index: 1;
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
  &:first-child {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    border: 1px solid #e9ecef;
  }
}
</style>
