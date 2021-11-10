<template>
  <div class="banner">
    <van-nav-bar title="Banner图管理" />

    <div style="width: 90%; margin: 15px auto">
      <van-button
        type="primary"
        icon="plus"
        round
        size="large"
        @click="show = true"
        >新增轮播图</van-button
      >
    </div>

    <van-swipe-cell
      style="margin-bottom: 5px"
      v-for="item in banners"
      :key="item.id"
    >
      <BannerCard :url="item.url" />
      <template #right>
        <van-button
          square
          type="danger"
          class="delete-button"
          @click="deleteBanner(item.id)"
          text="删除"
        />
      </template>
    </van-swipe-cell>

    <!-- S 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      :style="{ height: '40%', width: '95%' }"
    >
      <div class="add-ticket">
        <div
          class="title"
          style="width: 100%; text-align: center; margin-top: 20px"
        >
          添加演唱会门票
        </div>
        <van-form style="margin-top: 40px" @submit="onSubmit">
          <div style="margin-top: 20px">
            <van-field name="演唱会图片" label="演唱会图片">
              <template #input>
                <van-uploader
                  :after-read="afterRead"
                  :before-read="beforeRead"
                  v-model="tempImgList"
                  max-count="1"
                />
              </template>
            </van-field>
          </div>

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
import BannerCard from "@/components/BannerCard";
import { bannerList, deleteUrl, addUrl } from "@/api/index";
export default {
  name: "Banner",
  components: {
    BannerCard,
  },
  data() {
    return {
      banners: [],
      show: false,
      tempImgList: [],
      imgList: [],
    };
  },
  created() {
    bannerList().then((res) => {
      this.banners = res.data.map((item) => ({
        ...item,
        url: item.url.includes("http") ? item.url : "/api" + item.url,
      }));
    });
  },
  methods: {
    deleteBanner(id) {
      deleteUrl(id).then((res) => {
        if (res.code === 200) {
          this.$toast.success("删除成功");
          location.reload();
        }
      });
    },
    onSubmit() {
      let data = {
        url: this.imgList[0],
      };
      addUrl(data).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.show = false;
          this.$toast.success("添加成功");
          location.reload();
        }
      });
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
.delete-button {
  height: 180px;
}
.banner{
  padding-bottom: 20vh;
}
</style>