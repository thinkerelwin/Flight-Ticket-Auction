<template>
  <div id="app">
    <appHeader></appHeader>
    <!-- <router-view @passingAuthInfo="authdata = $event" :authData="authdata"/> -->
    <router-view/>
  </div>
</template>

<script>
import appHeader from './components/appHeader.vue'

export default {
  name: 'App',
  components: {
    'appHeader': appHeader
  },
  // data() {
  //   return {
  //     authdata: '',
  //     id: null,
  //     name: '',
  //     password: '',
  //     cooperation: '',
  //     auth: '',
  //     token: '',
  //   }
  // }
}

</script>

<style>

</style>
