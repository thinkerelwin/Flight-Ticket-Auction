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
      <div class="col-md-2 be-center">
        <button class="btn btn-primary" type="button" name="search" @click="query()" :disabled="waitResponse">
          查询
        </button>
        <!-- <button class="btn btn-secondary" type="button" name="test" @click="getGroup()">
          讀取
        </button>
        <button class="btn btn-secondary" type="button" name="test" @click="creatGroup()">
          新增
        </button>
        <button class="btn btn-secondary" type="button" name="test" @click="getUser()">
          讀取USER
        </button> -->
      <span v-if="waitResponse">
        <i class="fas fa-spinner"></i>
      </span>
      </div>

      <div v-if="Object.keys(results).length === 0" class="col-12 be-center">
        <p>没有搜寻结果</p>
      </div>

    <template v-if="results.length !== 0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">记录时间</th>
            <th scope="col">航段信息</th>
            <th scope="col">备注</th>
            <th scope="col">总价</th>
            <th class="min-width" scope="col">可出票价格</th>
            <th class="min-width" scope="col">最晚出票时间</th>
            <th scope="col">乘机人</th>
            <th class="min-width" scope="col">状态</th>
            <th scope="col">详细</th>
            <th v-if="isFarener" scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="result._id.$oid">
            <th>{{ result.datetime }}</th>
            <td><pre>{{ result.flightMsg }}</pre></td>
            <td>{{ result.comment }}</td>
            <td>{{ result.price }}</td>
            <td>{{ result.commitprice }}</td>
            <td>{{ result.deadline }}</td>
            <td><p v-for="(passenger, index) in result.passenger" :key="index">{{ passenger['name'] }}</p></td>
            <td>{{ result.status }}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" :data-target="'#modal' + index">详细</button>
              <orderDetails :result="result" :index="index"></orderDetails>
            </td>
            <td v-if="isFarener">
              <button class="btn btn-danger addspace" @click="deleteOrder(result, index)">删除</button>
              <button v-if="result.isRush == 'false'" class="btn btn-warning" @click="changeToRush(result)">加急</button>
            </td>
          </tr>
        </tbody>
      </table>

      <pagination
        :for="'myPagination'"
        :records="entries"
        :per-page="recordPerPage"
        :vuex="true"
        :options="{ theme: 'bootstrap4'}"
        @paginate="changePage">
      </pagination>
      <!-- <p>{{this.page}}</p> -->
    </template>

    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import {Pagination} from 'vue-pagination-2'

import axios from 'axios'
import orderDetails from './orderDetails.vue'

export default {
  // props: ['authData'],
  components: {
    DatePicker,
    Pagination,
    'orderDetails': orderDetails
  },
  data () {
    return {
      dateRange: '',
      shortcuts: true,
      // shortcuts: [
      //   {
      //     text: 'Today',
      //     start: new Date(),
      //     end: new Date()
      //   }
      // ],
      status: '',
      recordPerPage: 30
    }
  },
  computed: {
    results () {
      return this.$store.getters.results.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage)
    },
    entries () {
      return this.$store.getters.entries
    },
    page () {
      return this.$store.getters.page
    },
    idToken () {
      return this.$store.getters.idToken
    },
    isFarener () {
      return this.$store.getters.authType === 'farener'
    },
    waitResponse () {
      return this.$store.getters.waitResponse
    }
  },
  methods: {
    query () {
      this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
    },
    changePage (page) {
      this.$store.dispatch('updatePage', page)
      // console.log(this.page)
    },
    changeToRush (result) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/webuy', {
        id: result._id.$oid,
        isRush: 'true'
      }, authHeader)
        .then(res => {
          alert('加急成功!')
          this.query()
        }).catch(error => console.log(error))
    },
    deleteOrder (result, index) {
      // this.results.splice(index, 1);
      // console.log(this.idToken)
      axios.delete('api/webuy', {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        },
        params: {
          id: result._id.$oid
        }
      }).then(res => {
        alert('訂單已刪除!')
        this.query()
      }).catch(error => console.log(error))
    },
    getGroup () {
      axios.get('api/groups', {
        headers: {
          Authorization: 'Bearer ' + this.idToken
        },
        params: {
          limit: 'all',
          orderBy: 'datetime',
          orderMethod: 'desc'
          // searching: searchString()
        }
      })
        .then(res => {
          // this.results = res.data.result;  //how to pass this.results info back to showList.vue?
          // commit('queryResult', {
          //   orderResults: res.data.result,
          //   orderEntries: res.data.entries
          // })
          console.log(res)
          // commit('waiting')
        })
        .catch(error => {
          console.log(error)
          // commit('waiting')
        })
    },
    creatGroup () {
      const formData = {
        name: 'golden3',
        read: ['flightMsg', 'price'],
        edit: ['passenger', 'deadline']
      }
      // console.log(formData)
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.post('api/groups', formData, authHeader)
        .then(res => {
          console.log(res)

          // this.flightMsg = ''
          // this.price = ''
          // this.comment = ''
          // this.passenger = ''
          // this.deadline = ''
          // this.flight = []
          // this.isRush = false

          // this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
          // this.$store.commit('resetPage')
          // console.log(this.dateRange ,this.status)
        })
        .catch(error => console.log(error))
    },
    editGroup () {
      const formData = {
        id: '5ad7042b33378a24db3ee445',
        name: 'golden',
        read: ['flightMsg', 'price'],
        edit: ['passenger', 'deadline']
      }
      // console.log(formData)
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.post('api/groups', formData, authHeader)
        .then(res => {
          console.log(res)

          // this.flightMsg = ''
          // this.price = ''
          // this.comment = ''
          // this.passenger = ''
          // this.deadline = ''
          // this.flight = []
          // this.isRush = false

          // this.$store.dispatch('queryorder', {dateRange: this.dateRange, status: this.status})
          // this.$store.commit('resetPage')
          // console.log(this.dateRange ,this.status)
        })
        .catch(error => console.log(error))
    },
    getUser () {
      axios.get('api/user', {
        headers: {
          Authorization: 'Bearer ' + this.idToken
        },
        params: {
          limit: 'all'
          // orderBy: 'datetime',
          // orderMethod: 'desc'
          // searching: searchString()
        }
      })
        .then(res => {
          // this.results = res.data.result;  //how to pass this.results info back to showList.vue?
          // commit('queryResult', {
          //   orderResults: res.data.result,
          //   orderEntries: res.data.entries
          // })
          console.log(res)
          // commit('waiting')
        })
        .catch(error => {
          console.log(error)
          // commit('waiting')
        })
    }
  },
  mounted () {
    this.query()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .container {
    background-color: rgb(236, 236, 236);
  } */
  .datechoice {
    width: 100% !important;
  }
  select, .input-group, .btn, .input-group-text {
    height: 34px;
  }
  select, .btn {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  table {
    margin-top: 10px;
    /* text-align: center; */
    font-size: 14px;
  }
  thead {
    width: 100%
  }

  /* can use these below to adjust */

  /* tr {
    width: 100%;
    display: inline-table;
    table-layout: fixed;
  }
  table{
    height:300px;
    display: -moz-groupbox;
  }
  tbody{
    overflow-y: scroll;
    height: 200px;
    width: 100%;
    position: absolute;
  } */

  td button {
    display: block;
    margin-bottom: 5px;
  }
  .be-center {
    text-align: center;
  }
  .be-center p {
    margin-top: 1rem;
  }
  .VuePagination {
    margin: 10px auto;
    text-align: center;
  }
  /* spin animation */
  .fa-spinner {
    position: absolute;
    top: 10px;
    margin-left: 8px;
    /* vertical-align: middle; */
    font-size: 18px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* .min-width {
    min-width: 75px;
  } */

  /* add bootstrap .table-responsive property only when reach the breakpoint */
  @media only screen and (max-width: 1576px) {
    .table {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
}
</style>
