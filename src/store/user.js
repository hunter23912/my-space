import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  }),
  getters: {},
  actions: {
    login(data) {
      const remote_api = "https://app165.acapp.acwing.com.cn/api/token/";
      // const proxy_api = "/api/token/";

      axios
        .post("https://app165.acapp.acwing.com.cn/api/token/", {
          username: data.username,
          password: data.password,
        })
        .then((resp) => {
          const { access, refresh } = resp.data;
          const access_obj = jwtDecode(access);

          setInterval(() => {
            const form = new URLSearchParams({
              refresh: this.refresh,
            });
            axios
              .post("https://app165.acapp.acwing.com.cn/api/token/refresh/", form)
              .then((resp) => {
                resp = resp.data;
                this.access = resp.access;
                console.log("刷新 access 成功", this.access);
              })
              .catch((err) => {
                console.log("刷新 access 失败: ", err);
              });
          }, 4.5 * 60 * 1000); // 4.5 分钟刷新一次

          // 获取用户信息
          axios
            .get(`${remote_api}myspace/getinfo/`, {
              params: {
                user_id: access_obj.user_id,
              },
              headers: {
                Authorization: `Bearer ${access}`,
              },
            })
            .then((resp) => {
              this.setUser(resp.data, access, refresh);
              data.success();
            })
            .catch((err) => {
              console.log("获取用户信息失败: ", err);
            });
        })
        .catch((e) => {
          data.error(); // 测试回调函数
          console.log("登录失败: ", e);
        });
    },
    setUser(info, access, refresh) {
      this.$patch({
        id: info.id,
        username: info.username,
        photo: info.photo,
        followerCount: info.follower_count,
        access: access,
        refresh: refresh,
        is_login: true,
      });
    },

    // 清空信息
    logout() {
      this.$patch({
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
      });
    },
  },
});
