import { e as QBtn, d as QInput, Q as QSpinner } from "./QBtn.a363fc1a.js";
import { _ as _export_sfc, J as mapGetters, K as resolveComponent, L as openBlock, Y as createElementBlock, O as createBaseVNode, a0 as toDisplayString, j as createVNode, v as withDirectives, aa as vShow, ao as normalizeClass, F as Fragment, Z as renderList, N as withCtx, $ as createTextVNode, ap as pushScopeId, aq as popScopeId } from "./index.6764d851.js";
import { c as convertJSONToDate } from "./convertDate.2fe32ce1.js";
import "./uid.627d4ed7.js";
var AdminMenu_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  components: {},
  data() {
    return {
      loadUsersComponent: false,
      loadEventsComponent: false,
      loadComplaintsComponent: false,
      loadComplaintDetailsComponent: false,
      isSearchActive: false,
      searchType: "all",
      searchWord: ""
    };
  },
  computed: {
    filteredUsers() {
      const searchWordLowerCase = this.searchWord.toLowerCase();
      if (this.searchType === "all") {
        return this.users;
      } else if (this.searchType === "id") {
        return this.users.filter((user) => {
          return user.id.toString().includes(searchWordLowerCase);
        });
      } else if (this.searchType === "email") {
        return this.users.filter((user) => {
          return user.email.includes(searchWordLowerCase);
        });
      } else if (this.searchType === "role") {
        return this.users.filter((user) => {
          return user.roles.length > 0 && user.roles[0].toLowerCase().includes(searchWordLowerCase);
        });
      } else {
        return this.users;
      }
    },
    ...mapGetters({
      users: "getUsers",
      status: "getUsersStatus",
      profile: "getProfile",
      events: "getEvents",
      allUsersComplaints: "getAllUsersComplaints",
      allEventsComplaints: "getAllEventsComplaints",
      allWebLogs: "getAllWebLogs"
    }),
    searchInputClasses() {
      return {
        "hidden md:!block lg:!block": !this.isSearchActive,
        "md:block": this.isSearchActive,
        "lg:block": this.isSearchActive,
        "sm:block": this.isSearchActive,
        "search-input": true
      };
    }
  },
  async mounted() {
    await this.getProfile();
    await this.getEvents();
  },
  methods: {
    convertJSONToDate(date) {
      return convertJSONToDate(date);
    },
    isSearchTypeActive(type) {
      return this.searchType === type;
    },
    loadUsers() {
      this.loadUsersComponent = true;
      this.loadLogsComponent = false;
      this.loadComplaintsComponent = false;
      this.getUsers();
    },
    loadLogs() {
      this.loadUsersComponent = false;
      this.loadLogsComponent = true;
      this.loadComplaintsComponent = false;
      this.getAllWebLogs();
    },
    loadComplaints() {
      this.loadUsersComponent = false;
      this.loadLogsComponent = false;
      this.loadComplaintsComponent = true;
      this.getAllUsersComplaints();
      this.getAllEventsComplaints();
    },
    async getProfile() {
      await Promise.all([
        this.profile != {} ? this.$store.dispatch("GET_PROFILE", {
          id: this.$store.getters.getCurrentUser
        }) : void 0
      ]);
    },
    async getEvents() {
      await Promise.all([
        this.events.length < 1 ? this.$store.dispatch("GET_EVENTS") : void 0
      ]);
    },
    banUser(userId) {
      this.$store.dispatch("BAN_USER", {
        userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        }
      });
    },
    unBanUser(userId) {
      this.$store.dispatch("UNBAN_USER", {
        userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        }
      });
    },
    deleteUser(userId) {
      this.$store.dispatch("DELETE_USER", {
        userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        }
      });
    },
    async getUsers() {
      await Promise.all([
        this.users.length < 1 ? this.$store.dispatch("GET_USERS") : void 0
      ]);
    },
    getAllUsersComplaints() {
      this.$store.dispatch("GET_ALL_USERS_COMPLAINTS");
    },
    getAllEventsComplaints() {
      this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS");
    },
    putStatusComplaint(complaintId, complaintStatus) {
      if (complaintStatus === "work" && complaintStatus != "process" && complaintStatus != "reject") {
        var finalStatus = "\u0412 \u0440\u043E\u0431\u043E\u0442\u0456 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: " + this.profile.email;
      } else if (complaintStatus === "process" && complaintStatus != "work" && complaintStatus != "reject") {
        var finalStatus = "\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: " + this.profile.email;
      } else if (complaintStatus === "reject" && complaintStatus != "process" && complaintStatus != "work") {
        var finalStatus = "\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: " + this.profile.email;
      } else {
        alert("Error");
      }
      console.log(complaintId);
      console.log(complaintStatus);
      console.log(finalStatus);
      this.$store.dispatch("PUT_STATUS_COMPLAINT", {
        formData: {
          Id: complaintId,
          Status: finalStatus
        },
        handler: (res) => {
          this.$store.dispatch("GET_ALL_USERS_COMPLAINTS");
          this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS");
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        }
      });
    },
    getAllWebLogs() {
      this.$store.dispatch("GET_ALL_WEB_LOGS");
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-7be2758a"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "" };
const _hoisted_2 = { class: "AdminTopLine" };
const _hoisted_3 = { class: "TopButtons" };
const _hoisted_4 = { class: "filters" };
const _hoisted_5 = {
  key: 0,
  class: "status"
};
const _hoisted_6 = {
  key: 1,
  class: "status"
};
const _hoisted_7 = { key: 2 };
const _hoisted_8 = { class: "scrollable-container2" };
const _hoisted_9 = {
  class: "flex mt-2",
  style: { "gap": "10px" }
};
const _hoisted_10 = { class: "w-full flex h-[90vh]" };
const _hoisted_11 = { class: "w-1/2 flex flex-col max-h-full" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-center mb-2" }, "User's complaints", -1));
const _hoisted_13 = { class: "overflow-auto flex-1" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: ", -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u041E\u043F\u0438\u0441:", -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0430\u0440\u0433\u0438: ", -1));
const _hoisted_20 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0427\u0430\u0441 \u043D\u0430\u0434\u0445\u043E\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0440\u0433\u0438:", -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_23 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0421\u0442\u0430\u0442\u0443\u0441:", -1));
const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_25 = {
  class: "flex mt-2",
  style: { "gap": "10px" }
};
const _hoisted_26 = { class: "w-1/2 flex flex-col h-[90vh]" };
const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-center mb-2" }, "Event's complaints", -1));
const _hoisted_28 = { class: "overflow-auto flex-1" };
const _hoisted_29 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_30 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u041D\u043E\u043C\u0435\u0440 \u043F\u043E\u0434\u0456\u0457: ", -1));
const _hoisted_31 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u041E\u043F\u0438\u0441:", -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_34 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0430\u0440\u0433\u0438: ", -1));
const _hoisted_35 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_36 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0427\u0430\u0441 \u043D\u0430\u0434\u0445\u043E\u0434\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0440\u0433\u0438:", -1));
const _hoisted_37 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_38 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "\u0421\u0442\u0430\u0442\u0443\u0441:", -1));
const _hoisted_39 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_40 = {
  class: "flex mt-2",
  style: { "gap": "10px" }
};
const _hoisted_41 = { class: "scrollable-container3" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, " Admin: " + toDisplayString(_ctx.profile.email) + " - " + toDisplayString(_ctx.profile.name), 1),
    createBaseVNode("div", _hoisted_3, [
      createVNode(QBtn, {
        onClick: $options.loadUsers,
        label: "Users",
        color: "green-10"
      }, null, 8, ["onClick"]),
      createVNode(QBtn, {
        onClick: $options.loadComplaints,
        label: "Complaints",
        color: "orange-14"
      }, null, 8, ["onClick"]),
      createVNode(QBtn, {
        onClick: $options.loadLogs,
        label: "Logs",
        color: "red-14"
      }, null, 8, ["onClick"])
    ]),
    withDirectives(createBaseVNode("div", null, [
      createVNode(QInput, {
        class: "search",
        type: "text",
        modelValue: $data.searchWord,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchWord = $event),
        placeholder: "Enter symbols"
      }, null, 8, ["modelValue"]),
      createBaseVNode("div", _hoisted_4, [
        createVNode(QBtn, {
          label: "Show all users",
          onClick: _cache[1] || (_cache[1] = ($event) => $data.searchType = "all"),
          class: normalizeClass({ active: $options.isSearchTypeActive("all") })
        }, null, 8, ["class"]),
        createVNode(QBtn, {
          label: "ID search",
          onClick: _cache[2] || (_cache[2] = ($event) => $data.searchType = "id"),
          class: normalizeClass({ active: $options.isSearchTypeActive("id") })
        }, null, 8, ["class"]),
        createVNode(QBtn, {
          label: "Email search",
          onClick: _cache[3] || (_cache[3] = ($event) => $data.searchType = "email"),
          class: normalizeClass({ active: $options.isSearchTypeActive("email") })
        }, null, 8, ["class"]),
        createVNode(QBtn, {
          label: "Role search",
          onClick: _cache[4] || (_cache[4] = ($event) => $data.searchType = "role"),
          class: normalizeClass({ active: $options.isSearchTypeActive("role") })
        }, null, 8, ["class"])
      ]),
      _ctx.status == "loading" ? (openBlock(), createElementBlock("div", _hoisted_5, [
        createVNode(QSpinner, {
          color: "primary",
          size: "3em",
          class: "mx-auto"
        })
      ])) : _ctx.status == "error" ? (openBlock(), createElementBlock("div", _hoisted_6, " \u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A - \u043F\u0435\u0432\u043D\u043E, \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0438 \u0437\u0456 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C. ")) : (openBlock(), createElementBlock("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredUsers, (user, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "event-item relative"
            }, [
              createVNode(_component_router_link, {
                to: "/profile-page?id=" + user.id
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(user.id) + " - " + toDisplayString(user.email) + " - " + toDisplayString(user.roles), 1)
                ]),
                _: 2
              }, 1032, ["to"]),
              createBaseVNode("div", _hoisted_9, [
                createVNode(QBtn, {
                  label: "Ban",
                  onClick: ($event) => $options.banUser(user.id),
                  color: "positive",
                  disable: user.roles.includes("BannedUser") || user.roles.includes("Admin")
                }, null, 8, ["onClick", "disable"]),
                createVNode(QBtn, {
                  label: "Unban",
                  onClick: ($event) => $options.unBanUser(user.id),
                  color: "positive",
                  disable: user.roles.includes("User") || user.roles.includes("Admin")
                }, null, 8, ["onClick", "disable"]),
                createVNode(QBtn, {
                  label: "Delete User",
                  onClick: ($event) => $options.deleteUser(user.id),
                  color: "red-14",
                  disable: user.roles.includes("Admin")
                }, null, 8, ["onClick", "disable"]),
                createVNode(QBtn, {
                  label: "User's events",
                  onClick: _cache[5] || (_cache[5] = ($event) => $options.getAllUsersComplaints()),
                  color: "positive"
                })
              ])
            ]);
          }), 128))
        ])
      ]))
    ], 512), [
      [vShow, $data.loadUsersComponent]
    ]),
    withDirectives(createBaseVNode("div", _hoisted_10, [
      createBaseVNode("div", _hoisted_11, [
        _hoisted_12,
        createVNode(QInput, {
          class: "search",
          type: "text",
          modelValue: $data.searchWord,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.searchWord = $event),
          placeholder: "Enter symbols"
        }, null, 8, ["modelValue"]),
        createBaseVNode("div", _hoisted_13, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allUsersComplaints, (userComplaint, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "event-complaint relative"
            }, [
              createBaseVNode("b", null, toDisplayString(userComplaint.header === "\u0406\u043D\u0448\u0435" ? "\u0406\u043D\u0448\u0435: " + userComplaint.description : userComplaint.header), 1),
              _hoisted_14,
              _hoisted_15,
              createVNode(_component_router_link, {
                to: "/profile-page?id=" + userComplaint.userId,
                class: "clickable-link",
                style: { "font-weight": "normal" }
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(userComplaint.userEmail) + " ", 1),
                  _hoisted_16
                ]),
                _: 2
              }, 1032, ["to"]),
              _hoisted_17,
              createTextVNode(" " + toDisplayString(userComplaint.description), 1),
              _hoisted_18,
              _hoisted_19,
              createVNode(_component_router_link, {
                to: "/profile-page?id=" + userComplaint.authorId,
                class: "clickable-link",
                style: { "font-weight": "normal" }
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(userComplaint.authorEmail) + " ", 1),
                  _hoisted_20
                ]),
                _: 2
              }, 1032, ["to"]),
              _hoisted_21,
              createTextVNode(" " + toDisplayString($options.convertJSONToDate(userComplaint.time)), 1),
              _hoisted_22,
              _hoisted_23,
              createTextVNode(" " + toDisplayString(userComplaint.status), 1),
              _hoisted_24,
              createBaseVNode("div", _hoisted_25, [
                createVNode(QBtn, {
                  label: "\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E",
                  onClick: ($event) => $options.putStatusComplaint(userComplaint.id, "process"),
                  color: "green-10",
                  disabled: userComplaint && userComplaint.status && (userComplaint.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E") || userComplaint.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))
                }, null, 8, ["onClick", "disabled"]),
                createVNode(QBtn, {
                  label: "\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u0442\u0438",
                  onClick: ($event) => $options.putStatusComplaint(userComplaint.id, "reject"),
                  color: "red-14",
                  disabled: userComplaint && userComplaint.status && (userComplaint.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E") || userComplaint.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))
                }, null, 8, ["onClick", "disabled"])
              ])
            ]);
          }), 128))
        ])
      ]),
      createBaseVNode("div", _hoisted_26, [
        _hoisted_27,
        createVNode(QInput, {
          class: "search",
          type: "text",
          modelValue: $data.searchWord,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.searchWord = $event),
          placeholder: "Enter symbols"
        }, null, 8, ["modelValue"]),
        createBaseVNode("div", _hoisted_28, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allEventsComplaints, (eventComplaint, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "event-complaint relative"
            }, [
              createBaseVNode("b", null, toDisplayString(eventComplaint.header === "\u0406\u043D\u0448\u0435" ? "\u0406\u043D\u0448\u0435: " + eventComplaint.description : eventComplaint.header), 1),
              _hoisted_29,
              _hoisted_30,
              createVNode(_component_router_link, {
                to: "/event-page?id=" + eventComplaint.eventId,
                class: "clickable-link",
                style: { "font-weight": "normal" }
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(eventComplaint.eventId) + " ", 1),
                  _hoisted_31
                ]),
                _: 2
              }, 1032, ["to"]),
              _hoisted_32,
              createTextVNode(" " + toDisplayString(eventComplaint.description), 1),
              _hoisted_33,
              _hoisted_34,
              createVNode(_component_router_link, {
                to: "/profile-page?id=" + eventComplaint.authorId,
                class: "clickable-link",
                style: { "font-weight": "normal" }
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(eventComplaint.authorEmail) + " ", 1),
                  _hoisted_35
                ]),
                _: 2
              }, 1032, ["to"]),
              _hoisted_36,
              createTextVNode(" " + toDisplayString($options.convertJSONToDate(eventComplaint.time)), 1),
              _hoisted_37,
              _hoisted_38,
              createTextVNode(" " + toDisplayString(eventComplaint.status), 1),
              _hoisted_39,
              createBaseVNode("div", _hoisted_40, [
                createVNode(QBtn, {
                  label: "\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E",
                  onClick: ($event) => $options.putStatusComplaint(eventComplaint.id, "process"),
                  color: "green-10",
                  disabled: eventComplaint && eventComplaint.status && (eventComplaint.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E") || eventComplaint.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))
                }, null, 8, ["onClick", "disabled"]),
                createVNode(QBtn, {
                  label: "\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u0442\u0438",
                  onClick: ($event) => $options.putStatusComplaint(eventComplaint.id, "reject"),
                  color: "red-14",
                  disabled: eventComplaint && eventComplaint.status && (eventComplaint.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E") || eventComplaint.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))
                }, null, 8, ["onClick", "disabled"])
              ])
            ]);
          }), 128))
        ])
      ])
    ], 512), [
      [vShow, $data.loadComplaintsComponent]
    ]),
    withDirectives(createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_41, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allWebLogs, (log, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "event-item relative"
          }, [
            createBaseVNode("b", null, toDisplayString(log.id) + ": " + toDisplayString(log.description), 1),
            createTextVNode(" - " + toDisplayString($options.convertJSONToDate(log.time)), 1)
          ]);
        }), 128))
      ])
    ], 512), [
      [vShow, _ctx.loadLogsComponent]
    ])
  ]);
}
var AdminMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7be2758a"], ["__file", "AdminMenu.vue"]]);
export { AdminMenu as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5NZW51LjViNjU4NzI1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQWRtaW5NZW51LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIkFkbWluVG9wTGluZVwiPlxyXG4gICAgICBBZG1pbjoge3sgcHJvZmlsZS5lbWFpbCB9fSAtIHt7IHByb2ZpbGUubmFtZSB9fVxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIlRvcEJ1dHRvbnNcIj5cclxuICAgICAgPHEtYnRuIEBjbGljaz1cImxvYWRVc2Vyc1wiIGxhYmVsPVwiVXNlcnNcIiBjb2xvcj1cImdyZWVuLTEwXCIgLz5cclxuICAgICAgPHEtYnRuIEBjbGljaz1cImxvYWRDb21wbGFpbnRzXCIgbGFiZWw9XCJDb21wbGFpbnRzXCIgY29sb3I9XCJvcmFuZ2UtMTRcIiAvPlxyXG4gICAgICA8cS1idG4gQGNsaWNrPVwibG9hZExvZ3NcIiBsYWJlbD1cIkxvZ3NcIiBjb2xvcj1cInJlZC0xNFwiIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IHYtc2hvdz1cImxvYWRVc2Vyc0NvbXBvbmVudFwiPlxyXG4gICAgICA8cS1pbnB1dFxyXG4gICAgICAgIGNsYXNzPVwic2VhcmNoXCJcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgdi1tb2RlbD1cInNlYXJjaFdvcmRcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgc3ltYm9sc1wiXHJcbiAgICAgID5cclxuICAgICAgPC9xLWlucHV0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgbGFiZWw9XCJTaG93IGFsbCB1c2Vyc1wiXHJcbiAgICAgICAgICBAY2xpY2s9XCJzZWFyY2hUeXBlID0gJ2FsbCdcIlxyXG4gICAgICAgICAgOmNsYXNzPVwieyBhY3RpdmU6IGlzU2VhcmNoVHlwZUFjdGl2ZSgnYWxsJykgfVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGxhYmVsPVwiSUQgc2VhcmNoXCJcclxuICAgICAgICAgIEBjbGljaz1cInNlYXJjaFR5cGUgPSAnaWQnXCJcclxuICAgICAgICAgIDpjbGFzcz1cInsgYWN0aXZlOiBpc1NlYXJjaFR5cGVBY3RpdmUoJ2lkJykgfVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGxhYmVsPVwiRW1haWwgc2VhcmNoXCJcclxuICAgICAgICAgIEBjbGljaz1cInNlYXJjaFR5cGUgPSAnZW1haWwnXCJcclxuICAgICAgICAgIDpjbGFzcz1cInsgYWN0aXZlOiBpc1NlYXJjaFR5cGVBY3RpdmUoJ2VtYWlsJykgfVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGxhYmVsPVwiUm9sZSBzZWFyY2hcIlxyXG4gICAgICAgICAgQGNsaWNrPVwic2VhcmNoVHlwZSA9ICdyb2xlJ1wiXHJcbiAgICAgICAgICA6Y2xhc3M9XCJ7IGFjdGl2ZTogaXNTZWFyY2hUeXBlQWN0aXZlKCdyb2xlJykgfVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgdi1pZj1cInN0YXR1cyA9PSAnbG9hZGluZydcIiBjbGFzcz1cInN0YXR1c1wiPlxyXG4gICAgICAgIDxxLXNwaW5uZXIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjNlbVwiIGNsYXNzPVwibXgtYXV0b1wiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cInN0YXR1cyA9PSAnZXJyb3InXCIgY2xhc3M9XCJzdGF0dXNcIj5cclxuICAgICAgICDQqdC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6IC0g0L/QtdCy0L3Qviwg0L/RgNC+0LHQu9C10LzQuCDQt9GWINC3J9GU0LTQvdCw0L3QvdGP0LwuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsYWJsZS1jb250YWluZXIyXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwiKHVzZXIsIGluZGV4KSBpbiBmaWx0ZXJlZFVzZXJzXCJcclxuICAgICAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJldmVudC1pdGVtIHJlbGF0aXZlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cIicvcHJvZmlsZS1wYWdlP2lkPScgKyB1c2VyLmlkXCI+XHJcbiAgICAgICAgICAgICAge3sgdXNlci5pZCB9fSAtIHt7IHVzZXIuZW1haWwgfX0gLSB7eyB1c2VyLnJvbGVzIH19XHJcbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IG10LTJcIiBzdHlsZT1cImdhcDogMTBweFwiPlxyXG4gICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJCYW5cIlxyXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiYmFuVXNlcih1c2VyLmlkKVwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcclxuICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiXHJcbiAgICAgICAgICAgICAgICAgIHVzZXIucm9sZXMuaW5jbHVkZXMoJ0Jhbm5lZFVzZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgICB1c2VyLnJvbGVzLmluY2x1ZGVzKCdBZG1pbicpXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlVuYmFuXCJcclxuICAgICAgICAgICAgICAgIEBjbGljaz1cInVuQmFuVXNlcih1c2VyLmlkKVwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcclxuICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiXHJcbiAgICAgICAgICAgICAgICAgIHVzZXIucm9sZXMuaW5jbHVkZXMoJ1VzZXInKSB8fCB1c2VyLnJvbGVzLmluY2x1ZGVzKCdBZG1pbicpXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkRlbGV0ZSBVc2VyXCJcclxuICAgICAgICAgICAgICAgIEBjbGljaz1cImRlbGV0ZVVzZXIodXNlci5pZClcIlxyXG4gICAgICAgICAgICAgICAgY29sb3I9XCJyZWQtMTRcIlxyXG4gICAgICAgICAgICAgICAgOmRpc2FibGU9XCJ1c2VyLnJvbGVzLmluY2x1ZGVzKCdBZG1pbicpXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJVc2VyJ3MgZXZlbnRzXCJcclxuICAgICAgICAgICAgICAgIEBjbGljaz1cImdldEFsbFVzZXJzQ29tcGxhaW50cygpXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiB2LXNob3c9XCJsb2FkQ29tcGxhaW50c0NvbXBvbmVudFwiIGNsYXNzPVwidy1mdWxsIGZsZXggaC1bOTB2aF1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInctMS8yIGZsZXggZmxleC1jb2wgbWF4LWgtZnVsbFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciBtYi0yXCI+VXNlcidzIGNvbXBsYWludHM8L2Rpdj5cclxuICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgY2xhc3M9XCJzZWFyY2hcIlxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgdi1tb2RlbD1cInNlYXJjaFdvcmRcIlxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzeW1ib2xzXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9xLWlucHV0PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvdmVyZmxvdy1hdXRvIGZsZXgtMVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICB2LWZvcj1cIih1c2VyQ29tcGxhaW50LCBpbmRleCkgaW4gYWxsVXNlcnNDb21wbGFpbnRzXCJcclxuICAgICAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJldmVudC1jb21wbGFpbnQgcmVsYXRpdmVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Yj5cclxuICAgICAgICAgICAgICB7e1xyXG4gICAgICAgICAgICAgICAgdXNlckNvbXBsYWludC5oZWFkZXIgPT09IFwi0IbQvdGI0LVcIlxyXG4gICAgICAgICAgICAgICAgICA/IFwi0IbQvdGI0LU6IFwiICsgdXNlckNvbXBsYWludC5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICA6IHVzZXJDb21wbGFpbnQuaGVhZGVyXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPC9iPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGI+0JrQvtGA0LjRgdGC0YPQstCw0Yc6IDwvYj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rXHJcbiAgICAgICAgICAgICAgOnRvPVwiJy9wcm9maWxlLXBhZ2U/aWQ9JyArIHVzZXJDb21wbGFpbnQudXNlcklkXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImNsaWNrYWJsZS1saW5rXCJcclxuICAgICAgICAgICAgICBzdHlsZT1cImZvbnQtd2VpZ2h0OiBub3JtYWxcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3sgdXNlckNvbXBsYWludC51c2VyRW1haWwgfX0gPGJyIC8+XHJcbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxiPtCe0L/QuNGBOjwvYj4ge3sgdXNlckNvbXBsYWludC5kZXNjcmlwdGlvbiB9fTxiciAvPlxyXG4gICAgICAgICAgICA8Yj7QkNCy0YLQvtGAINGB0LrQsNGA0LPQuDogPC9iPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmtcclxuICAgICAgICAgICAgICA6dG89XCInL3Byb2ZpbGUtcGFnZT9pZD0nICsgdXNlckNvbXBsYWludC5hdXRob3JJZFwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjbGlja2FibGUtbGlua1wiXHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJmb250LXdlaWdodDogbm9ybWFsXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt7IHVzZXJDb21wbGFpbnQuYXV0aG9yRW1haWwgfX0gPGJyIC8+XHJcbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxiPtCn0LDRgSDQvdCw0LTRhdC+0LbQtdC90L3RjyDRgdC60LDRgNCz0Lg6PC9iPlxyXG4gICAgICAgICAgICB7eyBjb252ZXJ0SlNPTlRvRGF0ZSh1c2VyQ29tcGxhaW50LnRpbWUpIH19PGJyIC8+XHJcbiAgICAgICAgICAgIDxiPtCh0YLQsNGC0YPRgTo8L2I+IHt7IHVzZXJDb21wbGFpbnQuc3RhdHVzIH19PGJyIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IG10LTJcIiBzdHlsZT1cImdhcDogMTBweFwiPlxyXG4gICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLQntC/0YDQsNGG0YzQvtCy0LDQvdC+XCJcclxuICAgICAgICAgICAgICAgIEBjbGljaz1cInB1dFN0YXR1c0NvbXBsYWludCh1c2VyQ29tcGxhaW50LmlkLCAncHJvY2VzcycpXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yPVwiZ3JlZW4tMTBcIlxyXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiXHJcbiAgICAgICAgICAgICAgICAgIHVzZXJDb21wbGFpbnQgJiZcclxuICAgICAgICAgICAgICAgICAgdXNlckNvbXBsYWludC5zdGF0dXMgJiZcclxuICAgICAgICAgICAgICAgICAgKHVzZXJDb21wbGFpbnQuc3RhdHVzLnN0YXJ0c1dpdGgoJ9Ce0L/RgNCw0YbRjNC+0LLQsNC90L4nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJDb21wbGFpbnQuc3RhdHVzLnN0YXJ0c1dpdGgoJ9CS0ZbQtNGF0LjQu9C10L3QvicpKVxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLQktGW0LTRhdC40LvQuNGC0LhcIlxyXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwicHV0U3RhdHVzQ29tcGxhaW50KHVzZXJDb21wbGFpbnQuaWQsICdyZWplY3QnKVwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInJlZC0xNFwiXHJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJcclxuICAgICAgICAgICAgICAgICAgdXNlckNvbXBsYWludCAmJlxyXG4gICAgICAgICAgICAgICAgICB1c2VyQ29tcGxhaW50LnN0YXR1cyAmJlxyXG4gICAgICAgICAgICAgICAgICAodXNlckNvbXBsYWludC5zdGF0dXMuc3RhcnRzV2l0aCgn0J7Qv9GA0LDRhtGM0L7QstCw0L3QvicpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckNvbXBsYWludC5zdGF0dXMuc3RhcnRzV2l0aCgn0JLRltC00YXQuNC70LXQvdC+JykpXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidy0xLzIgZmxleCBmbGV4LWNvbCBoLVs5MHZoXVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciBtYi0yXCI+RXZlbnQncyBjb21wbGFpbnRzPC9kaXY+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIGNsYXNzPVwic2VhcmNoXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hXb3JkXCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgc3ltYm9sc1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmZsb3ctYXV0byBmbGV4LTFcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgdi1mb3I9XCIoZXZlbnRDb21wbGFpbnQsIGluZGV4KSBpbiBhbGxFdmVudHNDb21wbGFpbnRzXCJcclxuICAgICAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJldmVudC1jb21wbGFpbnQgcmVsYXRpdmVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Yj5cclxuICAgICAgICAgICAgICB7e1xyXG4gICAgICAgICAgICAgICAgZXZlbnRDb21wbGFpbnQuaGVhZGVyID09PSBcItCG0L3RiNC1XCJcclxuICAgICAgICAgICAgICAgICAgPyBcItCG0L3RiNC1OiBcIiArIGV2ZW50Q29tcGxhaW50LmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgIDogZXZlbnRDb21wbGFpbnQuaGVhZGVyXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPC9iPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGI+0J3QvtC80LXRgCDQv9C+0LTRltGXOiA8L2I+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGlua1xyXG4gICAgICAgICAgICAgIDp0bz1cIicvZXZlbnQtcGFnZT9pZD0nICsgZXZlbnRDb21wbGFpbnQuZXZlbnRJZFwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjbGlja2FibGUtbGlua1wiXHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJmb250LXdlaWdodDogbm9ybWFsXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt7IGV2ZW50Q29tcGxhaW50LmV2ZW50SWQgfX0gPGJyIC8+XHJcbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxiPtCe0L/QuNGBOjwvYj4ge3sgZXZlbnRDb21wbGFpbnQuZGVzY3JpcHRpb24gfX08YnIgLz5cclxuICAgICAgICAgICAgPGI+0JDQstGC0L7RgCDRgdC60LDRgNCz0Lg6IDwvYj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rXHJcbiAgICAgICAgICAgICAgOnRvPVwiJy9wcm9maWxlLXBhZ2U/aWQ9JyArIGV2ZW50Q29tcGxhaW50LmF1dGhvcklkXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImNsaWNrYWJsZS1saW5rXCJcclxuICAgICAgICAgICAgICBzdHlsZT1cImZvbnQtd2VpZ2h0OiBub3JtYWxcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3sgZXZlbnRDb21wbGFpbnQuYXV0aG9yRW1haWwgfX0gPGJyIC8+XHJcbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxiPtCn0LDRgSDQvdCw0LTRhdC+0LTQttC10L3QvdGPINGB0LrQsNGA0LPQuDo8L2I+XHJcbiAgICAgICAgICAgIHt7IGNvbnZlcnRKU09OVG9EYXRlKGV2ZW50Q29tcGxhaW50LnRpbWUpIH19PGJyIC8+XHJcbiAgICAgICAgICAgIDxiPtCh0YLQsNGC0YPRgTo8L2I+IHt7IGV2ZW50Q29tcGxhaW50LnN0YXR1cyB9fTxiciAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBtdC0yXCIgc3R5bGU9XCJnYXA6IDEwcHhcIj5cclxuICAgICAgICAgICAgICA8cS1idG5cclxuICAgICAgICAgICAgICAgIGxhYmVsPVwi0J7Qv9GA0LDRhtGM0L7QstCw0L3QvlwiXHJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJwdXRTdGF0dXNDb21wbGFpbnQoZXZlbnRDb21wbGFpbnQuaWQsICdwcm9jZXNzJylcIlxyXG4gICAgICAgICAgICAgICAgY29sb3I9XCJncmVlbi0xMFwiXHJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJcclxuICAgICAgICAgICAgICAgICAgZXZlbnRDb21wbGFpbnQgJiZcclxuICAgICAgICAgICAgICAgICAgZXZlbnRDb21wbGFpbnQuc3RhdHVzICYmXHJcbiAgICAgICAgICAgICAgICAgIChldmVudENvbXBsYWludC5zdGF0dXMuc3RhcnRzV2l0aCgn0J7Qv9GA0LDRhtGM0L7QstCw0L3QvicpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDb21wbGFpbnQuc3RhdHVzLnN0YXJ0c1dpdGgoJ9CS0ZbQtNGF0LjQu9C10L3QvicpKVxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLQktGW0LTRhdC40LvQuNGC0LhcIlxyXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwicHV0U3RhdHVzQ29tcGxhaW50KGV2ZW50Q29tcGxhaW50LmlkLCAncmVqZWN0JylcIlxyXG4gICAgICAgICAgICAgICAgY29sb3I9XCJyZWQtMTRcIlxyXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiXHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50Q29tcGxhaW50ICYmXHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50Q29tcGxhaW50LnN0YXR1cyAmJlxyXG4gICAgICAgICAgICAgICAgICAoZXZlbnRDb21wbGFpbnQuc3RhdHVzLnN0YXJ0c1dpdGgoJ9Ce0L/RgNCw0YbRjNC+0LLQsNC90L4nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q29tcGxhaW50LnN0YXR1cy5zdGFydHNXaXRoKCfQktGW0LTRhdC40LvQtdC90L4nKSlcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IHYtc2hvdz1cImxvYWRMb2dzQ29tcG9uZW50XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGxhYmxlLWNvbnRhaW5lcjNcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICB2LWZvcj1cIihsb2csIGluZGV4KSBpbiBhbGxXZWJMb2dzXCJcclxuICAgICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICBjbGFzcz1cImV2ZW50LWl0ZW0gcmVsYXRpdmVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxiPiB7eyBsb2cuaWQgfX06IHt7IGxvZy5kZXNjcmlwdGlvbiB9fSA8L2I+IC1cclxuICAgICAgICAgIHt7IGNvbnZlcnRKU09OVG9EYXRlKGxvZy50aW1lKSB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGNvbnZlcnRKU09OVG9EYXRlIH0gZnJvbSBcIi4uL2NvbnZlcnREYXRlXCI7XHJcbmltcG9ydCBUb3BQYW5lbCBmcm9tIFwic3JjL2NvbXBvbmVudHMvVG9wUGFuZWwudnVlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7fSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9hZFVzZXJzQ29tcG9uZW50OiBmYWxzZSxcclxuICAgICAgbG9hZEV2ZW50c0NvbXBvbmVudDogZmFsc2UsXHJcbiAgICAgIGxvYWRDb21wbGFpbnRzQ29tcG9uZW50OiBmYWxzZSxcclxuICAgICAgbG9hZENvbXBsYWludERldGFpbHNDb21wb25lbnQ6IGZhbHNlLFxyXG4gICAgICBpc1NlYXJjaEFjdGl2ZTogZmFsc2UsXHJcbiAgICAgIHNlYXJjaFR5cGU6IFwiYWxsXCIsXHJcbiAgICAgIHNlYXJjaFdvcmQ6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGZpbHRlcmVkVXNlcnMoKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFdvcmRMb3dlckNhc2UgPSB0aGlzLnNlYXJjaFdvcmQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNlYXJjaFR5cGUgPT09IFwiYWxsXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VycztcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFR5cGUgPT09IFwiaWRcIikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHVzZXIuaWQudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2hXb3JkTG93ZXJDYXNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFR5cGUgPT09IFwiZW1haWxcIikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHVzZXIuZW1haWwuaW5jbHVkZXMoc2VhcmNoV29yZExvd2VyQ2FzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hUeXBlID09PSBcInJvbGVcIikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdXNlci5yb2xlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgIHVzZXIucm9sZXNbMF0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hXb3JkTG93ZXJDYXNlKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VycztcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICB1c2VyczogXCJnZXRVc2Vyc1wiLFxyXG4gICAgICBzdGF0dXM6IFwiZ2V0VXNlcnNTdGF0dXNcIixcclxuICAgICAgcHJvZmlsZTogXCJnZXRQcm9maWxlXCIsXHJcbiAgICAgIGV2ZW50czogXCJnZXRFdmVudHNcIixcclxuICAgICAgYWxsVXNlcnNDb21wbGFpbnRzOiBcImdldEFsbFVzZXJzQ29tcGxhaW50c1wiLFxyXG4gICAgICBhbGxFdmVudHNDb21wbGFpbnRzOiBcImdldEFsbEV2ZW50c0NvbXBsYWludHNcIixcclxuICAgICAgYWxsV2ViTG9nczogXCJnZXRBbGxXZWJMb2dzXCIsXHJcbiAgICB9KSxcclxuICAgIHNlYXJjaElucHV0Q2xhc3NlcygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBcImhpZGRlbiBtZDohYmxvY2sgbGc6IWJsb2NrXCI6ICF0aGlzLmlzU2VhcmNoQWN0aXZlLCAvLyDQmtC+0LvQuCDQv9C+0YjRg9C6INC90LUg0LDQutGC0LjQstC90LjQuSwg0LLQuNC60L7RgNC40YHRgtC+0LLRg9C50YLQtSAnaGlkZGVuJ1xyXG4gICAgICAgIFwibWQ6YmxvY2tcIjogdGhpcy5pc1NlYXJjaEFjdGl2ZSwgLy8g0JrQvtC70Lgg0L/QvtGI0YPQuiDQsNC60YLQuNCy0L3QuNC5LCDQv9C+0LrQsNC30LDRgtC4INC90LAg0YHQtdGA0LXQtNC90ZbRhSDQtdC60YDQsNC90LDRhVxyXG4gICAgICAgIFwibGc6YmxvY2tcIjogdGhpcy5pc1NlYXJjaEFjdGl2ZSwgLy8g0JrQvtC70Lgg0L/QvtGI0YPQuiDQsNC60YLQuNCy0L3QuNC5LCDQv9C+0LrQsNC30LDRgtC4INC90LAg0LLQtdC70LjQutC40YUg0LXQutGA0LDQvdCw0YVcclxuICAgICAgICBcInNtOmJsb2NrXCI6IHRoaXMuaXNTZWFyY2hBY3RpdmUsXHJcbiAgICAgICAgXCJzZWFyY2gtaW5wdXRcIjogdHJ1ZSwgLy8g0JfQsNCy0LbQtNC4INCy0LjQutC+0YDQuNGB0YLQvtCy0YPQudGC0LUg0YbQtdC5INC60LvQsNGBINC00LvRjyDRgdGC0LjQu9GW0LJcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5nZXRQcm9maWxlKCk7XHJcbiAgICAvL2F3YWl0IHRoaXMuZ2V0VXNlcnMoKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0RXZlbnRzKCk7XHJcbiAgICAvL2F3YWl0IHRoaXMuZ2V0QWxsVXNlcnNDb21wbGFpbnRzKCk7XHJcbiAgICAvL2F3YWl0IHRoaXMuZ2V0QWxsRXZlbnRzQ29tcGxhaW50cygpO1xyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGNvbnZlcnRKU09OVG9EYXRlKGRhdGUpIHtcclxuICAgICAgcmV0dXJuIGNvbnZlcnRKU09OVG9EYXRlKGRhdGUpO1xyXG4gICAgfSxcclxuICAgIGlzU2VhcmNoVHlwZUFjdGl2ZSh0eXBlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaFR5cGUgPT09IHR5cGU7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRVc2VycygpIHtcclxuICAgICAgdGhpcy5sb2FkVXNlcnNDb21wb25lbnQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmxvYWRMb2dzQ29tcG9uZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubG9hZENvbXBsYWludHNDb21wb25lbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkTG9ncygpIHtcclxuICAgICAgdGhpcy5sb2FkVXNlcnNDb21wb25lbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5sb2FkTG9nc0NvbXBvbmVudCA9IHRydWU7XHJcbiAgICAgIHRoaXMubG9hZENvbXBsYWludHNDb21wb25lbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5nZXRBbGxXZWJMb2dzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRDb21wbGFpbnRzKCkge1xyXG4gICAgICB0aGlzLmxvYWRVc2Vyc0NvbXBvbmVudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmxvYWRMb2dzQ29tcG9uZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubG9hZENvbXBsYWludHNDb21wb25lbnQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5nZXRBbGxVc2Vyc0NvbXBsYWludHMoKTtcclxuICAgICAgdGhpcy5nZXRBbGxFdmVudHNDb21wbGFpbnRzKCk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0UHJvZmlsZSgpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRVc2VyKTtcclxuXHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgIT0ge31cclxuICAgICAgICAgID8gdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfUFJPRklMRVwiLCB7XHJcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0RXZlbnRzKCkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy5ldmVudHMubGVuZ3RoIDwgMSA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0VWRU5UU1wiKSA6IHVuZGVmaW5lZCxcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJhblVzZXIodXNlcklkKSB7XHJcbiAgICAgIC8vdGhpcy5jb25maXJtQWN0aW9uKCdiYW5Vc2VyJywgdXNlcklkKTtcclxuXHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiQkFOX1VTRVJcIiwge1xyXG4gICAgICAgIHVzZXJJZDogdXNlcklkLFxyXG4gICAgICAgIGFkbWluRW1haWw6IHRoaXMucHJvZmlsZS5lbWFpbCxcclxuICAgICAgICBoYW5kbGVyOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9VU0VSU1wiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZXJFcnJvcjogKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoXCJFcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bkJhblVzZXIodXNlcklkKSB7XHJcbiAgICAgIC8vdGhpcy5jb25maXJtQWN0aW9uKCd1bkJhblVzZXInLCB1c2VySWQpO1xyXG5cclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJVTkJBTl9VU0VSXCIsIHtcclxuICAgICAgICB1c2VySWQ6IHVzZXJJZCxcclxuICAgICAgICBhZG1pbkVtYWlsOiB0aGlzLnByb2ZpbGUuZW1haWwsXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfVVNFUlNcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlVXNlcih1c2VySWQpIHtcclxuICAgICAgLy90aGlzLmNvbmZpcm1BY3Rpb24oJ2RlbGV0ZVVzZXInLCB1c2VySWQpO1xyXG5cclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJERUxFVEVfVVNFUlwiLCB7XHJcbiAgICAgICAgdXNlcklkOiB1c2VySWQsXHJcbiAgICAgICAgYWRtaW5FbWFpbDogdGhpcy5wcm9maWxlLmVtYWlsLFxyXG4gICAgICAgIGhhbmRsZXI6IChyZXMpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX1VTRVJTXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlckVycm9yOiAoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICBhbGVydChcIkVycm9yIG9jY3VycmVkOiBcIiArIGVycm9ycyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0VXNlcnMoKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLnVzZXJzLmxlbmd0aCA8IDEgPyB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9VU0VSU1wiKSA6IHVuZGVmaW5lZCxcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFsbFVzZXJzQ29tcGxhaW50cygpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfQUxMX1VTRVJTX0NPTVBMQUlOVFNcIik7XHJcbiAgICAgIC8qXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidHJ5XCIpO1xyXG4gICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy5hbGxVc2Vyc0NvbXBsYWludHMubGVuZ3RoIDwgMSA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0FMTF9VU0VSU19DT01QTEFJTlRTXCIpIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QWxsRXZlbnRzQ29tcGxhaW50cygpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfQUxMX0VWRU5UU19DT01QTEFJTlRTXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwdXRTdGF0dXNDb21wbGFpbnQoY29tcGxhaW50SWQsIGNvbXBsYWludFN0YXR1cykge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29tcGxhaW50U3RhdHVzID09PSBcIndvcmtcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcInByb2Nlc3NcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcInJlamVjdFwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZhciBmaW5hbFN0YXR1cyA9IFwi0JIg0YDQvtCx0L7RgtGWINCw0LTQvNGW0L3RltGB0YLRgNCw0YLQvtGA0L7QvDogXCIgKyB0aGlzLnByb2ZpbGUuZW1haWw7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgY29tcGxhaW50U3RhdHVzID09PSBcInByb2Nlc3NcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcIndvcmtcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcInJlamVjdFwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZhciBmaW5hbFN0YXR1cyA9IFwi0J7Qv9GA0LDRhtGM0L7QstCw0L3QviDQsNC00LzRltC90ZbRgdGC0YDQsNGC0L7RgNC+0Lw6IFwiICsgdGhpcy5wcm9maWxlLmVtYWlsO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyA9PT0gXCJyZWplY3RcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcInByb2Nlc3NcIiAmJlxyXG4gICAgICAgIGNvbXBsYWludFN0YXR1cyAhPSBcIndvcmtcIlxyXG4gICAgICApIHtcclxuICAgICAgICB2YXIgZmluYWxTdGF0dXMgPSBcItCS0ZbQtNGF0LjQu9C10L3QviDQsNC00LzRltC90ZbRgdGC0YDQsNGC0L7RgNC+0Lw6IFwiICsgdGhpcy5wcm9maWxlLmVtYWlsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coY29tcGxhaW50SWQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhjb21wbGFpbnRTdGF0dXMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhmaW5hbFN0YXR1cyk7XHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiUFVUX1NUQVRVU19DT01QTEFJTlRcIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBJZDogY29tcGxhaW50SWQsXHJcbiAgICAgICAgICBTdGF0dXM6IGZpbmFsU3RhdHVzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfQUxMX1VTRVJTX0NPTVBMQUlOVFNcIik7XHJcbiAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9BTExfRVZFTlRTX0NPTVBMQUlOVFNcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QWxsV2ViTG9ncygpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfQUxMX1dFQl9MT0dTXCIpO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5zY3JvbGxhYmxlLWNvbnRhaW5lcjEge1xyXG4gIG1hcmdpbi10b3A6IDdweDtcclxuICB3aWR0aDogNTAlO1xyXG4gIG1heC1oZWlnaHQ6IDg0dmg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcclxufVxyXG5cclxuLnNjcm9sbGFibGUtY29udGVudDEge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uc2Nyb2xsYWJsZS1jb250YWluZXIyIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIG1heC1oZWlnaHQ6IDcwdmg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uc2Nyb2xsYWJsZS1jb250YWluZXIzIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIG1heC1oZWlnaHQ6IDg1dmg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uY2VudGVyZWQtdGV4dDEge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBsZWZ0OiAyNSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgZm9udC1zaXplOiBjYWxjKDAuNXZ3ICsgMC41cmVtKTtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uY2VudGVyZWQtdGV4dDIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBsZWZ0OiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgZm9udC1zaXplOiBjYWxjKDAuNXZ3ICsgMC41cmVtKTtcclxuICBtYXJnaW4tYm90dG9tOiAzcHg7XHJcbn1cclxuXHJcbi5jbGlja2FibGUtbGluayB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiAjMDA2NmNjO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNsaWNrYWJsZS1saW5rOmhvdmVyIHtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLmNvbXBsYWludC1jb2x1bW4ge1xyXG4gIGNvbHVtbi1jb3VudDogMztcclxufVxyXG5cclxuLmNvbXBsYWludC1pdGVtIHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWYwMGJkO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4uQWRtaW5Ub3BMaW5lIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDNweDtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWYwMGJkO1xyXG59XHJcblxyXG4uVG9wQnV0dG9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiA3cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG59XHJcblxyXG4uZmlsdGVycyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXgtd2lkdGg6IDgwJTtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgZ2FwOiAxMHB4O1xyXG59XHJcblxyXG4uc2VhcmNoIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1heC13aWR0aDogODAlO1xyXG4gIG1hcmdpbjogMTBweCBhdXRvO1xyXG4gIGdhcDogMTBweDtcclxufVxyXG5cclxuLnNlYXJjaDEge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWF4LXdpZHRoOiA5MCU7XHJcbiAgbWFyZ2luOiAxMHB4IGF1dG87XHJcbiAgZ2FwOiAxMHB4O1xyXG59XHJcblxyXG4uZXZlbnQtaXRlbSB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1heC13aWR0aDogODAlO1xyXG4gIG1hcmdpbjogMTBweCBhdXRvO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLmV2ZW50LWl0ZW06aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZXZlbnQtaXRlbSBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtIGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjMDA3YmZmO1xyXG59XHJcblxyXG4uZXZlbnQtY29tcGxhaW50IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgbWF4LXdpZHRoOiA5MCU7XHJcbiAgbWFyZ2luOiAxMHB4IGF1dG87XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4uZXZlbnQtY29tcGxhaW50OmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmV2ZW50LWNvbXBsYWludCBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5ldmVudC1jb21wbGFpbnQgYTpob3ZlciB7XHJcbiAgY29sb3I6ICMwMDdiZmY7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlVk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfd2l0aERpcmVjdGl2ZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBK1BBLE1BQUssWUFBVTtBQUFBLEVBQ2IsWUFBWSxDQUFFO0FBQUEsRUFDZCxPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsb0JBQW9CO0FBQUEsTUFDcEIscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsK0JBQStCO0FBQUEsTUFDL0IsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osWUFBWTtBQUFBO0VBRWY7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLGdCQUFnQjtBQUNkLFlBQU0sc0JBQXNCLEtBQUssV0FBVyxZQUFXO0FBRXZELFVBQUksS0FBSyxlQUFlLE9BQU87QUFDN0IsZUFBTyxLQUFLO0FBQUEsTUFDZCxXQUFXLEtBQUssZUFBZSxNQUFNO0FBQ25DLGVBQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQyxTQUFTO0FBQ2pDLGlCQUFPLEtBQUssR0FBRyxTQUFVLEVBQUMsU0FBUyxtQkFBbUI7QUFBQSxRQUN4RCxDQUFDO0FBQUEsTUFDSCxXQUFXLEtBQUssZUFBZSxTQUFTO0FBQ3RDLGVBQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQyxTQUFTO0FBQ2pDLGlCQUFP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
