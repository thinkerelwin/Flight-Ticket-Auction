<template>
  <div class="container loginForm">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>公司注册</legend>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-user"></i></span>
          </div>
          <input type="text" class="form-control" v-model="username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" v-model="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-building"></i></span>
          </div>
          <input type="text" class="form-control" v-model="cooperation" placeholder="company name" aria-label="company name" aria-describedby="basic-addon1">

        </div>
        <!-- <div class="form-row">

        </div> -->
        <div class="form-check form-check-inline">
          <i class="fas fa-plane"></i>
          <input class="form-check-input" type="checkbox" id="airline1" value="AA" v-model="flight">
          <label class="form-check-label" for="airline1">AA</label>
          <input class="form-check-input" type="checkbox" id="airline2" value="DL" v-model="flight">
          <label class="form-check-label" for="airline2">DL</label>
          <input class="form-check-input" type="checkbox" id="airline3" value="UA" v-model="flight">
          <label class="form-check-label" for="airline3">UA</label>
          <input class="form-check-input" type="checkbox" id="airline4" value="CA" v-model="flight">
          <label class="form-check-label" for="airline4">CA</label>
        </div>
        <div class="form-check form-check-inline">
          <!-- <i class="fas fa-plane"></i> -->
          <input class="form-check-input" type="checkbox" id="airline5" value="MU" v-model="flight">
          <label class="form-check-label margin-left" for="airline5">MU</label>
          <input class="form-check-input" type="checkbox" id="airline6" value="CX" v-model="flight">
          <label class="form-check-label" for="airline6">CX</label>
          <input class="form-check-input" type="checkbox" id="airline7" value="OTHER" v-model="flight">
          <label class="form-check-label" for="airline7">OTHER</label>
        </div>
      </fieldset>
      <button class="btn btn-primary btn-block">注册</button>
      <p>{{warningMessage}}</p>
      <!-- <p>{{this.flight}}</p> -->
      <!-- <p>{{ eventBus.name }}</p> -->
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      flight:[],
      cooperation: '',
    }
  },
  computed: {
    warningMessage() {
      return this.$store.getters.warningMessage
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('signup', {
        username: this.username,
        password: this.password,
        auth: 'agent',
        flight: this.flight,
        cooperation: this.cooperation
      })

      this.username = '';
      this.password = '';
      // axios.post('login', {
      //   name: this.username,
      //   password: this.password,
      // }).then(res => {
      //     console.log("login respond: " + res);
      //     // this.$emit('passingAuthInfo', res)
      //     this.$store.dispatch('login', {username: this.username, password: this.password})
      //

      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.warningMessage = "name and password aren't matched, please try again!"
      //   })
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
  .form-check-inline label {
    margin-right: 0.6rem;
  }
  .form-check-inline svg {
    margin-right: 0.8rem;
  }
  #airline5 {
    margin-left: 30.8px;
  }
  button {
    margin-top: 1rem;
  }
</style>
