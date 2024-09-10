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
                <button @click="addProductToCart(product)" class="btn btn-dark">Add to Cart</button>
                <button @click="editProduct(product)" class="btn btn-secondary">Edit</button>
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
  export default {
    data() {
      return {
        showModal: false,
        showEditModal: false,  // New state for showing edit modal
        editableProduct: null,  // New state for the product being edited
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
      users() {
        return this.$store.state.users;
      },
      products() {
        return this.$store.state.products;
      },
      sortedProducts() {
        if (!this.products) {
          return [];
        }
  
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
        if (!this.products) {
          return [];
        }
  
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
      addToCart(product) {
        this.$store.dispatch('addToCart', product);
      },
      addProductToCart(product) {
        this.$store.dispatch('addToCart', product);
        alert('Product added successfully')
      },
      addProduct() {
        const formData = new FormData();
        for (const category in this.file) {
          if (this.file[category]) {
            formData.append(category, this.file[category]);
          }
        }
        // Make an API call to add the product
        this.$axios
          .post('products/addProduct', formData)
          .then((response) => {
            console.log('Product added successfully:', response.data);
  
            this.$store.dispatch('fetchProducts');
            this.showModal = false; 
          })
          .catch((error) => {
            console.error('Error adding product:', error);
          });
      },
      // New method for editing a product
      editProduct(product) {
        this.editableProduct = { ...product };
        this.showEditModal = true;
      },
      // Method to update product
      updateProduct() {
        // Example API call to update the product
        this.$axios
          .put(`products/updateProduct/${this.editableProduct.BookID}`, this.editableProduct)
          .then((response) => {
            console.log('Product updated successfully:', response.data);
            this.$store.dispatch('fetchProducts');
            this.showEditModal = false;
          })
          .catch((error) => {
            console.error('Error updating product:', error);
          });
      },
      // Method to close edit modal
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

.filter-container {
  display: flex;
  justify-content: space-between; /* Distribute space between the items */
  align-items: center; /* Vertically center items */
  margin-bottom: 1rem;
}

.search-container {
  flex: 1; /* Allows the search container to take available space */
}

.sort-container {
  flex: 0 0 auto; /* Allows the sort container to take only necessary space */
  margin-left: 1rem; /* Adds some space between search input and sort select */
}
.category-heading {
  text-align: center;
  margin-bottom: 1rem;
}

.card {
  background-color: rgb(232, 225, 225);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.card img {
  max-width: 100%;
  height: auto;
}

.actions {
  margin-top: 10px;
}

input[type="text"],
select {
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
  width: 100%;
  max-width: 300px; /* Adjust width as needed */
}

.product-content {
  overflow-y: scroll;
  height: 10rem;
  scroll-snap-type: y mandatory;
}

@media screen and (max-width: 500px) {
  .product-content {
    height: 10rem;
  }
}
</style>

