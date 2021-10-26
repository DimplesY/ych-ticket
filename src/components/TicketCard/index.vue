<template>
  <div class="card-wrap">
    <div>
      <van-image width="100" height="100" fit="cover" :src="itemImgUrl" />
    </div>
    <div>
      <div class="ticket-name">这是门票的名字</div>
      <div class="price">￥ 99.00</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketCard",
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      title: "",
    };
  },
  created() {
    console.log(process.env.VUE_APP_BASE_URL);
  },
  computed: {
    itemImgUrl() {
      if (this.data.imgList[0]) {
        return "/api" + this.data.imgList[0].url;
      }
      return "";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.card-wrap {
  width: 95%;
  height: 150px;
  margin: 10px auto;
  @include flex-center;
  justify-content: space-between;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  &:active {
    background: rgb(212, 211, 211);
  }
  > div {
    &:nth-child(1) {
      width: 100px;
      margin-left: 20px;
    }
    &:nth-child(2) {
      flex: 1;
      @include flex-center;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      > div {
      }
    }
  }
}
</style>
