import { _ as _export_sfc, L as openBlock, Y as createElementBlock, P as createCommentVNode, O as createBaseVNode, v as withDirectives, ac as vModelText, a9 as withModifiers, a0 as toDisplayString, ap as pushScopeId, aq as popScopeId } from "./index.6764d851.js";
var ResetPassword_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      resetTokenValid: false,
      resetSuccess: false,
      resetError: null,
      userId: "",
      code: ""
    };
  },
  async mounted() {
    const queryString = await window.location.hash.substring(1);
    const paramsArray = queryString.split("&");
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
          code: this.code
        },
        handler: (res) => {
          this.resetSuccess = true;
          this.resetError = null;
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          this.resetError = "Error occurred: " + errors;
        }
      });
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-af58b55e"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "reset-password-container" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", { class: "form-title" }, "Reset Password", -1));
const _hoisted_3 = {
  key: 0,
  class: "invalid-token-message"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "The reset token is invalid or has expired.", -1));
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { key: 1 };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", {
  for: "newPassword",
  class: "form-label"
}, "New Password:", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", {
  for: "confirmPassword",
  class: "form-label"
}, "Confirm Password:", -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("button", {
  type: "submit",
  class: "form-button"
}, "Reset Password", -1));
const _hoisted_10 = {
  key: 0,
  class: "success-message"
};
const _hoisted_11 = {
  key: 1,
  class: "error-message"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    !$data.resetTokenValid ? (openBlock(), createElementBlock("div", _hoisted_3, _hoisted_5)) : createCommentVNode("", true),
    $data.resetTokenValid ? (openBlock(), createElementBlock("div", _hoisted_6, [
      createBaseVNode("form", {
        onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => $options.resetPassword && $options.resetPassword(...args), ["prevent"])),
        class: "password-form"
      }, [
        _hoisted_7,
        withDirectives(createBaseVNode("input", {
          type: "password",
          id: "newPassword",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.newPassword = $event),
          class: "form-input",
          required: ""
        }, null, 512), [
          [vModelText, $data.newPassword]
        ]),
        _hoisted_8,
        withDirectives(createBaseVNode("input", {
          type: "password",
          id: "confirmPassword",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.confirmPassword = $event),
          class: "form-input",
          required: ""
        }, null, 512), [
          [vModelText, $data.confirmPassword]
        ]),
        _hoisted_9
      ], 32),
      $data.resetSuccess ? (openBlock(), createElementBlock("div", _hoisted_10, " Password successfully reset. ")) : createCommentVNode("", true),
      $data.resetError ? (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString($data.resetError), 1)) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ]);
}
var ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af58b55e"], ["__file", "ResetPassword.vue"]]);
export { ResetPassword as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXRQYXNzd29yZC43ZWVhMzhhMS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL1Jlc2V0UGFzc3dvcmQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwicmVzZXQtcGFzc3dvcmQtY29udGFpbmVyXCI+XHJcbiAgICA8aDIgY2xhc3M9XCJmb3JtLXRpdGxlXCI+UmVzZXQgUGFzc3dvcmQ8L2gyPlxyXG5cclxuICAgIDxkaXYgdi1pZj1cIiFyZXNldFRva2VuVmFsaWRcIiBjbGFzcz1cImludmFsaWQtdG9rZW4tbWVzc2FnZVwiPlxyXG4gICAgICA8cD5UaGUgcmVzZXQgdG9rZW4gaXMgaW52YWxpZCBvciBoYXMgZXhwaXJlZC48L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IHYtaWY9XCJyZXNldFRva2VuVmFsaWRcIj5cclxuICAgICAgPGZvcm0gQHN1Ym1pdC5wcmV2ZW50PVwicmVzZXRQYXNzd29yZFwiIGNsYXNzPVwicGFzc3dvcmQtZm9ybVwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJuZXdQYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPk5ldyBQYXNzd29yZDo8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cIm5ld1Bhc3N3b3JkXCIgdi1tb2RlbD1cIm5ld1Bhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWlucHV0XCIgcmVxdWlyZWQgLz5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImNvbmZpcm1QYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkNvbmZpcm0gUGFzc3dvcmQ6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJjb25maXJtUGFzc3dvcmRcIiB2LW1vZGVsPVwiY29uZmlybVBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWlucHV0XCIgcmVxdWlyZWQgLz5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJmb3JtLWJ1dHRvblwiPlJlc2V0IFBhc3N3b3JkPC9idXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIDxkaXYgdi1pZj1cInJlc2V0U3VjY2Vzc1wiIGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCI+XHJcbiAgICAgICAgUGFzc3dvcmQgc3VjY2Vzc2Z1bGx5IHJlc2V0LlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgdi1pZj1cInJlc2V0RXJyb3JcIiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5cclxuICAgICAgICB7eyByZXNldEVycm9yIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ucmVzZXQtcGFzc3dvcmQtY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4uZm9ybS10aXRsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmludmFsaWQtdG9rZW4tbWVzc2FnZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZWJjY2QxO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBjb2xvcjogI2E5NDQ0MjtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5wYXNzd29yZC1mb3JtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5mb3JtLWxhYmVsIHtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgY29sb3I6ICM1NTU7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn1cclxuXHJcbi5mb3JtLWJ1dHRvbiB7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZm9ybS1idXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NWEwNDk7XHJcbn1cclxuXHJcbi5zdWNjZXNzLW1lc3NhZ2UsXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uc3VjY2Vzcy1tZXNzYWdlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xyXG4gIGNvbG9yOiAjNGNhZTRjO1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcclxuICBjb2xvcjogI2E5NDQ0MjtcclxufVxyXG48L3N0eWxlPlxyXG5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3UGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgIGNvbmZpcm1QYXNzd29yZDogXCJcIixcclxuICAgICAgcmVzZXRUb2tlblZhbGlkOiBmYWxzZSxcclxuICAgICAgcmVzZXRTdWNjZXNzOiBmYWxzZSxcclxuICAgICAgcmVzZXRFcnJvcjogbnVsbCxcclxuICAgICAgdXNlcklkOiBcIlwiLFxyXG4gICAgICBjb2RlOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IGF3YWl0IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKTtcclxuICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gcXVlcnlTdHJpbmcuc3BsaXQoJyYnKTtcclxuICAgIHRoaXMudXNlcklkID0gcGFyYW1zQXJyYXlbMF0ucmVwbGFjZShcIi9yZXNldC1wYXNzd29yZD91c2VySWQ9XCIsIFwiXCIpO1xyXG4gICAgdGhpcy5jb2RlID0gcGFyYW1zQXJyYXlbMV0ucmVwbGFjZShcImNvZGU9XCIsIFwiXCIpO1xyXG4gICAgdGhpcy5yZXNldFRva2VuVmFsaWQgPSB0cnVlO1xyXG4gICAgY29uc29sZS5sb2codGhpcy51c2VySWQsIHRoaXMuY29kZSk7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICByZXNldFBhc3N3b3JkKCkge1xyXG4gICAgICBpZiAodGhpcy5uZXdQYXNzd29yZCAhPT0gdGhpcy5jb25maXJtUGFzc3dvcmQpIHtcclxuICAgICAgICB0aGlzLnJlc2V0RXJyb3IgPSBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiUkVTRVRfUEFTU1dPUkRcIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBpZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5uZXdQYXNzd29yZCxcclxuICAgICAgICAgIGNvZGU6IHRoaXMuY29kZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZXI6IChyZXMpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVzZXRTdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMucmVzZXRFcnJvciA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICAgIHRoaXMucmVzZXRFcnJvciA9IFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBNEdBLE1BQUssWUFBVTtBQUFBLEVBQ2IsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQTtFQUVUO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLGNBQWMsTUFBTSxPQUFPLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDMUQsVUFBTSxjQUFjLFlBQVksTUFBTSxHQUFHO0FBQ3pDLFNBQUssU0FBUyxZQUFZLEdBQUcsUUFBUSwyQkFBMkIsRUFBRTtBQUNsRSxTQUFLLE9BQU8sWUFBWSxHQUFHLFFBQVEsU0FBUyxFQUFFO0FBQzlDLFNBQUssa0JBQWtCO0FBQ3ZCLFlBQVEsSUFBSSxL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
