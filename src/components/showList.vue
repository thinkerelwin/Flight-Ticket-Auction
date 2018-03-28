<template>
  <div class="container-fluid">
    <div class="row">

      <div class="input-group col-md-4 mb-3">
        <date-picker class="datechoice" v-model="dateRange" range :shortcuts="shortcuts" placeholder="开始日期-结束日期"></date-picker>
        <!-- <p>{{dateRange}}</p>
        <p>{{dateRange[0]}}</p>
        <p>{{dateRange[1]}}</p> -->
      </div>
      <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="ticketStatus">状态</label>
        </div>
        <select class="custom-select" id="ticketStatus" v-model="status">
          <option value="" selected>全部</option>
          <option value="待出票">待出票</option>
          <option value="待处理">待处理</option>
          <option value="已出票">已出票</option>
          <option value="已取消">已取消</option>
        </select>
      </div>
      <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="operator">人员</label>
        </div>
        <select class="custom-select" id="operator" v-model="recordOperator">
          <option value="" selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary" type="button" name="search" @click="query">查询</button>
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
            <th scope="col">操作人员</th>
            <th scope="col">状态</th>
            <th scope="col">详细</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="result._id.$oid">
            <th scope="row">{{ result.datetime }}</th>
            <td>{{ result.flightMsg }}</td>
            <td>{{ result.comment }}</td>
            <td>{{ result.price }}</td>
            <td>{{ result.commitPrice }}</td>
            <td>{{ result.deadline }}</td>
            <td><p v-for="passenger in result.passenger">{{ passenger['name'] }}</p></td>
            <td>{{ result.recordOperator }}</td>
            <td>{{ result.status }}</td>
            <td>
              <!-- <button type="btn btn-info" @click="changeOrder(result)">详细</button> -->
              <button class="btn btn-info" data-toggle="modal" :data-target="'#modal' + index">详细</button>
              <orderDetails :result="result" :index="index"></orderDetails>
            </td>
            <td>
              <button class="btn btn-danger" @click="deleteOrder(result, index)">删除</button>
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
      // startDate: dateRange[0],
      // endDate: dateRange[1],
      status: '',
      recordOperator: '',
      results: {},
      // displayPassengers: '',
    }
  },
  methods: {
    query () {
      const formData = {
        startDate: this.dateRange[0].toISOString().slice(0, 10),
        endDate: this.dateRange[1].toISOString().slice(0 ,10),
        status: this.status,
        recordOperator: this.recordOperator
      }

      console.log(formData);

      function searchString() {
        let queryString = '';

        if (formData.startDate == formData.endDate) {
          queryString += `[recordTime,=,${formData.startDate}]`
        } else {
          queryString += `[recordTime,>,${formData.startDate}],[recordTime,<,${formData.endDate}]`
        }

        if (formData.status) {
          queryString += `,[status,=,${formData.status}]`
        }
        if (formData.recordOperator) {
          queryString += `,[recordOperator,=,${formData.recordOperator}]` //currently bugged
        }
        console.log(queryString);
        return queryString
      }

      axios.get('', {
        params: {
          limit: 'all',
          searching: searchString(),
        }
      })
        .then( res => {
          // console.log(res);
          this.results = res.data.result;

          // for (let result in results) {
          //   for (let passenger in result.passenger)
          // }
          // this.displayPassengers = res.data.result.passenger.concat

          // console.log(this.results);
        })
        .catch(error => console.log(error))
      // axios.get('http://kusakawa.ddns.net:8080/farener/public/api/orders.json', formData);
    },
    // params: {
    //   id: result._id.$oid,
    //   // flightMsg: 'change message by axios',
    //   // status: '已取消',
    //   // price: 777,
    //   // commitprice: 666,
    //   // comment: 'add via axios',
    //   passenger: [{"name": "elwin","ticketNumber": "123123"}, {"name": "kwan"}]
    // }
    deleteOrder(index, result, results) {
      this.results.splice(index, 1);
      axios.delete('', {
        params: {
          id: result._id.$oid,
        }
      })
    }
  },
  created() {
    // axios.get('/PNR.json')
    //   .then( res => console.log(res))
    //   .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    /* background-color: rgb(236, 236, 236); */
    /* margin: 0;
    padding: 3%;  */
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
</style>
<!-- http://kusakawa.ddns.net:8080/farener/public/api/webuy?limit=all&searching=%5Bstatus,%3D,%E5%BE%85%E8%99%95%E7%90%86%5D
http://kusakawa.ddns.net:8080/farener/public/api/webuy?limit=all&searching=%255Bstatus,%253D,%25E5%25BE%2585%25E8%2599%2595%25E7%2590%2586%255D -->
