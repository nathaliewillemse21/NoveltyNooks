<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/library">Library</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkout">Checkout</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>

        <!-- Cart Button at the End of Navbar -->
        <router-link to="/cart" class="btn ms-auto custom-cart-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
            />
          </svg>
          <span class="cart-count">( {{ cartItemCount }} )</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarView',
  computed: {
    cartItemCount() {
      return this.$store.state.cart.length;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: darkgrey;
}

.navbar-nav {
  align-items: center; /* Center items vertically */
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.1); /* Light border for better visibility */
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,..."); /* Use custom icon if needed */
}

.navbar-nav .nav-link {
  color: #fff;
}

.navbar-nav .nav-link:hover {
  color: #ccc;
}

/* Cart Button Custom Styles */
.custom-cart-btn {
  color: #fff;
  display: flex;
  align-items: center;
}

.cart-count {
  color: white; /* Ensure the cart count text is white */
  margin-left: 5px;
}

/* Custom styles for mobile view */
@media (max-width: 767.98px) {
  .navbar-nav {
    text-align: center; /* Center text on small screens */
  }
}
</style>
