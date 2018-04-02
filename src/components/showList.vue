<template>
  <div class="container-fluid">
    <div class="row">

      <div class="input-group col-md-4 mb-3">
        <date-picker class="datechoice" v-model="dateRange" range :shortcuts="shortcuts" placeholder="开始日期-结束日期" required></date-picker>
      </div>
      <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="ticketStatus">状态</label>
        </div>
        <select class="custom-select" id="ticketStatus" v-model="status">
          <option value="" selected>全部</option>
          <option value="待出票">待出票</option>
          <option value="待處理">待处理</option>
          <option value="已出票">已出票</option>
          <option value="已取消">已取消</option>
        </select>
      </div>
      <!-- <p>{{new Date(dateRange[0].getTime() + 3600 * 8000)}}</p> -->
      <!-- <p>{{dateRange}}</p>
      <p>{{new Date()}}</p> -->
      
      <!-- <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="operator">人员</label>
        </div>
        <select class="custom-select" id="operator" v-model="recordOperator">
          <option value="" selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div> -->
      <div class="col-md-2">
        <button class="btn btn-primary" type="button" name="search" @click="query()">查询</button>
      </div>

      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">记录时间</th>
            <th scope="col">航段信息</th>
            <th scope="col">备注</th>
            <th scope="col">总价</th>
            <th scope="col">可出票价格</th>
            <th scope="col">最晚出票时间</th>
            <th scope="col">乘机人</th>
            <!-- <th scope="col">操作人员</th> -->
            <th scope="col">状态</th>
            <th scope="col">详细</th>
            <th v-if="isFarener" scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="result._id.$oid">
            <th scope="row">{{ result.datetime }}</th>
            <td><pre>{{ result.flightMsg }}</pre></td>
            <td>{{ result.comment }}</td>
            <td>{{ result.price }}</td>
            <td>{{ result.commitprice }}</td>
            <td>{{ result.deadline }}</td>
            <td><p v-for="passenger in result.passenger">{{ passenger['name'] }}</p></td>
            <!-- <td>{{ result.recordOperator }}</td> -->
            <td>{{ result.status }}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" :data-target="'#modal' + index">详细</button>
              <orderDetails :result="result" :index="index"></orderDetails>
            </td>
            <td v-if="isFarener">
              <button class="btn btn-danger addspace" @click="deleteOrder(result, index)">删除</button>
              <button v-if="result.isRush == 'false'" class="btn btn-warning" @click="changeToRush(result)">加急</button>
              <!-- <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#confirmDelete">
                確認删除
              </button> -->
            </td>

          </tr>
        </tbody>
      </table>


      <!-- <div class="modal fade" id="confirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmDeleteTitle">确认删除</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">清空PNR</button>
              <button type="button" class="btn btn-primary" @click="" data-dismiss="modal">提交</button>
            </div>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import axios from 'axios'
import orderDetails from './orderDetails.vue'

export default {
  // props: ['authData'],
  components: {
    DatePicker,
    'orderDetails': orderDetails
  },
  data () {
    return {
      dateRange: '',
      shortcuts: [
        {
          text: 'Today',
          start: new Date(),
          end: new Date()
        }
      ],
      status: '',
      // recordOperator: '',
      // results: {},
    }
  },
  computed: {
    results() {
      return this.$store.getters.results
    },
    idToken() {
      return this.$store.getters.idToken
    },
    isFarener() {
      return this.$store.getters.authType == 'farener'
    }
  },
  methods: {
    query () {

      // if no date entry, set default daterange to today
      // code below is bugged
      // if (!this.dateRange) {
      //   let defaultStartDate = new Date()
      //   let defaultEndDate = new Date()
      //   console.log(`[${defaultStartDate.toISOString()}, ${defaultEndDate.toISOString()}]`)
      //   defaultStartDate.setUTCHours(10)
      //   defaultEndDate.setUTCHours(34)
      //   console.log(`after set hours: [${defaultStartDate.toISOString().slice(0, 10)}, ${defaultEndDate.toISOString().slice(0, 10)}]`)
      //   // this.dateRange = `[${new Date().toISOString}, ${new Date().toISOString}]`
      //   this.dateRange = [defaultStartDate, defaultEndDate]
      // } else if (this.dateRange[0] !== this.dateRange[1]) {
      //   this.dateRange[0].setUTCHours(10)
      //   this.dateRange[1].setUTCHours(34)
      // }

// original function start here

      this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
      console.log(this.results)
      // const formData = {
      //   startDate: this.dateRange[0].toISOString().slice(0, 10),
      //   endDate: this.dateRange[1].toISOString().slice(0 ,10),
      //   status: this.status,
      //   recordOperator: this.recordOperator
      // }
      //
      // console.log(formData);
      //
      // function searchString() {
      //   let queryString = '';
      //
      //   if (formData.startDate == formData.endDate) {
      //     queryString += `[recordTime,=,${formData.startDate}]`
      //   } else {
      //     queryString += `[recordTime,>,${formData.startDate}],[recordTime,<,${formData.endDate}]`
      //   }
      //
      //   if (formData.status) {
      //     queryString += `,[status,=,${formData.status}]`
      //   }
      //   if (formData.recordOperator) {
      //     queryString += `,[recordOperator,=,${formData.recordOperator}]` //currently bugged
      //   }
      //   console.log(queryString);
      //   return queryString
      // }
      //
      // axios.get('api/webuy', {
      //   params: {
      //     limit: 'all',
      //     orderBy: 'datetime',
      //     orderMethod: 'desc',
      //     searching: searchString(),
      //   }
      // }).then( res => {
      //     this.results = res.data.result;
      //   })
      //   .catch(error => console.log(error))

// original function end here
    },
    changeToRush(result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {
        id: result._id.$oid,
        isRush: 'true',
      }, authHeader)
        .then(res => {
          alert("加急成功!")
          this.query()
        }
        ).catch(error => console.log(error))

    },
    deleteOrder(result, index) {
      this.results.splice(index, 1);
      console.log(this.idToken)
      axios.delete('api/webuy', {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        },
        params: {
          id: result._id.$oid,
        }
      }).then(alert("訂單已刪除!"))
        .catch(error => console.log(error))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    /* background-color: rgb(236, 236, 236); */
  }
  .datechoice {
    width: 100% !important;
  }
  select, .input-group, .btn {
    height: 34px;
  }
  select, .btn {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  table {
    margin-top: 10px;
  }
  td button {
    display: block;
    margin-bottom: 5px;
  }
</style>
