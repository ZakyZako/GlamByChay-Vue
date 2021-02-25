<template>
  <div class="home">
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList/productList.vue";

export default {
  name: "Home",
  components: {
    ProductList,
  },
};
</script>
<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
