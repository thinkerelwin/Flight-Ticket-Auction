<template>
  <div class="container-fluid">
    <addGroup :groupList="groupList" :getGroup="getGroup"></addGroup>
    <div class="row">
      <!-- <div class=" input-group offset-md-4 col-md-2 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="GroupSelection">群组</label>
        </div>
        <select class="custom-select" id="GroupSelection" v-model="groupSelection">
          <option value="">全部</option>
          <option v-for="(group, i) in groupList" :value="group.name" :key="i">{{group.name}}</option>
        </select>
        <p>{{filteredUserList}}</p>
      </div> -->

      <div class="offset-4 col-4 be-center">
        <button class="btn btn-primary"
                type="button"
                data-toggle="modal"
                data-target="#GroupModal">
          新增群组
        </button>
      <span v-if="waitResponse">
        <i class="fas fa-spinner"></i>
      </span>
      </div>

      <div v-if="groupEntries === 0" class="col-12 be-center">
        <p>没有搜寻结果</p>
      </div>

    <template v-if="groupEntries !== 0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">名称</th>
            <th scope="col">阅读权限</th>
            <th scope="col">读取权限</th>
            <th scope="col">编辑</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in groupList" :key="index">
            <th>{{ group.name }}</th>
            <td>{{ group.read }}</td>
            <td>{{ group.edit }}</td>
            <td>
              <button class="btn btn-warning" data-toggle="modal" :data-target="'#SpecificGroup' + index">编辑</button>
              <groupDetails :group="group"
                            :groupList="groupList"
                            :index="index"
                            :getGroup="getGroup">
              </groupDetails>
            </td>
            <td>
              <button class="btn btn-danger addspace" @click="deleteGroup(group, index)">删除</button>
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
import addGroup from './addGroup.vue'
import groupDetails from './groupDetails.vue'

export default {
  // props: ['authData'],
  components: {
    // Pagination,
    groupDetails,
    addGroup
  },
  data () {
    return {
    //   userList: null,
    //   userEntries: null,
      groupList: null,
      groupEntries: 0
    //   groupSelection: ''
    //   recordPerPage: 5
    }
  },
  computed: {
    // filteredGroupList () {
    //   return this.getGroup(this.groupSelection)
    // },
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
    // changePage (page) {
    //   this.$store.dispatch('updatePage', page)
    //   // console.log(this.page)
    // },
    deleteGroup (group, index) {
      // this.results.splice(index, 1);
      // console.log(this.idToken)
      axios.delete('api/groups', {
        headers: {
          Authorization: 'Bearer ' + this.idToken
        },
        params: {
          id: group._id.$oid
        }
      }).then(res => {
        // console.log(res)
        alert('群组已刪除!')
        this.getGroup()
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

          // console.log(res)
          // commit('waiting')
        })
        .catch(error => {
          console.log(error)
          // commit('waiting')
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
  /* .VuePagination {
    margin: 10px auto;
    text-align: center;
  } */
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
  /* @media only screen and (max-width: 1576px) {
    .table {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }
  } */
</style>
