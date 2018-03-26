<template>
  <div class="container-fluid">
    <div class="row">

      <div class="input-group col-md-4 mb-3">
        <date-picker class="datechoice" v-model="dateRange" range :shortcuts="shortcuts" placeholder="开始日期-结束日期"></date-picker>
        <p>{{dateRange}}</p>
        <p>{{dateRange[0]}}</p>
        <p>{{dateRange[1]}}</p>
        <p>{{typeof status}}</p>
        <p>{{typeof operator}}</p>
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
        <select class="custom-select" id="operator" v-model="operator">
          <option selected>Choose...</option>
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
          <tr>
            <th scope="row">2018-03-22 13:28:11</th>
            <td>    1.ZHANG/LINGXI MR KFB63Z
 2.  AA178    SU27MAY  MCOLAX HK1   1612 1842          E
SSR DOCS AA HK1 P/CN/E34297079/CN/03FEB00/M/25JAN19/ZHANG/LINGXI MR/P1 </td>
            <td></td>
            <td>512</td>
            <td>775</td>
            <td></td>
            <td>姓名：ZHANG/LINGXI MR</td>
            <td>束海花</td>
            <td>待处理</td>
            <td>详细</td>
            <td><button class="btn btn-danger">删除</button></td>
          </tr>
          <tr v-for="result in results">
            <th scope="row">{{ result.datetime }}</th>
            <td>{{ result.flightMsg }}</td>
            <td>{{ result.comment }}</td>
            <td>{{ result.price }}</td>
            <td>{{ result.commitPrice }}</td>
            <td>{{ result.deadline }}</td>
            <td><span v-for="passenger in result.passenger">{{ passenger['name'] + ', ' }}</span></td>
            <td>{{ result.operator }}</td>
            <td>{{ result.status }}</td>
            <td>详细</td>
            <td><button class="btn btn-danger">删除</button></td>
          </tr>
        </tbody>
      </table>

      <!-- <ol v-for="result in results">
        <li>{{result.datetime}}</li>
      </ol> -->

    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import axios from 'axios'

export default {
  components: { DatePicker },
  data () {
    return {
      dateRange: [],
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
      operator: '',
      results: {},
      // displayPassengers: '',
    }
  },
  methods: {
    query () {
      const formData = {
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        status: this.status,
        operator: this.operator
      }

      // console.log(formData);

      axios.get('', {
        params: {
          limit: 'all',
          searching: `[status,=,${this.status}]`,
        }
      })
        .then( res => {
          console.log(res);
          this.results = res.data.result;

          // for (let result in results) {
          //   for (let passenger in result.passenger)
          // }
          // this.displayPassengers = res.data.result.passenger.concat

          console.log(this.results);


        })
        .catch(error => console.log(error))
      // axios.get('http://kusakawa.ddns.net:8080/farener/public/api/orders.json', formData);
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
