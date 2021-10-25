<template>
  <div class="home">
    <van-nav-bar title="首页" :fixed="true" />
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="filter-men">
      <van-dropdown-menu active-color="#3399CC">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <div class="card-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <TicketCard v-for="(item, index) in list" :key="index" />
      </van-list>
    </div>
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard";
export default {
  name: "Home",
  components: {
    TicketCard,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部门票", value: 0 },
        { text: "推荐门票", value: 1 },
        { text: "热门门票", value: 2 },
      ],
      option2: [
        { text: "时间排序", value: "a" },
        { text: "价格排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
    };
  },

  methods: {
    onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
        this.$toast.clear();
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  /deep/ .van-nav-bar {
    background-color: $main-color;
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
}
</style>
