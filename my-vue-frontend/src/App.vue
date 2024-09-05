<template>
  <NavBarView />
  <main class="container-fluid">
    <LoadingSpinner v-if="isLoading" />
    <router-link to="/cart">View Cart ({{ cartItemCount }})</router-link>

    <router-view />
  </main>
  <FooterView />
</template>
<script>
import NavBarView from './components/NavbarView.vue';
import FooterView from './components/FooterView.vue';
import LoadingSpinner from '@/components/SpinnerView.vue';

export default {
  components: {
    NavBarView,
    FooterView,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    cartItemCount() {
      return this.$store.state.cart.length;
    },
  },
};
</script>

<style src="@/assets/css/style.css"></style>
