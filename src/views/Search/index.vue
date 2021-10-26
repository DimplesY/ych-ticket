<template>
  <div class="search-page">
    <van-nav-bar title="搜索" />
    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @input="onSearch"
    />

    <TicketCard :data="item" v-for="(item, index) in list" :key="index" />
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard";
import { ticketList } from "@/api";
export default {
  name: "Search",
  components: {
    TicketCard,
  },
  data() {
    return {
      list: [],
      value: "",
    };
  },
  created() {
    this.onSearch("");
  },
  methods: {
    onSearch(val) {
      ticketList({ name: val }).then((res) => {
        this.list = res.data.records;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
