<template>
  <div>
    <div class="title">
      <h2>Créer un compte</h2>
    </div>
    <v-form class="form" @submit.prevent="createUser">
      <p class="error-message">
        {{ errorMessage }}
        {{ errorMessageVerification }}
      </p>

      <div class="wrapper-title-input">
        <label class="wrapper-title-input__title-input">Username</label>
      </div>
      <v-text-field
        v-model="informationCreateAccount.username"
        class="input"
        type="text"
        :rules="loginRules"
        required
      />

      <div class="wrapper-title-input">
        <label class="wrapper-title-input__title-input">Adresse email</label>
      </div>
      <v-text-field
        v-model="informationCreateAccount.email"
        class="input"
        type="email"
        :rules="emailRules"
        required
      />

      <div class="wrapper-title-input">
        <label class=" wrapper-title-input__title-input">Mot de passe</label>
      </div>
      <v-text-field
        v-model="informationCreateAccount.passwordOne"
        class="input"
        type="password"
        bottom="7px"
        required
      />

      <div class="wrapper-title-input">
        <label class="wrapper-title-input__title-input">
          Confirmer le mot de passe
        </label>
      </div>
      <v-text-field
        v-model="informationCreateAccount.passwordVerification"
        class="input"
        type="password"
        :rules="passwordRules"
        required
      />

      <div class="footer-signup">
        <button class="footer-signup__btn-submit-signup">
          Créer mon Compte Personnel
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginRules: [
        (v) => !!v || "Ce champ est obligatoire",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
        (v) => v.length > 3 || "Ton nom doit être plus grand que 3 caractere",
      ],
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Votre e-mail doit être valide",
        (v) => !!v || "E-mail is required",
      ],
      passwordRules: [
        (v) =>
          v === this.informationCreateAccount.passwordOne ||
          "Les mots de passes ne sont pas identiques",
      ],
      informationCreateAccount: {
        username: "",
        email: "",
        passwordOne: "",
        passwordVerification: "",
      },
      errorMessageVerification: null,
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch("createUser", this.informationCreateAccount);
    },
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 5%;
}

.title {
  border-bottom: 1px solid #a77e6c;
  text-align: center;
  margin: 25px 0;
  padding-bottom: 10px;
  font-size: 22px;
  font-family: "Oswald", sans-serif;
  padding-bottom: 5px;
}

.error-message {
  font-size: 15px;
  margin-bottom: 10px;
  color: red;
}

.wrapper-title-input {
  &__title-input {
    margin-bottom: 12px;
    font-size: 15px;
    font-family: "Oswald", sans-serif;
  }
}

.input {
  width: 90%;
}

.footer-signup {
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__btn-submit-signup {
    background-color: #66a281;
    color: #fff3ed;
    width: 71%;
    text-align: center;
    height: 50px;
    border: none;
    font-size: 16px;
    margin: auto;
    cursor: pointer;
    font-family: "Oswald", sans-serif;
    border-radius: 9px;
  }
}
</style>
