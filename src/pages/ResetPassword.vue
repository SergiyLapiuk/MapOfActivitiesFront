<template>
  <div class="reset-password-container">
    <h2 class="form-title">Reset Password</h2>

    <div v-if="!resetTokenValid" class="invalid-token-message">
      <p>The reset token is invalid or has expired.</p>
    </div>

    <div v-if="resetTokenValid">
      <form @submit.prevent="resetPassword" class="password-form">
        <label for="newPassword" class="form-label">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" class="form-input" required />

        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input" required />

        <button type="submit" class="form-button">Reset Password</button>
      </form>

      <div v-if="resetSuccess" class="success-message">
        Password successfully reset.
      </div>

      <div v-if="resetError" class="error-message">
        {{ resetError }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.reset-password-container {
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

.invalid-token-message {
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  border-radius: 4px;
  color: #a94442;
  padding: 12px;
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
      newPassword: "",
      confirmPassword: "",
      resetTokenValid: false,
      resetSuccess: false,
      resetError: null,
      userId: "",
      code: "",
    };
  },
  async mounted() {
    const queryString = await window.location.hash.substring(1);
    const paramsArray = queryString.split('&');
    this.userId = paramsArray[0].replace("/reset-password?userId=", "");
    this.code = paramsArray[1].replace("code=", "");
    this.resetTokenValid = true;
    console.log(this.userId, this.code);
  },
  methods: {
    resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.resetError = "Passwords do not match.";
        return;
      }
      this.$store.dispatch("RESET_PASSWORD", {
        formData: {
          id: this.userId,
          password: this.newPassword,
          code: this.code,
        },
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
