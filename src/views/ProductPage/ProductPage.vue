<template>
  <div>
    <Product :product="product" />
  </div>
</template>

<script>
import Product from "@/components/Product/Product";
export default {
  created() {
    this.$store.dispatch("getOneProduct", this.$route.params.id);
  },
  computed: {
    product() {
      return this.$store.getters.productPage;
    },
  },
  components: {
    Product,
  },
};
</script>

<style lang="scss" scoped></style>
