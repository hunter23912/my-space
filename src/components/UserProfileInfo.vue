<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const fullName = computed(() => props.user.lastName + " " + props.user.firstName);

const emit = defineEmits(["father_follow", "father_unfollow"]);
const follow = () => {
  emit("father_follow");
};
const unfollow = () => {
  emit("father_unfollow");
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img
            class="img-fluid"
            src="https://pic1.zhimg.com/80/v2-7bf11332cdf96915e567556c804aa712_720w.webp"
            alt="未知图片"
          />
        </div>
        <div class="col-9" style="padding-left: 10%">
          <div class="username">{{ fullName }}</div>
          <div class="fans">粉丝数: {{ user.followerCount }}</div>
          <button v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm" @click="follow">+关注</button>
          <button v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm" @click="unfollow">
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
</style>
