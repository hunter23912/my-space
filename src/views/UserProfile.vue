<script setup lang="ts">
import Content from "../components/Content.vue";
import UserProfileInfo from "../components/UserProfileInfo.vue";
import UserProfilePosts from "../components/UserProfilePosts.vue";
import UserProfileWrite from "../components/UserProfileWrite.vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";

const user = reactive({
  id: 1,
  username: "yanxuecan",
  lastName: "yan",
  firstName: "xuecan",
  followerCount: 66,
  is_followed: false,
});

const route = useRoute();
const userId = route.params.userId;

console.log(route.params.userId);

// 当posts变化时，涉及到的组件会自动更新
const posts = reactive({
  count: 3,
  posts: [
    {
      id: 1,
      userId: 1,
      content: "这是我的第一条动态！",
    },
    {
      id: 2,
      userId: 1,
      content: "这是我的第二条动态！",
    },
    {
      id: 3,
      userId: 1,
      content: "这是我的第三条动态！",
    },
  ],
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
</script>

<template>
  <Content>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo @father_follow="follow" @father_unfollow="unfollow" :user="user" />
        <UserProfileWrite @post_file="post_file" />
      </div>
      <div class="col-9">
        <UserProfilePosts :posts="posts" />
      </div>
    </div>
  </Content>
</template>
