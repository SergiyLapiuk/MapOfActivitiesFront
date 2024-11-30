import { i as useAlignProps, j as useAlign, u as useDarkProps, a as useDark, e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { P as ProfileIcon, Q as QSelect } from "./ProfileIcon.fd39b9d7.js";
import { L } from "./leaflet-src.ffd70e66.js";
import { c as createComponent, h as hSlot } from "./uid.627d4ed7.js";
import { c as computed, h, g as getCurrentInstance, _ as _export_sfc, K as resolveComponent, L as openBlock, M as createBlock, N as withCtx, j as createVNode, $ as createTextVNode, a0 as toDisplayString, J as mapGetters, an as notificationHub, Y as createElementBlock, v as withDirectives, aa as vShow, O as createBaseVNode, ao as normalizeClass, P as createCommentVNode, F as Fragment, Z as renderList, ap as pushScopeId, aq as popScopeId } from "./index.6764d851.js";
import { Q as QDialog } from "./QMenu.9dd1c774.js";
import { c as convertJSONToDate } from "./convertDate.2fe32ce1.js";
import "./QChip.8fa1dfba.js";
import "./rtl.b51694b1.js";
import "./format.3e32b8d9.js";
import "./scroll.a3a49254.js";
var QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
const _sfc_main$1 = {
  props: {
    message: String,
    showDialog: Boolean
  },
  computed: {
    isDialogVisible: {
      get() {
        return this.showDialog;
      },
      set(value) {
        this.$emit("update:showDialog", value);
      }
    }
  },
  methods: {
    confirm() {
      this.$emit("confirmed");
    },
    cancel() {
      this.$emit("canceled");
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const QCard_title = resolveComponent("q-card-title");
  return openBlock(), createBlock(QDialog, {
    modelValue: $options.isDialogVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.isDialogVisible = $event),
    position: "top"
  }, {
    default: withCtx(() => [
      createVNode(QCard, null, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QCard_title, { class: "text-h6" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($props.message), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    label: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
                    color: "primary",
                    onClick: $options.cancel
                  }, null, 8, ["onClick"]),
                  createVNode(QBtn, {
                    label: "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438",
                    color: "negative",
                    onClick: $options.confirm
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
var DialogConfirmation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "DialogConfirmation.vue"]]);
var EventPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  components: {
    ProfileIcon
  },
  data() {
    return {
      showDialog: false,
      confirmationMessage: "\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u044E \u043F\u043E\u0434\u0456\u044E?",
      API_URL: "https://map-of-activities-moa-back.onrender.com/api",
      buttonColor: "#1ab240",
      isSubscribed: false,
      curUser: null,
      curRole: null,
      fullAddress: null,
      EventPage: true,
      showReportDetails: false,
      reportHeader: "",
      reportDescription: "",
      showReportButton: true,
      options: [
        "\u041D\u0435\u0446\u0435\u043D\u0437\u0443\u0440\u043D\u0435 \u043D\u0430\u0437\u0432\u0430 \u043F\u043E\u0434\u0456\u0457",
        "\u041D\u0435\u0446\u0435\u043D\u0437\u0443\u0440\u043D\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0456\u044F \u043F\u043E\u0434\u0456\u0457",
        "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0430/\u0444\u0430\u043B\u044C\u0448\u0438\u0432\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0456\u044F \u043F\u043E\u0434\u0456\u0457",
        "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0430 \u043B\u043E\u043A\u0430\u0446\u0456\u044F \u043F\u043E\u0434\u0456\u0457",
        "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u0447\u0430\u0441 \u043F\u043E\u0434\u0456\u0457",
        "\u041D\u0435\u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
        "\u0424\u0430\u043B\u044C\u0448\u0438\u0432\u0430 \u043F\u043E\u0434\u0456\u044F",
        "\u0406\u043D\u0448\u0435"
      ]
    };
  },
  props: {
    id: { type: [Number, String], required: true }
  },
  computed: {
    ...mapGetters({
      event: "getEvent",
      eventStatus: "getEventStatus",
      eventUsers: "getEventUsers",
      usersStatus: "getVisitingUsersStatus",
      joined: "getJoined",
      joinedStatus: "getJoinedStatus",
      profile: "getProfile"
    }),
    isNextDisabled() {
      return !(this.name && this.name.length <= 50 && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.name) && this.typeId && timeValidation === true && this.address);
    },
    buttonText: function() {
      return this.isSubscribed ? "\u0412\u0456\u0434'\u0454\u0434\u043D\u0430\u0442\u0438\u0441\u044C" : "\u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0442\u0438\u0441\u044C";
    },
    filteredEvent() {
      const filteredFields = [
        "name",
        "type",
        "startTime",
        "endTime",
        "description",
        "coordinates",
        "user"
      ];
      const filterObject = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key, value]) => {
            if (filteredFields.includes(key) && value !== null && value !== "" && value !== void 0) {
              return true;
            }
            return false;
          })
        );
      };
      return filterObject(this.event);
    }
  },
  async mounted() {
    await this.getEvent();
    await this.getCurUser();
    await this.getEventUsers();
  },
  methods: {
    backToEventPage() {
      this.showReportDetails = false;
      this.EventPage = true;
    },
    reportPage() {
      this.showReportDetails = true;
      this.EventPage = false;
    },
    convertJSONToDate(date) {
      return convertJSONToDate(date);
    },
    deleteEvent() {
      this.$store.dispatch("DELETE_EVENT", {
        id: this.id,
        handler: (res) => {
          this.$store.dispatch("GET_EVENTS");
          this.$router.push({ name: "events-list", params: {} });
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        }
      });
    },
    editEvent() {
      this.$router.push({
        name: "edit-event",
        params: this.event,
        query: { event: this.event.id }
      });
    },
    async joinEvent() {
      this.isSubscribed = !this.isSubscribed;
      const userId = this.$store.getters.getCurrentUser;
      if (this.isSubscribed) {
        this.$store.dispatch("CREATE_VISITING", {
          id: userId,
          eventId: this.event.id,
          conId: notificationHub.client.connectionId,
          handler: (res) => {
          },
          handlerError: (errors) => {
            alert("Error occurred: " + errors);
          }
        });
      } else {
        this.$store.dispatch("DELETE_VISITING", {
          id: userId,
          eventId: this.event.id,
          handler: (res) => {
          },
          handlerError: (errors) => {
            alert("Error occurred: " + errors);
          }
        });
      }
    },
    showMap() {
      if (this.event != null) {
        const coordinates = this.event.coordinates.split(", ").map(parseFloat);
        const roundedCoordinates = coordinates.map((number) => {
          return number.toFixed(2);
        });
        const map = L.map("map4").setView(roundedCoordinates, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19
        }).addTo(map);
        L.marker(
          this.event.coordinates.split(", ").map(parseFloat)
        ).addTo(map);
        this.getAddressFromCoordinates(coordinates[0], coordinates[1]);
      }
    },
    async getEvent() {
      await Promise.all([
        this.event != {} ? this.$store.dispatch("GET_EVENT", { id: this.id }) : void 0
      ]);
      this.showMap();
    },
    async getAddressFromCoordinates(latitude, longitude) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.address) {
          const address = data.display_name;
          this.fullAddress = address;
        } else {
          console.error("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },
    async getCurUser() {
      this.curUser = this.$store.getters.getCurrentUser;
      this.curRole = this.$store.getters.getCurrentRole;
      const eventsId = this.$store.getters.getEvent.id;
      await Promise.all([
        this.$store.dispatch("GET_IS_JOINER", {
          id: this.curUser,
          eventId: eventsId
        })
      ]);
      this.isSubscribed = this.$store.getters.getJoined;
      if (this.curUser != this.event.user.userId) {
        this.showReportButton = true;
      } else {
        this.showReportButton = false;
      }
    },
    async getEventUsers() {
      const eventsId = this.$store.getters.getEvent.id;
      await Promise.all([
        this.$store.dispatch("GET_USERS_GO_TO_THE_EVENT", {
          eventId: eventsId
        })
      ]);
      this.eventUsers = this.$store.getters.getEventUsers;
    },
    async reportEvent() {
      if (!this.reportHeader) {
        alert("\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0432\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438");
        return;
      }
      if (this.reportHeader === "\u0406\u043D\u0448\u0435" && !this.reportDescription) {
        alert('\u0412\u0438 \u0432\u0438\u0431\u0440\u0430\u043B\u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A "\u0406\u043D\u0448\u0435", \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0434\u043E\u0434\u0430\u0439\u0442\u0435 \u043E\u043F\u0438\u0441 \u0412\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438');
        return;
      }
      const user = this.$store.getters.getProfile;
      this.$store.dispatch("REPORT_EVENT", {
        formData: {
          Header: this.reportHeader,
          Description: this.reportDescription,
          EventId: this.event.id,
          AuthorId: user.id
        },
        handler: (res) => {
          this.$router.replace({ path: "/event-page", name: "event", query: { id: this.event.id } });
          this.showReportDetails = false;
          this.EventPage = true;
          reportHeader = "";
          reportDescription = "";
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        }
      });
    }
  },
  components: {
    DialogConfirmation
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-a0579524"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "p-3"
};
const _hoisted_2 = { class: "navbar" };
const _hoisted_3 = { class: "!px-0" };
const _hoisted_4 = { class: "!px-0" };
const _hoisted_5 = { class: "col_conteiner" };
const _hoisted_6 = { class: "column" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = ["src"];
const _hoisted_9 = {
  key: 1,
  class: "text_conteinet"
};
const _hoisted_10 = {
  key: 2,
  class: "text_conteinet px-4"
};
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "\u0414\u043E \u043F\u043E\u0434\u0456\u0457 \u043F\u0440\u0438\u0454\u0434\u043D\u0430\u043B\u0438\u0441\u044C:", -1));
const _hoisted_12 = { class: "users-avatar-container" };
const _hoisted_13 = ["src"];
const _hoisted_14 = {
  key: 1,
  class: "users-icon-container"
};
const _hoisted_15 = { class: "column" };
const _hoisted_16 = { class: "white_conteiner" };
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "\u0427\u0430\u0441", -1));
const _hoisted_18 = {
  key: 0,
  class: "white_conteiner"
};
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "\u041B\u043E\u043A\u0430\u0446\u0456\u044F", -1));
const _hoisted_20 = { style: { "line-height": "1" } };
const _hoisted_21 = { style: { "line-height": "2" } };
const _hoisted_22 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  id: "map4",
  class: "map"
}, null, -1));
const _hoisted_23 = {
  key: 1,
  class: "white_conteiner"
};
const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "\u0410\u0432\u0442\u043E\u0440", -1));
const _hoisted_25 = { class: "TopLine" };
const _hoisted_26 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "550" } }, "\u0414\u0435\u0442\u0430\u043B\u0456 \u0441\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043F\u043E\u0434\u0456\u044E", -1));
const _hoisted_27 = { class: "inputStyle" };
const _hoisted_28 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0441\u043A\u0430\u0440\u0433\u0438 ", -1));
const _hoisted_29 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u043E\u043F\u0438\u0441 \u0412\u0430\u0448\u043E\u0457 \u0441\u043A\u0430\u0440\u0433\u0438 (\u043E\u043F\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u043E) ", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_ProfileIcon = resolveComponent("ProfileIcon");
  const _component_dialog_confirmation = resolveComponent("dialog-confirmation");
  return openBlock(), createElementBlock(Fragment, null, [
    withDirectives(createBaseVNode("div", null, [
      withDirectives(createBaseVNode("div", null, [
        createVNode(QBtn, {
          onClick: $options.reportPage,
          label: "Report",
          color: "red"
        }, null, 8, ["onClick"])
      ], 512), [
        [vShow, $data.showReportButton]
      ]),
      _ctx.event != null && _ctx.event.type != null ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("h1", _hoisted_3, toDisplayString(_ctx.event.name), 1),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.event.type.name), 1)
          ]),
          createBaseVNode("button", {
            class: normalizeClass([{ "bg-red-700": !$data.isSubscribed, "bg-gray-700": $data.isSubscribed }, "join-button !mx-0"]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.joinEvent && $options.joinEvent(...args))
          }, toDisplayString($options.buttonText), 3)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            _ctx.event.imageName != null ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createBaseVNode("img", {
                class: "w-full",
                src: $data.API_URL + "/images/" + _ctx.event.imageName,
                style: { "margin-bottom": "20px" }
              }, null, 8, _hoisted_8)
            ])) : createCommentVNode("", true),
            _ctx.event.description != null && _ctx.event.description != `` ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createBaseVNode("p", null, toDisplayString(_ctx.event.description), 1)
            ])) : createCommentVNode("", true),
            ((_a = _ctx.eventUsers) == null ? void 0 : _a.length) != 0 ? (openBlock(), createElementBlock("div", _hoisted_10, [
              _hoisted_11,
              createBaseVNode("div", _hoisted_12, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.eventUsers, (user) => {
                  return openBlock(), createElementBlock("div", {
                    key: user.id,
                    class: "avatars-container"
                  }, [
                    user.imageURL ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: this.API_URL + "/images/" + user.imageURL,
                      class: "users-image"
                    }, null, 8, _hoisted_13)) : (openBlock(), createElementBlock("div", _hoisted_14, [
                      createVNode(_component_ProfileIcon)
                    ]))
                  ]);
                }), 128))
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                _hoisted_17,
                createBaseVNode("p", null, "\u041F\u043E\u0447\u0430\u0442\u043E\u043A: " + toDisplayString($options.convertJSONToDate(_ctx.event.startTime)), 1),
                createBaseVNode("p", null, "\u041A\u0456\u043D\u0435\u0446\u044C: " + toDisplayString($options.convertJSONToDate(_ctx.event.endTime)), 1)
              ]),
              _ctx.event.coordinates != null ? (openBlock(), createElementBlock("div", _hoisted_18, [
                _hoisted_19,
                createBaseVNode("h3", _hoisted_20, toDisplayString($data.fullAddress), 1),
                createBaseVNode("h3", _hoisted_21, "(" + toDisplayString(_ctx.event.coordinates) + ")", 1),
                _hoisted_22
              ])) : createCommentVNode("", true),
              _ctx.event.user != null ? (openBlock(), createElementBlock("div", _hoisted_23, [
                _hoisted_24,
                createBaseVNode("p", null, toDisplayString(_ctx.event.user.name), 1)
              ])) : createCommentVNode("", true)
            ])
          ]),
          $data.curUser != null && ($data.curRole == `Admin` || $data.curUser == _ctx.event.user.userId) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "delete-button",
            onClick: _cache[1] || (_cache[1] = ($event) => $data.showDialog = true)
          }, " \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u0434\u0456\u044E ")) : createCommentVNode("", true),
          createVNode(_component_dialog_confirmation, {
            "show-dialog": $data.showDialog,
            message: $data.confirmationMessage,
            onConfirmed: $options.deleteEvent,
            onCanceled: _cache[2] || (_cache[2] = ($event) => $data.showDialog = false)
          }, null, 8, ["show-dialog", "message", "onConfirmed"]),
          $data.curUser != null && ($data.curRole == `Admin` || $data.curUser == _ctx.event.user.userId) ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "edit-button",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.editEvent && $options.editEvent(...args))
          }, " \u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u043E\u0434\u0456\u044E ")) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true)
    ], 512), [
      [vShow, $data.EventPage]
    ]),
    withDirectives(createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_25, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.backToEventPage,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        _hoisted_26,
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.reportEvent,
          label: "\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438",
          color: "primary"
        }, null, 8, ["onClick"])
      ]),
      createBaseVNode("div", _hoisted_27, [
        _hoisted_28,
        createVNode(QSelect, {
          outlined: "",
          modelValue: $data.reportHeader,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.reportHeader = $event),
          options: $data.options
        }, null, 8, ["modelValue", "options"]),
        _hoisted_29,
        createVNode(QInput, {
          modelValue: $data.reportDescription,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.reportDescription = $event),
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
var EventPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a0579524"], ["__file", "EventPage.vue"]]);
export { EventPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRQYWdlLjZiNzg0NzE4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmRBY3Rpb25zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jYXJkL1FDYXJkU2VjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2FyZC9RQ2FyZC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0RpYWxvZ0NvbmZpcm1hdGlvbi52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvRXZlbnRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFsaWduLCB7IHVzZUFsaWduUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbGlnbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmRBY3Rpb25zJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMsXG4gICAgdmVydGljYWw6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGFsaWduQ2xhc3MgPSB1c2VBbGlnbihwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtY2FyZF9fYWN0aW9ucyAkeyBhbGlnbkNsYXNzLnZhbHVlIH1gXG4gICAgICArIGAgcS1jYXJkX19hY3Rpb25zLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0IGNvbHVtbicgOiAnaG9yaXogcm93JyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIGhvcml6b250YWw6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtY2FyZF9fc2VjdGlvbidcbiAgICAgICsgYCBxLWNhcmRfX3NlY3Rpb24tLSR7IHByb3BzLmhvcml6b250YWwgPT09IHRydWUgPyAnaG9yaXogcm93IG5vLXdyYXAnIDogJ3ZlcnQnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmQnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1jYXJkJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNhcmQtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtY2FyZC0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtY2FyZC0tc3F1YXJlIG5vLWJvcmRlci1yYWRpdXMnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLWNhcmQtLWZsYXQgbm8tc2hhZG93JyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKHByb3BzLnRhZywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImlzRGlhbG9nVmlzaWJsZVwiIHBvc2l0aW9uPVwidG9wXCI+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPHEtY2FyZC10aXRsZSBjbGFzcz1cInRleHQtaDZcIj57eyBtZXNzYWdlIH19PC9xLWNhcmQtdGl0bGU+XHJcbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zPlxyXG4gICAgICAgICAgPHEtYnRuIGxhYmVsPVwi0KHQutCw0YHRg9Cy0LDRgtC4XCIgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrPVwiY2FuY2VsXCIgLz5cclxuICAgICAgICAgIDxxLWJ0biBsYWJlbD1cItCf0ZbQtNGC0LLQtdGA0LTQuNGC0LhcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgQGNsaWNrPVwiY29uZmlybVwiIC8+XHJcbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvcS1kaWFsb2c+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb3BzOiB7XHJcbiAgICBtZXNzYWdlOiBTdHJpbmcsXHJcbiAgICBzaG93RGlhbG9nOiBCb29sZWFuLFxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGlzRGlhbG9nVmlzaWJsZToge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0RpYWxvZztcclxuICAgICAgfSxcclxuICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTpzaG93RGlhbG9nXCIsIHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBjb25maXJtKCkge1xyXG4gICAgICB0aGlzLiRlbWl0KFwiY29uZmlybWVkXCIpO1xyXG4gICAgfSxcclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgdGhpcy4kZW1pdChcImNhbmNlbGVkXCIpO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LXNob3c9XCJFdmVudFBhZ2VcIj5cclxuXHJcbiAgICA8ZGl2IHYtc2hvdz1cInNob3dSZXBvcnRCdXR0b25cIj5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgQGNsaWNrPVwicmVwb3J0UGFnZVwiIFxyXG4gICAgICAgIGxhYmVsPVwiUmVwb3J0XCJcclxuICAgICAgICBjb2xvcj1cInJlZFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgPGRpdiB2LWlmPVwiZXZlbnQgIT0gbnVsbCAmJiBldmVudC50eXBlICE9IG51bGxcIiBjbGFzcz1cInAtM1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxoMSBjbGFzcz1cIiFweC0wXCI+e3sgZXZlbnQubmFtZSB9fTwvaDE+XHJcbiAgICAgICAgICA8aDQgY2xhc3M9XCIhcHgtMFwiPnt7IGV2ZW50LnR5cGUubmFtZSB9fTwvaDQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiA6Y2xhc3M9XCJ7ICdiZy1yZWQtNzAwJzogIWlzU3Vic2NyaWJlZCwgJ2JnLWdyYXktNzAwJzogaXNTdWJzY3JpYmVkIH1cIiBjbGFzcz1cImpvaW4tYnV0dG9uICFteC0wXCJcclxuICAgICAgICAgIEBjbGljaz1cImpvaW5FdmVudFwiPlxyXG4gICAgICAgICAge3sgYnV0dG9uVGV4dCB9fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xfY29udGVpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwiZXZlbnQuaW1hZ2VOYW1lICE9IG51bGxcIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInctZnVsbFwiIDpzcmM9XCJBUElfVVJMICsgJy9pbWFnZXMvJyArIGV2ZW50LmltYWdlTmFtZVwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0X2NvbnRlaW5ldFwiIHYtaWY9XCJldmVudC5kZXNjcmlwdGlvbiAhPSBudWxsICYmIGV2ZW50LmRlc2NyaXB0aW9uICE9IGBgXCI+XHJcbiAgICAgICAgICAgIDwhLS0gPGgyPkRlc2NyaXB0aW9uPC9oMj4gLS0+XHJcbiAgICAgICAgICAgIDxwPnt7IGV2ZW50LmRlc2NyaXB0aW9uIH19PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dF9jb250ZWluZXQgcHgtNFwiIHYtaWY9XCJldmVudFVzZXJzPy5sZW5ndGggIT0gMFwiPlxyXG4gICAgICAgICAgICA8aDI+0JTQviDQv9C+0LTRltGXINC/0YDQuNGU0LTQvdCw0LvQuNGB0Yw6PC9oMj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJzLWF2YXRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwidXNlciBpbiBldmVudFVzZXJzXCIgOmtleT1cInVzZXIuaWRcIiBjbGFzcz1cImF2YXRhcnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCJ1c2VyLmltYWdlVVJMXCIgOnNyYz1cInRoaXMuQVBJX1VSTCArICcvaW1hZ2VzLycgKyB1c2VyLmltYWdlVVJMXCIgY2xhc3M9XCJ1c2Vycy1pbWFnZVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInVzZXJzLWljb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxQcm9maWxlSWNvbiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3aGl0ZV9jb250ZWluZXJcIj5cclxuICAgICAgICAgICAgICA8aDI+0KfQsNGBPC9oMj5cclxuICAgICAgICAgICAgICA8cD7Qn9C+0YfQsNGC0L7Qujoge3sgY29udmVydEpTT05Ub0RhdGUoZXZlbnQuc3RhcnRUaW1lKSB9fTwvcD5cclxuICAgICAgICAgICAgICA8cD7QmtGW0L3QtdGG0Yw6IHt7IGNvbnZlcnRKU09OVG9EYXRlKGV2ZW50LmVuZFRpbWUpIH19PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiZXZlbnQuY29vcmRpbmF0ZXMgIT0gbnVsbFwiIGNsYXNzPVwid2hpdGVfY29udGVpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGgyPtCb0L7QutCw0YbRltGPPC9oMj5cclxuICAgICAgICAgICAgICA8aDMgc3R5bGU9XCJsaW5lLWhlaWdodDogMVwiPnt7IGZ1bGxBZGRyZXNzIH19PC9oMz5cclxuICAgICAgICAgICAgICA8aDMgc3R5bGU9XCJsaW5lLWhlaWdodDogMlwiPih7eyBldmVudC5jb29yZGluYXRlcyB9fSk8L2gzPlxyXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJtYXA0XCIgY2xhc3M9XCJtYXBcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImV2ZW50LnVzZXIgIT0gbnVsbFwiIGNsYXNzPVwid2hpdGVfY29udGVpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGgyPtCQ0LLRgtC+0YA8L2gyPlxyXG4gICAgICAgICAgICAgIDxwPnt7IGV2ZW50LnVzZXIubmFtZSB9fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnV0dG9uIHYtaWY9XCJjdXJVc2VyICE9IG51bGwgJiYgKGN1clJvbGUgPT0gYEFkbWluYCB8fCBjdXJVc2VyID09IGV2ZW50LnVzZXIudXNlcklkKVxyXG4gICAgICBcIiBjbGFzcz1cImRlbGV0ZS1idXR0b25cIiBAY2xpY2s9XCJzaG93RGlhbG9nID0gdHJ1ZVwiPlxyXG4gICAgICAgICAg0JLQuNC00LDQu9C40YLQuCDQv9C+0LTRltGOXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpYWxvZy1jb25maXJtYXRpb24gOnNob3ctZGlhbG9nPVwic2hvd0RpYWxvZ1wiIDptZXNzYWdlPVwiY29uZmlybWF0aW9uTWVzc2FnZVwiIEBjb25maXJtZWQ9XCJkZWxldGVFdmVudFwiXHJcbiAgICAgICAgICBAY2FuY2VsZWQ9XCJzaG93RGlhbG9nID0gZmFsc2VcIiAvPlxyXG4gICAgICAgIDxidXR0b24gdi1pZj1cImN1clVzZXIgIT0gbnVsbCAmJiAoY3VyUm9sZSA9PSBgQWRtaW5gIHx8IGN1clVzZXIgPT0gZXZlbnQudXNlci51c2VySWQpXHJcbiAgICAgIFwiIGNsYXNzPVwiZWRpdC1idXR0b25cIiBAY2xpY2s9XCJlZGl0RXZlbnRcIj5cclxuICAgICAgICAgINCg0LXQtNCw0LPRg9Cy0LDRgtC4INC/0L7QtNGW0Y5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgXHJcbiAgICAgIDxkaXYgdi1zaG93PVwic2hvd1JlcG9ydERldGFpbHNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiVG9wTGluZVwiPlxyXG4gICAgICAgICAgPHEtYnRuIGZsYXQgc3R5bGUgQGNsaWNrPVwiYmFja1RvRXZlbnRQYWdlXCIgaWNvbj1cImFycm93X2JhY2tcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDU1MFwiPtCU0LXRgtCw0LvRliDRgdC60LDRgNCz0Lgg0L3QsCDQv9C+0LTRltGOPC9kaXY+XHJcbiAgICAgICAgICA8cS1idG4gZmxhdCBzdHlsZSBAY2xpY2s9XCJyZXBvcnRFdmVudFwiIGxhYmVsPVwi0JLRltC00L/RgNCw0LLQuNGC0LhcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFN0eWxlXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOyBtYXJnaW46IDEwcHhcIj5cclxuICAgICAgICAgICAgICDQktC40LHQtdGA0ZbRgtGMINC30LDQs9C+0LvQvtCy0L7QuiDQtNC70Y8g0YHQutCw0YDQs9C4XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHEtc2VsZWN0IFxyXG4gICAgICAgICAgICBvdXRsaW5lZCBcclxuICAgICAgICAgICAgdi1tb2RlbD1cInJlcG9ydEhlYWRlclwiIFxyXG4gICAgICAgICAgICA6b3B0aW9ucz1cIm9wdGlvbnNcIiBcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA1MDA7IG1hcmdpbjogMTBweFwiPlxyXG4gICAgICAgICAgICAgINCU0LXRgtCw0LvRjNC90LjQuSDQvtC/0LjRgSDQktCw0YjQvtGXINGB0LrQsNGA0LPQuCAo0L7Qv9GG0ZbQvtC90LDQu9GM0L3QvilcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxxLWlucHV0IFxyXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJyZXBvcnREZXNjcmlwdGlvblwiIFxyXG4gICAgICAgICAgICAgIG91dGxpbmVkIFxyXG4gICAgICAgICAgICAgIGF1dG9ncm93IFxyXG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBMIGZyb20gXCJsZWFmbGV0XCI7XHJcbmltcG9ydCBEaWFsb2dDb25maXJtYXRpb24gZnJvbSBcImNvbXBvbmVudHMvRGlhbG9nQ29uZmlybWF0aW9uLnZ1ZVwiO1xyXG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgY29udmVydEpTT05Ub0RhdGUgfSBmcm9tIFwiLi4vY29udmVydERhdGVcIjtcclxuaW1wb3J0IFByb2ZpbGVJY29uIGZyb20gXCJjb21wb25lbnRzL2ljb25zL1Byb2ZpbGVJY29uLnZ1ZVwiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9uSHViIGZyb20gXCIuLi9Ob3RpZmljYXRpb25IdWJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBQcm9maWxlSWNvbixcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaG93RGlhbG9nOiBmYWxzZSxcclxuICAgICAgY29uZmlybWF0aW9uTWVzc2FnZTogXCLQktC4INCy0L/QtdCy0L3QtdC90ZYsINGJ0L4g0YXQvtGH0LXRgtC1INCy0LjQtNCw0LvQuNGC0Lgg0YbRjiDQv9C+0LTRltGOP1wiLFxyXG4gICAgICBBUElfVVJMOiBpbXBvcnQubWV0YS5lbnYuVklURV9BUElfVVJMLFxyXG4gICAgICBidXR0b25Db2xvcjogXCIjMWFiMjQwXCIsXHJcbiAgICAgIGlzU3Vic2NyaWJlZDogZmFsc2UsXHJcbiAgICAgIGN1clVzZXI6IG51bGwsXHJcbiAgICAgIGN1clJvbGU6IG51bGwsXHJcbiAgICAgIGZ1bGxBZGRyZXNzOiBudWxsLFxyXG4gICAgICBFdmVudFBhZ2U6IHRydWUsXHJcbiAgICAgIHNob3dSZXBvcnREZXRhaWxzOiBmYWxzZSxcclxuICAgICAgcmVwb3J0SGVhZGVyOiBcIlwiLFxyXG4gICAgICByZXBvcnREZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgc2hvd1JlcG9ydEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICfQndC10YbQtdC90LfRg9GA0L3QtSDQvdCw0LfQstCwINC/0L7QtNGW0ZcnLCBcclxuICAgICAgICAn0J3QtdGG0LXQvdC30YPRgNC90LAg0YTQvtGC0L7Qs9GA0LDRhNGW0Y8g0L/QvtC00ZbRlycsIFxyXG4gICAgICAgICfQndC10LrQvtGA0LXQutGC0L3QsC/RhNCw0LvRjNGI0LjQstCwINGE0L7RgtC+0LPRgNCw0YTRltGPINC/0L7QtNGW0ZcnLCBcclxuICAgICAgICAn0J3QtdC60L7RgNC10LrRgtC90LAg0LvQvtC60LDRhtGW0Y8g0L/QvtC00ZbRlycsXHJcbiAgICAgICAgJ9Cd0LXQutC+0YDQtdC60YLQvdC40Lkg0YfQsNGBINC/0L7QtNGW0ZcnLFxyXG4gICAgICAgICfQndC10LLRltC00L/QvtCy0ZbQtNC90ZYg0LTQsNC90ZYnLFxyXG4gICAgICAgICfQpNCw0LvRjNGI0LjQstCwINC/0L7QtNGW0Y8nLFxyXG4gICAgICAgICfQhtC90YjQtSdcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBpZDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICBldmVudDogXCJnZXRFdmVudFwiLFxyXG4gICAgICBldmVudFN0YXR1czogXCJnZXRFdmVudFN0YXR1c1wiLFxyXG4gICAgICBldmVudFVzZXJzOiBcImdldEV2ZW50VXNlcnNcIixcclxuICAgICAgdXNlcnNTdGF0dXM6IFwiZ2V0VmlzaXRpbmdVc2Vyc1N0YXR1c1wiLFxyXG4gICAgICBqb2luZWQ6IFwiZ2V0Sm9pbmVkXCIsXHJcbiAgICAgIGpvaW5lZFN0YXR1czogXCJnZXRKb2luZWRTdGF0dXNcIixcclxuICAgICAgcHJvZmlsZTogXCJnZXRQcm9maWxlXCIsXHJcbiAgICB9KSxcclxuXHJcbiAgICBpc05leHREaXNhYmxlZCgpIHtcclxuICAgICAgcmV0dXJuICEoXHJcbiAgICAgICAgdGhpcy5uYW1lICYmXHJcbiAgICAgICAgdGhpcy5uYW1lLmxlbmd0aCA8PSA1MCAmJlxyXG4gICAgICAgIC9eWz8hQCgp4oSWLC47OmEtekEtWtCwLdGP0JAt0K/SkdKQ0ZbQhtGX0IfRlNCEMC05XFxzXSokL3UudGVzdCh0aGlzLm5hbWUpICYmXHJcbiAgICAgICAgdGhpcy50eXBlSWQgJiZcclxuICAgICAgICB0aW1lVmFsaWRhdGlvbiA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgIHRoaXMuYWRkcmVzc1xyXG4gICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzU3Vic2NyaWJlZCA/IFwi0JLRltC0J9GU0LTQvdCw0YLQuNGB0YxcIiA6IFwi0J/RgNC40ZTQtNC90LDRgtC40YHRjFwiO1xyXG4gICAgfSxcclxuICAgIGZpbHRlcmVkRXZlbnQoKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkRmllbGRzID0gW1xyXG4gICAgICAgIFwibmFtZVwiLFxyXG4gICAgICAgIFwidHlwZVwiLFxyXG4gICAgICAgIFwic3RhcnRUaW1lXCIsXHJcbiAgICAgICAgXCJlbmRUaW1lXCIsXHJcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIFwiY29vcmRpbmF0ZXNcIixcclxuICAgICAgICBcInVzZXJcIixcclxuICAgICAgXTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbHRlck9iamVjdCA9IChvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICAgICAgT2JqZWN0LmVudHJpZXMob2JqKS5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgZmlsdGVyZWRGaWVsZHMuaW5jbHVkZXMoa2V5KSAmJlxyXG4gICAgICAgICAgICAgIHZhbHVlICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgdmFsdWUgIT09IFwiXCIgJiZcclxuICAgICAgICAgICAgICB2YWx1ZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBmaWx0ZXJPYmplY3QodGhpcy5ldmVudCk7XHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmdldEV2ZW50KCk7XHJcbiAgICBhd2FpdCB0aGlzLmdldEN1clVzZXIoKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0RXZlbnRVc2VycygpO1xyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGJhY2tUb0V2ZW50UGFnZSgpIHtcclxuICAgICAgdGhpcy5zaG93UmVwb3J0RGV0YWlscyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkV2ZW50UGFnZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVwb3J0UGFnZSgpIHtcclxuICAgICAgdGhpcy5zaG93UmVwb3J0RGV0YWlscyA9IHRydWU7XHJcbiAgICAgIHRoaXMuRXZlbnRQYWdlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgY29udmVydEpTT05Ub0RhdGUoZGF0ZSkge1xyXG4gICAgICByZXR1cm4gY29udmVydEpTT05Ub0RhdGUoZGF0ZSk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiREVMRVRFX0VWRU5UXCIsIHtcclxuICAgICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgICBoYW5kbGVyOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9FVkVOVFNcIik7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwiZXZlbnRzLWxpc3RcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZXJFcnJvcjogKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoXCJFcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGVkaXRFdmVudCgpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmV2ZW50LmlkKTtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IFwiZWRpdC1ldmVudFwiLFxyXG4gICAgICAgIHBhcmFtczogdGhpcy5ldmVudCxcclxuICAgICAgICBxdWVyeTogeyBldmVudDogdGhpcy5ldmVudC5pZCB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBqb2luRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuaXNTdWJzY3JpYmVkID0gIXRoaXMuaXNTdWJzY3JpYmVkO1xyXG4gICAgICBjb25zdCB1c2VySWQgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRVc2VyO1xyXG4gICAgICBpZiAodGhpcy5pc1N1YnNjcmliZWQpIHtcclxuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkNSRUFURV9WSVNJVElOR1wiLCB7XHJcbiAgICAgICAgICBpZDogdXNlcklkLFxyXG4gICAgICAgICAgZXZlbnRJZDogdGhpcy5ldmVudC5pZCxcclxuICAgICAgICAgIGNvbklkOiBub3RpZmljYXRpb25IdWIuY2xpZW50LmNvbm5lY3Rpb25JZCxcclxuICAgICAgICAgIGhhbmRsZXI6IChyZXMpID0+IHsgfSxcclxuICAgICAgICAgIGhhbmRsZXJFcnJvcjogKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIG9jY3VycmVkOiBcIiArIGVycm9ycyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiREVMRVRFX1ZJU0lUSU5HXCIsIHtcclxuICAgICAgICAgIGlkOiB1c2VySWQsXHJcbiAgICAgICAgICBldmVudElkOiB0aGlzLmV2ZW50LmlkLFxyXG4gICAgICAgICAgaGFuZGxlcjogKHJlcykgPT4geyB9LFxyXG4gICAgICAgICAgaGFuZGxlckVycm9yOiAoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaG93TWFwKCkge1xyXG4gICAgICBpZiAodGhpcy5ldmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmV2ZW50LmNvb3JkaW5hdGVzLnNwbGl0KFwiLCBcIikubWFwKHBhcnNlRmxvYXQpO1xyXG4gICAgICAgIGNvbnN0IHJvdW5kZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcCgobnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbWFwID0gTC5tYXAoXCJtYXA0XCIpLnNldFZpZXcocm91bmRlZENvb3JkaW5hdGVzLCAxMyk7XHJcbiAgICAgICAgTC50aWxlTGF5ZXIoXCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiLCB7XHJcbiAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcihcclxuICAgICAgICAgIHRoaXMuZXZlbnQuY29vcmRpbmF0ZXMuc3BsaXQoXCIsIFwiKS5tYXAocGFyc2VGbG9hdClcclxuICAgICAgICApLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgdGhpcy5nZXRBZGRyZXNzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRFdmVudCgpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIHRoaXMuZXZlbnQgIT0ge31cclxuICAgICAgICAgID8gdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfRVZFTlRcIiwgeyBpZDogdGhpcy5pZCB9KVxyXG4gICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgIF0pO1xyXG4gICAgICB0aGlzLnNob3dNYXAoKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRBZGRyZXNzRnJvbUNvb3JkaW5hdGVzKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcclxuICAgICAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2U/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mZm9ybWF0PWpzb25gO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcclxuICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBkYXRhLmRpc3BsYXlfbmFtZTtcclxuICAgICAgICAgIHRoaXMuZnVsbEFkZHJlc3MgPSBhZGRyZXNzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQWRkcmVzcyBub3QgZm91bmRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBhZGRyZXNzOlwiLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRDdXJVc2VyKCkge1xyXG4gICAgICB0aGlzLmN1clVzZXIgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRVc2VyO1xyXG4gICAgICB0aGlzLmN1clJvbGUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRSb2xlO1xyXG4gICAgICBjb25zdCBldmVudHNJZCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0RXZlbnQuaWQ7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9JU19KT0lORVJcIiwge1xyXG4gICAgICAgICAgaWQ6IHRoaXMuY3VyVXNlcixcclxuICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50c0lkLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdKTtcclxuICAgICAgdGhpcy5pc1N1YnNjcmliZWQgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEpvaW5lZDtcclxuXHJcbiAgICAgIGlmICh0aGlzLmN1clVzZXIgIT0gdGhpcy5ldmVudC51c2VyLnVzZXJJZCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1JlcG9ydEJ1dHRvbiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVwb3J0QnV0dG9uID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0RXZlbnRVc2VycygpIHtcclxuICAgICAgY29uc3QgZXZlbnRzSWQgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEV2ZW50LmlkO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfVVNFUlNfR09fVE9fVEhFX0VWRU5UXCIsIHtcclxuICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50c0lkLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdKTtcclxuICAgICAgdGhpcy5ldmVudFVzZXJzID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRFdmVudFVzZXJzO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyByZXBvcnRFdmVudCgpIHtcclxuICAgICAgaWYgKCF0aGlzLnJlcG9ydEhlYWRlcikge1xyXG4gICAgICAgIGFsZXJ0KCfQkdGD0LTRjCDQu9Cw0YHQutCwLCDQstC40LHQtdGA0ZbRgtGMINC30LDQs9C+0LvQvtCy0L7QuiDQtNC70Y8g0LLQsNGI0L7RlyDRgdC60LDRgNCz0LgnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucmVwb3J0SGVhZGVyID09PSAn0IbQvdGI0LUnICYmICF0aGlzLnJlcG9ydERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoJ9CS0Lgg0LLQuNCx0YDQsNC70Lgg0LfQsNCz0L7Qu9C+0LLQvtC6IFwi0IbQvdGI0LVcIiwg0LHRg9C00Ywg0LvQsNGB0LrQsCwg0LTQvtC00LDQudGC0LUg0L7Qv9C40YEg0JLQsNGI0L7RlyDRgdC60LDRgNCz0LgnKTtcclxuICAgICAgICByZXR1cm47IFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFByb2ZpbGU7XHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiUkVQT1JUX0VWRU5UXCIsIHtcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgSGVhZGVyOiB0aGlzLnJlcG9ydEhlYWRlcixcclxuICAgICAgICAgIERlc2NyaXB0aW9uOiB0aGlzLnJlcG9ydERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgRXZlbnRJZDogdGhpcy5ldmVudC5pZCxcclxuICAgICAgICAgIEF1dGhvcklkOiB1c2VyLmlkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlcjogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnJlcGxhY2UoeyBwYXRoOiBcIi9ldmVudC1wYWdlXCIsIG5hbWU6IFwiZXZlbnRcIiwgcXVlcnk6IHsgaWQ6IHRoaXMuZXZlbnQuaWQgfSB9KTtcclxuICAgICAgICAgIHRoaXMuc2hvd1JlcG9ydERldGFpbHMgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuRXZlbnRQYWdlID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcG9ydEhlYWRlciA9IFwiXCI7XHJcbiAgICAgICAgICByZXBvcnREZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBEaWFsb2dDb25maXJtYXRpb24sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uVG9wTGluZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uaW5wdXRTdHlsZSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIG1heC13aWR0aDogOTUlO1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxufVxyXG5cclxuLm5hdmJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuaDEge1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAyO1xyXG59XHJcblxyXG5oNCB7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgcGFkZGluZzogMHB4IDEycHg7XHJcbn1cclxuXHJcbmgyIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbGluZS1oZWlnaHQ6IDI7XHJcbn1cclxuXHJcbi5jb2xfY29udGVpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcblxyXG4uY29sdW1uIHtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4ud2hpdGVfY29udGVpbmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICB3aWR0aDogNDAwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLm1hcCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzMDBweDtcclxuICBtYXJnaW46IDA7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi50ZXh0X2NvbnRlaW5ldCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5ldmVudC1kZXRhaWxzLXRhYmxlIHtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4udGFibGUtY2VsbCB7XHJcbiAgYm9yZGVyOiAycHggc29saWQgIzAwMDAwMDtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuLnRhYmxlLWNlbGw6Zmlyc3QtY2hpbGQge1xyXG4gIGJvcmRlci1sZWZ0OiBub25lO1xyXG59XHJcblxyXG4udGFibGUtY2VsbDpsYXN0LWNoaWxkIHtcclxuICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbn1cclxuXHJcbi50YWJsZS1jZWxsOmZpcnN0LWNoaWxkIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIHBhZGRpbmc6IDhweCAxNnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgbWFyZ2luOiAzMHB4O1xyXG59XHJcblxyXG4uZGVsZXRlLWJ1dHRvbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjMzU0NTtcclxufVxyXG5cclxuLmVkaXQtYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xyXG59XHJcblxyXG4uam9pbi1idXR0b24ge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLnVzZXJzLWF2YXRhci1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLmF2YXRhcnMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi51c2Vycy1pbWFnZSB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufVxyXG5cclxuLnVzZXJzLWljb24tY29udGFpbmVyIHtcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gIC5uYXZiYXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuXHJcbiAgaDEge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMHB4IDEycHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjtcclxuICB9XHJcblxyXG4gIGg0IHtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgcGFkZGluZzogMHB4IDEycHg7XHJcbiAgfVxyXG5cclxuICAuY29sX2NvbnRlaW5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG5cclxuICAuY29sdW1uIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcbiAgLndoaXRlX2NvbnRlaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICB9XHJcblxyXG4gIC5qb2luLWJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uaW1nLWZpeGVkLXNpemUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICB3aWR0aDogNDAwcHg7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsIl9ub3JtYWxpemVDbGFzcyIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLElBQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxVQUFVO0FBQUEsRUFDWDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLGFBQWEsU0FBUyxLQUFLO0FBRWpDLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsbUJBQW9CLFdBQVcsMEJBQ1AsTUFBTSxhQUFhLE9BQU8sZ0JBQWdCO0FBQUEsSUFDbkU7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLE1BQUssR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDckU7QUFDSCxDQUFDO0FDcEJELElBQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsWUFBWTtBQUFBLEVB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
