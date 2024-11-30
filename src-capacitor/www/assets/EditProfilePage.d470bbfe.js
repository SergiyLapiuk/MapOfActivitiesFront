import { d as QInput, e as QBtn } from "./QBtn.a363fc1a.js";
import { Q as QFile } from "./QFile.bf5515cd.js";
import { _ as _export_sfc, J as mapGetters, L as openBlock, Y as createElementBlock, O as createBaseVNode, j as createVNode, P as createCommentVNode } from "./index.6764d851.js";
import "./uid.627d4ed7.js";
import "./QChip.8fa1dfba.js";
import "./format.3e32b8d9.js";
var EditProfilePage_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  data() {
    return {
      profile: {},
      files: [],
      deletedPicture: false
    };
  },
  async created() {
    this.$watch(
      () => this.$store.getters.getStatus,
      async (newStatus, oldStatus) => {
        if (newStatus === "active" && newStatus !== oldStatus) {
          await this.getProfile();
          this.profile = JSON.parse(
            JSON.stringify(this.$store.getters.getProfile)
          );
        }
      }
    );
    if (this.$store.getters.getStatus === "active") {
      await this.getProfile();
      this.profile = JSON.parse(JSON.stringify(this.$store.getters.getProfile));
    }
  },
  computed: {
    ...mapGetters({ CurrentUser: "getCurrentUser" })
  },
  mounted() {
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: "edit-profile"
      });
    },
    async getProfile() {
      if (this.$store.getters.getCurrentUser) {
        await Promise.all([
          this.profile != {} ? this.$store.dispatch("GET_PROFILE", {
            id: this.$store.getters.getCurrentUser
          }) : void 0
        ]);
      }
    },
    deletePicture() {
      this.deletedPicture = true;
    },
    convertFileToDataUrl(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      } else if (this.deletedPicture) {
        return "The picture has been deleted";
      } else {
        return "";
      }
    },
    async updateProfile() {
      this.profile.imageURL = await this.convertFileToDataUrl(this.files[0]);
      this.$store.dispatch("PUT_PROFILE", {
        formData: this.profile,
        id: this.profile.userId,
        handler: (res) => {
          this.$router.push({ name: "profile-page", params: {} });
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        }
      });
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "TopLineEditProfile" }, [
  /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "550" } }, "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u043E\u0444\u0456\u043B\u044E")
], -1);
const _hoisted_2 = { class: "inputStyleProfile" };
const _hoisted_3 = { style: { "display": "flex", "flex-direction": "column", "align-items": "center", "margin-bottom": "20px", "border-bottom": "1px solid #8d8d8d" } };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0420\u043E\u0437\u043A\u0430\u0436\u0456\u0442\u044C \u043F\u0440\u043E \u0441\u0435\u0431\u0435 ", -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0444\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0456\u043B\u044E \u0430\u0431\u043E \u0432\u0438\u0434\u0430\u043B\u0456\u0442\u044C \u043F\u043E\u0442\u043E\u0447\u043D\u0435 (\u0437\u0430 \u0431\u0430\u0436\u0430\u043D\u043D\u044F\u043C) ", -1);
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { class: "edit-button-container" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("div", _hoisted_2, [
      createVNode(QInput, {
        square: "",
        outlined: "",
        modelValue: $data.profile.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.profile.name = $event),
        label: "\u0406\u043C'\u044F",
        clearable: "",
        rules: [
          (val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",
          (val) => val && val.length <= 50 || "\u041D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",
          (val) => val && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val) || "\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043B\u0438\u0448\u0435 \u043B\u0456\u0442\u0435\u0440\u0438, \u0446\u0438\u0444\u0440\u0438 \u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u0438"
        ]
      }, null, 8, ["modelValue", "rules"])
    ]),
    createBaseVNode("div", _hoisted_3, [
      _hoisted_4,
      createVNode(QInput, {
        modelValue: $data.profile.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.profile.description = $event),
        outlined: "",
        autogrow: "",
        style: { "width": "95%" }
      }, null, 8, ["modelValue"]),
      _hoisted_5,
      createVNode(QFile, {
        modelValue: $data.files,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.files = $event),
        label: "\u0412\u0438\u0431\u0456\u0440 \u0444\u043E\u0442\u043E",
        outlined: "",
        multiple: "",
        style: { "max-width": "300px", "margin-bottom": "10px" }
      }, null, 8, ["modelValue"]),
      createVNode(QBtn, {
        ripple: { center: true },
        onClick: $options.deletePicture,
        color: "red",
        label: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0444\u043E\u0442\u043E",
        "no-caps": "",
        style: { "margin-bottom": "20px" }
      }, null, 8, ["onClick"]),
      $data.deletedPicture ? (openBlock(), createElementBlock("div", _hoisted_6, " \u0424\u043E\u0442\u043E \u0431\u0443\u0434\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0435 \u043F\u0456\u0441\u043B\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D ")) : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_7, [
      createVNode(QBtn, {
        ripple: { center: true },
        onClick: $options.updateProfile,
        color: "secondary",
        style: { "width": "100%" },
        label: "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043C\u0456\u043D\u0438",
        "no-caps": ""
      }, null, 8, ["onClick"])
    ])
  ]);
}
var EditProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "EditProfilePage.vue"]]);
export { EditProfilePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFByb2ZpbGVQYWdlLmQ0NzBiYmZlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvRWRpdFByb2ZpbGVQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJUb3BMaW5lRWRpdFByb2ZpbGVcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDU1MFwiPtCg0LXQtNCw0LPRg9Cy0LDQvdC90Y8g0L/RgNC+0YTRltC70Y48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0U3R5bGVQcm9maWxlXCI+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgc3F1YXJlXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicHJvZmlsZS5uYW1lXCJcclxuICAgICAgICBsYWJlbD1cItCG0Lwn0Y9cIlxyXG4gICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgIDpydWxlcz1cIltcclxuICAgICAgICAgICh2YWwpID0+ICEhdmFsIHx8ICfQndC10L7QsdGF0ZbQtNC90L4g0LfQsNC/0L7QstC90LjRgtC4JyxcclxuICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA8PSA1MCkgfHwgJ9Cd0LUg0LHRltC70YzRiNC1IDUwINGB0LjQvNCy0L7Qu9GW0LInLFxyXG4gICAgICAgICAgKHZhbCkgPT5cclxuICAgICAgICAgICAgKHZhbCAmJiAvXls/IUAoKeKEliwuOzphLXpBLVrQsC3Rj9CQLdCv0pHSkNGW0IbRl9CH0ZTQhDAtOVxcc10qJC91LnRlc3QodmFsKSkgfHxcclxuICAgICAgICAgICAgJ9Cc0L7QttC70LjQstGWINC70LjRiNC1INC70ZbRgtC10YDQuCwg0YbQuNGE0YDQuCDRgtCwINGB0LjQvNCy0L7Qu9C4JyxcclxuICAgICAgICBdXCJcclxuICAgICAgPjwvcS1pbnB1dD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdlxyXG4gICAgICBzdHlsZT1cIlxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4ZDhkOGQ7XHJcbiAgICAgIFwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA1MDA7IG1hcmdpbjogMTBweFwiPlxyXG4gICAgICAgINCg0L7Qt9C60LDQttGW0YLRjCDQv9GA0L4g0YHQtdCx0LVcclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgdi1tb2RlbD1cInByb2ZpbGUuZGVzY3JpcHRpb25cIlxyXG4gICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgYXV0b2dyb3dcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiA5NSVcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDUwMDsgbWFyZ2luOiAxMHB4XCI+XHJcbiAgICAgICAg0JLQuNCx0LXRgNGW0YLRjCDRhNC+0YLQviDQv9GA0L7RhNGW0LvRjiDQsNCx0L4g0LLQuNC00LDQu9GW0YLRjCDQv9C+0YLQvtGH0L3QtSAo0LfQsCDQsdCw0LbQsNC90L3Rj9C8KVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHEtZmlsZVxyXG4gICAgICAgIHYtbW9kZWw9XCJmaWxlc1wiXHJcbiAgICAgICAgbGFiZWw9XCLQktC40LHRltGAINGE0L7RgtC+XCJcclxuICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgIG11bHRpcGxlXHJcbiAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDMwMHB4OyBtYXJnaW4tYm90dG9tOiAxMHB4XCJcclxuICAgICAgLz5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgOnJpcHBsZT1cInsgY2VudGVyOiB0cnVlIH1cIlxyXG4gICAgICAgIEBjbGljaz1cImRlbGV0ZVBpY3R1cmVcIlxyXG4gICAgICAgIGNvbG9yPVwicmVkXCJcclxuICAgICAgICBsYWJlbD1cItCS0LjQtNCw0LvQuNGC0Lgg0YTQvtGC0L5cIlxyXG4gICAgICAgIG5vLWNhcHNcclxuICAgICAgICBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHhcIlxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJkZWxldGVkUGljdHVyZVwiPlxyXG4gICAgICAgINCk0L7RgtC+INCx0YPQtNC1INCy0LjQtNCw0LvQtdC90LUg0L/RltGB0LvRjyDQt9Cx0LXRgNC10LbQtdC90L3RjyDQt9C80ZbQvVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImVkaXQtYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICA6cmlwcGxlPVwieyBjZW50ZXI6IHRydWUgfVwiXHJcbiAgICAgICAgQGNsaWNrPVwidXBkYXRlUHJvZmlsZVwiXHJcbiAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxyXG4gICAgICAgIGxhYmVsPVwi0JfQsdC10YDQtdCz0YLQuCDQt9C80ZbQvdC4XCJcclxuICAgICAgICBuby1jYXBzXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IG1hcEdldHRlcnMgfSBmcm9tIFwidnVleFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHByb2ZpbGU6IHt9LFxyXG4gICAgICBmaWxlczogW10sXHJcbiAgICAgIGRlbGV0ZWRQaWN0dXJlOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBjcmVhdGVkKCkge1xyXG4gICAgdGhpcy4kd2F0Y2goXHJcbiAgICAgICgpID0+IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0U3RhdHVzLFxyXG4gICAgICBhc3luYyAobmV3U3RhdHVzLCBvbGRTdGF0dXMpID0+IHtcclxuICAgICAgICBpZiAobmV3U3RhdHVzID09PSBcImFjdGl2ZVwiICYmIG5ld1N0YXR1cyAhPT0gb2xkU3RhdHVzKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldFByb2ZpbGUoKTtcclxuICAgICAgICAgIHRoaXMucHJvZmlsZSA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0UHJvZmlsZSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFN0YXR1cyA9PT0gXCJhY3RpdmVcIikge1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFByb2ZpbGUoKTtcclxuICAgICAgdGhpcy5wcm9maWxlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFByb2ZpbGUpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICAuLi5tYXBHZXR0ZXJzKHsgQ3VycmVudFVzZXI6IFwiZ2V0Q3VycmVudFVzZXJcIiB9KSxcclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICAvL2F3YWl0IHRoaXMuZ2V0UHJvZmlsZSgpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZWRpdFByb2ZpbGUoKSB7XHJcbiAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtcclxuICAgICAgICBuYW1lOiBcImVkaXQtcHJvZmlsZVwiLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRQcm9maWxlKCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXIpO1xyXG4gICAgICBpZiAodGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50VXNlcikge1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgIHRoaXMucHJvZmlsZSAhPSB7fVxyXG4gICAgICAgICAgICA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX1BST0ZJTEVcIiwge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFVzZXIsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUGljdHVyZSgpIHtcclxuICAgICAgdGhpcy5kZWxldGVkUGljdHVyZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgY29udmVydEZpbGVUb0RhdGFVcmwoZmlsZSkge1xyXG4gICAgICBpZiAoZmlsZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiByZXNvbHZlKGUudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICByZWFkZXIub25lcnJvciA9IChlKSA9PiByZWplY3QoZSk7XHJcbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRlbGV0ZWRQaWN0dXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiVGhlIHBpY3R1cmUgaGFzIGJlZW4gZGVsZXRlZFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgdXBkYXRlUHJvZmlsZSgpIHtcclxuICAgICAgdGhpcy5wcm9maWxlLmltYWdlVVJMID0gYXdhaXQgdGhpcy5jb252ZXJ0RmlsZVRvRGF0YVVybCh0aGlzLmZpbGVzWzBdKTtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJQVVRfUFJPRklMRVwiLCB7XHJcbiAgICAgICAgZm9ybURhdGE6IHRoaXMucHJvZmlsZSxcclxuICAgICAgICBpZDogdGhpcy5wcm9maWxlLnVzZXJJZCxcclxuICAgICAgICBoYW5kbGVyOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwicHJvZmlsZS1wYWdlXCIsIHBhcmFtczoge30gfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyRXJyb3I6IChlcnJvcnMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igb2NjdXJyZWQ6IFwiICsgZXJyb3JzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi5Ub3BMaW5lRWRpdFByb2ZpbGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IC8qINCS0LjRgNGW0LLQvdGO0ZQg0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90L4g0L/QviDRhtC10L3RgtGA0YMgKi9cclxuICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDQktC40YDRltCy0L3RjtGUINCy0LXRgNGC0LjQutCw0LvRjNC90L4g0L/QviDRhtC10L3RgtGA0YMgKi9cclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGhlaWdodDogMzZweDsgLyog0JLQuCDQvNC+0LbQtdGC0LUg0LLRgdGC0LDQvdC+0LLQuNGC0Lgg0LrQvtC90LrRgNC10YLQvdGDINCy0LjRgdC+0YLRgyAqL1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjOGQ4ZDhkOyAvKiBBZGRzIGEgYm90dG9tIGJvcmRlciBsaW5lICovXHJcbn1cclxuLmlucHV0U3R5bGVQcm9maWxlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IGF1dG87XHJcbiAgbWF4LXdpZHRoOiA5NSU7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG59XHJcbi5lZGl0LWJ1dHRvbi1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAwIDQwcHg7IC8qINCU0L7QtNCw0ZTQvNC+INCy0ZbQtNGB0YLRg9C/0Lgg0Lcg0LrQvtC20L3QvtCz0L4g0LHQvtC60YMsINC90LDQv9GA0LjQutC70LDQtCwg0L/QviAxMHB4ICovXHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBNkVBLE1BQUssWUFBVTtBQUFBLEVBQ2IsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLFNBQVMsQ0FBRTtBQUFBLE1BQ1gsT0FBTyxDQUFFO0FBQUEsTUFDVCxnQkFBZ0I7QUFBQTtFQUVuQjtBQUFBLEVBQ0QsTUFBTSxVQUFVO0FBQ2QsU0FBSztBQUFBLE1BQ0gsTUFBTSxLQUFLLE9BQU8sUUFBUTtBQUFBLE1BQzFCLE9BQU8sV0FBVyxjQUFjO0FBQzlCLFlBQUksY0FBYyxZQUFZLGNBQWMsV0FBVztBQUNyRCxnQkFBTSxLQUFLO0FBQ1gsZUFBSyxVQUFV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
