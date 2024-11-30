import { e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { Q as QIcon } from "./uid.627d4ed7.js";
import { _ as _export_sfc, J as mapGetters, L as openBlock, Y as createElementBlock, P as createCommentVNode, v as withDirectives, aa as vShow, O as createBaseVNode, j as createVNode, N as withCtx, F as Fragment } from "./index.6764d851.js";
var StartMenu_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  data() {
    return {
      name: "Crocodile",
      email: "ypidlet@gmail.com",
      password: "aaAA@@33",
      password1: "aaAA@@33",
      isPwd: true,
      isPwdLogin: true,
      showStartMenu: true,
      showLogin: false,
      showRegister: false,
      userId: "",
      code: "",
      codeExists: false,
      loginError: false
    };
  },
  computed: {
    ...mapGetters({
      confirmStatus: "getConfirmStatus"
    })
  },
  props: {
    showTabs: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    password(newValue) {
      this.passwordMismatch = newValue !== this.password1;
    },
    password1(newValue) {
      this.passwordMismatch = newValue !== this.password;
    }
  },
  async mounted() {
    this.inputProcessing();
  },
  methods: {
    async inputProcessing() {
      const queryString = window.location.hash.substring(13);
      const paramsArray = queryString.split("&");
      if (paramsArray.length > 1) {
        this.userId = paramsArray[0].replace("userId=", "");
        this.code = paramsArray[1].replace("code=", "");
        if (this.userId != null && this.code != null) {
          await this.getConfirm();
          this.$router.push({ name: "start-menu", params: {} });
          this.codeExists = true;
          this.goToLoginMenu();
        }
      }
    },
    validatePassword(val) {
      return val === this.password || "Password is not matched";
    },
    async getConfirm() {
      await Promise.all([
        this.$store.dispatch("GET_CONFIRM", {
          id: this.userId,
          code: this.code
        })
      ]);
      console.log("get");
    },
    goToRegisterMenu() {
      this.showStartMenu = false;
      this.showRegister = true;
      this.showLogin = false;
    },
    goToLoginMenu() {
      this.showStartMenu = false;
      this.showRegister = false;
      this.showLogin = true;
    },
    goToStartMenu() {
      this.showStartMenu = true;
      this.showLogin = false;
      this.showRegister = false;
    },
    guestLogin() {
      this.$store.commit("logOut");
      this.$router.push({ name: "events-list", params: {} });
    },
    async registerUser() {
      this.$store.dispatch("POST_REGISTER", {
        formData: {
          name: this.name,
          email: this.email,
          password: this.password
        },
        handler: (res) => {
          console.log("success: " + res);
          this.goToLoginMenu();
          this.loginError = true;
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
        }
      });
    },
    async loginUser() {
      this.$store.dispatch("POST_USER_LOGIN", {
        formData: {
          email: this.email,
          password: this.password,
          rememberMe: true
        },
        handler: (res) => {
          console.log("success: " + res);
          console.log(this.$store.getters.getCurrentUser);
          console.log(this.$route.query.id);
          let userId;
          if (this.$route.query.id == null) {
            userId = this.$store.getters.getCurrentUser;
          } else {
            userId = this.$route.query.id;
          }
          console.log(userId);
          Promise.all([
            this.profile != {} ? this.$store.dispatch("GET_PROFILE", {
              id: userId
            }) : void 0
          ]);
          this.$router.push({ name: "events-list", params: {} });
        },
        handlerError: async (errors) => {
          console.log("error: " + errors);
        }
      });
    },
    async refreshToken() {
      this.$store.dispatch("POST_REFRESH_TOKEN", {
        formData: {
          accessToken: this.$store.getters.getToken,
          refreshToken: this.$store.getters.getRefreshToken
        },
        handler: (res) => {
          console.log("success: " + res);
        },
        handlerError: (errors) => {
          console.log("error: " + errors.response);
        }
      });
    }
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "backgroundStartMenu" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", {
  class: "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[19deg] text-[36px] md:text-[70px] text-center text-white",
  style: { "font-family": "'ReenieBeanie', sans-serif" }
}, " Map of Activities ", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("p", {
  class: "text-white text-center",
  style: { "position": "absolute", "bottom": "0", "left": "50%", "transform": "translateX(-50%)", "width": "100%" }
}, " \u0412\u0430\u0448\u0456 \u043E\u043F\u0446\u0456\u0457 \u0431\u0443\u0434\u0443\u0442\u044C \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u0456, \u0430\u043B\u0435 \u0432\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044C \u043F\u0456\u0437\u043D\u0456\u0448\u0435. ", -1);
const _hoisted_5 = { class: "background" };
const _hoisted_6 = { class: "TopLine" };
const _hoisted_7 = { class: "inputStyle" };
const _hoisted_8 = { class: "background" };
const _hoisted_9 = { class: "TopLine" };
const _hoisted_10 = { class: "inputStyle" };
const _hoisted_11 = {
  key: 0,
  class: "success-message"
};
const _hoisted_12 = {
  key: 1,
  class: "error-message"
};
const _hoisted_13 = {
  key: 2,
  class: "error-message"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    $props.showTabs ? (openBlock(), createElementBlock("div", _hoisted_1)) : createCommentVNode("", true),
    withDirectives(createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      createVNode(QBtn, {
        label: "\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F",
        onClick: $options.goToRegisterMenu,
        class: "w-3/4 mx-auto flex flex-col px-5 py-2.5 bg-teal-400 rounded-[7px] items-center gap-2.5 text-weight-bold absolute bottom-1/4 left-1/2 transform -translate-x-1/2"
      }, null, 8, ["onClick"]),
      createVNode(QBtn, {
        label: "\u0423 \u0432\u0430\u0441 \u0432\u0436\u0435 \u0454 \u0430\u043A\u043A\u0430\u0443\u043D\u0442? \u0412\u0445\u0456\u0434",
        onClick: $options.goToLoginMenu,
        class: "q-btn-none text-white text-[15px] items-center font-bold font-['Roboto'] underline tracking-tight mx-auto absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -mb-11",
        style: { "white-space": "nowrap" }
      }, null, 8, ["onClick"]),
      createVNode(QBtn, {
        label: "\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438, \u044F\u043A \u0433\u0456\u0441\u0442\u044C",
        onClick: $options.guestLogin,
        class: "w-1/3 mx-auto flex flex-col px-5 py-2.5 bg-teal-400 rounded-[7px] items-center gap-2.5 text-weight-bold absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -mb-32"
      }, null, 8, ["onClick"]),
      _hoisted_4
    ], 512), [
      [vShow, $data.showStartMenu]
    ]),
    withDirectives(createBaseVNode("div", _hoisted_5, [
      createBaseVNode("div", _hoisted_6, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.goToStartMenu,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.registerUser,
          label: "\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F",
          color: "primary"
        }, null, 8, ["onClick"])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.name,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
          label: "\u0406\u043C'\u044F",
          type: "text",
          clearable: ""
        }, null, 8, ["modelValue"]),
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.email,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.email = $event),
          label: "Email",
          type: "text",
          clearable: ""
        }, null, 8, ["modelValue"]),
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.password,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.password = $event),
          label: "\u041F\u0430\u0440\u043E\u043B\u044C",
          type: $data.isPwd ? "password" : "text"
        }, {
          append: withCtx(() => [
            createVNode(QIcon, {
              name: $data.isPwd ? "visibility_off" : "visibility",
              class: "cursor-pointer",
              onClick: _cache[2] || (_cache[2] = ($event) => $data.isPwd = !$data.isPwd)
            }, null, 8, ["name"])
          ]),
          _: 1
        }, 8, ["modelValue", "type"]),
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.password1,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.password1 = $event),
          label: "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",
          rules: [$options.validatePassword],
          type: $data.isPwd ? "password" : "text"
        }, {
          append: withCtx(() => [
            createVNode(QIcon, {
              name: $data.isPwd ? "visibility_off" : "visibility",
              class: "cursor-pointer",
              onClick: _cache[4] || (_cache[4] = ($event) => $data.isPwd = !$data.isPwd)
            }, null, 8, ["name"])
          ]),
          _: 1
        }, 8, ["modelValue", "rules", "type"])
      ])
    ], 512), [
      [vShow, $data.showRegister]
    ]),
    withDirectives(createBaseVNode("div", _hoisted_8, [
      createBaseVNode("div", _hoisted_9, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.goToStartMenu,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.loginUser,
          label: "\u0412\u0445\u0456\u0434",
          color: "primary"
        }, null, 8, ["onClick"])
      ]),
      createBaseVNode("div", _hoisted_10, [
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.email,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.email = $event),
          label: "Email",
          type: "text",
          clearable: ""
        }, null, 8, ["modelValue"]),
        createVNode(QInput, {
          square: "",
          outlined: "",
          modelValue: $data.password,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.password = $event),
          label: "\u041F\u0430\u0440\u043E\u043B\u044C",
          type: $data.isPwdLogin ? "password" : "text"
        }, {
          append: withCtx(() => [
            createVNode(QIcon, {
              name: $data.isPwdLogin ? "visibility_off" : "visibility",
              class: "cursor-pointer",
              onClick: _cache[7] || (_cache[7] = ($event) => $data.isPwdLogin = !$data.isPwdLogin)
            }, null, 8, ["name"])
          ]),
          _: 1
        }, 8, ["modelValue", "type"])
      ]),
      this.codeExists && _ctx.confirmStatus === "success" ? (openBlock(), createElementBlock("div", _hoisted_11, " \u041F\u043E\u0448\u0442\u0430 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u0430 ")) : createCommentVNode("", true),
      this.codeExists && _ctx.confirmStatus === "error" ? (openBlock(), createElementBlock("div", _hoisted_12, " \u041F\u043E\u0448\u0442\u0430 \u043D\u0435 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u0430 ")) : createCommentVNode("", true),
      this.loginError == true ? (openBlock(), createElementBlock("div", _hoisted_13, " \u0412\u0430\u043C \u043D\u0430 \u043F\u043E\u0448\u0442\u0443 \u0431\u0443\u043B\u043E \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E \u043B\u0438\u0441\u0442\u0430, \u043F\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044C \u0437\u0430 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F\u043C \u0432 \u043D\u044C\u043E\u043C\u0443 \u0434\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F ")) : createCommentVNode("", true)
    ], 512), [
      [vShow, $data.showLogin]
    ])
  ], 64);
}
var StartMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "StartMenu.vue"]]);
export { StartMenu as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRNZW51LmQ4MmM0MWQxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvU3RhcnRNZW51LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwic2hvd1RhYnNcIj48L2Rpdj5cclxuICA8ZGl2IHYtc2hvdz1cInNob3dTdGFydE1lbnVcIiBjbGFzcz1cImJhY2tncm91bmRTdGFydE1lbnVcIj5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMS80IGxlZnQtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzIgcm90YXRlLVsxOWRlZ10gdGV4dC1bMzZweF0gbWQ6dGV4dC1bNzBweF0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZVwiXHJcbiAgICAgIHN0eWxlPVwiZm9udC1mYW1pbHk6ICdSZWVuaWVCZWFuaWUnLCBzYW5zLXNlcmlmXCJcclxuICAgID5cclxuICAgICAgTWFwIG9mIEFjdGl2aXRpZXNcclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxxLWJ0blxyXG4gICAgICBsYWJlbD1cItCg0LXRlNGB0YLRgNCw0YbRltGPXCJcclxuICAgICAgQGNsaWNrPVwiZ29Ub1JlZ2lzdGVyTWVudVwiXHJcbiAgICAgIGNsYXNzPVwidy0zLzQgbXgtYXV0byBmbGV4IGZsZXgtY29sIHB4LTUgcHktMi41IGJnLXRlYWwtNDAwIHJvdW5kZWQtWzdweF0gaXRlbXMtY2VudGVyIGdhcC0yLjUgdGV4dC13ZWlnaHQtYm9sZCBhYnNvbHV0ZSBib3R0b20tMS80IGxlZnQtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXgtMS8yXCJcclxuICAgIC8+XHJcblxyXG4gICAgPHEtYnRuXHJcbiAgICAgIGxhYmVsPVwi0KMg0LLQsNGBINCy0LbQtSDRlCDQsNC60LrQsNGD0L3Rgj8g0JLRhdGW0LRcIlxyXG4gICAgICBAY2xpY2s9XCJnb1RvTG9naW5NZW51XCJcclxuICAgICAgY2xhc3M9XCJxLWJ0bi1ub25lIHRleHQtd2hpdGUgdGV4dC1bMTVweF0gaXRlbXMtY2VudGVyIGZvbnQtYm9sZCBmb250LVsnUm9ib3RvJ10gdW5kZXJsaW5lIHRyYWNraW5nLXRpZ2h0IG14LWF1dG8gYWJzb2x1dGUgYm90dG9tLTEvNCBsZWZ0LTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS14LTEvMiAtbWItMTFcIlxyXG4gICAgICBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXBcIlxyXG4gICAgLz5cclxuXHJcbiAgICA8cS1idG5cclxuICAgICAgbGFiZWw9XCLQn9GA0L7QtNC+0LLQttC40YLQuCwg0Y/QuiDQs9GW0YHRgtGMXCJcclxuICAgICAgQGNsaWNrPVwiZ3Vlc3RMb2dpblwiXHJcbiAgICAgIGNsYXNzPVwidy0xLzMgbXgtYXV0byBmbGV4IGZsZXgtY29sIHB4LTUgcHktMi41IGJnLXRlYWwtNDAwIHJvdW5kZWQtWzdweF0gaXRlbXMtY2VudGVyIGdhcC0yLjUgdGV4dC13ZWlnaHQtYm9sZCBhYnNvbHV0ZSBib3R0b20tMS80IGxlZnQtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXgtMS8yIC1tYi0zMlwiXHJcbiAgICAvPlxyXG5cclxuICAgIDxwXHJcbiAgICAgIGNsYXNzPVwidGV4dC13aGl0ZSB0ZXh0LWNlbnRlclwiXHJcbiAgICAgIHN0eWxlPVwiXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBcIlxyXG4gICAgPlxyXG4gICAgICDQktCw0YjRliDQvtC/0YbRltGXINCx0YPQtNGD0YLRjCDQvtCx0LzQtdC20LXQvdGWLCDQsNC70LUg0LLQuCDQvNC+0LbQtdGC0LUg0LfQsNGA0LXRlNGB0YLRgNGD0LLQsNGC0LjRgdGMINC/0ZbQt9C90ZbRiNC1LlxyXG4gICAgPC9wPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgdi1zaG93PVwic2hvd1JlZ2lzdGVyXCIgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiVG9wTGluZVwiPlxyXG4gICAgICA8cS1idG4gZmxhdCBzdHlsZSBAY2xpY2s9XCJnb1RvU3RhcnRNZW51XCIgaWNvbj1cImFycm93X2JhY2tcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgZmxhdFxyXG4gICAgICAgICAgc3R5bGVcclxuICAgICAgICAgIEBjbGljaz1cInJlZ2lzdGVyVXNlclwiXHJcbiAgICAgICAgICBsYWJlbD1cItCg0LXRlNGB0YLRgNCw0YbRltGPXCJcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0U3R5bGVcIj5cclxuICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgc3F1YXJlXHJcbiAgICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgICAgdi1tb2RlbD1cIm5hbWVcIlxyXG4gICAgICAgICAgbGFiZWw9XCLQhtC8J9GPXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHNxdWFyZVxyXG4gICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgIHYtbW9kZWw9XCJlbWFpbFwiXHJcbiAgICAgICAgICBsYWJlbD1cIkVtYWlsXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgc3F1YXJlXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRcIlxyXG4gICAgICAgIGxhYmVsPVwi0J/QsNGA0L7Qu9GMXCJcclxuICAgICAgICA6dHlwZT1cImlzUHdkID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXHJcbiAgICAgID5cclxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgIDxxLWljb25cclxuICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgc3F1YXJlXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmQxXCJcclxuICAgICAgICBsYWJlbD1cItCf0ZbQtNGC0LLQtdGA0LTRltGC0Ywg0L/QsNGA0L7Qu9GMXCJcclxuICAgICAgICA6cnVsZXM9XCJbdmFsaWRhdGVQYXNzd29yZF1cIlxyXG4gICAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICA6bmFtZT1cImlzUHdkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IHYtc2hvdz1cInNob3dMb2dpblwiIGNsYXNzPVwiYmFja2dyb3VuZFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIlRvcExpbmVcIj5cclxuICAgICAgPHEtYnRuIGZsYXQgc3R5bGUgQGNsaWNrPVwiZ29Ub1N0YXJ0TWVudVwiIGljb249XCJhcnJvd19iYWNrXCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGZsYXRcclxuICAgICAgICAgIHN0eWxlXHJcbiAgICAgICAgICBAY2xpY2s9XCJsb2dpblVzZXJcIlxyXG4gICAgICAgICAgbGFiZWw9XCLQktGF0ZbQtFwiXHJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0U3R5bGVcIj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIHNxdWFyZVxyXG4gICAgICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgICAgICB2LW1vZGVsPVwiZW1haWxcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIkVtYWlsXCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBjbGVhcmFibGVcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHNxdWFyZVxyXG4gICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICBsYWJlbD1cItCf0LDRgNC+0LvRjFwiXHJcbiAgICAgICAgICA6dHlwZT1cImlzUHdkTG9naW4gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2RMb2dpbiA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkTG9naW4gPSAhaXNQd2RMb2dpblwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgIDwvcS1pbnB1dD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdlxyXG4gICAgICB2LWlmPVwidGhpcy5jb2RlRXhpc3RzICYmIGNvbmZpcm1TdGF0dXMgPT09ICdzdWNjZXNzJ1wiXHJcbiAgICAgIGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCJcclxuICAgID5cclxuICAgICAg0J/QvtGI0YLQsCDQv9GW0LTRgtCy0LXRgNC00LbQtdC90LBcclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdlxyXG4gICAgICB2LWlmPVwidGhpcy5jb2RlRXhpc3RzICYmIGNvbmZpcm1TdGF0dXMgPT09ICdlcnJvcidcIlxyXG4gICAgICBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIlxyXG4gICAgPlxyXG4gICAgICDQn9C+0YjRgtCwINC90LUg0L/RltC00YLQstC10YDQtNC20LXQvdCwXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXZcclxuICAgICAgdi1pZj1cInRoaXMubG9naW5FcnJvciA9PSB0cnVlXCJcclxuICAgICAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCJcclxuICAgID5cclxuICAgICAg0JLQsNC8INC90LAg0L/QvtGI0YLRgyDQsdGD0LvQviDQvdCw0LTRltGB0LvQsNC90L4g0LvQuNGB0YLQsCwg0L/QtdGA0LXQudC00ZbRgtGMINC30LAg0L/QvtGB0LjQu9Cw0L3QvdGP0Lwg0LIg0L3RjNC+0LzRgyDQtNC70Y8g0L/RltC00YLQstC10YDQtNC20LXQvdC90Y9cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gXCJ2dWV4XCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCJDcm9jb2RpbGVcIixcclxuICAgICAgZW1haWw6IFwieXBpZGxldEBnbWFpbC5jb21cIixcclxuICAgICAgcGFzc3dvcmQ6IFwiYWFBQUBAMzNcIixcclxuICAgICAgcGFzc3dvcmQxOiBcImFhQUFAQDMzXCIsXHJcbiAgICAgIGlzUHdkOiB0cnVlLFxyXG4gICAgICBpc1B3ZExvZ2luOiB0cnVlLFxyXG4gICAgICBzaG93U3RhcnRNZW51OiB0cnVlLFxyXG4gICAgICBzaG93TG9naW46IGZhbHNlLFxyXG4gICAgICBzaG93UmVnaXN0ZXI6IGZhbHNlLFxyXG4gICAgICB1c2VySWQ6IFwiXCIsXHJcbiAgICAgIGNvZGU6IFwiXCIsXHJcbiAgICAgIGNvZGVFeGlzdHM6IGZhbHNlLFxyXG4gICAgICBsb2dpbkVycm9yOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwR2V0dGVycyh7XHJcbiAgICAgIGNvbmZpcm1TdGF0dXM6IFwiZ2V0Q29uZmlybVN0YXR1c1wiLFxyXG4gICAgfSksXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgc2hvd1RhYnM6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIHBhc3N3b3JkKG5ld1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRNaXNtYXRjaCA9IG5ld1ZhbHVlICE9PSB0aGlzLnBhc3N3b3JkMTtcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZDEobmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5wYXNzd29yZE1pc21hdGNoID0gbmV3VmFsdWUgIT09IHRoaXMucGFzc3dvcmQ7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIHRoaXMuaW5wdXRQcm9jZXNzaW5nKCk7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBpbnB1dFByb2Nlc3NpbmcoKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEzKTtcclxuICAgICAgY29uc3QgcGFyYW1zQXJyYXkgPSBxdWVyeVN0cmluZy5zcGxpdChcIiZcIik7XHJcbiAgICAgIGlmIChwYXJhbXNBcnJheS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXNBcnJheVswXS5yZXBsYWNlKFwidXNlcklkPVwiLCBcIlwiKTtcclxuICAgICAgICB0aGlzLmNvZGUgPSBwYXJhbXNBcnJheVsxXS5yZXBsYWNlKFwiY29kZT1cIiwgXCJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlcklkICE9IG51bGwgJiYgdGhpcy5jb2RlICE9IG51bGwpIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0Q29uZmlybSgpO1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiBcInN0YXJ0LW1lbnVcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgIHRoaXMuY29kZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmdvVG9Mb2dpbk1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB2YWxpZGF0ZVBhc3N3b3JkKHZhbCkge1xyXG4gICAgICByZXR1cm4gdmFsID09PSB0aGlzLnBhc3N3b3JkIHx8IFwiUGFzc3dvcmQgaXMgbm90IG1hdGNoZWRcIjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRDb25maXJtKCkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfQ09ORklSTVwiLCB7XHJcbiAgICAgICAgICBpZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImdldFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ29Ub1JlZ2lzdGVyTWVudSgpIHtcclxuICAgICAgdGhpcy5zaG93U3RhcnRNZW51ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1JlZ2lzdGVyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zaG93TG9naW4gPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ29Ub0xvZ2luTWVudSgpIHtcclxuICAgICAgdGhpcy5zaG93U3RhcnRNZW51ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1JlZ2lzdGVyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd0xvZ2luID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ29Ub1N0YXJ0TWVudSgpIHtcclxuICAgICAgdGhpcy5zaG93U3RhcnRNZW51ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zaG93TG9naW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93UmVnaXN0ZXIgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ3Vlc3RMb2dpbigpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KFwibG9nT3V0XCIpO1xyXG4gICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwiZXZlbnRzLWxpc3RcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgcmVnaXN0ZXJVc2VyKCkge1xyXG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIlBPU1RfUkVHSVNURVJcIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIiArIHJlcyk7XHJcbiAgICAgICAgICB0aGlzLmdvVG9Mb2dpbk1lbnUoKTtcclxuICAgICAgICAgIHRoaXMubG9naW5FcnJvciA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgbG9naW5Vc2VyKCkge1xyXG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIlBPU1RfVVNFUl9MT0dJTlwiLCB7XHJcbiAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICByZW1lbWJlck1lOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIiArIHJlcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRyb3V0ZS5xdWVyeS5pZCk7XHJcbiAgICAgICAgICAgIGxldCB1c2VySWQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuJHJvdXRlLnF1ZXJ5LmlkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICB1c2VySWQgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRVc2VyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgdXNlcklkID0gdGhpcy4kcm91dGUucXVlcnkuaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpO1xyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9maWxlICE9IHt9XHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX1BST0ZJTEVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwiZXZlbnRzLWxpc3RcIiwgcGFyYW1zOiB7fSB9KTsgLy8g0YLRgNC10LHQsCDRhtC1INC30LDQutC+0LzQtdC90YLQuNGC0Lgg0YnQvtCxINC/0YDQvtGC0LXRgdGC0YPQstCw0YLQuCByZWZyZXNoVG9rZW4oKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlckVycm9yOiBhc3luYyAoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycm9ycyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHJlZnJlc2hUb2tlbigpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJQT1NUX1JFRlJFU0hfVE9LRU5cIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRUb2tlbixcclxuICAgICAgICAgIHJlZnJlc2hUb2tlbjogdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRSZWZyZXNoVG9rZW4sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3M6IFwiICsgcmVzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZXJFcnJvcjogKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcnMucmVzcG9uc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuLlRvcExpbmUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG4uaW5wdXRTdHlsZSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIG1heC13aWR0aDogOTUlO1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxufVxyXG4uYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vYXNzZXRzL2JhY2tncm91bmRWMS5wbmdcIik7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHotaW5kZXg6IDA7XHJcbn1cclxuLmJ1dHRvbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuLnN1Y2Nlc3MtbWVzc2FnZSxcclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5zdWNjZXNzLW1lc3NhZ2Uge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmYwZDg7XHJcbiAgY29sb3I6ICM0Y2FlNGM7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlO1xyXG4gIGNvbG9yOiAjYTk0NDQyO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJSZWVuaWVCZWFuaWVcIjtcclxuICBzcmM6IHVybChcInNyYy9hc3NldHMvUmVlbmllQmVhbmllLnR0ZlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSxcclxuICAgIHVybChcInNyYy9hc3NldHMvUmVlbmllQmVhbmllLnR0ZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG4uYmFja2dyb3VuZFN0YXJ0TWVudSB7XHJcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vYXNzZXRzL2M1ZjhlZGE5Yzc5YjRmODkwY2NiYWY2YTJkYTc5Y2Y2LnBuZ1wiKTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgei1pbmRleDogMDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfd2l0aERpcmVjdGl2ZXMiLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3Mi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
