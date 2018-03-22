<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">PNR 航段讯息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-6">
                  <label for="price" class="col-form-label">票面价:</label>
                  <input type="text" class="form-control" id="price">
                </div>
                <div class="col-6">
                  <label for="tax" class="col-form-label">税费:</label>
                  <input type="text" class="form-control" id="tax">
                </div>
              </div>
              <div class="form-group">
                <label for="passenger" class="col-form-label">乘机人:</label>
                <input type="text" class="form-control" id="passenger">
              </div>
              <div class="form-group row">
                <div class="col-6">
                  <label for="position" class="col-form-label">拉位点:</label>
                  <input type="text" class="form-control" id="position">
                </div>
                <div class="col-6">
                  <label for="deadline" class="col-form-label">最晚出票时间:</label>
                  <input type="text" class="form-control" id="deadline">
                </div>
              </div>
              <div class="form-group">
                <label for="extra" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="extra">
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                  加急票
                </label>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">清空PNR</button>
            <button type="button" class="btn btn-primary">提交</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// $('#startDate').datepicker();
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
