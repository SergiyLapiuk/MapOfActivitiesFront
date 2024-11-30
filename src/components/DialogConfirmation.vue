<template>
  <q-dialog v-model="isDialogVisible" position="top">
    <q-card>
      <q-card-section>
        <q-card-title class="text-h6">{{ message }}</q-card-title>
        <q-card-actions>
          <q-btn label="Скасувати" color="primary" @click="cancel" />
          <q-btn label="Підтвердити" color="negative" @click="confirm" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
export default {
  props: {
    message: String,
    showDialog: Boolean,
  },
  computed: {
    isDialogVisible: {
      get() {
        return this.showDialog;
      },
      set(value) {
        this.$emit("update:showDialog", value);
      },
    },
  },
  methods: {
    confirm() {
      this.$emit("confirmed");
    },
    cancel() {
      this.$emit("canceled");
    },
  },
};
</script>





