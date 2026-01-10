<script setup lang="ts">
import Content from "../components/Content.vue";
import { ref } from "vue";
import { useUserStore } from "../store/user";

const store = useUserStore();
let username = ref("");
let password = ref("");
let error_message = ref("");

const login = () => {
  store.login({
    username: username.value,
    password: password.value,

    success() {
      console.log("success");
    },
    error() {
      console.log("failed");
    },
  });
};
</script>

<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-4">
        <!-- 拒绝submit默认跳转行为 -->
        <form @submit.prevent="login">
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
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">登录</button>
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
