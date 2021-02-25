import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Cart from "../store/cart.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productPage: {},
    userDataFromToken: {},
    toggleModal: false,
    isSignUp: false,
    errorMessage: null,
    sucessMessage: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_ONE_PRODUCT(state, product) {
      state.productPage = product;
    },
    FETCH_DATA_FROM_CONNECTION(state, payload) {
      state.userDataFromToken = payload;
    },
    TOGGLE_MODAL(state, isOpen) {
      state.toggleModal = isOpen;
    },
    IS_SIGN_UP(state, isSignUp) {
      state.isSignUp = isSignUp;
    },
    SUCESS_MESSAGE(state, payload) {
      state.sucessMessage = payload;
    },
    ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload;
    },
    LOG_OUT(state) {
      state.userDataFromToken = {};
    },
  },
  actions: {
    getProducts({ commit }) {
      axios.get("http://api.glambychay.com/api/products").then((response) => {
        commit("SET_PRODUCTS", response.data);
      });
    },

    getOneProduct({ commit }, id) {
      axios
        .get(`http://api.glambychay.com/api/product/${id}`)
        .then((response) => {
          commit("SET_ONE_PRODUCT", response.data);
        });
    },

    connection({ dispatch, commit }, user) {
      axios
        .post("http://api.glambychay.com/api/login", {
          username: user.email,
          password: user.password,
        })
        .then((response) => {
          if (response.data.token) {
            dispatch("toggleModal", false);
            dispatch("errorMessage", null);
          }

          if (user.isCheck) {
            localStorage.setItem("userToken", response.data.token);
          }
          dispatch("fetchUserDataFromConnection", response.data.token);
        })
        .catch((error) => {
          commit("ERROR_MESSAGE", error.response.data.message);
        });
    },

    fetchUserDataFromConnection({ commit, dispatch }, token) {
      axios
        .get("http://api.glambychay.com/api/user/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          commit("FETCH_DATA_FROM_CONNECTION", { ...response.data, token });
          dispatch("Cart/getCart", token, { root: true });
        });
    },

    createUser({ dispatch, commit }, user) {
      axios
        .post("http://api.glambychay.com/api/user/register", {
          email: user.email,
          username: user.username,
          plainPassword: {
            first: user.passwordOne,
            second: user.passwordVerification,
          },
        })
        .then(() => {
          commit("IS_SIGN_UP", false);
          dispatch(
            "sucessMessage",
            "Ton compte a été crée, tu peux te connecter !"
          );
        });
    },

    toggleModal({ commit, dispatch }, isOpen) {
      commit("TOGGLE_MODAL", isOpen);
      commit("IS_SIGN_UP", false);
      dispatch("errorMessage", null);
      dispatch("sucessMessage", null);
    },

    isSignUp({ commit }, toSignUp) {
      commit("IS_SIGN_UP", toSignUp);
      commit("ERROR_MESSAGE", null);
    },
    sucessMessage({ commit }, sucessMessage) {
      commit("SUCESS_MESSAGE", sucessMessage);
    },
    errorMessage({ commit }, errorMessage) {
      commit("ERROR_MESSAGE", errorMessage);
    },

    logOut({ commit }) {
      localStorage.clear();
      commit("Cart/ADD_PRODUCT", { cart_products: [] }, { root: true });
      commit("LOG_OUT");
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    productPage(state) {
      console.log("state : ", state.productPage);
      return state.productPage;
    },
    token(state) {
      return state.userDataFromToken.token;
    },
    toggleModal(state) {
      return state.toggleModal;
    },
    isSignUp(state) {
      return state.isSignUp;
    },
    sucessMessage(state) {
      return state.sucessMessage;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
  },
  modules: {
    Cart,
  },
});
