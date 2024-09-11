import { createStore } from 'vuex';
import axios from 'axios';

const apiUrl = 'https://capstoneproject-k8g5.onrender.com/';

export default createStore({
  state: {
    users: [],
    user: null,
    cart: [],
    selectedProduct: null,
    products: [],
    product: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.BookID === product.BookID);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },    
    updateCart(state, updatedProduct) {
      const index = state.cart.findIndex(item => item.BookID === updatedProduct.BookID);
      if (index !== -1) {
        state.cart.splice(index, 1, updatedProduct);
      }
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(item => item.BookID !== product.BookID);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get(`${apiUrl}users`);
        commit('setUsers', data.results);
      } catch (error) {
        console.error(error);
        alert('Failed to retrieve users.');
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const { data } = await axios.get(`${apiUrl}users/${id}`);
        commit('setUser', data.result);
      } catch (error) {
        console.error(error);
        alert('Failed to retrieve user.');
      }
    },
    async fetchProducts({ commit }) {
      try {
        const { data } = await axios.get(`${apiUrl}products`);
        commit('setProducts', data.results);
      } catch (error) {
        console.error(error);
        alert('Failed to retrieve products.');
      }
    },
    async registerNewUser({ dispatch, commit }, newUser) {
      try {
        const response = await axios.post(`${apiUrl}users/register`, newUser);
        const { data } = response.data;
        if (data.msg) {
          dispatch('fetchUsers');
          commit('setUser', data.user);
        }
      } catch (error) {
        alert('Failed to register user.');
      }
    },
    async updateUser({ commit }, userData) {
      try {
        const { data } = await axios.patch(`${apiUrl}users`, userData);
        if (data) {
          commit('fetchUsers');
          commit('setUser', data);
          alert('Update successful');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to update user.');
      }
    },
    async deleteUser({ dispatch }, id) {
      try {
        await axios.delete(`${apiUrl}users/delete/${id}`);
        dispatch('fetchUsers');
        console.log('User deleted successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to delete user.');
      }
    },
    async addProduct({ dispatch }, productData) {
      try {
        await axios.post(`${apiUrl}addProduct`, productData);
        dispatch('fetchProducts'); // Fetch updated product list
      } catch (error) {
        console.error(error);
        alert('Failed to add product.');
      }
    },
    async updateProduct({ dispatch }, productData) {
      try {
        const { data } = await axios.patch(`${apiUrl}updateProduct`, productData);
        if (data) {
          dispatch('fetchProducts');
          alert('Product updated successfully.');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to update product.');
      }
    },
    async deleteProduct({ dispatch }, id) {
      try {
        await axios.delete(`${apiUrl}products/delete/${id}`);
        dispatch('fetchProducts');
      } catch (error) {
        console.error(error);
        alert('Failed to delete product.');
      }
    },
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.Price * item.quantity, 0),
  },
});
