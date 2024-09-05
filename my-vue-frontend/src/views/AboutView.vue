<template>
  <div>
    <div class="container">
      <div class="row g-0 justify-content-center">
        <div class="col-md-6 d-flex justify-content-center">
          <img
            src="https://i.ibb.co/FXm0BPK/Novelty-Nook.png"
            class="img-fluid w-50"
            loading="lazy"
            alt="about"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <h4 class="card-title">Novelty Nook</h4>
          <p>
            <span class="about-content">
              'Novelty Nook: Embracing Asian Literary Culture' Welcome to Novelty
              Nook, a haven for book lovers seeking to immerse themselves in the
              rich tapestry of Asian literature and culture. Nestled in the heart of
              the city, our bookstore offers a unique and curated collection of
              books that celebrate the diversity and depth of Asian literary
              traditions. Step inside and let the scent of fresh pages and ink
              transport you to a world where stories come alive. Our shelves are
              adorned with works ranging from classic masterpieces to contemporary
              bestsellers, spanning genres such as fiction, poetry, memoirs, and
              more. At Novelty Nook, we understand the importance of representation
              and inclusion. That's why we take pride in showcasing voices from
              across the Asian diaspora, ensuring that every reader can find
              themselves reflected in the pages of our books. Whether you're
              exploring the intricacies of Japanese haiku, delving into the
              complexities of Chinese historical fiction, or discovering the vibrant
              narratives of South Asian literature, there's something here for
              everyone to enjoy. But Novelty Nook is more than just a bookstore—it's
              a cultural hub where enthusiasts can gather to discuss, learn, and
              engage with Asian literature in all its forms. Join us for author
              readings, book clubs, and workshops that offer deeper insights into
              the themes and motifs that define Asian storytelling traditions. In
              addition to our vast selection of books, we also offer a cozy reading
              nook where you can relax and lose yourself in the pages of your latest
              find. Sip on a cup of fragrant tea as you journey through the literary
              landscapes of Asia, allowing yourself to be transported to distant
              lands and different times with each turn of the page. Whether you're a
              seasoned bibliophile or just beginning your exploration of Asian
              literature, Novelty Nook welcomes you with open arms. Come, discover
              the magic of storytelling and celebrate the beauty of Asian literary
              culture with us.
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-title {
  margin-top: 1rem;
}

.about-content {
  margin-top: 1rem;
  padding: 1rem;
  max-height: 30rem; /* Maximum height for scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  text-align: justify; /* Improve text readability */
}

@media screen and (max-width: 500px) {
  .about-content {
    height: 10rem; /* Reduced height for smaller screens */
    scroll-snap-type: y mandatory;
  }
}
</style>

