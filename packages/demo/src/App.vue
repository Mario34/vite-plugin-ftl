<template>
  <div class="ptl-template">
    <div class="left">
      <pre>{{ tmp }}</pre>
    </div>
    <div
      ref="iframeRef"
      class="right"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import tmp from '@tpl/template.ftl'

const iframeRef = ref<HTMLIFrameElement | null>(null)
onMounted(() => {
  if (iframeRef.value) {
    iframeRef.value.innerHTML = tmp
  }
})
</script>

<style lang="scss" scoped>
.ptl-template {
  display: flex;

  .left {
    font-size: 14px;
    font-family: "source code pro";
  }

  .right {

  }
}
</style>
