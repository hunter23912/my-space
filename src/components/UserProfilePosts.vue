<script setup>
import { useUserStore } from "../store/user";
import { computed } from "vue";
import { defineEmits } from "vue";
import axios from "axios";

const userStore = useUserStore();
let is_me = computed(() => userStore.id === props.user.id); //script中必须加props前缀

const emit = defineEmits(["delete_post"]);
const delete_post = (post_id) => {
  const form = new URLSearchParams();
  form.append("post_id", post_id);
  axios
    .delete("https://app165.acapp.acwing.com.cn/myspace/post/", {
      data: form,
      headers: {
        Authorization: `Bearer ${userStore.access}`,
      },
    })
    .then((resp) => {
      resp = resp.data;
      if (resp.result === "success") {
        // 删除成功后，发出事件通知父组件
        emit("delete_post", post_id);
      }
    });
};

const props = defineProps({
  posts: {
    type: Object,
    required: true, // 必须传入
  },
  user: {
    type: Object,
    required: true, // 必须传入
  },
});
</script>

<template>
  <div v-for="post in props.posts.posts" :key="post.id">
    <div class="card single-post">
      <div class="card-body">
        {{ post.content }}
        <button @click="delete_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm w-auto">
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.single-post {
  margin-bottom: 10px;
}
button {
  float: right;
}
</style>
