<template>
  <div class="container">
    <div class="row">

      <div class="input-group col-md-4 mb-3">
        <date-picker class="datechoice" v-model="dateRange" range :shortcuts="shortcuts" placeholder="开始日期-结束日期"></date-picker>
        <p>{{dateRange}}</p>
      </div>
      <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="ticketStatus">状态</label>
        </div>
        <select class="custom-select" id="ticketStatus">
          <option selected>全部</option>
          <option value="ready">待出票</option>
          <option value="waiting">待处理</option>
          <option value="open">已出票</option>
          <option value="cancel">已取消</option>
        </select>
      </div>
      <div class="input-group col-md-3 mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="operator">人员</label>
        </div>
        <select class="custom-select" id="operator">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-info" type="button" name="search">查询</button>
      </div>

      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">记录时间</th>
            <th scope="col">航段信息</th>
            <th scope="col">拉位点</th>
            <th scope="col">备注</th>
            <th scope="col">总价</th>
            <th scope="col">可出票价格</th>
            <th scope="col">最晚出票时间</th>
            <th scope="col">乘机人</th>
            <th scope="col">操作人员</th>
            <th scope="col">状态</th>
            <th scope="col">订单号</th>
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
            <td></td>
            <td>512</td>
            <td>775</td>
            <td></td>
            <td>姓名：ZHANG/LINGXI MR</td>
            <td>束海花</td>
            <td>待处理</td>
            <td>2201803227434</td>
            <td>详细</td>
            <td><button>删除</button></td>
          </tr>
          <tr>
            <th scope="row">2018-03-22 13:28:11</th>
            <td>    1.ZHANG/LINGXI MR KFB63Z
 2.  AA178    SU27MAY  MCOLAX HK1   1612 1842          E
SSR DOCS AA HK1 P/CN/E34297079/CN/03FEB00/M/25JAN19/ZHANG/LINGXI MR/P1 </td>
            <td></td>
            <td></td>
            <td>512</td>
            <td>775</td>
            <td></td>
            <td>姓名：ZHANG/LINGXI MR</td>
            <td>束海花</td>
            <td>待处理</td>
            <td>2201803227434</td>
            <td>详细</td>
            <td><button>删除</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'

  export default {
    components: { DatePicker },
    data() {
      return {
        dateRange: '',
        shortcuts: [
          {
            text: 'Today',
            start: new Date(),
            end: new Date()
          }
        ]
      }
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
