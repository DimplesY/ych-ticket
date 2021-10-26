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
        <van-cell icon="contact" size="large" title="个人信息" is-link />
        <van-cell
          icon="gold-coin-o"
          size="large"
          title="余额充值"
          is-link
          @click="addPrice"
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

    <!-- 用户信息弹出层 -->
    <van-popup
      v-model="showRecharge"
      round
      closeable
      :style="{ height: '50%', width: '90%' }"
    >
      <div class="title">余额充值</div>
      <div class="price">
        <van-field
          v-model="recharge"
          label="金额"
          size="large"
          type="number"
          readonly
          colon
          label-width="50px"
          placeholder="请输入充值金额"
        />
        <van-row style="margin-top: 20px" type="flex" justify="space-around">
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(100)"
              plain
              type="info"
              >￥100</van-button
            >
          </van-col>
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(200)"
              plain
              type="info"
              >￥200</van-button
            >
          </van-col>
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(300)"
              plain
              type="info"
              >￥300</van-button
            >
          </van-col>
        </van-row>

        <van-row style="margin-top: 20px" type="flex" justify="space-around">
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(400)"
              plain
              type="info"
              >￥400</van-button
            >
          </van-col>
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(500)"
              plain
              type="info"
              >￥500</van-button
            >
          </van-col>
          <van-col span="6">
            <van-button
              style="width: 85px"
              @click="czNumber(600)"
              plain
              type="info"
              >￥600</van-button
            >
          </van-col>
        </van-row>
      </div>
      <div class="cz-btn">
        <van-button
          style="width: 150px"
          icon="passed"
          type="primary"
          @click="charge"
          >充值</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { LOGIN_USER, DEFAULT_AVATAR } from "@/utils/constant";
import { logout, getUserInfo, addUserPrice } from "@/api/index";
export default {
  name: "Mine",
  components: {},
  data() {
    return {
      userInfo: "",
      isLogin: false,
      defaultAvatar: DEFAULT_AVATAR,
      showRecharge: false,
      recharge: 0,
    };
  },
  created() {
    const userInfo = localStorage.getItem(LOGIN_USER) || null;
    if (userInfo !== null) {
      this.userInfo = JSON.parse(userInfo);
      this.isLogin = true;
    } else {
      getUserInfo().then((res) => {
        if (res.data.code === 400) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
          this.userInfo = res.data;
          localStorage.setItem(LOGIN_USER, JSON.stringify(res.data));
        }
      });
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
    czNumber(price) {
      this.recharge = price;
    },
    addPrice() {
      if (!this.isLogin) {
        return this.$toast("请先登录");
      }
      this.showRecharge = true;
    },
    charge() {
      let data = {
        price: this.recharge,
      };
      addUserPrice(data)
        .then((res) => {
          if (res.code === 200) {
            return getUserInfo();
          }
        })
        .then((res) => {
          this.$toast.success("充值成功...");
          localStorage.setItem(LOGIN_USER, JSON.stringify(res.data));
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
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
  .title {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .cz-btn {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
