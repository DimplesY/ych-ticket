<template>
  <div class="search-page">
    <van-nav-bar title="搜索" />
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
