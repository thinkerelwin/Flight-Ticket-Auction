<template>
    <!-- Modal -->
    <div class="modal fade" id="UserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">公司注册</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form>
            <div class="modal-body">
              <fieldset>
                <div class="input-group mb-3" :class="{invalid: $v.username.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text"><i class="fas fa-user"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         @blur="$v.username.$touch()"
                         v-model="username"
                         placeholder="Username"
                         aria-label="Username">
                </div>
                <p v-if="$v.username.$error">Don't leave this empty</p>
                <div class="input-group mb-3" :class="{invalid: $v.password.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text icon-lock"><i class="fas fa-lock"></i></label>
                  </div>
                  <input type="password"
                         class="form-control"
                         @blur="$v.password.$touch()"
                         v-model="password"
                         placeholder="Password"
                         aria-label="Password">
                </div>
                <p v-if="$v.password.$error">Don't leave this empty</p>
                <div class="input-group mb-3" :class="{invalid: $v.cooperation.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text icon-badge"><i class="fas fa-id-badge"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         @blur="$v.cooperation.$touch()"
                         v-model="cooperation"
                         placeholder="Nick name"
                         aria-label="Nick name">
                </div>
                <p v-if="$v.cooperation.$error">Don't leave this empty</p>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <label class="input-group-text icon-users"><i class="fas fa-users"></i></label>
                  </div>
                  <select class="custom-select" id="groupName" @input="$v.group.$touch()" v-model="group">
                    <option v-for="(thisGroup, i) in groupList" :value="thisGroup.name" :key="i">{{thisGroup.name}}</option>
                  </select>
                  <!-- <p>{{group}}</p> -->
                </div>
                <div class="form-check form-check-inline">
                  <i class="fas fa-plane"></i>
                  <input class="form-check-input" type="checkbox" id="airline1" value="AA" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline1">AA</label>
                  <input class="form-check-input" type="checkbox" id="airline2" value="DL" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline2">DL</label>
                  <input class="form-check-input" type="checkbox" id="airline3" value="UA" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline3">UA</label>
                  <input class="form-check-input" type="checkbox" id="airline4" value="CA" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline4">CA</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="airline5" value="MU" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label margin-left" for="airline5">MU</label>
                  <input class="form-check-input" type="checkbox" id="airline6" value="CX" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline6">CX</label>
                  <input class="form-check-input" type="checkbox" id="airline7" value="OTHER" @input="$v.flight.$touch()" v-model="flight">
                  <label class="form-check-label" for="airline7">OTHER</label>
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
// import axios from 'axios'

export default {
  props: ['groupList', 'groupSelection', 'getUser'],
  data () {
    return {
      username: null,
      password: null,
      cooperation: null,
      group: null,
      flight: []
    }
  },
  computed: {
    warningMessage () {
      return this.$store.getters.warningMessage
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('signup', {
        auth: 'agent',
        username: this.username,
        password: this.password,
        cooperation: this.cooperation,
        group: this.group,
        flight: this.flight
      })
      this.username = null
      this.password = null
      this.cooperation = null
      this.group = null
      this.flight = []

      this.$v.$reset() // set the detect state($dirty) to false

      this.getUser(this.groupSelection)

      // this.$v.username.$error = false,
      // this.$v.password.$error = false,
      // this.$v.group.$error = false
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    },
    cooperation: {
      required
    },
    group: {
      required
    },
    flight: {
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
  #airline5 {
    margin-left: 40.5px;
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
