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
                  <input type="text" class="form-control" id="price" v-model="ticketPrice">
                </div>
                <div class="col-6">
                  <label for="tax" class="col-form-label">税费:</label>
                  <input type="text" class="form-control" id="tax" v-model="taxFee">
                </div>
              </div>
              <div class="form-group">
                <label for="passenger" class="col-form-label">乘机人:</label>
                <input type="text" class="form-control" id="passenger" v-model="passengers">
              </div>
              <div class="form-group">
                <label for="extra" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="extra" v-model="remark">
              </div>
              <div class="form-group row">
                <div class="col-6">
                  <label for="deadline" class="col-form-label">最晚出票时间:</label>
                  <input type="text" class="form-control" id="deadline" v-model="deadline">
                </div>
                <div class="col-6">
                  <label for="flightRoute" class="col-form-label">PNR航段信息:</label>
                  <input type="text" class="form-control" id="flightRoute" v-model="PNRroute">
                </div>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="emergency" v-model="timeLimited">
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
      ticketPrice: null,
      taxFee: null,
      passengers: [],
      remark: '',
      deadline: '',
      PNRroute: [],
      timeLimited: false
    }
  },
  methods: {
    submitForm () {
      const formData = {
        referenceNumber: '1',
        operator: 'elwin',
        createdTime: new Date(),
        PNRroute: [],
        ticketPrice: this.ticketPrice,
        taxFee: this.taxFee,
        negotiablePrice: '',
        passengers: this.passengers,
        remark: this.remark,
        deadline: this.deadline,
        timeLimited: this.timeLimited,
        history: []
      }
      console.log(formData);
      axios.post('/PNR.json', formData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
