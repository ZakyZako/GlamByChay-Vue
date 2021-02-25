<template>
  <div>
    <div class="product-list-title">
      <h2>Nos cils tendances du moment</h2>
    </div>
    <div class="wrapper-product">
      <ProductItem
        v-for="product in getProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductList/ProductItem/productItem.vue";
export default {
  created() {
    return this.$store.dispatch("getProducts");
  },
  computed: {
    getProducts() {
      return this.$store.getters.getProducts;
    },
  },
  components: {
    ProductItem,
  },
};
</script>

<style lang="scss" scoped>
.product-list-title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 50px 0;
}

.wrapper-product {
  height: auto;
  width: 100%;
  display: flex;
  margin-bottom: 100px;
  justify-content: center;
}

@media screen and(max-width: 1024px) {
  .wrapper-product {
    flex-wrap: wrap;
    justify-content: start;
  }
}
</style>
