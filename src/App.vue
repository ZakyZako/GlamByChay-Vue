<template>
  <v-app>
    <v-main> <Header /><router-view></router-view> </v-main>
  </v-app>
</template>

<script>
import Header from "@/views/Header/Header.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faLongArrowAltRight);

export default {
  created() {
    const userToken = localStorage.getItem("userToken");
    this.$store.dispatch("fetchUserDataFromConnection", userToken);
  },
  components: {
    Header,
  },
};
</script>

//
<style lang="scss"></style>
