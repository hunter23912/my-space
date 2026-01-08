<script setup>
const props = defineProps({
  posts: {
    type: Object,
    required: true, // 必须传入
  },
});
</script>

<template>
  <div v-for="post in props.posts.posts" :key="post.id">
    <div class="card single-post">
      <div class="card-body">{{ post.content }}</div>
    </div>
  </div>
</template>

<style>
.single-post {
  margin-bottom: 10px;
}
</style>
