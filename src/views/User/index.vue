<template>
  <div class="user-page">
    <van-nav-bar
      title="用户列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in userList" :key="item.id">
          <van-card
            :price="item.price"
            :desc="'性别:' + item.gender"
            :title="'用户名:' + item.username"
            class="goods-card"
            :thumb="'/api/' + item.avatar"
          />
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              @click="deleteUser(item.id)"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { userList, userDelete } from "@/api/index";
export default {
  name: "User",
  data() {
    return {
      page: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
      },
      userList: [],
      loading: false,
      finished: false,
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page.pageNum += 1;
      this.fetchUserList();
    },
    fetchUserList() {
      userList(this.page).then((res) => {
        this.userList = [...this.userList, ...res.data.records];
        this.page.total = res.data.total;
        if (this.userList.length >= this.page.total) {
          this.finished = true;
        }
      });
    },
    deleteUser(id) {
      userDelete(id).then((res) => {
        if (res.code === 200) {
          let index = this.userList.findIndex((item) => item.id === id);
          if (index != -1) {
            this.userList.splice(index, 1);
            this.$toast.success("删除成功！");
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-page {
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
  /deep/ .van-card__title {
    font-size: 15px;
  }
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
}
</style>