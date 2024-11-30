<template>
  <div class="forgot-password-container">
    <h2 class="form-title">Forgot Password</h2>
    <form @submit.prevent="submitForm" class="password-form">
      <label for="email" class="form-label">Email:</label>
      <input type="email" id="email" v-model="email" class="form-input" required />
      <button type="submit" class="form-button">Reset Password</button>
    </form>
    <div v-if="resetSuccess" class="success-message">
      Password reset instructions sent to {{ email }}
    </div>
    <div v-if="resetError" class="error-message">
      {{ resetError }}
    </div>
  </div>
</template>

<style scoped>
.forgot-password-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #333;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.password-form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 8px;
  color: #555;
}

.form-input {
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-button {
  padding: 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #45a049;
}

.success-message,
.error-message {
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
}

.success-message {
  background-color: #dff0d8;
  color: #4cae4c;
}

.error-message {
  background-color: #f2dede;
  color: #a94442;
}
</style>


<script>
export default {
  data() {
    return {
      email: "",
      resetSuccess: false,
      resetError: null,
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("FORGOT_PASSWORD", {
        formData: {email: this.email},
        handler: (res) => {
          this.resetSuccess = true;
          this.resetError = null;
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          this.resetError = "Error occurred: " + errors;
        },
      });
    },
  },
};
</script>
