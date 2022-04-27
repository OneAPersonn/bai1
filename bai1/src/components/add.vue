<template>
  <form>
  <div class="mb-3">
    <label for="usernameInput">Username</label>
    <input type="text" class="form-control" id="usernameInput" v-model="user.username">
  </div>
  <div class="mb-3">
    <label for="passwordInput">Password</label>
    <input type="text" class="form-control" id="passwordInput" v-model="user.password" >
  </div>
  <div class="mb-3">
    <label for="fnameInput">Lastname</label>
    <input type="text" class="form-control" id="fnameInput" v-model="user.fname" >
  </div>
  <div class="mb-3">
    <label for="lnameInput">Fullname</label>
    <input type="text" class="form-control" id="lnameInput" v-model="user.lname" >
  </div>
  <select class="form-select" v-model="user.activity">
  <option selected>Choose</option>
  <option value="1">Ready</option>
  <option value="2">Busy</option>
</select>
  <button type="submit" class="btn btn-primary" @click="clickSave(null)">Save</button>
</form>
</template>

<script>
export default {
    name: 'add ',
    props: {
      user: Object
    },
    methods: {
      clickSave() {
        this.$emit('save', this.user)
      }
    }
}
</script>

<style>

</style>