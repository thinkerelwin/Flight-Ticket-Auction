<template>
    <!-- Modal -->
    <div class="modal fade" :id="'SpecificGroup' + index" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">编辑群组</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form>
            <div class="modal-body">
              <fieldset>
                <div class="input-group mb-3" :class="{invalid: $v.group.name.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text"><i class="fas fa-user"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         @blur="$v.group.name.$touch()"
                         v-model="group.name"
                         placeholder="GroupName"
                         aria-label="GroupName">
                  <!-- <select class="custom-select" :id="'specificGroupName' + index" @blur="$v.group.name.$touch()" v-model="group.name">
                    <option v-for="(thisGroup, i) in groupList" :value="thisGroup.name" :key="i" :selected="group.name === thisGroup.name">{{thisGroup.name}}</option>
                  </select> -->
                </div>
                <p v-if="$v.group.name.$error">Don't leave this empty</p>

                <div class="edit-css">
                  <div class="form-check form-check-inline">
                    <i class="fas fa-edit"></i>
                    <input class="form-check-input" type="checkbox" id="detailEditOption1" value="flightMsg" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption1">航班资料</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption2" value="price" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption2">价格</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption3" value="commitprice" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption3">最后价格</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption4" value="passenger" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption4">乘客资料</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="detailEditOption5" value="deadline" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label margin-left" for="detailEditOption5">最后期限</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption6" value="isRush" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption6">是否加急</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption7" value="flight" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption7">航班</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption8" value="status" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption8">状态</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption9" value="logs" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption9">操作纪录</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="detailEditOption10" value="datetime" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption10">建立时间</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption11" value="recordLocator" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption11">航班位置</label>
                    <input class="form-check-input" type="checkbox" id="detaiEditdOption12" value="auction" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption12">竞价</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption13" value="auctionLog" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption13">竞价纪录</label>
                    <input class="form-check-input" type="checkbox" id="detailEditOption14" value="winningBidder" @input="$v.group.edit.$touch()" v-model="group.edit">
                    <label class="form-check-label" for="detailEditOption14">得标者</label>
                  </div>
                </div>

                <div class="read-css">
                  <div class="form-check form-check-inline">
                    <i class="fas fa-book"></i>
                    <input class="form-check-input" type="checkbox" id="detailReadOption1" value="flightMsg" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption1">航班资料</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption2" value="price" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption2">价格</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption3" value="commitprice" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption3">最后价格</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption4" value="passenger" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption4">乘客资料</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="detailReadOption5" value="deadline" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label margin-left" for="detailReadOption5">最后期限</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption6" value="isRush" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption6">是否加急</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption7" value="flight" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption7">航班</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption8" value="status" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption8">状态</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption9" value="logs" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption9">操作纪录</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="detailReadOption10" value="datetime" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption10">建立时间</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption11" value="recordLocator" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption11">航班位置</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption12" value="auction" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption12">竞价</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption13" value="auctionLog" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption13">竞价纪录</label>
                    <input class="form-check-input" type="checkbox" id="detailReadOption14" value="winningBidder" @input="$v.group.read.$touch()" v-model="group.read">
                    <label class="form-check-label" for="detailReadOption14">得标者</label>
                  </div>
                </div>

              </fieldset>
              <p>{{warningMessage}}</p>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary btn-block" @click="reviseGroup" data-dismiss="modal" :disabled="$v.$invalid">修改</button>
            </div>

          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  props: ['groupList', 'group', 'index', 'getGroup'],
  data () {
    return {
      // name: '',
      // password: '',
      // cooperation: '',
    //   group: null
      // flight: []
    }
  },
  computed: {
    warningMessage () {
      return this.$store.getters.warningMessage
    },
    idToken () {
      return this.$store.getters.idToken
    }
  },
  methods: {
    reviseGroup () {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/groups', {
        id: this.group._id.$oid,
        name: this.group.name,
        edit: this.group.edit,
        read: this.group.read
      }, authHeader).then(res => {
        console.log(res)
        this.getGroup()
      }).catch(error => console.log(error))
    }
  },
  validations: {
    group: {
      name: {
        required
      },
      read: {
        required
      },
      edit: {
        required
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  fieldset .input-group {
    margin-bottom: 2rem;
  }
  p {
    color: red;
  }
  .form-check-inline label {
    margin-right: 0.6rem;
  }
  .form-check-inline svg {
    margin-right: 0.8rem;
  }
  .icon-badge {
    padding-left: 14px;
    padding-right: 14px;
  }
  .icon-lock {
    padding-left: 13px;
    padding-right: 13px;
  }
  .icon-users {
    height: 38px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .fa-plane {
    color: orange;
    margin-left: 10px;
  }
  #detailEditOption5,
  #detailEditOption10 {
    margin-left: 29px;
  }
  #detailReadOption5,
  #detailReadOption10 {
    margin-left: 25.8px;
  }
  .edit-css,
  .read-css {
    margin: 3%;
  }
  .left-margin {
    margin-left: 38.75px;
  }
  #airline5 {
    margin-left: 40.5px;
  }
  .invalid select,
  .invalid input {
    border-color: #dc3545;
  }
</style>
