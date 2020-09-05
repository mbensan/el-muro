<template>
  <div class="row">
    <div class="col m10 push-m1 s12">
      <p>
        <router-link to="/question" class="left waves-effect waves-light btn-large">Añadir Pregunta</router-link>
        <router-link to="/game" class="cyan darken-2 right waves-effect waves-light btn-large">JUGAR!</router-link>
      </p>
      <table class="white">
        <thead>
          <tr>
              <th>Usuario</th>
              <th>Puntos</th>
              <th>POrcentaje</th>
              <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="play in plays" :key="play.id">
            <td>{{ play.user }}</td>
            <td>{{ play.score }}/3</td>
            <td>{{ play.percentage }}%</td>
            <td>{{ play.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'; 
import { db } from '@/firebase';


export default {
  name: 'Home',
  firestore() {
    return {
      plays: db.collection('plays')
    }
  },
}
</script>

<style>
.form-post {
  background-color: aquamarine;
  padding: 2rem;
  border-radius: 15px;
}
.likes {
  font-size: 2rem;
  color: darkslateblue;
}
table.white {
  margin-top: 6rem;
}
</style>
