<template>
  <div class="bottom-space">
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/Farener-logo.png" alt="farener logo">
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
            welcome, {{ username }}, Orders availabe to you from:
            <template v-for="flight in flightsAvailable">
              {{ flight }}
            </template>
          </span>
          <form v-if="isFarener" class="form-inline my-2 my-lg-0">
            <router-link class="nav-link" to="/showGroup">
              <i class="fas fa-users"></i>
            </router-link>
          </form>
          <form v-if="isFarener" class="form-inline my-2 my-lg-0">
            <router-link class="nav-link" to="/showUser">
              <i class="fas fa-user"></i>
            </router-link>
          </form>
          <form class="form-inline my-2 my-lg-0">
            <a class="nav-link" @click="leave()"><i class="fas fa-sign-in-alt"></i></a>
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
// import addUser from './addUser.vue'

export default {
  data () {
    return {

    }
  },
  computed: {
    isFarener () {
      return this.$store.getters.authType === 'farener'
    },
    isSignIn () {
      return this.$store.getters.idToken !== null
    },
    username () {
      return this.$store.getters.username
    },
    flightsAvailable () {
      return this.$store.getters.flightsAvailable
    }
  },
  components: {
    'addPNR': addPNR
    // 'addUser': addUser
  },
  methods: {
    leave () {
      this.$store.dispatch('signOut')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    height: 2em;
  }
  span {
    padding-right: 0.5em;
  }
  .fa-sign-in-alt {
    font-size: 1.8em;
    color: #007bff;
  }
  .fa-user,
  .fa-users {
    font-size: 1.5em;
  }
  .nav-item {
    font-size: 1.3em;
  }
  .nav-item svg {
    margin-right: 0.35em;
  }
  nav {
    padding-top: 0;
    padding-bottom: 0;
    /* margin-bottom: 2em; */
  }
  svg {
    cursor: pointer;
  }
  .bottom-space {
    margin-bottom: 2em;
  }

</style>
