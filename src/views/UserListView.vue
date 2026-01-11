<script setup>
import { onMounted, ref } from "vue";
import Content from "../components/Content.vue";
import axios from "axios";
import router from "../router";
import { useUserStore } from "../store/user";

let users = ref([]);
const userStore = useUserStore();

onMounted(() => {
  const remote_api = "https://app165.acapp.acwing.com.cn/myspace/userlist/";

  axios.get(remote_api).then((resp) => {
    users.value = resp.data;
  });
});

const open_user_profile = (userId) => {
  if (userStore.is_login) {
    router.push({ name: "userprofile", params: { userId: userId } });
  } else {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <Content>
    <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
      <div class="card-body">
        <div class="row">
          <div class="col-1 img-field">
            <img class="img-fluid rounded-circle" :src="user.photo" alt="" />
          </div>
          <div class="col-11">
            <div class="username">{{ user.username }}</div>
            <div class="follower-count">{{ user.followerCount }}</div>
          </div>
        </div>
      </div>
    </div>
    好友列表
  </Content>
</template>
<style scoped>
.username {
  font-size: 1.2em;
  font-weight: bold;
  height: 50%;
}

.follower-count {
  color: gray;
  font-size: 14px;
  height: 50%;
}
.card {
  margin-bottom: 20px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px lightgrey;
  transition: 300ms;
  background-color: #f8f9fa;
}

.img-field {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
