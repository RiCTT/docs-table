<template>
  <div class="home">
    <DocsTable />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import DocsTable from '@/components/docs-table/index.vue'

@Options({
  components: {
    HelloWorld,
    DocsTable
  }
})
export default class Home extends Vue {}
</script>
