<template>
  <div class="row">
    <div class="col m10 push-m1 s12">
      <form @submit.prevent="add_question" class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Añada nueva pregunta:</span>
          <div class="input-field">
            <textarea id="textarea1" class="materialize-textarea" v-model="question" minlength="10" required></textarea>
            <label for="textarea1">Pregunta</label>
          </div>
          <div class="input-field">
            <input type="text" class="validate" required minlength="5" v-model="correct">
            <label for="email">Pregunta Correcta</label>
          </div>
          <div class="input-field">
            <input type="text" class="validate" required minlength="5" v-model="fake1">
            <label for="email">Pregunta Falsa 1</label>
          </div>
          <div class="input-field">
            <input type="text" class="validate" required minlength="5" v-model="fake2">
            <label for="email">Pregunta Falsa 2</label>
          </div>
          <div class="input-field">
            <input type="text" class="validate" required minlength="5" v-model="fake3">
            <label for="email">Pregunta Falsa 3</label>
          </div>
        </div>
        <div class="card-action">
          <input type="submit" value="Añadir pregunta" class="btn submit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'; 
import { db } from '@/firebase';
import M from 'materialize-css'

export default {
  name: 'Question',
  data() {
    return {
      question: '',
      correct: '',
      fake1: '',
      fake2: '',
      fake3: ''
    }
  },
  methods: {
    add_question() {
      let answers = [
        {text: this.correct, isCorrect: true},
        {text: this.fake1, isCorrect: false},
        {text: this.fake2, isCorrect: false},
        {text: this.fake3, isCorrect: false}
      ]
      answers = answers.sort(() => {return 0.5 - Math.random()})
      db.collection('questions').add({
        text: this.question,
        answers: answers
      })
      .then(() => {
        M.toast({html: 'Agregada nueva pregunta'})
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.submit {
  background-color: rgba(0,0,0,0);
  box-shadow: none;
  color: #D0AA11;
}
</style>
