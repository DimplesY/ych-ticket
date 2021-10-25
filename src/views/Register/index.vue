<template>
  <div class="register">
    <van-nav-bar title="注册" :fixed="true"/>
    <div class="register-from">
      <h1>注册</h1>
      <div>
        <van-form @submit="onSubmit">
          <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{required: true, message: '请输入用户名'}]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="againpwd"
              type="password"
              name="validatorMessage"
              label="确认密码"
              placeholder="请再出输入密码"
              :rules="[{validator: validatorMessage, message: '密码输入不一致'}]"
          />
<!--          <van-field
              v-model="email"
              type="email"
              name="邮箱"
              label="邮箱"
              placeholder="请输入邮箱"
              :rules="[{ required: true, message: '请填写邮箱' }]"
          />-->
          <div style="margin: 50px">
            <van-button round block type="info" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import {register} from "@/api/index"

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      avatar: "",
      gender: "",
      againpwd: ""
    }
  },
  methods: {
    onSubmit() {
      register({username: this.username, password: this.password}).then(
          (res) => {
            console.log(res);
          }
      );
    },
    validatorMessage(val) {
      return this.password === val
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  .register-from {
    margin-top: 50px;

    h1 {
      width: 100%;
      height: 80px;
      @include flex-center;
    }
  }
}
</style>
