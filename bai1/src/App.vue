<template>
  <div id="app">
    <div class="row">
      <div class="col-2">Danh sách người dùng</div>
      <div class="col-2 offset-8"></div>
    </div>
    <div class="list">
      <table class="table">
        <thead>
          <tr>
            <!-- <th scope="col">Id</th> -->
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Fullname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Activity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.fname }}</td>
            <td>{{ item.lname }}</td>
            <td>{{ item.activity }}</td>
            <td class="button">
              <button
                type="button"
                class="btn btn-primary"
                @click="clickEdit(item)"
              >
                Edit
              </button>
              <button type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <form>
        <input v-model="user.username" placeholder="Username" type="text" />
      </form>
      <form>
        <input v-model="user.password" placeholder="Password" type="text" />
      </form>
      <form>
        <input v-model="user.lname" placeholder="Lastname" type="text" />
      </form>
      <form>
        <input v-model="user.fname" placeholder="Fullname" type="text" />
      </form>
      <form>
        <input v-model="user.activity" placeholder="Status" type="text" />
      </form>
      <!--      <add :user="user" @save="clickSave"></add>-->
      <button @click="clickSave(null)">Add</button>
    </div>
  </div>
</template>

<script>
import add from "./components/add.vue";
import axios from "axios";
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          username: "John",
          password: "1234567",
          fname: "John",
          lname: "John Wick",
          activity: "Ready",
        },
        {
          id: 2,
          username: "Hoa",
          password: "1234567",
          fname: "Hoa",
          lname: "Thi Hoa",
          activity: "Ready",
        },
        {
          id: 3,
          username: "David",
          password: "1234567",
          fname: "Henry",
          lname: "David Henry",
          activity: "Ready",
        },
      ],
      user: {
        username: "",
        password: "",
        fname: "",
        lname: "",
        activity: 0,
      },
    };
  },
  // // data() {
  // //   return {
  // //     user: {id:0,username:'',password:'',lastname:'',fullname:''}
  // //   };
  // },
  components: {
    add: add,
  },
  methods: {
    clickAdd() {
      let user = {
        id: Math.floor(Math.random() * 100000),
        username: "",
        password: "",
        fname: "",
        lname: "",
        activity: "",
      };
      this.user = user;
    },
    clickSave() {
var data = JSON.stringify({
  "username": "a",
  "password": "p",
  "fname": "f",
  "lname": "l",
  "activity": 1
});

var config = {
  method: 'post',
  url: 'http://192.168.113.29:8080/api/v1/Products/insert',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
      // axios.get("http://192.168.113.29:8080/api/v1/Products/insert")
      // .then(response => this.userId = response.data.id);
    },
    clickEdit(user) {
      this.user = user;
    },
    
    name: "post-request",
  data() {
    return {
      userId: null
    };
  },
  created() {
  //   const user = { title: "Vue POST Request Example" };
  //   const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: apiKey,
  // };
  // const url = "localhost:5000/api/expenses/get-expenses";

  // axios.get(url, { headers });
  //   axios.post("http://192.168.113.29:8080/api/v1/Products/insert",headers, this.user)
  //     .then(response => this.userId = response.data.id);
var axios = require('axios');
var data = JSON.stringify({
  "username": "a",
  "password": "p",
  "fname": "f",
  "lname": "l",
  "activity": 1
});

var config = {
  method: 'post',
  url: 'http://192.168.113.29:8080/api/v1/Products/insert',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log("request after created: ", JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

  }

  
  },
};


</script>

<style>
.container {
    width: 50%;
    text-align: center;
}

.col-2 {
  text-align: center;
  font-weight: bold;
  font-style: 20px;
  color: blue;
}
.row {
  margin-top: 25px;
  margin-bottom: 20px;
  align-items: center;
}
.list {
  margin: 0 100px 0 60px;
}
.activity-button {
  text-align: center;
}
.activity-button .btn-primary {
  margin-right: 10px;
}
.search .btn-outline-success {
  font-size: 10px;
}
</style>