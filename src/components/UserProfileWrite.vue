<script setup>
import { ref } from "vue";

const content = ref("");

const props = defineProps({});

const emit = defineEmits(["post_file"]);

const post_file = () => {
  emit("post_file", content.value); // 将事件传递给父组件
  content.value = "";
};
</script>

<template>
  <div class="card edit-field">
    <div class="card-body">
      <label for="edit-post" class="form-label">编辑帖子</label>
      <!-- 让textarea和content保持同步 -->
      <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
      <button @click="post_file" type="button" class="btn btn-primary btn-sm">发帖</button>
    </div>
  </div>
</template>

<style>
.edit-field {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
</style>
