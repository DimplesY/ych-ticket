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
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="changeFilter"
        />
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          @change="changeFilter"
        />
      </van-dropdown-menu>
    </div>
    <div class="card-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <TicketCard :data="item" v-for="(item, index) in list" :key="index" />
      </van-list>
    </div>
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard";
import { ticketList } from "@/api";
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
      page: {
        pageSize: 10,
        pageNum: 0,
      },
      value1: "",
      value2: "time",
      option1: [
        { text: "全部门票", value: "" },
        { text: "热门门票", value: "view_num" },
      ],
      option2: [
        { text: "时间排序", value: "time" },
        { text: "价格排序", value: "price" },
        { text: "销量排序", value: "count" },
      ],
    };
  },

  methods: {
    changeFilter() {
      this.page = {
        pageSize: 10,
        pageNum: 0,
      };
      this.onLoad();
    },
    onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.page.pageNum += 1;
      let params = {
        ...this.page,
        orderBy: this.value2,
        filter: this.value1,
      };
      ticketList(params).then((res) => {
        this.list = res.data.records;
        console.log(res);
      });
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
