<template>
  <div class="header">
    <Modal v-if="isOpen" :isOpen="isOpen" />
    <Cart />

    <div class="header__top-bar">
      <span>Livraison gratuite à partir de 50€</span>
    </div>
    <div class="header__menu">
      <p v-if="!token" class="header__menu__button" @click="openModal">
        Connexion
      </p>
      <p v-else @click="logOut" class="header__menu__button">
        Deconnexion
      </p>

      <router-link to="/">Glam By Chay </router-link>
      <span @click="openCart" class="header__menu__button">Mon panier</span>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import Cart from "@/components/Cart/Cart.vue";

export default {
  components: {
    Modal,
    Cart,
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    openModal() {
      this.$store.dispatch("toggleModal", true);
    },
    openCart() {
      return this.$store.dispatch("Cart/toggleCart", true);
    },
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isOpen() {
      return this.$store.getters.toggleModal;
    },
    cartIsOpen() {
      return this.$store.getters["Cart/isOpen"];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  &__top-bar {
    background-color: #c39885;
    color: black;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 90%;
    margin: auto;
    letter-spacing: 1.4px;
    border-bottom: 1px solid #c39885;

    &__button {
      cursor: pointer;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 18px;
      color: black;
    }

    @media screen and(max-width: 426px) {
      &__button {
        font-size: 13px;
        margin: 0 10px;
      }
    }

    &__title {
      text-decoration: none;
      color: black;
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 0.4px;
      font-family: YEEZY TSTAR, -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Helvetica, Arial, sans-serif;
    }

    @media screen and(max-width: 420px) {
      &__title {
        font-size: 18px;
      }
    }
  }
  @media screen and (max-width: 426px) {
    &__menu {
      width: 100%;
    }
  }
}
</style>
