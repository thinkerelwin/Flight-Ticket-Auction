<template>
  <div class="container">
    <!-- <div class="row"> -->
      <h1>PNR 航段讯息</h1>
      <form>
        <div class="form-row align-items-center">
          <div class="col-sm-3 my-1">
            <input type="date" class="form-control" placeholder="开始日期" v-model="startDate" @click="pickdate()" id="startDate">
            <label class="form-check-label" for="startDate">开始日期</label>
          </div>
          <div class="col-sm-3 my-1">
            <input type="date" class="form-control" placeholder="结束日期" v-model="endDate">
          </div>
          <div class="col-auto my-1">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
              <label class="form-check-label" for="autoSizingCheck2">
                Remember me
              </label>
            </div>
          </div>
          <div class="col-auto my-1">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
