<template>
  <v-app-bar app color="rgb(34 36 40 / 48%)">
    <div class="banner">
      <div class="logo">
        <img src="../../public/logo.png" />
        <span><img src="../../public/logo2.png" /></span>
      </div>
      <v-btn
        v-if="!isOnTop"
        @click="moveTo('search')"
        class="submit-button"
        elevation="6"
        outlined
        rounded
        ><v-icon>{{ downIcon }}</v-icon
        >데이터 조회</v-btn
      >

      <v-btn
        v-else
        @click="moveTo('stream')"
        class="submit-button"
        elevation="6"
        outlined
        rounded
        ><v-icon>{{ upIcon }}</v-icon
        >실시간 데이터</v-btn
      >
    </div>
  </v-app-bar>
</template>
<script>
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
export default {
  data() {
    return {
      isOnTop: false,
      windowTop: null,
      searchTop: 760,
      downIcon: mdiChevronDown,
      upIcon: mdiChevronUp,
    };
  },

  methods: {
    moveTo(e) {
      if (e == "search") {
        window.scroll({
          top: this.searchTop,
          left: 0,
          behavior: "smooth",
        });
      } else {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },

    detectTop() {
      this.windowTop = window.top.scrollY;
      this.isOnTop = this.windowTop > this.searchTop - 50 ? true : false;
      this.searchTop = document.getElementById("searchTop").offsetTop;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.detectTop);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.detectTop);
  },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 1028px !important;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 8vh;
    }

    span {
      img {
        width: 290px;
        margin: 0 0 -4px 10px;
      }
    }
  }
 
}
</style>