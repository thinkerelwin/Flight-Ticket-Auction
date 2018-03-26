<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add PNR</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-6">
                  <label for="price" class="col-form-label">总价:</label>
                  <input type="text" class="form-control" id="price" v-model="price">
                </div>
                <div class="col-6">
                  <label for="flightRoute" class="col-form-label">PNR航段信息:</label>
                  <input type="text" class="form-control" id="flightRoute" v-model="flightMsg">
                </div>
              </div>
              <div class="form-group">
                <label for="passengers" class="col-form-label">乘机人:</label>
                <input type="text" class="form-control" id="passengers" v-model="passenger">
              </div>
              <div class="form-group">
                <label for="extra" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="extra" v-model="comment">
              </div>
              <div class="form-group row">
                <div class="col-6">
                  <label for="dead-line" class="col-form-label">最晚出票时间:</label>
                  <input type="text" class="form-control" id="dead-line" v-model="deadline">
                </div>

              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="emergency" v-model="isRush">
                <label class="form-check-label" for="emergency">
                  加急票
                </label>
                <p>{{deadline}}</p>
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
      flightMsg: [],
      price: null,
      comment: '',
      passenger: [],
      deadline: '',
      isRush: false,
      recordOperator: ''
    }
  },
  methods: {
    submitForm () {
      const formData = {
        // referenceNumber: '1',
        // operator: 'elwin',
        // negotiablePrice: '',
        // createdTime: new Date(),
        // history: []
        flightMsg: [],
        price: this.price,
        comment: this.comment,
        passenger: this.passenger,
        deadline: this.deadline,
        isRush: this.isRush,
        recordOperator: this.recordOperator // should get recordOperator automatically
      }
      console.log(formData);
      axios.post('', formData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
