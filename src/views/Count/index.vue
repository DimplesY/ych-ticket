<template>
  <div class="count-page">
    <van-nav-bar title="收益统计" />
    <div class="content">
      <div>
        <van-circle v-model="countInfo.ticketCount" :rate="countInfo.ticketCount" :speed="100" :text="countInfo.ticketCount+''" />
        <div>门票数量</div>
      </div>
      <div>
        <van-circle
          v-model="countInfo.totalPrice"
          color="#f00"
          :rate="1000000"
          :speed="1000000"
          :text="countInfo.totalPrice+''"
        />
        <div>订单金额</div>
      </div>
      <div>
        <van-circle
          v-model="countInfo.userCount"
          color="#0f0"
          :rate="countInfo.userCount"
          :speed="countInfo.userCount"
          :text="countInfo.userCount+''"
        />
        <div>系统用户</div>
      </div>
    </div>
  </div>
</template>

<script>
import { sysCount } from "@/api";
export default {
  name: "Count",
  data() {
    return {
      countInfo:{
      }
    };
  },
  created() {
    sysCount().then((res) => {
      this.countInfo = res.data
    });
  },
};
</script>

<style lang="scss" scoped>
.count-page {
  background: #f7f8fa;
  .content {
    display: flex;
    justify-content: space-around;
    align-content: center;
    > div {
      @include flex-center;
      width: 200px;
      height: 200px;

      flex-direction: column;
      > div {
        width: 100%;
        margin-top: 20px;
        @include flex-center;
        text-align: center;
      }
    }
  }
}
</style>