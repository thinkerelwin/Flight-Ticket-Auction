<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/farener-logo.png" alt="farener logo">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!-- <router-link class="nav-link" to="/new"> -->
            <template v-if="isFarener">
              <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#PNRmodal">
                Add PNR
              </button><span class="sr-only">(New)</span>
            </template>
            <!-- </router-link> -->
          </li>
        </ul>

        <template v-if="isSignIn">
          <span class="navbar-text">
            welcome, {{ username }}
          </span>
          <form class="form-inline my-2 my-lg-0">
              <span @click="leave()"><i class="fas fa-sign-in-alt"></i></span>
          </form>
        </template>

      </div>
    </nav>
    <template v-if="isFarener">
      <addPNR></addPNR>
    </template>
  </div>
</template>

<script>
import addPNR from './addPNR.vue'

export default {
  data () {
    return {
      // username: 'Jason'
    }
  },
  computed: {
    isFarener() {
      return this.$store.getters.authType == 'farener'
    },
    isSignIn() {
      return this.$store.getters.idToken !== null
    },
    username() {
      return this.$store.getters.username
    }
  },
  components: {
    'addPNR': addPNR
  },
  methods: {
    leave() {
      this.$store.dispatch('signOut')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-outer {
    /* background: lightblue url("../assets/header.jpg") no-repeat fixed center; */
  }
  img {
    height: 2em;
  }
  span {
    padding-right: 0.5em;
  }
  .fa-sign-in-alt {
    font-size: 1.8em;
    /* color: grey; */
  }
  .nav-item {
    font-size: 1.3em;
  }
  .nav-item svg {
    margin-right: 0.35em;
    /* font-size: 1.2em; */
  }
  nav {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 2em;
  }
  svg {
    cursor: pointer;
  }
</style>
