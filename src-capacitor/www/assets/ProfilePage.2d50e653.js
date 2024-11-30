import { Q as QSpinner, e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { P as ProfileIcon, Q as QSelect } from "./ProfileIcon.fd39b9d7.js";
import { J as mapGetters, _ as _export_sfc, K as resolveComponent, L as openBlock, Y as createElementBlock, O as createBaseVNode, j as createVNode, F as Fragment, Z as renderList, N as withCtx, $ as createTextVNode, a0 as toDisplayString, v as withDirectives, aa as vShow, M as createBlock, P as createCommentVNode, at as resolveDynamicComponent, ao as normalizeClass } from "./index.6764d851.js";
import "./uid.627d4ed7.js";
import "./QChip.8fa1dfba.js";
import "./QMenu.9dd1c774.js";
import "./scroll.a3a49254.js";
import "./rtl.b51694b1.js";
import "./format.3e32b8d9.js";
var TabJoined_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  props: {
    id: {
      type: [Number],
      default: null
    }
  },
  data() {
    return {
      userId: this.id
    };
  },
  mounted() {
    this.getUserEvents();
  },
  computed: {
    ...mapGetters({
      userEvents: "getUserEvents",
      userEventsStatus: "getUserEventsStatus"
    })
  },
  methods: {
    async getUserEvents() {
      if (this.userId == null) {
        return;
      }
      await Promise.all([
        this.profile != {} ? this.$store.dispatch("GET_USER_EVENTS", { id: this.userId }) : void 0
      ]);
    }
  },
  watch: {
    id(val) {
      this.userId = val;
      this.getUserEvents();
    }
  }
};
const _hoisted_1$2 = { class: "" };
const _hoisted_2$2 = {
  key: 0,
  class: "status"
};
const _hoisted_3$2 = {
  key: 1,
  class: "status"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_1$2, [
        _ctx.userEventsStatus == "loading" ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createVNode(QSpinner, {
            color: "primary",
            size: "3em",
            class: "mx-auto"
          })
        ])) : _ctx.userEventsStatus == "error" ? (openBlock(), createElementBlock("div", _hoisted_3$2, " \u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A - \u043F\u0435\u0432\u043D\u043E, \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0438 \u0437\u0456 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C. ")) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(_ctx.userEvents, (event, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "event-item-joined relative"
          }, [
            createVNode(_component_router_link, {
              to: "/event-page?id=" + event.id
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(event.name), 1)
              ]),
              _: 2
            }, 1032, ["to"])
          ]);
        }), 128))
      ])
    ])
  ]);
}
var \u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0432\u0441\u044F = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "TabJoined.vue"]]);
var TabCreated_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userId: this.id
    };
  },
  mounted() {
    this.getAuthorEvents();
  },
  computed: {
    ...mapGetters({
      authorEvents: "getAuthorEvents",
      authorEventsStatus: "getAuthorEventsStatus"
    })
  },
  methods: {
    async getAuthorEvents() {
      if (this.userId == null) {
        return;
      }
      await Promise.all([
        this.$store.dispatch("GET_AUTHOR_EVENTS", { id: this.userId })
      ]);
    }
  },
  watch: {
    id(val) {
      this.userId = val;
      this.getAuthorEvents();
    }
  }
};
const _hoisted_1$1 = { class: "" };
const _hoisted_2$1 = {
  key: 0,
  class: "status"
};
const _hoisted_3$1 = {
  key: 1,
  class: "status"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_1$1, [
        _ctx.authorEventsStatus == "loading" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(QSpinner, {
            color: "primary",
            size: "3em",
            class: "mx-auto"
          })
        ])) : _ctx.authorEventsStatus == "error" ? (openBlock(), createElementBlock("div", _hoisted_3$1, " \u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A - \u043F\u0435\u0432\u043D\u043E, \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0438 \u0437\u0456 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C. ")) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(_ctx.authorEvents, (event, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "event-item-created relative"
          }, [
            createVNode(_component_router_link, {
              to: "/event-page?id=" + event.id
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(event.name), 1)
              ]),
              _: 2
            }, 1032, ["to"])
          ]);
        }), 128))
      ])
    ])
  ]);
}
var \u0421\u0442\u0432\u043E\u0440\u0438\u0432 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "TabCreated.vue"]]);
var ProfilePage_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  components: {
    ProfileIcon,
    \u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0432\u0441\u044F,
    \u0421\u0442\u0432\u043E\u0440\u0438\u0432
  },
  async mounted() {
    await this.getProfile();
  },
  data() {
    return {
      API_URL: "https://map-of-activities-moa-back.onrender.com/api",
      userEmail: "UserEmail",
      userName: "UserName",
      tabs: ["\u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0432\u0441\u044F", "\u0421\u0442\u0432\u043E\u0440\u0438\u0432"],
      selected: "\u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0432\u0441\u044F",
      userPage: true,
      showReportDetails: false,
      showReportButton: false,
      reportHeader: null,
      reportDescription: "",
      options: [
        "\u041D\u0435\u0446\u0435\u043D\u0437\u0443\u0440\u043D\u0435 \u0456\u043C'\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430",
        "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0456\u044F \u043F\u0440\u043E\u0444\u0456\u043B\u044E",
        "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0444\u0430\u043B\u044C\u0448\u0438\u0432\u0438\u0445 \u043F\u043E\u0434\u0456\u0439",
        "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043D\u0435\u0431\u0435\u0437\u043F\u0435\u0447\u043D\u0438\u0445 \u043F\u043E\u0434\u0456\u0439",
        "\u0406\u043D\u0448\u0435"
      ]
    };
  },
  computed: {
    ...mapGetters({
      profile: "getProfile",
      profileStatus: "getProfileStatus",
      authStatus: "getStatus"
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id == null) {
      this.getProfile1();
    }
    next();
  },
  methods: {
    backToUserPage() {
      this.showReportDetails = false;
      this.userPage = true;
    },
    reportUserPage() {
      this.showReportDetails = true;
      this.userPage = false;
    },
    editProfile() {
      this.$router.push({
        name: "edit-profile"
      });
    },
    async getProfile() {
      console.log(this.$store.getters.getCurrentUser);
      console.log(this.$route.query.id);
      let userId;
      if (this.$route.query.id == null) {
        userId = this.$store.getters.getCurrentUser;
        this.showReportButton = false;
      } else {
        userId = this.$route.query.id;
        this.showReportButton = true;
      }
      console.log(userId);
      await Promise.all([
        this.profile != {} ? this.$store.dispatch("GET_PROFILE", {
          id: userId
        }) : void 0
      ]);
    },
    async getProfile1() {
      await Promise.all([
        this.profile != {} ? this.$store.dispatch("GET_PROFILE", {
          id: this.$store.getters.getCurrentUser
        }) : void 0
      ]);
    },
    async reportUser() {
      if (!this.reportHeader) {
        alert("\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0432\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438.");
        return;
      }
      if (this.reportHeader === "\u0406\u043D\u0448\u0435" && !this.reportDescription) {
        alert('\u0412\u0438 \u0432\u0438\u0431\u0440\u0430\u043B\u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A "\u0406\u043D\u0448\u0435", \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0434\u043E\u0434\u0430\u0439\u0442\u0435 \u043E\u043F\u0438\u0441 \u0412\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438');
        return;
      }
      var _userId = this.$route.query.id;
      this.curUser = this.$store.getters.getCurrentUser;
      console.log(this.curUser);
      this.$store.dispatch("REPORT_USER", {
        userId: _userId,
        authorId: this.curUser,
        formData: {
          Header: this.reportHeader,
          Description: this.reportDescription
        },
        handler: (res) => {
          this.$router.replace({ path: "/profile-page", name: "profile-page", query: { id: this.$route.query.id } });
          this.showReportDetails = false;
          this.userPage = true;
          reportHeader = "";
          reportDescription = "";
        },
        handlerError: (errors) => {
          console.error(errors.response.data);
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        }
      });
    },
    logout() {
      this.$store.commit("logOut");
      this.$router.push("/start-menu");
    }
  }
};
const _hoisted_1 = {
  key: 0,
  class: "status"
};
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = { class: "TopLineProfile" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "profile-text-spacer" }, null, -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", {
  class: "profile-text",
  style: { "font-size": "16px", "font-weight": "550" }
}, " \u041F\u0440\u043E\u0444\u0456\u043B\u044C ", -1);
const _hoisted_7 = { class: "logout-button" };
const _hoisted_8 = { class: "avatar-container" };
const _hoisted_9 = ["src"];
const _hoisted_10 = { key: 1 };
const _hoisted_11 = { class: "button-container" };
const _hoisted_12 = { class: "user-details" };
const _hoisted_13 = { class: "detail" };
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("span", { class: "label" }, "E-mail", -1);
const _hoisted_15 = { class: "value" };
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", { class: "fakeobject" }, null, -1);
const _hoisted_17 = { class: "detail" };
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("span", { class: "label" }, "\u0406\u043C'\u044F", -1);
const _hoisted_19 = { class: "value" };
const _hoisted_20 = { class: "user-details" };
const _hoisted_21 = { class: "detail" };
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("span", { class: "label" }, "\u041E\u043F\u0438\u0441", -1);
const _hoisted_23 = { style: { "margin-bottom": "20px" } };
const _hoisted_24 = ["onClick"];
const _hoisted_25 = { class: "value" };
const _hoisted_26 = { class: "TopLine" };
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "550" } }, "\u0414\u0435\u0442\u0430\u043B\u0456 \u0441\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430", -1);
const _hoisted_28 = { class: "inputStyle" };
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0441\u043A\u0430\u0440\u0433\u0438 ", -1);
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u043E\u043F\u0438\u0441 \u0412\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438 (\u043E\u043F\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u043E) ", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProfileIcon = resolveComponent("ProfileIcon");
  return openBlock(), createElementBlock(Fragment, null, [
    withDirectives(createBaseVNode("div", null, [
      withDirectives(createBaseVNode("div", null, [
        createVNode(QBtn, {
          onClick: $options.reportUserPage,
          label: "Report",
          color: "red"
        }, null, 8, ["onClick"])
      ], 512), [
        [vShow, $data.showReportButton]
      ]),
      _ctx.profileStatus == "loading" || _ctx.authStatus == "" ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QSpinner, {
          color: "primary",
          size: "3em",
          class: "mx-auto"
        })
      ])) : _ctx.profileStatus == "error" ? (openBlock(), createElementBlock("div", _hoisted_2, "\u041D\u0435\u0432\u0434\u0430\u043B\u0430 \u0441\u043F\u0440\u043E\u0431\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0442\u0438 \u0434\u0430\u043D\u0456")) : (openBlock(), createElementBlock("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          _hoisted_6,
          createBaseVNode("div", _hoisted_7, [
            this.$route.query.id == null || this.$route.query.id == this.$store.getters.getCurrentUser ? (openBlock(), createBlock(QBtn, {
              key: 0,
              onClick: $options.logout,
              label: "\u0412\u0438\u0439\u0442\u0438",
              color: "negative"
            }, null, 8, ["onClick"])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          _ctx.profile.imageURL ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: this.API_URL + "/images/" + _ctx.profile.imageURL,
            class: "user-image"
          }, null, 8, _hoisted_9)) : (openBlock(), createElementBlock("div", _hoisted_10, [
            createVNode(_component_ProfileIcon)
          ]))
        ]),
        createBaseVNode("div", _hoisted_11, [
          this.$route.query.id == null || this.$route.query.id == this.$store.getters.getCurrentUser ? (openBlock(), createBlock(QBtn, {
            key: 0,
            ripple: { center: true },
            color: "secondary",
            style: { "width": "100%" },
            label: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u0440\u043E\u0444\u0456\u043B\u044C",
            "no-caps": "",
            onClick: $options.editProfile
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", _hoisted_13, [
            _hoisted_14,
            createBaseVNode("span", _hoisted_15, toDisplayString(_ctx.profile.email), 1)
          ]),
          _hoisted_16,
          createBaseVNode("div", _hoisted_17, [
            _hoisted_18,
            createBaseVNode("span", _hoisted_19, toDisplayString(_ctx.profile.name), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            _hoisted_22,
            createBaseVNode("span", _hoisted_23, toDisplayString(_ctx.profile.description), 1)
          ])
        ]),
        createBaseVNode("div", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.tabs, (tab) => {
            return openBlock(), createElementBlock("button", {
              key: tab,
              onClick: ($event) => $data.selected = tab,
              class: normalizeClass(["tab-btn", { active: $data.selected === tab }])
            }, [
              createBaseVNode("span", _hoisted_25, toDisplayString(tab), 1)
            ], 10, _hoisted_24);
          }), 128)),
          (openBlock(), createBlock(resolveDynamicComponent($data.selected), {
            id: _ctx.profile.id,
            class: "tab"
          }, null, 8, ["id"]))
        ])
      ]))
    ], 512), [
      [vShow, $data.userPage]
    ]),
    withDirectives(createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_26, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.backToUserPage,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        _hoisted_27,
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.reportUser,
          label: "\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438",
          color: "primary"
        }, null, 8, ["onClick"])
      ]),
      createBaseVNode("div", _hoisted_28, [
        _hoisted_29,
        createVNode(QSelect, {
          outlined: "",
          modelValue: $data.reportHeader,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.reportHeader = $event),
          options: $data.options
        }, null, 8, ["modelValue", "options"]),
        _hoisted_30,
        createVNode(QInput, {
          modelValue: $data.reportDescription,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.reportDescription = $event),
          outlined: "",
          autogrow: "",
          clearable: ""
        }, null, 8, ["modelValue"])
      ])
    ], 512), [
      [vShow, $data.showReportDetails]
    ])
  ], 64);
}
var ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ProfilePage.vue"]]);
export { ProfilePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZVBhZ2UuMmQ1MGU2NTMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RhYkpvaW5lZC52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9UYWJDcmVhdGVkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9Qcm9maWxlUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiXCI+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwidXNlckV2ZW50c1N0YXR1cyA9PSAnbG9hZGluZydcIiBjbGFzcz1cInN0YXR1c1wiPlxyXG4gICAgICAgICAgPHEtc3Bpbm5lciBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiM2VtXCIgY2xhc3M9XCJteC1hdXRvXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cInVzZXJFdmVudHNTdGF0dXMgPT0gJ2Vycm9yJ1wiIGNsYXNzPVwic3RhdHVzXCI+XHJcbiAgICAgICAgICDQqdC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6IC0g0L/QtdCy0L3Qviwg0L/RgNC+0LHQu9C10LzQuCDQt9GWINC3J9GU0LTQvdCw0L3QvdGP0LwuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgdi1lbHNlXHJcbiAgICAgICAgICB2LWZvcj1cIihldmVudCwgaW5kZXgpIGluIHVzZXJFdmVudHNcIlxyXG4gICAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICAgIGNsYXNzPVwiZXZlbnQtaXRlbS1qb2luZWQgcmVsYXRpdmVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL2V2ZW50LXBhZ2U/aWQ9JyArIGV2ZW50LmlkXCI+e3tcclxuICAgICAgICAgICAgZXZlbnQubmFtZVxyXG4gICAgICAgICAgfX08L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gXCJ2dWV4XCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9wczoge1xyXG4gICAgaWQ6IHtcclxuICAgICAgdHlwZTogW051bWJlcl0sXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VySWQ6IHRoaXMuaWQsXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmdldFVzZXJFdmVudHMoKTtcclxuICB9LFxyXG5cclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwR2V0dGVycyh7XHJcbiAgICAgIHVzZXJFdmVudHM6IFwiZ2V0VXNlckV2ZW50c1wiLFxyXG4gICAgICB1c2VyRXZlbnRzU3RhdHVzOiBcImdldFVzZXJFdmVudHNTdGF0dXNcIixcclxuICAgIH0pLFxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGdldFVzZXJFdmVudHMoKSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXJJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgIT0ge31cclxuICAgICAgICAgID8gdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfVVNFUl9FVkVOVFNcIiwgeyBpZDogdGhpcy51c2VySWQgfSlcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgd2F0Y2g6IHtcclxuICAgIGlkKHZhbCkge1xyXG4gICAgICB0aGlzLnVzZXJJZCA9IHZhbDtcclxuICAgICAgdGhpcy5nZXRVc2VyRXZlbnRzKCk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG4uZXZlbnQtaXRlbS1qb2luZWQge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBtYXgtd2lkdGg6IDgwJTtcclxuICBtYXJnaW46IDEwcHggYXV0bztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtLWpvaW5lZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtLWpvaW5lZCBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtLWpvaW5lZCBhOmhvdmVyIHtcclxuICBjb2xvcjogIzAwN2JmZjtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJcIj5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJhdXRob3JFdmVudHNTdGF0dXMgPT0gJ2xvYWRpbmcnXCIgY2xhc3M9XCJzdGF0dXNcIj5cclxuICAgICAgICAgIDxxLXNwaW5uZXIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjNlbVwiIGNsYXNzPVwibXgtYXV0b1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJhdXRob3JFdmVudHNTdGF0dXMgPT0gJ2Vycm9yJ1wiIGNsYXNzPVwic3RhdHVzXCI+XHJcbiAgICAgICAgICDQqdC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6IC0g0L/QtdCy0L3Qviwg0L/RgNC+0LHQu9C10LzQuCDQt9GWINC3J9GU0LTQvdCw0L3QvdGP0LwuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgdi1lbHNlXHJcbiAgICAgICAgICB2LWZvcj1cIihldmVudCwgaW5kZXgpIGluIGF1dGhvckV2ZW50c1wiXHJcbiAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICAgICAgY2xhc3M9XCJldmVudC1pdGVtLWNyZWF0ZWQgcmVsYXRpdmVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL2V2ZW50LXBhZ2U/aWQ9JyArIGV2ZW50LmlkXCI+e3tcclxuICAgICAgICAgICAgZXZlbnQubmFtZVxyXG4gICAgICAgICAgfX08L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gXCJ2dWV4XCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9wczoge1xyXG4gICAgaWQ6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVzZXJJZDogdGhpcy5pZCxcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMuZ2V0QXV0aG9yRXZlbnRzKCk7XHJcbiAgfSxcclxuXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICBhdXRob3JFdmVudHM6IFwiZ2V0QXV0aG9yRXZlbnRzXCIsXHJcbiAgICAgIGF1dGhvckV2ZW50c1N0YXR1czogXCJnZXRBdXRob3JFdmVudHNTdGF0dXNcIixcclxuICAgIH0pLFxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGdldEF1dGhvckV2ZW50cygpIHtcclxuICAgICAgaWYgKHRoaXMudXNlcklkID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0FVVEhPUl9FVkVOVFNcIiwgeyBpZDogdGhpcy51c2VySWQgfSksXHJcbiAgICAgIF0pO1xyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICB3YXRjaDoge1xyXG4gICAgaWQodmFsKSB7XHJcbiAgICAgIHRoaXMudXNlcklkID0gdmFsO1xyXG4gICAgICB0aGlzLmdldEF1dGhvckV2ZW50cygpO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuLmV2ZW50LWl0ZW0tY3JlYXRlZCB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1heC13aWR0aDogODAlO1xyXG4gIG1hcmdpbjogMTBweCBhdXRvO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLmV2ZW50LWl0ZW0tY3JlYXRlZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtLWNyZWF0ZWQgYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uZXZlbnQtaXRlbS1jcmVhdGVkIGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjMDA3YmZmO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IHYtc2hvdz1cInVzZXJQYWdlXCI+XHJcblxyXG4gICAgPGRpdiB2LXNob3c9XCJzaG93UmVwb3J0QnV0dG9uXCI+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIEBjbGljaz1cInJlcG9ydFVzZXJQYWdlXCIgXHJcbiAgICAgICAgbGFiZWw9XCJSZXBvcnRcIlxyXG4gICAgICAgIGNvbG9yPVwicmVkXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJzdGF0dXNcIiB2LWlmPVwicHJvZmlsZVN0YXR1cyA9PSAnbG9hZGluZycgfHwgYXV0aFN0YXR1cyA9PSAnJ1wiPlxyXG4gICAgICA8cS1zcGlubmVyIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCIzZW1cIiBjbGFzcz1cIm14LWF1dG9cIiAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHYtZWxzZS1pZj1cInByb2ZpbGVTdGF0dXMgPT0gJ2Vycm9yJ1wiPtCd0LXQstC00LDQu9CwINGB0L/RgNC+0LHQsCDQt9Cw0LLQsNC90YLQsNC20YLQuCDQtNCw0L3RljwvZGl2PlxyXG4gICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJUb3BMaW5lUHJvZmlsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXRleHQtc3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtdGV4dFwiIHN0eWxlPVwiZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTUwXCI+XHJcbiAgICAgICAgICDQn9GA0L7RhNGW0LvRjFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvdXQtYnV0dG9uXCI+XHJcbiAgICAgICAgICA8cS1idG4gdi1pZj1cInRoaXMuJHJvdXRlLnF1ZXJ5LmlkID09IG51bGwgfHwgdGhpcy4kcm91dGUucXVlcnkuaWQgPT0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50VXNlclwiIEBjbGljaz1cImxvZ291dFwiIGxhYmVsPVwi0JLQuNC50YLQuFwiIGNvbG9yPVwibmVnYXRpdmVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImF2YXRhci1jb250YWluZXJcIj5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICB2LWlmPVwicHJvZmlsZS5pbWFnZVVSTFwiXHJcbiAgICAgICAgICA6c3JjPVwidGhpcy5BUElfVVJMICsgJy9pbWFnZXMvJyArIHByb2ZpbGUuaW1hZ2VVUkxcIlxyXG4gICAgICAgICAgY2xhc3M9XCJ1c2VyLWltYWdlXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgdi1lbHNlPlxyXG4gICAgICAgICAgPFByb2ZpbGVJY29uIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgdi1pZj1cInRoaXMuJHJvdXRlLnF1ZXJ5LmlkID09IG51bGwgfHwgdGhpcy4kcm91dGUucXVlcnkuaWQgPT0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50VXNlclwiXHJcbiAgICAgICAgICA6cmlwcGxlPVwieyBjZW50ZXI6IHRydWUgfVwiXHJcbiAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlXCJcclxuICAgICAgICAgIGxhYmVsPVwi0KDQtdC00LDQs9GD0LLQsNGC0Lgg0L/RgNC+0YTRltC70YxcIlxyXG4gICAgICAgICAgbm8tY2Fwc1xyXG4gICAgICAgICAgQGNsaWNrPVwiZWRpdFByb2ZpbGVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidXNlci1kZXRhaWxzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkUtbWFpbDwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmFsdWVcIj57eyBwcm9maWxlLmVtYWlsIH19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmYWtlb2JqZWN0XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPtCG0Lwn0Y88L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInZhbHVlXCI+e3sgcHJvZmlsZS5uYW1lIH19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInVzZXItZGV0YWlsc1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj7QntC/0LjRgTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweFwiPnt7IHByb2ZpbGUuZGVzY3JpcHRpb24gfX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIHYtZm9yPVwidGFiIGluIHRhYnNcIlxyXG4gICAgICAgICAgOmtleT1cInRhYlwiXHJcbiAgICAgICAgICBAY2xpY2s9XCJzZWxlY3RlZCA9IHRhYlwiXHJcbiAgICAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idG4nLCB7IGFjdGl2ZTogc2VsZWN0ZWQgPT09IHRhYiB9XVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPnt7IHRhYiB9fTwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGNvbXBvbmVudCA6aWQ9XCJwcm9maWxlLmlkXCIgOmlzPVwic2VsZWN0ZWRcIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuXHJcbiAgPGRpdiB2LXNob3cgPSBcInNob3dSZXBvcnREZXRhaWxzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiVG9wTGluZVwiPlxyXG4gICAgICA8cS1idG4gZmxhdCBzdHlsZSBAY2xpY2s9XCJiYWNrVG9Vc2VyUGFnZVwiIGljb249XCJhcnJvd19iYWNrXCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDU1MFwiPtCU0LXRgtCw0LvRliDRgdC60LDRgNCz0Lgg0L3QsCDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwPC9kaXY+XHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICBzdHlsZVxyXG4gICAgICAgICAgQGNsaWNrPVwicmVwb3J0VXNlclwiXHJcbiAgICAgICAgICBsYWJlbD1cItCS0ZbQtNC/0YDQsNCy0LjRgtC4XCJcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dFN0eWxlXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOyBtYXJnaW46IDEwcHhcIj5cclxuICAgICAgICAgICAgICDQktC40LHQtdGA0ZbRgtGMINC30LDQs9C+0LvQvtCy0L7QuiDQtNC70Y8g0YHQutCw0YDQs9C4XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHEtc2VsZWN0IFxyXG4gICAgICAgICAgICBvdXRsaW5lZCBcclxuICAgICAgICAgICAgdi1tb2RlbD1cInJlcG9ydEhlYWRlclwiIFxyXG4gICAgICAgICAgICA6b3B0aW9ucz1cIm9wdGlvbnNcIiBcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA1MDA7IG1hcmdpbjogMTBweFwiPlxyXG4gICAgICAgICAgICAgINCU0LXRgtCw0LvRjNC90LjQuSDQvtC/0LjRgSDQktCw0YjQvtGXINGB0LrQsNGA0LPQuCAo0L7Qv9GG0ZbQvtC90LDQu9GM0L3QvilcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxxLWlucHV0IFxyXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJyZXBvcnREZXNjcmlwdGlvblwiIFxyXG4gICAgICAgICAgICAgIG91dGxpbmVkIFxyXG4gICAgICAgICAgICAgIGF1dG9ncm93IFxyXG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuXHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgUHJvZmlsZUljb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvaWNvbnMvUHJvZmlsZUljb24udnVlXCI7XHJcbmltcG9ydCDQn9GA0LjRlNC00L3QsNCy0YHRjyBmcm9tIFwiLi4vY29tcG9uZW50cy9UYWJKb2luZWQudnVlXCI7XHJcbmltcG9ydCDQodGC0LLQvtGA0LjQsiBmcm9tIFwiLi4vY29tcG9uZW50cy9UYWJDcmVhdGVkLnZ1ZVwiO1xyXG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSBcInZ1ZXhcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIFByb2ZpbGVJY29uLFxyXG4gICAg0J/RgNC40ZTQtNC90LDQstGB0Y8sXHJcbiAgICDQodGC0LLQvtGA0LjQsixcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmdldFByb2ZpbGUoKTtcclxuICB9LCAgXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIEFQSV9VUkw6IGltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9VUkwsXHJcbiAgICAgIHVzZXJFbWFpbDogXCJVc2VyRW1haWxcIixcclxuICAgICAgdXNlck5hbWU6IFwiVXNlck5hbWVcIixcclxuICAgICAgdGFiczogW1wi0J/RgNC40ZTQtNC90LDQstGB0Y9cIiwgXCLQodGC0LLQvtGA0LjQslwiXSxcclxuICAgICAgc2VsZWN0ZWQ6IFwi0J/RgNC40ZTQtNC90LDQstGB0Y9cIixcclxuICAgICAgdXNlclBhZ2U6IHRydWUsIFxyXG4gICAgICBzaG93UmVwb3J0RGV0YWlsczogZmFsc2UsXHJcbiAgICAgIHNob3dSZXBvcnRCdXR0b246IGZhbHNlLFxyXG4gICAgICByZXBvcnRIZWFkZXI6IG51bGwsXHJcbiAgICAgIHJlcG9ydERlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgJ9Cd0LXRhtC10L3Qt9GD0YDQvdC1INGW0LxcXCdcXNGPINC60L7RgNC40YHRgtGD0LLQsNGH0LAnLCBcclxuICAgICAgICAn0J3QtdC60L7RgNC10LrRgtC90LAg0YTQvtGC0L7Qs9GA0LDRhNGW0Y8g0L/RgNC+0YTRltC70Y4nLCBcclxuICAgICAgICAn0KHRgtCy0L7RgNC10L3QvdGPINGE0LDQu9GM0YjQuNCy0LjRhSDQv9C+0LTRltC5JywgXHJcbiAgICAgICAgJ9Ch0YLQstC+0YDQtdC90L3RjyDQvdC10LHQtdC30L/QtdGH0L3QuNGFINC/0L7QtNGW0LknLCBcclxuICAgICAgICAn0IbQvdGI0LUnXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwR2V0dGVycyh7XHJcbiAgICAgIHByb2ZpbGU6IFwiZ2V0UHJvZmlsZVwiLFxyXG4gICAgICBwcm9maWxlU3RhdHVzOiBcImdldFByb2ZpbGVTdGF0dXNcIixcclxuICAgICAgYXV0aFN0YXR1czogXCJnZXRTdGF0dXNcIixcclxuICAgIH0pLFxyXG4gIH0sXHJcbiAgYmVmb3JlUm91dGVVcGRhdGUodG8sIGZyb20sIG5leHQpIHtcclxuICAgIGlmICh0by5xdWVyeS5pZCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZ2V0UHJvZmlsZTEoKTtcclxuICAgIH1cclxuICAgIG5leHQoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGJhY2tUb1VzZXJQYWdlKCkge1xyXG4gICAgICB0aGlzLnNob3dSZXBvcnREZXRhaWxzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXNlclBhZ2UgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHJlcG9ydFVzZXJQYWdlKCl7XHJcbiAgICAgIHRoaXMuc2hvd1JlcG9ydERldGFpbHMgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVzZXJQYWdlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRQcm9maWxlKCkge1xyXG4gICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgbmFtZTogXCJlZGl0LXByb2ZpbGVcIixcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0UHJvZmlsZSgpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50VXNlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHJvdXRlLnF1ZXJ5LmlkKTtcclxuICAgICAgbGV0IHVzZXJJZDtcclxuICAgICAgaWYodGhpcy4kcm91dGUucXVlcnkuaWQgPT0gbnVsbCkge1xyXG4gICAgICAgIHVzZXJJZCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXJcclxuICAgICAgICB0aGlzLnNob3dSZXBvcnRCdXR0b24gPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHVzZXJJZCA9IHRoaXMuJHJvdXRlLnF1ZXJ5LmlkXHJcbiAgICAgICAgdGhpcy5zaG93UmVwb3J0QnV0dG9uID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXJJZCk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgIT0ge31cclxuICAgICAgICAgID8gdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfUFJPRklMRVwiLCB7XHJcbiAgICAgICAgICAgICAgaWQ6IHVzZXJJZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0UHJvZmlsZTEoKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgIT0ge31cclxuICAgICAgICAgID8gdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfUFJPRklMRVwiLCB7XHJcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHJlcG9ydFVzZXIoKSB7XHJcbiAgICAgIGlmICghdGhpcy5yZXBvcnRIZWFkZXIpIHtcclxuICAgICAgICBhbGVydCgn0JHRg9C00Ywg0LvQsNGB0LrQsCwg0LLQuNCx0LXRgNGW0YLRjCDQt9Cw0LPQvtC70L7QstC+0Log0LTQu9GPINCy0LDRiNC+0Zcg0YHQutCw0YDQs9C4LicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucmVwb3J0SGVhZGVyID09PSAn0IbQvdGI0LUnICYmICF0aGlzLnJlcG9ydERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoJ9CS0Lgg0LLQuNCx0YDQsNC70Lgg0LfQsNCz0L7Qu9C+0LLQvtC6IFwi0IbQvdGI0LVcIiwg0LHRg9C00Ywg0LvQsNGB0LrQsCwg0LTQvtC00LDQudGC0LUg0L7Qv9C40YEg0JLQsNGI0L7RlyDRgdC60LDRgNCz0LgnKTtcclxuICAgICAgICByZXR1cm47IFxyXG4gICAgICB9XHJcbiAgICAgIHZhciBfdXNlcklkID0gdGhpcy4kcm91dGUucXVlcnkuaWRcclxuICAgICAgLy9jb25zdCB1c2VyID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRQcm9maWxlO1xyXG4gICAgICB0aGlzLmN1clVzZXIgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRVc2VyO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1clVzZXIpO1xyXG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIlJFUE9SVF9VU0VSXCIsIHtcclxuICAgICAgICB1c2VySWQ6IF91c2VySWQsXHJcbiAgICAgICAgYXV0aG9ySWQ6IHRoaXMuY3VyVXNlcixcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgSGVhZGVyOiB0aGlzLnJlcG9ydEhlYWRlcixcclxuICAgICAgICAgIERlc2NyaXB0aW9uOiB0aGlzLnJlcG9ydERlc2NyaXB0aW9uLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnJlcGxhY2UoeyBwYXRoOiBcIi9wcm9maWxlLXBhZ2VcIiwgbmFtZTogXCJwcm9maWxlLXBhZ2VcIiwgcXVlcnk6IHsgaWQ6IHRoaXMuJHJvdXRlLnF1ZXJ5LmlkIH0gfSk7XHJcbiAgICAgICAgICB0aGlzLnNob3dSZXBvcnREZXRhaWxzID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnVzZXJQYWdlID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcG9ydEhlYWRlciA9IFwiXCI7XHJcbiAgICAgICAgICByZXBvcnREZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JzLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgICAgYWxlcnQoXCJFcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChcImxvZ091dFwiKTtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goXCIvc3RhcnQtbWVudVwiKTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi5Ub3BMaW5lIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuLmlucHV0U3R5bGUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBtYXgtd2lkdGg6IDk1JTtcclxuICBmb250LXNpemU6IDI1cHg7XHJcbn1cclxuXHJcbi5Ub3BMaW5lUHJvZmlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGhlaWdodDogMzZweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzhkOGQ4ZDtcclxufVxyXG5cclxuLnByb2ZpbGUtdGV4dCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnByb2ZpbGUtdGV4dC1zcGFjZXIge1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjsgLyog0KDQvtCx0LjRgtGMINCx0LvQvtC6INC90LXQstC40LTQuNC80LjQvCwg0LDQu9C1INCy0ZbQvSDQstGB0LUg0YnQtSDQt9Cw0LnQvNCw0ZQg0LzRltGB0YbQtSDQsiDQvNCw0LrQtdGC0ZYgKi9cclxufVxyXG5cclxuLmxvZ291dC1idXR0b24ge1xyXG4gIC8qINCd0LDQu9Cw0YjRgtGD0LLQsNC90L3RjyDRgdGC0LjQu9GW0LIg0LTQu9GPINC60L3QvtC/0LrQuCBMb2dvdXQsINGP0LrRidC+INC/0L7RgtGA0ZbQsdC90L4gKi9cclxufVxyXG5cclxuLmF2YXRhci1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnVzZXItaW1hZ2Uge1xyXG4gIHdpZHRoOiAxNTBweDtcclxuICBoZWlnaHQ6IDE1MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufVxyXG5cclxuLmJ1dHRvbi1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAwIDQwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnVzZXItZGV0YWlscyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDAgNDBweDtcclxufVxyXG5cclxuLmRldGFpbCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ubGFiZWwge1xyXG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBsaW5lLWhlaWdodDogMTNweDtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU2KTtcclxuICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbn1cclxuXHJcbi52YWx1ZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5mYWtlb2JqZWN0IHtcclxuICB3aWR0aDogMzAlO1xyXG59XHJcblxyXG4udGFiLWJ0biB7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICB3aWR0aDogNTAlO1xyXG59XHJcblxyXG4uYWN0aXZlIHtcclxuICBib3JkZXItYm90dG9tOiA0cHggc29saWQgcmdiKDAsIDAsIDApO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuXHJcbi50YWIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgcGFkZGluZzogMTBweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX2hvaXN0ZWRfMSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9ob2lzdGVkXzIiLCJfY3JlYXRlVk5vZGUiLCJfaG9pc3RlZF8zIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl9yZXNvbHZlRHluYW1pY0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQTJCQSxNQUFLQSxjQUFVO0FBQUEsRUFDYixPQUFPO0FBQUEsSUFDTCxJQUFJO0FBQUEsTUFDRixNQUFNLENBQUMsTUFBTTtBQUFBLE1BQ2IsU0FBUztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsUUFBUSxLQUFLO0FBQUE7RUFFaEI7QUFBQSxFQUVELFVBQVU7QUFDUixTQUFLLGNBQWE7QUFBQSxFQUNuQjtBQUFBLEVBRUQsVUFBVTtBQUFBLElBQ1IsR0FBRyxXQUFXO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDRjtBQUFBLEVBRUQsU0FBUztBQUFBLElBQ1AsTUFBTSxnQkFBZ0I7QUFDcEIsVUFBSSxLQUFLLFVBQVUsTUFBTTtBQUN2QjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLFFBQVEsSUFBSTtBQUFBLFFBQ2hCLEtBQUssV0FBVyxDQUFDLElBQ2IsS0FBSyxPQUFPLFNBQVMsbUJBQW1CLEVBQUUsSUFBSSxLQUFLLFFBQVEsSUFDM0Q7QUFBQSxNQUNOLENBQUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRyxLQUFLO0FB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
