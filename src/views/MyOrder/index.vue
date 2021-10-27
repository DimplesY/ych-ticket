<template>
  <div class="order-page">
    <van-nav-bar
      title="我的门票"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <TicketCard :data="item" v-for="(item, index) in list" :key="index" />
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard";
import { myOrder } from "@/api";
export default {
  name: "MyOrder",
  components: {
    TicketCard,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.onSearch("");
  },
  methods: {
    onSearch() {
      myOrder().then((res) => {
        this.list = res.data;
        console.log(res);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-page {
  padding-bottom: 60px;
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
}
</style>
