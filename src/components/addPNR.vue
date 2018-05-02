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
              <div class="form-group" :class="{invalid: $v.flightMsg.$error}">
                  <label for="flightRoute" class="col-form-label">PNR航段信息<span>*</span>:</label>
                  <textarea type="textarea" class="form-control" id="flightRoute" @blur="$v.flightMsg.$touch()" v-model="flightMsg" rows="4" required></textarea>
                  <p v-if="$v.flightMsg.$error">Don't leave this empty</p>
                  <!-- <p>{{$v.flightMsg}}</p> -->
              </div>
              <div class="form-group row">
                <div class="col-6" :class="{invalid: $v.price.$error}">
                  <label for="price" class="col-form-label">总价<span>*</span>:</label>
                  <input type="number" class="form-control" id="price" @blur="$v.price.$touch()" v-model="price" required>
                  <p v-if="$v.price.$error">Don't leave this empty</p>
                </div>
                <div class="col-6">
                  <label for="dead-line" class="col-form-label">最晚出票时间:</label>
                  <!-- <input type="text" class="form-control" id="dead-line" v-model="deadline" placeholder="ex: 2018-03-27"> -->
                  <date-picker id="dead-line" class="datechoice" v-model="deadline" :not-before="new Date()" ></date-picker>
                </div>
              </div>
              <div class="form-group" :class="{invalid: $v.passenger.$error}">
                <label for="passengers" class="col-form-label">乘机人<span>*</span>:</label>
                <input type="text" class="form-control" id="passengers" @blur="$v.passenger.$touch()" v-model="passenger" placeholder="多位乘客时，请用'|' 隔开" required>
                <p v-if="$v.passenger.$error">Don't leave this empty</p>
              </div>
              <div class="form-group">
                <label for="extra" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="extra" v-model="comment">
              </div>
              <div class="form-check form-check-inline margin-right">
                <i class="fas fa-plane"></i><span class="red">*</span>
                <input class="form-check-input" type="checkbox" id="airlineA" value="AA" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineA">AA</label>
                <input class="form-check-input" type="checkbox" id="airlineB" value="DL" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineB">DL</label>
                <input class="form-check-input" type="checkbox" id="airlineC" value="UA" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineC">UA</label>
                <input class="form-check-input" type="checkbox" id="airlineD" value="CA" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineD">CA</label>
                <input class="form-check-input" type="checkbox" id="airlineE" value="MU" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineE">MU</label>
                <input class="form-check-input" type="checkbox" id="airlineF" value="CX" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineF">CX</label>
                <input class="form-check-input" type="checkbox" id="airlineG" value="OTHER" @input="$v.flight.$touch()" v-model="flight">
                <label class="form-check-label" for="airlineG">OTHER</label>
              </div>
              <div class="form-check form-check-inline margin-right">

              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="'true'" id="emergency" v-model="isRush">
                <label class="form-check-label" for="emergency">
                  加急票
                </label>
              </div>
            </form>
          </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" @click="submitForm()" data-dismiss="modal" :disabled="$v.$invalid">提交</button>
              <!-- <button type="button" class="btn btn-danger" @click="addFake()">Add Fake</button> -->
            </div>

            <!-- <form>
                <label for="checkRequired" class="col-form-label">备注:</label>
                <input type="text" class="form-control" id="checkRequired" v-model="comment" required>
                <button type="button">check</button>
            </form> -->

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
  data () {
    return {
      flightMsg: '',
      price: '',
      comment: '',
      passenger: '',
      deadline: '',
      flight: [],
      isRush: false
    }
  },
  computed: {
    idToken () {
      return this.$store.getters.idToken
    },
    dateRange () {
      return this.$store.getters.dateRange
    },
    status () {
      return this.$store.getters.status
    }
  },
  methods: {
    submitForm () {
      let revisedDeadline

      if (this.deadline) {
        revisedDeadline = new Date(this.deadline.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
      } else {
        revisedDeadline = this.deadline
      }

      const formData = {
        flightMsg: this.flightMsg,
        price: this.price,
        comment: this.comment,
        passenger: this.passenger,
        deadline: revisedDeadline,
        isRush: this.isRush.toString(),
        flight: this.flight,
        status: '待估價'
      }
      // console.log(formData)
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      // console.log(this.idToken)

      axios.post('api/webuy', formData, authHeader)
        .then(res => {
          console.log(res)

          this.flightMsg = ''
          this.price = ''
          this.comment = ''
          this.passenger = ''
          this.deadline = ''
          this.flight = []
          this.isRush = false

          this.$v.$reset() // set the detect state($dirty) to false

          this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
          this.$store.commit('resetPage')
          // console.log(this.dateRange ,this.status)
        })
        .catch(error => console.log(error))
    }
    // addFake () {
    //   for (let i = 0; i < 50; i++ ) {
    //     const formData = {
    //       flightMsg: faker.lorem.sentence(),
    //       price: faker.commerce.price(),
    //       comment: faker.random.words(),
    //       passenger: faker.name.lastName(),
    //       deadline: faker.date.recent().toISOString().slice(0, 10),
    //       isRush: 'false',
    //       flight: ['MU', 'AA', 'OTHER'],
    //       // recordOperator: this.recordOperator
    //     }
    //     // console.log(formData)
    //     const authHeader = {
    //       headers: {
    //         'Authorization': 'Bearer ' + this.idToken
    //       }
    //     }

    //     // console.log(this.idToken)

    //     axios.post('api/webuy', formData, authHeader)
    //       .then(res => {
    //         // console.log(res);

    //         this.flightMsg = '';
    //         this.price = '';
    //         this.comment = '';
    //         this.passenger = '';
    //         this.deadline = '';
    //         this.flight = [];
    //         this.isRush = false

    //         // this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
    //         // console.log(this.dateRange ,this.status)
    //       })
    //       .catch(error => console.log(error))
    //   }

    // }
  },
  validations: {
    flightMsg: {
      required
    },
    price: {
      required
    },
    passenger: {
      required
    },
    flight: {
      required
    }
    // price: '',
    // comment: '',
    // passenger: '',
    // deadline: '',
    // flight: [],
    // isRush: false,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-footer {
    border-top-width: 0;
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
