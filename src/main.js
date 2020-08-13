import Vue from 'vue'
import Vuex from 'vuex'
// son para la autentificación
import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase.js'

import VueFirestore from 'vue-firestore';
import App from './App.vue'
import router from '@/router';

Vue.config.productionTip = false

// Acá se activan las librerías
Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    // mutación para cambiar el 'user'
    set_user(state, new_user) {
      state.user = new_user;
    },
    // mutación para cambiar el error
    set_error(state, new_error) {
      state.error = new_error;
    }
  },
  actions: {
    login(context, datos) {
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(response => {
        context.commit('set_user', {email: datos.email, name: response.user.displayName});
        context.commit('set_error', null)
        router.push('/')
      })
      .catch(function (error) {
        console.log(error);
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });

    },
    register(context, datos) {
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      // en el caso de que el registro sea exitoso
      .then(function (response) {
        console.log(response);
        // si el registro es exitoso, entonces le agrego el nombre
        firebase.auth().currentUser.updateProfile({
          displayName: datos.name
        })
      })
      .then((response) => {
        // guardamos nuestros datos en el almacén
        console.log(response)
        context.commit('set_error', null);
        context.commit('set_user', {email: datos.email, name: datos.name});
        router.push('/');
      })
      // en el caso de que ocurra un error
      .catch(function (error) {
        console.log(error);
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });
    },
    logout(context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('set_error', null);
        context.commit('set_user', null);
        router.push('/login');
      })
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

