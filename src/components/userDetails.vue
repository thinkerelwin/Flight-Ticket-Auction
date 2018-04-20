<template>
    <!-- Modal -->
    <div class="modal fade" :id="'SpecificUser' + index" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">编辑公司</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form @submit.prevent="reviseUser">
            <div class="modal-body">
              <fieldset>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <label class="input-group-text"><i class="fas fa-user"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         :value="user.name"
                         placeholder="name"
                         aria-label="name"
                         readonly>
                </div>
                <div class="input-group mb-3" :class="{invalid: $v.user.cooperation.$error}">
                  <div class="input-group-prepend">
                      <label class="input-group-text icon-badge"><i class="fas fa-id-badge"></i></label>
                  </div>
                  <input type="text"
                         class="form-control"
                         @blur="$v.user.cooperation.$touch()"
                         v-model="user.cooperation"
                         placeholder="Nick name"
                         aria-label="Nick name">
                </div>
                <p v-if="$v.user.cooperation.$error">Don't leave this empty</p>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <label class="input-group-text icon-users"><i class="fas fa-users"></i></label>
                  </div>
                  <!-- use belongGroup() so it can load the value when elements are created -->
                  <select class="custom-select" :id="'groupName' + index" @input="$v.user.group.$touch()">
                    <option v-for="(thisGroup, i) in groupList" :value="thisGroup.name" :key="i">{{thisGroup.name}}</option>
                  </select>
                  <p>{{user.group}}</p>
                </div>
                <div class="form-check form-check-inline">
                  <i class="fas fa-plane"></i>
                  <input class="form-check-input" type="checkbox" :id="'airline1-' + index" value="AA" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline1">AA</label>
                  <input class="form-check-input" type="checkbox" :id="'airline2-' + index" value="DL" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline2">DL</label>
                  <input class="form-check-input" type="checkbox" :id="'airline3-' + index" value="UA" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline3">UA</label>
                  <input class="form-check-input" type="checkbox" :id="'airline4-' + index" value="CA" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline4">CA</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input left-margin" type="checkbox" :id="'airline5-' + index" value="MU" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label margin-left" for="airline5">MU</label>
                  <input class="form-check-input" type="checkbox" :id="'airline6-' + index" value="CX" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline6">CX</label>
                  <input class="form-check-input" type="checkbox" :id="'airline7-' + index" value="OTHER" @input="$v.user.flight.$touch()" v-model="user.flight">
                  <label class="form-check-label" for="airline7">OTHER</label>
                </div>
              </fieldset>
              <p>{{warningMessage}}</p>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary btn-block" :disabled="$v.user.$invalid">编辑</button>
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
  props: ['groupList', 'groupSelection', 'user', 'index', 'getUser'],
  data () {
    return {
      // name: '',
      // password: '',
      // cooperation: '',
      group: null
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
    belongGroup () {
      let self = this

      function whichGroup (itemID) {
        return itemID._id.$oid === self.user.group.$oid
      }
      return (this.groupList.find(whichGroup)).name
    },
    reviseUser () {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + this.idToken
        }
      }

      axios.patch('api/user', {
        name: this.user.name,
        cooperation: this.user.cooperation,
        // group: this.user.group,
        group: this.group,
        flight: this.user.flight
      }, authHeader).then(res => {
        this.getUser(this.groupSelection)
      }).catch(error => console.log(error))
    }
  },
  validations: {
    user: {
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
