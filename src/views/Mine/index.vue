<template>
  <div class="mine">
    <van-nav-bar title="我的" />
    <div class="user-info">
      <div class="user-avatar">
        <van-image
          width="100"
          height="100"
          round
          fit="cover"
          :src="userInfo.avatar || defaultAvatar"
        />
      </div>
      <div v-if="!isLogin" class="van-ellipsis" @click="handleToLogin">
        登陆
      </div>
      <div v-if="isLogin" class="van-ellipsis">{{ userInfo.username }}</div>
      <div>￥{{ userInfo.price }}</div>
    </div>
    <div class="user-info-detail">
      <van-cell-group title="用户">
        <van-cell
          icon="contact"
          size="large"
          title="个人信息"
          is-link
          to="index"
        />
        <van-cell
          icon="gold-coin-o"
          size="large"
          title="余额充值"
          is-link
          to="index"
        />
        <van-cell
          size="large"
          icon="coupon-o"
          title="我的门票"
          is-link
          url="/vant/mobile.html"
        />
        <van-cell
          v-if="isLogin"
          icon="revoke"
          size="large"
          title="退出登录"
          is-link
          @click="handleLogOut"
        />
      </van-cell-group>

      <van-cell-group v-if="userInfo.type === 'admin'" title="管理员">
        <van-cell
          icon="friends-o"
          size="large"
          title="用户管理"
          is-link
          to="index"
        />
        <van-cell
          icon="contact"
          size="large"
          title="充值订单"
          is-link
          to="index"
        />
        <van-cell
          icon="gold-coin-o"
          size="large"
          title="门票管理"
          is-link
          to="index"
        />
        <van-cell
          size="large"
          icon="bill-o"
          title="收益统计"
          is-link
          url="/vant/mobile.html"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { LOGIN_USER, DEFAULT_AVATAR } from "@/utils/constant";
import { logout } from "@/api/index";
export default {
  name: "Mine",
  components: {},
  data() {
    return {
      userInfo: "",
      isLogin: false,
      defaultAvatar: DEFAULT_AVATAR,
    };
  },
  created() {
    const userInfo = localStorage.getItem(LOGIN_USER) || null;
    if (userInfo !== null) {
      this.userInfo = JSON.parse(userInfo);
      this.isLogin = true;
    }
  },
  methods: {
    handleToLogin() {
      this.$router.replace({ name: "Login" });
    },
    handleLogOut(e) {
      logout().then((res) => {
        if (res.code === 200) {
          localStorage.removeItem(LOGIN_USER);
          this.$toast.success("退出成功");
          this.$router.go(0);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  padding-bottom: 60px;
  .user-info {
    @include flex-center;
    width: 100%;
    margin-top: 20px;
    justify-content: flex-start;
    > div {
      &:nth-child(1) {
        margin-left: 30px;
      }
      &:nth-child(2) {
        margin-left: 30px;
        font-size: 25px;
        width: 100px;
      }
      &:nth-child(3) {
        margin-left: 10px;
        margin-top: 10px;
        font-size: 20px;
      }
    }
  }
  .user-info-detail {
    width: 100%;
    overflow: hidden;
  }
}
</style>
