<template>
  <div class="ptl-template">
    <div class="ftl">
      <pre>{{ ftl }}</pre>
    </div>
    <div class="data">
      <pre>{{ data }}</pre>
    </div>
    <div
      ref="iframeRef"
      class="html"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { html, ftl, data } from '@tpl/template.ftl'
const iframeRef = ref<HTMLIFrameElement | null>(null)
onMounted(() => {
  if (iframeRef.value) {
    iframeRef.value.innerHTML = html
  }
})
</script>

<style lang="scss" scoped>
.ptl-template {
  display: flex;
  background-color: #f0f0f0;
  gap: 2px;

  & > div {
    padding: 20px;
    box-sizing: border-box;
    flex: 1 0 0%;
    background: #fff;
  }
}
</style>
