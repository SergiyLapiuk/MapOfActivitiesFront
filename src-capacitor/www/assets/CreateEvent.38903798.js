import { e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { Q as QFile } from "./QFile.bf5515cd.js";
import { T as TypeSelector } from "./TypeSelector.ab69af63.js";
import { L } from "./leaflet-src.ffd70e66.js";
import { g as getTimePlusFifteenMinutes } from "./convertDate.2fe32ce1.js";
import { D as DateTimeInput } from "./volleyball.ce4c2a1e.js";
import { _ as _export_sfc, K as resolveComponent, L as openBlock, Y as createElementBlock, O as createBaseVNode, j as createVNode, v as withDirectives, aa as vShow, a0 as toDisplayString, F as Fragment, ap as pushScopeId, aq as popScopeId } from "./index.6764d851.js";
import "./uid.627d4ed7.js";
import "./QChip.8fa1dfba.js";
import "./format.3e32b8d9.js";
import "./EventIcon.e157b631.js";
import "./QMenu.9dd1c774.js";
import "./scroll.a3a49254.js";
var CreateEvent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "CreateEvent",
  components: { TypeSelector, DateTimeInput },
  data() {
    const now = new Date();
    let currentTime = now.toISOString();
    const computedTime = getTimePlusFifteenMinutes(currentTime);
    return {
      name: "",
      typeId: null,
      startTime: currentTime,
      endTime: computedTime,
      address: "50.4454, 30.5635",
      picture: "",
      description: "",
      showCreateEventStepOne: true,
      showCreateEventStepTwo: false,
      map: null,
      files: []
    };
  },
  computed: {
    type() {
      return this.$store.getters.getLeafTypes.find((t) => t.id == this.typeId);
    },
    isTypeHistoric() {
      return this.type == null ? false : this.type.maxDuration == null;
    },
    isNextDisabled() {
      const timeValidation = this.validateTime;
      return !(this.name && this.name.length <= 50 && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.name) && this.typeId && timeValidation === true && this.address);
    },
    validateTime() {
      var _a, _b;
      if (this.isTypeHistoric == true) {
        return true;
      }
      if (!this.endTime || !this.startTime) {
        return "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0447\u0430\u0441";
      }
      let maxHours = (_b = (_a = this.type) == null ? void 0 : _a.maxDuration) != null ? _b : 10;
      let diff = Math.abs(new Date(this.endTime) - new Date(this.startTime)) / 36e5;
      if (diff > maxHours) {
        return "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0430 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0443.";
      }
      if (diff * 60 < 15) {
        return "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u0430.";
      }
      return true;
    }
  },
  mounted() {
    this.showMap();
  },
  methods: {
    backPage() {
      if (this.showCreateEventStepOne == true) {
        this.$router.go(-1);
      } else if (this.showCreateEventStepTwo == true) {
        this.showCreateEventStepTwo = false;
        this.showCreateEventStepOne = true;
      }
    },
    nextPage() {
      if (!this.isNextDisabled) {
        this.showCreateEventStepOne = false;
        this.showCreateEventStepTwo = true;
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
    async createEvent() {
      if (this.isTypeHistoric == true) {
        this.startTime = null;
        this.endTime = null;
      }
      this.$store.dispatch("POST_EVENT", {
        formData: {
          name: this.name,
          typeId: this.typeId,
          description: this.description,
          startTime: this.startTime,
          endTime: this.endTime,
          coordinates: this.address,
          dataUrl: await this.convertFileToDataUrl(this.files[0])
        },
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
    showMap() {
      this.map = L.map("map2").setView([50.44, 30.56], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(this.map);
      let marker = null;
      this.map.on("click", (event) => {
        const latlng = event.latlng;
        if (marker) {
          this.map.removeLayer(marker);
        }
        marker = L.marker(latlng).addTo(this.map);
        this.address = `${latlng.lat}, ${latlng.lng}`;
      });
    }
  },
  watch: {
    startTime(val) {
      if (this.endTime != null && val > this.endTime) {
        let end = getTimePlusFifteenMinutes(val);
        this.endTime = end;
      }
    },
    endTime(val) {
      if (val != null && val <= this.startTime) {
        this.endTime = this.startTime;
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-2c9379c4"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "TopLine" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "550" } }, "\u0414\u0435\u0442\u0430\u043B\u0456 \u043F\u043E\u0434\u0456\u0457", -1));
const _hoisted_3 = { class: "inputStyle" };
const _hoisted_4 = { class: "text-red-700 text-sm" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  id: "map2",
  class: "map"
}, null, -1));
const _hoisted_6 = { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0432\u0430\u0448\u043E\u0457 \u043F\u043E\u0434\u0456\u0457 ", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "16px", "font-weight": "500", "margin": "10px" } }, " \u041E\u043F\u0438\u0441 \u0432\u0430\u0448\u043E\u0457 \u043F\u043E\u0434\u0456\u0457 (\u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u043E) ", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_TypeSelector = resolveComponent("TypeSelector");
  const _component_DateTimeInput = resolveComponent("DateTimeInput");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QBtn, {
          flat: "",
          style: "",
          onClick: $options.backPage,
          icon: "arrow_back",
          color: "primary"
        }, null, 8, ["onClick"]),
        _hoisted_2,
        withDirectives(createBaseVNode("div", null, [
          createVNode(QBtn, {
            disable: $options.isNextDisabled,
            flat: "",
            style: "",
            onClick: $options.nextPage,
            label: "\u0414\u0430\u043B\u0456",
            color: "primary"
          }, null, 8, ["disable", "onClick"])
        ], 512), [
          [vShow, $data.showCreateEventStepOne]
        ]),
        withDirectives(createBaseVNode("div", null, [
          createVNode(QBtn, {
            flat: "",
            style: "",
            onClick: $options.createEvent,
            label: "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438",
            color: "primary"
          }, null, 8, ["onClick"])
        ], 512), [
          [vShow, $data.showCreateEventStepTwo]
        ])
      ]),
      withDirectives(createBaseVNode("div", null, [
        createBaseVNode("div", _hoisted_3, [
          createVNode(QInput, {
            square: "",
            outlined: "",
            modelValue: $data.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
            label: "\u041D\u0430\u0437\u0432\u0430",
            clearable: "",
            rules: [
              (val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",
              (val) => val && val.length <= 50 || "\u041D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",
              (val) => val && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val) || "\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043B\u0438\u0448\u0435 \u043B\u0456\u0442\u0435\u0440\u0438, \u0446\u0438\u0444\u0440\u0438 \u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u0438"
            ]
          }, null, 8, ["modelValue", "rules"]),
          createVNode(_component_TypeSelector, {
            value: $data.typeId,
            onInput: _cache[1] || (_cache[1] = (id) => $data.typeId = id),
            rules: [(val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"],
            class: "mb-3"
          }, null, 8, ["value", "rules"]),
          createBaseVNode("div", _hoisted_4, toDisplayString($options.validateTime == true ? "" : $options.validateTime), 1),
          withDirectives(createVNode(_component_DateTimeInput, {
            class: "mb-3",
            label: "\u0427\u0430\u0441 \u043F\u043E\u0447\u0430\u0442\u043A\u0443",
            value: (_a = $data.startTime) != null ? _a : null,
            min: $options.isTypeHistoric ? "" : new Date().toISOString(),
            onInput: _cache[2] || (_cache[2] = (v) => $data.startTime = v)
          }, null, 8, ["value", "min"]), [
            [vShow, $options.isTypeHistoric == false]
          ]),
          withDirectives(createVNode(_component_DateTimeInput, {
            class: "mb-6",
            label: "\u0427\u0430\u0441 \u0437\u0430\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u044F",
            value: (_b = $data.endTime) != null ? _b : null,
            min: (_c = $data.startTime) != null ? _c : null,
            onInput: _cache[3] || (_cache[3] = (v) => $data.endTime = v)
          }, null, 8, ["value", "min"]), [
            [vShow, $options.isTypeHistoric == false]
          ]),
          createVNode(QInput, {
            square: "",
            outlined: "",
            modelValue: $data.address,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.address = $event),
            label: "\u041B\u043E\u043A\u0430\u0446\u0456\u044F",
            clearable: "",
            rules: [(val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"],
            readonly: ""
          }, null, 8, ["modelValue", "rules"])
        ]),
        _hoisted_5
      ], 512), [
        [vShow, $data.showCreateEventStepOne]
      ])
    ]),
    withDirectives(createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_6, [
        _hoisted_7,
        createVNode(QFile, {
          modelValue: $data.files,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.files = $event),
          label: "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443",
          outlined: "",
          multiple: "",
          style: { "max-width": "300px" }
        }, null, 8, ["modelValue"]),
        _hoisted_8,
        createVNode(QInput, {
          modelValue: $data.description,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.description = $event),
          outlined: "",
          autogrow: "",
          style: { "width": "95%" }
        }, null, 8, ["modelValue"])
      ])
    ], 512), [
      [vShow, $data.showCreateEventStepTwo]
    ])
  ], 64);
}
var CreateEvent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2c9379c4"], ["__file", "CreateEvent.vue"]]);
export { CreateEvent as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlRXZlbnQuMzg5MDM3OTguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9DcmVhdGVFdmVudC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiVG9wTGluZVwiPlxyXG4gICAgICA8cS1idG4gZmxhdCBzdHlsZSBAY2xpY2s9XCJiYWNrUGFnZVwiIGljb249XCJhcnJvd19iYWNrXCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDU1MFwiPtCU0LXRgtCw0LvRliDQv9C+0LTRltGXPC9kaXY+XHJcbiAgICAgIDxkaXYgdi1zaG93PVwic2hvd0NyZWF0ZUV2ZW50U3RlcE9uZVwiPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgOmRpc2FibGU9XCJpc05leHREaXNhYmxlZFwiXHJcbiAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICBzdHlsZVxyXG4gICAgICAgICAgQGNsaWNrPVwibmV4dFBhZ2VcIlxyXG4gICAgICAgICAgbGFiZWw9XCLQlNCw0LvRllwiXHJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtc2hvdz1cInNob3dDcmVhdGVFdmVudFN0ZXBUd29cIj5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGZsYXRcclxuICAgICAgICAgIHN0eWxlXHJcbiAgICAgICAgICBAY2xpY2s9XCJjcmVhdGVFdmVudFwiXHJcbiAgICAgICAgICBsYWJlbD1cItCh0YLQstC+0YDQuNGC0LhcIlxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgdi1zaG93PVwic2hvd0NyZWF0ZUV2ZW50U3RlcE9uZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRTdHlsZVwiPlxyXG4gICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICBzcXVhcmVcclxuICAgICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgICB2LW1vZGVsPVwibmFtZVwiXHJcbiAgICAgICAgICBsYWJlbD1cItCd0LDQt9Cy0LBcIlxyXG4gICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICA6cnVsZXM9XCJbXHJcbiAgICAgICAgICAgICh2YWwpID0+ICEhdmFsIHx8ICfQndC10L7QsdGF0ZbQtNC90L4g0LfQsNC/0L7QstC90LjRgtC4JyxcclxuICAgICAgICAgICAgKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoIDw9IDUwKSB8fCAn0J3QtSDQsdGW0LvRjNGI0LUgNTAg0YHQuNC80LLQvtC70ZbQsicsXHJcbiAgICAgICAgICAgICh2YWwpID0+XHJcbiAgICAgICAgICAgICAgKHZhbCAmJiAvXls/IUAoKeKEliwuOzphLXpBLVrQsC3Rj9CQLdCv0pHSkNGW0IbRl9CH0ZTQhDAtOVxcc10qJC91LnRlc3QodmFsKSkgfHxcclxuICAgICAgICAgICAgICAn0JzQvtC20LvQuNCy0ZYg0LvQuNGI0LUg0LvRltGC0LXRgNC4LCDRhtC40YTRgNC4INGC0LAg0YHQuNC80LLQvtC70LgnLFxyXG4gICAgICAgICAgXVwiXHJcbiAgICAgICAgPjwvcS1pbnB1dD5cclxuXHJcbiAgICAgICAgPFR5cGVTZWxlY3RvclxyXG4gICAgICAgICAgOnZhbHVlPVwidHlwZUlkXCJcclxuICAgICAgICAgIEBpbnB1dD1cIihpZCkgPT4gKHR5cGVJZCA9IGlkKVwiXHJcbiAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gISF2YWwgfHwgJ9Cd0LXQvtCx0YXRltC00L3QviDQt9Cw0L/QvtCy0L3QuNGC0LgnXVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1iLTNcIlxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJlZC03MDAgdGV4dC1zbVwiPlxyXG4gICAgICAgICAge3sgdmFsaWRhdGVUaW1lID09IHRydWUgPyBcIlwiIDogdmFsaWRhdGVUaW1lIH19XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxEYXRlVGltZUlucHV0XHJcbiAgICAgICAgICB2LXNob3c9XCJpc1R5cGVIaXN0b3JpYyA9PSBmYWxzZVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1iLTNcIlxyXG4gICAgICAgICAgbGFiZWw9XCLQp9Cw0YEg0L/QvtGH0LDRgtC60YNcIlxyXG4gICAgICAgICAgOnZhbHVlPVwic3RhcnRUaW1lID8/IG51bGxcIlxyXG4gICAgICAgICAgOm1pbj1cImlzVHlwZUhpc3RvcmljID8gJycgOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcIlxyXG4gICAgICAgICAgQGlucHV0PVwiKHYpID0+IChzdGFydFRpbWUgPSB2KVwiXHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPERhdGVUaW1lSW5wdXRcclxuICAgICAgICAgIHYtc2hvdz1cImlzVHlwZUhpc3RvcmljID09IGZhbHNlXCJcclxuICAgICAgICAgIGNsYXNzPVwibWItNlwiXHJcbiAgICAgICAgICBsYWJlbD1cItCn0LDRgSDQt9Cw0LrRltC90YfQtdC90L3Rj1wiXHJcbiAgICAgICAgICA6dmFsdWU9XCJlbmRUaW1lID8/IG51bGxcIlxyXG4gICAgICAgICAgOm1pbj1cInN0YXJ0VGltZSA/PyBudWxsXCJcclxuICAgICAgICAgIEBpbnB1dD1cIih2KSA9PiAoZW5kVGltZSA9IHYpXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDEwMCVcIj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIGZsYXRcclxuICAgICAgICAgICAgc3R5bGVcclxuICAgICAgICAgICAgdi1tb2RlbD1cInN0YXJ0VGltZVwiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiU3RhcnRUaW1lXCJcclxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xyXG4gICAgICAgICAgICAgICh2YWwpID0+ICEhdmFsIHx8ICfQndC10L7QsdGF0ZbQtNC90L4g0LfQsNC/0L7QstC90LjRgtC4JyxcclxuICAgICAgICAgICAgICAoKSA9PiB0aGlzLnZhbGlkYXRlVGltZSgpID09PSB0cnVlIHx8IHRoaXMudmFsaWRhdGVUaW1lKCksXHJcbiAgICAgICAgICAgIF1cIlxyXG4gICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XHJcbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZXZlbnRcIiBjbGFzcz1cImN1cnNvci1wb2ludGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8cS1wb3B1cC1wcm94eVxyXG4gICAgICAgICAgICAgICAgICBjb3ZlclxyXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLXNob3c9XCJzY2FsZVwiXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24taGlkZT1cInNjYWxlXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPHEtZGF0ZSB2LW1vZGVsPVwic3RhcnRUaW1lXCIgbWFzaz1cIllZWVktTU0tREQgSEg6bW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHEtYnRuIHYtY2xvc2UtcG9wdXAgbGFiZWw9XCJDbG9zZVwiIGNvbG9yPVwicHJpbWFyeVwiIGZsYXQgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9xLWRhdGU+XHJcbiAgICAgICAgICAgICAgICA8L3EtcG9wdXAtcHJveHk+XHJcbiAgICAgICAgICAgICAgPC9xLWljb24+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJhY2Nlc3NfdGltZVwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxxLXBvcHVwLXByb3h5XHJcbiAgICAgICAgICAgICAgICAgIGNvdmVyXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCJcclxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1oaWRlPVwic2NhbGVcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8cS10aW1lIHYtbW9kZWw9XCJzdGFydFRpbWVcIiBtYXNrPVwiWVlZWS1NTS1ERCBISDptbVwiIGZvcm1hdDI0aD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHEtYnRuIHYtY2xvc2UtcG9wdXAgbGFiZWw9XCJDbG9zZVwiIGNvbG9yPVwicHJpbWFyeVwiIGZsYXQgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9xLXRpbWU+XHJcbiAgICAgICAgICAgICAgICA8L3EtcG9wdXAtcHJveHk+XHJcbiAgICAgICAgICAgICAgPC9xLWljb24+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDEwMCVcIj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIGZsYXRcclxuICAgICAgICAgICAgc3R5bGVcclxuICAgICAgICAgICAgdi1tb2RlbD1cImVuZFRpbWVcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIkVuZFRpbWVcIlxyXG4gICAgICAgICAgICA6cnVsZXM9XCJbXHJcbiAgICAgICAgICAgICAgKHZhbCkgPT4gISF2YWwgfHwgJ9Cd0LXQvtCx0YXRltC00L3QviDQt9Cw0L/QvtCy0L3QuNGC0LgnLFxyXG4gICAgICAgICAgICAgICgpID0+IHRoaXMudmFsaWRhdGVUaW1lKCkgPT09IHRydWUgfHwgdGhpcy52YWxpZGF0ZVRpbWUoKSxcclxuICAgICAgICAgICAgXVwiXHJcbiAgICAgICAgICAgIHJlYWRvbmx5XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cclxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJldmVudFwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxxLXBvcHVwLXByb3h5XHJcbiAgICAgICAgICAgICAgICAgIGNvdmVyXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCJcclxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1oaWRlPVwic2NhbGVcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8cS1kYXRlIHYtbW9kZWw9XCJlbmRUaW1lXCIgbWFzaz1cIllZWVktTU0tREQgSEg6bW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHEtYnRuIHYtY2xvc2UtcG9wdXAgbGFiZWw9XCJDbG9zZVwiIGNvbG9yPVwicHJpbWFyeVwiIGZsYXQgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9xLWRhdGU+XHJcbiAgICAgICAgICAgICAgICA8L3EtcG9wdXAtcHJveHk+XHJcbiAgICAgICAgICAgICAgPC9xLWljb24+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJhY2Nlc3NfdGltZVwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxxLXBvcHVwLXByb3h5XHJcbiAgICAgICAgICAgICAgICAgIGNvdmVyXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCJcclxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1oaWRlPVwic2NhbGVcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8cS10aW1lIHYtbW9kZWw9XCJlbmRUaW1lXCIgbWFzaz1cIllZWVktTU0tREQgSEg6bW1cIiBmb3JtYXQyNGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0biB2LWNsb3NlLXBvcHVwIGxhYmVsPVwiQ2xvc2VcIiBjb2xvcj1cInByaW1hcnlcIiBmbGF0IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvcS10aW1lPlxyXG4gICAgICAgICAgICAgICAgPC9xLXBvcHVwLXByb3h5PlxyXG4gICAgICAgICAgICAgIDwvcS1pY29uPlxyXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgICAgPC9xLWlucHV0PlxyXG4gICAgICAgIDwvZGl2PiAtLT5cclxuXHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHNxdWFyZVxyXG4gICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgIHYtbW9kZWw9XCJhZGRyZXNzXCJcclxuICAgICAgICAgIGxhYmVsPVwi0JvQvtC60LDRhtGW0Y9cIlxyXG4gICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gISF2YWwgfHwgJ9Cd0LXQvtCx0YXRltC00L3QviDQt9Cw0L/QvtCy0L3QuNGC0LgnXVwiXHJcbiAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgID48L3EtaW5wdXQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGlkPVwibWFwMlwiIGNsYXNzPVwibWFwXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiB2LXNob3c9XCJzaG93Q3JlYXRlRXZlbnRTdGVwVHdvXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlclwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOyBtYXJnaW46IDEwcHhcIj5cclxuICAgICAgICDQmtCw0YDRgtC40L3QutCwINCy0LDRiNC+0Zcg0L/QvtC00ZbRl1xyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHEtZmlsZVxyXG4gICAgICAgIHYtbW9kZWw9XCJmaWxlc1wiXHJcbiAgICAgICAgbGFiZWw9XCLQktC40LHRgNCw0YLQuCDQutCw0YDRgtC40L3QutGDXCJcclxuICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgIG11bHRpcGxlXHJcbiAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDMwMHB4XCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDUwMDsgbWFyZ2luOiAxMHB4XCI+XHJcbiAgICAgICAg0J7Qv9C40YEg0LLQsNGI0L7RlyDQv9C+0LTRltGXICjQtNC+0LTQsNGC0LrQvtCy0L4pXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiZGVzY3JpcHRpb25cIiBvdXRsaW5lZCBhdXRvZ3JvdyBzdHlsZT1cIndpZHRoOiA5NSVcIiAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uVG9wTGluZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi5pbnB1dFN0eWxlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IGF1dG87XHJcbiAgbWF4LXdpZHRoOiA5NSU7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG59XHJcbi5tYXAge1xyXG4gIHotaW5kZXg6IDE7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuPC9zdHlsZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBUeXBlU2VsZWN0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvVHlwZVNlbGVjdG9yLnZ1ZVwiO1xyXG5pbXBvcnQgTCBmcm9tIFwibGVhZmxldFwiO1xyXG5pbXBvcnQgeyBnZXRUaW1lUGx1c0ZpZnRlZW5NaW51dGVzIH0gZnJvbSBcIi4uL2NvbnZlcnREYXRlXCI7XHJcbmltcG9ydCBEYXRlVGltZUlucHV0IGZyb20gXCJzcmMvY29tcG9uZW50cy9EYXRlVGltZUlucHV0LnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiQ3JlYXRlRXZlbnRcIixcclxuICBjb21wb25lbnRzOiB7IFR5cGVTZWxlY3RvciwgRGF0ZVRpbWVJbnB1dCB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gbm93LnRvSVNPU3RyaW5nKCk7XHJcbiAgICBjb25zdCBjb21wdXRlZFRpbWUgPSBnZXRUaW1lUGx1c0ZpZnRlZW5NaW51dGVzKGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICB0eXBlSWQ6IG51bGwsXHJcbiAgICAgIHN0YXJ0VGltZTogY3VycmVudFRpbWUsXHJcbiAgICAgIGVuZFRpbWU6IGNvbXB1dGVkVGltZSxcclxuICAgICAgYWRkcmVzczogXCI1MC40NDU0LCAzMC41NjM1XCIsXHJcbiAgICAgIHBpY3R1cmU6IFwiXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICBzaG93Q3JlYXRlRXZlbnRTdGVwT25lOiB0cnVlLFxyXG4gICAgICBzaG93Q3JlYXRlRXZlbnRTdGVwVHdvOiBmYWxzZSxcclxuICAgICAgbWFwOiBudWxsLFxyXG4gICAgICBmaWxlczogW10sXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB0eXBlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRMZWFmVHlwZXMuZmluZCgodCkgPT4gdC5pZCA9PSB0aGlzLnR5cGVJZCk7XHJcbiAgICB9LFxyXG4gICAgaXNUeXBlSGlzdG9yaWMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnR5cGUgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy50eXBlLm1heER1cmF0aW9uID09IG51bGw7XHJcbiAgICB9LFxyXG4gICAgaXNOZXh0RGlzYWJsZWQoKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZVRpbWU7XHJcblxyXG4gICAgICByZXR1cm4gIShcclxuICAgICAgICB0aGlzLm5hbWUgJiZcclxuICAgICAgICB0aGlzLm5hbWUubGVuZ3RoIDw9IDUwICYmXHJcbiAgICAgICAgL15bPyFAKCnihJYsLjs6YS16QS1a0LAt0Y/QkC3Qr9KR0pDRltCG0ZfQh9GU0IQwLTlcXHNdKiQvdS50ZXN0KHRoaXMubmFtZSkgJiZcclxuICAgICAgICB0aGlzLnR5cGVJZCAmJlxyXG4gICAgICAgIHRpbWVWYWxpZGF0aW9uID09PSB0cnVlICYmXHJcbiAgICAgICAgdGhpcy5hZGRyZXNzXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgdmFsaWRhdGVUaW1lKCkge1xyXG4gICAgICBpZiAodGhpcy5pc1R5cGVIaXN0b3JpYyA9PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5lbmRUaW1lIHx8ICF0aGlzLnN0YXJ0VGltZSkge1xyXG4gICAgICAgIHJldHVybiBcItCe0LHQtdGA0ZbRgtGMINGH0LDRgVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbWF4SG91cnMgPSB0aGlzLnR5cGU/Lm1heER1cmF0aW9uID8/IDEwO1xyXG4gICAgICBsZXQgZGlmZiA9XHJcbiAgICAgICAgTWF0aC5hYnMobmV3IERhdGUodGhpcy5lbmRUaW1lKSAtIG5ldyBEYXRlKHRoaXMuc3RhcnRUaW1lKSkgLyAzNmU1O1xyXG5cclxuICAgICAgaWYgKGRpZmYgPiBtYXhIb3Vycykge1xyXG4gICAgICAgIHJldHVybiBcItCi0YDQuNCy0LDQu9GW0YHRgtGMINC/0L7QtNGW0Zcg0LfQsNC90LDQtNGC0L4g0LLQtdC70LjQutCwINC00LvRjyDQvtCx0YDQsNC90L7Qs9C+INGC0LjQv9GDLlwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkaWZmICogNjAgPCAxNSkge1xyXG4gICAgICAgIHJldHVybiBcItCi0YDQuNCy0LDQu9GW0YHRgtGMINC/0L7QtNGW0Zcg0LfQsNC90LDQtNGC0L4g0LrQvtGA0L7RgtC60LAuXCI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMuc2hvd01hcCgpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYmFja1BhZ2UoKSB7XHJcbiAgICAgIGlmICh0aGlzLnNob3dDcmVhdGVFdmVudFN0ZXBPbmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuJHJvdXRlci5nbygtMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG93Q3JlYXRlRXZlbnRTdGVwVHdvID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnNob3dDcmVhdGVFdmVudFN0ZXBUd28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dDcmVhdGVFdmVudFN0ZXBPbmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG5leHRQYWdlKCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNOZXh0RGlzYWJsZWQpIHtcclxuICAgICAgICB0aGlzLnNob3dDcmVhdGVFdmVudFN0ZXBPbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dDcmVhdGVFdmVudFN0ZXBUd28gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnZlcnRGaWxlVG9EYXRhVXJsKGZpbGUpIHtcclxuICAgICAgaWYgKGZpbGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4gcmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KGUpO1xyXG4gICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgY3JlYXRlRXZlbnQoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzVHlwZUhpc3RvcmljID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIlBPU1RfRVZFTlRcIiwge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICB0eXBlSWQ6IHRoaXMudHlwZUlkLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuc3RhcnRUaW1lLFxyXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5lbmRUaW1lLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuYWRkcmVzcyxcclxuICAgICAgICAgIGRhdGFVcmw6IGF3YWl0IHRoaXMuY29udmVydEZpbGVUb0RhdGFVcmwodGhpcy5maWxlc1swXSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVyOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9FVkVOVFNcIik7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwiZXZlbnRzLWxpc3RcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZXJFcnJvcjogKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgICAgYWxlcnQoXCJFcnJvciBvY2N1cnJlZDogXCIgKyBlcnJvcnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNob3dNYXAoKSB7XHJcbiAgICAgIHRoaXMubWFwID0gTC5tYXAoXCJtYXAyXCIpLnNldFZpZXcoWzUwLjQ0LCAzMC41Nl0sIDEzKTtcclxuICAgICAgTC50aWxlTGF5ZXIoXCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiLCB7XHJcbiAgICAgICAgbWF4Wm9vbTogMTksXHJcbiAgICAgIH0pLmFkZFRvKHRoaXMubWFwKTtcclxuICAgICAgbGV0IG1hcmtlciA9IG51bGw7XHJcbiAgICAgIHRoaXMubWFwLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGF0bG5nID0gZXZlbnQubGF0bG5nO1xyXG4gICAgICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcmtlciA9IEwubWFya2VyKGxhdGxuZykuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGAke2xhdGxuZy5sYXR9LCAke2xhdGxuZy5sbmd9YDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIHN0YXJ0VGltZSh2YWwpIHtcclxuICAgICAgaWYgKHRoaXMuZW5kVGltZSAhPSBudWxsICYmIHZhbCA+IHRoaXMuZW5kVGltZSkge1xyXG4gICAgICAgIGxldCBlbmQgPSBnZXRUaW1lUGx1c0ZpZnRlZW5NaW51dGVzKHZhbCk7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gZW5kO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZW5kVGltZSh2YWwpIHtcclxuICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCA8PSB0aGlzLnN0YXJ0VGltZSkge1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0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
