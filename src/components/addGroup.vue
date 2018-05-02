<template>
    <!-- Modal -->
    <div class="modal fade" id="GroupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">群组注册</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form>
            <div class="modal-body">
              <fieldset>
                <div class="input-group mb-3" :class="{invalid: $v.groupName.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text"><i class="fas fa-user"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         @blur="$v.groupName.$touch()"
                         v-model="groupName"
                         placeholder="GroupName"
                         aria-label="GroupName">
                </div>
                <p v-if="$v.groupName.$error">Don't leave this empty</p>

                <div class="edit-css">
                  <div class="form-check form-check-inline">
                    <i class="fas fa-edit"></i>
                    <input class="form-check-input" type="checkbox" id="editOption1" value="flightMsg" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption1">航班资料</label>
                    <input class="form-check-input" type="checkbox" id="editOption2" value="price" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption2">价格</label>
                    <input class="form-check-input" type="checkbox" id="editOption3" value="commitprice" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption3">最后价格</label>
                    <input class="form-check-input" type="checkbox" id="editOption4" value="passenger" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption4">乘客资料</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="editOption5" value="deadline" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label margin-left" for="editOption5">最后期限</label>
                    <input class="form-check-input" type="checkbox" id="editOption6" value="isRush" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption6">是否加急</label>
                    <input class="form-check-input" type="checkbox" id="editOption7" value="flight" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption7">航班</label>
                    <input class="form-check-input" type="checkbox" id="editOption8" value="status" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption8">状态</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="editOption9" value="logs" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption9">操作纪录</label>
                    <input class="form-check-input" type="checkbox" id="editOption10" value="datetime" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption10">建立时间</label>
                    <input class="form-check-input" type="checkbox" id="editOption11" value="recordLocator" @input="$v.editable.$touch()" v-model="editable">
                    <label class="form-check-label" for="editOption11">航班位置</label>
                  </div>
                </div>

                <div class="read-css">
                  <div class="form-check form-check-inline">
                    <i class="fas fa-book"></i>
                    <input class="form-check-input" type="checkbox" id="readOption1" value="flightMsg" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption1">航班资料</label>
                    <input class="form-check-input" type="checkbox" id="readOption2" value="price" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption2">价格</label>
                    <input class="form-check-input" type="checkbox" id="readOption3" value="commitprice" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption3">最后价格</label>
                    <input class="form-check-input" type="checkbox" id="readOption4" value="passenger" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption4">乘客资料</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="readOption5" value="deadline" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label margin-left" for="readOption5">最后期限</label>
                    <input class="form-check-input" type="checkbox" id="readOption6" value="isRush" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption6">是否加急</label>
                    <input class="form-check-input" type="checkbox" id="readOption7" value="flight" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption7">航班</label>
                    <input class="form-check-input" type="checkbox" id="readOption8" value="status" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption8">状态</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="readOption9" value="logs" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption9">操作纪录</label>
                    <input class="form-check-input" type="checkbox" id="readOption10" value="datetime" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption10">建立时间</label>
                    <input class="form-check-input" type="checkbox" id="readOption11" value="recordLocator" @input="$v.readable.$touch()" v-model="readable">
                    <label class="form-check-label" for="readOption11">航班位置</label>
                  </div>
                </div>

              </fieldset>
              <p>{{warningMessage}}</p>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary btn-block" @click="onSubmit" data-dismiss="modal" :disabled="$v.$invalid">注册</button>
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
  props: ['groupList', 'getGroup'],
  data () {
    return {
      groupName: null,
      editable: [],
      readable: []
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
    onSubmit () {
      // console.log(formData)
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      const formData = {
        name: this.groupName,
        edit: this.editable,
        read: this.readable
      }

      console.log(formData)

      axios.post('api/groups', formData, authHeader)
        .then(res => {
          console.log(res)

          this.groupName = null
          this.editable = []
          this.readable = []

          this.$v.$reset() // set the detect state($dirty) to false
          this.getGroup()
          // console.log(this.dateRange ,this.status)
        })
        .catch(error => console.log(error))
    }
  },
  validations: {
    groupName: {
      required
    },
    readable: {
      required
    },
    editable: {
      required
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
  /* .form-check-inline svg {
    margin-right: 0.8rem;
  } */
  .fa-edit {
    margin-right: 0.8rem;
  }
  .fa-book {
    margin-right: 1.05rem;
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
  #editOption5,
  #editOption9,
  #readOption5,
  #readOption9 {
    margin-left: 30.8px;
  }
  .edit-css,
  .read-css {
    margin: 3%;
  }
  .invalid select,
  .invalid input {
    border-color: #dc3545;
  }
  /*
  .invalid p {
    font-size: 14px;
    color: #dc3545;
  }
  .red {
    color: red;
    margin-right: 10px;
  } */
</style>
