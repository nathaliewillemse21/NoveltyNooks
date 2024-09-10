<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h3>Login</h3>
      <hr />
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" required />
          <div class="error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" required />
          <div class="error" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="my-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
      <router-link to="/signup" class="btn btn-link">Don't have an account? Sign Up</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    async handleLogin() {
      this.errors = {};
      try {
        await(this.email, this.password);
        this.$router.push("/library");
      } catch (error) {
        this.errors.general = error.message;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 5px;
}
</style>
