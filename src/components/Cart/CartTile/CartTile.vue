<template>
  <div class="cart-tile">
    <div class="cart-tile__wrapper-img">
      <img
        class="cart-tile__wrapper-img__img"
        :src="productInCart.product.img_path"
      />
    </div>
    <div class="cart-tile__wrapper-info">
      <h3 class="cart-tile__wrapper-info__name">
        {{ productInCart.product.name }}
      </h3>

      <span>{{ productInCart.total_price }}€</span>
    </div>
    <div class="cart-tile__wrapper">
      <span @click="deleteProduct" class="cart-tile__wrapper__delete-button">
        Supprimer
      </span>
      <div class="cart-tile__wrapper__wrapper-button">
        <span
          @click="decrementCheck"
          class="cart-tile__wrapper__wrapper-button__button"
        >
          -
        </span>
        <span> {{ productInCart.quantity }}</span>
        <span
          @click="incrementCheck"
          class="cart-tile__wrapper__wrapper-button__button"
        >
          +
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    incrementCheck() {
      this.$store.dispatch("Cart/addProduct", {
        id: this.productInCart.product.id,
        quantity: 1,
        token: this.userToken,
      });
    },
    decrementCheck() {
      this.$store.dispatch("Cart/removeProduct", {
        id: this.productInCart.product.id,
        quantity: 1,
        token: this.userToken,
      });
    },
    deleteProduct() {
      this.$store.dispatch("Cart/removeProduct", {
        id: this.productInCart.product.id,
        quantity: this.productInCart.quantity,
        token: this.userToken,
      });
    },
  },
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
  },
  props: {
    productInCart: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-tile {
  background-color: #fafafa;
  display: flex;
  margin: 20px 50px;
  height: 155px;

  &__wrapper-img {
    width: 30%;
    margin: 15px 20px;
    background-color: white;

    &__img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &__wrapper-info {
    width: 70%;
    justify-content: center;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 11px;

    &__name {
      margin-bottom: 12px;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 12px 32px;

    &__delete-button {
      cursor: pointer;
      margin-left: 15px;
    }

    &__wrapper-button {
      border: 1px solid grey;
      width: 100px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      &__button {
        cursor: pointer;
        margin: 0 22px;
      }
    }
  }
}

@media screen and(max-width: 600px) {
  .cart-tile {
    margin: 5px 0px;

    &__wrapper-info {
      width: 20%;
      justify-content: start;
      margin: 12px 0 0 0;
    }

    &__wrapper {
      margin: 12px 8px 12px 0;
      &__delete-button {
        margin-left: 33px;
      }
    }
  }
}
</style>
