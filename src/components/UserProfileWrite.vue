<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const content = ref("");
const props = defineProps({});
const emit = defineEmits(["post_file"]);

const post_file = () => {
  // 表单问题！！！后端默认只支持表单格式
  const form = new URLSearchParams({
    content: content.value,
  });
  axios
    .post("https://app165.acapp.acwing.com.cn/myspace/post/", form, {
      headers: {
        Authorization: `Bearer ${userStore.access}`,
      },
    })
    .then((resp) => {
      resp = resp.data;
      // 等后端返回结果，在前端更新
      if (resp.result === "success") {
        emit("post_file", content.value); // 将事件传递给父组件
        content.value = "";
      }
    });
};
</script>

<template>
  <div class="card edit-field">
    <div class="card-body">
      <label for="edit-post" class="form-label">编辑帖子</label>
      <!-- 让textarea和content保持同步 -->
      <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
      <button @click="post_file" type="button" class="btn btn-primary btn-sm w-auto">发帖</button>
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
