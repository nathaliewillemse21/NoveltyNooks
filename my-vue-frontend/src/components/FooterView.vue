<template>
  <div class="container-fluid">
    <footer class="footer">
      <p class="lead">Novelty Nook &copy; {{ currYear }}</p>
      <div class="icons">
        <!-- Placeholder for social media or other icons -->
        <i
          class="icon fa fa-facebook"
          @mouseover="hoverIcon"
          @mouseout="resetHover"
        ></i>
        <i
          class="icon fa fa-twitter"
          @mouseover="hoverIcon"
          @mouseout="resetHover"
        ></i>
        <i
          class="icon fa fa-instagram"
          @mouseover="hoverIcon"
          @mouseout="resetHover"
        ></i>
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currYear: new Date().getFullYear(),
    };
  },
  methods: {
    hoverIcon(event) {
      event.target.classList.add('hovered');
    },
    resetHover(event) {
      event.target.classList.remove('hovered');
    },
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: darkgrey;
  color: #121111;
  text-align: center;
  /* padding: 10px 0; */
}

.icon {
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.icon:hover {
  color: #007bff; /* Change color on hover */
  transform: scale(1.1); /* Slightly enlarge on hover */
}

.icons {
  margin-top: 10px;
}

.icons i {
  margin: 0 10px;
}
</style>
