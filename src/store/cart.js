import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    cartProducts: {},
    isOpen: false,
  },
  mutations: {
    TOGGLE_CART(state, isOpen) {
      state.isOpen = isOpen;
    },
    ADD_PRODUCT(state, products) {
      state.cartProducts = products;
    },
    GET_CART(state, payload) {
      state.cartProducts = payload;
    },
    DELETE_PRODUCT(state, payload) {
      state.cartProducts = payload;
    },
  },
  actions: {
    toggleCart({ commit }, isOpen) {
      commit("TOGGLE_CART", isOpen);
    },

    addProduct({ commit }, product) {
      axios
        .post("http://api.glambychay.com/api/cart/addProduct", null, {
          params: {
            productId: product.id,
            quantity: product.quantity,
          },
          headers: {
            Authorization: "Bearer " + product.token,
          },
        })
        .then((response) => {
          console.log("responsadata : ", response.data);
          commit("ADD_PRODUCT", response.data);
        });
    },
    removeProduct({ commit }, product) {
      axios
        .post("http://api.glambychay.com/api/cart/removeProduct", null, {
          params: {
            productId: product.id,
            quantity: product.quantity,
          },
          headers: {
            Authorization: "Bearer " + product.token,
          },
        })
        .then((response) => {
          commit("DELETE_PRODUCT", response.data);
        });
    },

    getCart({ commit }, token) {
      axios
        .get("http://api.glambychay.com/api/cart/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          commit("GET_CART", response.data);
        });
    },
  },
  getters: {
    cartProducts(state) {
      return state.cartProducts;
    },
    isOpen(state) {
      return state.isOpen;
    },
  },
};
