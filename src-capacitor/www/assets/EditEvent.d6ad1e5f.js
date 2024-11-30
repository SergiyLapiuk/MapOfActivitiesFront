import { Q as QSpinner, e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { Q as QFile } from "./QFile.bf5515cd.js";
import { T as TypeSelector } from "./TypeSelector.ab69af63.js";
import { L } from "./leaflet-src.ffd70e66.js";
import { g as getTimePlusFifteenMinutes } from "./convertDate.2fe32ce1.js";
import { D as DateTimeInput } from "./volleyball.ce4c2a1e.js";
import { _ as _export_sfc, K as resolveComponent, L as openBlock, Y as createElementBlock, j as createVNode, O as createBaseVNode, v as withDirectives, aa as vShow, a0 as toDisplayString, ap as pushScopeId, aq as popScopeId } from "./index.6764d851.js";
import "./uid.627d4ed7.js";
import "./QChip.8fa1dfba.js";
import "./format.3e32b8d9.js";
import "./EventIcon.e157b631.js";
import "./QMenu.9dd1c774.js";
import "./scroll.a3a49254.js";
var EditEvent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  components: { TypeSelector, DateTimeInput },
  props: {
    id: { type: Number, required: true }
  },
  data() {
    return {
      event: {},
      autoResizeTextArea: "auto",
      showEditEventStepOne: true,
      showEditEventStepTwo: false,
      files: []
    };
  },
  computed: {
    type() {
      return this.$store.getters.getLeafTypes.find(
        (t) => t.id == this.event.typeId
      );
    },
    isTypeHistoric() {
      return this.type == null ? false : this.type.maxDuration == null;
    },
    isNextDisabled() {
      const timeValidation = this.validateTime;
      return !(this.event.name && this.event.name.length <= 50 && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.event.name) && this.event.typeId && timeValidation === true && this.event.coordinates);
    },
    validateTime() {
      var _a, _b;
      if (this.isTypeHistoric == true) {
        return true;
      }
      if (!this.event.endTime || !this.event.startTime) {
        return "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0447\u0430\u0441";
      }
      let maxHours = (_b = (_a = this.type) == null ? void 0 : _a.maxDuration) != null ? _b : 10;
      let diff = Math.abs(
        new Date(this.event.endTime) - new Date(this.event.startTime)
      ) / 36e5;
      if (diff > maxHours) {
        return "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0430 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0443.";
      }
      if (diff * 60 < 15) {
        return "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u0430.";
      }
      return true;
    }
  },
  async mounted() {
    await this.getEvent();
    this.event = JSON.parse(JSON.stringify(this.$store.getters.getEvent));
    this.showMap();
  },
  methods: {
    backPage() {
      if (this.showEditEventStepOne == true) {
        this.$router.go(-1);
      } else if (this.showEditEventStepTwo == true) {
        this.showEditEventStepTwo = false;
        this.showEditEventStepOne = true;
      }
    },
    nextPage() {
      if (!this.isNextDisabled) {
        this.showEditEventStepOne = false;
        this.showEditEventStepTwo = true;
      }
    },
    convertFileToDataUrl(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      } else {
        return "";
      }
    },
    async updateEvent() {
      this.event.dataUrl = await this.convertFileToDataUrl(this.files[0]);
      if (this.isTypeHistoric == true) {
        this.event.startTime = null;
        this.event.endTime = null;
      }
      this.$store.dispatch("PUT_EVENT", {
        formData: this.event,
        id: this.event.id,
        handler: (res) => {
          this.$store.dispatch("GET_EVENTS");
          this.$router.push({ name: "events-list", params: {} });
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        }
      });
    },
    async getEvent() {
      await Promise.all([
        this.event != {} ? this.$store.dispatch("GET_EVENT", { id: this.id }) : void 0
      ]);
    },
    showMap() {
      if (this.event != null) {
        const coordinates = this.event.coordinates.split(", ").map(parseFloat);
        const roundedCoordinates = coordinates.map((number) => {
          return number.toFixed(2);
        });
        const map = L.map("map3").setView(roundedCoordinates, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19
        }).addTo(map);
        var marker = L.marker(
          this.event.coordinates.split(", ").map(parseFloat)
        ).addTo(map);
        map.on("click", (event) => {
          const latlng = event.latlng;
          if (marker) {
            map.removeLayer(marker);
          }
          marker = L.marker(latlng).addTo(map);
          this.event.coordinates = `${latlng.lat}, ${latlng.lng}`;
        });
      }
    }
  },
  watch: {
    "event.startTime"(val) {
      if (this.event.endTime != null && val > this.event.endTime) {
        let end = getTimePlusFifteenMinutes(val);
        this.event.endTime = end;
      }
    },
    "event.endTime"(val) {
      if (val != null && val <= this.event.startTime) {
        this.event.endTime = this.event.startTime;
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-4bf471f7"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { class: "TopLine" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500" } }, " Editing your event details ", -1));
const _hoisted_5 = { class: "inputStyle" };
const _hoisted_6 = { class: "text-red-700 text-sm" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  id: "map3",
  class: "map"
}, null, -1));
const _hoisted_8 = { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " Picture(s) of your event ", -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " Description of your event ", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_TypeSelector = resolveComponent("TypeSelector");
  const _component_DateTimeInput = resolveComponent("DateTimeInput");
  return $data.event == {} ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(QSpinner, {
      color: "primary",
      size: "3em",
      class: "mx-auto"
    })
  ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_3, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.backPage,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        _hoisted_4,
        withDirectives(createBaseVNode("div", null, [
          createVNode(QBtn, {
            disable: $options.isNextDisabled,
            flat: "",
            style: "",
            onClick: $options.nextPage,
            label: "Next",
            color: "primary"
          }, null, 8, ["disable", "onClick"])
        ], 512), [
          [vShow, $data.showEditEventStepOne]
        ]),
        withDirectives(createBaseVNode("div", null, [
          createVNode(QBtn, {
            flat: "",
            style: "",
            onClick: $options.updateEvent,
            label: "Update event",
            color: "primary"
          }, null, 8, ["onClick"])
        ], 512), [
          [vShow, $data.showEditEventStepTwo]
        ])
      ]),
      withDirectives(createBaseVNode("div", null, [
        createBaseVNode("div", _hoisted_5, [
          createVNode(QInput, {
            square: "",
            outlined: "",
            modelValue: $data.event.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.event.name = $event),
            label: "Name",
            clearable: "",
            rules: [
              (val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",
              (val) => val && val.length <= 50 || "\u041D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",
              (val) => val && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val) || "\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043B\u0438\u0448\u0435 \u043B\u0456\u0442\u0435\u0440\u0438, \u0446\u0438\u0444\u0440\u0438 \u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u0438"
            ]
          }, null, 8, ["modelValue", "rules"]),
          createVNode(_component_TypeSelector, {
            value: this.event.typeId,
            onInput: _cache[1] || (_cache[1] = (id) => this.event.typeId = id)
          }, null, 8, ["value"]),
          createBaseVNode("div", _hoisted_6, toDisplayString($options.validateTime == true ? "" : $options.validateTime), 1),
          withDirectives(createVNode(_component_DateTimeInput, {
            class: "mb-3",
            label: "starting time",
            value: (_a = $data.event.startTime) != null ? _a : null,
            min: $options.isTypeHistoric ? "" : new Date().toISOString(),
            onInput: _cache[2] || (_cache[2] = (v) => $data.event.startTime = v)
          }, null, 8, ["value", "min"]), [
            [vShow, $options.isTypeHistoric == false]
          ]),
          withDirectives(createVNode(_component_DateTimeInput, {
            class: "mb-6",
            label: "ending time",
            value: (_b = $data.event.endTime) != null ? _b : null,
            min: (_c = $data.event.startTime) != null ? _c : null,
            onInput: _cache[3] || (_cache[3] = (v) => $data.event.endTime = v)
          }, null, 8, ["value", "min"]), [
            [vShow, $options.isTypeHistoric == false]
          ]),
          createVNode(QInput, {
            square: "",
            outlined: "",
            modelValue: $data.event.coordinates,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.event.coordinates = $event),
            label: "Address",
            clearable: "",
            rules: [(val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"],
            readonly: ""
          }, null, 8, ["modelValue", "rules"])
        ]),
        _hoisted_7
      ], 512), [
        [vShow, $data.showEditEventStepOne]
      ])
    ]),
    withDirectives(createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_8, [
        _hoisted_9,
        createVNode(QFile, {
          modelValue: $data.files,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.files = $event),
          label: "Change picture",
          outlined: "",
          multiple: "",
          style: { "max-width": "300px" }
        }, null, 8, ["modelValue"]),
        _hoisted_10,
        createVNode(QInput, {
          modelValue: $data.event.description,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.event.description = $event),
          outlined: "",
          autogrow: "",
          style: { "width": "95%" }
        }, null, 8, ["modelValue"])
      ])
    ], 512), [
      [vShow, $data.showEditEventStepTwo]
    ])
  ]));
}
var EditEvent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4bf471f7"], ["__file", "EditEvent.vue"]]);
export { EditEvent as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdEV2ZW50LmQ2YWQxZTVmLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvRWRpdEV2ZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwiZXZlbnQgPT0ge31cIj5cclxuICAgIDxxLXNwaW5uZXIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjNlbVwiIGNsYXNzPVwibXgtYXV0b1wiIC8+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiB2LWVsc2U+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiVG9wTGluZVwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IHN0eWxlIEBjbGljaz1cImJhY2tQYWdlXCIgaWNvbj1cImFycm93X2JhY2tcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA1MDBcIj5cclxuICAgICAgICAgIEVkaXRpbmcgeW91ciBldmVudCBkZXRhaWxzXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJzaG93RWRpdEV2ZW50U3RlcE9uZVwiPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIDpkaXNhYmxlPVwiaXNOZXh0RGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICAgIHN0eWxlXHJcbiAgICAgICAgICAgIEBjbGljaz1cIm5leHRQYWdlXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJOZXh0XCJcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJzaG93RWRpdEV2ZW50U3RlcFR3b1wiPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIGZsYXRcclxuICAgICAgICAgICAgc3R5bGVcclxuICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlRXZlbnRcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIlVwZGF0ZSBldmVudFwiXHJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiB2LXNob3c9XCJzaG93RWRpdEV2ZW50U3RlcE9uZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFN0eWxlXCI+XHJcbiAgICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgICBzcXVhcmVcclxuICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgdi1tb2RlbD1cImV2ZW50Lm5hbWVcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIk5hbWVcIlxyXG4gICAgICAgICAgICBjbGVhcmFibGVcclxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xyXG4gICAgICAgICAgICAgICh2YWwpID0+ICEhdmFsIHx8ICfQndC10L7QsdGF0ZbQtNC90L4g0LfQsNC/0L7QstC90LjRgtC4JyxcclxuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPD0gNTApIHx8ICfQndC1INCx0ZbQu9GM0YjQtSA1MCDRgdC40LzQstC+0LvRltCyJyxcclxuICAgICAgICAgICAgICAodmFsKSA9PlxyXG4gICAgICAgICAgICAgICAgKHZhbCAmJlxyXG4gICAgICAgICAgICAgICAgICAvXls/IUAoKeKEliwuOzphLXpBLVrQsC3Rj9CQLdCv0pHSkNGW0IbRl9CH0ZTQhDAtOVxcc10qJC91LnRlc3QodmFsKSkgfHxcclxuICAgICAgICAgICAgICAgICfQnNC+0LbQu9C40LLRliDQu9C40YjQtSDQu9GW0YLQtdGA0LgsINGG0LjRhNGA0Lgg0YLQsCDRgdC40LzQstC+0LvQuCcsXHJcbiAgICAgICAgICAgIF1cIlxyXG4gICAgICAgICAgPjwvcS1pbnB1dD5cclxuXHJcbiAgICAgICAgICA8VHlwZVNlbGVjdG9yXHJcbiAgICAgICAgICAgIDp2YWx1ZT1cInRoaXMuZXZlbnQudHlwZUlkXCJcclxuICAgICAgICAgICAgQGlucHV0PVwiKGlkKSA9PiAodGhpcy5ldmVudC50eXBlSWQgPSBpZClcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yZWQtNzAwIHRleHQtc21cIj5cclxuICAgICAgICAgICAge3sgdmFsaWRhdGVUaW1lID09IHRydWUgPyBcIlwiIDogdmFsaWRhdGVUaW1lIH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8RGF0ZVRpbWVJbnB1dFxyXG4gICAgICAgICAgICB2LXNob3c9XCJpc1R5cGVIaXN0b3JpYyA9PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibWItM1wiXHJcbiAgICAgICAgICAgIGxhYmVsPVwic3RhcnRpbmcgdGltZVwiXHJcbiAgICAgICAgICAgIDp2YWx1ZT1cImV2ZW50LnN0YXJ0VGltZSA/PyBudWxsXCJcclxuICAgICAgICAgICAgOm1pbj1cImlzVHlwZUhpc3RvcmljID8gJycgOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcIlxyXG4gICAgICAgICAgICBAaW5wdXQ9XCIodikgPT4gKGV2ZW50LnN0YXJ0VGltZSA9IHYpXCJcclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPERhdGVUaW1lSW5wdXRcclxuICAgICAgICAgICAgdi1zaG93PVwiaXNUeXBlSGlzdG9yaWMgPT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBjbGFzcz1cIm1iLTZcIlxyXG4gICAgICAgICAgICBsYWJlbD1cImVuZGluZyB0aW1lXCJcclxuICAgICAgICAgICAgOnZhbHVlPVwiZXZlbnQuZW5kVGltZSA/PyBudWxsXCJcclxuICAgICAgICAgICAgOm1pbj1cImV2ZW50LnN0YXJ0VGltZSA/PyBudWxsXCJcclxuICAgICAgICAgICAgQGlucHV0PVwiKHYpID0+IChldmVudC5lbmRUaW1lID0gdilcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgICBzcXVhcmVcclxuICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgdi1tb2RlbD1cImV2ZW50LmNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJBZGRyZXNzXCJcclxuICAgICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAhIXZhbCB8fCAn0J3QtdC+0LHRhdGW0LTQvdC+INC30LDQv9C+0LLQvdC40YLQuCddXCJcclxuICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgID48L3EtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cIm1hcDNcIiBjbGFzcz1cIm1hcFwiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgdi1zaG93PVwic2hvd0VkaXRFdmVudFN0ZXBUd29cIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXJcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOyBtYXJnaW46IDEwcHhcIj5cclxuICAgICAgICAgIFBpY3R1cmUocykgb2YgeW91ciBldmVudFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxxLWZpbGVcclxuICAgICAgICAgIHYtbW9kZWw9XCJmaWxlc1wiXHJcbiAgICAgICAgICBsYWJlbD1cIkNoYW5nZSBwaWN0dXJlXCJcclxuICAgICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgICBtdWx0aXBsZVxyXG4gICAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDMwMHB4XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA1MDA7IG1hcmdpbjogMTBweFwiPlxyXG4gICAgICAgICAgRGVzY3JpcHRpb24gb2YgeW91ciBldmVudFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICB2LW1vZGVsPVwiZXZlbnQuZGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgIGF1dG9ncm93XHJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiA5NSVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uVG9wTGluZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi5pbnB1dFN0eWxlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IGF1dG87XHJcbiAgbWF4LXdpZHRoOiA5NSU7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG59XHJcbi5tYXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDQwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XHJcbn1cclxuPC9zdHlsZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBUeXBlU2VsZWN0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvVHlwZVNlbGVjdG9yLnZ1ZVwiO1xyXG5pbXBvcnQgTCBmcm9tIFwibGVhZmxldFwiO1xyXG5pbXBvcnQgeyBnZXRUaW1lUGx1c0ZpZnRlZW5NaW51dGVzIH0gZnJvbSBcIi4uL2NvbnZlcnREYXRlXCI7XHJcbmltcG9ydCBEYXRlVGltZUlucHV0IGZyb20gXCJzcmMvY29tcG9uZW50cy9EYXRlVGltZUlucHV0LnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHsgVHlwZVNlbGVjdG9yLCBEYXRlVGltZUlucHV0IH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIGlkOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBldmVudDoge30sXHJcbiAgICAgIGF1dG9SZXNpemVUZXh0QXJlYTogXCJhdXRvXCIsXHJcbiAgICAgIHNob3dFZGl0RXZlbnRTdGVwT25lOiB0cnVlLFxyXG4gICAgICBzaG93RWRpdEV2ZW50U3RlcFR3bzogZmFsc2UsXHJcbiAgICAgIGZpbGVzOiBbXSxcclxuICAgICAgLy9BY3R1YWw6IHRydWUsXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB0eXBlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRMZWFmVHlwZXMuZmluZChcclxuICAgICAgICAodCkgPT4gdC5pZCA9PSB0aGlzLmV2ZW50LnR5cGVJZFxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIGlzVHlwZUhpc3RvcmljKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50eXBlID09IG51bGwgPyBmYWxzZSA6IHRoaXMudHlwZS5tYXhEdXJhdGlvbiA9PSBudWxsO1xyXG4gICAgfSxcclxuICAgIGlzTmV4dERpc2FibGVkKCkge1xyXG4gICAgICBjb25zdCB0aW1lVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGVUaW1lO1xyXG4gICAgICByZXR1cm4gIShcclxuICAgICAgICB0aGlzLmV2ZW50Lm5hbWUgJiZcclxuICAgICAgICB0aGlzLmV2ZW50Lm5hbWUubGVuZ3RoIDw9IDUwICYmXHJcbiAgICAgICAgL15bPyFAKCnihJYsLjs6YS16QS1a0LAt0Y/QkC3Qr9KR0pDRltCG0ZfQh9GU0IQwLTlcXHNdKiQvdS50ZXN0KHRoaXMuZXZlbnQubmFtZSkgJiZcclxuICAgICAgICB0aGlzLmV2ZW50LnR5cGVJZCAmJlxyXG4gICAgICAgIHRpbWVWYWxpZGF0aW9uID09PSB0cnVlICYmXHJcbiAgICAgICAgdGhpcy5ldmVudC5jb29yZGluYXRlc1xyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIHZhbGlkYXRlVGltZSgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNUeXBlSGlzdG9yaWMgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRoaXMuZXZlbnQuZW5kVGltZSB8fCAhdGhpcy5ldmVudC5zdGFydFRpbWUpIHtcclxuICAgICAgICByZXR1cm4gXCLQntCx0LXRgNGW0YLRjCDRh9Cw0YFcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG1heEhvdXJzID0gdGhpcy50eXBlPy5tYXhEdXJhdGlvbiA/PyAxMDtcclxuICAgICAgbGV0IGRpZmYgPVxyXG4gICAgICAgIE1hdGguYWJzKFxyXG4gICAgICAgICAgbmV3IERhdGUodGhpcy5ldmVudC5lbmRUaW1lKSAtIG5ldyBEYXRlKHRoaXMuZXZlbnQuc3RhcnRUaW1lKVxyXG4gICAgICAgICkgLyAzNmU1O1xyXG5cclxuICAgICAgaWYgKGRpZmYgPiBtYXhIb3Vycykge1xyXG4gICAgICAgIHJldHVybiBcItCi0YDQuNCy0LDQu9GW0YHRgtGMINC/0L7QtNGW0Zcg0LfQsNC90LDQtNGC0L4g0LLQtdC70LjQutCwINC00LvRjyDQvtCx0YDQsNC90L7Qs9C+INGC0LjQv9GDLlwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkaWZmICogNjAgPCAxNSkge1xyXG4gICAgICAgIHJldHVybiBcItCi0YDQuNCy0LDQu9GW0YHRgtGMINC/0L7QtNGW0Zcg0LfQsNC90LDQtNGC0L4g0LrQvtGA0L7RgtC60LAuXCI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmdldEV2ZW50KCk7XHJcbiAgICB0aGlzLmV2ZW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEV2ZW50KSk7XHJcbiAgICB0aGlzLnNob3dNYXAoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGJhY2tQYWdlKCkge1xyXG4gICAgICBpZiAodGhpcy5zaG93RWRpdEV2ZW50U3RlcE9uZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy4kcm91dGVyLmdvKC0xKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3dFZGl0RXZlbnRTdGVwVHdvID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnNob3dFZGl0RXZlbnRTdGVwVHdvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93RWRpdEV2ZW50U3RlcE9uZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbmV4dFBhZ2UoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc05leHREaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0VkaXRFdmVudFN0ZXBPbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dFZGl0RXZlbnRTdGVwVHdvID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb252ZXJ0RmlsZVRvRGF0YVVybChmaWxlKSB7XHJcbiAgICAgIGlmIChmaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHJlc29sdmUoZS50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gKGUpID0+IHJlamVjdChlKTtcclxuICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHVwZGF0ZUV2ZW50KCkge1xyXG4gICAgICB0aGlzLmV2ZW50LmRhdGFVcmwgPSBhd2FpdCB0aGlzLmNvbnZlcnRGaWxlVG9EYXRhVXJsKHRoaXMuZmlsZXNbMF0pO1xyXG4gICAgICBpZiAodGhpcy5pc1R5cGVIaXN0b3JpYyA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudC5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnQuZW5kVGltZSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJQVVRfRVZFTlRcIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB0aGlzLmV2ZW50LFxyXG4gICAgICAgIGlkOiB0aGlzLmV2ZW50LmlkLFxyXG4gICAgICAgIGhhbmRsZXI6IChyZXMpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0VWRU5UU1wiKTtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgbmFtZTogXCJldmVudHMtbGlzdFwiLCBwYXJhbXM6IHt9IH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlckVycm9yOiAoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycm9ycyk7XHJcbiAgICAgICAgICBhbGVydChcIkVycm9yIG9jY3VycmVkOiBcIiArIGVycm9ycyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0RXZlbnQoKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLmV2ZW50ICE9IHt9XHJcbiAgICAgICAgICA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0VWRU5UXCIsIHsgaWQ6IHRoaXMuaWQgfSlcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcbiAgICBzaG93TWFwKCkge1xyXG4gICAgICBpZiAodGhpcy5ldmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmV2ZW50LmNvb3JkaW5hdGVzLnNwbGl0KFwiLCBcIikubWFwKHBhcnNlRmxvYXQpO1xyXG4gICAgICAgIGNvbnN0IHJvdW5kZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcCgobnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbWFwID0gTC5tYXAoXCJtYXAzXCIpLnNldFZpZXcocm91bmRlZENvb3JkaW5hdGVzLCAxMyk7XHJcbiAgICAgICAgTC50aWxlTGF5ZXIoXCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiLCB7XHJcbiAgICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcihcclxuICAgICAgICAgIHRoaXMuZXZlbnQuY29vcmRpbmF0ZXMuc3BsaXQoXCIsIFwiKS5tYXAocGFyc2VGbG9hdClcclxuICAgICAgICApLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgbWFwLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBsYXRsbmcgPSBldmVudC5sYXRsbmc7XHJcbiAgICAgICAgICBpZiAobWFya2VyKSB7XHJcbiAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihtYXJrZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIobGF0bG5nKS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgdGhpcy5ldmVudC5jb29yZGluYXRlcyA9IGAke2xhdGxuZy5sYXR9LCAke2xhdGxuZy5sbmd9YDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBcImV2ZW50LnN0YXJ0VGltZVwiKHZhbCkge1xyXG4gICAgICBpZiAodGhpcy5ldmVudC5lbmRUaW1lICE9IG51bGwgJiYgdmFsID4gdGhpcy5ldmVudC5lbmRUaW1lKSB7XHJcbiAgICAgICAgbGV0IGVuZCA9IGdldFRpbWVQbHVzRmlmdGVlbk1pbnV0ZXModmFsKTtcclxuICAgICAgICB0aGlzLmV2ZW50LmVuZFRpbWUgPSBlbmQ7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImV2ZW50LmVuZFRpbWVcIih2YWwpIHtcclxuICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCA8PSB0aGlzLmV2ZW50LnN0YXJ0VGltZSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnQuZW5kVGltZSA9IHRoaXMuZXZlbnQuc3RhcnRUaW1lO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQWtKQSxNQUFLLFlBQVU7QUFBQSxFQUNiLFlBQVksRUFBRSxjQUFjLGNBQWU7QUFBQSxFQUMzQyxPQUFPO0FBQUEsSUFDTCxJQUFJLEVBQUUsTUFBTSxRQUFRLFVBQVUsS0FBTTtBQUFBLEVBQ3JDO0FBQUEsRUFDRCxPQUFPO0FBQ0wsV0FB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
