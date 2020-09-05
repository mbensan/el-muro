<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" v-if="user" class="brand-logo">Bienvenido {{ user.name }}</a>
        <a href="#" v-else class="brand-logo">Mati Trivias</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="user"><a @click.prevent="logout" class="btn" href="#" >Salir</a></li>
        </ul>

      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>
body {
  background-color: #aaa;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.collection-item {
  color: #616161;
  font-weight: bold;
}
.left { float: left }
.right { float: right }
</style>
