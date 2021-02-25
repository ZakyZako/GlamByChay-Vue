<template>
  <div class="product">
    <div class="product__wrapper-img">
      <img
        class="product__wrapper-img__img"
        :src="product.img_path"
        alt="img-product"
      />
    </div>
    <div class="product__info">
      <div class="product__info__title">
        <h2>{{ product.name }}</h2>
      </div>
      <div class="product__info__price">
        <span>{{ product.price }} €</span>
      </div>
      <div class="product__info__quantity">
        <span>Quantité </span>
        <div class="product__info__quantity__wrapper-button">
          <span
            class="product__info__quantity__wrapper-button__button"
            @click="decrement"
          >
            -
          </span>
          <span>{{ count }}</span>
          <span
            @click="increment"
            class="product__info__quantity__wrapper-button__button"
          >
            +
          </span>
        </div>
      </div>
      <span @click="addProduct" class="product__info__submit">
        AJOUTER AU PANIER
      </span>

      <span class="product__info__description">Description</span>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
    decrement() {
      if (this.count > 1) {
        this.count -= 1;
      }
    },
    addProduct() {
      this.$store.dispatch("Cart/addProduct", {
        id: this.product.id,
        quantity: this.count,
        token: this.userToken,
      });
      this.$store.dispatch("Cart/toggleCart", true);
    },
  },
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  height: 100vh;
  display: flex;
  width: 100%;
  &__wrapper-img {
    width: 50%;

    &__img {
      width: 100%;
      object-fit: contain;
    }
  }

  &__info {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 100px 0 0 60px;

    &__title {
      margin-top: 5px;
      font-size: 50px;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    &__price {
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    &__quantity {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

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

    &__submit {
      background-color: black;
      transition: all 0.5s;
      transition-timing-function: cubic-bezier(0.2, 3, 0.4, 1);
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      margin: 30px 0;
      cursor: pointer;
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
    &__description {
      margin-bottom: 10px;
      font-weight: bold;
      text-decoration: underline;
      text-align: start;
    }
  }
}

@media screen and(max-width: 1024px) {
  .product {
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    display: flex;
    justify-content: center;

    &__wrapper-img {
      width: 100%;
    }

    &__wrapper-desc {
      margin: 0px 20px 330px 20px;
      width: 100%;
    }

    &__info {
      margin: 0 0 80px 0;
      font-size: 24px;
      width: 80%;
    }
  }
}
</style>
