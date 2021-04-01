<template>
  <div class="home">
    <DocsTable />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsTable from '@/components/docs-table/index.vue'

@Options({
  components: {
    DocsTable
  }
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
.home {
  padding: 10px 0 10px 15px;
  height: 300px;
}
</style>
