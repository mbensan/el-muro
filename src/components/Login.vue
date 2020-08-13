<template>
  <div class="row">
    <div class="col m12 s12" id="error-message" v-if="error">
      <div class="card-panel red">{{ error }}</div>
    </div>
    <div class="col m6 s6">
      <h5>Registrese</h5>
      <form action="" @submit.prevent="register">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" class="validate" required v-model="register_name">
            <label for="name">Nombre</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="email" class="validate" required v-model="register_email">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="password" class="validate" required v-model="register_password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="password" id="repeat" class="validate" required v-model="register_password_again">
            <label for="password">Repita Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="submit" class="btn" />
          </div>
        </div>
      </form>
    </div>
    <div class="col m6 s6">
      <h5>Ingrese con su usuario y contraseña</h5>
      <form action="" @submit.prevent="login">
        <div class="row">
          <div class="input-field col s12">
            <input type="email" class="validate" required v-model="login_email">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="password" class="validate" required v-model="login_password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="submit" class="btn" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // variables para el login
      login_email: '',
      login_password: '',
      // variables para el registro
      register_email: '',
      register_password: '',
      register_password_again: '',
      register_name: ''
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    login() {
      const datos = {
        email: this.login_email,
        password: this.login_password,
      };
      this.$store.dispatch('login', datos)
    },
    register() {
      // verificar que ambas contraseñas sean iguales
      const repeat = document.getElementById('repeat');
      repeat.setCustomValidity('');

      if (this.register_password != this.register_password_again) {
        repeat.setCustomValidity('Ambas contraseñas deben coincidir');
        return;
      }
      // ahora podemos registrar al usuario, llamando a la acción correspondiente
      const datos = {
        email: this.register_email,
        password: this.register_password,
        name: this.register_name
      };
      this.$store.dispatch('register', datos)
    }
  }
}
</script>

<style scoped>
#error-message {
  font-size: 1.7rem;
  font-weight: bold;
}
</style>