<template>
  <van-swipe-cell>
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
    <template #right>
      <van-button
        square
        type="danger"
        @click="handleDelete"
        text="删除"
        class="delete-button"
      />
    </template>
  </van-swipe-cell>
</template>

<script>
import { ticketDelete } from "@/api";
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
  created() {},
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
    handleDelete() {
      ticketDelete(this.data.id).then((res) => {
        if (res.code === 200) {
          this.$toast.success("删除成功");
          window.location.reload();
        }
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
.delete-button {
  height: 100%;
}
</style>
