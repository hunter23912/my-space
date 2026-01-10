import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
  }),
  getters: {},
  actions: {
    login(data) {
      // const remote_api = "https://app165.acapp.acwing.com.cn/api/token";
      const params = new URLSearchParams();
      params.append("username", data.username);
      params.append("password", data.password);

      axios.post("/api/token", params).then((resp) => {
        console.log("这是resp: " + resp);
      });
    },
  },
});
