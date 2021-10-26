<template>
  <div class="login">
    <van-nav-bar title="登录" :fixed="true" />
    <div class="login-form">
      <h1>用户登录</h1>
      <div>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 50px">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <div class="user-register" @click="toRegisterPage">注册账号</div>
  </div>
</template>

<script>
import { login } from "@/api/index";
import { LOGIN_USER } from "@/utils/constant";
import md5 from "md5";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  beforeRouteEnter(to, form, next) {
    if (localStorage.getItem(LOGIN_USER)) {
      next((vm) => {
        vm.$router.push({ name: "Home" });
      });
    } else {
      next();
    }
  },
  methods: {
    onSubmit() {
      login({ username: this.username, password: md5(this.password) }).then(
        (res) => {
          if (res.code === 200) {
            localStorage.setItem(LOGIN_USER, JSON.stringify(res.data));
            this.$router.replace({ name: "Mine" });
            this.$toast.success("登录成功");
          } else {
            this.$toast.fail("登录失败");
          }
        }
      );
    },
    toRegisterPage() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .login-form {
    margin-top: 50px;
    h1 {
      width: 100%;
      height: 80px;
      @include flex-center;
    }
  }
  .user-register {
    width: 100%;
    color: $second-color;
    @include flex-center;
  }
}
</style>
