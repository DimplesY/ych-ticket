<template>
  <div class="register">
    <van-nav-bar title="注册" :fixed="true" />
    <div class="register-from">
      <h1>注册</h1>
      <div>
        <van-form @submit="onSubmit">
          <van-field name="头像" label="头像">
            <template #input>
              <van-uploader
                :after-read="afterRead"
                :before-read="beforeRead"
                v-model="avatarList"
                max-count="1"
              />
            </template>
          </van-field>
          <van-field name="性别" label="性别">
            <template #input>
              <van-radio-group v-model="gender" direction="horizontal">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
                <van-radio name="未知">保密</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[
              {
                trigger: 'onBlur',
                message: '用户名不可用',
                validator: checkUserName,
              },
            ]"
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
            :rules="[
              { validator: validatorMessage, message: '密码输入不一致' },
            ]"
          />
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
import { register, checkUserName } from "@/api/index";
import { LOGIN_USER } from "@/utils/constant";
import md5 from "md5";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      avatarList: [],
      avatar: "",
      gender: "未知",
      againpwd: "",
    };
  },
  methods: {
    onSubmit() {
      let data = {
        username: this.username,
        password: md5(this.password),
        avatar: this.avatar,
        gender: this.gender,
      };

      register(data).then((res) => {
        if (res.code === 200) {
          localStorage.setItem(LOGIN_USER, JSON.stringify(res.data));
          this.$router.replace({ name: "Mine" });
          this.$toast.success("注册成功");
        } else {
          this.$toast.fail("注册失败");
        }
      });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("只允许上传jpg/png格式的图片!");
        return false;
      }
      return true;
    },
    afterRead(file) {
      this.$upload(file.file).then((res) => {
        this.avatar = res.data.url;
      });
    },
    validatorMessage(val) {
      return this.password === val;
    },
    checkUserName(val) {
      return new Promise((resolve) => {
        checkUserName(val).then((res) => {
          if (res.code === 200) return resolve(true);
          else return resolve(false);
        });
      });
    },
  },
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
