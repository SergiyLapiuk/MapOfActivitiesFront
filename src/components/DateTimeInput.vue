<template>
  <div class="w-full flex flex-row gap-2">
    <q-input :dense="dense" flat v-model="val" :label="label" class="w-full">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              today-btn
              v-model="val"
              mask="YYYY-MM-DD HH:mm"
              :options="
                (date) => date > minimum && (maximum == '' || date < maximum)
              "
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="val" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
        <q-icon @click="val = ''" name="close"></q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import {
  convertJSONToDate,
  convertDateToJSON,
  convertJSONToMinimumDate,
} from "../convertDate";

export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, null],
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    min: {
      type: [String, null],
      default: "",
    },
    max: {
      type: [String, null],
      default: "",
    },
    dense: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {
      val: convertJSONToDate(this.value),
      minimum: convertJSONToMinimumDate(this.min),
      maximum: convertJSONToMinimumDate(this.max),
    };
  },
  watch: {
    val: {
      handler(v) {
        console.log("ooh");
        this.$emit("input", convertDateToJSON(v));
      },
    },
    value(value) {
      //this.val = convertJSONToDate(value);
    },
    min(v) {
      this.minimum = convertJSONToMinimumDate(v);
    },
    max(v) {
      this.maximum = convertJSONToMinimumDate(v);
    },
  },
};
</script>
