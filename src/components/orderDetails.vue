<template>
    <!-- Modal -->
    <div class="modal fade" :id="'modal' + index" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title"></h5> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <template v-if="isFarener">
              <form>
                <div class="form-group">
                    <label for="specific-flightRoute" class="col-form-label">PNR航段信息:</label>
                    <textarea type="textarea" class="form-control" id="specific-flightRoute" v-model="result.flightMsg" rows="4"></textarea>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-price" class="col-form-label">总价:</label>
                    <input type="text" class="form-control" id="specific-price" v-model="result.price">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-dead-line" class="col-form-label">最晚出票时间:</label>
                    <p>{{result.deadline}}</p>
                  </div>
                  <div class="col-6">
                    <label for="recordLocator" class="col-form-label">订位代码:</label>
                    <p>{{result.recordLocator}}</p>
                  </div>
                </div>
                <div class="form-group row" v-for="passenger in result.passenger">
                  <div class="col-6">
                    <label for="specific-passengers" class="col-form-label">乘机人:</label>
                    <p>{{passenger['name']}}</p>
                  </div>
                  <div class="col-6">
                    <label for="specific-ticketNumber" class="col-form-label">票号:</label>
                    <p>{{passenger['ticketnumber']}}</p>
                  </div>
                </div>
                <!-- <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-success" @click="confirmTicket(result)" data-dismiss="modal" disabled>确认出票</button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-commitprice" class=" col-6 col-form-label">可出票价格 :</label>
                    <div class="col-6">
                      <input type="text" class="form-control" id="specific-commitprice" v-model="commitPrice">
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-warning" @click="negotiatePrice(result)" data-dismiss="modal" disabled>暂不能出票</button>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Position" value="没有舱位" v-model="rejectReason">
                    <label class="form-check-label" for="Position">没有舱位</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Price" value="没有票价" v-model="rejectReason">
                    <label class="form-check-label" for="Price">没有票价</label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-danger" @click="cancelOrder(result)" data-dismiss="modal" disabled>拒绝出票</button>
                  </div>
                </div> -->
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="airlineA" value="AA" v-model="result.flight">
                  <label class="form-check-label" for="airlineA">AA</label>
                  <input class="form-check-input" type="checkbox" id="airlineB" value="DL" v-model="result.flight">
                  <label class="form-check-label" for="airlineB">DL</label>
                  <input class="form-check-input" type="checkbox" id="airlineC" value="UA" v-model="result.flight">
                  <label class="form-check-label" for="airlineC">UA</label>
                  <input class="form-check-input" type="checkbox" id="airlineD" value="CA" v-model="result.flight">
                  <label class="form-check-label" for="airlineD">CA</label>
                  <input class="form-check-input" type="checkbox" id="airlineE" value="MU" v-model="result.flight">
                  <label class="form-check-label" for="airlineE">MU</label>
                  <input class="form-check-input" type="checkbox" id="airlineF" value="CX" v-model="result.flight">
                  <label class="form-check-label" for="airlineF">CX</label>
                  <input class="form-check-input" type="checkbox" id="airlineG" value="OTHER" v-model="result.flight">
                  <label class="form-check-label" for="airlineG">OTHER</label>
                </div>
                <div>
                  <button class="btn btn-success center-button" type="button" @click="reviseTicket(result)" data-dismiss="modal">修改订单</button>
                </div>
                <div class="form-group message-board">
                  <p v-for="log in result.logs">
                    记录时间: {{log.time}}  操作人: {{log.operator}}  <b>描述: </b><span v-for="specificLog in log.operation">{{specificLog}}, </span>
                  </p>
                </div>
              </form>
            </template>

            <template v-if="!isFarener">
              <form>
                <div class="form-group">
                    <label for="specific-flightRoute" class="col-form-label">PNR航段信息:</label>
                    <p>{{result.flightMsg}}</p>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-price" class="col-form-label">总价:</label>
                    <p>{{result.price}}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-dead-line" class="col-form-label">最晚出票时间:</label>
                    <!-- <input type="text" class="form-control" id="specific-dead-line" v-model="result.deadline" placeholder="ex: 2018-03-27" readonly> -->
                    <p>{{result.deadline}}</p>
                  </div>
                  <div class="col-6">
                    <label for="recordLocator" class="col-form-label">订位代码:</label>
                    <input type="text" class="form-control" id="recordLocator" v-model="result.recordLocator">
                  </div>
                </div>
                <div class="form-group row" v-for="passenger in result.passenger">
                  <div class="col-6">
                    <label for="specific-passengers" class="col-form-label">乘机人:</label>
                    <!-- <input type="text" class="form-control" id="specific-passengers" v-model="passenger['name']" readonly> -->
                    <p>{{passenger['name']}}</p>
                  </div>
                  <div class="col-6">
                    <label for="specific-ticketNumber" class="col-form-label">票号:</label>
                    <input type="text" class="form-control" id="specific-ticketNumber" v-model="passenger['ticketnumber']">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-success" @click="confirmTicket(result)" data-dismiss="modal">确认出票</button>
                  </div>
                </div>
                <div class="form-group row">
                  <!-- <div class="col-6"> -->
                    <label for="specific-commitprice" class=" col-6 col-form-label">可出票价格 :</label>
                    <div class="col-6">
                      <input type="text" class="form-control" id="specific-commitprice" v-model="commitPrice">
                    </div>
                  <!-- </div> -->
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-warning" @click="negotiatePrice(result)" data-dismiss="modal" >暂不能出票</button>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Position" value="没有舱位" v-model="rejectReason">
                    <label class="form-check-label" for="Position">没有舱位</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Price" value="没有票价" v-model="rejectReason">
                    <label class="form-check-label" for="Price">没有票价</label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-danger" @click="cancelOrder(result)" data-dismiss="modal">拒绝出票</button>
                  </div>
                </div>
                <div class="form-group message-board">
                  <p v-for="log in result.logs">
                    记录时间: {{log.time}}  操作人: {{log.operator}}  <b>描述: </b><span v-for="specificLog in log.operation">{{specificLog}}, </span>
                  </p>
                </div>
              </form>
            </template>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['result', 'index'],
  data () {
    return {
      rejectReason: null,
      commitPrice: null,
    }
  },
  computed: {
    isFarener() {
      return this.$store.getters.authType == 'farener'
    },
    idToken() {
      return this.$store.getters.idToken
    },
    dateRange() {
      return this.$store.getters.dateRange
    },
    status() {
      return this.$store.getters.status
    },
  },
  methods: {
    reviseTicket (result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {
          id: result._id.$oid,
          flightMsg: result.flightMsg,
          price: result.price,
          flight: result.flight,
          // recordLocator: result.recordLocator,
          // status: "已出票",
          // passenger: result.passenger,
      }, authHeader).then( res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    },
    confirmTicket (result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {
          id: result._id.$oid,
          // flightMsg: result.flightMsg,
          // price: result.price,
          recordLocator: result.recordLocator,
          // commitprice: result.commitprice,
          status: "已出票",
          passenger: result.passenger,
      }, authHeader).then( res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    },
    negotiatePrice (result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {
        // data: {
        //   id: result._id.$oid,
        //   passenger: [{"name": "elwin","ticketNumber": "123123"}, {"name": "kwan"}]
        // }
          id: result._id.$oid,
          recordLocator: result.recordLocator,
          commitprice: this.commitPrice,
          status: "待處理",
      }, authHeader).then( res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    },
    cancelOrder(result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {

          id: result._id.$oid,
          status: "已取消",
          comment: this.rejectReason,

      }, authHeader).then( res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-header {
    border-bottom-width: 0;
  }
  .modal-footer {
    border-top-width: 0;
  }
  .message-board {
    border: 1px solid grey;
    padding: 5px;
    margin-bottom: 0;
    font-size: 14px;
  }
  .center-button {
    display: block;
    margin: 10px auto;
  }
</style>
