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
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBarView',
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
  
  /* Custom styles for mobile view */
  @media (max-width: 767.98px) {
    .navbar-nav {
      text-align: center; /* Center text on small screens */
    }
  }
  </style>
  