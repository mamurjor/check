<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="subcriptionData.email" type="email" placeholder="Enter your email">
      <button type="submit">Subscribe</button>
    </form>
  </div>
</template>

<script>
import toastr from 'toastr';

export default {
  data() {
    return {
      subcriptionData: {
        email: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Check that `this.$axios` is available here
      this.$axios
        .$post('/subscribe-form', this.subcriptionData) // Use $post correctly
        .then((res) => {
          if (res.status === 'success') {
            toastr.success(res.message); // Show success message
            this.subcriptionData.email = ''; // Clear email input
          } else {
            toastr.error(res?.errors?.email?.[0] || 'An error occurred'); // Show error message
          }
        })
        .catch((error) => {
          console.log(error); // Log any errors for debugging
          toastr.error('Something went wrong'); // General error message
        });
    }
  }
}
</script>
