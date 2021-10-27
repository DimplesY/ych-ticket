<template>
  <div class="ticket-detail">
    <van-nav-bar
      title="门票详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="detail-content">
      <div class="name">
        <van-cell-group>
          <van-cell title="演唱会" :value="itemDetail.name" />
          <van-cell title="剩余数量" :value="itemDetail.count" />
          <van-cell title="门票价格" :value="'￥' + itemDetail.price" />
          <van-cell title="类型" :value="types" />
          <van-cell title="浏览次数" :value="itemDetail.viewNum + '次'" />
          <van-cell title="地址" :value="itemDetail.address" />
          <van-cell title="描述：" :label="itemDetail.desc" />
        </van-cell-group>
      </div>
      <div class="view-imgs">
        <div
          class="imgs"
          style="width: 100%"
          v-for="item in itemDetail.imgList"
          :key="item.id"
        >
          <img
            style="display: block; width: 100%"
            :src="'/api' + item.url"
            alt=""
          />
        </div>
      </div>
      <div class="buy-btn">
        <van-goods-action>
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onClickBuy"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { buyTicket, ticketDetail } from "@/api";
import { LOGIN_USER } from "@/utils/constant";
export default {
  name: "Ticket",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    types() {
      return this.itemDetail.types
        ? this.itemDetail.types.map((item) => item.typeName).join("、")
        : "";
    },
  },
  data() {
    return {
      itemDetail: {},
    };
  },
  created() {
    ticketDetail(this.id).then((res) => {
      this.itemDetail = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickBuy() {
      this.$dialog
        .confirm({
          title: "购票提醒",
          message: `是否下单购票，支付金额￥${this.itemDetail.price}`,
        })
        .then((res) => {
          return buyTicket({ ticketId: this.id });
        })
        .then((res) => {
          if (res.code == 200) {
            this.$toast.success("购买成功");
            localStorage.removeItem(LOGIN_USER);
            setTimeout(() => {
              this.$router.replace({ name: "Mine" });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ticket-detail {
  padding-bottom: 50px;
  /deep/ .van-nav-bar {
    background-color: $main-color;
  }
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  .banner {
    margin-top: 46px;
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  .buy-btn {
    position: fixed;
    bottom: 200px;
    right: 0px;
    z-index: 999999;
  }
}
</style>