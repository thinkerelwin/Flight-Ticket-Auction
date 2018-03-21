<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <router-link class="navbar-brand" to="/">
      <img src="../assets/farener-logo.png" alt="farener logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item active">
          <router-link class="nav-link" to="/"><i class="far fa-clipboard" alt="list"></i>Order List <span class="sr-only">(List)</span></router-link>
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link" to="/new"><i class="far fa-plus-square" alt="list"></i>Add PNR <span class="sr-only">(New)</span></router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link to="/">
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </form>
    </div>
  </nav>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-outer {
    /* background: lightblue url("../assets/header.jpg") no-repeat fixed center; */
  }
  img {
    height: 2em;
  }
  .fa-sign-in-alt {
    font-size: 1.8em;
    color: gold;
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
  }
</style>
