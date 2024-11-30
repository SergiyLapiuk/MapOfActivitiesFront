import { Q as markRaw, d as defineComponent, h, v as withDirectives, c as computed, g as getCurrentInstance, R as unref, y as isKeyCode, S as addEvt, U as cleanEvt, V as stop, X as position } from "./index.6764d851.js";
const createComponent = (raw) => markRaw(defineComponent(raw));
const createDirective = (raw) => markRaw(raw);
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice();
    }
  }
  return otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source;
  }
  return source !== void 0 ? source.concat(slot()) : slot();
}
function hDir(tag, data, children, key, condition, getDirsFn) {
  data.key = key + condition;
  const vnode = h(tag, data, children);
  return condition === true ? withDirectives(vnode, getDirsFn()) : vnode;
}
function getParentProxy(proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent;
  }
  let { parent } = proxy.$;
  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy;
    }
    parent = parent.parent;
  }
}
function vmHasRouter(vm) {
  return vm.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkProps = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;
  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);
  const hasRouterLinkProps = useDisableForRouterLinkProps === true ? computed(
    () => hasRouter === true && props.disable !== true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  ) : computed(
    () => hasRouter === true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  );
  const resolvedLink = computed(() => hasRouterLinkProps.value === true ? getLink(props.to) : null);
  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props.type === "a" || hasLink.value === true ? "a" : props.tag || fallbackTag || "div");
  const linkAttrs = computed(() => hasHrefLink.value === true ? {
    href: props.href,
    target: props.target
  } : hasRouterLink.value === true ? {
    href: resolvedLink.value.href,
    target: props.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1;
    }
    const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index !== -1) {
      return index;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
      isSameRouteRecord.bind(null, matched[length - 2])
    ) : index;
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact === true ? "" : linkIsActive.value === true ? ` ${props.activeClass}` : "" : "");
  function getLink(to) {
    try {
      return proxy.$router.resolve(to);
    } catch (_) {
    }
    return null;
  }
  function navigateToRouterLink(e, { returnRouterError, to = props.to, replace = props.replace } = {}) {
    if (props.disable === true) {
      e.preventDefault();
      return Promise.resolve(false);
    }
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props.target === "_blank") {
      return Promise.resolve(false);
    }
    e.preventDefault();
    const promise = proxy.$router[replace === true ? "replace" : "push"](to);
    return returnRouterError === true ? promise : promise.then(() => {
    }).catch(() => {
    });
  }
  function navigateOnClick(e) {
    if (hasRouterLink.value === true) {
      const go = (opts) => navigateToRouterLink(e, opts);
      emit("click", e, go);
      e.defaultPrevented !== true && go();
    } else {
      emit("click", e);
    }
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,
    getLink,
    navigateToRouterLink,
    navigateOnClick
  };
}
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props, sizes = useSizeDefaults) {
  return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-icon" + (props.left === true ? " on-left" : "") + (props.right === true ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = unref(el);
  if (target) {
    return target.$el || target;
  }
}
function childHasFocus(el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true;
  }
  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true;
    }
  }
  return false;
}
function throttle(fn, limit = 250) {
  let wait = false, result;
  return function() {
    if (wait === false) {
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
      result = fn.apply(this, arguments);
    }
    return result;
  };
}
function showRipple(evt, el, ctx, forceCenter) {
  ctx.modifiers.stop === true && stop(evt);
  const color = ctx.modifiers.color;
  let center = ctx.modifiers.center;
  center = center === true || forceCenter === true;
  const node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height } = el.getBoundingClientRect(), diameter = Math.sqrt(width * width + height * height), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
  innerNode.className = "q-ripple__inner";
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  });
  node.className = `q-ripple${color ? " text-" + color : ""}`;
  node.setAttribute("dir", "ltr");
  node.appendChild(innerNode);
  el.appendChild(node);
  const abort = () => {
    node.remove();
    clearTimeout(timer);
  };
  ctx.abort.push(abort);
  let timer = setTimeout(() => {
    innerNode.classList.add("q-ripple__inner--enter");
    innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
    innerNode.style.opacity = 0.2;
    timer = setTimeout(() => {
      innerNode.classList.remove("q-ripple__inner--enter");
      innerNode.classList.add("q-ripple__inner--leave");
      innerNode.style.opacity = 0;
      timer = setTimeout(() => {
        node.remove();
        ctx.abort.splice(ctx.abort.indexOf(abort), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
  const cfg = Object.assign({}, ctx.cfg.ripple, modifiers, value);
  ctx.modifiers = {
    early: cfg.early === true,
    stop: cfg.stop === true,
    center: cfg.center === true,
    color: cfg.color || arg,
    keyCodes: [].concat(cfg.keyCodes || 13)
  };
}
var Ripple = createDirective(
  {
    name: "ripple",
    beforeMount(el, binding) {
      const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
      if (cfg.ripple === false) {
        return;
      }
      const ctx = {
        cfg,
        enabled: binding.value !== false,
        modifiers: {},
        abort: [],
        start(evt) {
          if (ctx.enabled === true && evt.qSkipRipple !== true && evt.type === (ctx.modifiers.early === true ? "pointerdown" : "click")) {
            showRipple(evt, el, ctx, evt.qKeyEvent === true);
          }
        },
        keystart: throttle((evt) => {
          if (ctx.enabled === true && evt.qSkipRipple !== true && isKeyCode(evt, ctx.modifiers.keyCodes) === true && evt.type === `key${ctx.modifiers.early === true ? "down" : "up"}`) {
            showRipple(evt, el, ctx, true);
          }
        }, 300)
      };
      updateModifiers(ctx, binding);
      el.__qripple = ctx;
      addEvt(ctx, "main", [
        [el, "pointerdown", "start", "passive"],
        [el, "click", "start", "passive"],
        [el, "keydown", "keystart", "passive"],
        [el, "keyup", "keystart", "passive"]
      ]);
    },
    updated(el, binding) {
      if (binding.oldValue !== binding.value) {
        const ctx = el.__qripple;
        if (ctx !== void 0) {
          ctx.enabled = binding.value !== false;
          if (ctx.enabled === true && Object(binding.value) === binding.value) {
            updateModifiers(ctx, binding);
          }
        }
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qripple;
      if (ctx !== void 0) {
        ctx.abort.forEach((fn) => {
          fn();
        });
        cleanEvt(ctx, "main");
        delete el._qripple;
      }
    }
  }
);
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
export { QIcon as Q, Ripple as R, hMergeSlot as a, useRouterLinkProps as b, createComponent as c, useRouterLink as d, css as e, useSizeDefaults as f, getElement as g, hSlot as h, useSizeProps as i, useSize as j, hDir as k, vmHasRouter as l, getParentProxy as m, childHasFocus as n, createDirective as o, hUniqueSlot as p, hMergeSlotSafely as q, uid as u, vmIsDestroyed as v };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlkLjYyN2Q0ZWQ3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL2NyZWF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS92bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaWNvbi9RSWNvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RvbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Rocm90dGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9yaXBwbGUvUmlwcGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdWlkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgbWFya1JhdyB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXBvbmVudCA9IHJhdyA9PiBtYXJrUmF3KGRlZmluZUNvbXBvbmVudChyYXcpKVxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpcmVjdGl2ZSA9IHJhdyA9PiBtYXJrUmF3KHJhdylcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaFNsb3QgKHNsb3QsIG90aGVyd2lzZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzbG90KCkgfHwgb3RoZXJ3aXNlXG4gICAgOiBvdGhlcndpc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhVbmlxdWVTbG90IChzbG90LCBvdGhlcndpc2UpIHtcbiAgaWYgKHNsb3QgIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHZub2RlID0gc2xvdCgpXG4gICAgaWYgKHZub2RlICE9PSB2b2lkIDAgJiYgdm5vZGUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB2bm9kZS5zbGljZSgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG90aGVyd2lzZVxufVxuXG4vKipcbiAqIFNvdXJjZSBkZWZpbml0ZWx5IGV4aXN0cyxcbiAqIHNvIGl0J3MgbWVyZ2VkIHdpdGggdGhlIHBvc3NpYmxlIHNsb3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhNZXJnZVNsb3QgKHNsb3QsIHNvdXJjZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzb3VyY2UuY29uY2F0KHNsb3QoKSlcbiAgICA6IHNvdXJjZVxufVxuXG4vKipcbiAqIE1lcmdlIHdpdGggcG9zc2libGUgc2xvdCxcbiAqIGV2ZW4gaWYgc291cmNlIG1pZ2h0IG5vdCBleGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaE1lcmdlU2xvdFNhZmVseSAoc2xvdCwgc291cmNlKSB7XG4gIGlmIChzbG90ID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gc291cmNlXG4gIH1cblxuICByZXR1cm4gc291cmNlICE9PSB2b2lkIDBcbiAgICA/IHNvdXJjZS5jb25jYXQoc2xvdCgpKVxuICAgIDogc2xvdCgpXG59XG5cbi8qXG4gKiAoU3RyaW5nKSAga2V5ICAgICAgIC0gdW5pcXVlIHZub2RlIGtleVxuICogKEJvb2xlYW4pIGNvbmRpdGlvbiAtIHNob3VsZCBjaGFuZ2UgT05MWSB3aGVuIGFkZGluZy9yZW1vdmluZyBkaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhEaXIgKFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBrZXksXG4gIGNvbmRpdGlvbixcbiAgZ2V0RGlyc0ZuXG4pIHtcbiAgZGF0YS5rZXkgPSBrZXkgKyBjb25kaXRpb25cblxuICBjb25zdCB2bm9kZSA9IGgodGFnLCBkYXRhLCBjaGlsZHJlbilcblxuICByZXR1cm4gY29uZGl0aW9uID09PSB0cnVlXG4gICAgPyB3aXRoRGlyZWN0aXZlcyh2bm9kZSwgZ2V0RGlyc0ZuKCkpXG4gICAgOiB2bm9kZVxufVxuIiwiLy8gY29waWVkIHRvIGRvY3MgdG9vXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50UHJveHkgKHByb3h5KSB7XG4gIGlmIChPYmplY3QocHJveHkuJHBhcmVudCkgPT09IHByb3h5LiRwYXJlbnQpIHtcbiAgICByZXR1cm4gcHJveHkuJHBhcmVudFxuICB9XG5cbiAgbGV0IHsgcGFyZW50IH0gPSBwcm94eS4kXG5cbiAgd2hpbGUgKE9iamVjdChwYXJlbnQpID09PSBwYXJlbnQpIHtcbiAgICBpZiAoT2JqZWN0KHBhcmVudC5wcm94eSkgPT09IHBhcmVudC5wcm94eSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5wcm94eVxuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWxsTm9ybWFsaXplZFZOb2RlcyAoY2hpbGRyZW4sIHZub2RlKSB7XG4gIGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikgPT09IHRydWUpIHtcbiAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgY2hpbGQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5hZGQodm5vZGUpXG4gIH1cbn1cblxuLy8gdm5vZGVzIGZyb20gcmVuZGVyZWQgaW4gYWR2YW5jZWQgc2xvdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVk5vZGVzICh2bm9kZXMpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgU2V0KClcblxuICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgZmlsbE5vcm1hbGl6ZWRWTm9kZXMoY2hpbGRyZW4sIHZub2RlKVxuICB9KVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1IYXNSb3V0ZXIgKHZtKSB7XG4gIHJldHVybiB2bS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRyb3V0ZXIgIT09IHZvaWQgMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1Jc0Rlc3Ryb3llZCAodm0pIHtcbiAgcmV0dXJuIHZtLmlzVW5tb3VudGVkID09PSB0cnVlIHx8IHZtLmlzRGVhY3RpdmF0ZWQgPT09IHRydWVcbn1cbiIsIi8qXG4gKiBJbnNwaXJlZCBieSBSb3V0ZXJMaW5rIGZyb20gVnVlIFJvdXRlclxuICogIC0tPiBBUEkgc2hvdWxkIG1hdGNoIVxuICovXG5cbmltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuLy8gR2V0IHRoZSBvcmlnaW5hbCBwYXRoIHZhbHVlIG9mIGEgcmVjb3JkIGJ5IGZvbGxvd2luZyBpdHMgYWxpYXNPZlxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxQYXRoIChyZWNvcmQpIHtcbiAgcmV0dXJuIHJlY29yZFxuICAgID8gKFxuICAgICAgICByZWNvcmQuYWxpYXNPZlxuICAgICAgICAgID8gcmVjb3JkLmFsaWFzT2YucGF0aFxuICAgICAgICAgIDogcmVjb3JkLnBhdGhcbiAgICAgICkgOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZVJlY29yZCAoYSwgYikge1xuICAvLyBzaW5jZSB0aGUgb3JpZ2luYWwgcmVjb3JkIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgZm9yIGFsaWFzT2ZcbiAgLy8gYnV0IGFsbCBhbGlhc2VzIHBvaW50IHRvIHRoZSBvcmlnaW5hbCByZWNvcmQsIHRoaXMgd2lsbCBhbHdheXMgY29tcGFyZVxuICAvLyB0aGUgb3JpZ2luYWwgcmVjb3JkXG4gIHJldHVybiAoYS5hbGlhc09mIHx8IGEpID09PSAoYi5hbGlhc09mIHx8IGIpXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzUGFyYW1zIChvdXRlciwgaW5uZXIpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5uZXIpIHtcbiAgICBjb25zdFxuICAgICAgaW5uZXJWYWx1ZSA9IGlubmVyWyBrZXkgXSxcbiAgICAgIG91dGVyVmFsdWUgPSBvdXRlclsga2V5IF1cblxuICAgIGlmICh0eXBlb2YgaW5uZXJWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpbm5lclZhbHVlICE9PSBvdXRlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIEFycmF5LmlzQXJyYXkob3V0ZXJWYWx1ZSkgPT09IGZhbHNlXG4gICAgICB8fCBvdXRlclZhbHVlLmxlbmd0aCAhPT0gaW5uZXJWYWx1ZS5sZW5ndGhcbiAgICAgIHx8IGlubmVyVmFsdWUuc29tZSgodmFsdWUsIGkpID0+IHZhbHVlICE9PSBvdXRlclZhbHVlWyBpIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc0VxdWl2YWxlbnRBcnJheSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgID8gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoKHZhbHVlLCBpKSA9PiB2YWx1ZSA9PT0gYlsgaSBdKVxuICAgIDogYS5sZW5ndGggPT09IDEgJiYgYVsgMCBdID09PSBiXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXNWYWx1ZSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKSA9PT0gdHJ1ZVxuICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYSwgYilcbiAgICA6IChcbiAgICAgICAgQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYiwgYSlcbiAgICAgICAgICA6IGEgPT09IGJcbiAgICAgIClcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyAoYSwgYikge1xuICBpZiAoT2JqZWN0LmtleXMoYSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtc1ZhbHVlKGFbIGtleSBdLCBiWyBrZXkgXSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgdXNlUm91dGVyTGlua1Byb3BzID0ge1xuICAvLyByb3V0ZXItbGlua1xuICB0bzogWyBTdHJpbmcsIE9iamVjdCBdLFxuICByZXBsYWNlOiBCb29sZWFuLFxuICBleGFjdDogQm9vbGVhbixcbiAgYWN0aXZlQ2xhc3M6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ3Etcm91dGVyLWxpbmstLWFjdGl2ZSdcbiAgfSxcbiAgZXhhY3RBY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncS1yb3V0ZXItbGluay0tZXhhY3QtYWN0aXZlJ1xuICB9LFxuXG4gIC8vIHJlZ3VsYXIgPGE+IGxpbmtcbiAgaHJlZjogU3RyaW5nLFxuICB0YXJnZXQ6IFN0cmluZyxcblxuICAvLyBzdGF0ZVxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbi8vIGV4dGVybmFsIHByb3BzOiB0eXBlLCB0YWdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZmFsbGJhY2tUYWcsIHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPSB0cnVlIH0gPSB7fSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5LCBlbWl0IH0gPSB2bVxuXG4gIGNvbnN0IGhhc1JvdXRlciA9IHZtSGFzUm91dGVyKHZtKVxuICBjb25zdCBoYXNIcmVmTGluayA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMuaHJlZiAhPT0gdm9pZCAwKVxuXG4gIC8vIGZvciBwZXJmIHJlYXNvbnMsIHdlIHVzZSBtaW5pbXVtIGFtb3VudCBvZiBydW50aW1lIHdvcmtcbiAgY29uc3QgaGFzUm91dGVyTGlua1Byb3BzID0gdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuICAgIDogY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuXG4gIGNvbnN0IHJlc29sdmVkTGluayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBoYXNSb3V0ZXJMaW5rUHJvcHMudmFsdWUgPT09IHRydWVcbiAgICAgID8gZ2V0TGluayhwcm9wcy50bylcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IGhhc1JvdXRlckxpbmsgPSBjb21wdXRlZCgoKSA9PiByZXNvbHZlZExpbmsudmFsdWUgIT09IG51bGwpXG4gIGNvbnN0IGhhc0xpbmsgPSBjb21wdXRlZCgoKSA9PiBoYXNIcmVmTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKVxuXG4gIGNvbnN0IGxpbmtUYWcgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMudHlwZSA9PT0gJ2EnIHx8IGhhc0xpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gJ2EnXG4gICAgICA6IChwcm9wcy50YWcgfHwgZmFsbGJhY2tUYWcgfHwgJ2RpdicpXG4gICkpXG5cbiAgY29uc3QgbGlua0F0dHJzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc0hyZWZMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICA/IHtcbiAgICAgICAgICBocmVmOiBwcm9wcy5ocmVmLFxuICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgIH1cbiAgICAgIDogKFxuICAgICAgICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGhyZWY6IHJlc29sdmVkTGluay52YWx1ZS5ocmVmLFxuICAgICAgICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge31cbiAgICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGxpbmtBY3RpdmVJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICB7IG1hdGNoZWQgfSA9IHJlc29sdmVkTGluay52YWx1ZSxcbiAgICAgIHsgbGVuZ3RoIH0gPSBtYXRjaGVkLFxuICAgICAgcm91dGVNYXRjaGVkID0gbWF0Y2hlZFsgbGVuZ3RoIC0gMSBdXG5cbiAgICBpZiAocm91dGVNYXRjaGVkID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRNYXRjaGVkID0gcHJveHkuJHJvdXRlLm1hdGNoZWRcblxuICAgIGlmIChjdXJyZW50TWF0Y2hlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudE1hdGNoZWQuZmluZEluZGV4KFxuICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCByb3V0ZU1hdGNoZWQpXG4gICAgKVxuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgLy8gcG9zc2libGUgcGFyZW50IHJlY29yZFxuICAgIGNvbnN0IHBhcmVudFJlY29yZFBhdGggPSBnZXRPcmlnaW5hbFBhdGgobWF0Y2hlZFsgbGVuZ3RoIC0gMiBdKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHdlIGFyZSBkZWFsaW5nIHdpdGggbmVzdGVkIHJvdXRlc1xuICAgICAgbGVuZ3RoID4gMVxuICAgICAgLy8gaWYgdGhlIHBhcmVudCBhbmQgbWF0Y2hlZCByb3V0ZSBoYXZlIHRoZSBzYW1lIHBhdGgsIHRoaXMgbGluayBpc1xuICAgICAgLy8gcmVmZXJyaW5nIHRvIHRoZSBlbXB0eSBjaGlsZC4gT3Igd2UgY3VycmVudGx5IGFyZSBvbiBhIGRpZmZlcmVudFxuICAgICAgLy8gY2hpbGQgb2YgdGhlIHNhbWUgcGFyZW50XG4gICAgICAmJiBnZXRPcmlnaW5hbFBhdGgocm91dGVNYXRjaGVkKSA9PT0gcGFyZW50UmVjb3JkUGF0aFxuICAgICAgLy8gYXZvaWQgY29tcGFyaW5nIHRoZSBjaGlsZCB3aXRoIGl0cyBwYXJlbnRcbiAgICAgICYmIGN1cnJlbnRNYXRjaGVkWyBjdXJyZW50TWF0Y2hlZC5sZW5ndGggLSAxIF0ucGF0aCAhPT0gcGFyZW50UmVjb3JkUGF0aFxuICAgICAgICA/IGN1cnJlbnRNYXRjaGVkLmZpbmRJbmRleChcbiAgICAgICAgICBpc1NhbWVSb3V0ZVJlY29yZC5iaW5kKG51bGwsIG1hdGNoZWRbIGxlbmd0aCAtIDIgXSlcbiAgICAgICAgKVxuICAgICAgICA6IGluZGV4XG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGxpbmtJc0FjdGl2ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICYmIGxpbmtBY3RpdmVJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAmJiBpbmNsdWRlc1BhcmFtcyhwcm94eS4kcm91dGUucGFyYW1zLCByZXNvbHZlZExpbmsudmFsdWUucGFyYW1zKVxuICApXG5cbiAgY29uc3QgbGlua0lzRXhhY3RBY3RpdmUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGxpbmtJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgbGlua0FjdGl2ZUluZGV4LnZhbHVlID09PSBwcm94eS4kcm91dGUubWF0Y2hlZC5sZW5ndGggLSAxXG4gICAgICAmJiBpc1NhbWVSb3V0ZUxvY2F0aW9uUGFyYW1zKHByb3h5LiRyb3V0ZS5wYXJhbXMsIHJlc29sdmVkTGluay52YWx1ZS5wYXJhbXMpXG4gIClcblxuICBjb25zdCBsaW5rQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAoXG4gICAgICAgICAgbGlua0lzRXhhY3RBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gYCAkeyBwcm9wcy5leGFjdEFjdGl2ZUNsYXNzIH0gJHsgcHJvcHMuYWN0aXZlQ2xhc3MgfWBcbiAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgIHByb3BzLmV4YWN0ID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgICA6IChsaW5rSXNBY3RpdmUudmFsdWUgPT09IHRydWUgPyBgICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gIDogJycpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgOiAnJ1xuICApKVxuXG4gIGZ1bmN0aW9uIGdldExpbmsgKHRvKSB7XG4gICAgdHJ5IHsgcmV0dXJuIHByb3h5LiRyb3V0ZXIucmVzb2x2ZSh0bykgfVxuICAgIGNhdGNoIChfKSB7fVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBQcm9taXNlPFJvdXRlckVycm9yIHwgZmFsc2UgfCB1bmRlZmluZWQ+XG4gICAqL1xuICBmdW5jdGlvbiBuYXZpZ2F0ZVRvUm91dGVyTGluayAoXG4gICAgZSxcbiAgICB7IHJldHVyblJvdXRlckVycm9yLCB0byA9IHByb3BzLnRvLCByZXBsYWNlID0gcHJvcHMucmVwbGFjZSB9ID0ge31cbiAgKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIGVuc3VyZSBuYXRpdmUgbmF2aWdhdGlvbiBpcyBwcmV2ZW50ZWQgaW4gYWxsIGNhc2VzLFxuICAgICAgLy8gbGlrZSB3aGVuIHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPT09IGZhbHNlIChRUm91dGVUYWIpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3Qgd2l0aCBjb250cm9sIGtleXM7XG4gICAgICAvLyBzaG91bGQgbWF0Y2ggUm91dGVyTGluayBmcm9tIFZ1ZSBSb3V0ZXJcbiAgICAgIGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleVxuXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCBvbiByaWdodCBjbGlja1xuICAgICAgfHwgKGUuYnV0dG9uICE9PSB2b2lkIDAgJiYgZS5idXR0b24gIT09IDApXG5cbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IGlmIGl0IHNob3VsZCBvcGVuIGluIGEgbmV3IHdpbmRvd1xuICAgICAgfHwgcHJvcHMudGFyZ2V0ID09PSAnX2JsYW5rJ1xuICAgICkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSlcbiAgICB9XG5cbiAgICAvLyBoaW5kZXIgdGhlIG5hdGl2ZSBuYXZpZ2F0aW9uXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAvLyB0aGVuKCkgY2FuIGFsc28gcmV0dXJuIGEgXCJzb2Z0XCIgcm91dGVyIGVycm9yIChWdWUgUm91dGVyIGJlaGF2aW9yKVxuICAgIGNvbnN0IHByb21pc2UgPSBwcm94eS4kcm91dGVyWyByZXBsYWNlID09PSB0cnVlID8gJ3JlcGxhY2UnIDogJ3B1c2gnIF0odG8pXG5cbiAgICByZXR1cm4gcmV0dXJuUm91dGVyRXJyb3IgPT09IHRydWVcbiAgICAgID8gcHJvbWlzZVxuICAgICAgLy8gZWxzZSBjYXRjaGluZyBoYXJkIGVycm9ycyBhbmQgYWxzbyBcInNvZnRcIiBvbmVzIC0gdGhlbihlcnIgPT4gLi4uKVxuICAgICAgOiBwcm9taXNlLnRoZW4oKCkgPT4ge30pLmNhdGNoKCgpID0+IHt9KVxuICB9XG5cbiAgLy8gd2FybmluZyEgZW5zdXJlIHRoYXQgdGhlIGNvbXBvbmVudCB1c2luZyBpdCBoYXMgJ2NsaWNrJyBpbmNsdWRlZCBpbiBpdHMgJ2VtaXRzJyBkZWZpbml0aW9uIHByb3BcbiAgZnVuY3Rpb24gbmF2aWdhdGVPbkNsaWNrIChlKSB7XG4gICAgaWYgKGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGdvID0gb3B0cyA9PiBuYXZpZ2F0ZVRvUm91dGVyTGluayhlLCBvcHRzKVxuXG4gICAgICBlbWl0KCdjbGljaycsIGUsIGdvKVxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIGdvKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNSb3V0ZXJMaW5rLFxuICAgIGhhc0hyZWZMaW5rLFxuICAgIGhhc0xpbmssXG5cbiAgICBsaW5rVGFnLFxuICAgIHJlc29sdmVkTGluayxcbiAgICBsaW5rSXNBY3RpdmUsXG4gICAgbGlua0lzRXhhY3RBY3RpdmUsXG4gICAgbGlua0NsYXNzLFxuICAgIGxpbmtBdHRycyxcblxuICAgIGdldExpbmssXG4gICAgbmF2aWdhdGVUb1JvdXRlckxpbmssXG4gICAgbmF2aWdhdGVPbkNsaWNrXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlU2l6ZURlZmF1bHRzID0ge1xuICB4czogMTgsXG4gIHNtOiAyNCxcbiAgbWQ6IDMyLFxuICBsZzogMzgsXG4gIHhsOiA0NlxufVxuXG5leHBvcnQgY29uc3QgdXNlU2l6ZVByb3BzID0ge1xuICBzaXplOiBTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBzaXplcyA9IHVzZVNpemVEZWZhdWx0cykge1xuICAvLyByZXR1cm4gc2l6ZVN0eWxlXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuc2l6ZSAhPT0gdm9pZCAwXG4gICAgICA/IHsgZm9udFNpemU6IHByb3BzLnNpemUgaW4gc2l6ZXMgPyBgJHsgc2l6ZXNbIHByb3BzLnNpemUgXSB9cHhgIDogcHJvcHMuc2l6ZSB9XG4gICAgICA6IG51bGxcbiAgKSlcbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFZpZXdCb3ggPSAnMCAwIDI0IDI0J1xuXG5jb25zdCBzYW1lRm4gPSBpID0+IGlcbmNvbnN0IGlvbkZuID0gaSA9PiBgaW9uaWNvbnMgJHsgaSB9YFxuXG5jb25zdCBsaWJNYXAgPSB7XG4gICdtZGktJzogaSA9PiBgbWRpICR7IGkgfWAsXG4gICdpY29uLSc6IHNhbWVGbiwgLy8gZm9udGF3ZXNvbWUgZXF1aXZcbiAgJ2J0LSc6IGkgPT4gYGJ0ICR7IGkgfWAsXG4gICdldmEtJzogaSA9PiBgZXZhICR7IGkgfWAsXG4gICdpb24tbWQnOiBpb25GbixcbiAgJ2lvbi1pb3MnOiBpb25GbixcbiAgJ2lvbi1sb2dvJzogaW9uRm4sXG4gICdpY29uZm9udCAnOiBzYW1lRm4sXG4gICd0aS0nOiBpID0+IGB0aGVtaWZ5LWljb24gJHsgaSB9YCxcbiAgJ2JpLSc6IGkgPT4gYGJvb3RzdHJhcC1pY29ucyAkeyBpIH1gXG59XG5cbmNvbnN0IG1hdE1hcCA9IHtcbiAgb186ICctb3V0bGluZWQnLFxuICByXzogJy1yb3VuZCcsXG4gIHNfOiAnLXNoYXJwJ1xufVxuXG5jb25zdCBzeW1NYXAgPSB7XG4gIHN5bV9vXzogJy1vdXRsaW5lZCcsXG4gIHN5bV9yXzogJy1yb3VuZGVkJyxcbiAgc3ltX3NfOiAnLXNoYXJwJ1xufVxuXG5jb25zdCBsaWJSRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKGxpYk1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3QgbWF0UkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhtYXRNYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IHN5bVJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMoc3ltTWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBtUkUgPSAvXltNbV1cXHM/Wy0rXT9cXC4/XFxkL1xuY29uc3QgaW1nUkUgPSAvXmltZzovXG5jb25zdCBzdmdVc2VSRSA9IC9ec3ZndXNlOi9cbmNvbnN0IGlvblJFID0gL15pb24tL1xuY29uc3QgZmFSRSA9IC9eKGZhLShzaGFycHxzb2xpZHxyZWd1bGFyfGxpZ2h0fGJyYW5kc3xkdW90b25lfHRoaW4pfFtsZl1hW3NybGJka10/KSAvXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSWNvbicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdpJ1xuICAgIH0sXG5cbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBsZWZ0OiBCb29sZWFuLFxuICAgIHJpZ2h0OiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaWNvbidcbiAgICAgICsgKHByb3BzLmxlZnQgPT09IHRydWUgPyAnIG9uLWxlZnQnIDogJycpIC8vIFRPRE8gUXYzOiBkcm9wIHRoaXNcbiAgICAgICsgKHByb3BzLnJpZ2h0ID09PSB0cnVlID8gJyBvbi1yaWdodCcgOiAnJylcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB0eXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGNsc1xuICAgICAgbGV0IGljb24gPSBwcm9wcy5uYW1lXG5cbiAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkcS5pY29uTWFwRm4gIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmVzID0gJHEuaWNvbk1hcEZuKGljb24pXG4gICAgICAgIGlmIChyZXMgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChyZXMuaWNvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpY29uID0gcmVzLmljb25cbiAgICAgICAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY2xzOiByZXMuY2xzLFxuICAgICAgICAgICAgICBjb250ZW50OiByZXMuY29udGVudCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyByZXMuY29udGVudFxuICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBbIGRlZiwgdmlld0JveCA9IGRlZmF1bHRWaWV3Qm94IF0gPSBpY29uLnNwbGl0KCd8JylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN2ZzogdHJ1ZSxcbiAgICAgICAgICB2aWV3Qm94LFxuICAgICAgICAgIG5vZGVzOiBkZWYuc3BsaXQoJyYmJykubWFwKHBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgWyBkLCBzdHlsZSwgdHJhbnNmb3JtIF0gPSBwYXRoLnNwbGl0KCdAQCcpXG4gICAgICAgICAgICByZXR1cm4gaCgncGF0aCcsIHsgc3R5bGUsIGQsIHRyYW5zZm9ybSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGltZ1JFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbWc6IHRydWUsXG4gICAgICAgICAgc3JjOiBpY29uLnN1YnN0cmluZyg0KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdmdVc2VSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IFsgZGVmLCB2aWV3Qm94ID0gZGVmYXVsdFZpZXdCb3ggXSA9IGljb24uc3BsaXQoJ3wnKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3ZndXNlOiB0cnVlLFxuICAgICAgICAgIHNyYzogZGVmLnN1YnN0cmluZyg3KSxcbiAgICAgICAgICB2aWV3Qm94XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNvbnRlbnQgPSAnICdcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKGxpYlJFKVxuXG4gICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBjbHMgPSBsaWJNYXBbIG1hdGNoZXNbIDEgXSBdKGljb24pXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChmYVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY2xzID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW9uUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbHMgPSBgaW9uaWNvbnMgaW9uLSR7ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSA/ICdpb3MnIDogJ21kJyB9JHsgaWNvbi5zdWJzdHJpbmcoMykgfWBcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN5bVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgLy8gXCJub3RyYW5zbGF0ZVwiIGNsYXNzIGlzIGZvciBHb29nbGUgVHJhbnNsYXRlXG4gICAgICAgIC8vIHRvIGF2b2lkIHRhbXBlcmluZyB3aXRoIE1hdGVyaWFsIFN5bWJvbHMgbGlnYXR1cmUgZm9udFxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXV0aW9uOiBUbyBiZSBhYmxlIHRvIGFkZCBzdWZmaXggdG8gdGhlIGNsYXNzIG5hbWUsXG4gICAgICAgIC8vIGtlZXAgdGhlICdtYXRlcmlhbC1zeW1ib2xzJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1zeW1ib2xzJ1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKHN5bVJFKVxuICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGljb24gPSBpY29uLnN1YnN0cmluZyg2KVxuICAgICAgICAgIGNscyArPSBzeW1NYXBbIG1hdGNoZXNbIDEgXSBdXG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50ID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFwibm90cmFuc2xhdGVcIiBjbGFzcyBpcyBmb3IgR29vZ2xlIFRyYW5zbGF0ZVxuICAgICAgICAvLyB0byBhdm9pZCB0YW1wZXJpbmcgd2l0aCBNYXRlcmlhbCBJY29ucyBsaWdhdHVyZSBmb250XG4gICAgICAgIC8vXG4gICAgICAgIC8vIENhdXRpb246IFRvIGJlIGFibGUgdG8gYWRkIHN1ZmZpeCB0byB0aGUgY2xhc3MgbmFtZSxcbiAgICAgICAgLy8ga2VlcCB0aGUgJ21hdGVyaWFsLWljb25zJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1pY29ucydcblxuICAgICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChtYXRSRSlcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgICBpY29uID0gaWNvbi5zdWJzdHJpbmcoMilcbiAgICAgICAgICBjbHMgKz0gbWF0TWFwWyBtYXRjaGVzWyAxIF0gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGljb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xzLFxuICAgICAgICBjb250ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICByb2xlOiAncHJlc2VudGF0aW9uJ1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5ub25lID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLmltZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ2ltZycsIHsgc3JjOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgICAgdmlld0JveDogdHlwZS52YWx1ZS52aWV3Qm94IHx8ICcwIDAgMjQgMjQnXG4gICAgICAgICAgfSwgdHlwZS52YWx1ZS5ub2RlcylcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLnN2Z3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ3N2ZycsIHtcbiAgICAgICAgICAgIHZpZXdCb3g6IHR5cGUudmFsdWUudmlld0JveFxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3VzZScsIHsgJ3hsaW5rOmhyZWYnOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5jbHMgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgJyArIHR5cGUudmFsdWUuY2xzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIHR5cGUudmFsdWUuY29udGVudFxuICAgICAgXSkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgdW5yZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQgKGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHsgdG9wLCBsZWZ0IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlIChlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0IChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoIChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVyV2lkdGhcbiAgICA6IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjc3MgKGVsZW1lbnQsIGNzcykge1xuICBjb25zdCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY3NzKSB7XG4gICAgc3R5bGVbIHByb3AgXSA9IGNzc1sgcHJvcCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNzc0JhdGNoIChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5IChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCAoZWwpIHtcbiAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdm9pZCAwXG4gIH1cblxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgfHwgdm9pZCAwXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSB1bnJlZihlbClcbiAgaWYgKHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQuJGVsIHx8IHRhcmdldFxuICB9XG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRIYXNGb2N1cyAoZWwsIGZvY3VzZWRFbCkge1xuICBpZiAoZWwgPT09IHZvaWQgMCB8fCBlbCA9PT0gbnVsbCB8fCBlbC5jb250YWlucyhmb2N1c2VkRWwpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZvciAobGV0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7IG5leHQgIT09IG51bGw7IG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIGlmIChuZXh0LmNvbnRhaW5zKGZvY3VzZWRFbCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiwgbGltaXQgPSAyNTApIHtcbiAgbGV0IHdhaXQgPSBmYWxzZSwgcmVzdWx0XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgaWYgKHdhaXQgPT09IGZhbHNlKSB7XG4gICAgICB3YWl0ID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHdhaXQgPSBmYWxzZSB9LCBsaW1pdClcbiAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3AsIGFkZEV2dCwgY2xlYW5FdnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4uLy4uL3V0aWxzL3Rocm90dGxlLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gc2hvd1JpcHBsZSAoZXZ0LCBlbCwgY3R4LCBmb3JjZUNlbnRlcikge1xuICBjdHgubW9kaWZpZXJzLnN0b3AgPT09IHRydWUgJiYgc3RvcChldnQpXG5cbiAgY29uc3QgY29sb3IgPSBjdHgubW9kaWZpZXJzLmNvbG9yXG4gIGxldCBjZW50ZXIgPSBjdHgubW9kaWZpZXJzLmNlbnRlclxuICBjZW50ZXIgPSBjZW50ZXIgPT09IHRydWUgfHwgZm9yY2VDZW50ZXIgPT09IHRydWVcblxuICBjb25zdFxuICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpLFxuICAgIHJhZGl1cyA9IGRpYW1ldGVyIC8gMixcbiAgICBjZW50ZXJYID0gYCR7ICh3aWR0aCAtIGRpYW1ldGVyKSAvIDIgfXB4YCxcbiAgICB4ID0gY2VudGVyID8gY2VudGVyWCA6IGAkeyBwb3MubGVmdCAtIGxlZnQgLSByYWRpdXMgfXB4YCxcbiAgICBjZW50ZXJZID0gYCR7IChoZWlnaHQgLSBkaWFtZXRlcikgLyAyIH1weGAsXG4gICAgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHsgcG9zLnRvcCAtIHRvcCAtIHJhZGl1cyB9cHhgXG5cbiAgaW5uZXJOb2RlLmNsYXNzTmFtZSA9ICdxLXJpcHBsZV9faW5uZXInXG4gIGNzcyhpbm5lck5vZGUsIHtcbiAgICBoZWlnaHQ6IGAkeyBkaWFtZXRlciB9cHhgLFxuICAgIHdpZHRoOiBgJHsgZGlhbWV0ZXIgfXB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyB4IH0sJHsgeSB9LDApIHNjYWxlM2QoLjIsLjIsMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcblxuICBub2RlLmNsYXNzTmFtZSA9IGBxLXJpcHBsZSR7IGNvbG9yID8gJyB0ZXh0LScgKyBjb2xvciA6ICcnIH1gXG4gIG5vZGUuc2V0QXR0cmlidXRlKCdkaXInLCAnbHRyJylcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY29uc3QgYWJvcnQgPSAoKSA9PiB7XG4gICAgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxuICBjdHguYWJvcnQucHVzaChhYm9ydClcblxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgncS1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgaW5uZXJOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkeyBjZW50ZXJYIH0sJHsgY2VudGVyWSB9LDApIHNjYWxlM2QoMSwxLDEpYFxuICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3EtcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3EtcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUucmVtb3ZlKClcbiAgICAgICAgY3R4LmFib3J0LnNwbGljZShjdHguYWJvcnQuaW5kZXhPZihhYm9ydCksIDEpXG4gICAgICB9LCAyNzUpXG4gICAgfSwgMjUwKVxuICB9LCA1MClcbn1cblxuZnVuY3Rpb24gdXBkYXRlTW9kaWZpZXJzIChjdHgsIHsgbW9kaWZpZXJzLCB2YWx1ZSwgYXJnIH0pIHtcbiAgY29uc3QgY2ZnID0gT2JqZWN0LmFzc2lnbih7fSwgY3R4LmNmZy5yaXBwbGUsIG1vZGlmaWVycywgdmFsdWUpXG4gIGN0eC5tb2RpZmllcnMgPSB7XG4gICAgZWFybHk6IGNmZy5lYXJseSA9PT0gdHJ1ZSxcbiAgICBzdG9wOiBjZmcuc3RvcCA9PT0gdHJ1ZSxcbiAgICBjZW50ZXI6IGNmZy5jZW50ZXIgPT09IHRydWUsXG4gICAgY29sb3I6IGNmZy5jb2xvciB8fCBhcmcsXG4gICAga2V5Q29kZXM6IFtdLmNvbmNhdChjZmcua2V5Q29kZXMgfHwgMTMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ3JpcHBsZScsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAncmlwcGxlJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IGNmZyA9IGJpbmRpbmcuaW5zdGFuY2UuJC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRxLmNvbmZpZyB8fCB7fVxuXG4gICAgICAgIGlmIChjZmcucmlwcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGNmZyxcbiAgICAgICAgICBlbmFibGVkOiBiaW5kaW5nLnZhbHVlICE9PSBmYWxzZSxcbiAgICAgICAgICBtb2RpZmllcnM6IHt9LFxuICAgICAgICAgIGFib3J0OiBbXSxcblxuICAgICAgICAgIHN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmVuYWJsZWQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnFTa2lwUmlwcGxlICE9PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC50eXBlID09PSAoY3R4Lm1vZGlmaWVycy5lYXJseSA9PT0gdHJ1ZSA/ICdwb2ludGVyZG93bicgOiAnY2xpY2snKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCBldnQucUtleUV2ZW50ID09PSB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBrZXlzdGFydDogdGhyb3R0bGUoZXZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmVuYWJsZWQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnFTa2lwUmlwcGxlICE9PSB0cnVlXG4gICAgICAgICAgICAgICYmIGlzS2V5Q29kZShldnQsIGN0eC5tb2RpZmllcnMua2V5Q29kZXMpID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC50eXBlID09PSBga2V5JHsgY3R4Lm1vZGlmaWVycy5lYXJseSA9PT0gdHJ1ZSA/ICdkb3duJyA6ICd1cCcgfWBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAzMDApXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNb2RpZmllcnMoY3R4LCBiaW5kaW5nKVxuXG4gICAgICAgIGVsLl9fcXJpcHBsZSA9IGN0eFxuXG4gICAgICAgIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICdwb2ludGVyZG93bicsICdzdGFydCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgZWwsICdjbGljaycsICdzdGFydCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgZWwsICdrZXlkb3duJywgJ2tleXN0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2tleXVwJywgJ2tleXN0YXJ0JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGlmIChiaW5kaW5nLm9sZFZhbHVlICE9PSBiaW5kaW5nLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xcmlwcGxlXG4gICAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdHguZW5hYmxlZCA9IGJpbmRpbmcudmFsdWUgIT09IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIChjdHguZW5hYmxlZCA9PT0gdHJ1ZSAmJiBPYmplY3QoYmluZGluZy52YWx1ZSkgPT09IGJpbmRpbmcudmFsdWUpIHtcbiAgICAgICAgICAgICAgdXBkYXRlTW9kaWZpZXJzKGN0eCwgYmluZGluZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXJpcHBsZVxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjdHguYWJvcnQuZm9yRWFjaChmbiA9PiB7IGZuKCkgfSlcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBkZWxldGUgZWwuX3FyaXBwbGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsIi8qKlxuICogQmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL2pjaG9vay91dWlkLXJhbmRvbVxuICovXG5cbmxldFxuICBidWYsXG4gIGJ1ZklkeCA9IDBcbmNvbnN0IGhleEJ5dGVzID0gbmV3IEFycmF5KDI1NilcblxuLy8gUHJlLWNhbGN1bGF0ZSB0b1N0cmluZygxNikgZm9yIHNwZWVkXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIGhleEJ5dGVzWyBpIF0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpXG59XG5cbi8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG5jb25zdCByYW5kb21CeXRlcyA9ICgoKSA9PiB7XG4gIC8vIE5vZGUgJiBCcm93c2VyIHN1cHBvcnRcbiAgY29uc3QgbGliID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGNyeXB0b1xuICAgIDogKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgKVxuXG4gIGlmIChsaWIgIT09IHZvaWQgMCkge1xuICAgIGlmIChsaWIucmFuZG9tQnl0ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIGxpYi5yYW5kb21CeXRlc1xuICAgIH1cbiAgICBpZiAobGliLmdldFJhbmRvbVZhbHVlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbiA9PiB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobilcbiAgICAgICAgbGliLmdldFJhbmRvbVZhbHVlcyhieXRlcylcbiAgICAgICAgcmV0dXJuIGJ5dGVzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG4gPT4ge1xuICAgIGNvbnN0IHIgPSBbXVxuICAgIGZvciAobGV0IGkgPSBuOyBpID4gMDsgaS0tKSB7XG4gICAgICByLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSlcbiAgICB9XG4gICAgcmV0dXJuIHJcbiAgfVxufSkoKVxuXG4vLyBCdWZmZXIgcmFuZG9tIG51bWJlcnMgZm9yIHNwZWVkXG4vLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbi8vIG9yIGltcHJvdmUgc3BlZWQgYnkgaW5jcmVhc2luZyB0aGlzIG51bWJlciAodHJ5IDE2Mzg0KVxuY29uc3QgQlVGRkVSX1NJWkUgPSA0MDk2XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLy8gQnVmZmVyIHNvbWUgcmFuZG9tIGJ5dGVzIGZvciBzcGVlZFxuICBpZiAoYnVmID09PSB2b2lkIDAgfHwgKGJ1ZklkeCArIDE2ID4gQlVGRkVSX1NJWkUpKSB7XG4gICAgYnVmSWR4ID0gMFxuICAgIGJ1ZiA9IHJhbmRvbUJ5dGVzKEJVRkZFUl9TSVpFKVxuICB9XG5cbiAgY29uc3QgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZiwgYnVmSWR4LCAoYnVmSWR4ICs9IDE2KSlcbiAgYlsgNiBdID0gKGJbIDYgXSAmIDB4MGYpIHwgMHg0MFxuICBiWyA4IF0gPSAoYlsgOCBdICYgMHgzZikgfCAweDgwXG5cbiAgcmV0dXJuIGhleEJ5dGVzWyBiWyAwIF0gXSArIGhleEJ5dGVzWyBiWyAxIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDIgXSBdICsgaGV4Qnl0ZXNbIGJbIDMgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNCBdIF0gKyBoZXhCeXRlc1sgYlsgNSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA2IF0gXSArIGhleEJ5dGVzWyBiWyA3IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDggXSBdICsgaGV4Qnl0ZXNbIGJbIDkgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgMTAgXSBdICsgaGV4Qnl0ZXNbIGJbIDExIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDEyIF0gXSArIGhleEJ5dGVzWyBiWyAxMyBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxNCBdIF0gKyBoZXhCeXRlc1sgYlsgMTUgXSBdXG59XG4iXSwibmFtZXMiOlsibWF0Y2hlcyIsImNzcyJdLCJtYXBwaW5ncyI6IjtBQUVZLE1BQUMsa0JBQWtCLFNBQU8sUUFBUSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3RELE1BQUMsa0JBQWtCLFNBQU8sUUFBUSxHQUFHO0FDRDFDLFNBQVMsTUFBTyxNQUFNLFdBQVc7QUFDdEMsU0FBTyxTQUFTLFNBQ1osS0FBTSxLQUFJLFlBQ1Y7QUFDTjtBQUVPLFNBQVMsWUFBYSxNQUFNLFdBQVc7QUFDNUMsTUFBSSxTQUFTLFFBQVE7QUFDbkIsVUFBTSxRQUFRLEtBQU07QUFDcEIsUUFBSSxVQUFVLFVBQVUsVUFBVSxNQUFNO0FBQ3RDLGFBQU8sTUFBTSxNQUFPO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBRUQsU0FBTztBQUNUO0FBTU8sU0FBUyxXQUFZLE1BQU0sUUFBUTtBQUN4QyxTQUFPLFNBQVMsU0FDWixPQUFPLE9BQU8sTUFBTSxJQUNwQjtBQUNOO0FBTU8sU0FBUyxpQkFBa0IsTUFBTSxRQUFRO0FBQzlDLE1BQUksU0FBUyxRQUFRO0FBQ25CLFdBQU87QUFBQSxFQUNSO0FBRUQsU0FBTyxXQUFXLFNBQ2QsT0FBTyxPQUFPLE1BQU0sSUFDcEIsS0FBTTtBQUNaO0FBTU8sU0FBUyxLQUNkLEtBQ0EsTUFDQSxVQUNBLEtBQ0EsV0FDQSxXQUNBO0FBQ0EsT0FBSyxNQUFNLE1BQU07QUFFakIsUUFBTSxRQUFRLEVBQUUsS0FBSyxNQUFNLFFBQVE7QUFFbkMsU0FBTyxjQUFjLE9BQ2pCLGVBQWUsT0FBTyxXQUFXLElBQ2pDO0FBQ047QUM3RE8sU0FBUyxlQUFnQixPQUFPO0FBQ3JDLE1BQUksT0FBTyxNQUFNLE9BQU8sTUFBTSxNQUFNLFNBQVM7QUFDM0MsV0FBTyxNQUFNO0FBQUEsRUFDZDtBQUVELE1BQUksRUFBRSxXQUFXLE1BQU07QUFFdkIsU0FBTyxPQUFPLE1BQU0sTUFBTSxRQUFRO0FBQ2hDLFFBQUksT0FBTyxPQUFPLEtBQUssTUFBTSxP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
