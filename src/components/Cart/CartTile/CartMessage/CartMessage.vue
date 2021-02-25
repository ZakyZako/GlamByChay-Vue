<template>
  <div
    v-if="!userToken"
    class="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty"
  >
    <p class="cart__wrapper-cart__wrapper-cart-tile__message">
      Veuillez vous connecter sur votre compte afin d'ajouter des articles à
      votre panier
    </p>
    <button
      @click="closeCartOpenModal"
      class="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty__button"
    >
      Je me connecte
    </button>
  </div>

  <div
    v-else-if="cartProducts.cart_products.length === 0"
    class="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty"
  >
    <span>Votre panier est vide</span>
    <button
      class="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty__button"
      @click="closeCart"
    >
      Continuer vos achats
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  methods: {
    closeCartOpenModal() {
      this.$store.dispatch("Cart/toggleCart", false);
      this.$store.dispatch("toggleModal", true);
    },
    closeCart() {
      this.$store.dispatch("Cart/toggleCart", false);
    },
  },
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
    cartProducts() {
      return this.$store.getters["Cart/cartProducts"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
