<!-- Checkout.vue -->
<template>
    <div class="checkout">
      <h2>Checkout</h2>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.BookID" class="checkout-item">
          <h3>{{ item.Title }}</h3>
          <p>Price: R{{ item.Price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <div class="checkout-total">
          <h3>Total: R{{ cartTotal }}</h3>
          <button @click="checkout">Place Order</button>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty. <router-link to="/">Go back to shopping.</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cartItems() {
        return this.$store.state.cart;
      },
      cartTotal() {
        return this.cartItems.reduce((total, item) => {
          return total + item.Price * item.quantity;
        }, 0);
      },
    },
    methods: {
      checkout() {
        // Implement checkout logic, such as sending order to the backend
        alert('Order placed successfully!');
        this.$store.commit('clearCart');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout {
    padding: 20px;
  }
  
  .checkout-item {
    margin-bottom: 20px;
  }
  
  .checkout-total {
    text-align: right;
    margin-top: 20px;
  }
  </style>
  