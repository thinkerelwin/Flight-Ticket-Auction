<template>
  <div class="container loginForm">
    <!-- <form class="" action="" method="get"> -->
      <fieldset>
        <legend>用户登录</legend>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-user"></i></span>
          </div>
          <input type="text" class="form-control" v-model="username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" v-model="password" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
        </div>
      </fieldset>
      <router-link to="/"><button class="btn btn-primary btn-block" @click="onSubmit()">登录</button></router-link>
      <p>{{warningMessage}}</p>
      <!-- <p>{{ eventBus.name }}</p> -->
    <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios'
// import { eventBus } from '../App.vue'

export default {
  data () {
    return {
      username: '',
      password: '',
      // userdata: {},
      // token: '',
      warningMessage: '',
    }
  },
  methods: {
    onSubmit() {
      axios.post('login', {
        name: this.username,
        password: this.password,
      }).then(res => {
          console.log("login respond: " + res);
          // this.$emit('passingAuthInfo', res)
          this.$store.dispatch('login', {username: this.username, password: this.password})

          this.username = '';
          this.password = '';
        })
        .catch(error => {
          console.log(error)
          this.warningMessage = "name and password aren't matched, please try again!"
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  legend {
    text-align: center;
  }
  .loginForm {
  min-width: 250px;
  width: 30%;
  margin: 3% auto;
  }

  fieldset .input-group {
  margin-bottom: 2rem;
  }
  p {
    color: red;
    font-weight: bold;
    margin-top: 10%;
  }
</style>
