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
	margin: 10px;
	border: 1px solid skyblue;
}
</style>
