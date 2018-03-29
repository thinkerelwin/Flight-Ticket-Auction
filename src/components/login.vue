<template>
  <div class="container loginForm">
    <form>
      <fieldset>
        <legend>用户登录</legend>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
        </div>
      </fieldset>
      <button class="btn btn-primary btn-block">登录</button>
    </form>
  </div>
</template>

<script>
// $('#startDate').datepicker();
export default {
  data () {
    return {

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
</style>
