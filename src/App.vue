<template>
  <v-app>
    <Banner></Banner>
    <v-main class="all" id="all">
      <div class="firstTop"></div>
      <section class="section">
        <StreamingList @click="showCoords(event)"></StreamingList>
      </section>
      <section id="searchTop" class="searchTop">
        <SearchResult></SearchResult>
      </section>
    </v-main>
  </v-app>
</template>

<script>
import Banner from "../src/components/Banner";
import StreamingList from "../src/components/StreamingList";
import SearchResult from "./components/SearchBox/SearchResult";
export default {
  name: "App",
  components: {
    Banner,
    StreamingList,
    SearchResult,
  },

  data() {
    return {
      scrollPosition: "",
      LoadingStatus: false,
    };
  },
  methods: {
    moveTo(e) {
      if (e == "search") {
        window.scroll({
          top: 724,
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
    detect() {
      this.windowTop = window.top.scrollY;
      this.isOnTop = this.windowTop > 700 ? true : false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.detect);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.detect);
  },
};
</script>
<style lang="scss">
html {
  background: #151b25 !important;
  min-height: 100%;
}
body {
  min-height: 100%;
  margin: 0;
}
.all {
  position: relative;
  transition: 1s cubic-bezier(0.5, 0, 0.5, 1);
}
.section {
  position: relative;
  margin-top: -11vh;
  height: 110vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}
.searchTop {
  position: relative;
  height: 120vh;
  overflow: hidden;
  box-sizing: border-box;
}
.container-box {
  flex-wrap: nowrap;
  display: flex;
  justify-content: center;
}
.chart {
  margin: 10px;
  background: #262b3461;
}
.section-title {
  width: 100%;
  height: 40px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d3dae80d;
  padding: 5px 15px 5px 30px;
  font-size: 12px;
  font-weight: 500;
}
.firstTop {
  width: 100%;
  height: 3vh;
  background: linear-gradient(
    157deg,
    #151b25 16%,
    #2d5f8a70 45%,
    #1b3a52 28%,
    #151b25 100%
  );
  
  z-index: -2;
  display: flex;
  align-items: center;

  h4 {
    display: block;
    margin: 0 auto;
    width: 1000px;
    padding: 10px;
  }
}

.theme--dark.v-application {
  background: #151b25 !important;
}
</style>