<script setup lang="ts">
import Content from "../components/Content.vue";
import UserProfileInfo from "../components/UserProfileInfo.vue";
import UserProfilePosts from "../components/UserProfilePosts.vue";
import UserProfileWrite from "../components/UserProfileWrite.vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
import { useUserStore } from "../store/user";
import { computed } from "vue";

const userStore = useUserStore();
const route = useRoute();
const userId = parseInt(route.params.userId);
const user = reactive({});
const posts = reactive({
  count: 0,
  posts: [],
});

axios
  .get("https://app165.acapp.acwing.com.cn/myspace/getinfo/", {
    params: {
      user_id: userId,
    },
    headers: {
      Authorization: `Bearer ${userStore.access}`,
    },
  })
  .then((resp) => {
    const data = resp.data;

    user.id = data.id;
    user.username = data.username;
    user.photo = data.photo;
    user.followerCount = data.followerCount;
    user.is_followed = data.is_followed;
  });

// 获取用户帖子
axios
  .get("https://app165.acapp.acwing.com.cn/myspace/post/", {
    params: {
      user_id: userId,
    },
    headers: {
      Authorization: `Bearer ${userStore.access}`,
    },
  })
  .then((resp) => {
    const data = resp.data;
    posts.count = data.length;
    posts.posts = data;
  });

const follow = () => {
  if (user.is_followed) {
    return;
  }
  user.is_followed = true;

  user.followerCount++;
};

const unfollow = () => {
  if (!user.is_followed) {
    return;
  }
  user.is_followed = false;
  user.followerCount--;
};

const post_file = (content: string) => {
  posts.count++;
  posts.posts.unshift({
    // 在数组开头添加新帖子
    id: posts.count,
    userId: user.id,
    content: content,
  });
};

const is_me = computed(() => userId === userStore.id);
</script>

<template>
  <Content>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo @father_follow="follow" @father_unfollow="unfollow" :user="user" />
        <UserProfileWrite v-if="is_me" @post_file="post_file" />
      </div>
      <div class="col-9">
        <UserProfilePosts :posts="posts" />
      </div>
    </div>
  </Content>
</template>
