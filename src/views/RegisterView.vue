<script setup lang="ts">
import Content from "../components/Content.vue";
import { ref } from "vue";
import { useUserStore } from "../store/user";
import router from "../router/index";
import axios from "axios";

const userStore = useUserStore();
let username = ref("");
let password = ref("");
let password_confirm = ref("");
let error_message = ref("");

const register = () => {
  error_message.value = "";

  const form = new URLSearchParams({
    username: username.value,
    password: password.value,
    password_confirm: password_confirm.value,
  });
  axios
    .post("https://app165.acapp.acwing.com.cn/myspace/user/", form)
    .then((resp) => {
      resp = resp.data;
      if (resp.result === "success") {
        userStore.login({
          username: username.value,
          password: password.value,
          success() {
            router.push({ name: "userlist" });
          },
          error() {
            error_message.value = "注册后登录失败，请手动登录";
          },
        });
      } else {
        error_message.value = resp.result;
        console.log("注册失败", resp);
      }
    })
    .catch((e) => {
      error_message.value = "注册失败，请稍后重试";
      console.log("注册异常", e);
    });
};
</script>

<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-4">
        <!-- 拒绝submit默认跳转行为 -->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <!-- 将input绑定到username变量 -->
            <input type="text" class="form-control" id="username" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <!-- 将input绑定到password变量 -->
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <!-- 将input绑定到password_confirm变量 -->
            <input type="password" class="form-control" id="password_confirm" v-model="password_confirm" />
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>
  </Content>
</template>

<style>
button {
  width: 100%;
}
.error-message {
  color: red;
}
</style>
