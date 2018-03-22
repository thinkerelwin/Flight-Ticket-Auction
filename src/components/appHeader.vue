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
              <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter">
                Add PNR
              </button><span class="sr-only">(New)</span>
            <!-- </router-link> -->
          </li>
        </ul>
        <span class="navbar-text">
          welcome {{ username }}
        </span>
        <form class="form-inline my-2 my-lg-0">
          <router-link to="/">
            <i class="fas fa-sign-in-alt"></i>
          </router-link>
        </form>
      </div>
    </nav>

    <addPNR></addPNR>

  </div>
</template>

<script>
  import addPNR from './addPNR.vue'

  export default {
    data() {
      return {
        username: 'Jason'
      }
    },
    components: {
      'addPNR': addPNR
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
</style>
