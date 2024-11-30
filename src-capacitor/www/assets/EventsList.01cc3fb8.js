import { Q as QSpinner } from "./QBtn.a363fc1a.js";
import { E as EventFilters, T as TopPanel, Q as QDrawer } from "./TopPanel.c741dfaf.js";
import { _ as _export_sfc, J as mapGetters, K as resolveComponent, L as openBlock, Y as createElementBlock, j as createVNode, O as createBaseVNode, F as Fragment, Z as renderList, N as withCtx, $ as createTextVNode, a0 as toDisplayString } from "./index.6764d851.js";
import { E as EventIcon } from "./EventIcon.e157b631.js";
import "./uid.627d4ed7.js";
import "./QMenu.9dd1c774.js";
import "./scroll.a3a49254.js";
import "./volleyball.ce4c2a1e.js";
import "./format.3e32b8d9.js";
import "./convertDate.2fe32ce1.js";
import "./leaflet-src.ffd70e66.js";
var EventsList_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  components: {
    EventFilters,
    TopPanel,
    EventIcon
  },
  data() {
    return {
      isSearchActive: false,
      showFilters: false,
      searchName: ""
    };
  },
  computed: {
    ...mapGetters({
      events: "getEvents",
      eventsStatus: "getEventsStatus"
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
    await this.getEvents();
  },
  methods: {
    toggleSearch() {
      this.isSearchActive = !this.isSearchActive;
      if (this.isSearchActive) {
        this.$nextTick(() => {
          this.$el.querySelector(".search-input").focus();
        });
      }
    },
    async getEvents() {
      await Promise.all([
        this.events.length < 1 ? this.$store.dispatch("GET_EVENTS") : void 0
      ]);
    },
    async update(filters) {
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          filters: {
            ...filters
          },
          searchName: this.searchName
        })
      ]);
      this.showFilters = false;
    },
    async search(text) {
      this.searchName = text;
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          searchName: this.searchName
        })
      ]);
    }
  }
};
const _hoisted_1 = { class: "" };
const _hoisted_2 = {
  key: 0,
  class: "status"
};
const _hoisted_3 = {
  key: 1,
  class: "status"
};
const _hoisted_4 = { class: "flex mt-3" };
const _hoisted_5 = { class: "text-gray-500 ml-auto h-fit" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "inline-block" }, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_top_panel = resolveComponent("top-panel");
  const _component_router_link = resolveComponent("router-link");
  const _component_EventIcon = resolveComponent("EventIcon");
  const _component_EventFilters = resolveComponent("EventFilters");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_top_panel, {
      class: "sticky top-0 left-0 z-10",
      onShowFilters: _cache[0] || (_cache[0] = ($event) => $data.showFilters = !$data.showFilters),
      searchText: $data.searchName,
      onUpdateText: _cache[1] || (_cache[1] = (text) => $options.search(text))
    }, null, 8, ["searchText"]),
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_1, [
        _ctx.eventsStatus == "loading" ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(QSpinner, {
            color: "primary",
            size: "3em",
            class: "mx-auto"
          })
        ])) : _ctx.eventsStatus == "error" ? (openBlock(), createElementBlock("div", _hoisted_3, " \u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A - \u043F\u0435\u0432\u043D\u043E, \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0438 \u0437\u0456 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C. ")) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(_ctx.events, (event, index) => {
          var _a;
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "event-item relative"
          }, [
            createVNode(_component_router_link, {
              class: "",
              to: "/event-page?id=" + event.id
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(event.name), 1)
              ]),
              _: 2
            }, 1032, ["to"]),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_EventIcon, {
                  class: "inline-block w-5",
                  icon: (_a = event.type) == null ? void 0 : _a.typeIcon
                }, null, 8, ["icon"]),
                _hoisted_6,
                createTextVNode(" " + toDisplayString(event.type.typeName), 1)
              ])
            ])
          ]);
        }), 128))
      ])
    ]),
    createVNode(QDrawer, {
      modelValue: $data.showFilters,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.showFilters = $event),
      side: "left",
      class: "w-fit"
    }, {
      default: withCtx(() => [
        createVNode(_component_EventFilters, {
          class: "p-3 h-full",
          onClose: _cache[2] || (_cache[2] = ($event) => $data.showFilters = false),
          onUpdate: _cache[3] || (_cache[3] = (f) => $options.update(f))
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
var EventsList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "EventsList.vue"]]);
export { EventsList as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRzTGlzdC4wMWNjM2ZiOC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL0V2ZW50c0xpc3QudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8dG9wLXBhbmVsXHJcbiAgICBjbGFzcz1cInN0aWNreSB0b3AtMCBsZWZ0LTAgei0xMFwiXHJcbiAgICBAc2hvd0ZpbHRlcnM9XCJzaG93RmlsdGVycyA9ICFzaG93RmlsdGVyc1wiXHJcbiAgICA6c2VhcmNoVGV4dD1cInNlYXJjaE5hbWVcIlxyXG4gICAgQHVwZGF0ZVRleHQ9XCIodGV4dCkgPT4gc2VhcmNoKHRleHQpXCJcclxuICA+XHJcbiAgPC90b3AtcGFuZWw+XHJcblxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiXCI+XHJcbiAgICAgIDxkaXYgdi1pZj1cImV2ZW50c1N0YXR1cyA9PSAnbG9hZGluZydcIiBjbGFzcz1cInN0YXR1c1wiPlxyXG4gICAgICAgIDxxLXNwaW5uZXIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjNlbVwiIGNsYXNzPVwibXgtYXV0b1wiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cImV2ZW50c1N0YXR1cyA9PSAnZXJyb3InXCIgY2xhc3M9XCJzdGF0dXNcIj5cclxuICAgICAgICDQqdC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6IC0g0L/QtdCy0L3Qviwg0L/RgNC+0LHQu9C10LzQuCDQt9GWINC3J9GU0LTQvdCw0L3QvdGP0LwuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHYtZWxzZVxyXG4gICAgICAgIHYtZm9yPVwiKGV2ZW50LCBpbmRleCkgaW4gZXZlbnRzXCJcclxuICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICAgIGNsYXNzPVwiZXZlbnQtaXRlbSByZWxhdGl2ZVwiXHJcbiAgICAgID5cclxuICAgICAgICA8cm91dGVyLWxpbmsgY2xhc3M9XCJcIiA6dG89XCInL2V2ZW50LXBhZ2U/aWQ9JyArIGV2ZW50LmlkXCI+e3tcclxuICAgICAgICAgIGV2ZW50Lm5hbWVcclxuICAgICAgICB9fTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggbXQtM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JheS01MDAgbWwtYXV0byBoLWZpdFwiPlxyXG4gICAgICAgICAgICA8RXZlbnRJY29uIGNsYXNzPVwiaW5saW5lLWJsb2NrIHctNVwiIDppY29uPVwiZXZlbnQudHlwZT8udHlwZUljb25cIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLWJsb2NrXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIHt7IGV2ZW50LnR5cGUudHlwZU5hbWUgfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8cS1kcmF3ZXIgdi1tb2RlbD1cInNob3dGaWx0ZXJzXCIgc2lkZT1cImxlZnRcIiBjbGFzcz1cInctZml0XCI+XHJcbiAgICA8RXZlbnRGaWx0ZXJzXHJcbiAgICAgIGNsYXNzPVwicC0zIGgtZnVsbFwiXHJcbiAgICAgIEBjbG9zZT1cInNob3dGaWx0ZXJzID0gZmFsc2VcIlxyXG4gICAgICBAdXBkYXRlPVwiKGYpID0+IHVwZGF0ZShmKVwiXHJcbiAgICAvPlxyXG4gIDwvcS1kcmF3ZXI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IEV2ZW50RmlsdGVycyBmcm9tIFwic3JjL2NvbXBvbmVudHMvRmlsdGVyc1BhbmVsLnZ1ZVwiO1xyXG5pbXBvcnQgVG9wUGFuZWwgZnJvbSBcInNyYy9jb21wb25lbnRzL1RvcFBhbmVsLnZ1ZVwiO1xyXG5pbXBvcnQgRXZlbnRJY29uIGZyb20gXCJzcmMvY29tcG9uZW50cy9FdmVudEljb24udnVlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBFdmVudEZpbHRlcnMsXHJcbiAgICBUb3BQYW5lbCxcclxuICAgIEV2ZW50SWNvbixcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpc1NlYXJjaEFjdGl2ZTogZmFsc2UsXHJcbiAgICAgIHNob3dGaWx0ZXJzOiBmYWxzZSxcclxuICAgICAgc2VhcmNoTmFtZTogXCJcIixcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwR2V0dGVycyh7XHJcbiAgICAgIGV2ZW50czogXCJnZXRFdmVudHNcIixcclxuICAgICAgZXZlbnRzU3RhdHVzOiBcImdldEV2ZW50c1N0YXR1c1wiLFxyXG4gICAgfSksXHJcbiAgICBzZWFyY2hJbnB1dENsYXNzZXMoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgXCJoaWRkZW4gbWQ6IWJsb2NrIGxnOiFibG9ja1wiOiAhdGhpcy5pc1NlYXJjaEFjdGl2ZSwgLy8g0JrQvtC70Lgg0L/QvtGI0YPQuiDQvdC1INCw0LrRgtC40LLQvdC40LksINCy0LjQutC+0YDQuNGB0YLQvtCy0YPQudGC0LUgJ2hpZGRlbidcclxuICAgICAgICBcIm1kOmJsb2NrXCI6IHRoaXMuaXNTZWFyY2hBY3RpdmUsIC8vINCa0L7Qu9C4INC/0L7RiNGD0Log0LDQutGC0LjQstC90LjQuSwg0L/QvtC60LDQt9Cw0YLQuCDQvdCwINGB0LXRgNC10LTQvdGW0YUg0LXQutGA0LDQvdCw0YVcclxuICAgICAgICBcImxnOmJsb2NrXCI6IHRoaXMuaXNTZWFyY2hBY3RpdmUsIC8vINCa0L7Qu9C4INC/0L7RiNGD0Log0LDQutGC0LjQstC90LjQuSwg0L/QvtC60LDQt9Cw0YLQuCDQvdCwINCy0LXQu9C40LrQuNGFINC10LrRgNCw0L3QsNGFXHJcbiAgICAgICAgXCJzbTpibG9ja1wiOiB0aGlzLmlzU2VhcmNoQWN0aXZlLFxyXG4gICAgICAgIFwic2VhcmNoLWlucHV0XCI6IHRydWUsIC8vINCX0LDQstC20LTQuCDQstC40LrQvtGA0LjRgdGC0L7QstGD0LnRgtC1INGG0LXQuSDQutC70LDRgSDQtNC70Y8g0YHRgtC40LvRltCyXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGF3YWl0IHRoaXMuZ2V0RXZlbnRzKCk7XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgdG9nZ2xlU2VhcmNoKCkge1xyXG4gICAgICB0aGlzLmlzU2VhcmNoQWN0aXZlID0gIXRoaXMuaXNTZWFyY2hBY3RpdmU7XHJcbiAgICAgIGlmICh0aGlzLmlzU2VhcmNoQWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZWwucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXRcIikuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEV2ZW50cygpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLmxlbmd0aCA8IDEgPyB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9FVkVOVFNcIikgOiB1bmRlZmluZWQsXHJcbiAgICAgIF0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHVwZGF0ZShmaWx0ZXJzKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIkdFVF9FVkVOVFNcIiwge1xyXG4gICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAuLi5maWx0ZXJzLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNlYXJjaE5hbWU6IHRoaXMuc2VhcmNoTmFtZSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSk7XHJcbiAgICAgIHRoaXMuc2hvd0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZWFyY2godGV4dCkge1xyXG4gICAgICB0aGlzLnNlYXJjaE5hbWUgPSB0ZXh0O1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfRVZFTlRTXCIsIHtcclxuICAgICAgICAgIHNlYXJjaE5hbWU6IHRoaXMuc2VhcmNoTmFtZSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG4uZXZlbnQtaXRlbSB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBwYWRkaW5nOiAxNnB4IDE2cHggOHB4IDE2cHg7XHJcbiAgbWF4LXdpZHRoOiA4MCU7XHJcbiAgbWFyZ2luOiAxMnB4IGF1dG87XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4uZXZlbnQtaXRlbTpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5ldmVudC1pdGVtIGEge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogIzMzMztcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLmV2ZW50LWl0ZW0gYTpob3ZlciB7XHJcbiAgY29sb3I6ICMwMDdiZmY7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQW9EQSxNQUFLLFlBQVU7QUFBQSxFQUNiLFlBQVk7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNEO0FBQUEsRUFDRCxPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBO0VBRWY7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLEdBQUcsV0FBVztBQUFBLE1BQ1osUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxJQUNELHFCQUFxQjtBQUNuQixhQUFPO0FBQUEsUUFDTCw4QkFBOEIsQ0FBQyxLQUFLO0FBQUEsUUFDcEMsWUFBWSxLQUFLO0FBQUEsUUFDakIsWUFBWSxLQUFLO0FBQUEsUUFDakIsWUFBWSxLQUFLO0FBQUEsUUFDakIsZ0JBQWdCO0FBQUE7SUFFbkI7QUFBQSxFQUNGO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLEtBQUs7RUFDWjtBQUFBLEVBRUQsU0FBUztBQUFBLElBQ1AsZUFBZTtBQUNiLFdBQUssaUJBQWlCLENBQUMsS0FBSztBQUM1QixVQUFJLEtBQUssZ0JBQWdCO0FBQ3ZCLGFBQUssVUFBVSxNQUFNO0FBQ25CLGVBQUssSUFBSSxjQUFjLGVBQWUsRUFBRSxNQUFLO0FBQUEsUUFDL0MsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNEO0FBQUEsSUFDRCxNQUFNLFlBQVk7QUFDaEIsWUFBTSxRQUFRLElBQUk7QUFBQSxRQUNoQixLQUFLLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxTQUFTLFlBQVksSUFBSTtBQUFBLE1BQ2hFLENBQUM7QUFBQSxJQUNGO0FBQUEsSUFDRCxNQUFNLE9BQU8sU0FBUztBQUNwQixZQUFNLFFBQVEsSUFBSTtBQUFBLFFBQ2hC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
