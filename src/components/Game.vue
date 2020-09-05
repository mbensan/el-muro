<template>
  <div class="row">
    <form class="col m10 push-m1 s12" @submit.prevent="play">
      <h4>Juega a las Trivias</h4>
      <div v-for="(question, i) in selected_questions" :key="question.id" class="card-panel teal white-text">
        <p><b>{{ question.text }}</b></p>
        <div>
          <label v-for="(answer, j) in question.answers" :key="j">
            <input v-model="form.answers[i]" class="with-gap" :name="'question' + i" type="radio" :value="answer.isCorrect ? 'OK' : 'NO'" />
            <span class="white-text">{{ answer.text }}</span>
          </label>
        </div>
      </div>
      <p><input type="submit" value="JUGAR!" class="waves-effect waves-light btn-large"></p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'; 
import { db } from '@/firebase';
import M from 'materialize-css';

const getDate = () => {
  const trailing = (d) => d < 10 ? '0'+d : d;
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth())}-${trailing(now.getDate())} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}

export default {
  name: 'Question',
  data() {
    return {
      form: {
        answers: []
      }
    }
  },
  firestore() {
    return {
      // 1. me traigo las preguntas guardadas en firestore
      questions: db.collection('questions')
    }
  },
  computed: {
    selected_questions() {
      // saco una copia de las preguntas en firestore
      let questions = [...this.questions]
      // las mezclo al azar
      questions = questions.sort(() => {return 0.5 - Math.random()})
      // retorno las primeras 3
      return questions.slice(0, 3);
    }
  },
  methods: {
    play() {
      const score = this.form.answers.filter(answer => answer == 'OK').length
      const percentage = Math.round(score * 100 / 3);

      db.collection('plays').add({
        user: firebase.auth().currentUser.displayName,
        score,
        percentage,
        date: getDate()
      })
      .then(() => {
        M.toast({html: 'Gracias por jugar'})
        this.$router.push('/')
      })
    }
  }
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
</style>
