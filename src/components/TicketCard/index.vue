<template>
  <div class="card-wrap" @click="handleToDetail">
    <div>
      <van-image width="100" height="100" fit="cover" :src="itemImgUrl" />
    </div>
    <div>
      <div class="ticket-name">{{ data.name }}</div>
      <div class="ticket-desc van-multi-ellipsis--l2">{{ data.desc }}</div>
      <div class="price">￥ {{ data.price }}</div>
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
    console.log(this.data,"AAAAAAAAAAA")
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
  methods: {
    handleToDetail() {
      this.$router.push({
        name: "Ticket",
        params: { id: this.data.id },
      });
    },
  },
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
      .ticket-desc {
        width: 210px;
        font-size: 10px;
        text-align: left;
      }
      .price {
        margin-left: 100px;
      }
    }
  }
}
</style>
