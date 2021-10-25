<template>
  <div id="app">
    <transition name="van-slide-right">
      <router-view />
    </transition>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"> 首页 </van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">
        搜索
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="user-o"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
    };
  },
};
</script>

<style lang="scss"></style>
