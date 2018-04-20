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
                <div class="form-group" :class="{invalid: $v.result.flightMsg.$error}">
                    <label for="specific-flightRoute" class="col-form-label">PNR航段信息<span>*</span>:</label>
                    <textarea type="textarea" class="form-control" id="specific-flightRoute" @input="$v.result.flightMsg.$touch()" v-model="result.flightMsg" rows="4"></textarea>
                    <p v-if="$v.result.flightMsg.$error">Don't leave this empty</p>
                    <!-- <p>{{$v.result.$each[index].flightMsg.$error}}</p> -->
                    <!-- <p>{{$v.result.$each._id.flightMsg.$error}}</p> -->
                    <!-- <p>{{$v.result}}</p> -->
                    <!-- <p>{{result}}</p> -->
                </div>
                <div class="form-group row" :class="{invalid: $v.result.price.$error}">
                  <div class="col-6">
                    <label for="specific-price" class="col-form-label">总价<span>*</span>:</label>
                    <input type="number" class="form-control" id="specific-price" @input="$v.result.price.$touch()" v-model="result.price">
                    <p v-if="$v.result.price.$error">Don't leave this empty</p>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="specific-dead-line" class="col-form-label">最晚出票时间:</label>
                    <!-- <input type="text" class="form-control" id="specific-dead-line" v-model="result.deadline" placeholder="ex: 2018-03-27"> -->
                    <date-picker id="specific-dead-line" class="datechoice" v-model="result.deadline" :not-before="new Date()"></date-picker>
                  </div>
                  <div class="col-6">
                    <label for="recordLocator" class="col-form-label">订位代码:</label>
                    <p>{{result.recordLocator}}</p>
                  </div>
                </div>
                <div class="form-group row"
                      v-for="(passenger, index) in result.passenger"
                     :class="{invalid: $v.result.passenger.$each[index].name.$error}"
                     :key="index">
                  <div class="col-6">
                    <label :for="'specific-passengers' + index" class="col-form-label">乘机人<span>*</span>:</label>
                    <input type="text"
                           class="form-control"
                           :id="'specific-passengers' + index"
                           @blur="$v.result.passenger.$each[index].name.$touch()"
                           v-model="passenger.name">
                    <!-- <p>{{$v.result.passenger.$each[index]}}</p> -->
                    <p v-if="$v.result.passenger.$each[index].name.$error">Don't leave this empty</p>
                  </div>
                <!-- <div class="form-group row" :class="{invalid: $v.result.price.$error}">
                  <div class="col-6">
                    <label for="specific-price" class="col-form-label">总价<span>*</span>:</label>
                    <input type="number" class="form-control" id="specific-price" @blur="$v.result.price.$touch()" v-model="result.price">
                    <p v-if="$v.result.price.$error">Don't leave this empty</p>
                  </div>
                </div> -->
                  <div class="col-6">
                    <label for="specific-ticketNumber" class="col-form-label">票号:</label>
                    <p>{{passenger['ticketNumber']}}</p>
                  </div>
                </div>

                <div class="form-check form-check-inline margin-right">
                  <i class="fas fa-plane"></i><span class="red">*</span>
                  <input class="form-check-input" type="checkbox" id="airlineA" value="AA" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineA">AA</label>
                  <input class="form-check-input" type="checkbox" id="airlineB" value="DL" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineB">DL</label>
                  <input class="form-check-input" type="checkbox" id="airlineC" value="UA" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineC">UA</label>
                  <input class="form-check-input" type="checkbox" id="airlineD" value="CA" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineD">CA</label>
                  <input class="form-check-input" type="checkbox" id="airlineE" value="MU" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineE">MU</label>
                  <input class="form-check-input" type="checkbox" id="airlineF" value="CX" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineF">CX</label>
                  <input class="form-check-input" type="checkbox" id="airlineG" value="OTHER" @blur="$v.result.flight.$touch()" v-model="result.flight">
                  <label class="form-check-label" for="airlineG">OTHER</label>
                </div>
                <div>
                  <button class="btn btn-success center-button" type="button" @click="reviseTicket(result)" data-dismiss="modal" :disabled="checkValidation">修改订单</button>
                </div>
                <div class="form-group message-board">
                  <p v-for="(log, i) in result.logs" :key="i">
                    记录时间: {{log.time}}  操作人: {{log.operator}}  <b>描述: </b><span v-for="(specificLog, i) in log.operation" :key="i">{{specificLog}}, </span>
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
                    <p>{{result.deadline}}</p>
                  </div>
                  <div class="col-6">
                    <label for="recordLocator" class="col-form-label">订位代码:</label>
                    <input type="text"
                           class="form-control"
                           id="recordLocator"
                           @input="$v.result.recordLocator.$touch()"
                           v-model="result.recordLocator">
                  </div>
                </div>
                <div class="form-group row" v-for="(passenger, index) in result.passenger" :key="index">
                  <div class="col-6">
                    <label for="specific-passengers" class="col-form-label">乘机人:</label>
                    <p>{{passenger['name']}}</p>
                  </div>
                  <div class="col-6">
                    <label :for="'specific-ticketNumber' + index" class="col-form-label">票号:</label>
                    <input type="text"
                           class="form-control"
                           :id="'specific-ticketNumber' + index"
                           @input="$v.result.passenger.$each[index].ticketNumber.$touch()"
                           v-model="passenger.ticketNumber">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-success" @click="confirmTicket(result)" data-dismiss="modal" :disabled="checkValidation">确认出票</button>
                  </div>
                </div>
                <div class="form-group row">
                  <!-- <div class="col-6"> -->
                    <label for="specific-commitprice" class="col-6 col-form-label">可出票价格 :</label>
                    <div class="col-6">
                      <input type="number" class="form-control" id="specific-commitprice" @input="$v.commitPrice.$touch()" v-model="commitPrice">
                    </div>
                  <!-- </div> -->
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-warning" @click="negotiatePrice(result)" data-dismiss="modal" :disabled="$v.commitPrice.$invalid">暂不能出票</button>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Position" value="没有舱位" @input="$v.rejectReason.$touch()" v-model="rejectReason">
                    <label class="form-check-label" for="Position">没有舱位</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="Price" value="没有票价" @input="$v.rejectReason.$touch()" v-model="rejectReason">
                    <label class="form-check-label" for="Price">没有票价</label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-6 col-6">
                    <button type="button" class="btn btn-danger" @click="cancelOrder(result)" data-dismiss="modal" :disabled="$v.rejectReason.$invalid" >拒绝出票</button>
                  </div>
                </div>
                <div class="form-group message-board">
                  <p v-for="(log, i) in result.logs" :key="i">
                    记录时间: {{log.time}}  操作人: {{log.operator}}  <b>描述: </b><span v-for="(specificLog, i) in log.operation" :key="i">{{specificLog}}, </span>
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
import DatePicker from 'vue2-datepicker'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  components: {
    DatePicker
  },
  props: ['result', 'index'],
  data () {
    return {
      rejectReason: null,
      commitPrice: null
    }
  },
  computed: {
    isFarener () {
      return this.$store.getters.authType === 'farener'
    },
    idToken () {
      return this.$store.getters.idToken
    },
    dateRange () {
      return this.$store.getters.dateRange
    },
    status () {
      return this.$store.getters.status
    },
    checkValidation () {
      // use this because there's two prop in passenger.$each, can't use passenger.$invalid to determine valid state
      let validation = false

      if (this.isFarener) {
        for (let i = 0; i < this.result.passenger.length; i++) {
          validation = validation || this.$v.result.passenger.$each[i].name.$invalid
        }

        return validation || this.$v.result.flightMsg.$error || this.$v.result.price.$error || this.$v.result.flight.$error
      } else {
        for (let i = 0; i < this.result.passenger.length; i++) {
          validation = validation || this.$v.result.passenger.$each[i].ticketNumber.$invalid
        }

        return validation || this.$v.result.recordLocator.$error
      }
    }
  },
  methods: {
    reviseTicket (result) {
      let revisedDeadline

      // check date changed or not
      if (result.deadline.length !== 10) {
        revisedDeadline = new Date(result.deadline.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
      } else {
        revisedDeadline = result.deadline
      }

      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      // console.log(revisedDeadline)

      axios.patch('api/webuy', {
        id: result._id.$oid,
        flightMsg: result.flightMsg,
        price: result.price,
        flight: result.flight,
        deadline: revisedDeadline,
        // deadline: result.deadline,
        // recordLocator: result.recordLocator,
        // status: "已出票",
        passenger: result.passenger
      }, authHeader).then(res => {
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
        status: '已出票',
        passenger: result.passenger
      }, authHeader).then(res => {
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
        status: '待處理'
      }, authHeader).then(res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    },
    cancelOrder (result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {

        id: result._id.$oid,
        status: '已取消',
        comment: this.rejectReason

      }, authHeader).then(res => {
        this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      }).catch(error => console.log(error))
    }
  },
  validations: {
    result: {
      flightMsg: {
        required
      },
      price: {
        required
      },
      passenger: {
        required,
        $each: {
          name: {
            required
          },
          ticketNumber: {
            required
          }
        }
      },
      flight: {
        required
      },
      recordLocator: {
        required
      }
    },
    commitPrice: {
      required
    },
    rejectReason: {
      required
    }
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
  .margin-right label{
    margin-right: 5px;
  }
  input[type="text"] {
    height: 34px;
  }
  .datechoice {
    display: block;
    width: 100% !important;
  }
  label span {
    color: red;
  }
  .invalid textarea,
  .invalid input {
    border-color: #dc3545;
  }
  .invalid p {
    font-size: 14px;
    color: #dc3545;
  }
  .fa-plane {
    color: orange;
  }
  .red {
    color: red;
    margin-right: 10px;
  }
</style>
