<template>
  <div class="container-fluid">
    <addUser :groupList="groupList"></addUser>
    <div class="row">
      <div class=" input-group offset-md-4 col-md-2 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="GroupSelection">群组</label>
        </div>
        <select class="custom-select" id="GroupSelection" v-model="groupSelection">
          <option value="">全部</option>
          <option v-for="(group, i) in groupList" :value="group.name" :key="i">{{group.name}}</option>
        </select>
        <p>{{filteredUserList}}</p>
      </div>

      <div class="col-md-2 be-center">
        <button class="btn btn-primary"
                type="button"
                data-toggle="modal"
                data-target="#UserModal">
          新增使用者
        </button>
      <span v-if="waitResponse">
        <i class="fas fa-spinner"></i>
      </span>
      </div>

      <div v-if="userEntries === 0" class="col-12 be-center">
        <p>没有搜寻结果</p>
      </div>

    <template v-if="userEntries !== 0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">名称</th>
            <th scope="col">暱称</th>
            <!-- <th scope="col">群组</th> -->
            <th scope="col">可见航空公司</th>
            <th scope="col">编辑</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index">
            <th>{{ user.name }}</th>
            <td>{{ user.cooperation }}</td>
            <!-- <td>{{ user.group }}</td> -->
            <td>{{ user.flight }}</td>
            <td>
              <button class="btn btn-warning" data-toggle="modal" :data-target="'#SpecificUser' + index">编辑</button>
              <userDetails :user="user"
                           :groupList="groupList"
                           :index="index"
                           :groupSelection="groupSelection"
                           :getUser="getUser">
              </userDetails>
            </td>
            <td>
              <button class="btn btn-danger addspace" @click="deleteUser(user, index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <pagination
        :for="'myPagination'"
        :records="userEntries"
        :per-page="recordPerPage"
        :vuex="true"
        :options="{ theme: 'bootstrap4'}"
        @paginate="changePage">
      </pagination> -->
    </template>

    </div>
  </div>
</template>

<script>
// import {Pagination} from 'vue-pagination-2'

import axios from 'axios'
import addUser from './addUser.vue'
import userDetails from './userDetails.vue'

export default {
  // props: ['authData'],
  components: {
    // Pagination,
    userDetails,
    addUser
  },
  data () {
    return {
      userList: null,
      userEntries: null,
      groupList: null,
      groupEntries: null,
      groupSelection: ''
    //   recordPerPage: 5
    }
  },
  computed: {
    // results () {
    //   return this.$store.getters.results.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage)
    // },
    // entries () {
    //   return this.$store.getters.entries
    // },
    // page () {
    //   return this.$store.getters.page
    // },
    filteredUserList () {
      return this.getUser(this.groupSelection)
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
    changePage (page) {
      this.$store.dispatch('updatePage', page)
      // console.log(this.page)
    },
    deleteUser (user, index) {
      // this.results.splice(index, 1);
      // console.log(this.idToken)
      axios.delete('api/user', {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        },
        params: {
          id: user._id
        }
      }).then(res => {
        alert('使用者已刪除!')
        this.getUser(this.groupSelection)
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
          this.groupList = res.data.result
          this.groupEntries = res.data.entries

          console.log(res)
          // commit('waiting')
        })
        .catch(error => {
          console.log(error)
          // commit('waiting')
        })
    },
    getUser (name) {
      // this.$store.commit('waiting')

      let searchString

      if (name) {
        searchString = `[group,=,${name}]`
      } else {
        searchString = ''
      }

      axios.get('api/user', {
        headers: {
          Authorization: 'Bearer ' + this.idToken
        },
        params: {
          limit: 'all',
          searching: searchString
        }
      })
        .then(res => {
          this.userList = res.data.result
          this.userEntries = res.data.entries
          console.log(res)
          // this.$store.commit('waiting')
        })
        .catch(error => {
          console.log(error)
          // this.$store.commit('waiting')
        })
    }
  },
  mounted () {
    // this.getUser()
    this.getGroup()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
