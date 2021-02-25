<template>
  <v-content>
    <v-dialog
      v-model="isOpen"
      @click:outside="closeModal"
      :content-class="!isSignUp ? 'wrapper-modal' : 'wrapper-modal-sign-up'"
      width="400px"
    >
      <FormLogin v-if="!isSignUp" :isSignUp="isSignUp" />
      <SignUp v-if="isSignUp" :isSignUp="isSignUp" />
    </v-dialog>
  </v-content>
</template>

<script>
import FormLogin from "@/components/Modal/FormLogin/FormLogin.vue";
import SignUp from "@/components/Modal/SignUp/SignUp.vue";

export default {
  computed: {
    isSignUp() {
      return this.$store.getters.isSignUp;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("toggleModal", false);
    },
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    FormLogin,
    SignUp,
  },
};
</script>

<style lang="scss">
.wrapper-modal-sign-up {
  background-color: white;
  height: 611px;
}
.wrapper-modal {
  background-color: white;
  height: 550px;
  &__cross-icon {
    right: -1135px;
    top: 221px;
    cursor: pointer;
    position: absolute;
  }
  &__cross-icon-sign-up {
    top: 168px;
    cursor: pointer;
    position: absolute;
  }
}
</style>
