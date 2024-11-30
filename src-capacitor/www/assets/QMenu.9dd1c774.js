import { u as onBeforeUnmount, ad as History, w as watch, o as onMounted, g as getCurrentInstance, D as nextTick, a7 as client, E as listenOpts, x as stopAndPrevent, ae as getEventPath, af as Platform, c as computed, ag as globalConfig, r as ref, a as onUnmounted, a3 as injectProp, h, ah as Teleport, y as isKeyCode, a6 as Transition, a5 as prevent, S as addEvt, U as cleanEvt, X as position } from "./index.6764d851.js";
import { c as getHorizontalScrollPosition, b as getVerticalScrollPosition, h as hasScrollbar, a as useTimeout, u as useTick, d as getScrollbarWidth, g as getScrollTarget } from "./scroll.a3a49254.js";
import { l as vmHasRouter, m as getParentProxy, c as createComponent, h as hSlot, n as childHasFocus } from "./uid.627d4ed7.js";
import { r as removeFocusWaitFlag, f as addFocusWaitFlag, g as addFocusFn, u as useDarkProps, a as useDark } from "./QBtn.a363fc1a.js";
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
let portalIndex = 1;
let target = document.body;
function createGlobalNode(id, portalType) {
  const el = document.createElement("div");
  el.id = portalType !== void 0 ? `q-portal--${portalType}--${portalIndex++}` : id;
  if (globalConfig.globalNodes !== void 0) {
    const cls = globalConfig.globalNodes.class;
    if (cls !== void 0) {
      el.className = cls;
    }
  }
  target.appendChild(el);
  return el;
}
function removeGlobalNode(el) {
  el.remove();
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true)
      return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    backdropFilter: String,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[props.position][0],
      () => defaultTransitions[props.position][1]
    );
    const backdropStyle = computed(() => transitionStyle.value + (props.backdropFilter !== void 0 ? `;backdrop-filter:${props.backdropFilter};-webkit-backdrop-filter:${props.backdropFilter}` : ""));
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      "dialog"
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = (selector !== "" ? node.querySelector(selector) : null) || node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target2) {
        refocusTarget = target2 || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: backdropStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          onClick: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
const useAnchorProps = {
  target: {
    default: true
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target2 = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target2, "touchmove", "mobileCleanup", "passive"],
          [target2, "touchend", "mobileCleanup", "passive"],
          [target2, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null)
        return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target2 = evt.target;
  if (target2 === void 0 || target2.nodeType === 8 || target2.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex2 = portalProxyList.length - 1;
  while (portalIndex2 >= 0) {
    const proxy = portalProxyList[portalIndex2].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex2--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex2--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target2) === false) && (target2 === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target2) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) {
    return;
  }
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: maxWidth || "100vw",
    maxHeight: maxHeight || "100vh",
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escapeKey");
      hide(evt);
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
export { QDialog as Q, useModelToggleEmits as a, useModelToggle as b, useHistory as c, usePreventScroll as d, clearSelection as e, useAnchorProps as f, useAnchor as g, QMenu as h, getPortalProxy as i, closePortals as j, useModelToggleProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUU1lbnUuOWRkMWM3NzQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10cmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9nbG9iYWwtbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3BvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZXNjYXBlLWtleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZm9jdXNvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9RRGlhbG9nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2Nyb2xsLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvY2xpY2stb3V0c2lkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcG9zaXRpb24tZW5naW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tZW51L1FNZW51LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKSB7XG4gIGxldCBoaXN0b3J5RW50cnlcblxuICBmdW5jdGlvbiByZW1vdmVGcm9tSGlzdG9yeSAoKSB7XG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlRnJvbUhpc3RvcnksXG5cbiAgICBhZGRUb0hpc3RvcnkgKCkge1xuICAgICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgICBjb25kaXRpb246ICgpID0+IGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlLFxuICAgICAgICBoYW5kbGVyOiBoaWRlXG4gICAgICB9XG5cbiAgICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlU2hvdyAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVTaG93KGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gfHwgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImltcG9ydCB7IGdldEV2ZW50UGF0aCwgbGlzdGVuT3B0cywgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhhc1Njcm9sbGJhciwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxubGV0XG4gIHJlZ2lzdGVyZWQgPSAwLFxuICBzY3JvbGxQb3NpdGlvblgsXG4gIHNjcm9sbFBvc2l0aW9uWSxcbiAgbWF4U2Nyb2xsVG9wLFxuICB2cFBlbmRpbmdVcGRhdGUgPSBmYWxzZSxcbiAgYm9keUxlZnQsXG4gIGJvZHlUb3AsXG4gIGhyZWYsXG4gIGNsb3NlVGltZXIgPSBudWxsXG5cbmZ1bmN0aW9uIG9uV2hlZWwgKGUpIHtcbiAgaWYgKHNob3VsZFByZXZlbnRTY3JvbGwoZSkpIHtcbiAgICBzdG9wQW5kUHJldmVudChlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZFByZXZlbnRTY3JvbGwgKGUpIHtcbiAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5IHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1sYXlvdXRfX2JhY2tkcm9wJykpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY29uc3RcbiAgICBwYXRoID0gZ2V0RXZlbnRQYXRoKGUpLFxuICAgIHNoaWZ0ID0gZS5zaGlmdEtleSAmJiAhZS5kZWx0YVgsXG4gICAgc2Nyb2xsWSA9ICFzaGlmdCAmJiBNYXRoLmFicyhlLmRlbHRhWCkgPD0gTWF0aC5hYnMoZS5kZWx0YVkpLFxuICAgIGRlbHRhID0gc2hpZnQgfHwgc2Nyb2xsWSA/IGUuZGVsdGFZIDogZS5kZWx0YVhcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbCA9IHBhdGhbIGluZGV4IF1cblxuICAgIGlmIChoYXNTY3JvbGxiYXIoZWwsIHNjcm9sbFkpKSB7XG4gICAgICByZXR1cm4gc2Nyb2xsWVxuICAgICAgICA/IChcbiAgICAgICAgICAgIGRlbHRhIDwgMCAmJiBlbC5zY3JvbGxUb3AgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA9PT0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIGRlbHRhIDwgMCAmJiBlbC5zY3JvbGxMZWZ0ID09PSAwXG4gICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICA6IGRlbHRhID4gMCAmJiBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50V2lkdGggPT09IGVsLnNjcm9sbFdpZHRoXG4gICAgICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIG9uQXBwbGVTY3JvbGwgKGUpIHtcbiAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgIC8vIHJlcXVpcmVkLCBvdGhlcndpc2UgaU9TIGJsb2NrcyBmdXJ0aGVyIHNjcm9sbGluZ1xuICAgIC8vIHVudGlsIHRoZSBtb2JpbGUgc2Nyb2xsYmFyIGRpc3NhcHBlYXJzXG4gICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cbn1cblxuZnVuY3Rpb24gb25BcHBsZVJlc2l6ZSAoZXZ0KSB7XG4gIGlmICh2cFBlbmRpbmdVcGRhdGUgPT09IHRydWUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZwUGVuZGluZ1VwZGF0ZSA9IHRydWVcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHZwUGVuZGluZ1VwZGF0ZSA9IGZhbHNlXG5cbiAgICBjb25zdFxuICAgICAgeyBoZWlnaHQgfSA9IGV2dC50YXJnZXQsXG4gICAgICB7IGNsaWVudEhlaWdodCwgc2Nyb2xsVG9wIH0gPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50XG5cbiAgICBpZiAobWF4U2Nyb2xsVG9wID09PSB2b2lkIDAgfHwgaGVpZ2h0ICE9PSB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgIG1heFNjcm9sbFRvcCA9IGNsaWVudEhlaWdodCAtIGhlaWdodFxuICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID4gbWF4U2Nyb2xsVG9wKSB7XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCAtPSBNYXRoLmNlaWwoKHNjcm9sbFRvcCAtIG1heFNjcm9sbFRvcCkgLyA4KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gYXBwbHkgKGFjdGlvbikge1xuICBjb25zdFxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgIGhhc1ZpZXdwb3J0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcblxuICBpZiAoYWN0aW9uID09PSAnYWRkJykge1xuICAgIGNvbnN0IHsgb3ZlcmZsb3dZLCBvdmVyZmxvd1ggfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvZHkpXG5cbiAgICBzY3JvbGxQb3NpdGlvblggPSBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24od2luZG93KVxuICAgIHNjcm9sbFBvc2l0aW9uWSA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24od2luZG93KVxuICAgIGJvZHlMZWZ0ID0gYm9keS5zdHlsZS5sZWZ0XG4gICAgYm9keVRvcCA9IGJvZHkuc3R5bGUudG9wXG5cbiAgICBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICAgIGJvZHkuc3R5bGUubGVmdCA9IGAtJHsgc2Nyb2xsUG9zaXRpb25YIH1weGBcbiAgICBib2R5LnN0eWxlLnRvcCA9IGAtJHsgc2Nyb2xsUG9zaXRpb25ZIH1weGBcblxuICAgIGlmIChvdmVyZmxvd1ggIT09ICdoaWRkZW4nICYmIChvdmVyZmxvd1ggPT09ICdzY3JvbGwnIHx8IGJvZHkuc2Nyb2xsV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteCcpXG4gICAgfVxuICAgIGlmIChvdmVyZmxvd1kgIT09ICdoaWRkZW4nICYmIChvdmVyZmxvd1kgPT09ICdzY3JvbGwnIHx8IGJvZHkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSkge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci15JylcbiAgICB9XG5cbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tcHJldmVudC1zY3JvbGwnKVxuICAgIGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgPSB0cnVlXG5cbiAgICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGhhc1ZpZXdwb3J0ID09PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlU2Nyb2xsLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbGllbnQuaXMuZGVza3RvcCA9PT0gdHJ1ZSAmJiBjbGllbnQuaXMubWFjID09PSB0cnVlKSB7XG4gICAgLy8gcmVmLiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE3LzAxL3Njcm9sbGluZy1pbnRlcnZlbnRpb25cbiAgICB3aW5kb3dbIGAkeyBhY3Rpb24gfUV2ZW50TGlzdGVuZXJgIF0oJ3doZWVsJywgb25XaGVlbCwgbGlzdGVuT3B0cy5ub3RQYXNzaXZlKVxuICB9XG5cbiAgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZScpIHtcbiAgICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGhhc1ZpZXdwb3J0ID09PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVNjcm9sbCwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tcHJldmVudC1zY3JvbGwnKVxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteCcpXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci15JylcblxuICAgIGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgPSBmYWxzZVxuXG4gICAgYm9keS5zdHlsZS5sZWZ0ID0gYm9keUxlZnRcbiAgICBib2R5LnN0eWxlLnRvcCA9IGJvZHlUb3BcblxuICAgIC8vIHNjcm9sbCBiYWNrIG9ubHkgaWYgcm91dGUgaGFzIG5vdCBjaGFuZ2VkXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmID09PSBocmVmKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsUG9zaXRpb25YLCBzY3JvbGxQb3NpdGlvblkpXG4gICAgfVxuXG4gICAgbWF4U2Nyb2xsVG9wID0gdm9pZCAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGxldCBhY3Rpb24gPSAnYWRkJ1xuXG4gIGlmIChzdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJlZ2lzdGVyZWQrK1xuXG4gICAgaWYgKGNsb3NlVGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVyKVxuICAgICAgY2xvc2VUaW1lciA9IG51bGxcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChyZWdpc3RlcmVkID4gMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChyZWdpc3RlcmVkID09PSAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZWdpc3RlcmVkLS1cblxuICAgIGlmIChyZWdpc3RlcmVkID4gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgYWN0aW9uID0gJ3JlbW92ZSdcblxuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlICYmIGNsaWVudC5pcy5uYXRpdmVNb2JpbGUgPT09IHRydWUpIHtcbiAgICAgIGNsb3NlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG4gICAgICBjbG9zZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGFwcGx5KGFjdGlvbilcbiAgICAgICAgY2xvc2VUaW1lciA9IG51bGxcbiAgICAgIH0sIDEwMClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGFwcGx5KGFjdGlvbilcbn1cbiIsImltcG9ydCBwcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL3V0aWxzL3ByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCBjdXJyZW50U3RhdGVcblxuICByZXR1cm4ge1xuICAgIHByZXZlbnRCb2R5U2Nyb2xsIChzdGF0ZSkge1xuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZSAhPT0gY3VycmVudFN0YXRlXG4gICAgICAgICYmIChjdXJyZW50U3RhdGUgIT09IHZvaWQgMCB8fCBzdGF0ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgICAgICBwcmV2ZW50U2Nyb2xsKHN0YXRlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBsYXRmb3JtIGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbiAoKSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBpZiAoc2VsZWN0aW9uLmVtcHR5ICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICBQbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgc2VsZWN0aW9uLmFkZFJhbmdlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUcmFuc2l0aW9uUHJvcHMgPSB7XG4gIHRyYW5zaXRpb25TaG93OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25IaWRlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGRlZmF1bHRTaG93Rm4gPSAoKSA9PiB7fSwgZGVmYXVsdEhpZGVGbiA9ICgpID0+IHt9KSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvblByb3BzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaG93ID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvblNob3cgfHwgZGVmYXVsdFNob3dGbigpIH1gXG4gICAgICBjb25zdCBoaWRlID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvbkhpZGUgfHwgZGVmYXVsdEhpZGVGbigpIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVhcjogdHJ1ZSxcblxuICAgICAgICBlbnRlckZyb21DbGFzczogYCR7IHNob3cgfS1lbnRlci1mcm9tYCxcbiAgICAgICAgZW50ZXJBY3RpdmVDbGFzczogYCR7IHNob3cgfS1lbnRlci1hY3RpdmVgLFxuICAgICAgICBlbnRlclRvQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItdG9gLFxuXG4gICAgICAgIGxlYXZlRnJvbUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWZyb21gLFxuICAgICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWFjdGl2ZWAsXG4gICAgICAgIGxlYXZlVG9DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS10b2BcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIHRyYW5zaXRpb25TdHlsZTogY29tcHV0ZWQoKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYClcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2xvYmFsQ29uZmlnIH0gZnJvbSAnLi9nbG9iYWwtY29uZmlnLmpzJ1xuXG5jb25zdCBub2Rlc0xpc3QgPSBbXVxuY29uc3QgcG9ydGFsVHlwZUxpc3QgPSBbXVxuXG5sZXQgcG9ydGFsSW5kZXggPSAxXG5sZXQgdGFyZ2V0ID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gdm9pZCAwXG4gIDogZG9jdW1lbnQuYm9keVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2xvYmFsTm9kZSAoaWQsIHBvcnRhbFR5cGUpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGVsLmlkID0gcG9ydGFsVHlwZSAhPT0gdm9pZCAwXG4gICAgPyBgcS1wb3J0YWwtLSR7IHBvcnRhbFR5cGUgfS0tJHsgcG9ydGFsSW5kZXgrKyB9YFxuICAgIDogaWRcblxuICBpZiAoZ2xvYmFsQ29uZmlnLmdsb2JhbE5vZGVzICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBjbHMgPSBnbG9iYWxDb25maWcuZ2xvYmFsTm9kZXMuY2xhc3NcbiAgICBpZiAoY2xzICE9PSB2b2lkIDApIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGNsc1xuICAgIH1cbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChlbClcbiAgbm9kZXNMaXN0LnB1c2goZWwpXG4gIHBvcnRhbFR5cGVMaXN0LnB1c2gocG9ydGFsVHlwZSlcblxuICByZXR1cm4gZWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUdsb2JhbE5vZGUgKGVsKSB7XG4gIGNvbnN0IG5vZGVJbmRleCA9IG5vZGVzTGlzdC5pbmRleE9mKGVsKVxuXG4gIG5vZGVzTGlzdC5zcGxpY2Uobm9kZUluZGV4LCAxKVxuICBwb3J0YWxUeXBlTGlzdC5zcGxpY2Uobm9kZUluZGV4LCAxKVxuXG4gIGVsLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VHbG9iYWxOb2Rlc1RhcmdldCAobmV3VGFyZ2V0KSB7XG4gIGlmIChuZXdUYXJnZXQgPT09IHRhcmdldCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGFyZ2V0ID0gbmV3VGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgIC8vIG9yIHdlIGhhdmUgbGVzcyB0aGFuIDIgZGlhbG9nczpcbiAgICB8fCBwb3J0YWxUeXBlTGlzdC5yZWR1Y2UoKGFjYywgdHlwZSkgPT4gKHR5cGUgPT09ICdkaWFsb2cnID8gYWNjICsgMSA6IGFjYyksIDApIDwgMlxuICApIHtcbiAgICBub2Rlc0xpc3QuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChub2RlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGxhc3REaWFsb2dJbmRleCA9IHBvcnRhbFR5cGVMaXN0Lmxhc3RJbmRleE9mKCdkaWFsb2cnKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWwgPSBub2Rlc0xpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKGkgPT09IGxhc3REaWFsb2dJbmRleCB8fCBwb3J0YWxUeXBlTGlzdFsgaSBdICE9PSAnZGlhbG9nJylcbiAgICAgICYmIGVsLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50ICE9PSB2b2lkIDAgJiYgcGFyZW50LiRvcHRpb25zLm5hbWUgPT09ICdRUG9wdXBQcm94eScpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJveHlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9IHdoaWxlIChwcm94eSAhPT0gdm9pZCAwICYmIHByb3h5ICE9PSBudWxsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxzIChwcm94eSwgZXZ0LCBkZXB0aCkge1xuICB3aGlsZSAoZGVwdGggIT09IDAgJiYgcHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbCkge1xuICAgIGlmIChwcm94eS5fX3FQb3J0YWwgPT09IHRydWUpIHtcbiAgICAgIGRlcHRoLS1cblxuICAgICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgICAgcHJveHkgPSBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBldnQpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgIH1cblxuICAgIHByb3h5ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgb25Vbm1vdW50ZWQsIFRlbGVwb3J0IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzV2FpdEZsYWcsIHJlbW92ZUZvY3VzV2FpdEZsYWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBjcmVhdGVHbG9iYWxOb2RlLCByZW1vdmVHbG9iYWxOb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9nbG9iYWwtbm9kZXMuanMnXG5pbXBvcnQgeyBwb3J0YWxQcm94eUxpc3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuLyoqXG4gKiBOb29wIGludGVybmFsIGNvbXBvbmVudCB0byBlYXNlIHRlc3RpbmdcbiAqIG9mIHRoZSB0ZWxlcG9ydGVkIGNvbnRlbnQuXG4gKlxuICogY29uc3Qgd3JhcHBlciA9IG1vdW50KFFEaWFsb2csIHsgLi4uIH0pXG4gKiBjb25zdCB0ZWxlcG9ydGVkV3JhcHBlciA9IHdyYXBwZXIuZmluZENvbXBvbmVudCh7IG5hbWU6ICdRUG9ydGFsJyB9KVxuICovXG5jb25zdCBRUG9ydGFsID0gY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQb3J0YWwnLFxuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IHNsb3RzLmRlZmF1bHQoKVxuICB9XG59KVxuXG5mdW5jdGlvbiBpc09uR2xvYmFsRGlhbG9nICh2bSkge1xuICB2bSA9IHZtLnBhcmVudFxuXG4gIHdoaWxlICh2bSAhPT0gdm9pZCAwICYmIHZtICE9PSBudWxsKSB7XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FHbG9iYWxEaWFsb2cnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAodm0udHlwZS5uYW1lID09PSAnUURpYWxvZycgfHwgdm0udHlwZS5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2bSA9IHZtLnBhcmVudFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIFdhcm5pbmchXG4vLyBZb3UgTVVTVCBzcGVjaWZ5IFwiaW5oZXJpdEF0dHJzOiBmYWxzZVwiIGluIHlvdXIgY29tcG9uZW50XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsIHR5cGUpIHtcbiAgLy8gc2hvd2luZywgaW5jbHVkaW5nIHdoaWxlIGluIHNob3cvaGlkZSB0cmFuc2l0aW9uXG4gIGNvbnN0IHBvcnRhbElzQWN0aXZlID0gcmVmKGZhbHNlKVxuXG4gIC8vIHNob3dpbmcgJiBub3QgaW4gYW55IHNob3cvaGlkZSB0cmFuc2l0aW9uXG4gIGNvbnN0IHBvcnRhbElzQWNjZXNzaWJsZSA9IHJlZihmYWxzZSlcblxuICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnRhbElzQWN0aXZlLFxuICAgICAgcG9ydGFsSXNBY2Nlc3NpYmxlLFxuXG4gICAgICBzaG93UG9ydGFsOiBub29wLFxuICAgICAgaGlkZVBvcnRhbDogbm9vcCxcbiAgICAgIHJlbmRlclBvcnRhbDogbm9vcFxuICAgIH1cbiAgfVxuXG4gIGxldCBwb3J0YWxFbCA9IG51bGxcbiAgY29uc3QgZm9jdXNPYmogPSB7fVxuICBjb25zdCBvbkdsb2JhbERpYWxvZyA9IHR5cGUgPT09ICdkaWFsb2cnICYmIGlzT25HbG9iYWxEaWFsb2codm0pXG5cbiAgZnVuY3Rpb24gc2hvd1BvcnRhbCAoaXNSZWFkeSkge1xuICAgIGlmIChpc1JlYWR5ID09PSB0cnVlKSB7XG4gICAgICByZW1vdmVGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgICAgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID0gZmFsc2VcblxuICAgIGlmIChwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChvbkdsb2JhbERpYWxvZyA9PT0gZmFsc2UgJiYgcG9ydGFsRWwgPT09IG51bGwpIHtcbiAgICAgICAgcG9ydGFsRWwgPSBjcmVhdGVHbG9iYWxOb2RlKGZhbHNlLCB0eXBlKVxuICAgICAgfVxuXG4gICAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9IHRydWVcblxuICAgICAgLy8gcmVnaXN0ZXIgcG9ydGFsXG4gICAgICBwb3J0YWxQcm94eUxpc3QucHVzaCh2bS5wcm94eSlcblxuICAgICAgYWRkRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlUG9ydGFsIChpc1JlYWR5KSB7XG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID0gZmFsc2VcblxuICAgIGlmIChpc1JlYWR5ICE9PSB0cnVlKSByZXR1cm5cblxuICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSBmYWxzZVxuXG4gICAgLy8gdW5yZWdpc3RlciBwb3J0YWxcbiAgICBjb25zdCBpbmRleCA9IHBvcnRhbFByb3h5TGlzdC5pbmRleE9mKHZtLnByb3h5KVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbEVsICE9PSBudWxsKSB7XG4gICAgICByZW1vdmVHbG9iYWxOb2RlKHBvcnRhbEVsKVxuICAgICAgcG9ydGFsRWwgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25Vbm1vdW50ZWQoKCkgPT4geyBoaWRlUG9ydGFsKHRydWUpIH0pXG5cbiAgLy8gbmVlZGVkIGZvciBwb3J0YWwgdm0gZGV0ZWN0aW9uXG4gIHZtLnByb3h5Ll9fcVBvcnRhbCA9IHRydWVcblxuICAvLyBwdWJsaWMgd2F5IG9mIGFjY2Vzc2luZyB0aGUgcmVuZGVyZWQgY29udGVudFxuICBpbmplY3RQcm9wKHZtLnByb3h5LCAnY29udGVudEVsJywgKCkgPT4gaW5uZXJSZWYudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBzaG93UG9ydGFsLFxuICAgIGhpZGVQb3J0YWwsXG5cbiAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICByZW5kZXJQb3J0YWw6ICgpID0+IChcbiAgICAgIG9uR2xvYmFsRGlhbG9nID09PSB0cnVlXG4gICAgICAgID8gcmVuZGVyUG9ydGFsQ29udGVudCgpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBbIGgoVGVsZXBvcnQsIHsgdG86IHBvcnRhbEVsIH0sIGgoUVBvcnRhbCwgcmVuZGVyUG9ydGFsQ29udGVudCkpIF1cbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cbmxldCBlc2NEb3duXG5cbmZ1bmN0aW9uIG9uS2V5ZG93biAoZXZ0KSB7XG4gIGVzY0Rvd24gPSBldnQua2V5Q29kZSA9PT0gMjdcbn1cblxuZnVuY3Rpb24gb25CbHVyICgpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBvbktleXVwIChldnQpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcblxuICAgIGlmIChpc0tleUNvZGUoZXZ0LCAyNykgPT09IHRydWUpIHtcbiAgICAgIGhhbmRsZXJzWyBoYW5kbGVycy5sZW5ndGggLSAxIF0oZXZ0KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUgKGFjdGlvbikge1xuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXlkb3duJywgb25LZXlkb3duKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdibHVyJywgb25CbHVyKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXl1cCcsIG9uS2V5dXApXG4gIGVzY0Rvd24gPSBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXNjYXBlS2V5IChmbikge1xuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICBoYW5kbGVycy5wdXNoKGZuKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdXBkYXRlKCdhZGRFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVzY2FwZUtleSAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24sIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUhpc3RvcnkgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtaGlzdG9yeS5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0LmpzJ1xuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpY2suanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VQcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNoaWxkSGFzRm9jdXMgfSBmcm9tICcuLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgYWRkRXNjYXBlS2V5LCByZW1vdmVFc2NhcGVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2VzY2FwZS1rZXkuanMnXG5pbXBvcnQgeyBhZGRGb2N1c291dCwgcmVtb3ZlRm9jdXNvdXQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3Vzb3V0LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcblxubGV0IG1heGltaXplZE1vZGFscyA9IDBcblxuY29uc3QgcG9zaXRpb25DbGFzcyA9IHtcbiAgc3RhbmRhcmQ6ICdmaXhlZC1mdWxsIGZsZXgtY2VudGVyJyxcbiAgdG9wOiAnZml4ZWQtdG9wIGp1c3RpZnktY2VudGVyJyxcbiAgYm90dG9tOiAnZml4ZWQtYm90dG9tIGp1c3RpZnktY2VudGVyJyxcbiAgcmlnaHQ6ICdmaXhlZC1yaWdodCBpdGVtcy1jZW50ZXInLFxuICBsZWZ0OiAnZml4ZWQtbGVmdCBpdGVtcy1jZW50ZXInXG59XG5cbmNvbnN0IGRlZmF1bHRUcmFuc2l0aW9ucyA9IHtcbiAgc3RhbmRhcmQ6IFsgJ3NjYWxlJywgJ3NjYWxlJyBdLFxuICB0b3A6IFsgJ3NsaWRlLWRvd24nLCAnc2xpZGUtdXAnIF0sXG4gIGJvdHRvbTogWyAnc2xpZGUtdXAnLCAnc2xpZGUtZG93bicgXSxcbiAgcmlnaHQ6IFsgJ3NsaWRlLWxlZnQnLCAnc2xpZGUtcmlnaHQnIF0sXG4gIGxlZnQ6IFsgJ3NsaWRlLXJpZ2h0JywgJ3NsaWRlLWxlZnQnIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEaWFsb2cnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHRyYW5zaXRpb25TaG93OiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuICAgIHRyYW5zaXRpb25IaWRlOiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG4gICAgYWxsb3dGb2N1c091dHNpZGU6IEJvb2xlYW4sXG5cbiAgICBub0VzY0Rpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9CYWNrZHJvcERpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG4gICAgbm9TaGFrZTogQm9vbGVhbixcblxuICAgIHNlYW1sZXNzOiBCb29sZWFuLFxuXG4gICAgbWF4aW1pemVkOiBCb29sZWFuLFxuICAgIGZ1bGxXaWR0aDogQm9vbGVhbixcbiAgICBmdWxsSGVpZ2h0OiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYmFja2Ryb3BGaWx0ZXI6IFN0cmluZyxcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gdmFsID09PSAnc3RhbmRhcmQnXG4gICAgICAgIHx8IFsgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2YWwpXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnc2hha2UnLCAnY2xpY2snLCAnZXNjYXBlS2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBhbmltYXRpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgc2hha2VUaW1lb3V0ID0gbnVsbCwgcmVmb2N1c1RhcmdldCA9IG51bGwsIGlzTWF4aW1pemVkLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBwcm9wcyxcbiAgICAgICgpID0+IGRlZmF1bHRUcmFuc2l0aW9uc1sgcHJvcHMucG9zaXRpb24gXVsgMCBdLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAxIF1cbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICArIChcbiAgICAgICAgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgIT09IHZvaWQgMFxuICAgICAgICAgIC8vIFNhZmFyaSByZXF1aXJlcyB0aGUgLXdlYmtpdCBwcmVmaXhcbiAgICAgICAgICA/IGA7YmFja2Ryb3AtZmlsdGVyOiR7IHByb3BzLmJhY2tkcm9wRmlsdGVyIH07LXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6JHsgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgfWBcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKSlcblxuICAgIGNvbnN0IHsgc2hvd1BvcnRhbCwgaGlkZVBvcnRhbCwgcG9ydGFsSXNBY2Nlc3NpYmxlLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbChcbiAgICAgIHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgJ2RpYWxvZydcbiAgICApXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1kaWFsb2dfX2lubmVyIGZsZXggbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5tYXhpbWl6ZWQgPT09IHRydWUgPyAnbWF4aW1pemVkJyA6ICdtaW5pbWl6ZWQnIH1gXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5wb3NpdGlvbiB9ICR7IHBvc2l0aW9uQ2xhc3NbIHByb3BzLnBvc2l0aW9uIF0gfWBcbiAgICAgICsgKGFuaW1hdGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1hbmltYXRpbmcnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsV2lkdGggPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tZnVsbHdpZHRoJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZnVsbEhlaWdodCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsaGVpZ2h0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLXNxdWFyZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB1c2VCYWNrZHJvcCA9IGNvbXB1dGVkKCgpID0+IHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMuc2VhbWxlc3MgIT09IHRydWUpXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IHJvb3RDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gW1xuICAgICAgJ3EtZGlhbG9nIGZ1bGxzY3JlZW4gbm8tcG9pbnRlci1ldmVudHMgJ1xuICAgICAgICArIGBxLWRpYWxvZy0tJHsgdXNlQmFja2Ryb3AudmFsdWUgPT09IHRydWUgPyAnbW9kYWwnIDogJ3NlYW1sZXNzJyB9YCxcbiAgICAgIGF0dHJzLmNsYXNzXG4gICAgXSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1heGltaXplZCwgc3RhdGUgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXhpbWl6ZWQoc3RhdGUpXG4gICAgfSlcblxuICAgIHdhdGNoKHVzZUJhY2tkcm9wLCB2YWwgPT4ge1xuICAgICAgcHJldmVudEJvZHlTY3JvbGwodmFsKVxuXG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCkge1xuICAgICAgYWRkVG9IaXN0b3J5KClcblxuICAgICAgcmVmb2N1c1RhcmdldCA9IHByb3BzLm5vUmVmb2N1cyA9PT0gZmFsc2UgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gbnVsbFxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIHVwZGF0ZU1heGltaXplZChwcm9wcy5tYXhpbWl6ZWQpXG4gICAgICBzaG93UG9ydGFsKClcbiAgICAgIGFuaW1hdGluZy52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gbnVsbCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgICByZWdpc3RlclRpY2soZm9jdXMpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlVGljaygpXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh2bS5wcm94eS4kcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAocHJvcHMuc2VhbWxlc3MgIT09IHRydWUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgeyB0b3AsIGJvdHRvbSB9ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgICAgeyBpbm5lckhlaWdodCB9ID0gd2luZG93LFxuICAgICAgICAgICAgICBoZWlnaHQgPSB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICAgID8gd2luZG93LnZpc3VhbFZpZXdwb3J0LmhlaWdodFxuICAgICAgICAgICAgICAgIDogaW5uZXJIZWlnaHRcblxuICAgICAgICAgICAgaWYgKHRvcCA+IDAgJiYgYm90dG9tID4gaGVpZ2h0IC8gMikge1xuICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGJvdHRvbSA+PSBpbm5lckhlaWdodFxuICAgICAgICAgICAgICAgICAgPyBJbmZpbml0eVxuICAgICAgICAgICAgICAgICAgOiBNYXRoLmNlaWwoZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgKyBib3R0b20gLSBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlcXVpcmVkIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcImRvdWJsZS10YXAgbmVlZGVkXCIgaXNzdWVcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IHRydWVcbiAgICAgICAgICBpbm5lclJlZi52YWx1ZS5jbGljaygpXG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgc2hvd1BvcnRhbCh0cnVlKSAvLyBkb25lIHNob3dpbmcgcG9ydGFsXG4gICAgICAgIGFuaW1hdGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0KSB7XG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcbiAgICAgIGNsZWFudXAodHJ1ZSlcbiAgICAgIGFuaW1hdGluZy52YWx1ZSA9IHRydWVcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBpZiAocmVmb2N1c1RhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAoKGV2dCAmJiBldnQudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMFxuICAgICAgICAgID8gcmVmb2N1c1RhcmdldC5jbG9zZXN0KCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknKVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICkgfHwgcmVmb2N1c1RhcmdldCkuZm9jdXMoKVxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzIChzZWxlY3Rvcikge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gKHNlbGVjdG9yICE9PSAnJyA/IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBudWxsKVxuICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgIHx8IG5vZGVcbiAgICAgICAgbm9kZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hha2UgKGZvY3VzVGFyZ2V0KSB7XG4gICAgICBpZiAoZm9jdXNUYXJnZXQgJiYgdHlwZW9mIGZvY3VzVGFyZ2V0LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvY3VzVGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2hha2UnKVxuXG4gICAgICBjb25zdCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgaWYgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgc2hha2VUaW1lb3V0ICE9PSBudWxsICYmIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgICAgICBpZiAoaW5uZXJSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgICAgICAvLyBzb21lIHBsYXRmb3JtcyAobGlrZSBkZXNrdG9wIENocm9tZSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmUgY2FsbGluZyBmb2N1cygpIGFnYWluXG4gICAgICAgICAgICBmb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxNzApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKCkge1xuICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ID09PSB0cnVlIHx8IHByb3BzLm5vRXNjRGlzbWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByb3BzLm1heGltaXplZCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub1NoYWtlICE9PSB0cnVlICYmIHNoYWtlKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBpZiAoc2hha2VUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyA9PT0gdHJ1ZSB8fCBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZU1heGltaXplZChmYWxzZSlcblxuICAgICAgICBpZiAocHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICBwcmV2ZW50Qm9keVNjcm9sbChmYWxzZSlcbiAgICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF4aW1pemVkIChhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlzTWF4aW1pemVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgbWF4aW1pemVkTW9kYWxzIDwgMSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZGlhbG9nJylcbiAgICAgICAgICBtYXhpbWl6ZWRNb2RhbHMrK1xuXG4gICAgICAgICAgaXNNYXhpbWl6ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzTWF4aW1pemVkID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChtYXhpbWl6ZWRNb2RhbHMgPCAyKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWRpYWxvZycpXG4gICAgICAgIH1cblxuICAgICAgICBtYXhpbWl6ZWRNb2RhbHMtLVxuICAgICAgICBpc01heGltaXplZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJhY2tkcm9wQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHByb3BzLm5vQmFja2Ryb3BEaXNtaXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLm5vU2hha2UgIT09IHRydWUpIHtcbiAgICAgICAgc2hha2UoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2UgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuYWxsb3dGb2N1c091dHNpZGUgIT09IHRydWVcbiAgICAgICAgJiYgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIGNoaWxkSGFzRm9jdXMoaW5uZXJSZWYudmFsdWUsIGV2dC50YXJnZXQpICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgZm9jdXMoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKScpXG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgICBmb2N1cywgc2hha2UsXG5cbiAgICAgIC8vIHByaXZhdGUgYnV0IG5lZWRlZCBieSBRU2VsZWN0XG4gICAgICBfX3VwZGF0ZVJlZm9jdXNUYXJnZXQgKHRhcmdldCkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gdGFyZ2V0IHx8IG51bGxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0YWxDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1tb2RhbCc6IHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGNsYXNzOiByb290Q2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyxcbiAgICAgICAgICBhcHBlYXI6IHRydWVcbiAgICAgICAgfSwgKCkgPT4gKFxuICAgICAgICAgIHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWRpYWxvZ19fYmFja2Ryb3AgZml4ZWQtZnVsbCcsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgb25DbGljazogb25CYWNrZHJvcENsaWNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpLFxuXG4gICAgICAgIGgoXG4gICAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGNvbnN0IHVzZUFuY2hvclByb3BzID0ge1xuICB0YXJnZXQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIG5vUGFyZW50RXZlbnQ6IEJvb2xlYW4sXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgaWYgKHRvdWNoVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgZXZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uZmlndXJlQW5jaG9yRWwgPSBmdW5jdGlvbiAoY29udGV4dCA9IHByb3BzLmNvbnRleHRNZW51KSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICBwcm9wcyxcbiAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0XG4pIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcG9ydGFsUHJveHlMaXN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9wb3J0YWwuanMnXG5cbmxldCB0aW1lciA9IG51bGxcblxuY29uc3RcbiAgeyBub3RQYXNzaXZlQ2FwdHVyZSB9ID0gbGlzdGVuT3B0cyxcbiAgcmVnaXN0ZXJlZExpc3QgPSBbXVxuXG5mdW5jdGlvbiBnbG9iYWxIYW5kbGVyIChldnQpIHtcbiAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIHRpbWVyID0gbnVsbFxuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gIGlmIChcbiAgICB0YXJnZXQgPT09IHZvaWQgMFxuICAgIHx8IHRhcmdldC5ub2RlVHlwZSA9PT0gOFxuICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXBvaW50ZXItZXZlbnRzJykgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjaGVjayBsYXN0IHBvcnRhbCB2bSBpZiBpdCdzXG4gIC8vIGEgUURpYWxvZyBhbmQgbm90IGluIHNlYW1sZXNzIG1vZGVcbiAgbGV0IHBvcnRhbEluZGV4ID0gcG9ydGFsUHJveHlMaXN0Lmxlbmd0aCAtIDFcblxuICB3aGlsZSAocG9ydGFsSW5kZXggPj0gMCkge1xuICAgIGNvbnN0IHByb3h5ID0gcG9ydGFsUHJveHlMaXN0WyBwb3J0YWxJbmRleCBdLiRcblxuICAgIC8vIHNraXAgUVRvb2x0aXAgcG9ydGFsc1xuICAgIGlmIChwcm94eS50eXBlLm5hbWUgPT09ICdRVG9vbHRpcCcpIHtcbiAgICAgIHBvcnRhbEluZGV4LS1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSAhPT0gJ1FEaWFsb2cnKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGlmIChwcm94eS5wcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcG9ydGFsSW5kZXgtLVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc3RhdGUgPSByZWdpc3RlcmVkTGlzdFsgaSBdXG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIHN0YXRlLmFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICAgIHx8IHN0YXRlLmFuY2hvckVsLnZhbHVlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgICApXG4gICAgICAmJiAoXG4gICAgICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgICB8fCAoXG4gICAgICAgICAgc3RhdGUuaW5uZXJSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBzdGF0ZS5pbm5lclJlZi52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICApXG4gICAgKSB7XG4gICAgICAvLyBtYXJrIHRoZSBldmVudCBhcyBiZWluZyBwcm9jZXNzZWQgYnkgY2xpY2tPdXRzaWRlXG4gICAgICAvLyB1c2VkIHRvIHByZXZlbnQgcmVmb2N1cyBhZnRlciBtZW51IGNsb3NlXG4gICAgICBldnQucUNsaWNrT3V0c2lkZSA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ2xpY2tPdXRzaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsaWNrT3V0c2lkZSAoY2xpY2tPdXRzaWRlUHJvcHMpIHtcbiAgcmVnaXN0ZXJlZExpc3QucHVzaChjbGlja091dHNpZGVQcm9wcylcblxuICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZExpc3QuZmluZEluZGV4KGggPT4gaCA9PT0gY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlZ2lzdGVyZWRMaXN0LnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChyZWdpc3RlcmVkTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxubGV0IHZwTGVmdCwgdnBUb3BcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUG9zaXRpb24gKHBvcykge1xuICBjb25zdCBwYXJ0cyA9IHBvcy5zcGxpdCgnICcpXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoWyAndG9wJywgJ2NlbnRlcicsICdib3R0b20nIF0uaW5jbHVkZXMocGFydHNbIDAgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IHN0YXJ0IHdpdGggb25lIG9mIHRvcC9jZW50ZXIvYm90dG9tJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoWyAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnLCAnc3RhcnQnLCAnZW5kJyBdLmluY2x1ZGVzKHBhcnRzWyAxIF0pICE9PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignQW5jaG9yL1NlbGYgcG9zaXRpb24gbXVzdCBlbmQgd2l0aCBvbmUgb2YgbGVmdC9taWRkbGUvcmlnaHQvc3RhcnQvZW5kJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVPZmZzZXQgKHZhbCkge1xuICBpZiAoIXZhbCkgeyByZXR1cm4gdHJ1ZSB9XG4gIGlmICh2YWwubGVuZ3RoICE9PSAyKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmICh0eXBlb2YgdmFsWyAwIF0gIT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWxbIDEgXSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBob3Jpem9udGFsUG9zID0ge1xuICAnc3RhcnQjbHRyJzogJ2xlZnQnLFxuICAnc3RhcnQjcnRsJzogJ3JpZ2h0JyxcbiAgJ2VuZCNsdHInOiAncmlnaHQnLFxuICAnZW5kI3J0bCc6ICdsZWZ0J1xufVxuXG47WyAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnIF0uZm9yRWFjaChwb3MgPT4ge1xuICBob3Jpem9udGFsUG9zWyBgJHsgcG9zIH0jbHRyYCBdID0gcG9zXG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNydGxgIF0gPSBwb3Ncbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBvc2l0aW9uIChwb3MsIHJ0bCkge1xuICBjb25zdCBwYXJ0cyA9IHBvcy5zcGxpdCgnICcpXG4gIHJldHVybiB7XG4gICAgdmVydGljYWw6IHBhcnRzWyAwIF0sXG4gICAgaG9yaXpvbnRhbDogaG9yaXpvbnRhbFBvc1sgYCR7IHBhcnRzWyAxIF0gfSMkeyBydGwgPT09IHRydWUgPyAncnRsJyA6ICdsdHInIH1gIF1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5jaG9yUHJvcHMgKGVsLCBvZmZzZXQpIHtcbiAgbGV0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIGlmIChvZmZzZXQgIT09IHZvaWQgMCkge1xuICAgIHRvcCAtPSBvZmZzZXRbIDEgXVxuICAgIGxlZnQgLT0gb2Zmc2V0WyAwIF1cbiAgICBib3R0b20gKz0gb2Zmc2V0WyAxIF1cbiAgICByaWdodCArPSBvZmZzZXRbIDAgXVxuXG4gICAgd2lkdGggKz0gb2Zmc2V0WyAwIF1cbiAgICBoZWlnaHQgKz0gb2Zmc2V0WyAxIF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wLCBib3R0b20sIGhlaWdodCxcbiAgICBsZWZ0LCByaWdodCwgd2lkdGgsXG4gICAgbWlkZGxlOiBsZWZ0ICsgKHJpZ2h0IC0gbGVmdCkgLyAyLFxuICAgIGNlbnRlcjogdG9wICsgKGJvdHRvbSAtIHRvcCkgLyAyXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QWJzb2x1dGVBbmNob3JQcm9wcyAoZWwsIGFic29sdXRlT2Zmc2V0LCBvZmZzZXQpIHtcbiAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHRvcCArPSBhYnNvbHV0ZU9mZnNldC50b3BcbiAgbGVmdCArPSBhYnNvbHV0ZU9mZnNldC5sZWZ0XG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wICs9IG9mZnNldFsgMSBdXG4gICAgbGVmdCArPSBvZmZzZXRbIDAgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbTogdG9wICsgMSwgaGVpZ2h0OiAxLFxuICAgIGxlZnQsIHJpZ2h0OiBsZWZ0ICsgMSwgd2lkdGg6IDEsXG4gICAgbWlkZGxlOiBsZWZ0LFxuICAgIGNlbnRlcjogdG9wXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0UHJvcHMgKHdpZHRoLCBoZWlnaHQpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgY2VudGVyOiBoZWlnaHQgLyAyLFxuICAgIGJvdHRvbTogaGVpZ2h0LFxuICAgIGxlZnQ6IDAsXG4gICAgbWlkZGxlOiB3aWR0aCAvIDIsXG4gICAgcmlnaHQ6IHdpZHRoXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VG9wTGVmdFByb3BzIChhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICByZXR1cm4ge1xuICAgIHRvcDogYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdIC0gdGFyZ2V0UHJvcHNbIHNlbGZPcmlnaW4udmVydGljYWwgXSxcbiAgICBsZWZ0OiBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSAtIHRhcmdldFByb3BzWyBzZWxmT3JpZ2luLmhvcml6b250YWwgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb3NpdGlvbiAoY2ZnLCByZXRyeU51bWJlciA9IDApIHtcbiAgaWYgKFxuICAgIGNmZy50YXJnZXRFbCA9PT0gbnVsbFxuICAgIHx8IGNmZy5hbmNob3JFbCA9PT0gbnVsbFxuICAgIHx8IHJldHJ5TnVtYmVyID4gNSAvLyB3ZSBzaG91bGQgdHJ5IG9ubHkgYSBmZXcgdGltZXNcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBzb21lIGJyb3dzZXJzIHJlcG9ydCB6ZXJvIGhlaWdodCBvciB3aWR0aCBiZWNhdXNlXG4gIC8vIHdlIGFyZSB0cnlpbmcgdG9vIGVhcmx5IHRvIGdldCB0aGVzZSBkaW1lbnNpb25zXG4gIGlmIChjZmcudGFyZ2V0RWwub2Zmc2V0SGVpZ2h0ID09PSAwIHx8IGNmZy50YXJnZXRFbC5vZmZzZXRXaWR0aCA9PT0gMCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0UG9zaXRpb24oY2ZnLCByZXRyeU51bWJlciArIDEpXG4gICAgfSwgMTApXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCB7XG4gICAgdGFyZ2V0RWwsXG4gICAgb2Zmc2V0LFxuICAgIGFuY2hvckVsLFxuICAgIGFuY2hvck9yaWdpbixcbiAgICBzZWxmT3JpZ2luLFxuICAgIGFic29sdXRlT2Zmc2V0LFxuICAgIGZpdCxcbiAgICBjb3ZlcixcbiAgICBtYXhIZWlnaHQsXG4gICAgbWF4V2lkdGhcbiAgfSA9IGNmZ1xuXG4gIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlICYmIHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwKSB7XG4gICAgLy8gdXNlcyB0aGUgcS1wb3NpdGlvbi1lbmdpbmUgQ1NTIGNsYXNzXG5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHkuc3R5bGVcbiAgICBjb25zdCB7IG9mZnNldExlZnQ6IGxlZnQsIG9mZnNldFRvcDogdG9wIH0gPSB3aW5kb3cudmlzdWFsVmlld3BvcnRcblxuICAgIGlmIChsZWZ0ICE9PSB2cExlZnQpIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtbGVmdCcsIGxlZnQgKyAncHgnKVxuICAgICAgdnBMZWZ0ID0gbGVmdFxuICAgIH1cbiAgICBpZiAodG9wICE9PSB2cFRvcCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS10b3AnLCB0b3AgKyAncHgnKVxuICAgICAgdnBUb3AgPSB0b3BcbiAgICB9XG4gIH1cblxuICAvLyBzY3JvbGwgcG9zaXRpb24gbWlnaHQgY2hhbmdlXG4gIC8vIGlmIG1heC1oZWlnaHQvLXdpZHRoIGNoYW5nZXMsIHNvIHdlXG4gIC8vIG5lZWQgdG8gcmVzdG9yZSBpdCBhZnRlciB3ZSBjYWxjdWxhdGVcbiAgLy8gdGhlIG5ldyBwb3NpdGlvbmluZ1xuICBjb25zdCB7IHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9ID0gdGFyZ2V0RWxcblxuICBjb25zdCBhbmNob3JQcm9wcyA9IGFic29sdXRlT2Zmc2V0ID09PSB2b2lkIDBcbiAgICA/IGdldEFuY2hvclByb3BzKGFuY2hvckVsLCBjb3ZlciA9PT0gdHJ1ZSA/IFsgMCwgMCBdIDogb2Zmc2V0KVxuICAgIDogZ2V0QWJzb2x1dGVBbmNob3JQcm9wcyhhbmNob3JFbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldClcblxuICAvLyB3ZSBcInJlc2V0XCIgdGhlIGNyaXRpY2FsIENTUyBwcm9wZXJ0aWVzXG4gIC8vIHNvIHdlIGNhbiB0YWtlIGFuIGFjY3VyYXRlIG1lYXN1cmVtZW50XG4gIE9iamVjdC5hc3NpZ24odGFyZ2V0RWwuc3R5bGUsIHtcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBtaW5XaWR0aDogbnVsbCxcbiAgICBtaW5IZWlnaHQ6IG51bGwsXG4gICAgbWF4V2lkdGg6IG1heFdpZHRoIHx8ICcxMDB2dycsXG4gICAgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfHwgJzEwMHZoJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfSlcblxuICBjb25zdCB7IG9mZnNldFdpZHRoOiBvcmlnRWxXaWR0aCwgb2Zmc2V0SGVpZ2h0OiBvcmlnRWxIZWlnaHQgfSA9IHRhcmdldEVsXG4gIGNvbnN0IHsgZWxXaWR0aCwgZWxIZWlnaHQgfSA9IGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZVxuICAgID8geyBlbFdpZHRoOiBNYXRoLm1heChhbmNob3JQcm9wcy53aWR0aCwgb3JpZ0VsV2lkdGgpLCBlbEhlaWdodDogY292ZXIgPT09IHRydWUgPyBNYXRoLm1heChhbmNob3JQcm9wcy5oZWlnaHQsIG9yaWdFbEhlaWdodCkgOiBvcmlnRWxIZWlnaHQgfVxuICAgIDogeyBlbFdpZHRoOiBvcmlnRWxXaWR0aCwgZWxIZWlnaHQ6IG9yaWdFbEhlaWdodCB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7IG1heFdpZHRoLCBtYXhIZWlnaHQgfVxuXG4gIGlmIChmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoZWxXaWR0aCwgZWxIZWlnaHQpXG4gIGxldCBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICBpZiAoYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCB8fCBvZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gIH1cbiAgZWxzZSB7IC8vIHdlIGhhdmUgdG91Y2ggcG9zaXRpb24gb3IgY29udGV4dCBtZW51IHdpdGggb2Zmc2V0XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3BzIC8vIGNhY2hlIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBhcHBseSBpbml0aWFsIGJvdW5kYXJpZXNcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgdmVydGljYWxseT9cbiAgICBpZiAocHJvcHMudG9wICE9PSB0b3ApIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRZID0gMiAqIG9mZnNldFsgMSBdXG4gICAgICBhbmNob3JQcm9wcy5jZW50ZXIgPSBhbmNob3JQcm9wcy50b3AgLT0gb2Zmc2V0WVxuICAgICAgYW5jaG9yUHJvcHMuYm90dG9tIC09IG9mZnNldFkgKyAyXG4gICAgfVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgaG9yaXpvbnRhbGx5P1xuICAgIGlmIChwcm9wcy5sZWZ0ICE9PSBsZWZ0KSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WCA9IDIgKiBvZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICAgIH1cbiAgfVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmICh0YXJnZXRFbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIHRhcmdldEVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmICh0YXJnZXRFbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbmNob3IuanMnXG5pbXBvcnQgdXNlU2Nyb2xsVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNjcm9sbC10YXJnZXQuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFsTWVudXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IHBvc2l0aW9uLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1c291dC5qcydcbmltcG9ydCB7IGNoaWxkSGFzRm9jdXMgfSBmcm9tICcuLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBhZGRDbGlja091dHNpZGUsIHJlbW92ZUNsaWNrT3V0c2lkZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY2xpY2stb3V0c2lkZS5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmltcG9ydCB7XG4gIHZhbGlkYXRlUG9zaXRpb24sIHZhbGlkYXRlT2Zmc2V0LCBzZXRQb3NpdGlvbiwgcGFyc2VQb3NpdGlvblxufSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3Bvc2l0aW9uLWVuZ2luZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNZW51JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQW5jaG9yUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlVHJhbnNpdGlvblByb3BzLFxuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG4gICAgc2VwYXJhdGVDbG9zZVBvcHVwOiBCb29sZWFuLFxuXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG5cbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgY292ZXI6IEJvb2xlYW4sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU9mZnNldFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG5cbiAgICB0b3VjaFBvc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgbWF4SGVpZ2h0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBtYXhXaWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ2NsaWNrJywgJ2VzY2FwZUtleSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBsZXQgcmVmb2N1c1RhcmdldCA9IG51bGwsIGFic29sdXRlT2Zmc2V0LCB1bndhdGNoUG9zaXRpb24sIGF2b2lkQXV0b0Nsb3NlXG5cbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eSB9ID0gdm1cbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljaywgcmVtb3ZlVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24ocHJvcHMpXG4gICAgY29uc3QgeyBsb2NhbFNjcm9sbFRhcmdldCwgY2hhbmdlU2Nyb2xsRXZlbnQsIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0IH0gPSB1c2VTY3JvbGxUYXJnZXQocHJvcHMsIGNvbmZpZ3VyZVNjcm9sbFRhcmdldClcblxuICAgIGNvbnN0IHsgYW5jaG9yRWwsIGNhblNob3cgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcgfSlcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZywgY2FuU2hvdywgaGFuZGxlU2hvdywgaGFuZGxlSGlkZSxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbCh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsICdtZW51JylcblxuICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgYW5jaG9yRWwsXG4gICAgICBpbm5lclJlZixcbiAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBhbHdheXMgcHJldmVudCB0b3VjaCBldmVudFxuICAgICAgICAgICAgZS50eXBlID09PSAndG91Y2hzdGFydCdcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2xpY2sgaWYgaXQncyBvbiBhIGRpYWxvZyBiYWNrZHJvcFxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHBhcnNlUG9zaXRpb24oXG4gICAgICAgIHByb3BzLmFuY2hvciB8fCAoXG4gICAgICAgICAgcHJvcHMuY292ZXIgPT09IHRydWUgPyAnY2VudGVyIG1pZGRsZScgOiAnYm90dG9tIHN0YXJ0J1xuICAgICAgICApLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHNlbGZPcmlnaW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb3ZlciA9PT0gdHJ1ZVxuICAgICAgICA/IGFuY2hvck9yaWdpbi52YWx1ZVxuICAgICAgICA6IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiB8fCAndG9wIHN0YXJ0JywgJHEubGFuZy5ydGwpXG4gICAgKSlcblxuICAgIGNvbnN0IG1lbnVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLW1lbnUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IGhhbmRsZXNGb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICApXG5cbiAgICB3YXRjaChoYW5kbGVzRm9jdXMsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgYWRkQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZVxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNvdXQpXG5cbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcblxuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKGV2dCAhPT0gdm9pZCAwICYmIChwcm9wcy50b3VjaFBvc2l0aW9uIHx8IHByb3BzLmNvbnRleHRNZW51KSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgaWYgKHBvcy5sZWZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gYW5jaG9yRWwudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBhYnNvbHV0ZU9mZnNldCA9IHsgbGVmdDogcG9zLmxlZnQgLSBsZWZ0LCB0b3A6IHBvcy50b3AgLSB0b3AgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB3YXRjaChcbiAgICAgICAgICAoKSA9PiAkcS5zY3JlZW4ud2lkdGggKyAnfCcgKyAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3wnICsgcHJvcHMuc2VsZiArICd8JyArIHByb3BzLmFuY2hvciArICd8JyArICRxLmxhbmcucnRsLFxuICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlICYmIGZvY3VzKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlcXVpcmVkIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcImRvdWJsZS10YXAgbmVlZGVkXCIgaXNzdWVcbiAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhpcyBjbGljayBzaG91bGRcbiAgICAgICAgICAvLyBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IHByb3BzLmF1dG9DbG9zZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgc2hvd1BvcnRhbCh0cnVlKSAvLyBkb25lIHNob3dpbmcgcG9ydGFsXG4gICAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0KSB7XG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBhbmNob3JDbGVhbnVwKHRydWUpXG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVmb2N1c1RhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiAoXG4gICAgICAgICAgLy8gbWVudSB3YXMgaGlkZGVuIGZyb20gY29kZSBvciBFU0MgcGx1Z2luXG4gICAgICAgICAgZXZ0ID09PSB2b2lkIDBcbiAgICAgICAgICAvLyBtZW51IHdhcyBub3QgY2xvc2VkIGZyb20gYSBtb3VzZSBvciB0b3VjaCBjbGlja091dHNpZGVcbiAgICAgICAgICB8fCBldnQucUNsaWNrT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgKChldnQgJiYgZXZ0LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGlkZVBvcnRhbCh0cnVlKSAvLyBkb25lIGhpZGluZywgbm93IGRlc3Ryb3lcbiAgICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmNob3JDbGVhbnVwIChoaWRpbmcpIHtcbiAgICAgIGFic29sdXRlT2Zmc2V0ID0gdm9pZCAwXG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24oKVxuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyA9PT0gdHJ1ZSB8fCBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNvdXQpXG4gICAgICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgIT09IHRydWUpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsIHx8IHByb3BzLnNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gZ2V0U2Nyb2xsVGFyZ2V0KGFuY2hvckVsLnZhbHVlLCBwcm9wcy5zY3JvbGxUYXJnZXQpXG4gICAgICAgIGNoYW5nZVNjcm9sbEV2ZW50KGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlLCB1cGRhdGVQb3NpdGlvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkF1dG9DbG9zZSAoZSkge1xuICAgICAgLy8gaWYgYXV0by1jbG9zZSwgdGhlbiB0aGUgaW9zIGRvdWJsZS10YXAgZml4IHdoaWNoXG4gICAgICAvLyBpc3N1ZXMgYSBjbGljayBzaG91bGQgbm90IGNsb3NlIHRoZSBtZW51XG4gICAgICBpZiAoYXZvaWRBdXRvQ2xvc2UgIT09IHRydWUpIHtcbiAgICAgICAgY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZSlcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3Vzb3V0IChldnQpIHtcbiAgICAgIC8vIHRoZSBmb2N1cyBpcyBub3QgaW4gYSB2dWUgY2hpbGQgY29tcG9uZW50XG4gICAgICBpZiAoXG4gICAgICAgIGhhbmRsZXNGb2N1cy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlXG4gICAgICAgICYmIGNoaWxkSGFzRm9jdXMoaW5uZXJSZWYudmFsdWUsIGV2dC50YXJnZXQpICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgZm9jdXMoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXNjYXBlS2V5IChldnQpIHtcbiAgICAgIGVtaXQoJ2VzY2FwZUtleScpXG4gICAgICBoaWRlKGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICBzZXRQb3NpdGlvbih7XG4gICAgICAgIHRhcmdldEVsOiBpbm5lclJlZi52YWx1ZSxcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5vZmZzZXQsXG4gICAgICAgIGFuY2hvckVsOiBhbmNob3JFbC52YWx1ZSxcbiAgICAgICAgYW5jaG9yT3JpZ2luOiBhbmNob3JPcmlnaW4udmFsdWUsXG4gICAgICAgIHNlbGZPcmlnaW46IHNlbGZPcmlnaW4udmFsdWUsXG4gICAgICAgIGFic29sdXRlT2Zmc2V0LFxuICAgICAgICBmaXQ6IHByb3BzLmZpdCxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgIHRyYW5zaXRpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICByb2xlOiAnbWVudScsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgJ3EtbWVudSBxLXBvc2l0aW9uLWVuZ2luZSBzY3JvbGwnICsgbWVudUNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiBbXG4gICAgICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGFuY2hvckNsZWFudXApXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIl0sIm5hbWVzIjpbImhhbmRsZXJzIiwidGFyZ2V0IiwicG9ydGFsSW5kZXgiLCJoIl0sIm1hcHBpbmdzIjoiOzs7O0FBSWUsU0FBQSxXQUFVLFNBQVMsTUFBTSxtQkFBbUI7QUFDekQsTUFBSTtBQUVKLFdBQVMsb0JBQXFCO0FBQzVCLFFBQUksaUJBQWlCLFFBQVE7QUFDM0IsY0FBUSxPQUFPLFlBQVk7QUFDM0IscUJBQWU7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFRCxrQkFBZ0IsTUFBTTtBQUNwQixZQUFRLFVBQVUsUUFBUSxrQkFBbUI7QUFBQSxFQUNqRCxDQUFHO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGVBQWdCO0FBQ2QscUJBQWU7QUFBQSxRQUNiLFdBQVcsTUFBTSxrQkFBa0IsVUFBVTtBQUFBLFFBQzdDLFNBQVM7QUFBQSxNQUNWO0FBRUQsY0FBUSxJQUFJLFlBQVk7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDSDtBQzFCWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDLFlBQVk7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCx1QkFBdUIsQ0FBRSxVQUFVLEtBQU87QUFDNUM7QUFFWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDO0FBQUEsRUFBYztBQUFBLEVBQVE7QUFBQSxFQUFjO0FBQ3RDO0FBSWUsU0FBQSxlQUFVO0FBQUEsRUFDdkI7QUFB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
