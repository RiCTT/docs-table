<template>
	<div class="table-wrapper">
		<div class="inner-wrapper">

		</div>
	</div>
</template>

<script lang="ts">

export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup () {
    return {
      message: 123,
      name: 456,
      getMsg: 789
    }
  }

}

</script>

<style lang="stylus" scoped>
</style>
