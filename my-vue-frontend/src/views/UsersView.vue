<template>
    <div>
      <div><button @click="addUser" class="btn-add-user">Add User</button></div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.UserID">
              <td>{{ user.UserID }}</td>
              <td>{{ user.FirstName }}</td>
              <td>{{ user.LastName }}</td>
              <td>{{ user.Email }}</td>
              <td>{{ user.Gender }}</td>
              <td>{{ user.Age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    computed: {
      users() {
        return this.$store.state.users;
      },
    },
    methods: {
      async addUser() {
        const newUser = {
          UserID: '',
          FirstName: '',
          LastName: '',
          Email: '',
          Gender: '',
          Age: '',
        };
  
        try {
        const response = await axios.post('/users/register', newUser); // Use axios directly here
        const { msg } = response.data;
        if (msg) {
          // User added successfully
          this.$store.dispatch('fetchUsers');
          alert('User added successfully');
          console.log('User added successfully:', newUser);
        } else {
          console.error('Failed to add user:', response.data);
          alert('Failed to add user');
        }
      } catch (error) {
        console.error('An error occurred while adding user:', error);
        alert('An error occurred while adding user');
      }
    },
  },
    mounted() {
      this.$store.dispatch('fetchUsers');
    },
  };
  </script>
  

<style scoped>
/* General table styling */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: grey;
  color: white;
}

/* Add User button styling */
.btn-add-user {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

/* Responsive styles */
.table-responsive {
  overflow-x: auto; /* Make table scrollable horizontally on small screens */
}

/* Small screens (up to 600px) */
@media screen and (max-width: 600px) {
  th,
  td {
    padding: 5px; /* Reduce padding on smaller screens */
    font-size: 12px; /* Reduce font size for better fit */
  }

  .btn-add-user {
    padding: 8px 16px;
    font-size: 14px; /* Adjust button size on small screens */
  }
}

/* Medium screens (601px to 992px) */
@media screen and (min-width: 601px) and (max-width: 992px) {
  th,
  td {
    padding: 8px; /* Adjust padding for medium screens */
    font-size: 14px; /* Adjust font size */
  }

  .btn-add-user {
    padding: 10px 18px;
    font-size: 15px; /* Adjust button size for medium screens */
  }
}

/* Large screens (993px and up) */
@media screen and (min-width: 993px) {
  th,
  td {
    padding: 10px; /* Default padding */
    font-size: 16px; /* Default font size */
  }

  .btn-add-user {
    padding: 10px 20px;
    font-size: 16px; /* Default button size */
  }
}
</style>
