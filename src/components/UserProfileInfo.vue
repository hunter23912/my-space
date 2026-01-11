<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../store/user";
import axios from "axios";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const userStore = useUserStore();
const emit = defineEmits(["follow", "unfollow"]);

const follow = () => {
  const form = new URLSearchParams({
    target_id: props.user.id,
  });
  axios
    .post("https://app165.acapp.acwing.com.cn/myspace/follow/", form, {
      headers: {
        Authorization: `Bearer ${userStore.access}`,
      },
    })
    .then((resp) => {
      resp = resp.data;
      // 只有后端成功了，才传递事件，更新前端关注数
      if (resp.result === "success") {
        emit("follow");
      }
    });
};

const unfollow = () => {
  const form = new URLSearchParams({
    target_id: props.user.id,
  });
  axios
    .post("https://app165.acapp.acwing.com.cn/myspace/follow/", form, {
      headers: {
        Authorization: `Bearer ${userStore.access}`,
      },
    })
    .then((resp) => {
      resp = resp.data;
      if (resp.result === "success") {
        emit("unfollow");
      }
    });
};

const local_img = "https://pic1.zhimg.com/80/v2-7bf11332cdf96915e567556c804aa712_720w.webp";
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-4 img-field">
          <img class="img-fluid" :src="user.photo" alt="未知图片" />
        </div>
        <div class="col-8" style="padding-left: 10%">
          <div class="username">{{ user.username }}</div>
          <div class="fans">粉丝数: {{ user.followerCount }}</div>
          <button v-if="!user.is_followed" type="button" class="btn btn-secondary w-auto" @click="follow">+关注</button>
          <button v-if="user.is_followed" type="button" class="btn btn-secondary w-auto" @click="unfollow">
            取消关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
  min-width: 70px;
  max-width: 70px;
}
.username {
  font-weight: bold;
}

.fans {
  font-size: 14px;
  color: gray;
}

button {
  padding: 2px 4px;
  font-size: 14px;
}

.img-field {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
