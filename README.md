# Flight-Ticket-Auction

User Story:

A website let the owner add flight route order that can be seen by specific agents, those agents may join this auction if they got available space, when owner and agent both agree on that price, the owner will select the winning bidder, then deal are closed.

Different groups have their own authorization, some columns are readonly, some are editable.

Users can only see their own bidding price, not others.

訂單流程：訂單成立 => "待估價" -- 業者出價, 業主接受報價 => "待出票" -- 得標者填入票號、訂位代碼 => "已出票"

Visit it via the link near the head or <a href="http://ticket-auction.surge.sh/">here</a> .

## Architecture & Functions

<ul>
  <li>Single Page Application(SPA)</li>
  <li>Authenticaiton & Authorization</li>
  <li>User will stay log in for 1 hr</li>
  <li>Form validation on minimum length and require field</li>
  <li>CRUD on order, users and groups</li>
  <li>DatePicker & Paginator</li>
</ul>

## Package Used

<ul>
  <li>vue</li>
  <li>vuex</li>
  <li>vue-router</li>
  <li>axios</li>
  <li>bootstrap</li>
  <li>font awesome</li>
  <li>vuelidate</li>
  <li>vue2-datepicker</li>
  <li>vue-pagination-2</li>
</ul>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
