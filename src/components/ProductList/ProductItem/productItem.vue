<template>
  <div class="product-item">
    <img
      @click="test"
      class="product-item__img-product"
      :src="product.img_path"
      alt="img-product"
    />

    <div class="product-item__wrapper-desc">
      <h2>{{ product.name }}</h2>
      <div class="product-item__wrapper-desc__price">
        <span>{{ product.price }}€</span>
      </div>
      <p class="product-item__wrapper-desc__add_to_card">Ajouter au panier</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$router.push({
        name: "product-page",
        params: { id: this.product.id },
      });
    },
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  &__img-product {
    cursor: pointer;
    object-fit: contain;
    height: 50%;
    width: 100%;
  }

  &__wrapper-desc {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__price {
      margin: 15px 0 25px 0;
    }

    &__add_to_card {
      font-size: 16px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
