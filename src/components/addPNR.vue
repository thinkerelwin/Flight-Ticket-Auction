<template>
    <!-- Modal -->
    <div class="modal fade" id="PNRmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add PNR</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                  <label for="flightRoute" class="col-form-label">PNR航段信息:</label>
                  <textarea type="textarea" class="form-control" id="flightRoute" v-model="flightMsg" rows="4"></textarea>
              </div>
              <div class="form-group row">
                <div class="col-6">
                  <label for="price" class="col-form-label">总价:</label>
                  <input type="text" class="form-control" id="price" v-model="price">
                </div>
                <div class="col-6">
                  <label for="dead-line" class="col-form-label">最晚出票时间:</label>
                  <input type="text" class="form-control" id="dead-line" v-model="deadline" placeholder="ex: 2018-03-27">
                </div>
              </div>
              <div class="form-group">
                <label for="passengers" class="col-form-label">乘机人:</label>
                <input type="text" class="form-control" id="passengers" v-model="passenger" placeholder="多个 '|' 隔开">
              </div>
              <div class="form-group">
                <label for="extra" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="extra" v-model="comment">
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="emergency" v-model="isRush">
                <label class="form-check-label" for="emergency">
                  加急票
                </label>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">清空PNR</button>
            <button type="button" class="btn btn-primary" @click="submitForm" data-dismiss="modal">提交</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// $('#startDate').datepicker();
import axios from 'axios'

export default {
  data () {
    return {
      flightMsg: '',
      price: '',
      comment: '',
      passenger: '',
      deadline: '',
      isRush: false,
      recordOperator: '1' // should be take in automatically
    }
  },
  methods: {
    submitForm () {
      const formData = {

        flightMsg: this.flightMsg,
        price: this.price,
        comment: this.comment,
        passenger: this.passenger,
        deadline: this.deadline,
        isRush: this.isRush,
        recordOperator: this.recordOperator // should get recordOperator automatically
      }
      console.log(formData);
      axios.post('api/webuy', formData)
        .then(res => {
          console.log(res);

          this.flightMsg = '';
          this.price = '';
          this.comment = '';
          this.passenger = '';
          this.deadline = '';
          this.isRush = false
        })
        .catch(error => console.log(error))

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-footer {
    border-top-width: 0;
  }
</style>
