<template>
  <div>
    <WheelButton @click="handleClick">按钮</WheelButton>
    <WheelModal v-model="visible">
      123
    </WheelModal>
    <WheelIcon name="test"></WheelIcon>
  </div>
</template>

<script>
/**
 * 功能介绍：上传图片时支持像素级裁剪，压缩尺寸，增加水印
 *  1、裁剪
 *    1.1、默认原尺寸上传
 *    1.2、固定宽高显示，可拖拽裁剪框，四个角伸缩大小
 *    1.3、实时预览裁剪效果
 *  2、压缩尺寸
 *    2.1、支持压缩比例
 *    2.2、支持压缩效果预览（大小，图像)
 *  3、水印
 *    3.1、支持上传水印图片
 *    3.2、拖拽水印位置
 *  4、其他
 *    4.1、支持pc、移动端
 * 基础支持
 *  1、Button组件
 *  2、Modal组件
 */
import WheelButton from '@/components/wheel-button/index'
import WheelModal from '@/components/wheel-modal/index'
import { reactive, toRefs } from 'vue'

export default {
  name: 'CuttingBox',
  components: {
    WheelButton,
    WheelModal
  },
  setup () {
    const data = reactive({
      visible: false
    })
    const handleClick = (e) => {
      console.log(e)
      data.visible = !data.visible
    }

    const dataAsRefs = toRefs(data)

    return {
      handleClick,
      visible2: true,
      ...dataAsRefs
    }
  }
}
</script>

<style>

</style>
