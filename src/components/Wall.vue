<template>
  <div class="row">
    <div class="col m12 s12">
      <h3>El Muro</h3>
      <form @submit.prevent="add_image" class="form-post">
        <div class="input-field">
          <textarea required id="textarea1" v-model="post_text" class="materialize-textarea"></textarea>
          <label for="textarea1">Contenido</label>
        </div>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" @change="get_image">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>
        <div class="input-field">
          <input type="submit" class="btn">
        </div>
      </form>
      <div class="posts">
        <ul class="collection">
          <li v-for="post in posts" :key="post.id" class="collection-item avatar">
            <img :src="!post.img ? 'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg' : post.img" alt="" class="circle">
            <span class="title">{{ post.text }}</span>
            <p>{{ post.user.name }} <br>
              {{ post.date }}
            </p>
            <span class="secondary-content">
              <a href="#" @click.prevent="like(post.id)" class="secondary-content"><i class="material-icons">favorite</i>
              </a>
              <span class="likes">{{post.likes}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'; 
import { db } from '@/firebase';

const getDate = () => {
  const trailing = (d) => ('0' + d).slice(-2);
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth() + 1)}-${trailing(now.getDate())} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}

export default {
  name: 'Wall',
  data() {
    return {
      post_text: '',
      post_image: null,
      posts: []
    }
  },
  // computed: {
  //   sortedPosts() {
  //     return this.posts.sort(function(a, b){
  //       return a.date.localeCompare(b.date)
  //     });
  //   }
  // },
  methods: {
    get_image(ev) {
      // Si el input no tiene archivo, salgo altiro
      if (ev.target.files.length == 0) {
        return;
      }
      this.post_image = ev.target.files[0];
    },
    add_post(image_url) {
      const user = firebase.auth().currentUser

      this.$firestore.posts.add({
        date: getDate(),
        img: image_url,
        text: this.post_text,
        user: {
          name: user.displayName,
          uid: user.uid
        },
        likes: 0
      });
    },
    add_image() {
      // si el usuario no subió una imagen, llamo altiro a add_post
      if (this.post_image == null) {
        this.add_post(null);
        return;
      }
      // caso de que si exista imagen
      const storageRef = firebase.storage().ref(this.post_image.name).put(this.post_image);
      storageRef.on('state_changed',
        function() {
          // cuando el estado cambie
        },
        function(upload_error) {
          // cuando ocurra un error
          console.log(upload_error)
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL()
          .then(url => {
            this.add_post(url)
          })
        }
      )
    },
    like(post_id){
      // Primer paso, recupero el post anterior por su id
      const post = this.posts.find(post => post.id == post_id);
      // actualizo en la base de datos
      this.$firestore.posts.doc(post_id).update({
        likes: post.likes++
      });
    }
  },
  firestore() {
    return {
      posts: db.collection('posts')
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
