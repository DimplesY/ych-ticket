<template>
  <div class="sys-ticket">
    <van-nav-bar title="门票管理" />
    <div style="width: 90%; margin: 15px auto">
      <van-button
        type="primary"
        icon="plus"
        round
        size="large"
        @click="show = true"
        >新增门票</van-button
      >
    </div>
    <TicketCard v-for="item in ticketList" :key="item.id" :data="item" />

    <van-popup
      v-model="show"
      closeable
      :style="{ height: '95%', width: '95%' }"
    >
      <div class="add-ticket">
        <div
          class="title"
          style="width: 100%; text-align: center; margin-top: 20px"
        >
          添加演唱会门票
        </div>

        <van-form style="margin-top: 40px" @submit="onSubmit">
          <van-field
            v-model="name"
            name="演唱会名字"
            label="演唱会名字"
            placeholder="演唱会名字"
          />
          <van-field
            v-model="price"
            name="演唱会价格"
            label="演唱会价格"
            placeholder="演唱会价格"
          />
          <van-field
            v-model="count"
            name="门票数量"
            label="门票数量"
            placeholder="门票数量"
          />

          <van-field
            v-model="address"
            name="演唱会地址"
            label="演唱会地址"
            placeholder="演唱会地址"
          />

          <van-field
            v-model="types"
            name="演唱会类型"
            label="演唱会类型"
            placeholder="多个类型请使用、分割"
          />
          <van-field
            readonly
            clickable
            name="calendar"
            :value="time"
            label="日历"
            placeholder="点击选择日期"
            @click="showCalendar = true"
          />
          <van-calendar v-model="showCalendar" @confirm="onConfirm" />

          <van-field
            v-model="desc"
            rows="3"
            autosize
            label="演唱会描述"
            type="textarea"
            maxlength="1000"
            placeholder="演唱会描述"
            show-word-limit
          />

          <van-field name="演唱会图片" label="演唱会图片">
            <template #input>
              <van-uploader
                :after-read="afterRead"
                :before-read="beforeRead"
                v-model="tempImgList"
                max-count="10"
              />
            </template>
          </van-field>

          <div
            style="
              margin-top: 20px;
              width: 250px;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <van-button round block type="info" native-type="submit">
              添加
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TicketCard from "@/components/SwiperCard";
import { ticketList, addTicket } from "@/api";
export default {
  name: "SysTicket",
  components: {
    TicketCard,
  },
  data() {
    return {
      page: {
        pageNum: 0,
        pageSize: 10,
      },
      ticketList: [],
      show: false,
      showCalendar: false,
      time: "",
      imgList: [],
      name: "",
      price: "",
      count: 1,
      address: "",
      types: "",
      desc: "",
      tempImgList: [],
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.page.pageNum += 1;
      ticketList(this.page).then((res) => {
        this.ticketList = [...this.ticketList, ...res.data.records];
      });
    },
    onSubmit() {
      let data = {
        time: this.time,
        imgList: this.imgList,
        name: this.name,
        price: Number(this.price),
        count: Number(this.count),
        address: this.address,
        types: this.types.split("、"),
        desc: this.desc,
      };
      addTicket(data).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.show = false;
          this.$toast.success("添加成功");
          location.reload();
        }
      });
    },

    onConfirm(date) {
      this.time = `${date.getFullYear()}-${
        (date.getMonth() + 1) >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }-${
        date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
      } 00:00:00`;
      this.showCalendar = false;
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("只允许上传jpg/png格式的图片!");
        return false;
      }
      return true;
    },
    afterRead(file) {
      this.$upload(file.file).then((res) => {
        this.imgList.push(res.data.url);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sys-ticket {
  padding-bottom: 60px;
}
</style>