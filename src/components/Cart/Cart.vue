<template>
  <div>
    <div class="cart">
      <div
        :class="cartOpen ? `cart__overlay` : ` cart__overlay--none`"
        @click="closeCart"
      ></div>
      <div
        :class="!cartOpen ? `cart__wrapper-cart` : `cart__wrapper-cart--open`"
      >
        <div class="cart__wrapper-cart__header">
          <h2 class="cart__wrapper-cart__header__title">TON PANIER</h2>
          <span
            class="cart__wrapper-cart__header__crossIcon-cart"
            @click="closeCart"
            >x</span
          >
        </div>
        <div class="cart__wrapper-cart__wrapper-cart-tile">
          <CartMessage />

          <CartTile
            v-for="productInCart in cartProducts.cart_products"
            :key="productInCart.id"
            :productInCart="productInCart"
          />
        </div>

        <div class="cart__wrapper-cart__wrapper-footer">
          <div class="cart__wrapper-cart__wrapper-footer__total">
            <p>Total</p>
            <span v-if="cartProducts.total_price > 0"
              >{{ cartProducts.total_price }}€</span
            >
          </div>

          <div class="cart__wrapper-cart__wrapper-footer__wrapper-checkout">
            <span>Proceder au paiement</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartTile from "@/components/Cart/CartTile/CartTile.vue";
import CartMessage from "@/components/Cart/CartTile/CartMessage/CartMessage.vue";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default {
  created() {
    console.log("this.cartprocudctICIPLS : ", this.cartProducts.cart_products);
  },
  methods: {
    closeCart() {
      this.$store.dispatch("Cart/toggleCart", false);
    },
  },
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
    cartOpen() {
      return this.$store.getters["Cart/isOpen"];
    },

    cartProducts() {
      return this.$store.getters["Cart/cartProducts"];
    },
  },
  components: {
    CartTile,
    CartMessage,
  },
};
</script>

<style lang="scss">
.cart {
  &__overlay {
    height: 100vh;
    width: 100%;
    left: 0;
    position: fixed;
    z-index: 23;
    cursor: crosshair;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all ease 700ms;

    &--none {
      height: 100vh;
      width: 100%;

      position: fixed;
      z-index: 23;
      cursor: crosshair;
      background-color: rgba(0, 0, 0, 0.7);
      transition: all ease 700ms;
      left: -100%;
    }
  }

  &__wrapper-cart {
    height: 100vh;
    width: 720px;
    position: fixed;
    background-color: white;
    z-index: 23;
    right: -1024px;
    opacity: 100 !important;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all ease 700ms;

    &--open {
      right: 0;
      height: 100vh;
      width: 720px;
      position: fixed;
      background-color: white;
      z-index: 23;

      opacity: 100 !important;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all ease 700ms;
    }

    &__header {
      margin: 33px 33px 34px 51px;
      display: flex;
      justify-content: space-between;

      &__title {
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
      }

      &__crossIcon-cart {
        cursor: pointer;
        font-size: 30px;
      }
    }

    &__wrapper-cart-tile {
      overflow: overlay;
      padding: 40px;

      &__message {
        font-size: 19px;
      }

      &__wrapper-cart-empty {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__button {
          cursor: pointer;
          border: none;
          height: 52px;
          width: 232px;
          margin-top: 20px;
          background-color: #c39885;
          transition-timing-function: cubic-bezier(0.2, 3, 0.4, 1);
          &:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
    &__wrapper-footer {
      margin: 0 50px 50px 50px;

      &__total {
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        margin: 20px 0;
      }

      &__wrapper-checkout {
        background-color: #c39885;
        height: 40px;
        width: 97%;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        padding: 10px;
        cursor: pointer;
        transition-timing-function: cubic-bezier(0.2, 3, 0.4, 1);
        &:hover {
          transform: scale(1.1, 1.1);
        }
        &__arrow {
          margin-right: 32px;
          font-size: 36px;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .cart__wrapper-cart {
    width: 100%;
  }
  .cart__wrapper-cart__wrapper-footer__wrapper-checkout__arrow {
    margin: 0;
    font-size: 25px;
  }
}
</style>
