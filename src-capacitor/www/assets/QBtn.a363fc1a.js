import { c as computed, h, B as isRuntimeSsrPreHydration, r as ref, o as onMounted, w as watch, i as inject, u as onBeforeUnmount, a1 as formKey, g as getCurrentInstance, a2 as debounce, a3 as injectProp, a4 as onBeforeUpdate, x as stopAndPrevent, D as nextTick, G as onDeactivated, H as onActivated, a5 as prevent, a6 as Transition, z as shouldIgnoreKey, a7 as client, V as stop, v as withDirectives, y as isKeyCode, E as listenOpts } from "./index.6764d851.js";
import { f as useSizeDefaults, c as createComponent, u as uid, Q as QIcon, h as hSlot, i as useSizeProps, b as useRouterLinkProps, j as useSize, d as useRouterLink, a as hMergeSlot, R as Ripple } from "./uid.627d4ed7.js";
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
var QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
function parseValue(val) {
  return val === void 0 || val === null ? null : val;
}
function getId(val, required) {
  return val === void 0 || val === null ? required === true ? `f_${uid()}` : null : val;
}
function useId({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0 ? ref(parseValue(getValue())) : ref(null);
    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${uid()}`;
      });
    }
    if (getValue !== void 0) {
      watch(getValue, (newId) => {
        id.value = getId(newId, required);
      });
    }
    return id;
  }
  return getValue !== void 0 ? computed(() => getId(getValue(), required)) : ref(`f_${uid()}`);
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: false,
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const canDebounceValidate = computed(() => props.disable !== true && hasRules.value === true && innerLoading.value === false);
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;
    if (canDebounceValidate.value === true && props.lazyRules === false) {
      debouncedValidate();
    }
  });
  function onRulesChange() {
    if (props.lazyRules !== "ondemand" && canDebounceValidate.value === true && isDirtyModel.value === true) {
      debouncedValidate();
    }
  }
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(() => props.lazyRules, onRulesChange);
  watch(focused, (val) => {
    if (val === true) {
      isDirtyModel.value = true;
    } else if (canDebounceValidate.value === true && props.lazyRules !== "ondemand") {
      debouncedValidate();
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (props.disable === true || hasRules.value === false) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
  const { attrs, vnode } = getCurrentInstance();
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState({ requiredForAttr = true, tagProp } = {}) {
  const { props, proxy } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });
  return {
    requiredForAttr,
    tag: tagProp === true ? computed(() => props.tag) : { value: "label" },
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(),
    targetUid,
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {};
    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    }
    return acc;
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    if (String(props.modelValue) !== val && (props.modelValue !== null || val !== "")) {
      emitValue(val, true);
    }
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const useFormProps = {
  name: String
};
function useFormAttrs(props) {
  return computed(() => ({
    type: "hidden",
    name: props.name,
    value: props.modelValue
  }));
}
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true)
        return;
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props) {
  return computed(() => {
    const align = props.align === void 0 ? props.vertical === true ? "stretch" : "left" : props.align;
    return `${props.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const btnDesignOptions = ["flat", "outline", "push", "unelevated"];
const getBtnDesign = (props, defaultValue) => {
  if (props.flat === true)
    return "flat";
  if (props.outline === true)
    return "outline";
  if (props.push === true)
    return "push";
  if (props.unelevated === true)
    return "unelevated";
  return defaultValue;
};
const useBtnProps = {
  ...useSizeProps,
  ...useRouterLinkProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...btnDesignOptions.reduce(
    (acc, val) => (acc[val] = Boolean) && acc,
    {}
  ),
  square: Boolean,
  round: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
function useBtn(props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: "button"
  });
  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false ? sizeStyle.value : {};
    return props.padding !== void 0 ? Object.assign({}, obj, {
      padding: props.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props.rounded === true || props.fab === true || props.fabMini === true
  );
  const isActionable = computed(
    () => props.disable !== true && props.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props.tabindex || 0 : -1);
  const design = computed(() => getBtnDesign(props, "standard"));
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    } else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }
    if (linkTag.value === "a") {
      if (props.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    } else if (props.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${props.textColor || props.color}`;
      } else {
        colors = `bg-${props.color} text-${props.textColor || "white"}`;
      }
    } else if (props.textColor) {
      colors = `text-${props.textColor}`;
    }
    const shape = props.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props.disable === true ? " disabled" : "") + (props.fab === true ? " q-btn--fab" : props.fabMini === true ? " q-btn--fab-mini" : "") + (props.noCaps === true ? " q-btn--no-uppercase" : "") + (props.dense === true ? " q-btn--dense" : "") + (props.stretch === true ? " no-border-radius self-stretch" : "") + (props.glossy === true ? " glossy" : "") + (props.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props.stack === true ? " column" : " row") + (props.noWrap === true ? " no-wrap text-no-wrap" : "") + (props.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasLink,
      linkTag,
      navigateOnClick,
      isActionable
    } = useBtn(props);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
    const hasLabel = computed(
      () => props.label !== void 0 && props.label !== null && props.label !== ""
    );
    const ripple = computed(() => props.disable === true || props.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props.ripple === true ? {} : props.ripple
    });
    const rippleProps = computed(() => ({ center: props.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };
        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0 ? "" : "Passive";
          acc[`onTouchstart${suffix}`] = onTouchstart;
        }
        return acc;
      }
      return {
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null)
        return;
      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return;
        }
        const el = document.activeElement;
        if (props.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      navigateOnClick(e);
    }
    function onKeydown(e) {
      if (rootRef.value === null)
        return;
      emit("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null)
        return;
      emit("touchstart", e);
      if (e.defaultPrevented === true)
        return;
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null)
        return;
      e.qSkipRipple = avoidMouseRipple === true;
      emit("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null)
        return;
      if (e !== void 0 && e.type === "blur" && document.activeElement === rootRef.value) {
        return;
      }
      if (e !== void 0 && e.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value !== null && rootRef.value.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    onBeforeUnmount(() => {
      cleanup(true);
    });
    Object.assign(proxy, { click: onClick });
    return () => {
      let inner = [];
      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack !== true && hasLabel.value === true,
          role: "img",
          "aria-hidden": "true"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack !== true && hasLabel.value === true,
            role: "img",
            "aria-hidden": "true"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
export { QSpinner as Q, useDark as a, useFormProps as b, useFormInject as c, QInput as d, QBtn as e, addFocusWaitFlag as f, addFocusFn as g, useFormAttrs as h, useAlignProps as i, useAlign as j, useFieldProps as k, useFieldEmits as l, useField as m, useFieldState as n, useFormInputNameAttr as o, fieldValueIsFilled as p, useKeyComposition as q, removeFocusWaitFlag as r, useFileFormDomProps as s, useDarkProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi5hMzYzZmMxYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGlubmVyL3VzZS1zcGlubmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGlubmVyL1FTcGlubmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1pZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1mb3JtLWNoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcGF0dGVybnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1zcGxpdC1hdHRycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC91c2UtbWFzay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWtleS1jb21wb3NpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvUUlucHV0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYWxpZ24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi91c2UtYnRuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vUUJ0bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVNpemVEZWZhdWx0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogJzFlbSdcbiAgfSxcbiAgY29sb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VTcGlubmVyIChwcm9wcykge1xuICByZXR1cm4ge1xuICAgIGNTaXplOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zaXplIGluIHVzZVNpemVEZWZhdWx0c1xuICAgICAgICA/IGAkeyB1c2VTaXplRGVmYXVsdHNbIHByb3BzLnNpemUgXSB9cHhgXG4gICAgICAgIDogcHJvcHMuc2l6ZVxuICAgICkpLFxuXG4gICAgY2xhc3NlczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNwaW5uZXInICsgKHByb3BzLmNvbG9yID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU3Bpbm5lciwgeyB1c2VTcGlubmVyUHJvcHMgfSBmcm9tICcuL3VzZS1zcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTcGlubmVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVNwaW5uZXJQcm9wcyxcblxuICAgIHRoaWNrbmVzczoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBjb25zdCB7IGNTaXplLCBjbGFzc2VzIH0gPSB1c2VTcGlubmVyKHByb3BzKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ3N2ZycsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlICsgJyBxLXNwaW5uZXItbWF0JyxcbiAgICAgIHdpZHRoOiBjU2l6ZS52YWx1ZSxcbiAgICAgIGhlaWdodDogY1NpemUudmFsdWUsXG4gICAgICB2aWV3Qm94OiAnMjUgMjUgNTAgNTAnXG4gICAgfSwgW1xuICAgICAgaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3BhdGgnLFxuICAgICAgICBjeDogJzUwJyxcbiAgICAgICAgY3k6ICc1MCcsXG4gICAgICAgIHI6ICcyMCcsXG4gICAgICAgIGZpbGw6ICdub25lJyxcbiAgICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHByb3BzLnRoaWNrbmVzcyxcbiAgICAgICAgJ3N0cm9rZS1taXRlcmxpbWl0JzogJzEwJ1xuICAgICAgfSlcbiAgICBdKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VEYXJrUHJvcHMgPSB7XG4gIGRhcms6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsICRxKSB7XG4gIC8vIHJldHVybiBpc0RhcmtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kYXJrID09PSBudWxsXG4gICAgICA/ICRxLmRhcmsuaXNBY3RpdmVcbiAgICAgIDogcHJvcHMuZGFya1xuICApKVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVpZCBmcm9tICcuLi91dGlscy91aWQuanMnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUgKHZhbCkge1xuICByZXR1cm4gdmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsXG4gICAgPyBudWxsXG4gICAgOiB2YWxcbn1cblxuZnVuY3Rpb24gZ2V0SWQgKHZhbCwgcmVxdWlyZWQpIHtcbiAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbFxuICAgID8gKHJlcXVpcmVkID09PSB0cnVlID8gYGZfJHsgdWlkKCkgfWAgOiBudWxsKVxuICAgIDogdmFsXG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBcImlkXCIgd2hpY2ggaXMgYSByZWYoKSB0aGF0IGNhbiBiZSB1c2VkIGFzXG4gKiBhIHVuaXF1ZSBpZGVudGlmaWVyIHRvIGFwcGx5IHRvIGEgRE9NIG5vZGUgYXR0cmlidXRlLlxuICpcbiAqIE9uIFNTUiwgaXQgdGFrZXMgY2FyZSBvZiBnZW5lcmF0aW5nIHRoZSBpZCBvbiB0aGUgY2xpZW50IHNpZGUgKG9ubHkpIHRvXG4gKiBhdm9pZCBoeWRyYXRpb24gZXJyb3JzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBnZXRWYWx1ZSwgcmVxdWlyZWQgPSB0cnVlIH0gPSB7fSkge1xuICBpZiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgY29uc3QgaWQgPSBnZXRWYWx1ZSAhPT0gdm9pZCAwXG4gICAgICA/IHJlZihwYXJzZVZhbHVlKGdldFZhbHVlKCkpKVxuICAgICAgOiByZWYobnVsbClcblxuICAgIGlmIChyZXF1aXJlZCA9PT0gdHJ1ZSAmJiBpZC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgaWQudmFsdWUgPSBgZl8keyB1aWQoKSB9YCAvLyBnZXRJZChudWxsLCB0cnVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoZ2V0VmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgd2F0Y2goZ2V0VmFsdWUsIG5ld0lkID0+IHtcbiAgICAgICAgaWQudmFsdWUgPSBnZXRJZChuZXdJZCwgcmVxdWlyZWQpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgcmV0dXJuIGdldFZhbHVlICE9PSB2b2lkIDBcbiAgICA/IGNvbXB1dGVkKCgpID0+IGdldElkKGdldFZhbHVlKCksIHJlcXVpcmVkKSlcbiAgICA6IHJlZihgZl8keyB1aWQoKSB9YCkgLy8gZ2V0SWQobnVsbCwgdHJ1ZSlcbn1cbiIsImltcG9ydCB7IGluamVjdCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24sIHJlcXVpcmVzUUZvcm0gfSkge1xuICBjb25zdCAkZm9ybSA9IGluamVjdChmb3JtS2V5LCBmYWxzZSlcblxuICBpZiAoJGZvcm0gIT09IGZhbHNlKSB7XG4gICAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvcnQgcHVibGljIG1ldGhvZCAoc28gaXQgY2FuIGJlIHVzZWQgaW4gUUZvcm0pXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kaXNhYmxlLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB0eXBlb2YgcmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gcmVnaXN0ZXIgdG8gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAvLyB1bi1yZWdpc3RlciBmcm9tIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcbiAgfVxuICBlbHNlIGlmIChyZXF1aXJlc1FGb3JtID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignUGFyZW50IFFGb3JtIG5vdCBmb3VuZCBvbiB1c2VGb3JtQ2hpbGQoKSEnKVxuICB9XG59XG4iLCIvLyBmaWxlIHJlZmVyZW5jZWQgZnJvbSBkb2NzXG5cbmNvbnN0XG4gIGhleCA9IC9eI1swLTlhLWZBLUZdezN9KFswLTlhLWZBLUZdezN9KT8kLyxcbiAgaGV4YSA9IC9eI1swLTlhLWZBLUZdezR9KFswLTlhLWZBLUZdezR9KT8kLyxcbiAgaGV4T3JIZXhhID0gL14jKFswLTlhLWZBLUZdezN9fFswLTlhLWZBLUZdezR9fFswLTlhLWZBLUZdezZ9fFswLTlhLWZBLUZdezh9KSQvLFxuICByZ2IgPSAvXnJnYlxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pXFwpJC8sXG4gIHJnYmEgPSAvXnJnYmFcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwoMHwwXFwuWzAtOV0rWzEtOV18MFxcLlsxLTldK3wxKVxcKSQvXG5cbi8vIEtlZXAgaW4gc3luYyB3aXRoIHVpL3R5cGVzL2FwaS92YWxpZGF0aW9uLmQudHNcbmV4cG9ydCBjb25zdCB0ZXN0UGF0dGVybiA9IHtcbiAgZGF0ZTogdiA9PiAvXi0/W1xcZF0rXFwvWzAtMV1cXGRcXC9bMC0zXVxcZCQvLnRlc3QodiksXG4gIHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICBmdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZDpbMC01XVxcZCQvLnRlc3QodiksXG4gIHRpbWVPckZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkKDpbMC01XVxcZCk/JC8udGVzdCh2KSxcblxuICAvLyAtLSBSRkMgNTMyMiAtLVxuICAvLyAtLSBBZGRlZCBpbiB2Mi42LjYgLS1cbiAgLy8gVGhpcyBpcyBhIGJhc2ljIGhlbHBlciB2YWxpZGF0aW9uLlxuICAvLyBGb3Igc29tZXRoaW5nIG1vcmUgY29tcGxleCAobGlrZSBSRkMgODIyKSB5b3Ugc2hvdWxkIHdyaXRlIGFuZCB1c2UgeW91ciBvd24gcnVsZS5cbiAgLy8gV2Ugd29uJ3QgYmUgYWNjZXB0aW5nIFBScyB0byBlbmhhbmNlIHRoZSBvbmUgYmVsb3cgYmVjYXVzZSBvZiB0aGUgcmVhc29uIGFib3ZlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZW1haWw6IHYgPT4gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdCh2KSxcblxuICBoZXhDb2xvcjogdiA9PiBoZXgudGVzdCh2KSxcbiAgaGV4YUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSxcbiAgaGV4T3JIZXhhQ29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodiksXG5cbiAgcmdiQ29sb3I6IHYgPT4gcmdiLnRlc3QodiksXG4gIHJnYmFDb2xvcjogdiA9PiByZ2JhLnRlc3QodiksXG4gIHJnYk9yUmdiYUNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcblxuICBoZXhPclJnYkNvbG9yOiB2ID0+IGhleC50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpLFxuICBoZXhhT3JSZ2JhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcbiAgYW55Q29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodikgfHwgcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGVzdFBhdHRlcm5cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZvcm1DaGlsZCBmcm9tICcuLi91c2UtZm9ybS1jaGlsZC5qcydcbmltcG9ydCB7IHRlc3RQYXR0ZXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGF0dGVybnMuanMnXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmNvbnN0IGxhenlSdWxlc1ZhbHVlcyA9IFsgdHJ1ZSwgZmFsc2UsICdvbmRlbWFuZCcgXVxuXG5leHBvcnQgY29uc3QgdXNlVmFsaWRhdGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge30sXG5cbiAgZXJyb3I6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gIG5vRXJyb3JJY29uOiBCb29sZWFuLFxuXG4gIHJ1bGVzOiBBcnJheSxcbiAgcmVhY3RpdmVSdWxlczogQm9vbGVhbixcbiAgbGF6eVJ1bGVzOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiBmYWxzZSwgLy8gc3RhdGVtZW50IHVubmVlZGVkIGJ1dCBhdm9pZHMgZnV0dXJlIHZ1ZSBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VzXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKGZhbHNlKVxuXG4gIHVzZUZvcm1DaGlsZCh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICBsZXQgdmFsaWRhdGVJbmRleCA9IDAsIHVud2F0Y2hSdWxlc1xuXG4gIGNvbnN0IGhhc1J1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ydWxlcyAhPT0gdm9pZCAwXG4gICAgJiYgcHJvcHMucnVsZXMgIT09IG51bGxcbiAgICAmJiBwcm9wcy5ydWxlcy5sZW5ndGggIT09IDBcbiAgKVxuXG4gIGNvbnN0IGNhbkRlYm91bmNlVmFsaWRhdGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgLy8gU2hvdWxkIG5vdCBoYXZlIGEgdmFsaWRhdGlvbiBpbiBwcm9ncmVzcyBhbHJlYWR5O1xuICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAmJiBpbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlXG4gICkpXG5cbiAgY29uc3QgaGFzRXJyb3IgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmVycm9yID09PSB0cnVlIHx8IGlubmVyRXJyb3IudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5lcnJvck1lc3NhZ2UubGVuZ3RoICE9PSAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG5cbiAgICBpZiAoXG4gICAgICBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAvLyB0cmlnZ2VyIHZhbGlkYXRpb24gaWYgbm90IHVzaW5nIGFueSBraW5kIG9mIGxhenktcnVsZXNcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gb25SdWxlc0NoYW5nZSAoKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgb25SdWxlc0NoYW5nZSwgeyBpbW1lZGlhdGU6IHRydWUsIGRlZXA6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubGF6eVJ1bGVzLCBvblJ1bGVzQ2hhbmdlKVxuXG4gIHdhdGNoKGZvY3VzZWQsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgIHZhbGlkYXRlSW5kZXgrK1xuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBjb25zdCBzZXREaXJ0eSA9IGlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgPyAoKSA9PiB7IGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWUgfVxuICAgICAgOiAoKSA9PiB7fVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBlcnIgPT09IHRydWUgJiYgc2V0RGlydHkoKVxuXG4gICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1zZyB8fCBudWxsXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbCwgdGVzdFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXMgIT09IHZvaWQgMCAmJiB1bndhdGNoUnVsZXMoKVxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzICYgcHJvcHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyByZXNldFZhbGlkYXRpb24sIHZhbGlkYXRlIH0pXG4gIGluamVjdFByb3AocHJveHksICdoYXNFcnJvcicsICgpID0+IGhhc0Vycm9yLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcblxuICAgIHZhbGlkYXRlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGxpc3RlbmVyUkUgPSAvXm9uW0EtWl0vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBhdHRycywgdm5vZGUgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYWNjID0ge1xuICAgIGxpc3RlbmVyczogcmVmKHt9KSxcbiAgICBhdHRyaWJ1dGVzOiByZWYoe30pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRycykge1xuICAgICAgaWYgKGtleSAhPT0gJ2NsYXNzJyAmJiBrZXkgIT09ICdzdHlsZScgJiYgbGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJpYnV0ZXNbIGtleSBdID0gYXR0cnNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdm5vZGUucHJvcHMpIHtcbiAgICAgIGlmIChsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICBsaXN0ZW5lcnNbIGtleSBdID0gdm5vZGUucHJvcHNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgYWNjLmF0dHJpYnV0ZXMudmFsdWUgPSBhdHRyaWJ1dGVzXG4gICAgYWNjLmxpc3RlbmVycy52YWx1ZSA9IGxpc3RlbmVyc1xuICB9XG5cbiAgb25CZWZvcmVVcGRhdGUodXBkYXRlKVxuXG4gIHVwZGF0ZSgpXG5cbiAgcmV0dXJuIGFjY1xufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIG9ubHkgY2FsbCBsYXN0IGZvY3VzIGhhbmRsZXIgKGNhbid0IGZvY3VzIG11bHRpcGxlIHRoaW5ncyBhdCBvbmNlKVxuICAgIHF1ZXVlWyBxdWV1ZS5sZW5ndGggLSAxIF0oKVxuICAgIHF1ZXVlID0gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNGbiAoZm4pIHtcbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDApIHtcbiAgICBmbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgcXVldWUucHVzaChmbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNGbiAoZm4pIHtcbiAgcXVldWUgPSBxdWV1ZS5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZuKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VJZCBmcm9tICcuLi91c2UtaWQuanMnXG5pbXBvcnQgdXNlVmFsaWRhdGUsIHsgdXNlVmFsaWRhdGVQcm9wcyB9IGZyb20gJy4vdXNlLXZhbGlkYXRlLmpzJ1xuaW1wb3J0IHVzZVNwbGl0QXR0cnMgZnJvbSAnLi4vdXNlLXNwbGl0LWF0dHJzLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCAhPT0gMFxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZyxcblxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInLCAncG9wdXBTaG93JywgJ3BvcHVwSGlkZScgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmllbGRTdGF0ZSAoeyByZXF1aXJlZEZvckF0dHIgPSB0cnVlLCB0YWdQcm9wIH0gPSB7fSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgY29uc3QgdGFyZ2V0VWlkID0gdXNlSWQoe1xuICAgIHJlcXVpcmVkOiByZXF1aXJlZEZvckF0dHIsXG4gICAgZ2V0VmFsdWU6ICgpID0+IHByb3BzLmZvclxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVxdWlyZWRGb3JBdHRyLFxuICAgIHRhZzogdGFnUHJvcCA9PT0gdHJ1ZVxuICAgICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy50YWcpXG4gICAgICA6IHsgdmFsdWU6ICdsYWJlbCcgfSxcblxuICAgIGlzRGFyayxcblxuICAgIGVkaXRhYmxlOiBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZVxuICAgICksXG5cbiAgICBpbm5lckxvYWRpbmc6IHJlZihmYWxzZSksXG4gICAgZm9jdXNlZDogcmVmKGZhbHNlKSxcbiAgICBoYXNQb3B1cE9wZW46IGZhbHNlLFxuXG4gICAgc3BsaXRBdHRyczogdXNlU3BsaXRBdHRycygpLFxuICAgIHRhcmdldFVpZCxcblxuICAgIHJvb3RSZWY6IHJlZihudWxsKSxcbiAgICB0YXJnZXRSZWY6IHJlZihudWxsKSxcbiAgICBjb250cm9sUmVmOiByZWYobnVsbClcblxuICAgIC8qKlxuICAgICAqIHVzZXIgc3VwcGxpZWQgYWRkaXRpb25hbHM6XG5cbiAgICAgKiBpbm5lclZhbHVlIC0gY29tcHV0ZWRcbiAgICAgKiBmbG9hdGluZ0xhYmVsIC0gY29tcHV0ZWRcbiAgICAgKiBpbnB1dFJlZiAtIGNvbXB1dGVkXG5cbiAgICAgKiBmaWVsZENsYXNzIC0gY29tcHV0ZWRcbiAgICAgKiBoYXNTaGFkb3cgLSBjb21wdXRlZFxuXG4gICAgICogY29udHJvbEV2ZW50cyAtIE9iamVjdCB3aXRoIGZuKGUpXG5cbiAgICAgKiBnZXRDb250cm9sIC0gZm5cbiAgICAgKiBnZXRJbm5lckFwcGVuZCAtIGZuXG4gICAgICogZ2V0Q29udHJvbENoaWxkIC0gZm5cbiAgICAgKiBnZXRTaGFkb3dDb250cm9sIC0gZm5cbiAgICAgKiBzaG93UG9wdXAgLSBmblxuICAgICAqL1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBzbG90cywgYXR0cnMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBmb2N1c291dFRpbWVyID0gbnVsbFxuXG4gIGlmIChzdGF0ZS5oYXNWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMubW9kZWxWYWx1ZSkpXG4gIH1cblxuICBpZiAoc3RhdGUuZW1pdFZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5lbWl0VmFsdWUgPSB2YWx1ZSA9PiB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5jb250cm9sRXZlbnRzID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb250cm9sRXZlbnRzID0ge1xuICAgICAgb25Gb2N1c2luOiBvbkNvbnRyb2xGb2N1c2luLFxuICAgICAgb25Gb2N1c291dDogb25Db250cm9sRm9jdXNvdXRcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgY2xlYXJWYWx1ZSxcbiAgICBvbkNvbnRyb2xGb2N1c2luLFxuICAgIG9uQ29udHJvbEZvY3Vzb3V0LFxuICAgIGZvY3VzXG4gIH0pXG5cbiAgaWYgKHN0YXRlLmNvbXB1dGVkQ291bnRlciA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29tcHV0ZWRDb3VudGVyID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmNvdW50ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICgnJyArIHByb3BzLm1vZGVsVmFsdWUpLmxlbmd0aFxuICAgICAgICAgIDogKEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUgPyBwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCA6IDApXG5cbiAgICAgICAgY29uc3QgbWF4ID0gcHJvcHMubWF4bGVuZ3RoICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHByb3BzLm1heGxlbmd0aFxuICAgICAgICAgIDogcHJvcHMubWF4VmFsdWVzXG5cbiAgICAgICAgcmV0dXJuIGxlbiArIChtYXggIT09IHZvaWQgMCA/ICcgLyAnICsgbWF4IDogJycpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBpc0RpcnR5TW9kZWwsXG4gICAgaGFzUnVsZXMsXG4gICAgaGFzRXJyb3IsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9ID0gdXNlVmFsaWRhdGUoc3RhdGUuZm9jdXNlZCwgc3RhdGUuaW5uZXJMb2FkaW5nKVxuXG4gIGNvbnN0IGZsb2F0aW5nTGFiZWwgPSBzdGF0ZS5mbG9hdGluZ0xhYmVsICE9PSB2b2lkIDBcbiAgICA/IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlKVxuICAgIDogY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuXG4gIGNvbnN0IHNob3VsZFJlbmRlckJvdHRvbSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuYm90dG9tU2xvdHMgPT09IHRydWVcbiAgICB8fCBwcm9wcy5oaW50ICE9PSB2b2lkIDBcbiAgICB8fCBoYXNSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmNvdW50ZXIgPT09IHRydWVcbiAgICB8fCBwcm9wcy5lcnJvciAhPT0gbnVsbFxuICApXG5cbiAgY29uc3Qgc3R5bGVUeXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5maWxsZWQgPT09IHRydWUpIHsgcmV0dXJuICdmaWxsZWQnIH1cbiAgICBpZiAocHJvcHMub3V0bGluZWQgPT09IHRydWUpIHsgcmV0dXJuICdvdXRsaW5lZCcgfVxuICAgIGlmIChwcm9wcy5ib3JkZXJsZXNzID09PSB0cnVlKSB7IHJldHVybiAnYm9yZGVybGVzcycgfVxuICAgIGlmIChwcm9wcy5zdGFuZG91dCkgeyByZXR1cm4gJ3N0YW5kb3V0JyB9XG4gICAgcmV0dXJuICdzdGFuZGFyZCdcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS1maWVsZCByb3cgbm8td3JhcCBpdGVtcy1zdGFydCBxLWZpZWxkLS0keyBzdHlsZVR5cGUudmFsdWUgfWBcbiAgICArIChzdGF0ZS5maWVsZENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAgOiAnJylcbiAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1yb3VuZGVkJyA6ICcnKVxuICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tc3F1YXJlJyA6ICcnKVxuICAgICsgKGZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWZsb2F0JyA6ICcnKVxuICAgICsgKGhhc0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1sYWJlbGVkJyA6ICcnKVxuICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kZW5zZScgOiAnJylcbiAgICArIChwcm9wcy5pdGVtQWxpZ25lZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taXRlbS1hbGlnbmVkIHEtaXRlbS10eXBlJyA6ICcnKVxuICAgICsgKHN0YXRlLmlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGFyaycgOiAnJylcbiAgICArIChzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgPyAnIHEtZmllbGQtLWF1dG8taGVpZ2h0JyA6ICcnKVxuICAgICsgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWZvY3VzZWQnIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWVycm9yJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWhpZ2hsaWdodGVkJyA6ICcnKVxuICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSAmJiBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLXdpdGgtYm90dG9tJyA6ICcnKVxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRpc2FibGVkJyA6IChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcmVhZG9ubHknIDogJycpKVxuICApXG5cbiAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fY29udHJvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCdcbiAgICArIChwcm9wcy5iZ0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmJnQ29sb3IgfWAgOiAnJylcbiAgICArIChcbiAgICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJyB0ZXh0LW5lZ2F0aXZlJ1xuICAgICAgICA6IChcbiAgICAgICAgICAgIHR5cGVvZiBwcm9wcy5zdGFuZG91dCA9PT0gJ3N0cmluZycgJiYgcHJvcHMuc3RhbmRvdXQubGVuZ3RoICE9PSAwICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBgICR7IHByb3BzLnN0YW5kb3V0IH1gXG4gICAgICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgKVxuICApXG5cbiAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmxhYmVsU2xvdCA9PT0gdHJ1ZSB8fCBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gIClcblxuICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fbGFiZWwgbm8tcG9pbnRlci1ldmVudHMgYWJzb2x1dGUgZWxsaXBzaXMnXG4gICAgKyAocHJvcHMubGFiZWxDb2xvciAhPT0gdm9pZCAwICYmIGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlID8gYCB0ZXh0LSR7IHByb3BzLmxhYmVsQ29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbnRyb2xTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgIGZvY3VzZWQ6IHN0YXRlLmZvY3VzZWQudmFsdWUsXG4gICAgZmxvYXRpbmdMYWJlbDogZmxvYXRpbmdMYWJlbC52YWx1ZSxcbiAgICBtb2RlbFZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgIGVtaXRWYWx1ZTogc3RhdGUuZW1pdFZhbHVlXG4gIH0pKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0ge31cblxuICAgIGlmIChzdGF0ZS50YXJnZXRVaWQudmFsdWUpIHtcbiAgICAgIGFjYy5mb3IgPSBzdGF0ZS50YXJnZXRVaWQudmFsdWVcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGxldCB0YXJnZXQgPSBzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBpZiAoZm9jdXNvdXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4gIT09IHZvaWQgMCAmJiB0aGVuKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJWYWx1ZSAoZSkge1xuICAgIC8vIHByZXZlbnQgYWN0aXZhdGluZyB0aGUgZmllbGQgYnV0IGtlZXAgZm9jdXMgb24gZGVza3RvcFxuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICBjb25zdCBlbCA9IChzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWUpIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAvLyBkbyBub3QgbGV0IGZvY3VzIGJlIHRyaWdnZXJlZFxuICAgICAgLy8gYXMgaXQgd2lsbCBtYWtlIHRoZSBuYXRpdmUgZmlsZSBkaWFsb2dcbiAgICAgIC8vIGFwcGVhciBmb3IgYW5vdGhlciBzZWxlY3Rpb25cbiAgICAgIHN0YXRlLmlucHV0UmVmLnZhbHVlLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICBlbWl0KCdjbGVhcicsIHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICBjb25zdCBpc0RpcnR5ID0gaXNEaXJ0eU1vZGVsLnZhbHVlXG4gICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gaXNEaXJ0eVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHNsb3RzLnByZXBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMucHJlcGVuZCgpKVxuICAgIClcblxuICAgIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBnZXRDb250cm9sQ29udGFpbmVyKCkpXG4gICAgKVxuXG4gICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9FcnJvckljb24gPT09IGZhbHNlICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnZXJyb3InLCBbXG4gICAgICAgIGgoUUljb24sIHsgbmFtZTogJHEuaWNvblNldC5maWVsZC5lcnJvciwgY29sb3I6ICduZWdhdGl2ZScgfSlcbiAgICAgIF0pXG4gICAgKVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgfHwgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZShcbiAgICAgICAgICAnaW5uZXItbG9hZGluZy1hcHBlbmQnLFxuICAgICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICAgIDogWyBoKFFTcGlubmVyLCB7IGNvbG9yOiBwcm9wcy5jb2xvciB9KSBdXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlICYmIHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItY2xlYXJhYmxlLWFwcGVuZCcsIFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2ZvY3VzYWJsZS1hY3Rpb24nLFxuICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IG51bGwsXG4gICAgICAgICAgICByb2xlOiBudWxsLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmdldENvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHN0YXRlLmdldENvbnRyb2woKSlcbiAgICB9XG4gICAgLy8gaW50ZXJuYWwgdXNhZ2Ugb25seTpcbiAgICBlbHNlIGlmIChzbG90cy5yYXdDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzbG90cy5yYXdDb250cm9sKCkpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3RzLmNvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS50YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93JyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDBcbiAgICAgICAgfSwgc2xvdHMuY29udHJvbChjb250cm9sU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlXG4gICAgICB9LCBoU2xvdChzbG90cy5sYWJlbCwgcHJvcHMubGFiZWwpKVxuICAgIClcblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZSAmJiBoYXNDb3VudGVyID09PSBmYWxzZSAmJiBtc2cgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKSxcbiAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICB9LCBbXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICAgPyBtYWluXG4gICAgICAgIDogaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZpZWxkLW1lc3NhZ2UnIH0sICgpID0+IG1haW4pLFxuXG4gICAgICBoYXNDb3VudGVyID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fY291bnRlcidcbiAgICAgICAgfSwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwID8gc2xvdHMuY291bnRlcigpIDogc3RhdGUuY29tcHV0ZWRDb3VudGVyLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJBcHBlbmROb2RlIChrZXksIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudCA9PT0gbnVsbFxuICAgICAgPyBudWxsXG4gICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBjb250ZW50KVxuICB9XG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCBibHVyIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlckZpZWxkICgpIHtcbiAgICBjb25zdCBsYWJlbEF0dHJzID0gc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwICYmIHNsb3RzLmNvbnRyb2wgPT09IHZvaWQgMFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9XG4gICAgICA6IGF0dHJpYnV0ZXMudmFsdWVcblxuICAgIHJldHVybiBoKHN0YXRlLnRhZy52YWx1ZSwge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbi8vIGxlYXZlIE5BTUVEX01BU0tTIGF0IHRvcCBvZiBmaWxlIChjb2RlIHJlZmVyZW5jZWQgZnJvbSBkb2NzKVxuY29uc3QgTkFNRURfTUFTS1MgPSB7XG4gIGRhdGU6ICcjIyMjLyMjLyMjJyxcbiAgZGF0ZXRpbWU6ICcjIyMjLyMjLyMjICMjOiMjJyxcbiAgdGltZTogJyMjOiMjJyxcbiAgZnVsbHRpbWU6ICcjIzojIzojIycsXG4gIHBob25lOiAnKCMjIykgIyMjIC0gIyMjIycsXG4gIGNhcmQ6ICcjIyMjICMjIyMgIyMjIyAjIyMjJ1xufVxuXG5jb25zdCBUT0tFTlMgPSB7XG4gICcjJzogeyBwYXR0ZXJuOiAnW1xcXFxkXScsIG5lZ2F0ZTogJ1teXFxcXGRdJyB9LFxuXG4gIFM6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJyB9LFxuICBOOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScgfSxcblxuICBBOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgYTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH0sXG5cbiAgWDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIHg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9XG59XG5cbmNvbnN0IEtFWVMgPSBPYmplY3Qua2V5cyhUT0tFTlMpXG5LRVlTLmZvckVhY2goa2V5ID0+IHtcbiAgVE9LRU5TWyBrZXkgXS5yZWdleCA9IG5ldyBSZWdFeHAoVE9LRU5TWyBrZXkgXS5wYXR0ZXJuKVxufSlcblxuY29uc3RcbiAgdG9rZW5SZWdleE1hc2sgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBLRVlTLmpvaW4oJycpICsgJ10pfCguKScsICdnJyksXG4gIGVzY1JlZ2V4ID0gL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nXG5cbmNvbnN0IE1BUktFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMSlcblxuZXhwb3J0IGNvbnN0IHVzZU1hc2tQcm9wcyA9IHtcbiAgbWFzazogU3RyaW5nLFxuICByZXZlcnNlRmlsbE1hc2s6IEJvb2xlYW4sXG4gIGZpbGxNYXNrOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICB1bm1hc2tlZFZhbHVlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrLCBwYXN0ZWRUZXh0U3RhcnQsIHNlbGVjdGlvbkFuY2hvclxuXG4gIGNvbnN0IGhhc01hc2sgPSByZWYobnVsbClcbiAgY29uc3QgaW5uZXJWYWx1ZSA9IHJlZihnZXRJbml0aWFsTWFza2VkVmFsdWUoKSlcblxuICBmdW5jdGlvbiBnZXRJc1R5cGVUZXh0ICgpIHtcbiAgICByZXR1cm4gcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHRhcmVhJywgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnR5cGUgKyBwcm9wcy5hdXRvZ3JvdywgdXBkYXRlTWFza0ludGVybmFscylcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tYXNrLCB2ID0+IHtcbiAgICBpZiAodiAhPT0gdm9pZCAwKSB7XG4gICAgICB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSwgdHJ1ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB2YWwgPSB1bm1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICAgICAgdXBkYXRlTWFza0ludGVybmFscygpXG4gICAgICBwcm9wcy5tb2RlbFZhbHVlICE9PSB2YWwgJiYgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmZpbGxNYXNrICsgcHJvcHMucmV2ZXJzZUZpbGxNYXNrLCAoKSA9PiB7XG4gICAgaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSwgdHJ1ZSlcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy51bm1hc2tlZFZhbHVlLCAoKSA9PiB7XG4gICAgaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSlcbiAgfSlcblxuICBmdW5jdGlvbiBnZXRJbml0aWFsTWFza2VkVmFsdWUgKCkge1xuICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShwcm9wcy5tb2RlbFZhbHVlKSlcblxuICAgICAgcmV0dXJuIHByb3BzLmZpbGxNYXNrICE9PSBmYWxzZVxuICAgICAgICA/IGZpbGxXaXRoTWFzayhtYXNrZWQpXG4gICAgICAgIDogbWFza2VkXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZGRlZE1hc2tNYXJrZWQgKHNpemUpIHtcbiAgICBpZiAoc2l6ZSA8IG1hc2tNYXJrZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbWFza01hcmtlZC5zbGljZSgtc2l6ZSlcbiAgICB9XG5cbiAgICBsZXQgcGFkID0gJycsIGxvY2FsTWFza01hcmtlZCA9IG1hc2tNYXJrZWRcbiAgICBjb25zdCBwYWRQb3MgPSBsb2NhbE1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpXG5cbiAgICBpZiAocGFkUG9zICE9PSAtMSkge1xuICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSBsb2NhbE1hc2tNYXJrZWQubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHBhZCArPSBNQVJLRVJcbiAgICAgIH1cblxuICAgICAgbG9jYWxNYXNrTWFya2VkID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIHBhZFBvcykgKyBwYWQgKyBsb2NhbE1hc2tNYXJrZWQuc2xpY2UocGFkUG9zKVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbE1hc2tNYXJrZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tJbnRlcm5hbHMgKCkge1xuICAgIGhhc01hc2sudmFsdWUgPSBwcm9wcy5tYXNrICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzLm1hc2subGVuZ3RoICE9PSAwXG4gICAgICAmJiBnZXRJc1R5cGVUZXh0KClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgY29tcHV0ZWRVbm1hc2sgPSB2b2lkIDBcbiAgICAgIG1hc2tNYXJrZWQgPSAnJ1xuICAgICAgbWFza1JlcGxhY2VkID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBsb2NhbENvbXB1dGVkTWFzayA9IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLm1hc2tcbiAgICAgICAgOiBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdLFxuICAgICAgZmlsbENoYXIgPSB0eXBlb2YgcHJvcHMuZmlsbE1hc2sgPT09ICdzdHJpbmcnICYmIHByb3BzLmZpbGxNYXNrLmxlbmd0aCAhPT0gMFxuICAgICAgICA/IHByb3BzLmZpbGxNYXNrLnNsaWNlKDAsIDEpXG4gICAgICAgIDogJ18nLFxuICAgICAgZmlsbENoYXJFc2NhcGVkID0gZmlsbENoYXIucmVwbGFjZShlc2NSZWdleCwgJ1xcXFwkJicpLFxuICAgICAgdW5tYXNrID0gW10sXG4gICAgICBleHRyYWN0ID0gW10sXG4gICAgICBtYXNrID0gW11cblxuICAgIGxldFxuICAgICAgZmlyc3RNYXRjaCA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSxcbiAgICAgIHVubWFza0NoYXIgPSAnJyxcbiAgICAgIG5lZ2F0ZUNoYXIgPSAnJ1xuXG4gICAgbG9jYWxDb21wdXRlZE1hc2sucmVwbGFjZSh0b2tlblJlZ2V4TWFzaywgKF8sIGNoYXIxLCBlc2MsIHRva2VuLCBjaGFyMikgPT4ge1xuICAgICAgaWYgKHRva2VuICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgYyA9IFRPS0VOU1sgdG9rZW4gXVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgbmVnYXRlQ2hhciA9IGMubmVnYXRlXG4gICAgICAgIGlmIChmaXJzdE1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8oPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8nKVxuICAgICAgICAgIGZpcnN0TWF0Y2ggPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKT8nKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXNjICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW5tYXNrQ2hhciA9ICdcXFxcJyArIChlc2MgPT09ICdcXFxcJyA/ICcnIDogZXNjKVxuICAgICAgICBtYXNrLnB1c2goZXNjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGMgPSBjaGFyMSAhPT0gdm9pZCAwID8gY2hhcjEgOiBjaGFyMlxuICAgICAgICB1bm1hc2tDaGFyID0gYyA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcXFxcXFxcXFwnIDogYy5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXFxcXFwkJicpXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdFxuICAgICAgdW5tYXNrTWF0Y2hlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICdeJ1xuICAgICAgICArIHVubWFzay5qb2luKCcnKVxuICAgICAgICArICcoJyArICh1bm1hc2tDaGFyID09PSAnJyA/ICcuJyA6ICdbXicgKyB1bm1hc2tDaGFyICsgJ10nKSArICcrKT8nXG4gICAgICAgICsgKHVubWFza0NoYXIgPT09ICcnID8gJycgOiAnWycgKyB1bm1hc2tDaGFyICsgJ10qJykgKyAnJCdcbiAgICAgICksXG4gICAgICBleHRyYWN0TGFzdCA9IGV4dHJhY3QubGVuZ3RoIC0gMSxcbiAgICAgIGV4dHJhY3RNYXRjaGVyID0gZXh0cmFjdC5tYXAoKHJlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgZmlsbENoYXJFc2NhcGVkICsgJyonICsgcmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGV4dHJhY3RMYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXicgKyByZVxuICAgICAgICAgICAgKyAnKCcgKyAobmVnYXRlQ2hhciA9PT0gJycgPyAnLicgOiBuZWdhdGVDaGFyKSArICcrKT8nXG4gICAgICAgICAgICArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnJCcgOiBmaWxsQ2hhckVzY2FwZWQgKyAnKicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcmUpXG4gICAgICB9KVxuXG4gICAgY29tcHV0ZWRNYXNrID0gbWFza1xuICAgIGNvbXB1dGVkVW5tYXNrID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHVubWFza01hdGNoID0gdW5tYXNrTWF0Y2hlci5leGVjKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IHZhbCA6IHZhbC5zbGljZSgwLCBtYXNrLmxlbmd0aCArIDEpKVxuICAgICAgaWYgKHVubWFza01hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHVubWFza01hdGNoLnNsaWNlKDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGV4dHJhY3RNYXRjaCA9IFtdLFxuICAgICAgICBleHRyYWN0TWF0Y2hlckxlbmd0aCA9IGV4dHJhY3RNYXRjaGVyLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgc3RyID0gdmFsOyBpIDwgZXh0cmFjdE1hdGNoZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtID0gZXh0cmFjdE1hdGNoZXJbIGkgXS5leGVjKHN0cilcblxuICAgICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UobS5zaGlmdCgpLmxlbmd0aClcbiAgICAgICAgZXh0cmFjdE1hdGNoLnB1c2goLi4ubSlcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYWN0TWF0Y2gubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0TWF0Y2guam9pbignJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cbiAgICBtYXNrTWFya2VkID0gbWFzay5tYXAodiA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IE1BUktFUikpLmpvaW4oJycpXG4gICAgbWFza1JlcGxhY2VkID0gbWFza01hcmtlZC5zcGxpdChNQVJLRVIpLmpvaW4oZmlsbENoYXIpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrVmFsdWUgKHJhd1ZhbCwgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcsIGlucHV0VHlwZSkge1xuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIGVuZCA9IGlucC5zZWxlY3Rpb25FbmQsXG4gICAgICBlbmRSZXZlcnNlID0gaW5wLnZhbHVlLmxlbmd0aCAtIGVuZCxcbiAgICAgIHVubWFza2VkID0gdW5tYXNrVmFsdWUocmF3VmFsKVxuXG4gICAgLy8gVXBkYXRlIGhlcmUgc28gdW5tYXNrIHVzZXMgdGhlIG9yaWdpbmFsIGZpbGxDaGFyXG4gICAgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcgPT09IHRydWUgJiYgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBjb25zdFxuICAgICAgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza2VkKSxcbiAgICAgIG1hc2tlZCA9IHByb3BzLmZpbGxNYXNrICE9PSBmYWxzZVxuICAgICAgICA/IGZpbGxXaXRoTWFzayhwcmVNYXNrZWQpXG4gICAgICAgIDogcHJlTWFza2VkLFxuICAgICAgY2hhbmdlZCA9IGlubmVyVmFsdWUudmFsdWUgIT09IG1hc2tlZFxuXG4gICAgLy8gV2Ugd2FudCB0byBhdm9pZCBcImZsaWNrZXJpbmdcIiBzbyB3ZSBzZXQgdmFsdWUgaW1tZWRpYXRlbHlcbiAgICBpbnAudmFsdWUgIT09IG1hc2tlZCAmJiAoaW5wLnZhbHVlID0gbWFza2VkKVxuXG4gICAgY2hhbmdlZCA9PT0gdHJ1ZSAmJiAoaW5uZXJWYWx1ZS52YWx1ZSA9IG1hc2tlZClcblxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucCAmJiBuZXh0VGljaygoKSA9PiB7XG4gICAgICBpZiAobWFza2VkID09PSBtYXNrUmVwbGFjZWQpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gbWFza1JlcGxhY2VkLmxlbmd0aCA6IDBcbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dFR5cGUgPT09ICdpbnNlcnRGcm9tUGFzdGUnICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXhFbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG4gICAgICAgIGxldCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgIC8vIGVhY2ggbm9uLW1hcmtlciBjaGFyIG1lYW5zIHdlIG1vdmUgb25jZSB0byByaWdodFxuICAgICAgICBmb3IgKGxldCBpID0gcGFzdGVkVGV4dFN0YXJ0OyBpIDw9IGN1cnNvciAmJiBpIDwgbWF4RW5kOyBpKyspIHtcbiAgICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdICE9PSBNQVJLRVIpIHtcbiAgICAgICAgICAgIGN1cnNvcisrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChbICdkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnIF0uaW5kZXhPZihpbnB1dFR5cGUpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgZW5kID09PSAwXG4gICAgICAgICAgICAgICAgPyAobWFza2VkLmxlbmd0aCA+IHByZU1hc2tlZC5sZW5ndGggPyAxIDogMClcbiAgICAgICAgICAgICAgICA6IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSkgKyAxKSkgKyAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBlbmRcblxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UgKyAxKSkpXG5cbiAgICAgICAgICBpZiAoY3Vyc29yID09PSAxICYmIGVuZCA9PT0gMSkge1xuICAgICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBjdXJzb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IG1hc2tlZC5sZW5ndGggLSBlbmRSZXZlcnNlXG4gICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kKSAtIDEpXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB2YWwgPSBwcm9wcy51bm1hc2tlZFZhbHVlID09PSB0cnVlXG4gICAgICA/IHVubWFza1ZhbHVlKG1hc2tlZClcbiAgICAgIDogbWFza2VkXG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSkgIT09IHZhbFxuICAgICAgJiYgKHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGwgfHwgdmFsICE9PSAnJylcbiAgICApIHtcbiAgICAgIGVtaXRWYWx1ZSh2YWwsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUN1cnNvckZvclBhc3RlIChpbnAsIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUoaW5wLnZhbHVlKSlcblxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIHN0YXJ0KSlcbiAgICBwYXN0ZWRUZXh0U3RhcnQgPSBzdGFydFxuXG4gICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQsICdmb3J3YXJkJylcbiAgfVxuXG4gIGNvbnN0IG1vdmVDdXJzb3IgPSB7XG4gICAgbGVmdCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IG5vTWFya0JlZm9yZSA9IG1hc2tNYXJrZWQuc2xpY2UoY3Vyc29yIC0gMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBjdXJzb3IgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3IrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodChpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHQgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdCBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGhcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdChpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9LFxuXG4gICAgbGVmdFJldmVyc2UgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGlucC52YWx1ZS5sZW5ndGgpXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCAwKVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgfSxcblxuICAgIHJpZ2h0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aCxcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChsaW1pdCksXG4gICAgICAgIG5vTWFya0JlZm9yZSA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBjdXJzb3IgKyAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBjdXJzb3IgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBjdXJzb3IgPiAwICYmIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3ItLVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdFJldmVyc2UoaW5wLCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRDbGljayAoZSkge1xuICAgIGVtaXQoJ2NsaWNrJywgZSlcblxuICAgIHNlbGVjdGlvbkFuY2hvciA9IHZvaWQgMFxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRLZXlkb3duIChlKSB7XG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICBpZiAoXG4gICAgICBzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWVcbiAgICAgIHx8IGUuYWx0S2V5ID09PSB0cnVlIC8vIGxldCBicm93c2VyIGhhbmRsZSB0aGVzZVxuICAgICkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgc3RhcnQgPSBpbnAuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG5cbiAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgIHNlbGVjdGlvbkFuY2hvciA9IHZvaWQgMFxuICAgIH1cblxuICAgIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzkpIHsgLy8gTGVmdCAvIFJpZ2h0XG4gICAgICBpZiAoZS5zaGlmdEtleSAmJiBzZWxlY3Rpb25BbmNob3IgPT09IHZvaWQgMCkge1xuICAgICAgICBzZWxlY3Rpb25BbmNob3IgPSBpbnAuc2VsZWN0aW9uRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBzdGFydCA6IGVuZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbiA9IG1vdmVDdXJzb3JbIChlLmtleUNvZGUgPT09IDM5ID8gJ3JpZ2h0JyA6ICdsZWZ0JykgKyAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gJ1JldmVyc2UnIDogJycpIF1cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBmbihpbnAsIHNlbGVjdGlvbkFuY2hvciA9PT0gc3RhcnQgPyBlbmQgOiBzdGFydClcblxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gaW5wLnNlbGVjdGlvblN0YXJ0XG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShNYXRoLm1pbihzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksIE1hdGgubWF4KHNlbGVjdGlvbkFuY2hvciwgY3Vyc29yKSwgJ2ZvcndhcmQnKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gOCAvLyBCYWNrc3BhY2VcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5sZWZ0KGlucCwgc3RhcnQpXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoaW5wLnNlbGVjdGlvblN0YXJ0LCBlbmQsICdiYWNrd2FyZCcpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS5rZXlDb2RlID09PSA0NiAvLyBEZWxldGVcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBlbmQpXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGlucC5zZWxlY3Rpb25FbmQsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXNrVmFsdWUgKHZhbCkge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSAnJykgeyByZXR1cm4gJycgfVxuXG4gICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG1hc2tWYWx1ZVJldmVyc2UodmFsKVxuICAgIH1cblxuICAgIGNvbnN0IG1hc2sgPSBjb21wdXRlZE1hc2tcblxuICAgIGxldCB2YWxJbmRleCA9IDAsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSAwOyBtYXNrSW5kZXggPCBtYXNrLmxlbmd0aDsgbWFza0luZGV4KyspIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF0sXG4gICAgICAgIG1hc2tEZWYgPSBtYXNrWyBtYXNrSW5kZXggXVxuXG4gICAgICBpZiAodHlwZW9mIG1hc2tEZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmXG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgrK1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZi50cmFuc2Zvcm0gIT09IHZvaWQgMFxuICAgICAgICAgID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcilcbiAgICAgICAgICA6IHZhbENoYXJcbiAgICAgICAgdmFsSW5kZXgrK1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICBmdW5jdGlvbiBtYXNrVmFsdWVSZXZlcnNlICh2YWwpIHtcbiAgICBjb25zdFxuICAgICAgbWFzayA9IGNvbXB1dGVkTWFzayxcbiAgICAgIGZpcnN0VG9rZW5JbmRleCA9IG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpXG5cbiAgICBsZXQgdmFsSW5kZXggPSB2YWwubGVuZ3RoIC0gMSwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IG1hc2subGVuZ3RoIC0gMTsgbWFza0luZGV4ID49IDAgJiYgdmFsSW5kZXggIT09IC0xOyBtYXNrSW5kZXgtLSkge1xuICAgICAgY29uc3QgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGxldCB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ID0gbWFza0RlZiArIG91dHB1dFxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4LS1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG91dHB1dCA9IChtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcikgOiB2YWxDaGFyKSArIG91dHB1dFxuICAgICAgICAgIHZhbEluZGV4LS1cbiAgICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXG4gICAgICAgIH0gd2hpbGUgKGZpcnN0VG9rZW5JbmRleCA9PT0gbWFza0luZGV4ICYmIHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVubWFza1ZhbHVlICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycgfHwgY29tcHV0ZWRVbm1hc2sgPT09IHZvaWQgMFxuICAgICAgPyAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBjb21wdXRlZFVubWFzaygnJyArIHZhbCkgOiB2YWwpXG4gICAgICA6IGNvbXB1dGVkVW5tYXNrKHZhbClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXaXRoTWFzayAodmFsKSB7XG4gICAgaWYgKG1hc2tSZXBsYWNlZC5sZW5ndGggLSB2YWwubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlICYmIHZhbC5sZW5ndGggIT09IDBcbiAgICAgID8gbWFza1JlcGxhY2VkLnNsaWNlKDAsIC12YWwubGVuZ3RoKSArIHZhbFxuICAgICAgOiB2YWwgKyBtYXNrUmVwbGFjZWQuc2xpY2UodmFsLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJWYWx1ZSxcbiAgICBoYXNNYXNrLFxuICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgb25NYXNrZWRLZXlkb3duLFxuICAgIG9uTWFza2VkQ2xpY2tcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VGb3JtUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUF0dHJzIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgIHZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlXG4gIH0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUluamVjdCAoZm9ybUF0dHJzID0ge30pIHtcbiAgcmV0dXJuIChjaGlsZCwgYWN0aW9uLCBjbGFzc05hbWUpID0+IHtcbiAgICBjaGlsZFsgYWN0aW9uIF0oXG4gICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgY2xhc3M6ICdoaWRkZW4nICsgKGNsYXNzTmFtZSB8fCAnJyksXG4gICAgICAgIC4uLmZvcm1BdHRycy52YWx1ZVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbnB1dE5hbWVBdHRyIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmFtZSB8fCBwcm9wcy5mb3IpXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCB0eXBlR3VhcmQpIHtcbiAgZnVuY3Rpb24gZ2V0Rm9ybURvbVByb3BzICgpIHtcbiAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWVcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkdCA9ICdEYXRhVHJhbnNmZXInIGluIHdpbmRvd1xuICAgICAgICA/IG5ldyBEYXRhVHJhbnNmZXIoKVxuICAgICAgICA6ICgnQ2xpcGJvYXJkRXZlbnQnIGluIHdpbmRvd1xuICAgICAgICAgICAgPyBuZXcgQ2xpcGJvYXJkRXZlbnQoJycpLmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuXG4gICAgICBpZiAoT2JqZWN0KG1vZGVsKSA9PT0gbW9kZWwpIHtcbiAgICAgICAgKCdsZW5ndGgnIGluIG1vZGVsXG4gICAgICAgICAgPyBBcnJheS5mcm9tKG1vZGVsKVxuICAgICAgICAgIDogWyBtb2RlbCBdXG4gICAgICAgICkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgICBkdC5pdGVtcy5hZGQoZmlsZSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IGR0LmZpbGVzXG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogdm9pZCAwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVHdWFyZCA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnR5cGUgIT09ICdmaWxlJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEZvcm1Eb21Qcm9wcygpXG4gICAgfSlcbiAgICA6IGNvbXB1dGVkKGdldEZvcm1Eb21Qcm9wcylcbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGlzSmFwYW5lc2UgPSAvW1xcdTMwMDAtXFx1MzAzZlxcdTMwNDAtXFx1MzA5ZlxcdTMwYTAtXFx1MzBmZlxcdWZmMDAtXFx1ZmY5ZlxcdTRlMDAtXFx1OWZhZlxcdTM0MDAtXFx1NGRiZl0vXG5jb25zdCBpc0NoaW5lc2UgPSAvW1xcdTRlMDAtXFx1OWZmZlxcdTM0MDAtXFx1NGRiZlxcdXsyMDAwMH0tXFx1ezJhNmRmfVxcdXsyYTcwMH0tXFx1ezJiNzNmfVxcdXsyYjc0MH0tXFx1ezJiODFmfVxcdXsyYjgyMH0tXFx1ezJjZWFmfVxcdWY5MDAtXFx1ZmFmZlxcdTMzMDAtXFx1MzNmZlxcdWZlMzAtXFx1ZmU0ZlxcdWY5MDAtXFx1ZmFmZlxcdXsyZjgwMH0tXFx1ezJmYTFmfV0vdVxuY29uc3QgaXNLb3JlYW4gPSAvW1xcdTMxMzEtXFx1MzE0ZVxcdTMxNGYtXFx1MzE2M1xcdWFjMDAtXFx1ZDdhM10vXG5jb25zdCBpc1BsYWluVGV4dCA9IC9bYS16MC05XyAtXSQvaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob25JbnB1dCkge1xuICByZXR1cm4gZnVuY3Rpb24gb25Db21wb3NpdGlvbiAoZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdjb21wb3NpdGlvbmVuZCcgfHwgZS50eXBlID09PSAnY2hhbmdlJykge1xuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWUpIHJldHVyblxuICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IGZhbHNlXG4gICAgICBvbklucHV0KGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS50eXBlID09PSAnY29tcG9zaXRpb251cGRhdGUnXG4gICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlXG4gICAgICAmJiB0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgY29uc3QgaXNDb21wb3NpbmcgPSBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICA/IGlzUGxhaW5UZXh0LnRlc3QoZS5kYXRhKSA9PT0gZmFsc2VcbiAgICAgICAgOiBpc0phcGFuZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0NoaW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzS29yZWFuLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZVxuXG4gICAgICBpZiAoaXNDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHVzZU1hc2ssIHsgdXNlTWFza1Byb3BzIH0gZnJvbSAnLi91c2UtbWFzay5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUZpbGVGb3JtRG9tUHJvcHMgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS1kb20tcHJvcHMuanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5wdXQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZU1hc2tQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7IHJlcXVpcmVkOiBmYWxzZSB9LFxuXG4gICAgc2hhZG93VGV4dDogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcblxuICAgIGRlYm91bmNlOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBhdXRvZ3JvdzogQm9vbGVhbiwgLy8gbWFrZXMgYSB0ZXh0YXJlYVxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdwYXN0ZScsICdjaGFuZ2UnLFxuICAgICdrZXlkb3duJywgJ2NsaWNrJywgJ2FuaW1hdGlvbmVuZCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHRlbXAgPSB7fVxuICAgIGxldCBlbWl0Q2FjaGVkVmFsdWUgPSBOYU4sIHR5cGVkTnVtYmVyLCBzdG9wVmFsdWVXYXRjaGVyLCBlbWl0VGltZXIgPSBudWxsLCBlbWl0VmFsdWVGblxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgIGhhc01hc2ssXG4gICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgICBvbk1hc2tlZENsaWNrXG4gICAgfSA9IHVzZU1hc2socHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzLCAvKiB0eXBlIGd1YXJkICovIHRydWUpXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpc1RleHRhcmVhID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgfHwgcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc1R5cGVUZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIG9uUGFzdGUsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZSxcbiAgICAgICAgb25CbHVyOiBvbkZpbmlzaEVkaXRpbmcsXG4gICAgICAgIG9uRm9jdXM6IHN0b3BcbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbktleWRvd24gPSBvbk1hc2tlZEtleWRvd25cbiAgICAgICAgLy8gcmVzZXQgc2VsZWN0aW9uIGFuY2hvciBvbiBwb2ludGVyIHNlbGVjdGlvblxuICAgICAgICBldnQub25DbGljayA9IG9uTWFza2VkQ2xpY2tcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbkFuaW1hdGlvbmVuZCA9IG9uQW5pbWF0aW9uZW5kXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgcm93czogcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyA/IDYgOiB2b2lkIDAsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RleHRhcmVhLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBhdHRycy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnMucm93cyA9IDFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgbG9zZSB0aGUgbmF0aXZlIGlucHV0IHZhbHVlXG4gICAgLy8gc28gd2UgbmVlZCB0byByZWF0dGFjaCBpdCBkeW5hbWljYWxseVxuICAgIC8vIChsaWtlIHR5cGU9XCJwYXNzd29yZFwiIDwtPiB0eXBlPVwidGV4dFwiOyBzZWUgIzEyMDc4KVxuICAgIHdhdGNoKCgpID0+IHByb3BzLnR5cGUsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RvcFZhbHVlV2F0Y2hlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuXG4gICAgICAgICAgaWYgKFN0cmluZyh2KSA9PT0gZW1pdENhY2hlZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVyVmFsdWUudmFsdWUgIT09IHYpIHtcbiAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZSA9IHZcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0eXBlZE51bWJlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b2dyb3csIHZhbCA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIGlmIGl0IGhhcyBhIG51bWJlciBvZiByb3dzIHNldCByZXNwZWN0IGl0XG4gICAgICBlbHNlIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBhdHRycy5yb3dzID4gMCkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVuc2UsICgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBpbnB1dFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICAgICAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0ICgpIHtcbiAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGlucHV0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXN0ZSAoZSkge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlucCA9IGUudGFyZ2V0XG4gICAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZShpbnAsIGlucC5zZWxlY3Rpb25TdGFydCwgaW5wLnNlbGVjdGlvbkVuZClcbiAgICAgIH1cblxuICAgICAgZW1pdCgncGFzdGUnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGlmICghZSB8fCAhZS50YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBlLnRhcmdldC5maWxlcylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlXG5cbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHZhbCwgZmFsc2UsIGUuaW5wdXRUeXBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZSh2YWwpXG5cbiAgICAgICAgaWYgKGlzVHlwZVRleHQudmFsdWUgPT09IHRydWUgJiYgZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgfSA9IGUudGFyZ2V0XG5cbiAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCAmJiBzZWxlY3Rpb25FbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgdmFsLmluZGV4T2YoZS50YXJnZXQudmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2UgbmVlZCB0byB0cmlnZ2VyIGl0IGltbWVkaWF0ZWx5IHRvbyxcbiAgICAgIC8vIHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiXG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQW5pbWF0aW9uZW5kIChlKSB7XG4gICAgICBlbWl0KCdhbmltYXRpb25lbmQnLCBlKVxuICAgICAgYWRqdXN0SGVpZ2h0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0VmFsdWUgKHZhbCwgc3RvcFdhdGNoZXIpIHtcbiAgICAgIGVtaXRWYWx1ZUZuID0gKCkgPT4ge1xuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdudW1iZXInXG4gICAgICAgICAgJiYgdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBkZWxldGUgdGVtcC52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0Q2FjaGVkVmFsdWUgIT09IHZhbCkge1xuICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9IHZhbFxuXG4gICAgICAgICAgc3RvcFdhdGNoZXIgPT09IHRydWUgJiYgKHN0b3BWYWx1ZVdhdGNoZXIgPSB0cnVlKVxuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuXG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgZW1pdENhY2hlZFZhbHVlID09PSB2YWwgJiYgKGVtaXRDYWNoZWRWYWx1ZSA9IE5hTilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdFZhbHVlRm4gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHR5cGVkTnVtYmVyID0gdHJ1ZVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5kZWJvdW5jZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICAgIGVtaXRUaW1lciA9IHNldFRpbWVvdXQoZW1pdFZhbHVlRm4sIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZUZuKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgZnVuY3Rpb24gYWRqdXN0SGVpZ2h0ICgpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucCA9IGlucHV0UmVmLnZhbHVlXG4gICAgICAgIGlmIChpbnAgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRTdHlsZSA9IGlucC5wYXJlbnROb2RlLnN0eWxlXG4gICAgICAgICAgLy8gY2hyb21lIGRvZXMgbm90IGtlZXAgc2Nyb2xsICMxNTQ5OFxuICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wIH0gPSBpbnBcbiAgICAgICAgICAvLyBjaHJvbWUgY2FsY3VsYXRlcyBhIHNtYWxsZXIgc2Nyb2xsSGVpZ2h0IHdoZW4gaW4gYSAuY29sdW1uIGNvbnRhaW5lclxuICAgICAgICAgIGNvbnN0IHsgb3ZlcmZsb3dZLCBtYXhIZWlnaHQgfSA9ICRxLnBsYXRmb3JtLmlzLmZpcmVmb3ggPT09IHRydWVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogd2luZG93LmdldENvbXB1dGVkU3R5bGUoaW5wKVxuICAgICAgICAgIC8vIG9uIGZpcmVmb3ggb3IgaWYgb3ZlcmZsb3dZIGlzIHNwZWNpZmllZCBhcyBzY3JvbGwgIzE0MjYzLCAjMTQzNDRcbiAgICAgICAgICAvLyB3ZSBkb24ndCB0b3VjaCBvdmVyZmxvd1xuICAgICAgICAgIC8vIGZpcmVmb3ggaXMgbm90IHNvIGJhZCBpbiB0aGUgZW5kXG4gICAgICAgICAgY29uc3QgY2hhbmdlT3ZlcmZsb3cgPSBvdmVyZmxvd1kgIT09IHZvaWQgMCAmJiBvdmVyZmxvd1kgIT09ICdzY3JvbGwnXG5cbiAgICAgICAgICAvLyByZXNldCBoZWlnaHQgb2YgdGV4dGFyZWEgdG8gYSBzbWFsbCBzaXplIHRvIGRldGVjdCB0aGUgcmVhbCBoZWlnaHRcbiAgICAgICAgICAvLyBidXQga2VlcCB0aGUgdG90YWwgY29udHJvbCBzaXplIHRoZSBzYW1lXG4gICAgICAgICAgY2hhbmdlT3ZlcmZsb3cgPT09IHRydWUgJiYgKGlucC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJylcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAoaW5wLnNjcm9sbEhlaWdodCAtIDEpICsgJ3B4J1xuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSAnMXB4J1xuXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9IGlucC5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgICAgLy8gd2Ugc2hvdWxkIGFsbG93IHNjcm9sbGJhcnMgb25seVxuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG1heEhlaWdodCBhbmQgY29udGVudCBpcyB0YWxsZXIgdGhhbiBtYXhIZWlnaHRcbiAgICAgICAgICBjaGFuZ2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93WSA9IHBhcnNlSW50KG1heEhlaWdodCwgMTApIDwgaW5wLnNjcm9sbEhlaWdodCA/ICdhdXRvJyA6ICdoaWRkZW4nKVxuICAgICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9ICcnXG4gICAgICAgICAgaW5wLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlIChlKSB7XG4gICAgICBvbkNvbXBvc2l0aW9uKGUpXG5cbiAgICAgIGlmIChlbWl0VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgZW1pdCgnY2hhbmdlJywgZS50YXJnZXQudmFsdWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25GaW5pc2hFZGl0aW5nIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuXG4gICAgICBpZiAoZW1pdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlRm4gIT09IHZvaWQgMCAmJiBlbWl0VmFsdWVGbigpXG5cbiAgICAgIHR5cGVkTnVtYmVyID0gZmFsc2VcbiAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuICAgICAgZGVsZXRlIHRlbXAudmFsdWVcblxuICAgICAgLy8gd2UgbmVlZCB0byB1c2Ugc2V0VGltZW91dCBpbnN0ZWFkIG9mIHRoaXMuJG5leHRUaWNrXG4gICAgICAvLyB0byBhdm9pZCBhIGJ1ZyB3aGVyZSBmb2N1c291dCBpcyBub3QgZW1pdHRlZCBmb3IgdHlwZSBkYXRlL3RpbWUvd2Vlay8uLi5cbiAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJyAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUudmFsdWUgPSBpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDdXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICA/IHRlbXAudmFsdWVcbiAgICAgICAgOiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBvbkZpbmlzaEVkaXRpbmcoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgYWRqdXN0SGVpZ2h0KClcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtJHsgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnIH1gXG4gICAgICAgICsgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlID8gJyBxLXRleHRhcmVhLS1hdXRvZ3JvdycgOiAnJylcbiAgICAgICksXG5cbiAgICAgIGhhc1NoYWRvdzogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICYmIHR5cGVvZiBwcm9wcy5zaGFkb3dUZXh0ID09PSAnc3RyaW5nJ1xuICAgICAgICAmJiBwcm9wcy5zaGFkb3dUZXh0Lmxlbmd0aCAhPT0gMFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG5cbiAgICAgIGVtaXRWYWx1ZSxcblxuICAgICAgaGFzVmFsdWUsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChcbiAgICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChwcm9wcy50eXBlICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbm5lclZhbHVlLnZhbHVlKSA9PT0gZmFsc2UpXG4gICAgICAgIClcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnLCB7XG4gICAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtZmllbGRfX25hdGl2ZSBxLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHByb3BzLmlucHV0Q2xhc3NcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgICAgLi4ub25FdmVudHMudmFsdWUsXG4gICAgICAgICAgLi4uKFxuICAgICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICAgICAgID8geyB2YWx1ZTogZ2V0Q3VyVmFsdWUoKSB9XG4gICAgICAgICAgICAgIDogZm9ybURvbVByb3BzLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgZ2V0U2hhZG93Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHEtZmllbGRfX3NoYWRvdyBhYnNvbHV0ZS1ib3R0b20gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgICArIChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHRleHQtbm8td3JhcCcpXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2ludmlzaWJsZScgfSwgZ2V0Q3VyVmFsdWUoKSksXG4gICAgICAgICAgaCgnc3BhbicsIHByb3BzLnNoYWRvd1RleHQpXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbmRlckZuID0gdXNlRmllbGQoc3RhdGUpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBmb2N1cyxcbiAgICAgIHNlbGVjdCxcbiAgICAgIGdldE5hdGl2ZUVsZW1lbnQ6ICgpID0+IGlucHV0UmVmLnZhbHVlIC8vIGRlcHJlY2F0ZWRcbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ25hdGl2ZUVsJywgKCkgPT4gaW5wdXRSZWYudmFsdWUpXG5cbiAgICByZXR1cm4gcmVuZGVyRm5cbiAgfVxufSlcbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgYWxpZ25NYXAgPSB7XG4gIGxlZnQ6ICdzdGFydCcsXG4gIGNlbnRlcjogJ2NlbnRlcicsXG4gIHJpZ2h0OiAnZW5kJyxcbiAgYmV0d2VlbjogJ2JldHdlZW4nLFxuICBhcm91bmQ6ICdhcm91bmQnLFxuICBldmVubHk6ICdldmVubHknLFxuICBzdHJldGNoOiAnc3RyZXRjaCdcbn1cblxuZXhwb3J0IGNvbnN0IGFsaWduVmFsdWVzID0gT2JqZWN0LmtleXMoYWxpZ25NYXApXG5cbmV4cG9ydCBjb25zdCB1c2VBbGlnblByb3BzID0ge1xuICBhbGlnbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgLy8gcmV0dXJuIGFsaWduQ2xhc3NcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhbGlnbiA9IHByb3BzLmFsaWduID09PSB2b2lkIDBcbiAgICAgID8gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc3RyZXRjaCcgOiAnbGVmdCdcbiAgICAgIDogcHJvcHMuYWxpZ25cblxuICAgIHJldHVybiBgJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnaXRlbXMnIDogJ2p1c3RpZnknIH0tJHsgYWxpZ25NYXBbIGFsaWduIF0gfWBcbiAgfSlcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgY29uc3QgYnRuUGFkZGluZyA9IHtcbiAgbm9uZTogMCxcbiAgeHM6IDQsXG4gIHNtOiA4LFxuICBtZDogMTYsXG4gIGxnOiAyNCxcbiAgeGw6IDMyXG59XG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5jb25zdCBmb3JtVHlwZXMgPSBbICdidXR0b24nLCAnc3VibWl0JywgJ3Jlc2V0JyBdXG5jb25zdCBtZWRpYVR5cGVSRSA9IC9bXlxcc11cXC9bXlxcc10vXG5cbmV4cG9ydCBjb25zdCBidG5EZXNpZ25PcHRpb25zID0gWyAnZmxhdCcsICdvdXRsaW5lJywgJ3B1c2gnLCAndW5lbGV2YXRlZCcgXVxuZXhwb3J0IGNvbnN0IGdldEJ0bkRlc2lnbiA9IChwcm9wcywgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIGlmIChwcm9wcy5mbGF0ID09PSB0cnVlKSByZXR1cm4gJ2ZsYXQnXG4gIGlmIChwcm9wcy5vdXRsaW5lID09PSB0cnVlKSByZXR1cm4gJ291dGxpbmUnXG4gIGlmIChwcm9wcy5wdXNoID09PSB0cnVlKSByZXR1cm4gJ3B1c2gnXG4gIGlmIChwcm9wcy51bmVsZXZhdGVkID09PSB0cnVlKSByZXR1cm4gJ3VuZWxldmF0ZWQnXG4gIHJldHVybiBkZWZhdWx0VmFsdWVcbn1cbmV4cG9ydCBjb25zdCBnZXRCdG5EZXNpZ25BdHRyID0gcHJvcHMgPT4ge1xuICBjb25zdCBkZXNpZ24gPSBnZXRCdG5EZXNpZ24ocHJvcHMpXG4gIHJldHVybiBkZXNpZ24gIT09IHZvaWQgMFxuICAgID8geyBbIGRlc2lnbiBdOiB0cnVlIH1cbiAgICA6IHt9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VCdG5Qcm9wcyA9IHtcbiAgLi4udXNlU2l6ZVByb3BzLFxuICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG5cbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnYnV0dG9uJ1xuICB9LFxuXG4gIGxhYmVsOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGljb246IFN0cmluZyxcbiAgaWNvblJpZ2h0OiBTdHJpbmcsXG5cbiAgLi4uYnRuRGVzaWduT3B0aW9ucy5yZWR1Y2UoXG4gICAgKGFjYywgdmFsKSA9PiAoYWNjWyB2YWwgXSA9IEJvb2xlYW4pICYmIGFjYyxcbiAgICB7fVxuICApLFxuXG4gIHNxdWFyZTogQm9vbGVhbixcbiAgcm91bmQ6IEJvb2xlYW4sXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG4gIGdsb3NzeTogQm9vbGVhbixcblxuICBzaXplOiBTdHJpbmcsXG4gIGZhYjogQm9vbGVhbixcbiAgZmFiTWluaTogQm9vbGVhbixcbiAgcGFkZGluZzogU3RyaW5nLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuICBub0NhcHM6IEJvb2xlYW4sXG4gIG5vV3JhcDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcblxuICBhbGlnbjoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMuYWxpZ24sXG4gICAgZGVmYXVsdDogJ2NlbnRlcidcbiAgfSxcbiAgc3RhY2s6IEJvb2xlYW4sXG4gIHN0cmV0Y2g6IEJvb2xlYW4sXG4gIGxvYWRpbmc6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgZGVmYXVsdFNpemVzKVxuICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG4gIGNvbnN0IHsgaGFzUm91dGVyTGluaywgaGFzTGluaywgbGlua1RhZywgbGlua0F0dHJzLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoe1xuICAgIGZhbGxiYWNrVGFnOiAnYnV0dG9uJ1xuICB9KVxuXG4gIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IHByb3BzLmZhYiA9PT0gZmFsc2UgJiYgcHJvcHMuZmFiTWluaSA9PT0gZmFsc2VcbiAgICAgID8gc2l6ZVN0eWxlLnZhbHVlXG4gICAgICA6IHt9XG5cbiAgICByZXR1cm4gcHJvcHMucGFkZGluZyAhPT0gdm9pZCAwXG4gICAgICA/IE9iamVjdC5hc3NpZ24oe30sIG9iaiwge1xuICAgICAgICBwYWRkaW5nOiBwcm9wcy5wYWRkaW5nXG4gICAgICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgICAgICAubWFwKHYgPT4gKHYgaW4gYnRuUGFkZGluZyA/IGJ0blBhZGRpbmdbIHYgXSArICdweCcgOiB2KSlcbiAgICAgICAgICAuam9pbignICcpLFxuICAgICAgICBtaW5XaWR0aDogJzAnLFxuICAgICAgICBtaW5IZWlnaHQ6ICcwJ1xuICAgICAgfSlcbiAgICAgIDogb2JqXG4gIH0pXG5cbiAgY29uc3QgaXNSb3VuZGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5yb3VuZGVkID09PSB0cnVlIHx8IHByb3BzLmZhYiA9PT0gdHJ1ZSB8fCBwcm9wcy5mYWJNaW5pID09PSB0cnVlXG4gIClcblxuICBjb25zdCBpc0FjdGlvbmFibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMubG9hZGluZyAhPT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgdGFiSW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggfHwgMCA6IC0xXG4gICkpXG5cbiAgY29uc3QgZGVzaWduID0gY29tcHV0ZWQoKCkgPT4gZ2V0QnRuRGVzaWduKHByb3BzLCAnc3RhbmRhcmQnKSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHsgdGFiaW5kZXg6IHRhYkluZGV4LnZhbHVlIH1cblxuICAgIGlmIChoYXNMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFjYywgbGlua0F0dHJzLnZhbHVlKVxuICAgIH1cbiAgICBlbHNlIGlmIChmb3JtVHlwZXMuaW5jbHVkZXMocHJvcHMudHlwZSkgPT09IHRydWUpIHtcbiAgICAgIGFjYy50eXBlID0gcHJvcHMudHlwZVxuICAgIH1cblxuICAgIGlmIChsaW5rVGFnLnZhbHVlID09PSAnYScpIHtcbiAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFjYy5ocmVmID09PSB2b2lkIDApIHtcbiAgICAgICAgYWNjLnJvbGUgPSAnYnV0dG9uJ1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSAhPT0gdHJ1ZSAmJiBtZWRpYVR5cGVSRS50ZXN0KHByb3BzLnR5cGUpID09PSB0cnVlKSB7XG4gICAgICAgIGFjYy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2MuZGlzYWJsZWQgPSAnJ1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlICYmIHByb3BzLnBlcmNlbnRhZ2UgIT09IHZvaWQgMCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihhY2MsIHtcbiAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IDEwMCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5wZXJjZW50YWdlXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGxldCBjb2xvcnNcblxuICAgIGlmIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwKSB7XG4gICAgICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSB8fCBwcm9wcy5vdXRsaW5lID09PSB0cnVlKSB7XG4gICAgICAgIGNvbG9ycyA9IGB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB8fCBwcm9wcy5jb2xvciB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbG9ycyA9IGBiZy0keyBwcm9wcy5jb2xvciB9IHRleHQtJHsgcHJvcHMudGV4dENvbG9yIHx8ICd3aGl0ZScgfWBcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMudGV4dENvbG9yKSB7XG4gICAgICBjb2xvcnMgPSBgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWBcbiAgICB9XG5cbiAgICBjb25zdCBzaGFwZSA9IHByb3BzLnJvdW5kID09PSB0cnVlXG4gICAgICA/ICdyb3VuZCdcbiAgICAgIDogYHJlY3RhbmdsZSR7IGlzUm91bmRlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLXJvdW5kZWQnIDogKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLXNxdWFyZScgOiAnJykgfWBcblxuICAgIHJldHVybiBgcS1idG4tLSR7IGRlc2lnbi52YWx1ZSB9IHEtYnRuLS0keyBzaGFwZSB9YFxuICAgICAgKyAoY29sb3JzICE9PSB2b2lkIDAgPyAnICcgKyBjb2xvcnMgOiAnJylcbiAgICAgICsgKGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUnIDogKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKSlcbiAgICAgICsgKHByb3BzLmZhYiA9PT0gdHJ1ZSA/ICcgcS1idG4tLWZhYicgOiAocHJvcHMuZmFiTWluaSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWZhYi1taW5pJyA6ICcnKSlcbiAgICAgICsgKHByb3BzLm5vQ2FwcyA9PT0gdHJ1ZSA/ICcgcS1idG4tLW5vLXVwcGVyY2FzZScgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWJ0bi0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5zdHJldGNoID09PSB0cnVlID8gJyBuby1ib3JkZXItcmFkaXVzIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICAgICsgKHByb3BzLmdsb3NzeSA9PT0gdHJ1ZSA/ICcgZ2xvc3N5JyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID8gJyBxLWJ0bi0tc3F1YXJlJyA6ICcnKVxuICB9KVxuXG4gIGNvbnN0IGlubmVyQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYWxpZ25DbGFzcy52YWx1ZSArIChwcm9wcy5zdGFjayA9PT0gdHJ1ZSA/ICcgY29sdW1uJyA6ICcgcm93JylcbiAgICArIChwcm9wcy5ub1dyYXAgPT09IHRydWUgPyAnIG5vLXdyYXAgdGV4dC1uby13cmFwJyA6ICcnKVxuICAgICsgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgPyAnIHEtYnRuX19jb250ZW50LS1oaWRkZW4nIDogJycpXG4gIClcblxuICByZXR1cm4ge1xuICAgIGNsYXNzZXMsXG4gICAgc3R5bGUsXG4gICAgaW5uZXJDbGFzc2VzLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgaGFzTGluayxcbiAgICBsaW5rVGFnLFxuICAgIG5hdmlnYXRlT25DbGljayxcbiAgICBpc0FjdGlvbmFibGVcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHVzZUJ0biwgeyB1c2VCdG5Qcm9wcyB9IGZyb20gJy4vdXNlLWJ0bi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wLCBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCwgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IHsgcGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHNcblxubGV0XG4gIHRvdWNoVGFyZ2V0ID0gbnVsbCxcbiAga2V5Ym9hcmRUYXJnZXQgPSBudWxsLFxuICBtb3VzZVRhcmdldCA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG4nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQnRuUHJvcHMsXG5cbiAgICBwZXJjZW50YWdlOiBOdW1iZXIsXG4gICAgZGFya1BlcmNlbnRhZ2U6IEJvb2xlYW4sXG5cbiAgICBvblRvdWNoc3RhcnQ6IFsgRnVuY3Rpb24sIEFycmF5IF1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snLCAna2V5ZG93bicsICdtb3VzZWRvd24nLCAna2V5dXAnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qge1xuICAgICAgY2xhc3Nlcywgc3R5bGUsIGlubmVyQ2xhc3NlcyxcbiAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICBoYXNMaW5rLCBsaW5rVGFnLCBuYXZpZ2F0ZU9uQ2xpY2ssXG4gICAgICBpc0FjdGlvbmFibGVcbiAgICB9ID0gdXNlQnRuKHByb3BzKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGxldCBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBudWxsLCBhdm9pZE1vdXNlUmlwcGxlLCBtb3VzZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBwcm9wcy5sYWJlbCAhPT0gbnVsbCAmJiBwcm9wcy5sYWJlbCAhPT0gJydcbiAgICApXG5cbiAgICBjb25zdCByaXBwbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IHByb3BzLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIGtleUNvZGVzOiBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gWyAxMywgMzIgXSA6IFsgMTMgXSxcbiAgICAgICAgICAgIC4uLihwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZSlcbiAgICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IHJpcHBsZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHsgY2VudGVyOiBwcm9wcy5yb3VuZCB9KSlcblxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcHJvcHMucGVyY2VudGFnZSkpXG4gICAgICByZXR1cm4gdmFsID4gMFxuICAgICAgICA/IHsgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjZzJywgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkeyB2YWwgLSAxMDAgfSUpYCB9XG4gICAgICAgIDoge31cbiAgICB9KVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uTW91c2Vkb3duOiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0OiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25DbGljazogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5ZG93bjogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5dXA6IG9uTG9hZGluZ0V2dFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgYWNjID0ge1xuICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgb25LZXlkb3duLFxuICAgICAgICAgIG9uTW91c2Vkb3duXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJveHkuJHEucGxhdGZvcm0uaGFzLnRvdWNoID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3Qgc3VmZml4ID0gcHJvcHMub25Ub3VjaHN0YXJ0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogJ1Bhc3NpdmUnXG5cbiAgICAgICAgICBhY2NbIGBvblRvdWNoc3RhcnQkeyBzdWZmaXggfWAgXSA9IG9uVG91Y2hzdGFydFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyBuZWVkZWQ7IGVzcGVjaWFsbHkgZm9yIGRpc2FibGVkIDxhPiB0YWdzXG4gICAgICAgIG9uQ2xpY2s6IHN0b3BBbmRQcmV2ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IG5vZGVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogJ3EtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSAnICsgY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgIH0pKVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIC8vIGZvY3VzIGJ1dHRvbiBpZiBpdCBjYW1lIGZyb20gRU5URVIgb24gZm9ybVxuICAgICAgICAvLyBwcmV2ZW50IHRoZSBuZXcgc3VibWl0IChhbHJlYWR5IGRvbmUpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnc3VibWl0J1xuICAgICAgICAgICYmIGVsICE9PSBkb2N1bWVudC5ib2R5XG4gICAgICAgICAgJiYgcm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkgPT09IGZhbHNlXG4gICAgICAgICAgLy8gcmVxdWlyZWQgZm9yIGlPUyBhbmQgZGVza3RvcCBTYWZhcmlcbiAgICAgICAgICAmJiBlbC5jb250YWlucyhyb290UmVmLnZhbHVlKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgICBjb25zdCBvbkNsaWNrQ2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZSAhPT0gbnVsbCAmJiByb290UmVmLnZhbHVlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHN0b3BBbmRQcmV2ZW50LCB0cnVlKVxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuYXZpZ2F0ZU9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgICAgaWYgKGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSA9PT0gdHJ1ZSAmJiBrZXlib2FyZFRhcmdldCAhPT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBrZXlib2FyZFRhcmdldCAhPT0gbnVsbCAmJiBjbGVhbnVwKClcblxuICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gZm9jdXMgZXh0ZXJuYWwgYnV0dG9uIGlmIHRoZSBmb2N1cyBoZWxwZXIgd2FzIGZvY3VzZWQgYmVmb3JlXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgICBrZXlib2FyZFRhcmdldCA9IHJvb3RSZWYudmFsdWVcbiAgICAgICAgICByb290UmVmLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ3EtYnRuLS1hY3RpdmUnKVxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25QcmVzc0VuZCwgdHJ1ZSlcbiAgICAgICAgICByb290UmVmLnZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ub3VjaHN0YXJ0IChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgZW1pdCgndG91Y2hzdGFydCcsIGUpXG5cbiAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHJldHVyblxuXG4gICAgICBpZiAodG91Y2hUYXJnZXQgIT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgdG91Y2hUYXJnZXQgIT09IG51bGwgJiYgY2xlYW51cCgpXG4gICAgICAgIHRvdWNoVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuXG4gICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbCA9IGUudGFyZ2V0XG4gICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgZHVwbGljYXRlZCBtb3VzZWRvd24gZXZlbnRcbiAgICAgIC8vIHRyaWdnZXJpbmcgYW5vdGhlciBlYXJseSByaXBwbGVcbiAgICAgIGF2b2lkTW91c2VSaXBwbGUgPSB0cnVlXG4gICAgICBtb3VzZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChtb3VzZVRpbWVyKVxuICAgICAgbW91c2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb3VzZVRpbWVyID0gbnVsbFxuICAgICAgICBhdm9pZE1vdXNlUmlwcGxlID0gZmFsc2VcbiAgICAgIH0sIDIwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZG93biAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGUucVNraXBSaXBwbGUgPSBhdm9pZE1vdXNlUmlwcGxlID09PSB0cnVlXG4gICAgICBlbWl0KCdtb3VzZWRvd24nLCBlKVxuXG4gICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIG1vdXNlVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIG1vdXNlVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuICAgICAgICBtb3VzZVRhcmdldCA9IHJvb3RSZWYudmFsdWVcbiAgICAgICAgcm9vdFJlZi52YWx1ZS5jbGFzc0xpc3QuYWRkKCdxLWJ0bi0tYWN0aXZlJylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUHJlc3NFbmQgKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAvLyBuZWVkZWQgZm9yIElFIChiZWNhdXNlIGl0IGVtaXRzIGJsdXIgd2hlbiBmb2N1c2luZyBidXR0b24gZnJvbSBmb2N1cyBoZWxwZXIpXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZSA9PT0gJ2JsdXInICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlID09PSAna2V5dXAnKSB7XG4gICAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSAmJiBpc0tleUNvZGUoZSwgWyAxMywgMzIgXSkgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb3IgY2xpY2sgdHJpZ2dlclxuICAgICAgICAgIGNvbnN0IGV2dCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIGUpXG4gICAgICAgICAgZXZ0LnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgZS5jYW5jZWxCdWJibGUgPT09IHRydWUgJiYgc3RvcChldnQpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KGV2dClcblxuICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgICAgICAvLyBmb3IgcmlwcGxlXG4gICAgICAgICAgZS5xS2V5RXZlbnQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgICB9XG5cbiAgICAgIGNsZWFudXAoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKGRlc3Ryb3lpbmcpIHtcbiAgICAgIGNvbnN0IGJsdXJUYXJnZXQgPSBibHVyVGFyZ2V0UmVmLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgZGVzdHJveWluZyAhPT0gdHJ1ZVxuICAgICAgICAmJiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUgfHwgbW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpXG4gICAgICAgICYmIGJsdXJUYXJnZXQgIT09IG51bGxcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgKSB7XG4gICAgICAgIGJsdXJUYXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKVxuICAgICAgICBibHVyVGFyZ2V0LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGlmIChsb2NhbFRvdWNoVGFyZ2V0RWwgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuICAgICAgICB0b3VjaFRhcmdldCA9IGxvY2FsVG91Y2hUYXJnZXRFbCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdXNlVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbW91c2VUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICByb290UmVmLnZhbHVlICE9PSBudWxsICYmIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgncS1idG4tLWFjdGl2ZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkaW5nRXZ0IChldnQpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgIGV2dC5xU2tpcFJpcHBsZSA9IHRydWVcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYW51cCh0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGNsaWNrOiBvbkNsaWNrIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IGlubmVyID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGlubmVyLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uLFxuICAgICAgICAgIGxlZnQ6IHByb3BzLnN0YWNrICE9PSB0cnVlICYmIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgIHJvbGU6ICdpbWcnLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2Jsb2NrJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICApXG5cbiAgICAgIGlubmVyID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBpbm5lcilcblxuICAgICAgaWYgKHByb3BzLmljb25SaWdodCAhPT0gdm9pZCAwICYmIHByb3BzLnJvdW5kID09PSBmYWxzZSkge1xuICAgICAgICBpbm5lci5wdXNoKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiBwcm9wcy5zdGFjayAhPT0gdHJ1ZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbWcnLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZm9jdXMtaGVscGVyJyxcbiAgICAgICAgICByZWY6IGJsdXJUYXJnZXRSZWZcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgcHJvcHMucGVyY2VudGFnZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzIGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuJyArIChwcm9wcy5kYXJrUGVyY2VudGFnZSA9PT0gdHJ1ZSA/ICcgcS1idG5fX3Byb2dyZXNzLS1kYXJrJyA6ICcnKVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzLWluZGljYXRvciBmaXQgYmxvY2snLFxuICAgICAgICAgICAgICBzdHlsZTogcGVyY2VudGFnZVN0eWxlLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAgJyArIGlubmVyQ2xhc3Nlcy52YWx1ZVxuICAgICAgICB9LCBpbm5lcilcbiAgICAgIClcblxuICAgICAgcHJvcHMubG9hZGluZyAhPT0gbnVsbCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJ1xuICAgICAgICB9LCAoKSA9PiAoXG4gICAgICAgICAgcHJvcHMubG9hZGluZyA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIGtleTogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICAgICAgICAgICAgfSwgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwID8gc2xvdHMubG9hZGluZygpIDogWyBoKFFTcGlubmVyKSBdKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKFxuICAgICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgICAgbm9kZVByb3BzLnZhbHVlLFxuICAgICAgICAgIGNoaWxkXG4gICAgICAgICksXG4gICAgICAgIFsgW1xuICAgICAgICAgIFJpcHBsZSxcbiAgICAgICAgICByaXBwbGUudmFsdWUsXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHJpcHBsZVByb3BzLnZhbHVlXG4gICAgICAgIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1l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
