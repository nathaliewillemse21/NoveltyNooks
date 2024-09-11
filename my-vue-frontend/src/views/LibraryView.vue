<template>
  <div class="body-background">
    <div class="filter-container">
      <div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
        />
      </div>
      <div class="sort-container">
        <label for="sortCategory">Sort by Category:</label>
        <select id="sortCategory" @change="selectCategory">
          <option value="default">Default</option>
          <option value="Chinese manhua">Chinese manhua</option>
          <option value="Japanese manga">Japanese manga</option>
          <option value="Korean manhwa">Korean manhwa</option>
        </select>
      </div>
    </div>
    <div v-if="selectedCategory !== 'default'" class="category-heading">
      <h1>{{ categoryHeading }}</h1>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-md-6"
          v-for="product in filteredProducts"
          :key="product.BookID"
        >
          <div class="card mb-3">
            <img
              :src="product.Cover"
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body">
              <h2 class="card-title">{{ product.Title }}</h2>
              <p class="card-text">Tags: {{ product.Tags }}</p>
              <p class="card-text product-content">
                Summary: "{{ product.Summary }}"
              </p>
              <p class="card-text">Price: R{{ product.Price }}</p>
              <div class="actions">
                <div class="actions">
  <button @click="addProductToCart(product)" class="btn btn-dark">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
  </button>
  <button @click="editProduct(product)" class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> </button>

</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add modal for editing a product -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <input type="text" v-model="editableProduct.Title" placeholder="Title" />
        <input type="text" v-model="editableProduct.Tags" placeholder="Tags" />
        <textarea v-model="editableProduct.Summary" placeholder="Summary"></textarea>
        <input type="number" v-model="editableProduct.Price" placeholder="Price" />
        <button @click="updateProduct">Save Changes</button>
        <button @click="closeEditModal">Cancel</button>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <button @click="addProduct">Upload</button>
    </div>
  </div>
</template>

  
 
<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      showEditModal: false,
      editableProduct: null,
      file: {
        'Chinese Manhua': null,
        'Japanese Manga': null,
        'Korean Manhwa': null,
      },
      searchQuery: '',
      selectedCategory: 'default',
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    sortedProducts() {
      const categoryPriority = [
        'Chinese manhua',
        'Japanese manga',
        'Korean manhwa',
      ];

      return this.products.slice().sort((a, b) => {
        const priorityA = categoryPriority.indexOf(a.Category);
        const priorityB = categoryPriority.indexOf(b.Category);

        return priorityA - priorityB;
      });
    },
    filteredProducts() {
      return this.sortedProducts.filter((product) => {
        const titleMatch = product.Title.toLowerCase().includes(
          this.searchQuery.toLowerCase()
        );
        const categoryMatch =
          this.selectedCategory === 'default' ||
          product.Category === this.selectedCategory;
        return titleMatch && categoryMatch;
      });
    },
    categoryHeading() {
      switch (this.selectedCategory) {
        case 'Chinese manhua':
          return 'Chinese Manhua';
        case 'Japanese manga':
          return 'Japanese Manga';
        case 'Korean manhwa':
          return 'Korean Manhwa';
        default:
          return '';
      }
    },
  },
  methods: {
    showAddProductModal() {
      this.showModal = true;
    },
    handleFileChange(category, event) {
      this.file[category] = event.target.files[0];
    },
    selectCategory(event) {
      this.selectedCategory = event.target.value;
    },
    addProductToCart(product) {
      this.$store.dispatch('addToCart', product);
      alert('Product added successfully');
    },
    addProduct() {
      const formData = new FormData();
      for (const category in this.file) {
        if (this.file[category]) {
          formData.append(category, this.file[category]);
        }
      }
      // Make an API call to add the product
      axios
        .post('https://capstoneproject-k8g5.onrender.com/products/addProduct', formData)
        .then((response) => {
          console.log('Product added successfully:', response.data);
          this.$store.dispatch('fetchProducts');
          this.showModal = false;
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    },
    editProduct(product) {
      this.editableProduct = { ...product };
      this.showEditModal = true;
    },
    updateProduct() {
      axios
        .put(`https://capstoneproject-k8g5.onrender.com/products/updateProduct/${this.editableProduct.BookID}`, this.editableProduct)
        .then((response) => {
          console.log('Product updated successfully:', response.data);
          this.$store.dispatch('fetchProducts');
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editableProduct = null;
    },
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

  
<style scoped>
/* Base Styles */
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
}

.card img {
  display: block;
  margin: 0 auto; /* Center the image horizontally */
  max-width: 100%; /* Ensure image fits within the card */
  height: auto; /* Maintain aspect ratio */
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  flex: 0 0 48%; /* Ensure buttons take about 48% of the available space */
  display: flex;
  justify-content: center;
  align-items: center;
} 

input[type="text"],
select {
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

.product-content {
  overflow-y: scroll;
  height: 10rem;
  scroll-snap-type: y mandatory;
}

/* Large Screens (Desktops) */
@media screen and (min-width: 1024px) {
  .card {
    margin: 20px;
  }
}

/* Tablets */
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .filter-container {
    flex-direction: column; /* Stack search and sort vertically */
  }

  .search-container,
  .sort-container {
    margin: 0.5rem 0;
  }

  .card {
    margin: 15px;
  }

  .btn {
    flex: 0 0 100%; /* Stack buttons vertically */
    margin-bottom: 10px;
  }

  .product-content {
    height: 8rem; /* Adjust height for smaller screens */
  }
}

/* Mobile Devices */
@media screen and (max-width: 767px) {
  .filter-container {
    flex-direction: column; /* Stack search and sort vertically */
  }

  .search-container,
  .sort-container {
    margin: 0.5rem 0;
  }

  .card {
    margin: 10px;
  }

  .btn {
    flex: 0 0 100%; /* Stack buttons vertically */
    margin-bottom: 10px;
  }

  .product-content {
    height: 6rem; /* Adjust height for small screens */
  }
}

</style>


