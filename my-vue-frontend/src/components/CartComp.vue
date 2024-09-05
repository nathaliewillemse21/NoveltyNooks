<!-- Cart.vue -->
<template>
    <div class="cart">
      <h2>Your Cart</h2>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.BookID" class="cart-item">
          <img :src="item.Cover" alt="Product Image" />
          <div class="cart-details">
            <h3>{{ item.Title }}</h3>
            <p>Price: R{{ item.Price }}</p>
            <p>Quantity: 
              <input type="number" v-model.number="item.quantity" min="1" @change="updateCart(item)" />
            </p>
            <button @click="removeFromCart(item)">Remove</button>
          </div>
        </div>
        <div class="cart-total">
          <h3>Total: R{{ cartTotal }}</h3>
          <router-link to="/checkout" class="btn btn-primary">Proceed to Checkout</router-link>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
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
      updateCart(item) {
        this.$store.commit('updateCart', item);
      },
      removeFromCart(item) {
        this.$store.commit('removeFromCart', item);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .cart-item {
    display: flex;
    margin-bottom: 20px;
  }
  
  .cart-item img {
    width: 100px;
    height: auto;
    margin-right: 20px;
  }
  
  .cart-details {
    flex: 1;
  }
  
  .cart-total {
    text-align: right;
    margin-top: 20px;
  }
  </style>
  