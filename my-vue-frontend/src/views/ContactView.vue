<template>
  <div class="container">
    <div class="row">
      <div id="view" class="col-12 text-center mb-4">
        <h2>Contact Us</h2>
      </div>
      <div class="col-md-6">
        <form action="https://formspree.io/f/mdoqovvq" method="POST">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputContact1" class="form-label">Contact Number</label>
            <input
              type="number"
              name="contact"
              class="form-control"
              id="exampleInputContact1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputMessage1" class="form-label">Message</label>
            <textarea
              name="message"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img
          src="https://i.ibb.co/FXm0BPK/Novelty-Nook.png"
          class="img-fluid"
          loading="lazy"
          alt="about"
        />
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    name: 'ContactView',
  };
  </script>
  
  <style scoped>

/* Ensure the form and image are responsive */
@media (max-width: 768px) {
  .img-fluid {
    max-width: 100%; /* Image will not overflow the container */
  }
}

@media (max-width: 576px) {
  .form-control {
    font-size: 0.875rem; /* Adjust font size for smaller screens */
  }

  .btn {
    width: 100%; /* Make the button full-width on very small screens */
  }
}
</style>

  