import { u as useModelToggleProps, a as useModelToggleEmits, b as useModelToggle, c as useHistory, d as usePreventScroll } from "./QMenu.9dd1c774.js";
import { a as useTimeout } from "./scroll.a3a49254.js";
import { u as useDarkProps, a as useDark, b as useFormProps, c as useFormInject, d as QInput, e as QBtn } from "./QBtn.a363fc1a.js";
import { T as TouchPan, D as DateTimeInput } from "./volleyball.ce4c2a1e.js";
import { c as createComponent, k as hDir, h as hSlot, j as useSize, a as hMergeSlot, i as useSizeProps, Q as QIcon } from "./uid.627d4ed7.js";
import { b as between } from "./format.3e32b8d9.js";
import { i as inject, m as emptyRenderFn, n as layoutKey, r as ref, c as computed, w as watch, o as onMounted, D as nextTick, u as onBeforeUnmount, v as withDirectives, h, g as getCurrentInstance, a8 as toRaw, x as stopAndPrevent, _ as _export_sfc, K as resolveComponent, L as openBlock, Y as createElementBlock, O as createBaseVNode, $ as createTextVNode, a0 as toDisplayString, j as createVNode, P as createCommentVNode, a9 as withModifiers, F as Fragment, Z as renderList, aa as vShow, M as createBlock, ab as useCssVars, J as mapGetters, N as withCtx, ac as vModelText } from "./index.6764d851.js";
import { L } from "./leaflet-src.ffd70e66.js";
import { s as setCurrentTime } from "./convertDate.2fe32ce1.js";
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") !== -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation)
        return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position) === size.value)) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position, 0) : Math.min(0, position - width)
      );
      applyBackdrop(
        between(position / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value !== -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === "toggle" ? "switch" : "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
var QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
var TypeFilterOption_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__ = {
  name: "TypeOption",
  props: {
    type: { type: Object, default: void 0 },
    toroot: { type: Number, default: 1 },
    parentShowKids: { type: Boolean, default: false },
    many: { type: Boolean, default: false }
  },
  computed: {
    isSelected() {
      return this.$store.getters.isTypeSelected(this.localType.id);
    },
    leftPadding() {
      return (this.toroot - 1) * 8 + "px";
    }
  },
  data() {
    return {
      showKids: false,
      select: false,
      localType: null
    };
  },
  mounted() {
    this.localType = this.type;
  },
  methods: {
    handleClick() {
      var _a;
      if (((_a = this.localType.children) == null ? void 0 : _a.length) === 0) {
        console.log(this.localType);
      } else {
        console.log(this.localType);
        this.showKids = !this.showKids;
      }
    },
    setSelected(val) {
      if (val == true) {
        this.$store.dispatch("SELECT_TYPE", {
          type: this.localType
        });
      } else {
        this.$store.dispatch("DESELECT_TYPE", {
          type: this.localType
        });
      }
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        this.localType = newVal;
      }
    },
    parentShowKids(val) {
      if (val == false) {
        this.showKids = false;
      }
    }
  }
};
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "5f4db7e3": _ctx.leftPadding
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main$4 = __default__;
const _hoisted_1$3 = { key: 0 };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_TypeOption = resolveComponent("TypeOption");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", {
      class: "p-1 addPadding flex flex-row justify-start items-center",
      onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.handleClick && $options.handleClick(...args), ["stop"]))
    }, [
      createTextVNode(toDisplayString($data.localType.name) + " ", 1),
      ((_a = $data.localType.children) == null ? void 0 : _a.length) != 0 ? (openBlock(), createElementBlock("span", _hoisted_1$3, [
        createVNode(QIcon, { name: "expand_more" })
      ])) : createCommentVNode("", true),
      createVNode(QCheckbox, {
        dense: "",
        class: "m-0 ml-auto",
        size: "xs",
        "model-value": $options.isSelected,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (val) => $options.setSelected(val))
      }, null, 8, ["model-value"])
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.localType.children, (t, index) => {
      return withDirectives((openBlock(), createElementBlock("div", { key: index }, [
        createVNode(_component_TypeOption, {
          type: t,
          toroot: $props.toroot + 1
        }, null, 8, ["type", "toroot"]),
        index == $data.localType.children.length - 1 ? (openBlock(), createBlock(_component_TypeOption, {
          key: 0,
          type: { id: $data.localType.id, name: "\u0406\u043D\u0448\u0435", children: [] },
          toroot: $props.toroot + 1
        }, null, 8, ["type", "toroot"])) : createCommentVNode("", true)
      ])), [
        [vShow, $data.showKids]
      ]);
    }), 128))
  ]);
}
var TypeFilterOption = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-964c28dc"], ["__file", "TypeFilterOption.vue"]]);
const _sfc_main$3 = {
  components: { TypeFilterOption },
  name: "TypesSelector",
  props: {
    value: { type: Number, default: void 0 },
    tabindex: {
      type: Number,
      default: 0
    },
    many: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      types: "getEventTypesTree",
      typesStatus: "getEventTypesStatus",
      leafTypes: "getLeafTypes",
      selectedLeafTypes: "getSelectedLeafTypes"
    }),
    all() {
      var _a;
      return {
        name: "\u0412\u0441\u0456 \u0442\u0438\u043F\u0438",
        children: (_a = this.types) != null ? _a : [],
        id: 0
      };
    },
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
    console.log(this.types);
  },
  methods: {
    async getTypes() {
      await Promise.all([
        this.types.length < 1 ? this.$store.dispatch("GET_EVENT_TYPES_TREE") : void 0
      ]);
    },
    getLabel() {
      if (this.typesStatus == "loading") {
        return "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...";
      } else if (this.typesStatus == "error") {
        return "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0442\u0438\u043F\u0438";
      }
      return this.type == null ? "Select type" : this.type.name;
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TypeFilterOption = resolveComponent("TypeFilterOption");
  return openBlock(), createElementBlock("div", null, [
    $options.all ? (openBlock(), createBlock(_component_TypeFilterOption, {
      key: 0,
      type: $options.all
    }, null, 8, ["type"])) : createCommentVNode("", true)
  ]);
}
var TypesSelector = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "TypesFilter.vue"]]);
const _sfc_main$2 = {
  components: {
    DateTimeInput,
    TypesSelector
  },
  data() {
    return {
      filters: {
        startTime: null,
        endTime: null,
        distance: null,
        userPoint: null
      }
    };
  },
  computed: {
    ...mapGetters({
      types: "getSelectedTypes"
    }),
    startTime() {
      return this.filters.startTime;
    },
    endTime() {
      return this.filters.endTime;
    }
  },
  async mounted() {
    await this.getFilters();
    this.circle = null;
    this.showMap();
    if (this.filters.startTime == null)
      this.filters.startTime = new Date().toISOString();
    this.showCircle(this.toLatLng(this.filters.userPoint));
  },
  watch: {
    startTime: {
      handler(val, last) {
        if (last == null) {
          let withCurrentTime = setCurrentTime(last);
          this.filters.startTime = withCurrentTime;
        }
        if (this.filters.endTime != null && val > this.filters.endTime) {
          this.filters.endTime = val;
        }
      }
    },
    endTime(val, last) {
      if (last == null) {
        let withCurrentTime = setCurrentTime(last);
        this.filters.endTime = withCurrentTime;
      }
      if (val != null && val != "" && val <= this.filters.startTime) {
        this.filters.endTime = this.filters.startTime;
      }
    },
    "filters.distance": function(newDistance) {
      if (this.circle) {
        this.circle.setRadius(newDistance);
      }
    }
  },
  methods: {
    async updateFilters() {
      console.log(
        this.filters,
        this.types,
        this.$store.getters.getSelectedTypes
      );
      this.$store.dispatch("SAVE_TYPE_FILTERS");
      localStorage.setItem("filters", JSON.stringify(this.filters));
      let types_ = Object.keys(this.types);
      types_ = types_.filter((x) => this.types[x] == true);
      this.$emit("update", { ...this.filters, types: types_ });
    },
    getFilters() {
      this.$store.dispatch("GET_TYPE_FILTERS");
      if (localStorage.getItem("filters")) {
        this.filters = JSON.parse(localStorage.getItem("filters"));
      }
      if (this.filters.distance == null) {
        this.filters.distance = 3e3;
      }
      if (this.filters.userPoint == null) {
        this.filters.userPoint = "50.451937587, 30.519332886";
      }
    },
    setLocation() {
    },
    showMap() {
      this.map = L.map("map1").setView([50.44, 30.56], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(this.map);
      this.marker = null;
      this.map.on("click", (event) => {
        const latlng = event.latlng;
        this.showCircle(latlng);
      });
    },
    showCircle(latlng) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      if (this.circle) {
        this.map.removeLayer(this.circle);
      }
      this.marker = L.marker(latlng).addTo(this.map);
      this.filters.userPoint = `${latlng.lat.toFixed(9)}, ${latlng.lng.toFixed(
        9
      )}`;
      this.circle = L.circle(this.marker.getLatLng(), {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: this.filters.distance
      }).addTo(this.map);
      this.map.fitBounds(this.circle.getBounds());
    },
    toLatLng(string) {
      console.log(string);
      let floats = string.split(", ").map(parseFloat);
      let res = {};
      res.lat = floats[0];
      res.lng = floats[1];
      return res;
    }
  }
};
const _hoisted_1$2 = { class: "flex flex-col gap-1 w-full" };
const _hoisted_2$2 = { class: "flex items-center text-base" };
const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode("h5", null, "\u0424\u0456\u043B\u044C\u0442\u0440\u0438", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", {
  id: "map1",
  class: "w-full flex-1"
}, null, -1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_DateTimeInput = resolveComponent("DateTimeInput");
  const _component_types_selector = resolveComponent("types-selector");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      _hoisted_3$2,
      createVNode(QIcon, {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
        name: "close",
        class: "ml-auto cursor-pointer",
        size: "sm"
      })
    ]),
    createVNode(_component_DateTimeInput, {
      dense: true,
      class: "flex-none w-full",
      label: "\u0427\u0430\u0441 \u043F\u043E\u0447\u0430\u0442\u043A\u0443",
      value: (_a = $data.filters.startTime) != null ? _a : null,
      min: new Date().toISOString(),
      onInput: _cache[1] || (_cache[1] = (v) => $data.filters.startTime = v)
    }, null, 8, ["value", "min"]),
    createVNode(_component_DateTimeInput, {
      dense: true,
      class: "flex-none w-full",
      label: "\u0427\u0430\u0441 \u0437\u0430\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u044F",
      value: (_b = $data.filters.endTime) != null ? _b : null,
      min: (_c = $data.filters.startTime) != null ? _c : null,
      onInput: _cache[2] || (_cache[2] = (v) => $data.filters.endTime = v)
    }, null, 8, ["value", "min"]),
    createVNode(_component_types_selector, { class: "flex-none" }),
    createVNode(QInput, {
      dense: "",
      class: "flex-none",
      label: "\u0412\u0456\u0434\u0441\u0442\u0430\u043D\u044C \u0432 \u043C\u0435\u0442\u0440\u0430\u0445",
      type: "number",
      modelValue: $data.filters.distance,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.filters.distance = $event),
      clearable: ""
    }, null, 8, ["modelValue"]),
    createVNode(QInput, {
      class: "flex-none",
      dense: "",
      "bottom-slots": "",
      modelValue: $data.filters.userPoint,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.filters.userPoint = $event),
      label: "\u041B\u043E\u043A\u0430\u0446\u0456\u044F",
      readonly: ""
    }, {
      prepend: withCtx(() => [
        createVNode(QIcon, {
          name: "place",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.setLocation())
        })
      ]),
      append: withCtx(() => [
        createVNode(QIcon, {
          name: "close",
          onClick: _cache[5] || (_cache[5] = ($event) => $data.filters.userPoint = ""),
          class: "cursor-pointer"
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    _hoisted_4,
    createVNode(QBtn, {
      class: "w-full flex-none",
      onClick: $options.updateFilters
    }, {
      default: withCtx(() => [
        createTextVNode("\u041E\u043D\u043E\u0432\u0438\u0442\u0438")
      ]),
      _: 1
    }, 8, ["onClick"])
  ]);
}
var EventFilters = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "FiltersPanel.vue"]]);
const _sfc_main$1 = {};
const _hoisted_1$1 = {
  width: "25",
  height: "25",
  viewBox: "0 0 25 25",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M7.8125 2.78042C7.3981 2.78042 7.00067 2.92671 6.70765 3.18711C6.41462 3.44751 6.25 3.80068 6.25 4.16893C6.25 4.53719 6.41462 4.89036 6.70765 5.15076C7.00067 5.41116 7.3981 5.55745 7.8125 5.55745C8.2269 5.55745 8.62433 5.41116 8.91735 5.15076C9.21038 4.89036 9.375 4.53719 9.375 4.16893C9.375 3.80068 9.21038 3.44751 8.91735 3.18711C8.62433 2.92671 8.2269 2.78042 7.8125 2.78042ZM3.39063 2.78042C3.71344 1.96741 4.31209 1.26338 5.10406 0.765403C5.89603 0.267421 6.84232 0 7.8125 0C8.78268 0 9.72897 0.267421 10.5209 0.765403C11.3129 1.26338 11.9116 1.96741 12.2344 2.78042H23.4375C23.8519 2.78042 24.2493 2.92671 24.5424 3.18711C24.8354 3.44751 25 3.80068 25 4.16893C25 4.53719 24.8354 4.89036 24.5424 5.15076C24.2493 5.41116 23.8519 5.55745 23.4375 5.55745H12.2344C11.9116 6.37046 11.3129 7.07449 10.5209 7.57247C9.72897 8.07045 8.78268 8.33787 7.8125 8.33787C6.84232 8.33787 5.89603 8.07045 5.10406 7.57247C4.31209 7.07449 3.71344 6.37046 3.39063 5.55745H1.5625C1.1481 5.55745 0.750672 5.41116 0.457646 5.15076C0.16462 4.89036 0 4.53719 0 4.16893C0 3.80068 0.16462 3.44751 0.457646 3.18711C0.750672 2.92671 1.1481 2.78042 1.5625 2.78042H3.39063ZM17.1875 11.1115C16.7731 11.1115 16.3757 11.2578 16.0826 11.5182C15.7896 11.7786 15.625 12.1317 15.625 12.5C15.625 12.8683 15.7896 13.2214 16.0826 13.4818C16.3757 13.7422 16.7731 13.8885 17.1875 13.8885C17.6019 13.8885 17.9993 13.7422 18.2924 13.4818C18.5854 13.2214 18.75 12.8683 18.75 12.5C18.75 12.1317 18.5854 11.7786 18.2924 11.5182C17.9993 11.2578 17.6019 11.1115 17.1875 11.1115ZM12.7656 11.1115C13.0884 10.2985 13.6871 9.59445 14.4791 9.09647C15.271 8.59848 16.2173 8.33106 17.1875 8.33106C18.1577 8.33106 19.104 8.59848 19.8959 9.09647C20.6879 9.59445 21.2866 10.2985 21.6094 11.1115H23.4375C23.8519 11.1115 24.2493 11.2578 24.5424 11.5182C24.8354 11.7786 25 12.1317 25 12.5C25 12.8683 24.8354 13.2214 24.5424 13.4818C24.2493 13.7422 23.8519 13.8885 23.4375 13.8885H21.6094C21.2866 14.7015 20.6879 15.4055 19.8959 15.9035C19.104 16.4015 18.1577 16.6689 17.1875 16.6689C16.2173 16.6689 15.271 16.4015 14.4791 15.9035C13.6871 15.4055 13.0884 14.7015 12.7656 13.8885H1.5625C1.1481 13.8885 0.750672 13.7422 0.457646 13.4818C0.16462 13.2214 0 12.8683 0 12.5C0 12.1317 0.16462 11.7786 0.457646 11.5182C0.750672 11.2578 1.1481 11.1115 1.5625 11.1115H12.7656ZM7.8125 19.4426C7.3981 19.4426 7.00067 19.5888 6.70765 19.8492C6.41462 20.1096 6.25 20.4628 6.25 20.8311C6.25 21.1993 6.41462 21.5525 6.70765 21.8129C7.00067 22.0733 7.3981 22.2196 7.8125 22.2196C8.2269 22.2196 8.62433 22.0733 8.91735 21.8129C9.21038 21.5525 9.375 21.1993 9.375 20.8311C9.375 20.4628 9.21038 20.1096 8.91735 19.8492C8.62433 19.5888 8.2269 19.4426 7.8125 19.4426ZM3.39063 19.4426C3.71344 18.6295 4.31209 17.9255 5.10406 17.4275C5.89603 16.9295 6.84232 16.6621 7.8125 16.6621C8.78268 16.6621 9.72897 16.9295 10.5209 17.4275C11.3129 17.9255 11.9116 18.6295 12.2344 19.4426H23.4375C23.8519 19.4426 24.2493 19.5888 24.5424 19.8492C24.8354 20.1096 25 20.4628 25 20.8311C25 21.1993 24.8354 21.5525 24.5424 21.8129C24.2493 22.0733 23.8519 22.2196 23.4375 22.2196H12.2344C11.9116 23.0326 11.3129 23.7366 10.5209 24.2346C9.72897 24.7326 8.78268 25 7.8125 25C6.84232 25 5.89603 24.7326 5.10406 24.2346C4.31209 23.7366 3.71344 23.0326 3.39063 22.2196H1.5625C1.1481 22.2196 0.750672 22.0733 0.457646 21.8129C0.16462 21.5525 0 21.1993 0 20.8311C0 20.4628 0.16462 20.1096 0.457646 19.8492C0.750672 19.5888 1.1481 19.4426 1.5625 19.4426H3.39063Z",
  fill: "black",
  "fill-opacity": "0.8"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var FilterIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "FilterIcon.vue"]]);
const _sfc_main = {
  components: {
    FilterIcon
  },
  props: {
    searchText: { type: String, default: "" }
  },
  data: function() {
    return {
      text: this.searchText
    };
  },
  watch: {
    text() {
      this.updateText();
    }
  },
  methods: {
    showFilters() {
      this.$emit("showFilters");
    },
    updateText() {
      this.$emit("updateText", this.text);
    }
  }
};
const _hoisted_1 = { class: "bg-blue-100 bg-opacity-80 top-0 left-0 w-full px-4 py-2 flex flex-row gap-2 border-gray-400 border-b justify-center items-center" };
const _hoisted_2 = { class: "relative flex-1 max-w-md" };
const _hoisted_3 = { class: "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FilterIcon = resolveComponent("FilterIcon");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      withDirectives(createBaseVNode("input", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
        class: "bg-transparent p-4 pr-8 border border-gray-800 w-full h-10 focus:border-black rounded-2xl"
      }, null, 512), [
        [vModelText, _ctx.text]
      ]),
      createBaseVNode("div", _hoisted_3, [
        _ctx.text === "" ? (openBlock(), createBlock(QIcon, {
          key: 0,
          name: "search",
          size: "sm"
        })) : (openBlock(), createBlock(QIcon, {
          key: 1,
          name: "clear",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.text = "")
        }))
      ])
    ]),
    createVNode(_component_FilterIcon, { onClick: $options.showFilters }, null, 8, ["onClick"])
  ]);
}
var TopPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "TopPanel.vue"]]);
export { EventFilters as E, QDrawer as Q, TopPanel as T };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9wUGFuZWwuYzc0MWRmYWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZHJhd2VyL1FEcmF3ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yZWZvY3VzLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGVja2JveC91c2UtY2hlY2tib3guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NoZWNrYm94L1FDaGVja2JveC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1R5cGVGaWx0ZXJPcHRpb24udnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVHlwZXNGaWx0ZXIudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRmlsdGVyc1BhbmVsLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RvcFBhbmVsLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCB3aXRoRGlyZWN0aXZlcywgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VQcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IGhTbG90LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmNvbnN0IGR1cmF0aW9uID0gMTUwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRHJhd2VyJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGVmdCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcblxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgbWluaVRvT3ZlcmxheTogQm9vbGVhbixcbiAgICBtaW5pV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDU3XG4gICAgfSxcbiAgICBub01pbmlBbmltYXRpb246IEJvb2xlYW4sXG5cbiAgICBicmVha3BvaW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAxMDIzXG4gICAgfSxcbiAgICBzaG93SWZBYm92ZTogQm9vbGVhbixcblxuICAgIGJlaGF2aW9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVmYXVsdCcsICdkZXNrdG9wJywgJ21vYmlsZScgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0J1xuICAgIH0sXG5cbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIG92ZXJsYXk6IEJvb2xlYW4sXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBub1N3aXBlT3BlbjogQm9vbGVhbixcbiAgICBub1N3aXBlQ2xvc2U6IEJvb2xlYW4sXG4gICAgbm9Td2lwZUJhY2tkcm9wOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdvbkxheW91dCcsICdtaW5pU3RhdGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcHJldmVudEJvZHlTY3JvbGwgfSA9IHVzZVByZXZlbnRTY3JvbGwoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0LCByZW1vdmVUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRRHJhd2VyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBsZXQgbGFzdERlc2t0b3BTdGF0ZSwgdGltZXJNaW5pID0gbnVsbCwgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXJcblxuICAgIGNvbnN0IGJlbG93QnJlYWtwb2ludCA9IHJlZihcbiAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgfHwgKHByb3BzLmJlaGF2aW9yICE9PSAnZGVza3RvcCcgJiYgJGxheW91dC50b3RhbFdpZHRoLnZhbHVlIDw9IHByb3BzLmJyZWFrcG9pbnQpXG4gICAgKVxuXG4gICAgY29uc3QgaXNNaW5pID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1pbmkgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3Qgc2l6ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIGlzTWluaS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLm1pbmlXaWR0aFxuICAgICAgICA6IHByb3BzLndpZHRoXG4gICAgKSlcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlIHx8IG9uU2NyZWVuT3ZlcmxheS52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQsIG5vRXZlbnQpIHtcbiAgICAgIGFkZFRvSGlzdG9yeSgpXG5cbiAgICAgIGV2dCAhPT0gZmFsc2UgJiYgJGxheW91dC5hbmltYXRlKClcbiAgICAgIGFwcGx5UG9zaXRpb24oMClcblxuICAgICAgaWYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvdGhlckluc3RhbmNlID0gJGxheW91dC5pbnN0YW5jZXNbIG90aGVyU2lkZS52YWx1ZSBdXG4gICAgICAgIGlmIChvdGhlckluc3RhbmNlICE9PSB2b2lkIDAgJiYgb3RoZXJJbnN0YW5jZS5iZWxvd0JyZWFrcG9pbnQgPT09IHRydWUpIHtcbiAgICAgICAgICBvdGhlckluc3RhbmNlLmhpZGUoZmFsc2UpXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseUJhY2tkcm9wKDEpXG4gICAgICAgICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodHJ1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZShmYWxzZSlcbiAgICAgIH1cblxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZXZ0ICE9PSBmYWxzZSAmJiBzZXRTY3JvbGxhYmxlKHRydWUpXG4gICAgICAgIG5vRXZlbnQgIT09IHRydWUgJiYgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIGR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCwgbm9FdmVudCkge1xuICAgICAgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG5cbiAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBzaXplLnZhbHVlKVxuXG4gICAgICBjbGVhbnVwKClcblxuICAgICAgaWYgKG5vRXZlbnQgIT09IHRydWUpIHtcbiAgICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHsgZW1pdCgnaGlkZScsIGV2dCkgfSwgZHVyYXRpb24pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBoYW5kbGVTaG93LFxuICAgICAgaGFuZGxlSGlkZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGFkZFRvSGlzdG9yeSwgcmVtb3ZlRnJvbUhpc3RvcnkgfSA9IHVzZUhpc3Rvcnkoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgIGJlbG93QnJlYWtwb2ludCxcbiAgICAgIGhpZGVcbiAgICB9XG5cbiAgICBjb25zdCByaWdodFNpZGUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zaWRlID09PSAncmlnaHQnKVxuXG4gICAgY29uc3Qgc3RhdGVEaXJlY3Rpb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIChyaWdodFNpZGUudmFsdWUgPT09IHRydWUgPyAxIDogLTEpXG4gICAgKVxuXG4gICAgY29uc3QgZmxhZ0JhY2tkcm9wQmcgPSByZWYoMClcbiAgICBjb25zdCBmbGFnUGFubmluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBmbGFnTWluaUFuaW1hdGUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ0NvbnRlbnRQb3NpdGlvbiA9IHJlZiggLy8gc3RhcnRpbmcgd2l0aCBcImhpZGRlblwiIGZvciBTU1JcbiAgICAgIHNpemUudmFsdWUgKiBzdGF0ZURpcmVjdGlvbi52YWx1ZVxuICAgIClcblxuICAgIGNvbnN0IG90aGVyU2lkZSA9IGNvbXB1dGVkKCgpID0+IChyaWdodFNpZGUudmFsdWUgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnKSlcbiAgICBjb25zdCBvZmZzZXQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2UgJiYgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICAgPyAocHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZSA/IHByb3BzLm1pbmlXaWR0aCA6IHNpemUudmFsdWUpXG4gICAgICAgIDogMFxuICAgICkpXG5cbiAgICBjb25zdCBmaXhlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vdmVybGF5ID09PSB0cnVlXG4gICAgICB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZihyaWdodFNpZGUudmFsdWUgPyAnUicgOiAnTCcpICE9PSAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9uTGF5b3V0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgKVxuXG4gICAgY29uc3Qgb25TY3JlZW5PdmVybGF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdmdWxsc2NyZWVuIHEtZHJhd2VyX19iYWNrZHJvcCdcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIGZsYWdQYW5uaW5nLnZhbHVlID09PSBmYWxzZSA/ICcgaGlkZGVuJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSgwLDAsMCwkeyBmbGFnQmFja2Ryb3BCZy52YWx1ZSAqIDAuNCB9KWBcbiAgICB9KSlcblxuICAgIGNvbnN0IGhlYWRlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUudG9wWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGZvb3RlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUuYm90dG9tWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGFib3ZlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUgJiYgaGVhZGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUgJiYgZm9vdGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBgJHsgc2l6ZS52YWx1ZSB9cHhgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7IGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgfXB4KWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHN0eWxlXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbihzdHlsZSwgYWJvdmVTdHlsZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRyYXdlcl9fY29udGVudCBmaXQgJ1xuICAgICAgKyAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdzY3JvbGwnIDogJ292ZXJmbG93LWF1dG8nKVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtZHJhd2VyIHEtZHJhd2VyLS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChmbGFnTWluaUFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1taW5pLWFuaW1hdGUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgbm8tdHJhbnNpdGlvbidcbiAgICAgICAgICA6IChzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJylcbiAgICAgIClcbiAgICAgICsgKFxuICAgICAgICBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgZml4ZWQgcS1kcmF3ZXItLW9uLXRvcCBxLWRyYXdlci0tbW9iaWxlIHEtZHJhd2VyLS10b3AtcGFkZGluZydcbiAgICAgICAgICA6IGAgcS1kcmF3ZXItLSR7IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSA/ICdtaW5pJyA6ICdzdGFuZGFyZCcgfWBcbiAgICAgICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBvbkxheW91dC52YWx1ZSAhPT0gdHJ1ZSA/ICcgZml4ZWQnIDogJycpXG4gICAgICAgICAgKyAocHJvcHMub3ZlcmxheSA9PT0gdHJ1ZSB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gJyBxLWRyYXdlci0tb24tdG9wJyA6ICcnKVxuICAgICAgICAgICsgKGhlYWRlclNsb3QudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS10b3AtcGFkZGluZycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBvcGVuRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgcHJvcHMubm9Td2lwZU9wZW4gIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gcHJvcHMuc2lkZSA6IG90aGVyU2lkZS52YWx1ZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbk9wZW5QYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRlbnRDbG9zZURpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBiYWNrZHJvcENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlLFxuICAgICAgICAgIG1vdXNlQWxsRGlyOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCZWxvd0JyZWFrcG9pbnQgKCkge1xuICAgICAgdXBkYXRlTG9jYWwoYmVsb3dCcmVha3BvaW50LCAoXG4gICAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICAgICkpXG4gICAgfVxuXG4gICAgd2F0Y2goYmVsb3dCcmVha3BvaW50LCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkgeyAvLyBmcm9tIGxnIHRvIHhzXG4gICAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBzaG93aW5nLnZhbHVlXG4gICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgaGlkZShmYWxzZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKFxuICAgICAgICBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ21vYmlsZSdcbiAgICAgICAgJiYgbGFzdERlc2t0b3BTdGF0ZSAhPT0gZmFsc2VcbiAgICAgICkgeyAvLyBmcm9tIHhzIHRvIGxnXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNpZGUsIChuZXdTaWRlLCBvbGRTaWRlKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9IHZvaWQgMFxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0uc3BhY2UgPSBmYWxzZVxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0ub2Zmc2V0ID0gMFxuICAgICAgfVxuXG4gICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgbmV3U2lkZSBdID0gaW5zdGFuY2VcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5zaXplID0gc2l6ZS52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNwYWNlID0gb25MYXlvdXQudmFsdWVcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5vZmZzZXQgPSBvZmZzZXQudmFsdWVcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcHJvcHMuYmVoYXZpb3IgKyBwcm9wcy5icmVha3BvaW50LFxuICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50XG4gICAgKVxuXG4gICAgd2F0Y2goJGxheW91dC5pc0NvbnRhaW5lciwgdmFsID0+IHtcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodmFsICE9PSB0cnVlKVxuICAgICAgdmFsID09PSB0cnVlICYmIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgsICgpID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiB2b2lkIDApXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHsgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCB2YWwpIH0pXG5cbiAgICB3YXRjaChvbkxheW91dCwgdmFsID0+IHtcbiAgICAgIGVtaXQoJ29uTGF5b3V0JywgdmFsKVxuICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2gocmlnaHRTaWRlLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goc2l6ZSwgdmFsID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oKVxuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHByb3BzLm1pbmlUb092ZXJsYXksIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaVRvT3ZlcmxheSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZVNpemVPbkxheW91dCh2YWwsIHNpemUudmFsdWUpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+ICRxLmxhbmcucnRsLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaSwgKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm5vTWluaUFuaW1hdGlvbikgcmV0dXJuXG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhbmltYXRlTWluaSgpXG4gICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKGlzTWluaSwgdmFsID0+IHsgZW1pdCgnbWluaVN0YXRlJywgdmFsKSB9KVxuXG4gICAgZnVuY3Rpb24gYXBwbHlQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogc2l6ZS52YWx1ZVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgTWF0aC5hYnMocG9zaXRpb24pID09PSBzaXplLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdGF0ZURpcmVjdGlvbi52YWx1ZSAqICRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgPSBwb3NpdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5QmFja2Ryb3AgKHgpIHtcbiAgICAgIGZsYWdCYWNrZHJvcEJnLnZhbHVlID0geFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGFibGUgKHYpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHYgPT09IHRydWVcbiAgICAgICAgPyAncmVtb3ZlJ1xuICAgICAgICA6ICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ2FkZCcgOiAnJylcblxuICAgICAgYWN0aW9uICE9PSAnJyAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFsgYWN0aW9uIF0oJ3EtYm9keS0tZHJhd2VyLXRvZ2dsZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1pbmkgKCkge1xuICAgICAgdGltZXJNaW5pICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG5cbiAgICAgIGlmICh2bS5wcm94eSAmJiB2bS5wcm94eS4kZWwpIHtcbiAgICAgICAgLy8gbmVlZCB0byBzcGVlZCBpdCB1cCBhbmQgYXBwbHkgaXQgaW1tZWRpYXRlbHksXG4gICAgICAgIC8vIGV2ZW4gZmFzdGVyIHRoYW4gVnVlJ3MgbmV4dFRpY2shXG4gICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QuYWRkKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgIH1cblxuICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgdGltZXJNaW5pID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaWYgKHZtICYmIHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgICAgfVxuICAgICAgfSwgMTUwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlblBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBvcGVuZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgcG9zaXRpb24gPSBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IHBvc2l0aW9uID49IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvdygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihcbiAgICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gcmlnaHRTaWRlLnZhbHVlICE9PSB0cnVlIDogcmlnaHRTaWRlLnZhbHVlKVxuICAgICAgICAgID8gTWF0aC5tYXgod2lkdGggLSBwb3NpdGlvbiwgMClcbiAgICAgICAgICA6IE1hdGgubWluKDAsIHBvc2l0aW9uIC0gd2lkdGgpXG4gICAgICApXG4gICAgICBhcHBseUJhY2tkcm9wKFxuICAgICAgICBiZXR3ZWVuKHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpXG4gICAgICApXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gY2xvc2VkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIGRpciA9IGV2dC5kaXJlY3Rpb24gPT09IHByb3BzLnNpZGUsXG4gICAgICAgIHBvc2l0aW9uID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gZGlyICE9PSB0cnVlIDogZGlyKVxuICAgICAgICAgID8gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG4gICAgICAgICAgOiAwXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBNYXRoLmFicyhwb3NpdGlvbikgPCBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgIGFwcGx5QmFja2Ryb3AoYmV0d2VlbigxIC0gcG9zaXRpb24gLyB3aWR0aCwgMCwgMSkpXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZShwcm9wcy5zaWRlLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZU9uTGF5b3V0IChtaW5pVG9PdmVybGF5LCBzaXplKSB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBtaW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZSlcbiAgICB9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gaW5zdGFuY2VcbiAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgb25MYXlvdXQudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcbiAgICApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCBvbkxheW91dC52YWx1ZSlcbiAgICAgIGVtaXQoJ21pbmlTdGF0ZScsIGlzTWluaS52YWx1ZSlcblxuICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG5cbiAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gaGFuZGxlU2hvdyA6IGhhbmRsZUhpZGVcbiAgICAgICAgYWN0aW9uKGZhbHNlLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC50b3RhbFdpZHRoLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGFsbCBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIGhhdmUgYmVlbiB1cGRhdGVkIGJlZm9yZSBjYWxsaW5nIGhhbmRsZVNob3cvaGFuZGxlSGlkZSgpXG4gICAgICAgIG5leHRUaWNrKGZuKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHZvaWQgMFxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2hvdyhmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciAhPT0gdm9pZCAwICYmIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyKClcblxuICAgICAgaWYgKHRpbWVyTWluaSAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgY2xlYW51cCgpXG5cbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLm5vU3dpcGVPcGVuID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICdvcGVuJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGBxLWRyYXdlcl9fb3BlbmVyIGZpeGVkLSR7IHByb3BzLnNpZGUgfWAsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvcGVuRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoRGlyKFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGJhY2tkcm9wQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGhpZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgcHJvcHMubm9Td2lwZUJhY2tkcm9wICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgICAoKSA9PiBiYWNrZHJvcENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbmkgPSBpc01pbmkudmFsdWUgPT09IHRydWUgJiYgc2xvdHMubWluaSAhPT0gdm9pZCAwXG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAga2V5OiAnJyArIG1pbmksIC8vIHJlcXVpcmVkIG90aGVyd2lzZSBWdWUgd2lsbCBub3QgZGlmZiBjb3JyZWN0bHlcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0sIG1pbmkgPT09IHRydWVcbiAgICAgICAgICA/IHNsb3RzLm1pbmkoKVxuICAgICAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgICAgKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaERpcihcbiAgICAgICAgICAnYXNpZGUnLFxuICAgICAgICAgIHsgcmVmOiAnY29udGVudCcsIGNsYXNzOiBjbGFzc2VzLnZhbHVlLCBzdHlsZTogc3R5bGUudmFsdWUgfSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICdjb250ZW50Y2xvc2UnLFxuICAgICAgICAgIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgKCkgPT4gY29udGVudENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWRyYXdlci1jb250YWluZXInIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcm9vdFJlZikge1xuICBjb25zdCByZWZvY3VzUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmVmb2N1c1RhcmdldEVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgcmVmOiByZWZvY3VzUmVmLFxuICAgICAgY2xhc3M6ICduby1vdXRsaW5lJyxcbiAgICAgIHRhYmluZGV4OiAtMVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVmb2N1c1RhcmdldCAoZSkge1xuICAgIGNvbnN0IHJvb3QgPSByb290UmVmLnZhbHVlXG5cbiAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMCkge1xuICAgICAgaWYgKFxuICAgICAgICByb290ICE9PSBudWxsXG4gICAgICAgICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHJvb3RcbiAgICAgICAgJiYgcm9vdC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHJvb3QuZm9jdXMoKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHJvb3QgIT09IG51bGwgJiYgcm9vdC5jb250YWlucyhlLnRhcmdldCkgPT09IHRydWUpKVxuICAgICkge1xuICAgICAgcmVmb2N1c1JlZi52YWx1ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWZvY3VzVGFyZ2V0RWwsXG4gICAgcmVmb2N1c1RhcmdldFxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHhzOiAzMCxcbiAgc206IDM1LFxuICBtZDogNDAsXG4gIGxnOiA1MCxcbiAgeGw6IDYwXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UsIHRvUmF3IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybUluamVjdCwgdXNlRm9ybVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IG9wdGlvblNpemVzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VDaGVja2JveFByb3BzID0ge1xuICAuLi51c2VEYXJrUHJvcHMsXG4gIC4uLnVzZVNpemVQcm9wcyxcbiAgLi4udXNlRm9ybVByb3BzLFxuXG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHZhbDoge30sXG5cbiAgdHJ1ZVZhbHVlOiB7IGRlZmF1bHQ6IHRydWUgfSxcbiAgZmFsc2VWYWx1ZTogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICBpbmRldGVybWluYXRlVmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxuXG4gIGNoZWNrZWRJY29uOiBTdHJpbmcsXG4gIHVuY2hlY2tlZEljb246IFN0cmluZyxcbiAgaW5kZXRlcm1pbmF0ZUljb246IFN0cmluZyxcblxuICB0b2dnbGVPcmRlcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA9PT0gJ3RmJyB8fCB2ID09PSAnZnQnXG4gIH0sXG4gIHRvZ2dsZUluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG5cbiAgbGFiZWw6IFN0cmluZyxcbiAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlQ2hlY2tib3hFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0eXBlLCBnZXRJbm5lcikge1xuICBjb25zdCB7IHByb3BzLCBzbG90cywgZW1pdCwgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcbiAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgb3B0aW9uU2l6ZXMpXG5cbiAgY29uc3QgbW9kZWxJc0FycmF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy52YWwgIT09IHZvaWQgMCAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpXG4gIClcblxuICBjb25zdCBpbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0b1Jhdyhwcm9wcy52YWwpXG4gICAgcmV0dXJuIG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlLmZpbmRJbmRleChvcHQgPT4gdG9SYXcob3B0KSA9PT0gdmFsKVxuICAgICAgOiAtMVxuICB9KVxuXG4gIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gaW5kZXgudmFsdWUgIT09IC0xXG4gICAgICA6IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy50cnVlVmFsdWUpXG4gICkpXG5cbiAgY29uc3QgaXNGYWxzZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gaW5kZXgudmFsdWUgPT09IC0xXG4gICAgICA6IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy5mYWxzZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzSW5kZXRlcm1pbmF0ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgaXNUcnVlLnZhbHVlID09PSBmYWxzZSAmJiBpc0ZhbHNlLnZhbHVlID09PSBmYWxzZVxuICApXG5cbiAgY29uc3QgdGFiaW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/IC0xIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICApKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLSR7IHR5cGUgfSBjdXJzb3ItcG9pbnRlciBuby1vdXRsaW5lIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXJgXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gYCBxLSR7IHR5cGUgfS0tZGFya2AgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRlbnNlYCA6ICcnKVxuICAgICsgKHByb3BzLmxlZnRMYWJlbCA9PT0gdHJ1ZSA/ICcgcmV2ZXJzZScgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1dGh5JyA6IChpc0ZhbHNlLnZhbHVlID09PSB0cnVlID8gJ2ZhbHN5JyA6ICdpbmRldCcpXG4gICAgY29uc3QgY29sb3IgPSBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIChcbiAgICAgIHByb3BzLmtlZXBDb2xvciA9PT0gdHJ1ZVxuICAgICAgfHwgKHR5cGUgPT09ICd0b2dnbGUnID8gaXNUcnVlLnZhbHVlID09PSB0cnVlIDogaXNGYWxzZS52YWx1ZSAhPT0gdHJ1ZSlcbiAgICApXG4gICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgOiAnJ1xuXG4gICAgcmV0dXJuIGBxLSR7IHR5cGUgfV9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gbm9uLXNlbGVjdGFibGUgcS0keyB0eXBlIH1fX2lubmVyLS0keyBzdGF0ZSB9JHsgY29sb3IgfWBcbiAgfSlcblxuICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcHJvcCA9IHsgdHlwZTogJ2NoZWNrYm94JyB9XG5cbiAgICBwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgT2JqZWN0LmFzc2lnbihwcm9wLCB7XG4gICAgICAvLyBzZWUgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZXh0cmFzL3JlbmRlci1mdW5jdGlvbi5odG1sI2NyZWF0aW5nLXZub2RlcyAoLnByb3ApXG4gICAgICAnLmNoZWNrZWQnOiBpc1RydWUudmFsdWUsXG4gICAgICAnXmNoZWNrZWQnOiBpc1RydWUudmFsdWUgPT09IHRydWUgPyAnY2hlY2tlZCcgOiB2b2lkIDAsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgdmFsdWU6IG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLnZhbFxuICAgICAgICA6IHByb3BzLnRydWVWYWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gcHJvcFxuICB9KVxuXG4gIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICByb2xlOiB0eXBlID09PSAndG9nZ2xlJyA/ICdzd2l0Y2gnIDogJ2NoZWNrYm94JyxcbiAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAnYXJpYS1jaGVja2VkJzogaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ21peGVkJ1xuICAgICAgICA6IChpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhdHRyc1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cnNcbiAgfSlcblxuICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgaWYgKGUgIT09IHZvaWQgMCkge1xuICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIHJlZm9jdXNUYXJnZXQoZSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBnZXROZXh0VmFsdWUoKSwgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXROZXh0VmFsdWUgKCkge1xuICAgIGlmIChtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG4gICAgICAgIHZhbC5zcGxpY2UoaW5kZXgudmFsdWUsIDEpXG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWUuY29uY2F0KFsgcHJvcHMudmFsIF0pXG4gICAgfVxuXG4gICAgaWYgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnIHx8IHByb3BzLnRvZ2dsZUluZGV0ZXJtaW5hdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5mYWxzZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRmFsc2UudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciA9PT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnXG4gICAgICAgID8gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICAgIDogcHJvcHMuZmFsc2VWYWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5pbmRldGVybWluYXRlVmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIG9uQ2xpY2soZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRJbm5lckNvbnRlbnQgPSBnZXRJbm5lcihpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB0b2dnbGU6IG9uQ2xpY2sgfSlcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGlubmVyID0gZ2V0SW5uZXJDb250ZW50KClcblxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5qZWN0Rm9ybUlucHV0KFxuICAgICAgaW5uZXIsXG4gICAgICAndW5zaGlmdCcsXG4gICAgICBgIHEtJHsgdHlwZSB9X19uYXRpdmUgYWJzb2x1dGUgcS1tYS1ub25lIHEtcGEtbm9uZWBcbiAgICApXG5cbiAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgfSwgaW5uZXIpXG4gICAgXVxuXG4gICAgaWYgKHJlZm9jdXNUYXJnZXRFbC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgY2hpbGQucHVzaChyZWZvY3VzVGFyZ2V0RWwudmFsdWUpXG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWwgPSBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICA/IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgbGFiZWwgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogYHEtJHsgdHlwZSB9X19sYWJlbCBxLWFuY2hvci0tc2tpcGBcbiAgICAgIH0sIGxhYmVsKVxuICAgIClcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25LZXlkb3duLFxuICAgICAgb25LZXl1cFxuICAgIH0sIGNoaWxkKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHVzZUNoZWNrYm94LCB7IHVzZUNoZWNrYm94UHJvcHMsIHVzZUNoZWNrYm94RW1pdHMgfSBmcm9tICcuL3VzZS1jaGVja2JveC5qcydcblxuY29uc3QgYmdOb2RlID0gaCgnZGl2Jywge1xuICBrZXk6ICdzdmcnLFxuICBjbGFzczogJ3EtY2hlY2tib3hfX2JnIGFic29sdXRlJ1xufSwgW1xuICBoKCdzdmcnLCB7XG4gICAgY2xhc3M6ICdxLWNoZWNrYm94X19zdmcgZml0IGFic29sdXRlLWZ1bGwnLFxuICAgIHZpZXdCb3g6ICcwIDAgMjQgMjQnXG4gIH0sIFtcbiAgICBoKCdwYXRoJywge1xuICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X190cnV0aHknLFxuICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgZDogJ00xLjczLDEyLjkxIDguMSwxOS4yOCAyMi43OSw0LjU5J1xuICAgIH0pLFxuXG4gICAgaCgncGF0aCcsIHtcbiAgICAgIGNsYXNzOiAncS1jaGVja2JveF9faW5kZXQnLFxuICAgICAgZDogJ000LDE0SDIwVjEwSDQnXG4gICAgfSlcbiAgXSlcbl0pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2hlY2tib3gnLFxuXG4gIHByb3BzOiB1c2VDaGVja2JveFByb3BzLFxuICBlbWl0czogdXNlQ2hlY2tib3hFbWl0cyxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBmdW5jdGlvbiBnZXRJbm5lciAoaXNUcnVlLCBpc0luZGV0ZXJtaW5hdGUpIHtcbiAgICAgIGNvbnN0IGljb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgICAoaXNUcnVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyBwcm9wcy5jaGVja2VkSWNvblxuICAgICAgICAgIDogKGlzSW5kZXRlcm1pbmF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IHByb3BzLmluZGV0ZXJtaW5hdGVJY29uXG4gICAgICAgICAgICAgIDogcHJvcHMudW5jaGVja2VkSWNvblxuICAgICAgICAgICAgKVxuICAgICAgICApIHx8IG51bGxcbiAgICAgIClcblxuICAgICAgcmV0dXJuICgpID0+IChcbiAgICAgICAgaWNvbi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAga2V5OiAnaWNvbicsXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X19pY29uLWNvbnRhaW5lciBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiAncS1jaGVja2JveF9faWNvbicsXG4gICAgICAgICAgICAgICAgICBuYW1lOiBpY29uLnZhbHVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IFsgYmdOb2RlIF1cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gdXNlQ2hlY2tib3goJ2NoZWNrYm94JywgZ2V0SW5uZXIpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJwLTEgYWRkUGFkZGluZyBmbGV4IGZsZXgtcm93IGp1c3RpZnktc3RhcnQgaXRlbXMtY2VudGVyXCJcclxuICAgICAgQGNsaWNrLnN0b3A9XCJoYW5kbGVDbGlja1wiXHJcbiAgICA+XHJcbiAgICAgIHt7IGxvY2FsVHlwZS5uYW1lIH19XHJcbiAgICAgIDxzcGFuIHYtaWY9XCJsb2NhbFR5cGUuY2hpbGRyZW4/Lmxlbmd0aCAhPSAwXCI+XHJcbiAgICAgICAgPHEtaWNvbiBuYW1lPVwiZXhwYW5kX21vcmVcIiAvPlxyXG4gICAgICA8L3NwYW4+XHJcblxyXG4gICAgICA8cS1jaGVja2JveFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgY2xhc3M9XCJtLTAgbWwtYXV0b1wiXHJcbiAgICAgICAgc2l6ZT1cInhzXCJcclxuICAgICAgICA6bW9kZWwtdmFsdWU9XCJpc1NlbGVjdGVkXCJcclxuICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gc2V0U2VsZWN0ZWQodmFsKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IHYtc2hvdz1cInNob3dLaWRzXCIgdi1mb3I9XCIodCwgaW5kZXgpIGluIGxvY2FsVHlwZS5jaGlsZHJlblwiIDprZXk9XCJpbmRleFwiPlxyXG4gICAgICA8VHlwZU9wdGlvbiA6dHlwZT1cInRcIiA6dG9yb290PVwidG9yb290ICsgMVwiIC8+XHJcbiAgICAgIDxUeXBlT3B0aW9uIHYtaWY9XCJpbmRleCA9PSBsb2NhbFR5cGUuY2hpbGRyZW4ubGVuZ3RoIC0gMVwiXHJcbiAgICAgIDp0eXBlPVwie2lkOmxvY2FsVHlwZS5pZCxuYW1lOifQhtC90YjQtScsY2hpbGRyZW46IFtdfVwiXHJcbiAgICAgIDp0b3Jvb3Q9XCJ0b3Jvb3QgKyAxXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSBcInZ1ZXhcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiVHlwZU9wdGlvblwiLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0eXBlOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXHJcbiAgICB0b3Jvb3Q6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAxIH0sXHJcbiAgICBwYXJlbnRTaG93S2lkczogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxyXG4gICAgbWFueTogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGlzU2VsZWN0ZWQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmlzVHlwZVNlbGVjdGVkKHRoaXMubG9jYWxUeXBlLmlkKTtcclxuICAgIH0sXHJcbiAgICBsZWZ0UGFkZGluZygpIHtcclxuICAgICAgcmV0dXJuICh0aGlzLnRvcm9vdCAtIDEpICogOCArIFwicHhcIjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0tpZHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3Q6IGZhbHNlLFxyXG4gICAgICBsb2NhbFR5cGU6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMubG9jYWxUeXBlID0gdGhpcy50eXBlO1xyXG4gLy8gICBjb25zb2xlLmxvZyh0aGlzLmxvY2FsVHlwZS5jaGlsZHJlbilcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIC8vIGlucHV0KGlkKSB7XHJcbiAgICAvLyAgIHRoaXMuJGVtaXQoXCJpbnB1dFwiLCBpZCk7XHJcbiAgICAvLyB9LFxyXG4gICAgaGFuZGxlQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5sb2NhbFR5cGUuY2hpbGRyZW4/Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxvY2FsVHlwZSk7XHJcbiAgICAgIC8vdGhpcy5pbnB1dCh0aGlzLmxvY2FsVHlwZS5pZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxvY2FsVHlwZSlcclxuICAgICAgICB0aGlzLnNob3dLaWRzID0gIXRoaXMuc2hvd0tpZHM7XHJcbiAgICB9XHJcbiAgfSxcclxuICAgIHNldFNlbGVjdGVkKHZhbCkge1xyXG4gICAgICBpZiAodmFsID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChcIlNFTEVDVF9UWVBFXCIsIHtcclxuICAgICAgICAgIHR5cGU6IHRoaXMubG9jYWxUeXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiREVTRUxFQ1RfVFlQRVwiLCB7XHJcbiAgICAgICAgICB0eXBlOiB0aGlzLmxvY2FsVHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgaGFuZGxlcihuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgIHRoaXMubG9jYWxUeXBlID0gbmV3VmFsO1xyXG4gLy8gICAgICAgY29uc29sZS5sb2cobmV3VmFsLmNoaWxkcmVuKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudFNob3dLaWRzKHZhbCkge1xyXG4gICAgICBpZiAodmFsID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93S2lkcyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG48c3R5bGUgc2NvcGVkPlxyXG4uYWRkUGFkZGluZyB7XHJcbiAgcGFkZGluZy1sZWZ0OiB2LWJpbmQoXCJsZWZ0UGFkZGluZ1wiKTtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxUeXBlRmlsdGVyT3B0aW9uIHYtaWY9XCJhbGxcIiA6dHlwZT1cImFsbFwiIC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IG1hcEdldHRlcnMgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgVHlwZUZpbHRlck9wdGlvbiBmcm9tIFwiLi9UeXBlRmlsdGVyT3B0aW9uLnZ1ZVwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czogeyBUeXBlRmlsdGVyT3B0aW9uIH0sXHJcbiAgbmFtZTogXCJUeXBlc1NlbGVjdG9yXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXHJcbiAgICB0YWJpbmRleDoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICB9LFxyXG4gICAgbWFueToge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwR2V0dGVycyh7XHJcbiAgICAgIHR5cGVzOiBcImdldEV2ZW50VHlwZXNUcmVlXCIsXHJcbiAgICAgIHR5cGVzU3RhdHVzOiBcImdldEV2ZW50VHlwZXNTdGF0dXNcIixcclxuICAgICAgbGVhZlR5cGVzOiBcImdldExlYWZUeXBlc1wiLFxyXG4gICAgICBzZWxlY3RlZExlYWZUeXBlczogXCJnZXRTZWxlY3RlZExlYWZUeXBlc1wiLFxyXG4gICAgfSksXHJcbiAgICBhbGwoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogXCLQktGB0ZYg0YLQuNC/0LhcIixcclxuICAgICAgICBjaGlsZHJlbjogdGhpcy50eXBlcyA/PyBbXSxcclxuICAgICAgICBpZDogMCxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICB0eXBlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sZWFmVHlwZXMuZmluZCgoeCkgPT4geC5pZCA9PSB0aGlzLnZhbHVlKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0tpZHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmdldFR5cGVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVzKVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGdldFR5cGVzKCkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy50eXBlcy5sZW5ndGggPCAxXHJcbiAgICAgICAgICA/IHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiR0VUX0VWRU5UX1RZUEVTX1RSRUVcIilcclxuICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcbiAgICAvLyBpbnB1dChpZCkge1xyXG4gICAgLy8gICB0aGlzLnNob3dLaWRzID0gZmFsc2U7XHJcbiAgICAvLyAgIHRoaXMuJGVtaXQoXCJpbnB1dFwiLCBpZCk7XHJcbiAgICAvLyB9LFxyXG4gICAgZ2V0TGFiZWwoKSB7XHJcbiAgICAgIGlmICh0aGlzLnR5cGVzU3RhdHVzID09IFwibG9hZGluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwi0JfQsNCy0LDQvdGC0LDQttC10L3QvdGPLi4uXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlc1N0YXR1cyA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICByZXR1cm4gXCLQndC1INCy0LTQsNC70L7RgdGMINC30LDQstCw0L3RgtCw0LbQuNGC0Lgg0YLQuNC/0LhcIjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy50eXBlID09IG51bGwgPyBcIlNlbGVjdCB0eXBlXCIgOiB0aGlzLnR5cGUubmFtZTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZT48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2wgZ2FwLTEgdy1mdWxsXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1iYXNlXCI+XHJcbiAgICAgIDxoNT7QpNGW0LvRjNGC0YDQuDwvaDU+XHJcbiAgICAgIDxxLWljb25cclxuICAgICAgICBAY2xpY2s9XCIkZW1pdCgnY2xvc2UnKVwiXHJcbiAgICAgICAgbmFtZT1cImNsb3NlXCJcclxuICAgICAgICBjbGFzcz1cIm1sLWF1dG8gY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxEYXRlVGltZUlucHV0XHJcbiAgICAgIDpkZW5zZT1cInRydWVcIlxyXG4gICAgICBjbGFzcz1cImZsZXgtbm9uZSB3LWZ1bGxcIlxyXG4gICAgICBsYWJlbD1cItCn0LDRgSDQv9C+0YfQsNGC0LrRg1wiXHJcbiAgICAgIDp2YWx1ZT1cImZpbHRlcnMuc3RhcnRUaW1lID8/IG51bGxcIlxyXG4gICAgICA6bWluPVwibmV3IERhdGUoKS50b0lTT1N0cmluZygpXCJcclxuICAgICAgQGlucHV0PVwiKHYpID0+IChmaWx0ZXJzLnN0YXJ0VGltZSA9IHYpXCJcclxuICAgIC8+XHJcbiAgICA8RGF0ZVRpbWVJbnB1dFxyXG4gICAgICA6ZGVuc2U9XCJ0cnVlXCJcclxuICAgICAgY2xhc3M9XCJmbGV4LW5vbmUgdy1mdWxsXCJcclxuICAgICAgbGFiZWw9XCLQp9Cw0YEg0LfQsNC60ZbQvdGH0LXQvdC90Y9cIlxyXG4gICAgICA6dmFsdWU9XCJmaWx0ZXJzLmVuZFRpbWUgPz8gbnVsbFwiXHJcbiAgICAgIDptaW49XCJmaWx0ZXJzLnN0YXJ0VGltZSA/PyBudWxsXCJcclxuICAgICAgQGlucHV0PVwiKHYpID0+IChmaWx0ZXJzLmVuZFRpbWUgPSB2KVwiXHJcbiAgICAvPlxyXG4gICAgPHR5cGVzLXNlbGVjdG9yIGNsYXNzPVwiZmxleC1ub25lXCIgLz5cclxuICAgIDwhLS1cclxuICAgICAgPGRpdiBjbGFzcz1cInByLTEgZmxleCBmbGV4LXJvdyBqdXN0aWZ5LXN0YXJ0IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICBTaG93IHR5cGVzIHdpdGggbm8gdGltZVxyXG4gICAgICA8cS1jaGVja2JveFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgY2xhc3M9XCJtLTAgbWwtYXV0b1wiXHJcbiAgICAgICAgc2l6ZT1cInhzXCJcclxuICAgICAgICA6bW9kZWwtdmFsdWU9XCJpc1NlbGVjdGVkXCJcclxuICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gc2V0U2VsZWN0ZWQodmFsKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICAgICAgLS0+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICBkZW5zZVxyXG4gICAgICBjbGFzcz1cImZsZXgtbm9uZVwiXHJcbiAgICAgIGxhYmVsPVwi0JLRltC00YHRgtCw0L3RjCDQsiDQvNC10YLRgNCw0YVcIlxyXG4gICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgdi1tb2RlbD1cImZpbHRlcnMuZGlzdGFuY2VcIlxyXG4gICAgICBjbGVhcmFibGVcclxuICAgIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICBjbGFzcz1cImZsZXgtbm9uZVwiXHJcbiAgICAgIGRlbnNlXHJcbiAgICAgIGJvdHRvbS1zbG90c1xyXG4gICAgICB2LW1vZGVsPVwiZmlsdGVycy51c2VyUG9pbnRcIlxyXG4gICAgICBsYWJlbD1cItCb0L7QutCw0YbRltGPXCJcclxuICAgICAgcmVhZG9ubHlcclxuICAgID5cclxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxyXG4gICAgICAgIDxxLWljb24gbmFtZT1cInBsYWNlXCIgQGNsaWNrPVwic2V0TG9jYXRpb24oKVwiIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIG5hbWU9XCJjbG9zZVwiXHJcbiAgICAgICAgICBAY2xpY2s9XCJmaWx0ZXJzLnVzZXJQb2ludCA9ICcnXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcblxyXG4gICAgPGRpdiBpZD1cIm1hcDFcIiBjbGFzcz1cInctZnVsbCBmbGV4LTFcIj48L2Rpdj5cclxuICAgIDxxLWJ0biBjbGFzcz1cInctZnVsbCBmbGV4LW5vbmVcIiBAY2xpY2s9XCJ1cGRhdGVGaWx0ZXJzXCI+0J7QvdC+0LLQuNGC0Lg8L3EtYnRuPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IERhdGVUaW1lSW5wdXQgZnJvbSBcInNyYy9jb21wb25lbnRzL0RhdGVUaW1lSW5wdXQudnVlXCI7XHJcbmltcG9ydCBUeXBlc1NlbGVjdG9yIGZyb20gXCJzcmMvY29tcG9uZW50cy9UeXBlc0ZpbHRlci52dWVcIjtcclxuaW1wb3J0IHsgbWFwR2V0dGVycyB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBMLCB7IGxhdExuZyB9IGZyb20gXCJsZWFmbGV0XCI7XHJcbmltcG9ydCB7IHNldEN1cnJlbnRUaW1lIH0gZnJvbSBcInNyYy9jb252ZXJ0RGF0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIERhdGVUaW1lSW5wdXQsXHJcbiAgICBUeXBlc1NlbGVjdG9yLFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICBzdGFydFRpbWU6IG51bGwsXHJcbiAgICAgICAgZW5kVGltZTogbnVsbCxcclxuICAgICAgICBkaXN0YW5jZTogbnVsbCxcclxuICAgICAgICB1c2VyUG9pbnQ6IG51bGwsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICB0eXBlczogXCJnZXRTZWxlY3RlZFR5cGVzXCIsXHJcbiAgICB9KSxcclxuICAgIHN0YXJ0VGltZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5zdGFydFRpbWU7XHJcbiAgICB9LFxyXG4gICAgZW5kVGltZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5lbmRUaW1lO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmdldEZpbHRlcnMoKTtcclxuICAgIHRoaXMuY2lyY2xlID0gbnVsbDtcclxuICAgIHRoaXMuc2hvd01hcCgpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInR5cGVzRmlsdGVyc1wiKSk7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJzLnN0YXJ0VGltZSA9PSBudWxsKVxyXG4gICAgICB0aGlzLmZpbHRlcnMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5maWx0ZXJzKTtcclxuICAgIHRoaXMuc2hvd0NpcmNsZSh0aGlzLnRvTGF0TG5nKHRoaXMuZmlsdGVycy51c2VyUG9pbnQpKTtcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBzdGFydFRpbWU6IHtcclxuICAgICAgaGFuZGxlcih2YWwsIGxhc3QpIHtcclxuICAgICAgICBpZiAobGFzdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICBsZXQgd2l0aEN1cnJlbnRUaW1lID0gc2V0Q3VycmVudFRpbWUobGFzdCk7XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuc3RhcnRUaW1lID0gd2l0aEN1cnJlbnRUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmVuZFRpbWUgIT0gbnVsbCAmJiB2YWwgPiB0aGlzLmZpbHRlcnMuZW5kVGltZSkge1xyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLmVuZFRpbWUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGVuZFRpbWUodmFsLCBsYXN0KSB7XHJcbiAgICAgIGlmIChsYXN0ID09IG51bGwpIHtcclxuICAgICAgICBsZXQgd2l0aEN1cnJlbnRUaW1lID0gc2V0Q3VycmVudFRpbWUobGFzdCk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLmVuZFRpbWUgPSB3aXRoQ3VycmVudFRpbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCAhPSBcIlwiICYmIHZhbCA8PSB0aGlzLmZpbHRlcnMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLmVuZFRpbWUgPSB0aGlzLmZpbHRlcnMuc3RhcnRUaW1lO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJmaWx0ZXJzLmRpc3RhbmNlXCI6IGZ1bmN0aW9uIChuZXdEaXN0YW5jZSkge1xyXG4gICAgICBpZiAodGhpcy5jaXJjbGUpIHtcclxuICAgICAgICB0aGlzLmNpcmNsZS5zZXRSYWRpdXMobmV3RGlzdGFuY2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgdXBkYXRlRmlsdGVycygpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLFxyXG4gICAgICAgIHRoaXMudHlwZXMsXHJcbiAgICAgICAgdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRTZWxlY3RlZFR5cGVzXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKFwiU0FWRV9UWVBFX0ZJTFRFUlNcIik7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZmlsdGVyc1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlcnMpKTtcclxuXHJcbiAgICAgIGxldCB0eXBlc18gPSBPYmplY3Qua2V5cyh0aGlzLnR5cGVzKTtcclxuICAgICAgdHlwZXNfID0gdHlwZXNfLmZpbHRlcigoeCkgPT4gdGhpcy50eXBlc1t4XSA9PSB0cnVlKTtcclxuXHJcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgeyAuLi50aGlzLmZpbHRlcnMsIHR5cGVzOiB0eXBlc18gfSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0RmlsdGVycygpIHtcclxuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJHRVRfVFlQRV9GSUxURVJTXCIpO1xyXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmaWx0ZXJzXCIpKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpbHRlcnNcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMuZGlzdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVycy5kaXN0YW5jZSA9IDMwMDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZmlsdGVycy51c2VyUG9pbnQgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVycy51c2VyUG9pbnQgPSBcIjUwLjQ1MTkzNzU4NywgMzAuNTE5MzMyODg2XCI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRMb2NhdGlvbigpIHt9LFxyXG4gICAgc2hvd01hcCgpIHtcclxuICAgICAgdGhpcy5tYXAgPSBMLm1hcChcIm1hcDFcIikuc2V0VmlldyhbNTAuNDQsIDMwLjU2XSwgMTMpO1xyXG4gICAgICBMLnRpbGVMYXllcihcImh0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nXCIsIHtcclxuICAgICAgICBtYXhab29tOiAxOSxcclxuICAgICAgfSkuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgICB0aGlzLm1hcmtlciA9IG51bGw7XHJcbiAgICAgIHRoaXMubWFwLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGF0bG5nID0gZXZlbnQubGF0bG5nO1xyXG4gICAgICAgIHRoaXMuc2hvd0NpcmNsZShsYXRsbmcpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd0NpcmNsZShsYXRsbmcpIHtcclxuICAgICAgaWYgKHRoaXMubWFya2VyKSB7XHJcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmNpcmNsZSkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMuY2lyY2xlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5tYXJrZXIgPSBMLm1hcmtlcihsYXRsbmcpLmFkZFRvKHRoaXMubWFwKTtcclxuICAgICAgdGhpcy5maWx0ZXJzLnVzZXJQb2ludCA9IGAke2xhdGxuZy5sYXQudG9GaXhlZCg5KX0sICR7bGF0bG5nLmxuZy50b0ZpeGVkKFxyXG4gICAgICAgIDlcclxuICAgICAgKX1gO1xyXG4gICAgICB0aGlzLmNpcmNsZSA9IEwuY2lyY2xlKHRoaXMubWFya2VyLmdldExhdExuZygpLCB7XHJcbiAgICAgICAgY29sb3I6IFwicmVkXCIsXHJcbiAgICAgICAgZmlsbENvbG9yOiBcIiNmMDNcIixcclxuICAgICAgICBmaWxsT3BhY2l0eTogMC4yLFxyXG4gICAgICAgIHJhZGl1czogdGhpcy5maWx0ZXJzLmRpc3RhbmNlLFxyXG4gICAgICB9KS5hZGRUbyh0aGlzLm1hcCk7XHJcblxyXG4gICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5jaXJjbGUuZ2V0Qm91bmRzKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0xhdExuZyhzdHJpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coc3RyaW5nKTtcclxuICAgICAgbGV0IGZsb2F0cyA9IHN0cmluZy5zcGxpdChcIiwgXCIpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgbGV0IHJlcyA9IHt9O1xyXG4gICAgICByZXMubGF0ID0gZmxvYXRzWzBdO1xyXG4gICAgICByZXMubG5nID0gZmxvYXRzWzFdO1xyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwiYmctYmx1ZS0xMDAgYmctb3BhY2l0eS04MCB0b3AtMCBsZWZ0LTAgdy1mdWxsIHB4LTQgcHktMiBmbGV4IGZsZXgtcm93IGdhcC0yIGJvcmRlci1ncmF5LTQwMCBib3JkZXItYiBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXJcIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJyZWxhdGl2ZSBmbGV4LTEgbWF4LXctbWRcIj5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgdi1tb2RlbD1cInRleHRcIlxyXG4gICAgICAgIGNsYXNzPVwiYmctdHJhbnNwYXJlbnQgcC00IHByLTggYm9yZGVyIGJvcmRlci1ncmF5LTgwMCB3LWZ1bGwgaC0xMCBmb2N1czpib3JkZXItYmxhY2sgcm91bmRlZC0yeGxcIlxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWJzb2x1dGUgcmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICA8cS1pY29uIHYtaWY9XCJ0ZXh0ID09PSAnJ1wiIG5hbWU9XCJzZWFyY2hcIiBzaXplPVwic21cIiAvPlxyXG4gICAgICAgIDxxLWljb24gdi1lbHNlIG5hbWU9XCJjbGVhclwiIEBjbGljaz1cInRleHQgPSAnJ1wiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPEZpbHRlckljb24gQGNsaWNrPVwic2hvd0ZpbHRlcnNcIiAvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgU2VhcmNoSWNvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9pY29ucy9TZWFyY2hJY29uLnZ1ZVwiO1xyXG5pbXBvcnQgRmlsdGVySWNvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9pY29ucy9GaWx0ZXJJY29uLnZ1ZVwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgRmlsdGVySWNvbixcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBzZWFyY2hUZXh0OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJcIiB9LFxyXG4gIH0sXHJcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dDogdGhpcy5zZWFyY2hUZXh0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICB0ZXh0KCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBzaG93RmlsdGVycygpIHtcclxuICAgICAgdGhpcy4kZW1pdChcInNob3dGaWx0ZXJzXCIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVRleHQoKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVUZXh0XCIsIHRoaXMudGV4dCk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJzdHlsZSIsInNpemUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX2NyZWF0ZUJsb2NrIiwiX3NmY19tYWluIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWVBLE1BQU0sV0FBVztBQUVqQixJQUFBLFVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sY0FBYztBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVyxPQUFLLENB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
