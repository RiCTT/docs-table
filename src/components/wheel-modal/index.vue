<template>
  <Teleport :to="to" :disabled="disabled">
    <transition name="fade">
      <div class="modal-wrapper" v-if="modalVisible">
        <div class="modal-mask"></div>
        <div class="modal-body">
          <div class="modal-content">
            <slot />
          </div>
          <slot name="footer">
            <div class="modal-default-footer">
              <WheelButton @click="handleClick">取消</WheelButton>
              <WheelButton @click="handleClick" type="primary"
                >保存</WheelButton
              >
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { ref, watch } from 'vue'
import WheelButton from '@/components/wheel-button/index'
export default {
  components: {
    WheelButton
  },
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    to: {
      type: String,
      default: () => 'body' // 奇怪的表现，文档说不能使用标签做值，但实际上又可以
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props, context) {
    const modalVisible = ref(props.modelValue)
    watch(
      () => props.modelValue,
      (val) => {
        modalVisible.value = val
      }
    )

    const handleClick = () => {
      modalVisible.value = false
      context.emit('update:modelValue', false)
    }
    return {
      modalVisible,
      handleClick
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .modal-body {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    z-index: 11;

    .modal-content {
      min-width: 500px;
      min-height: 300px;
      padding: 15px 20px;
    }
  }

  .modal-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .modal-default-footer {
    width: 100%;
    padding: 10px 15px;
    border-top: 1px solid #f2f2f2;
    box-sizing: border-box;
    text-align: center;

    button {
      margin-left: 15px;
    }
  }
}
</style>
