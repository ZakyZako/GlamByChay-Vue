<template>
  <div>
    <div class="title-form-connection">
      <h2>CONNEXION</h2>
    </div>
    <v-form @submit.prevent="handleLogin" class="form-login">
      <div class="form-login__wrapper">
        <p class="form-login__wrapper__success-message">
          {{ connectionSucessMessage }}
        </p>
        <p class="form-login__wrapper__error-message">
          {{ errorMessage }}
        </p>

        <label class="form-login__wrapper__title-input">Adresse email</label>
        <v-text-field
          v-model="informationUser.email"
          class="form-login__wrapper__input"
          type="email"
          :rules="emailRules"
        />
      </div>

      <div class="form-login__wrapper">
        <label class="form-login__wrapper__title-input">Password</label>
        <v-text-field
          type="password"
          class="form-login__wrapper__input"
          v-model="informationUser.password"
        />
      </div>

      <button class="form-login__btn-connect" type="submit">
        Se connecter
      </button>
    </v-form>
    <div class="wrapper-footer">
      <label>Restez connecté </label>
      <v-checkbox
        v-model="informationUser.isCheck"
        class="wrapper-footer__wrapper-checkbox__checkbox"
      />
      <div>
        <span class="wrapper-footer__text">
          Vous n'avez pas de compte ?
        </span>
        <span @click="goToSignUp" class="wrapper-footer__signup">
          Créer un compte
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginRules: [(v) => !!v || "The input is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Votre e-mail doit être valide",
      ],
      informationUser: {
        email: "",
        password: "",
        isCheck: false,
      },
    };
  },
  computed: {
    connectionSucessMessage() {
      return this.$store.getters.sucessMessage;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
  methods: {
    goToSignUp() {
      this.$store.dispatch("isSignUp", true);
    },
    handleLogin() {
      this.$store.dispatch("connection", this.informationUser);
      this.resetInput();
    },
    resetInput() {
      this.informationUser = {};
    },
  },
};
</script>

<style lang="scss">
.title-form-connection {
  border-bottom: 1px solid #a77e6c;
  text-align: center;
  margin: 25px 0;
  padding-bottom: 10px;
  font-size: 22px;
  font-family: "Oswald", sans-serif;
  padding-bottom: 5px;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    width: 90%;

    &__error-message {
      color: red;
    }

    &__success-message {
      margin-bottom: 5px;
      color: green;
    }
    &__error-message {
      margin-bottom: 5px;
      color: red;
    }
  }

  &__btn-connect {
    background-color: #66a281;
    color: #fff3ed;
    width: 50%;
    text-align: center;
    height: 36px;
    border: none;
    font-size: 15px;
    margin: auto;
    cursor: pointer;
    font-family: "Oswald", sans-serif;
    border-radius: 9px;
  }
}

.wrapper-footer {
  border-top: 1px solid #a77e6c;
  margin: 30px 15px;

  &__text {
    font-size: 15px;
    font-family: "Oswald, sans serif";
    height: 30px;
    margin-right: 12px;
    margin-top: 112x;
  }

  &__signup {
    font-family: "Oswald, sans serif";
    cursor: pointer;
    height: 30px;
    text-decoration: underline;
  }
}
.text-field {
  color: black !important;
  bottom: 7px;
}
</style>
