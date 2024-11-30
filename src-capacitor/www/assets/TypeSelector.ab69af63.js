import { d as QInput } from "./QBtn.a363fc1a.js";
import { _ as _export_sfc, K as resolveComponent, L as openBlock, Y as createElementBlock, O as createBaseVNode, $ as createTextVNode, a0 as toDisplayString, j as createVNode, P as createCommentVNode, a9 as withModifiers, F as Fragment, Z as renderList, v as withDirectives, aa as vShow, M as createBlock, ab as useCssVars, J as mapGetters } from "./index.6764d851.js";
import { Q as QIcon } from "./uid.627d4ed7.js";
import { E as EventIcon } from "./EventIcon.e157b631.js";
var TypeOption_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__ = {
  components: { EventIcon },
  name: "TypeOption",
  props: {
    type: { type: Object, default: void 0 },
    toroot: { type: Number, default: 1 },
    parentShowKids: { type: Boolean, default: false }
  },
  computed: {
    leftPadding() {
      return this.toroot * 8 + "px";
    }
  },
  data() {
    return {
      showKids: false,
      localType: this.type
    };
  },
  methods: {
    input(id) {
      this.$emit("input", id);
    },
    handleClick() {
      var _a;
      if (((_a = this.localType.children) == null ? void 0 : _a.length) === 0) {
        console.log(this.localType);
        this.input(this.localType.id);
      } else {
        console.log(this.localType);
        this.showKids = !this.showKids;
      }
    }
  },
  watch: {
    parentShowKids(val) {
      if (val == false) {
        this.showKids = false;
      }
    }
  }
};
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "49abcd34": _ctx.leftPadding
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main$1 = __default__;
const _hoisted_1$1 = {
  key: 0,
  class: "h-3 w-3 ml-2 inline-block"
};
const _hoisted_2$1 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_EventIcon = resolveComponent("EventIcon");
  const _component_TypeOption = resolveComponent("TypeOption", true);
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", {
      class: "typeOption hover:bg-slate-100 addPadding",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.handleClick && $options.handleClick(...args), ["stop"]))
    }, [
      createTextVNode(toDisplayString($data.localType.name) + " ", 1),
      $data.localType.imageURL ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_component_EventIcon, {
          icon: $data.localType.imageURL
        }, null, 8, ["icon"])
      ])) : createCommentVNode("", true),
      ((_a = $data.localType.children) == null ? void 0 : _a.length) !== 0 ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
        createVNode(QIcon, { name: "expand_more" })
      ])) : createCommentVNode("", true)
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.localType.children, (t, index) => {
      return withDirectives((openBlock(), createElementBlock("div", { key: index }, [
        createVNode(_component_TypeOption, {
          type: t,
          toroot: $props.toroot + 1,
          onInput: _cache[1] || (_cache[1] = (id) => $options.input(id)),
          parentShowKids: $data.showKids
        }, null, 8, ["type", "toroot", "parentShowKids"]),
        index == $data.localType.children.length - 1 ? (openBlock(), createBlock(_component_TypeOption, {
          key: 0,
          type: { id: $data.localType.id, name: "\u0406\u043D\u0448\u0435", children: [] },
          toroot: $props.toroot + 1,
          onInput: _cache[2] || (_cache[2] = (id) => $options.input($data.localType.id)),
          parentShowKids: $data.showKids
        }, null, 8, ["type", "toroot", "parentShowKids"])) : createCommentVNode("", true)
      ])), [
        [vShow, $data.showKids]
      ]);
    }), 128))
  ]);
}
var TypeOption = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-7c93f482"], ["__file", "TypeOption.vue"]]);
var TypeSelector_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  components: { TypeOption },
  name: "TypeSelector",
  props: {
    value: { type: Number, default: void 0 },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      types: "getEventTypesTree",
      typesStatus: "getEventTypesStatus",
      leafTypes: "getLeafTypes"
    }),
    type() {
      return this.leafTypes.find((x) => x.id == this.value);
    }
  },
  data() {
    return {
      showKids: false
    };
  },
  async mounted() {
    await this.getTypes();
  },
  methods: {
    async getTypes() {
      await Promise.all([
        this.types.length < 1 ? this.$store.dispatch("GET_EVENT_TYPES_TREE") : void 0
      ]);
    },
    input(id) {
      this.showKids = false;
      this.$emit("input", id);
    },
    getLabel() {
      if (this.typesStatus == "loading") {
        return "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...";
      } else if (this.typesStatus == "error") {
        return "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0442\u0438\u043F\u0438";
      }
      if (this.value > 0 && this.type === void 0) {
        return "\u0406\u043D\u0448\u0435";
      }
      return this.type == null ? "\u0412\u0438\u0431\u0456\u0440 \u0442\u0438\u043F\u0443" : this.type.name;
    }
  }
};
const _hoisted_1 = { class: "relative w-full" };
const _hoisted_2 = { class: "absolute w-full top-0 left-0 w-100 border border-gray-400 bg-white z-50" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TypeOption = resolveComponent("TypeOption");
  return openBlock(), createElementBlock("div", {
    onFocusin: _cache[1] || (_cache[1] = ($event) => $data.showKids = !$data.showKids),
    onFocusout: _cache[2] || (_cache[2] = ($event) => $data.showKids = false),
    tabindex: "0"
  }, [
    createBaseVNode("div", null, [
      createVNode(QInput, {
        tabindex: $props.tabindex,
        class: "!pb-0",
        square: "",
        outlined: "",
        label: $options.getLabel(),
        readonly: "",
        rules: [(val) => !!val || "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"]
      }, null, 8, ["tabindex", "label", "rules"])
    ]),
    withDirectives(createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.types, (e, index) => {
          return openBlock(), createElementBlock("div", { key: index }, [
            createVNode(_component_TypeOption, {
              type: e,
              onInput: _cache[0] || (_cache[0] = (id) => $options.input(id)),
              parentShowKids: this.showKids
            }, null, 8, ["type", "parentShowKids"])
          ]);
        }), 128))
      ])
    ], 512), [
      [vShow, $data.showKids]
    ])
  ], 32);
}
var TypeSelector = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "TypeSelector.vue"]]);
export { TypeSelector as T };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZVNlbGVjdG9yLmFiNjlhZjYzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9UeXBlT3B0aW9uLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1R5cGVTZWxlY3Rvci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwidHlwZU9wdGlvbiBob3ZlcjpiZy1zbGF0ZS0xMDAgYWRkUGFkZGluZ1wiXHJcbiAgICAgIEBjbGljay5zdG9wPVwiaGFuZGxlQ2xpY2tcIlxyXG4gICAgPlxyXG4gICAgICB7eyBsb2NhbFR5cGUubmFtZSB9fVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaC0zIHctMyBtbC0yIGlubGluZS1ibG9ja1wiIHYtaWY9XCJsb2NhbFR5cGUuaW1hZ2VVUkxcIj5cclxuICAgICAgICA8RXZlbnRJY29uIDppY29uPVwibG9jYWxUeXBlLmltYWdlVVJMXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxzcGFuIHYtaWY9XCJsb2NhbFR5cGUuY2hpbGRyZW4/Lmxlbmd0aCAhPT0gMFwiPlxyXG4gICAgICAgIDxxLWljb24gbmFtZT1cImV4cGFuZF9tb3JlXCIgLz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdlxyXG4gICAgICB2LXNob3c9XCJzaG93S2lkc1wiXHJcbiAgICAgIHYtZm9yPVwiKHQsIGluZGV4KSBpbiBsb2NhbFR5cGUuY2hpbGRyZW5cIlxyXG4gICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgPlxyXG4gICAgICA8VHlwZU9wdGlvblxyXG4gICAgICAgIDp0eXBlPVwidFwiXHJcbiAgICAgICAgOnRvcm9vdD1cInRvcm9vdCArIDFcIlxyXG4gICAgICAgIEBpbnB1dD1cIihpZCkgPT4gaW5wdXQoaWQpXCJcclxuICAgICAgICA6cGFyZW50U2hvd0tpZHM9XCJzaG93S2lkc1wiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxUeXBlT3B0aW9uXHJcbiAgICAgICAgdi1pZj1cImluZGV4ID09IGxvY2FsVHlwZS5jaGlsZHJlbi5sZW5ndGggLSAxXCJcclxuICAgICAgICA6dHlwZT1cInsgaWQ6IGxvY2FsVHlwZS5pZCwgbmFtZTogJ9CG0L3RiNC1JywgY2hpbGRyZW46IFtdIH1cIlxyXG4gICAgICAgIDp0b3Jvb3Q9XCJ0b3Jvb3QgKyAxXCJcclxuICAgICAgICBAaW5wdXQ9XCIoaWQpID0+IGlucHV0KGxvY2FsVHlwZS5pZClcIlxyXG4gICAgICAgIDpwYXJlbnRTaG93S2lkcz1cInNob3dLaWRzXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgRXZlbnRJY29uIGZyb20gXCIuL0V2ZW50SWNvbi52dWVcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHsgRXZlbnRJY29uIH0sXHJcbiAgbmFtZTogXCJUeXBlT3B0aW9uXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIHR5cGU6IHsgdHlwZTogT2JqZWN0LCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcclxuICAgIHRvcm9vdDogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDEgfSxcclxuICAgIHBhcmVudFNob3dLaWRzOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgbGVmdFBhZGRpbmcoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvcm9vdCAqIDggKyBcInB4XCI7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dLaWRzOiBmYWxzZSxcclxuICAgICAgbG9jYWxUeXBlOiB0aGlzLnR5cGUsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgaW5wdXQoaWQpIHtcclxuICAgICAgdGhpcy4kZW1pdChcImlucHV0XCIsIGlkKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2xpY2soKSB7XHJcbiAgICAgIGlmICh0aGlzLmxvY2FsVHlwZS5jaGlsZHJlbj8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5sb2NhbFR5cGUpO1xyXG4gICAgICAgIHRoaXMuaW5wdXQodGhpcy5sb2NhbFR5cGUuaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9jYWxUeXBlKTtcclxuICAgICAgICB0aGlzLnNob3dLaWRzID0gIXRoaXMuc2hvd0tpZHM7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICB3YXRjaDoge1xyXG4gICAgcGFyZW50U2hvd0tpZHModmFsKSB7XHJcbiAgICAgIGlmICh2YWwgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnNob3dLaWRzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5hZGRQYWRkaW5nIHtcclxuICBwYWRkaW5nLWxlZnQ6IHYtYmluZChcImxlZnRQYWRkaW5nXCIpO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2XHJcbiAgICBAZm9jdXNpbj1cInNob3dLaWRzID0gIXNob3dLaWRzXCJcclxuICAgIEBmb2N1c291dD1cInNob3dLaWRzID0gZmFsc2VcIlxyXG4gICAgdGFiaW5kZXg9XCIwXCJcclxuICA+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cS1pbnB1dFxyXG4gICAgICAgIDp0YWJpbmRleD1cInRhYmluZGV4XCJcclxuICAgICAgICBjbGFzcz1cIiFwYi0wXCJcclxuICAgICAgICBzcXVhcmVcclxuICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgIDpsYWJlbD1cImdldExhYmVsKClcIlxyXG4gICAgICAgIHJlYWRvbmx5XHJcbiAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICEhdmFsIHx8ICfQndC10L7QsdGF0ZbQtNC90L4g0LfQsNC/0L7QstC90LjRgtC4J11cIlxyXG4gICAgICA+PC9xLWlucHV0PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHYtc2hvdz1cInNob3dLaWRzXCIgY2xhc3M9XCJyZWxhdGl2ZSB3LWZ1bGxcIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdy1mdWxsIHRvcC0wIGxlZnQtMCB3LTEwMCBib3JkZXIgYm9yZGVyLWdyYXktNDAwIGJnLXdoaXRlIHotNTBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiB2LWZvcj1cIihlLCBpbmRleCkgaW4gdHlwZXNcIiA6a2V5PVwiaW5kZXhcIj5cclxuICAgICAgICAgIDxUeXBlT3B0aW9uXHJcbiAgICAgICAgICAgIDp0eXBlPVwiZVwiXHJcbiAgICAgICAgICAgIEBpbnB1dD1cIihpZCkgPT4gaW5wdXQoaWQpXCJcclxuICAgICAgICAgICAgOnBhcmVudFNob3dLaWRzPVwidGhpcy5zaG93S2lkc1wiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IFR5cGVPcHRpb24gZnJvbSBcIi4vVHlwZU9wdGlvbi52dWVcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHsgVHlwZU9wdGlvbiB9LFxyXG4gIG5hbWU6IFwiVHlwZVNlbGVjdG9yXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXHJcbiAgICB0YWJpbmRleDoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICB0eXBlczogXCJnZXRFdmVudFR5cGVzVHJlZVwiLFxyXG4gICAgICB0eXBlc1N0YXR1czogXCJnZXRFdmVudFR5cGVzU3RhdHVzXCIsXHJcbiAgICAgIGxlYWZUeXBlczogXCJnZXRMZWFmVHlwZXNcIixcclxuICAgIH0pLFxyXG4gICAgdHlwZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGVhZlR5cGVzLmZpbmQoKHgpID0+IHguaWQgPT0gdGhpcy52YWx1ZSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dLaWRzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5nZXRUeXBlcygpO1xyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGdldFR5cGVzKCkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy50eXBlcy5sZW5ndGggPCAxXHJcbiAgICAgICAgICA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0VWRU5UX1RZUEVTX1RSRUVcIilcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcbiAgICBpbnB1dChpZCkge1xyXG4gICAgICB0aGlzLnNob3dLaWRzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJpbnB1dFwiLCBpZCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TGFiZWwoKSB7XHJcbiAgICAgIGlmICh0aGlzLnR5cGVzU3RhdHVzID09IFwibG9hZGluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwi0JfQsNCy0LDQvdGC0LDQttC10L3QvdGPLi4uXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlc1N0YXR1cyA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICByZXR1cm4gXCLQndC1INCy0LTQsNC70L7RgdGMINC30LDQstCw0L3RgtCw0LbQuNGC0Lgg0YLQuNC/0LhcIjtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnZhbHVlID4wICYmIHRoaXMudHlwZSA9PT0gdW5kZWZpbmVkKXtyZXR1cm4gXCLQhtC90YjQtVwifVxyXG4gICAgICByZXR1cm4gdGhpcy50eXBlID09IG51bGwgPyBcItCS0LjQsdGW0YAg0YLQuNC/0YNcIiA6IHRoaXMudHlwZS5uYW1lO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuPHN0eWxlPlxyXG4udHlwZU9wdGlvbiB7XHJcbiAgQGFwcGx5IHBsLTIgcC0yIHRleHQtc207XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfaG9pc3RlZF8yIiwiX0ZyYWdtZW50IiwiX2NyZWF0ZUJsb2NrIiwiX3dpdGhEaXJlY3RpdmVzIiwiX3JlbmRlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBc0NBLE1BQUssY0FBVTtBQUFBLEVBQ2IsWUFBWSxFQUFFLFVBQVc7QUFBQSxFQUN6QixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxNQUFNLEVBQUUsTUFBTSxRQUFRLFNBQVMsT0FBVztBQUFBLElBQzFDLFFBQVEsRUFBRSxNQUFNLFFBQVEsU0FBUyxFQUFHO0FBQUEsSUFDcEMsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLFNBQVMsTUFBTztBQUFBLEVBQ2xEO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUixjQUFjO0FBQ1osYUFBTyxLQUFLLFNBQVMsSUFBSTtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLFdBQVcs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
