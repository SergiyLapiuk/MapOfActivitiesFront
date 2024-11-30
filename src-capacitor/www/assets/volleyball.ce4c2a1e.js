import { b as useFormProps, u as useDarkProps, a as useDark, h as useFormAttrs, c as useFormInject, e as QBtn, d as QInput } from "./QBtn.a363fc1a.js";
import { a7 as client, C as noop, ai as leftClick, S as addEvt, aj as preventDraggable, a5 as prevent, V as stop, X as position, U as cleanEvt, x as stopAndPrevent, c as computed, ak as Plugin, al as defaultLang, r as ref, w as watch, h, a6 as Transition, g as getCurrentInstance, am as isObject, D as nextTick, a3 as injectProp, v as withDirectives, y as isKeyCode, _ as _export_sfc, L as openBlock, Y as createElementBlock, j as createVNode, N as withCtx, O as createBaseVNode } from "./index.6764d851.js";
import { p as pad } from "./format.3e32b8d9.js";
import { o as createDirective, c as createComponent, h as hSlot, v as vmIsDestroyed, Q as QIcon } from "./uid.627d4ed7.js";
import { e as clearSelection, f as useAnchorProps, g as useAnchor, Q as QDialog, h as QMenu, i as getPortalProxy, j as closePortals } from "./QMenu.9dd1c774.js";
import { c as convertJSONToDate, a as convertJSONToMinimumDate, b as convertDateToJSON } from "./convertDate.2fe32ce1.js";
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod2) {
  const dir = {};
  for (const direction of directionList) {
    if (mod2[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
const avoidNodeNamesList = ["INPUT", "TEXTAREA"];
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && avoidNodeNamesList.includes(evt.target.nodeName.toUpperCase()) === false && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
var TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") !== -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) {
            return;
          }
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup !== void 0 && ctx.styleCleanup();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchpan;
      }
    }
  }
);
function useRenderCache() {
  let cache = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (key, defaultValue) => cache[key] === void 0 ? cache[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue : cache[key],
    setCache(key, obj) {
      cache[key] = obj;
    },
    hasCache(key) {
      return cache.hasOwnProperty(key);
    },
    clearCache(key) {
      if (key !== void 0) {
        delete cache[key];
      } else {
        cache = {};
      }
    }
  };
}
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === "[object Date]") {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd));
}
function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd));
}
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function jalCal(jy, withoutLeap) {
  const bl = breaks.length, gy = jy + 621;
  let leapJ = -14, jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (!withoutLeap) {
    if (jump - n < 6) {
      n = n - jump + div(jump + 4, 33) * 33;
    }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }
  }
  return {
    leap,
    gy,
    march
  };
}
function j2d(jy, jm, jd) {
  const r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}
function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621, jd, jm, k;
  const r = jalCal(jy, false), jdn1f = g2d(gy, 3, r.march);
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return {
        jy,
        jm,
        jd
      };
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) {
      k += 1;
    }
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return {
    jy,
    jm,
    jd
  };
}
function g2d(gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}
function d2g(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308, gd = div(mod(i, 153), 5) + 1, gm = mod(div(i, 153), 12) + 1, gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return {
    gy,
    gm,
    gd
  };
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const calendars = ["gregorian", "persian"];
const useDatetimeProps = {
  modelValue: {
    required: true
  },
  mask: {
    type: String
  },
  locale: Object,
  calendar: {
    type: String,
    validator: (v) => calendars.includes(v),
    default: "gregorian"
  },
  landscape: Boolean,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  readonly: Boolean,
  disable: Boolean
};
const useDatetimeEmits = ["update:modelValue"];
function getDayHash(date) {
  return date.year + "/" + pad(date.month) + "/" + pad(date.day);
}
function useDatetime(props, $q) {
  const editable = computed(() => {
    return props.disable !== true && props.readonly !== true;
  });
  const tabindex = computed(() => {
    return editable.value === true ? 0 : -1;
  });
  const headerClass = computed(() => {
    const cls = [];
    props.color !== void 0 && cls.push(`bg-${props.color}`);
    props.textColor !== void 0 && cls.push(`text-${props.textColor}`);
    return cls.join(" ");
  });
  function getLocale() {
    return props.locale !== void 0 ? { ...$q.lang.date, ...props.locale } : $q.lang.date;
  }
  function getCurrentDate(dateOnly) {
    const d = new Date();
    const timeFill = dateOnly === true ? null : 0;
    if (props.calendar === "persian") {
      const jDate = toJalaali(d);
      return {
        year: jDate.jy,
        month: jDate.jm,
        day: jDate.jd
      };
    }
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: timeFill,
      minute: timeFill,
      second: timeFill,
      millisecond: timeFill
    };
  }
  return {
    editable,
    tabindex,
    headerClass,
    getLocale,
    getCurrentDate
  };
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date.year = d.getFullYear();
    date.month = d.getMonth() + 1;
    date.day = d.getDate();
    date.hour = d.getHours();
    date.minute = d.getMinutes();
    date.second = d.getSeconds();
    date.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date.month = parseInt(match[map.M], 10);
      if (date.month < 1 || date.month > 12) {
        return date;
      }
    } else if (map.MMM !== void 0) {
      date.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date.day = parseInt(match[map.D], 10);
      if (date.year === null || date.month === null || date.day < 1) {
        return date;
      }
      const maxDay = calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
      if (date.day > maxDay) {
        return date;
      }
    }
    if (map.H !== void 0) {
      date.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date.hour += 12;
      }
      date.hour = date.hour % 24;
    }
    if (map.m !== void 0) {
      date.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date.dateHash = pad(date.year, 6) + "/" + pad(date.month) + "/" + pad(date.day);
  date.timeHash = pad(date.hour) + ":" + pad(date.minute) + ":" + pad(date.second) + tzString;
  return date;
}
function getWeekOfYear(date) {
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function startOfDate(date, unit, utc) {
  const t = new Date(date), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date, subtract, unit = "days") {
  const t = new Date(date), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date) {
  return getDateDiff(date, startOfDate(date, "year"), "days") + 1;
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date, dateLocale, forcedYear) {
    const y = this.YYYY(date, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date.getFullYear();
  },
  M(date) {
    return date.getMonth() + 1;
  },
  MM(date) {
    return pad(date.getMonth() + 1);
  },
  MMM(date, dateLocale) {
    return dateLocale.monthsShort[date.getMonth()];
  },
  MMMM(date, dateLocale) {
    return dateLocale.months[date.getMonth()];
  },
  Q(date) {
    return Math.ceil((date.getMonth() + 1) / 3);
  },
  Qo(date) {
    return getOrdinal(this.Q(date));
  },
  D(date) {
    return date.getDate();
  },
  Do(date) {
    return getOrdinal(date.getDate());
  },
  DD(date) {
    return pad(date.getDate());
  },
  DDD(date) {
    return getDayOfYear(date);
  },
  DDDD(date) {
    return pad(getDayOfYear(date), 3);
  },
  d(date) {
    return date.getDay();
  },
  dd(date, dateLocale) {
    return this.dddd(date, dateLocale).slice(0, 2);
  },
  ddd(date, dateLocale) {
    return dateLocale.daysShort[date.getDay()];
  },
  dddd(date, dateLocale) {
    return dateLocale.days[date.getDay()];
  },
  E(date) {
    return date.getDay() || 7;
  },
  w(date) {
    return getWeekOfYear(date);
  },
  ww(date) {
    return pad(getWeekOfYear(date));
  },
  H(date) {
    return date.getHours();
  },
  HH(date) {
    return pad(date.getHours());
  },
  h(date) {
    const hours = date.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date) {
    return pad(this.h(date));
  },
  m(date) {
    return date.getMinutes();
  },
  mm(date) {
    return pad(date.getMinutes());
  },
  s(date) {
    return date.getSeconds();
  },
  ss(date) {
    return pad(date.getSeconds());
  },
  S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  SS(date) {
    return pad(Math.floor(date.getMilliseconds() / 10));
  },
  SSS(date) {
    return pad(date.getMilliseconds(), 3);
  },
  A(date) {
    return this.H(date) < 12 ? "AM" : "PM";
  },
  a(date) {
    return this.H(date) < 12 ? "am" : "pm";
  },
  aa(date) {
    return this.H(date) < 12 ? "a.m." : "p.m.";
  },
  Z(date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date) {
    return Math.floor(date.getTime() / 1e3);
  },
  x(date) {
    return date.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date = new Date(val);
  if (isNaN(date)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
const yearsInterval = 20;
const views = ["Calendar", "Years", "Months"];
const viewIsValid = (v) => views.includes(v);
const yearMonthValidator = (v) => /^-?[\d]+\/[0-1]\d$/.test(v);
const lineStr = " \u2014 ";
function getMonthHash(date) {
  return date.year + "/" + pad(date.month);
}
var QDate = createComponent({
  name: "QDate",
  props: {
    ...useDatetimeProps,
    ...useFormProps,
    ...useDarkProps,
    multiple: Boolean,
    range: Boolean,
    title: String,
    subtitle: String,
    mask: {
      default: "YYYY/MM/DD"
    },
    defaultYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    yearsInMonthView: Boolean,
    events: [Array, Function],
    eventColor: [String, Function],
    emitImmediately: Boolean,
    options: [Array, Function],
    navigationMinYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    navigationMaxYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    noUnset: Boolean,
    firstDayOfWeek: [String, Number],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: "Calendar",
      validator: viewIsValid
    }
  },
  emits: [
    ...useDatetimeEmits,
    "rangeStart",
    "rangeEnd",
    "navigation"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { getCache } = useRenderCache();
    const { tabindex, headerClass, getLocale, getCurrentDate } = useDatetime(props, $q);
    let lastEmitValue;
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    const blurTargetRef = ref(null);
    const innerMask = ref(getMask());
    const innerLocale = ref(getLocale());
    const mask = computed(() => getMask());
    const locale = computed(() => getLocale());
    const today = computed(() => getCurrentDate());
    const viewModel = ref(getViewModel(innerMask.value, innerLocale.value));
    const view = ref(props.defaultView);
    const direction = $q.lang.rtl === true ? "right" : "left";
    const monthDirection = ref(direction.value);
    const yearDirection = ref(direction.value);
    const year = viewModel.value.year;
    const startYear = ref(year - year % yearsInterval - (year < 0 ? yearsInterval : 0));
    const editRange = ref(null);
    const classes = computed(() => {
      const type = props.landscape === true ? "landscape" : "portrait";
      return `q-date q-date--${type} q-date--${type}-${props.minimal === true ? "minimal" : "standard"}` + (isDark.value === true ? " q-date--dark q-dark" : "") + (props.bordered === true ? " q-date--bordered" : "") + (props.square === true ? " q-date--square no-border-radius" : "") + (props.flat === true ? " q-date--flat no-shadow" : "") + (props.disable === true ? " disabled" : props.readonly === true ? " q-date--readonly" : "");
    });
    const computedColor = computed(() => {
      return props.color || "primary";
    });
    const computedTextColor = computed(() => {
      return props.textColor || "white";
    });
    const isImmediate = computed(
      () => props.emitImmediately === true && props.multiple !== true && props.range !== true
    );
    const normalizedModel = computed(() => Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue !== null && props.modelValue !== void 0 ? [props.modelValue] : []);
    const daysModel = computed(
      () => normalizedModel.value.filter((date) => typeof date === "string").map((date) => decodeString(date, innerMask.value, innerLocale.value)).filter(
        (date) => date.dateHash !== null && date.day !== null && date.month !== null && date.year !== null
      )
    );
    const rangeModel = computed(() => {
      const fn = (date) => decodeString(date, innerMask.value, innerLocale.value);
      return normalizedModel.value.filter((date) => isObject(date) === true && date.from !== void 0 && date.to !== void 0).map((range) => ({ from: fn(range.from), to: fn(range.to) })).filter((range) => range.from.dateHash !== null && range.to.dateHash !== null && range.from.dateHash < range.to.dateHash);
    });
    const getNativeDateFn = computed(() => props.calendar !== "persian" ? (model) => new Date(model.year, model.month - 1, model.day) : (model) => {
      const gDate = toGregorian(model.year, model.month, model.day);
      return new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    });
    const encodeObjectFn = computed(() => props.calendar === "persian" ? getDayHash : (date, mask2, locale2) => formatDate(
      new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.minute,
        date.second,
        date.millisecond
      ),
      mask2 === void 0 ? innerMask.value : mask2,
      locale2 === void 0 ? innerLocale.value : locale2,
      date.year,
      date.timezoneOffset
    ));
    const daysInModel = computed(
      () => daysModel.value.length + rangeModel.value.reduce(
        (acc, range) => acc + 1 + getDateDiff(
          getNativeDateFn.value(range.to),
          getNativeDateFn.value(range.from)
        ),
        0
      )
    );
    const headerTitle = computed(() => {
      if (props.title !== void 0 && props.title !== null && props.title.length !== 0) {
        return props.title;
      }
      if (editRange.value !== null) {
        const model2 = editRange.value.init;
        const date2 = getNativeDateFn.value(model2);
        return innerLocale.value.daysShort[date2.getDay()] + ", " + innerLocale.value.monthsShort[model2.month - 1] + " " + model2.day + lineStr + "?";
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        return `${daysInModel.value} ${innerLocale.value.pluralDay}`;
      }
      const model = daysModel.value[0];
      const date = getNativeDateFn.value(model);
      if (isNaN(date.valueOf()) === true) {
        return lineStr;
      }
      if (innerLocale.value.headerTitle !== void 0) {
        return innerLocale.value.headerTitle(date, model);
      }
      return innerLocale.value.daysShort[date.getDay()] + ", " + innerLocale.value.monthsShort[model.month - 1] + " " + model.day;
    });
    const minSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.from)).sort((a, b) => a.year - b.year || a.month - b.month);
      return model[0];
    });
    const maxSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.to)).sort((a, b) => b.year - a.year || b.month - a.month);
      return model[0];
    });
    const headerSubtitle = computed(() => {
      if (props.subtitle !== void 0 && props.subtitle !== null && props.subtitle.length !== 0) {
        return props.subtitle;
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        const from = minSelectedModel.value;
        const to = maxSelectedModel.value;
        const month = innerLocale.value.monthsShort;
        return month[from.month - 1] + (from.year !== to.year ? " " + from.year + lineStr + month[to.month - 1] + " " : from.month !== to.month ? lineStr + month[to.month - 1] : "") + " " + to.year;
      }
      return daysModel.value[0].year;
    });
    const dateArrow = computed(() => {
      const val = [$q.iconSet.datetime.arrowLeft, $q.iconSet.datetime.arrowRight];
      return $q.lang.rtl === true ? val.reverse() : val;
    });
    const computedFirstDayOfWeek = computed(() => props.firstDayOfWeek !== void 0 ? Number(props.firstDayOfWeek) : innerLocale.value.firstDayOfWeek);
    const daysOfWeek = computed(() => {
      const days2 = innerLocale.value.daysShort, first = computedFirstDayOfWeek.value;
      return first > 0 ? days2.slice(first, 7).concat(days2.slice(0, first)) : days2;
    });
    const daysInMonth = computed(() => {
      const date = viewModel.value;
      return props.calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
    });
    const evtColor = computed(() => typeof props.eventColor === "function" ? props.eventColor : () => props.eventColor);
    const minNav = computed(() => {
      if (props.navigationMinYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMinYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const maxNav = computed(() => {
      if (props.navigationMaxYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMaxYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const navBoundaries = computed(() => {
      const data = {
        month: { prev: true, next: true },
        year: { prev: true, next: true }
      };
      if (minNav.value !== null && minNav.value.year >= viewModel.value.year) {
        data.year.prev = false;
        if (minNav.value.year === viewModel.value.year && minNav.value.month >= viewModel.value.month) {
          data.month.prev = false;
        }
      }
      if (maxNav.value !== null && maxNav.value.year <= viewModel.value.year) {
        data.year.next = false;
        if (maxNav.value.year === viewModel.value.year && maxNav.value.month <= viewModel.value.month) {
          data.month.next = false;
        }
      }
      return data;
    });
    const daysMap = computed(() => {
      const map = {};
      daysModel.value.forEach((entry) => {
        const hash = getMonthHash(entry);
        if (map[hash] === void 0) {
          map[hash] = [];
        }
        map[hash].push(entry.day);
      });
      return map;
    });
    const rangeMap = computed(() => {
      const map = {};
      rangeModel.value.forEach((entry) => {
        const hashFrom = getMonthHash(entry.from);
        const hashTo = getMonthHash(entry.to);
        if (map[hashFrom] === void 0) {
          map[hashFrom] = [];
        }
        map[hashFrom].push({
          from: entry.from.day,
          to: hashFrom === hashTo ? entry.to.day : void 0,
          range: entry
        });
        if (hashFrom < hashTo) {
          let hash;
          const { year: year2, month } = entry.from;
          const cur = month < 12 ? { year: year2, month: month + 1 } : { year: year2 + 1, month: 1 };
          while ((hash = getMonthHash(cur)) <= hashTo) {
            if (map[hash] === void 0) {
              map[hash] = [];
            }
            map[hash].push({
              from: void 0,
              to: hash === hashTo ? entry.to.day : void 0,
              range: entry
            });
            cur.month++;
            if (cur.month > 12) {
              cur.year++;
              cur.month = 1;
            }
          }
        }
      });
      return map;
    });
    const rangeView = computed(() => {
      if (editRange.value === null) {
        return;
      }
      const { init, initHash, final, finalHash } = editRange.value;
      const [from, to] = initHash <= finalHash ? [init, final] : [final, init];
      const fromHash = getMonthHash(from);
      const toHash = getMonthHash(to);
      if (fromHash !== viewMonthHash.value && toHash !== viewMonthHash.value) {
        return;
      }
      const view2 = {};
      if (fromHash === viewMonthHash.value) {
        view2.from = from.day;
        view2.includeFrom = true;
      } else {
        view2.from = 1;
      }
      if (toHash === viewMonthHash.value) {
        view2.to = to.day;
        view2.includeTo = true;
      } else {
        view2.to = daysInMonth.value;
      }
      return view2;
    });
    const viewMonthHash = computed(() => getMonthHash(viewModel.value));
    const selectionDaysMap = computed(() => {
      const map = {};
      if (props.options === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[i] = true;
        }
        return map;
      }
      const fn = typeof props.options === "function" ? props.options : (date) => props.options.includes(date);
      for (let i = 1; i <= daysInMonth.value; i++) {
        const dayHash = viewMonthHash.value + "/" + pad(i);
        map[i] = fn(dayHash);
      }
      return map;
    });
    const eventDaysMap = computed(() => {
      const map = {};
      if (props.events === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[i] = false;
        }
      } else {
        const fn = typeof props.events === "function" ? props.events : (date) => props.events.includes(date);
        for (let i = 1; i <= daysInMonth.value; i++) {
          const dayHash = viewMonthHash.value + "/" + pad(i);
          map[i] = fn(dayHash) === true && evtColor.value(dayHash);
        }
      }
      return map;
    });
    const viewDays = computed(() => {
      let date, endDay;
      const { year: year2, month } = viewModel.value;
      if (props.calendar !== "persian") {
        date = new Date(year2, month - 1, 1);
        endDay = new Date(year2, month - 1, 0).getDate();
      } else {
        const gDate = toGregorian(year2, month, 1);
        date = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
        let prevJM = month - 1;
        let prevJY = year2;
        if (prevJM === 0) {
          prevJM = 12;
          prevJY--;
        }
        endDay = jalaaliMonthLength(prevJY, prevJM);
      }
      return {
        days: date.getDay() - computedFirstDayOfWeek.value - 1,
        endDay
      };
    });
    const days = computed(() => {
      const res = [];
      const { days: days2, endDay } = viewDays.value;
      const len = days2 < 0 ? days2 + 7 : days2;
      if (len < 6) {
        for (let i = endDay - len; i <= endDay; i++) {
          res.push({ i, fill: true });
        }
      }
      const index = res.length;
      for (let i = 1; i <= daysInMonth.value; i++) {
        const day = { i, event: eventDaysMap.value[i], classes: [] };
        if (selectionDaysMap.value[i] === true) {
          day.in = true;
          day.flat = true;
        }
        res.push(day);
      }
      if (daysMap.value[viewMonthHash.value] !== void 0) {
        daysMap.value[viewMonthHash.value].forEach((day) => {
          const i = index + day - 1;
          Object.assign(res[i], {
            selected: true,
            unelevated: true,
            flat: false,
            color: computedColor.value,
            textColor: computedTextColor.value
          });
        });
      }
      if (rangeMap.value[viewMonthHash.value] !== void 0) {
        rangeMap.value[viewMonthHash.value].forEach((entry) => {
          if (entry.from !== void 0) {
            const from = index + entry.from - 1;
            const to = index + (entry.to || daysInMonth.value) - 1;
            for (let day = from; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[from], {
              rangeFrom: true,
              flat: false
            });
            entry.to !== void 0 && Object.assign(res[to], {
              rangeTo: true,
              flat: false
            });
          } else if (entry.to !== void 0) {
            const to = index + entry.to - 1;
            for (let day = index; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[to], {
              flat: false,
              rangeTo: true
            });
          } else {
            const to = index + daysInMonth.value - 1;
            for (let day = index; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
          }
        });
      }
      if (rangeView.value !== void 0) {
        const from = index + rangeView.value.from - 1;
        const to = index + rangeView.value.to - 1;
        for (let day = from; day <= to; day++) {
          res[day].color = computedColor.value;
          res[day].editRange = true;
        }
        if (rangeView.value.includeFrom === true) {
          res[from].editRangeFrom = true;
        }
        if (rangeView.value.includeTo === true) {
          res[to].editRangeTo = true;
        }
      }
      if (viewModel.value.year === today.value.year && viewModel.value.month === today.value.month) {
        res[index + today.value.day - 1].today = true;
      }
      const left = res.length % 7;
      if (left > 0) {
        const afterDays = 7 - left;
        for (let i = 1; i <= afterDays; i++) {
          res.push({ i, fill: true });
        }
      }
      res.forEach((day) => {
        let cls = "q-date__calendar-item ";
        if (day.fill === true) {
          cls += "q-date__calendar-item--fill";
        } else {
          cls += `q-date__calendar-item--${day.in === true ? "in" : "out"}`;
          if (day.range !== void 0) {
            cls += ` q-date__range${day.rangeTo === true ? "-to" : day.rangeFrom === true ? "-from" : ""}`;
          }
          if (day.editRange === true) {
            cls += ` q-date__edit-range${day.editRangeFrom === true ? "-from" : ""}${day.editRangeTo === true ? "-to" : ""}`;
          }
          if (day.range !== void 0 || day.editRange === true) {
            cls += ` text-${day.color}`;
          }
        }
        day.classes = cls;
      });
      return res;
    });
    const attributes = computed(() => props.disable === true ? { "aria-disabled": "true" } : {});
    watch(() => props.modelValue, (v) => {
      if (lastEmitValue === v) {
        lastEmitValue = 0;
      } else {
        const model = getViewModel(innerMask.value, innerLocale.value);
        updateViewModel(model.year, model.month, model);
      }
    });
    watch(view, () => {
      if (blurTargetRef.value !== null && proxy.$el.contains(document.activeElement) === true) {
        blurTargetRef.value.focus();
      }
    });
    watch(() => viewModel.value.year + "|" + viewModel.value.month, () => {
      emit("navigation", { year: viewModel.value.year, month: viewModel.value.month });
    });
    watch(mask, (val) => {
      updateValue(val, innerLocale.value, "mask");
      innerMask.value = val;
    });
    watch(locale, (val) => {
      updateValue(innerMask.value, val, "locale");
      innerLocale.value = val;
    });
    function setToday() {
      const { year: year2, month, day } = today.value;
      const date = {
        ...viewModel.value,
        year: year2,
        month,
        day
      };
      const monthMap = daysMap.value[getMonthHash(date)];
      if (monthMap === void 0 || monthMap.includes(date.day) === false) {
        addToModel(date);
      }
      setCalendarTo(date.year, date.month);
    }
    function setView(viewMode) {
      if (viewIsValid(viewMode) === true) {
        view.value = viewMode;
      }
    }
    function offsetCalendar(type, descending) {
      if (["month", "year"].includes(type)) {
        const fn = type === "month" ? goToMonth : goToYear;
        fn(descending === true ? -1 : 1);
      }
    }
    function setCalendarTo(year2, month) {
      view.value = "Calendar";
      updateViewModel(year2, month);
    }
    function setEditingRange(from, to) {
      if (props.range === false || !from) {
        editRange.value = null;
        return;
      }
      const init = Object.assign({ ...viewModel.value }, from);
      const final = to !== void 0 ? Object.assign({ ...viewModel.value }, to) : init;
      editRange.value = {
        init,
        initHash: getDayHash(init),
        final,
        finalHash: getDayHash(final)
      };
      setCalendarTo(init.year, init.month);
    }
    function getMask() {
      return props.calendar === "persian" ? "YYYY/MM/DD" : props.mask;
    }
    function decodeString(date, mask2, locale2) {
      return __splitDate(
        date,
        mask2,
        locale2,
        props.calendar,
        {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }
      );
    }
    function getViewModel(mask2, locale2) {
      const model = Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue ? [props.modelValue] : [];
      if (model.length === 0) {
        return getDefaultViewModel();
      }
      const target = model[model.length - 1];
      const decoded = decodeString(
        target.from !== void 0 ? target.from : target,
        mask2,
        locale2
      );
      return decoded.dateHash === null ? getDefaultViewModel() : decoded;
    }
    function getDefaultViewModel() {
      let year2, month;
      if (props.defaultYearMonth !== void 0) {
        const d = props.defaultYearMonth.split("/");
        year2 = parseInt(d[0], 10);
        month = parseInt(d[1], 10);
      } else {
        const d = today.value !== void 0 ? today.value : getCurrentDate();
        year2 = d.year;
        month = d.month;
      }
      return {
        year: year2,
        month,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        dateHash: year2 + "/" + pad(month) + "/01"
      };
    }
    function goToMonth(offset) {
      let year2 = viewModel.value.year;
      let month = Number(viewModel.value.month) + offset;
      if (month === 13) {
        month = 1;
        year2++;
      } else if (month === 0) {
        month = 12;
        year2--;
      }
      updateViewModel(year2, month);
      isImmediate.value === true && emitImmediately("month");
    }
    function goToYear(offset) {
      const year2 = Number(viewModel.value.year) + offset;
      updateViewModel(year2, viewModel.value.month);
      isImmediate.value === true && emitImmediately("year");
    }
    function setYear(year2) {
      updateViewModel(year2, viewModel.value.month);
      view.value = props.defaultView === "Years" ? "Months" : "Calendar";
      isImmediate.value === true && emitImmediately("year");
    }
    function setMonth(month) {
      updateViewModel(viewModel.value.year, month);
      view.value = "Calendar";
      isImmediate.value === true && emitImmediately("month");
    }
    function toggleDate(date, monthHash) {
      const month = daysMap.value[monthHash];
      const fn = month !== void 0 && month.includes(date.day) === true ? removeFromModel : addToModel;
      fn(date);
    }
    function getShortDate(date) {
      return { year: date.year, month: date.month, day: date.day };
    }
    function updateViewModel(year2, month, time) {
      if (minNav.value !== null && year2 <= minNav.value.year) {
        if (month < minNav.value.month || year2 < minNav.value.year) {
          month = minNav.value.month;
        }
        year2 = minNav.value.year;
      }
      if (maxNav.value !== null && year2 >= maxNav.value.year) {
        if (month > maxNav.value.month || year2 > maxNav.value.year) {
          month = maxNav.value.month;
        }
        year2 = maxNav.value.year;
      }
      if (time !== void 0) {
        const { hour, minute, second, millisecond, timezoneOffset, timeHash } = time;
        Object.assign(viewModel.value, { hour, minute, second, millisecond, timezoneOffset, timeHash });
      }
      const newHash = year2 + "/" + pad(month) + "/01";
      if (newHash !== viewModel.value.dateHash) {
        monthDirection.value = viewModel.value.dateHash < newHash === ($q.lang.rtl !== true) ? "left" : "right";
        if (year2 !== viewModel.value.year) {
          yearDirection.value = monthDirection.value;
        }
        nextTick(() => {
          startYear.value = year2 - year2 % yearsInterval - (year2 < 0 ? yearsInterval : 0);
          Object.assign(viewModel.value, {
            year: year2,
            month,
            day: 1,
            dateHash: newHash
          });
        });
      }
    }
    function emitValue(val, action, date) {
      const value2 = val !== null && val.length === 1 && props.multiple === false ? val[0] : val;
      lastEmitValue = value2;
      const { reason, details } = getEmitParams(action, date);
      emit("update:modelValue", value2, reason, details);
    }
    function emitImmediately(reason) {
      const date = daysModel.value[0] !== void 0 && daysModel.value[0].dateHash !== null ? { ...daysModel.value[0] } : { ...viewModel.value };
      nextTick(() => {
        date.year = viewModel.value.year;
        date.month = viewModel.value.month;
        const maxDay = props.calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
        date.day = Math.min(Math.max(1, date.day), maxDay);
        const value2 = encodeEntry(date);
        lastEmitValue = value2;
        const { details } = getEmitParams("", date);
        emit("update:modelValue", value2, reason, details);
      });
    }
    function getEmitParams(action, date) {
      return date.from !== void 0 ? {
        reason: `${action}-range`,
        details: {
          ...getShortDate(date.target),
          from: getShortDate(date.from),
          to: getShortDate(date.to)
        }
      } : {
        reason: `${action}-day`,
        details: getShortDate(date)
      };
    }
    function encodeEntry(date, mask2, locale2) {
      return date.from !== void 0 ? { from: encodeObjectFn.value(date.from, mask2, locale2), to: encodeObjectFn.value(date.to, mask2, locale2) } : encodeObjectFn.value(date, mask2, locale2);
    }
    function addToModel(date) {
      let value2;
      if (props.multiple === true) {
        if (date.from !== void 0) {
          const fromHash = getDayHash(date.from);
          const toHash = getDayHash(date.to);
          const days2 = daysModel.value.filter((day) => day.dateHash < fromHash || day.dateHash > toHash);
          const ranges = rangeModel.value.filter(({ from, to }) => to.dateHash < fromHash || from.dateHash > toHash);
          value2 = days2.concat(ranges).concat(date).map((entry) => encodeEntry(entry));
        } else {
          const model = normalizedModel.value.slice();
          model.push(encodeEntry(date));
          value2 = model;
        }
      } else {
        value2 = encodeEntry(date);
      }
      emitValue(value2, "add", date);
    }
    function removeFromModel(date) {
      if (props.noUnset === true) {
        return;
      }
      let model = null;
      if (props.multiple === true && Array.isArray(props.modelValue) === true) {
        const val = encodeEntry(date);
        if (date.from !== void 0) {
          model = props.modelValue.filter(
            (date2) => date2.from !== void 0 ? date2.from !== val.from && date2.to !== val.to : true
          );
        } else {
          model = props.modelValue.filter((date2) => date2 !== val);
        }
        if (model.length === 0) {
          model = null;
        }
      }
      emitValue(model, "remove", date);
    }
    function updateValue(mask2, locale2, reason) {
      const model = daysModel.value.concat(rangeModel.value).map((entry) => encodeEntry(entry, mask2, locale2)).filter((entry) => {
        return entry.from !== void 0 ? entry.from.dateHash !== null && entry.to.dateHash !== null : entry.dateHash !== null;
      });
      emit("update:modelValue", (props.multiple === true ? model : model[0]) || null, reason);
    }
    function getHeader() {
      if (props.minimal === true)
        return;
      return h("div", {
        class: "q-date__header " + headerClass.value
      }, [
        h("div", {
          class: "relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, () => h("div", {
            key: "h-yr-" + headerSubtitle.value,
            class: "q-date__header-subtitle q-date__header-link " + (view.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            ...getCache("vY", {
              onClick() {
                view.value = "Years";
              },
              onKeyup(e) {
                e.keyCode === 13 && (view.value = "Years");
              }
            })
          }, [headerSubtitle.value]))
        ]),
        h("div", {
          class: "q-date__header-title relative-position flex no-wrap"
        }, [
          h("div", {
            class: "relative-position col"
          }, [
            h(Transition, {
              name: "q-transition--fade"
            }, () => h("div", {
              key: "h-sub" + headerTitle.value,
              class: "q-date__header-title-label q-date__header-link " + (view.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
              tabindex: tabindex.value,
              ...getCache("vC", {
                onClick() {
                  view.value = "Calendar";
                },
                onKeyup(e) {
                  e.keyCode === 13 && (view.value = "Calendar");
                }
              })
            }, [headerTitle.value]))
          ]),
          props.todayBtn === true ? h(QBtn, {
            class: "q-date__header-today self-start",
            icon: $q.iconSet.datetime.today,
            flat: true,
            size: "sm",
            round: true,
            tabindex: tabindex.value,
            onClick: setToday
          }) : null
        ])
      ]);
    }
    function getNavigation({ label, type, key, dir, goTo, boundaries, cls }) {
      return [
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[0],
            tabindex: tabindex.value,
            disable: boundaries.prev === false,
            ...getCache("go-#" + type, { onClick() {
              goTo(-1);
            } })
          })
        ]),
        h("div", {
          class: "relative-position overflow-hidden flex flex-center" + cls
        }, [
          h(Transition, {
            name: "q-transition--jump-" + dir
          }, () => h("div", { key }, [
            h(QBtn, {
              flat: true,
              dense: true,
              noCaps: true,
              label,
              tabindex: tabindex.value,
              ...getCache("view#" + type, { onClick: () => {
                view.value = type;
              } })
            })
          ]))
        ]),
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[1],
            tabindex: tabindex.value,
            disable: boundaries.next === false,
            ...getCache("go+#" + type, { onClick() {
              goTo(1);
            } })
          })
        ])
      ];
    }
    const renderViews = {
      Calendar: () => [
        h("div", {
          key: "calendar-view",
          class: "q-date__view q-date__calendar"
        }, [
          h("div", {
            class: "q-date__navigation row items-center no-wrap"
          }, getNavigation({
            label: innerLocale.value.months[viewModel.value.month - 1],
            type: "Months",
            key: viewModel.value.month,
            dir: monthDirection.value,
            goTo: goToMonth,
            boundaries: navBoundaries.value.month,
            cls: " col"
          }).concat(getNavigation({
            label: viewModel.value.year,
            type: "Years",
            key: viewModel.value.year,
            dir: yearDirection.value,
            goTo: goToYear,
            boundaries: navBoundaries.value.year,
            cls: ""
          }))),
          h("div", {
            class: "q-date__calendar-weekdays row items-center no-wrap"
          }, daysOfWeek.value.map((day) => h("div", { class: "q-date__calendar-item" }, [h("div", day)]))),
          h("div", {
            class: "q-date__calendar-days-container relative-position overflow-hidden"
          }, [
            h(Transition, {
              name: "q-transition--slide-" + monthDirection.value
            }, () => h("div", {
              key: viewMonthHash.value,
              class: "q-date__calendar-days fit"
            }, days.value.map((day) => h("div", { class: day.classes }, [
              day.in === true ? h(
                QBtn,
                {
                  class: day.today === true ? "q-date__today" : "",
                  dense: true,
                  flat: day.flat,
                  unelevated: day.unelevated,
                  color: day.color,
                  textColor: day.textColor,
                  label: day.i,
                  tabindex: tabindex.value,
                  ...getCache("day#" + day.i, {
                    onClick: () => {
                      onDayClick(day.i);
                    },
                    onMouseover: () => {
                      onDayMouseover(day.i);
                    }
                  })
                },
                day.event !== false ? () => h("div", { class: "q-date__event bg-" + day.event }) : null
              ) : h("div", "" + day.i)
            ]))))
          ])
        ])
      ],
      Months() {
        const currentYear = viewModel.value.year === today.value.year;
        const isDisabled = (month) => {
          return minNav.value !== null && viewModel.value.year === minNav.value.year && minNav.value.month > month || maxNav.value !== null && viewModel.value.year === maxNav.value.year && maxNav.value.month < month;
        };
        const content = innerLocale.value.monthsShort.map((month, i) => {
          const active = viewModel.value.month === i + 1;
          return h("div", {
            class: "q-date__months-item flex flex-center"
          }, [
            h(QBtn, {
              class: currentYear === true && today.value.month === i + 1 ? "q-date__today" : null,
              flat: active !== true,
              label: month,
              unelevated: active,
              color: active === true ? computedColor.value : null,
              textColor: active === true ? computedTextColor.value : null,
              tabindex: tabindex.value,
              disable: isDisabled(i + 1),
              ...getCache("month#" + i, { onClick: () => {
                setMonth(i + 1);
              } })
            })
          ]);
        });
        props.yearsInMonthView === true && content.unshift(
          h("div", { class: "row no-wrap full-width" }, [
            getNavigation({
              label: viewModel.value.year,
              type: "Years",
              key: viewModel.value.year,
              dir: yearDirection.value,
              goTo: goToYear,
              boundaries: navBoundaries.value.year,
              cls: " col"
            })
          ])
        );
        return h("div", {
          key: "months-view",
          class: "q-date__view q-date__months flex flex-center"
        }, content);
      },
      Years() {
        const start = startYear.value, stop2 = start + yearsInterval, years = [];
        const isDisabled = (year2) => {
          return minNav.value !== null && minNav.value.year > year2 || maxNav.value !== null && maxNav.value.year < year2;
        };
        for (let i = start; i <= stop2; i++) {
          const active = viewModel.value.year === i;
          years.push(
            h("div", {
              class: "q-date__years-item flex flex-center"
            }, [
              h(QBtn, {
                key: "yr" + i,
                class: today.value.year === i ? "q-date__today" : null,
                flat: !active,
                label: i,
                dense: true,
                unelevated: active,
                color: active === true ? computedColor.value : null,
                textColor: active === true ? computedTextColor.value : null,
                tabindex: tabindex.value,
                disable: isDisabled(i),
                ...getCache("yr#" + i, { onClick: () => {
                  setYear(i);
                } })
              })
            ])
          );
        }
        return h("div", {
          class: "q-date__view q-date__years flex flex-center"
        }, [
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[0],
              tabindex: tabindex.value,
              disable: isDisabled(start),
              ...getCache("y-", { onClick: () => {
                startYear.value -= yearsInterval;
              } })
            })
          ]),
          h("div", {
            class: "q-date__years-content col self-stretch row items-center"
          }, years),
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[1],
              tabindex: tabindex.value,
              disable: isDisabled(stop2),
              ...getCache("y+", { onClick: () => {
                startYear.value += yearsInterval;
              } })
            })
          ])
        ]);
      }
    };
    function onDayClick(dayIndex) {
      const day = { ...viewModel.value, day: dayIndex };
      if (props.range === false) {
        toggleDate(day, viewMonthHash.value);
        return;
      }
      if (editRange.value === null) {
        const dayProps = days.value.find((day2) => day2.fill !== true && day2.i === dayIndex);
        if (props.noUnset !== true && dayProps.range !== void 0) {
          removeFromModel({ target: day, from: dayProps.range.from, to: dayProps.range.to });
          return;
        }
        if (dayProps.selected === true) {
          removeFromModel(day);
          return;
        }
        const initHash = getDayHash(day);
        editRange.value = {
          init: day,
          initHash,
          final: day,
          finalHash: initHash
        };
        emit("rangeStart", getShortDate(day));
      } else {
        const initHash = editRange.value.initHash, finalHash = getDayHash(day), payload = initHash <= finalHash ? { from: editRange.value.init, to: day } : { from: day, to: editRange.value.init };
        editRange.value = null;
        addToModel(initHash === finalHash ? day : { target: day, ...payload });
        emit("rangeEnd", {
          from: getShortDate(payload.from),
          to: getShortDate(payload.to)
        });
      }
    }
    function onDayMouseover(dayIndex) {
      if (editRange.value !== null) {
        const final = { ...viewModel.value, day: dayIndex };
        Object.assign(editRange.value, {
          final,
          finalHash: getDayHash(final)
        });
      }
    }
    Object.assign(proxy, {
      setToday,
      setView,
      offsetCalendar,
      setCalendarTo,
      setEditingRange
    });
    return () => {
      const content = [
        h("div", {
          class: "q-date__content col relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, renderViews[view.value])
        ])
      ];
      const def = hSlot(slots.default);
      def !== void 0 && content.push(
        h("div", { class: "q-date__actions" }, def)
      );
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(content, "push");
      }
      return h("div", {
        class: classes.value,
        ...attributes.value
      }, [
        getHeader(),
        h("div", {
          ref: blurTargetRef,
          class: "q-date__main col column",
          tabindex: -1
        }, content)
      ]);
    };
  }
});
var QPopupProxy = createComponent({
  name: "QPopupProxy",
  props: {
    ...useAnchorProps,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const showing = ref(false);
    const popupRef = ref(null);
    const breakpoint = computed(() => parseInt(props.breakpoint, 10));
    const { canShow } = useAnchor({ showing });
    function getType() {
      return $q.screen.width < breakpoint.value || $q.screen.height < breakpoint.value ? "dialog" : "menu";
    }
    const type = ref(getType());
    const popupProps = computed(
      () => type.value === "menu" ? { maxHeight: "99vh" } : {}
    );
    watch(() => getType(), (val) => {
      if (showing.value !== true) {
        type.value = val;
      }
    });
    function onShow(evt) {
      showing.value = true;
      emit("show", evt);
    }
    function onHide(evt) {
      showing.value = false;
      type.value = getType();
      emit("hide", evt);
    }
    Object.assign(proxy, {
      show(evt) {
        canShow(evt) === true && popupRef.value.show(evt);
      },
      hide(evt) {
        popupRef.value.hide(evt);
      },
      toggle(evt) {
        popupRef.value.toggle(evt);
      }
    });
    injectProp(proxy, "currentComponent", () => ({
      type: type.value,
      ref: popupRef.value
    }));
    return () => {
      const data = {
        ref: popupRef,
        ...popupProps.value,
        ...attrs,
        onShow,
        onHide
      };
      let component;
      if (type.value === "dialog") {
        component = QDialog;
      } else {
        component = QMenu;
        Object.assign(data, {
          target: props.target,
          contextMenu: props.contextMenu,
          noParentEvent: true,
          separateClosePopup: true
        });
      }
      return h(component, data, slots.default);
    };
  }
});
function getViewByModel(model, withSeconds) {
  if (model.hour !== null) {
    if (model.minute === null) {
      return "minute";
    } else if (withSeconds === true && model.second === null) {
      return "second";
    }
  }
  return "hour";
}
function getCurrentTime() {
  const d = new Date();
  return {
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
    millisecond: d.getMilliseconds()
  };
}
var QTime = createComponent({
  name: "QTime",
  props: {
    ...useDarkProps,
    ...useFormProps,
    ...useDatetimeProps,
    mask: {
      default: null
    },
    format24h: {
      type: Boolean,
      default: null
    },
    defaultDate: {
      type: String,
      validator: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)
    },
    options: Function,
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    withSeconds: Boolean,
    nowBtn: Boolean
  },
  emits: useDatetimeEmits,
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { $q } = vm.proxy;
    const isDark = useDark(props, $q);
    const { tabindex, headerClass, getLocale, getCurrentDate } = useDatetime(props, $q);
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    let draggingClockRect, dragCache;
    const clockRef = ref(null);
    const mask = computed(() => getMask());
    const locale = computed(() => getLocale());
    const defaultDateModel = computed(() => getDefaultDateModel());
    const model = __splitDate(
      props.modelValue,
      mask.value,
      locale.value,
      props.calendar,
      defaultDateModel.value
    );
    const view = ref(getViewByModel(model));
    const innerModel = ref(model);
    const isAM = ref(model.hour === null || model.hour < 12);
    const classes = computed(
      () => `q-time q-time--${props.landscape === true ? "landscape" : "portrait"}` + (isDark.value === true ? " q-time--dark q-dark" : "") + (props.disable === true ? " disabled" : props.readonly === true ? " q-time--readonly" : "") + (props.bordered === true ? " q-time--bordered" : "") + (props.square === true ? " q-time--square no-border-radius" : "") + (props.flat === true ? " q-time--flat no-shadow" : "")
    );
    const stringModel = computed(() => {
      const time = innerModel.value;
      return {
        hour: time.hour === null ? "--" : computedFormat24h.value === true ? pad(time.hour) : String(
          isAM.value === true ? time.hour === 0 ? 12 : time.hour : time.hour > 12 ? time.hour - 12 : time.hour
        ),
        minute: time.minute === null ? "--" : pad(time.minute),
        second: time.second === null ? "--" : pad(time.second)
      };
    });
    const computedFormat24h = computed(() => props.format24h !== null ? props.format24h : $q.lang.date.format24h);
    const pointerStyle = computed(() => {
      const forHour = view.value === "hour", divider = forHour === true ? 12 : 60, amount = innerModel.value[view.value], degrees = Math.round(amount * (360 / divider)) - 180;
      let transform = `rotate(${degrees}deg) translateX(-50%)`;
      if (forHour === true && computedFormat24h.value === true && innerModel.value.hour >= 12) {
        transform += " scale(.7)";
      }
      return { transform };
    });
    const minLink = computed(() => innerModel.value.hour !== null);
    const secLink = computed(() => minLink.value === true && innerModel.value.minute !== null);
    const hourInSelection = computed(() => props.hourOptions !== void 0 ? (val) => props.hourOptions.includes(val) : props.options !== void 0 ? (val) => props.options(val, null, null) : null);
    const minuteInSelection = computed(() => props.minuteOptions !== void 0 ? (val) => props.minuteOptions.includes(val) : props.options !== void 0 ? (val) => props.options(innerModel.value.hour, val, null) : null);
    const secondInSelection = computed(() => props.secondOptions !== void 0 ? (val) => props.secondOptions.includes(val) : props.options !== void 0 ? (val) => props.options(innerModel.value.hour, innerModel.value.minute, val) : null);
    const validHours = computed(() => {
      if (hourInSelection.value === null) {
        return null;
      }
      const am = getValidValues(0, 11, hourInSelection.value);
      const pm = getValidValues(12, 11, hourInSelection.value);
      return { am, pm, values: am.values.concat(pm.values) };
    });
    const validMinutes = computed(() => minuteInSelection.value !== null ? getValidValues(0, 59, minuteInSelection.value) : null);
    const validSeconds = computed(() => secondInSelection.value !== null ? getValidValues(0, 59, secondInSelection.value) : null);
    const viewValidOptions = computed(() => {
      switch (view.value) {
        case "hour":
          return validHours.value;
        case "minute":
          return validMinutes.value;
        case "second":
          return validSeconds.value;
      }
    });
    const positions = computed(() => {
      let start, end, offset = 0, step = 1;
      const values = viewValidOptions.value !== null ? viewValidOptions.value.values : void 0;
      if (view.value === "hour") {
        if (computedFormat24h.value === true) {
          start = 0;
          end = 23;
        } else {
          start = 0;
          end = 11;
          if (isAM.value === false) {
            offset = 12;
          }
        }
      } else {
        start = 0;
        end = 55;
        step = 5;
      }
      const pos = [];
      for (let val = start, index = start; val <= end; val += step, index++) {
        const actualVal = val + offset, disable = values !== void 0 && values.includes(actualVal) === false, label = view.value === "hour" && val === 0 ? computedFormat24h.value === true ? "00" : "12" : val;
        pos.push({ val: actualVal, index, disable, label });
      }
      return pos;
    });
    const clockDirectives = computed(() => {
      return [[
        TouchPan,
        onPan,
        void 0,
        {
          stop: true,
          prevent: true,
          mouse: true
        }
      ]];
    });
    watch(() => props.modelValue, (v) => {
      const model2 = __splitDate(
        v,
        mask.value,
        locale.value,
        props.calendar,
        defaultDateModel.value
      );
      if (model2.dateHash !== innerModel.value.dateHash || model2.timeHash !== innerModel.value.timeHash) {
        innerModel.value = model2;
        if (model2.hour === null) {
          view.value = "hour";
        } else {
          isAM.value = model2.hour < 12;
        }
      }
    });
    watch([mask, locale], () => {
      nextTick(() => {
        updateValue();
      });
    });
    function setNow() {
      const date = {
        ...getCurrentDate(),
        ...getCurrentTime()
      };
      updateValue(date);
      Object.assign(innerModel.value, date);
      view.value = "hour";
    }
    function getValidValues(start, count, testFn) {
      const values = Array.apply(null, { length: count + 1 }).map((_, index) => {
        const i = index + start;
        return {
          index: i,
          val: testFn(i) === true
        };
      }).filter((v) => v.val === true).map((v) => v.index);
      return {
        min: values[0],
        max: values[values.length - 1],
        values,
        threshold: count + 1
      };
    }
    function getWheelDist(a, b, threshold) {
      const diff = Math.abs(a - b);
      return Math.min(diff, threshold - diff);
    }
    function getNormalizedClockValue(val, { min, max, values, threshold }) {
      if (val === min) {
        return min;
      }
      if (val < min || val > max) {
        return getWheelDist(val, min, threshold) <= getWheelDist(val, max, threshold) ? min : max;
      }
      const index = values.findIndex((v) => val <= v), before = values[index - 1], after = values[index];
      return val - before <= after - val ? before : after;
    }
    function getMask() {
      return props.calendar !== "persian" && props.mask !== null ? props.mask : `HH:mm${props.withSeconds === true ? ":ss" : ""}`;
    }
    function getDefaultDateModel() {
      if (typeof props.defaultDate !== "string") {
        const date = getCurrentDate(true);
        date.dateHash = getDayHash(date);
        return date;
      }
      return __splitDate(props.defaultDate, "YYYY/MM/DD", void 0, props.calendar);
    }
    function shouldAbortInteraction() {
      return vmIsDestroyed(vm) === true || viewValidOptions.value !== null && (viewValidOptions.value.values.length === 0 || view.value === "hour" && computedFormat24h.value !== true && validHours.value[isAM.value === true ? "am" : "pm"].values.length === 0);
    }
    function getClockRect() {
      const clock = clockRef.value, { top, left, width } = clock.getBoundingClientRect(), dist = width / 2;
      return {
        top: top + dist,
        left: left + dist,
        dist: dist * 0.7
      };
    }
    function onPan(event) {
      if (shouldAbortInteraction() === true) {
        return;
      }
      if (event.isFirst === true) {
        draggingClockRect = getClockRect();
        dragCache = updateClock(event.evt, draggingClockRect);
        return;
      }
      dragCache = updateClock(event.evt, draggingClockRect, dragCache);
      if (event.isFinal === true) {
        draggingClockRect = false;
        dragCache = null;
        goToNextView();
      }
    }
    function goToNextView() {
      if (view.value === "hour") {
        view.value = "minute";
      } else if (props.withSeconds && view.value === "minute") {
        view.value = "second";
      }
    }
    function updateClock(evt, clockRect, cacheVal) {
      const pos = position(evt), height = Math.abs(pos.top - clockRect.top), distance = Math.sqrt(
        Math.pow(Math.abs(pos.top - clockRect.top), 2) + Math.pow(Math.abs(pos.left - clockRect.left), 2)
      );
      let val, angle = Math.asin(height / distance) * (180 / Math.PI);
      if (pos.top < clockRect.top) {
        angle = clockRect.left < pos.left ? 90 - angle : 270 + angle;
      } else {
        angle = clockRect.left < pos.left ? angle + 90 : 270 - angle;
      }
      if (view.value === "hour") {
        val = angle / 30;
        if (validHours.value !== null) {
          const am = computedFormat24h.value !== true ? isAM.value === true : validHours.value.am.values.length !== 0 && validHours.value.pm.values.length !== 0 ? distance >= clockRect.dist : validHours.value.am.values.length !== 0;
          val = getNormalizedClockValue(
            val + (am === true ? 0 : 12),
            validHours.value[am === true ? "am" : "pm"]
          );
        } else {
          val = Math.round(val);
          if (computedFormat24h.value === true) {
            if (distance < clockRect.dist) {
              if (val < 12) {
                val += 12;
              }
            } else if (val === 12) {
              val = 0;
            }
          } else if (isAM.value === true && val === 12) {
            val = 0;
          } else if (isAM.value === false && val !== 12) {
            val += 12;
          }
        }
        if (computedFormat24h.value === true) {
          isAM.value = val < 12;
        }
      } else {
        val = Math.round(angle / 6) % 60;
        if (view.value === "minute" && validMinutes.value !== null) {
          val = getNormalizedClockValue(val, validMinutes.value);
        } else if (view.value === "second" && validSeconds.value !== null) {
          val = getNormalizedClockValue(val, validSeconds.value);
        }
      }
      if (cacheVal !== val) {
        setModel[view.value](val);
      }
      return val;
    }
    const setView = {
      hour() {
        view.value = "hour";
      },
      minute() {
        view.value = "minute";
      },
      second() {
        view.value = "second";
      }
    };
    function setAmOnKey(e) {
      e.keyCode === 13 && setAm();
    }
    function setPmOnKey(e) {
      e.keyCode === 13 && setPm();
    }
    function onClick(evt) {
      if (shouldAbortInteraction() !== true) {
        if ($q.platform.is.desktop !== true) {
          updateClock(evt, getClockRect());
        }
        goToNextView();
      }
    }
    function onMousedown(evt) {
      if (shouldAbortInteraction() !== true) {
        updateClock(evt, getClockRect());
      }
    }
    function onKeyupHour(e) {
      if (e.keyCode === 13) {
        view.value = "hour";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validHours.value !== null) {
          const values = computedFormat24h.value === true ? validHours.value.values : validHours.value[isAM.value === true ? "am" : "pm"].values;
          if (values.length === 0)
            return;
          if (innerModel.value.hour === null) {
            setHour(values[0]);
          } else {
            const index = (values.length + values.indexOf(innerModel.value.hour) + payload) % values.length;
            setHour(values[index]);
          }
        } else {
          const wrap = computedFormat24h.value === true ? 24 : 12, offset = computedFormat24h.value !== true && isAM.value === false ? 12 : 0, val = innerModel.value.hour === null ? -payload : innerModel.value.hour;
          setHour(offset + (24 + val + payload) % wrap);
        }
      }
    }
    function onKeyupMinute(e) {
      if (e.keyCode === 13) {
        view.value = "minute";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validMinutes.value !== null) {
          const values = validMinutes.value.values;
          if (values.length === 0)
            return;
          if (innerModel.value.minute === null) {
            setMinute(values[0]);
          } else {
            const index = (values.length + values.indexOf(innerModel.value.minute) + payload) % values.length;
            setMinute(values[index]);
          }
        } else {
          const val = innerModel.value.minute === null ? -payload : innerModel.value.minute;
          setMinute((60 + val + payload) % 60);
        }
      }
    }
    function onKeyupSecond(e) {
      if (e.keyCode === 13) {
        view.value = "second";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validSeconds.value !== null) {
          const values = validSeconds.value.values;
          if (values.length === 0)
            return;
          if (innerModel.value.seconds === null) {
            setSecond(values[0]);
          } else {
            const index = (values.length + values.indexOf(innerModel.value.second) + payload) % values.length;
            setSecond(values[index]);
          }
        } else {
          const val = innerModel.value.second === null ? -payload : innerModel.value.second;
          setSecond((60 + val + payload) % 60);
        }
      }
    }
    function setHour(hour) {
      if (innerModel.value.hour !== hour) {
        innerModel.value.hour = hour;
        verifyAndUpdate();
      }
    }
    function setMinute(minute) {
      if (innerModel.value.minute !== minute) {
        innerModel.value.minute = minute;
        verifyAndUpdate();
      }
    }
    function setSecond(second) {
      if (innerModel.value.second !== second) {
        innerModel.value.second = second;
        verifyAndUpdate();
      }
    }
    const setModel = {
      hour: setHour,
      minute: setMinute,
      second: setSecond
    };
    function setAm() {
      if (isAM.value === false) {
        isAM.value = true;
        if (innerModel.value.hour !== null) {
          innerModel.value.hour -= 12;
          verifyAndUpdate();
        }
      }
    }
    function setPm() {
      if (isAM.value === true) {
        isAM.value = false;
        if (innerModel.value.hour !== null) {
          innerModel.value.hour += 12;
          verifyAndUpdate();
        }
      }
    }
    function goToViewWhenHasModel(newView) {
      const model2 = props.modelValue;
      if (view.value !== newView && model2 !== void 0 && model2 !== null && model2 !== "" && typeof model2 !== "string") {
        view.value = newView;
      }
    }
    function verifyAndUpdate() {
      if (hourInSelection.value !== null && hourInSelection.value(innerModel.value.hour) !== true) {
        innerModel.value = __splitDate();
        goToViewWhenHasModel("hour");
        return;
      }
      if (minuteInSelection.value !== null && minuteInSelection.value(innerModel.value.minute) !== true) {
        innerModel.value.minute = null;
        innerModel.value.second = null;
        goToViewWhenHasModel("minute");
        return;
      }
      if (props.withSeconds === true && secondInSelection.value !== null && secondInSelection.value(innerModel.value.second) !== true) {
        innerModel.value.second = null;
        goToViewWhenHasModel("second");
        return;
      }
      if (innerModel.value.hour === null || innerModel.value.minute === null || props.withSeconds === true && innerModel.value.second === null) {
        return;
      }
      updateValue();
    }
    function updateValue(obj) {
      const date = Object.assign({ ...innerModel.value }, obj);
      const val = props.calendar === "persian" ? pad(date.hour) + ":" + pad(date.minute) + (props.withSeconds === true ? ":" + pad(date.second) : "") : formatDate(
        new Date(
          date.year,
          date.month === null ? null : date.month - 1,
          date.day,
          date.hour,
          date.minute,
          date.second,
          date.millisecond
        ),
        mask.value,
        locale.value,
        date.year,
        date.timezoneOffset
      );
      date.changed = val !== props.modelValue;
      emit("update:modelValue", val, date);
    }
    function getHeader() {
      const label = [
        h("div", {
          class: "q-time__link " + (view.value === "hour" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: tabindex.value,
          onClick: setView.hour,
          onKeyup: onKeyupHour
        }, stringModel.value.hour),
        h("div", ":"),
        h(
          "div",
          minLink.value === true ? {
            class: "q-time__link " + (view.value === "minute" ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onKeyup: onKeyupMinute,
            onClick: setView.minute
          } : { class: "q-time__link" },
          stringModel.value.minute
        )
      ];
      if (props.withSeconds === true) {
        label.push(
          h("div", ":"),
          h(
            "div",
            secLink.value === true ? {
              class: "q-time__link " + (view.value === "second" ? "q-time__link--active" : "cursor-pointer"),
              tabindex: tabindex.value,
              onKeyup: onKeyupSecond,
              onClick: setView.second
            } : { class: "q-time__link" },
            stringModel.value.second
          )
        );
      }
      const child = [
        h("div", {
          class: "q-time__header-label row items-center no-wrap",
          dir: "ltr"
        }, label)
      ];
      computedFormat24h.value === false && child.push(
        h("div", {
          class: "q-time__header-ampm column items-between no-wrap"
        }, [
          h("div", {
            class: "q-time__link " + (isAM.value === true ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onClick: setAm,
            onKeyup: setAmOnKey
          }, "AM"),
          h("div", {
            class: "q-time__link " + (isAM.value !== true ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onClick: setPm,
            onKeyup: setPmOnKey
          }, "PM")
        ])
      );
      return h("div", {
        class: "q-time__header flex flex-center no-wrap " + headerClass.value
      }, child);
    }
    function getClock() {
      const current = innerModel.value[view.value];
      return h("div", {
        class: "q-time__content col relative-position"
      }, [
        h(Transition, {
          name: "q-transition--scale"
        }, () => h("div", {
          key: "clock" + view.value,
          class: "q-time__container-parent absolute-full"
        }, [
          h("div", {
            ref: clockRef,
            class: "q-time__container-child fit overflow-hidden"
          }, [
            withDirectives(
              h("div", {
                class: "q-time__clock cursor-pointer non-selectable",
                onClick,
                onMousedown
              }, [
                h("div", { class: "q-time__clock-circle fit" }, [
                  h("div", {
                    class: "q-time__clock-pointer" + (innerModel.value[view.value] === null ? " hidden" : props.color !== void 0 ? ` text-${props.color}` : ""),
                    style: pointerStyle.value
                  }),
                  positions.value.map((pos) => h("div", {
                    class: `q-time__clock-position row flex-center q-time__clock-pos-${pos.index}` + (pos.val === current ? " q-time__clock-position--active " + headerClass.value : pos.disable === true ? " q-time__clock-position--disable" : "")
                  }, [h("span", pos.label)]))
                ])
              ]),
              clockDirectives.value
            )
          ])
        ])),
        props.nowBtn === true ? h(QBtn, {
          class: "q-time__now-button absolute",
          icon: $q.iconSet.datetime.now,
          unelevated: true,
          size: "sm",
          round: true,
          color: props.color,
          textColor: props.textColor,
          tabindex: tabindex.value,
          onClick: setNow
        }) : null
      ]);
    }
    vm.proxy.setNow = setNow;
    return () => {
      const child = [getClock()];
      const def = hSlot(slots.default);
      def !== void 0 && child.push(
        h("div", { class: "q-time__actions" }, def)
      );
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, "push");
      }
      return h("div", {
        class: classes.value,
        tabindex: -1
      }, [
        getHeader(),
        h("div", { class: "q-time__main col overflow-auto" }, child)
      ]);
    };
  }
});
function getDepth(value2) {
  if (value2 === false) {
    return 0;
  }
  if (value2 === true || value2 === void 0) {
    return 1;
  }
  const depth = parseInt(value2, 10);
  return isNaN(depth) ? 0 : depth;
}
var ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value: value2 }) {
      const ctx = {
        depth: getDepth(value2),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const proxy = getPortalProxy(el);
            if (proxy !== void 0) {
              closePortals(proxy, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value: value2, oldValue }) {
      if (value2 !== oldValue) {
        el.__qclosepopup.depth = getDepth(value2);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
const _sfc_main = {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: [String, null],
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    min: {
      type: [String, null],
      default: ""
    },
    max: {
      type: [String, null],
      default: ""
    },
    dense: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      val: convertJSONToDate(this.value),
      minimum: convertJSONToMinimumDate(this.min),
      maximum: convertJSONToMinimumDate(this.max)
    };
  },
  watch: {
    val: {
      handler(v) {
        console.log("ooh");
        this.$emit("input", convertDateToJSON(v));
      }
    },
    value(value2) {
    },
    min(v) {
      this.minimum = convertJSONToMinimumDate(v);
    },
    max(v) {
      this.maximum = convertJSONToMinimumDate(v);
    }
  }
};
const _hoisted_1 = { class: "w-full flex flex-row gap-2" };
const _hoisted_2 = { class: "row items-center justify-end" };
const _hoisted_3 = { class: "row items-center justify-end" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(QInput, {
      dense: $props.dense,
      flat: "",
      modelValue: $data.val,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.val = $event),
      label: $props.label,
      class: "w-full"
    }, {
      prepend: withCtx(() => [
        createVNode(QIcon, {
          name: "event",
          class: "cursor-pointer"
        }, {
          default: withCtx(() => [
            createVNode(QPopupProxy, {
              cover: "",
              "transition-show": "scale",
              "transition-hide": "scale"
            }, {
              default: withCtx(() => [
                createVNode(QDate, {
                  "today-btn": "",
                  modelValue: $data.val,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
                  mask: "YYYY-MM-DD HH:mm",
                  options: (date) => date > $data.minimum && ($data.maximum == "" || date < $data.maximum)
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      withDirectives(createVNode(QBtn, {
                        label: "Close",
                        color: "primary",
                        flat: ""
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "options"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      append: withCtx(() => [
        createVNode(QIcon, {
          name: "access_time",
          class: "cursor-pointer"
        }, {
          default: withCtx(() => [
            createVNode(QPopupProxy, {
              cover: "",
              "transition-show": "scale",
              "transition-hide": "scale"
            }, {
              default: withCtx(() => [
                createVNode(QTime, {
                  modelValue: $data.val,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.val = $event),
                  mask: "YYYY-MM-DD HH:mm",
                  format24h: ""
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, [
                      withDirectives(createVNode(QBtn, {
                        label: "Close",
                        color: "primary",
                        flat: ""
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QIcon, {
          onClick: _cache[2] || (_cache[2] = ($event) => $data.val = ""),
          name: "close"
        })
      ]),
      _: 1
    }, 8, ["dense", "modelValue", "label"])
  ]);
}
var DateTimeInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "DateTimeInput.vue"]]);
var __glob_11_0 = "assets/activism.e7394060.png";
var __glob_11_1 = "assets/basketball.70d1f099.png";
var __glob_11_2 = "assets/building.60c56f50.png";
var __glob_11_3 = "assets/culture.2926b4c2.png";
var __glob_11_4 = "assets/entertainment.24af4949.png";
var __glob_11_5 = "assets/football.14d2ab8e.png";
var __glob_11_6 = "assets/sport.a5dce760.png";
var __glob_11_7 = "assets/table_games.27dd75c9.png";
var __glob_11_8 = "assets/tennis.586f8f82.png";
var __glob_11_9 = "assets/volleyball.b46ee1e6.png";
export { DateTimeInput as D, TouchPan as T, __glob_11_0 as _, __glob_11_1 as a, __glob_11_2 as b, __glob_11_3 as c, __glob_11_4 as d, __glob_11_5 as e, __glob_11_6 as f, __glob_11_7 as g, __glob_11_8 as h, __glob_11_9 as i };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sbGV5YmFsbC5jZTRjMmExZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS90b3VjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvdG91Y2gtcGFuL1RvdWNoUGFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXJlbmRlci1jYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9kYXRlL3VzZS1kYXRldGltZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RhdGUvUURhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BvcHVwLXByb3h5L1FQb3B1cFByb3h5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90aW1lL1FUaW1lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9jbG9zZS1wb3B1cC9DbG9zZVBvcHVwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRGF0ZVRpbWVJbnB1dC52dWUiLCIuLi8uLi8uLi9zcmMvYXNzZXRzL2ljb25zL2FjdGl2aXNtLnBuZyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvaWNvbnMvYmFza2V0YmFsbC5wbmciLCIuLi8uLi8uLi9zcmMvYXNzZXRzL2ljb25zL2J1aWxkaW5nLnBuZyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvaWNvbnMvY3VsdHVyZS5wbmciLCIuLi8uLi8uLi9zcmMvYXNzZXRzL2ljb25zL2VudGVydGFpbm1lbnQucG5nIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9pY29ucy9mb290YmFsbC5wbmciLCIuLi8uLi8uLi9zcmMvYXNzZXRzL2ljb25zL3Nwb3J0LnBuZyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvaWNvbnMvdGFibGVfZ2FtZXMucG5nIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9pY29ucy90ZW5uaXMucG5nIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9pY29ucy92b2xsZXliYWxsLnBuZyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb2RpZmllcnNBbGwgPSB7XG4gIGxlZnQ6IHRydWUsXG4gIHJpZ2h0OiB0cnVlLFxuICB1cDogdHJ1ZSxcbiAgZG93bjogdHJ1ZSxcbiAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgdmVydGljYWw6IHRydWVcbn1cblxuY29uc3QgZGlyZWN0aW9uTGlzdCA9IE9iamVjdC5rZXlzKG1vZGlmaWVyc0FsbClcblxubW9kaWZpZXJzQWxsLmFsbCA9IHRydWVcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZGlmaWVyRGlyZWN0aW9ucyAobW9kKSB7XG4gIGNvbnN0IGRpciA9IHt9XG5cbiAgZm9yIChjb25zdCBkaXJlY3Rpb24gb2YgZGlyZWN0aW9uTGlzdCkge1xuICAgIGlmIChtb2RbIGRpcmVjdGlvbiBdID09PSB0cnVlKSB7XG4gICAgICBkaXJbIGRpcmVjdGlvbiBdID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGlmIChPYmplY3Qua2V5cyhkaXIpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtb2RpZmllcnNBbGxcbiAgfVxuXG4gIGlmIChkaXIuaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci5sZWZ0ID0gZGlyLnJpZ2h0ID0gdHJ1ZVxuICB9XG4gIGVsc2UgaWYgKGRpci5sZWZ0ID09PSB0cnVlICYmIGRpci5yaWdodCA9PT0gdHJ1ZSkge1xuICAgIGRpci5ob3Jpem9udGFsID0gdHJ1ZVxuICB9XG5cbiAgaWYgKGRpci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci51cCA9IGRpci5kb3duID0gdHJ1ZVxuICB9XG4gIGVsc2UgaWYgKGRpci51cCA9PT0gdHJ1ZSAmJiBkaXIuZG93biA9PT0gdHJ1ZSkge1xuICAgIGRpci52ZXJ0aWNhbCA9IHRydWVcbiAgfVxuXG4gIGlmIChkaXIuaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBkaXIudmVydGljYWwgPT09IHRydWUpIHtcbiAgICBkaXIuYWxsID0gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGRpclxufVxuXG4vLyBUaGlzIGlzIGVzcGVjaWFsbHkgaW1wb3J0YW50IChub3QgdGhlIG1haW4gcmVhc29uLCBidXQgaW1wb3J0YW50KVxuLy8gZm9yIFRvdWNoU3dpcGUgZGlyZWN0aXZlIHJ1bm5pbmcgb24gRmlyZWZveFxuLy8gYmVjYXVzZSB0ZXh0IHNlbGVjdGlvbiBvbiBzdWNoIGVsZW1lbnRzIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4vLyB3aXRob3V0IGFkZGl0aW9uYWwgd29yayAob24gdG9wIG9mIGdldFNlbGVjdGlvbigpIEFQSSlcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg1Njg2XG5jb25zdCBhdm9pZE5vZGVOYW1lc0xpc3QgPSBbICdJTlBVVCcsICdURVhUQVJFQScgXVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkU3RhcnQgKGV2dCwgY3R4KSB7XG4gIHJldHVybiBjdHguZXZlbnQgPT09IHZvaWQgMFxuICAgICYmIGV2dC50YXJnZXQgIT09IHZvaWQgMFxuICAgICYmIGV2dC50YXJnZXQuZHJhZ2dhYmxlICE9PSB0cnVlXG4gICAgJiYgdHlwZW9mIGN0eC5oYW5kbGVyID09PSAnZnVuY3Rpb24nXG4gICAgJiYgYXZvaWROb2RlTmFtZXNMaXN0LmluY2x1ZGVzKGV2dC50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKSkgPT09IGZhbHNlXG4gICAgJiYgKGV2dC5xQ2xvbmVkQnkgPT09IHZvaWQgMCB8fCBldnQucUNsb25lZEJ5LmluZGV4T2YoY3R4LnVpZCkgPT09IC0xKVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRNb2RpZmllckRpcmVjdGlvbnMsIHNob3VsZFN0YXJ0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS90b3VjaC5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHBvc2l0aW9uLCBsZWZ0Q2xpY2ssIHByZXZlbnQsIHN0b3AsIHN0b3BBbmRQcmV2ZW50LCBwcmV2ZW50RHJhZ2dhYmxlLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gZ2V0Q2hhbmdlcyAoZXZ0LCBjdHgsIGlzRmluYWwpIHtcbiAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuICBsZXRcbiAgICBkaXIsXG4gICAgZGlzdFggPSBwb3MubGVmdCAtIGN0eC5ldmVudC54LFxuICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55LFxuICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgYWJzWSA9IE1hdGguYWJzKGRpc3RZKVxuXG4gIGNvbnN0IGRpcmVjdGlvbiA9IGN0eC5kaXJlY3Rpb25cblxuICBpZiAoZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWUgJiYgZGlyZWN0aW9uLnZlcnRpY2FsICE9PSB0cnVlKSB7XG4gICAgZGlyID0gZGlzdFggPCAwID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5ob3Jpem9udGFsICE9PSB0cnVlICYmIGRpcmVjdGlvbi52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpciA9IGRpc3RZIDwgMCA/ICd1cCcgOiAnZG93bidcbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgZGlyID0gJ3VwJ1xuICAgIGlmIChhYnNYID4gYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgICAgICBkaXIgPSAnbGVmdCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICAgICAgZGlyID0gJ3JpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICBkaXIgPSAnZG93bidcbiAgICBpZiAoYWJzWCA+IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICAgICAgZGlyID0gJ2xlZnQnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgZGlzdFggPiAwKSB7XG4gICAgICAgIGRpciA9ICdyaWdodCdcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgZGlyID0gJ2xlZnQnXG4gICAgaWYgKGFic1ggPCBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGRpc3RZIDwgMCkge1xuICAgICAgICBkaXIgPSAndXAnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICAgICAgZGlyID0gJ2Rvd24nXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICBkaXIgPSAncmlnaHQnXG4gICAgaWYgKGFic1ggPCBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGRpc3RZIDwgMCkge1xuICAgICAgICBkaXIgPSAndXAnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICAgICAgZGlyID0gJ2Rvd24nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHN5bnRoZXRpYyA9IGZhbHNlXG5cbiAgaWYgKGRpciA9PT0gdm9pZCAwICYmIGlzRmluYWwgPT09IGZhbHNlKSB7XG4gICAgaWYgKGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlIHx8IGN0eC5ldmVudC5sYXN0RGlyID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiB7fVxuICAgIH1cblxuICAgIGRpciA9IGN0eC5ldmVudC5sYXN0RGlyXG4gICAgc3ludGhldGljID0gdHJ1ZVxuXG4gICAgaWYgKGRpciA9PT0gJ2xlZnQnIHx8IGRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcG9zLmxlZnQgLT0gZGlzdFhcbiAgICAgIGFic1ggPSAwXG4gICAgICBkaXN0WCA9IDBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwb3MudG9wIC09IGRpc3RZXG4gICAgICBhYnNZID0gMFxuICAgICAgZGlzdFkgPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzeW50aGV0aWMsXG4gICAgcGF5bG9hZDoge1xuICAgICAgZXZ0LFxuICAgICAgdG91Y2g6IGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSxcbiAgICAgIG1vdXNlOiBjdHguZXZlbnQubW91c2UgPT09IHRydWUsXG4gICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgZGlyZWN0aW9uOiBkaXIsXG4gICAgICBpc0ZpcnN0OiBjdHguZXZlbnQuaXNGaXJzdCxcbiAgICAgIGlzRmluYWw6IGlzRmluYWwgPT09IHRydWUsXG4gICAgICBkdXJhdGlvbjogRGF0ZS5ub3coKSAtIGN0eC5ldmVudC50aW1lLFxuICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgeDogYWJzWCxcbiAgICAgICAgeTogYWJzWVxuICAgICAgfSxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB4OiBkaXN0WCxcbiAgICAgICAgeTogZGlzdFlcbiAgICAgIH0sXG4gICAgICBkZWx0YToge1xuICAgICAgICB4OiBwb3MubGVmdCAtIGN0eC5ldmVudC5sYXN0WCxcbiAgICAgICAgeTogcG9zLnRvcCAtIGN0eC5ldmVudC5sYXN0WVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5sZXQgdWlkID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtcGFuJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICd0b3VjaC1wYW4nLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUsIG1vZGlmaWVycyB9KSB7XG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlICYmIG1vdXNlRXZlbnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcbiAgICAgICAgICAgIG1vZGlmaWVycy5wcmV2ZW50ID09PSB0cnVlICYmIHByZXZlbnQoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICB1aWQ6ICdxdnRwXycgKyAodWlkKyspLFxuICAgICAgICAgIGhhbmRsZXI6IHZhbHVlLFxuICAgICAgICAgIG1vZGlmaWVycyxcbiAgICAgICAgICBkaXJlY3Rpb246IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhtb2RpZmllcnMpLFxuXG4gICAgICAgICAgbm9vcCxcblxuICAgICAgICAgIG1vdXNlU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSAmJiBsZWZ0Q2xpY2soZXZ0KSkge1xuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNldXAnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG5cbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgdG91Y2hTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcblxuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG5cbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgdHJ1ZSlcbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gZXZ0XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAqIFN0b3AgcHJvcGFnYXRpb24gc28gcG9zc2libGUgdXBwZXIgdi10b3VjaC1wYW4gZG9uJ3QgY2F0Y2ggdGhpcyBhcyB3ZWxsO1xuICAgICAgICAgICAgKiBJZiB3ZSdyZSBub3QgdGhlIHRhcmdldCAoYmFzZWQgb24gbW9kaWZpZXJzKSwgd2UnbGwgcmUtZW1pdCB0aGUgZXZlbnQgbGF0ZXJcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAobW91c2VFdmVudCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAqIGFyZSB3ZSBkaXJlY3RseSBzd2l0Y2hpbmcgdG8gZGV0ZWN0ZWQgc3RhdGU/XG4gICAgICAgICAgICAgICogY2xvbmUgZXZlbnQgb25seSBvdGhlcndpc2VcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uYWxsICE9PSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICAgICAgICAmJiAobW91c2VFdmVudCAhPT0gdHJ1ZSB8fCAoY3R4Lm1vZGlmaWVycy5tb3VzZUFsbERpciAhPT0gdHJ1ZSAmJiBjdHgubW9kaWZpZXJzLm1vdXNlYWxsZGlyICE9PSB0cnVlKSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBldnQudHlwZS5pbmRleE9mKCdtb3VzZScpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgPyBuZXcgTW91c2VFdmVudChldnQudHlwZSwgZXZ0KVxuICAgICAgICAgICAgICAgICAgOiBuZXcgVG91Y2hFdmVudChldnQudHlwZSwgZXZ0KVxuXG4gICAgICAgICAgICAgICAgZXZ0LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUgJiYgcHJldmVudChjbG9uZSlcbiAgICAgICAgICAgICAgICBldnQuY2FuY2VsQnViYmxlID09PSB0cnVlICYmIHN0b3AoY2xvbmUpXG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNsb25lLCB7XG4gICAgICAgICAgICAgICAgICBxS2V5RXZlbnQ6IGV2dC5xS2V5RXZlbnQsXG4gICAgICAgICAgICAgICAgICBxQ2xpY2tPdXRzaWRlOiBldnQucUNsaWNrT3V0c2lkZSxcbiAgICAgICAgICAgICAgICAgIHFBbmNob3JIYW5kbGVkOiBldnQucUFuY2hvckhhbmRsZWQsXG4gICAgICAgICAgICAgICAgICBxQ2xvbmVkQnk6IGV2dC5xQ2xvbmVkQnkgPT09IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgICA/IFsgY3R4LnVpZCBdXG4gICAgICAgICAgICAgICAgICAgIDogZXZ0LnFDbG9uZWRCeS5jb25jYXQoY3R4LnVpZClcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgY3R4LmluaXRpYWxFdmVudCA9IHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldDogZXZ0LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBjbG9uZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHN0b3AoZXZ0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB7XG4gICAgICAgICAgICAgIHg6IGxlZnQsXG4gICAgICAgICAgICAgIHk6IHRvcCxcbiAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgIGRldGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgaXNGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXNGaW5hbDogZmFsc2UsXG4gICAgICAgICAgICAgIGxhc3RYOiBsZWZ0LFxuICAgICAgICAgICAgICBsYXN0WTogdG9wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG1vdmUgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgYnVnZ3kgYnJvd3NlciBiZWhhdmlvciAobGlrZSBCbGluay1iYXNlZCBlbmdpbmUgb25lcyBvbiBXaW5kb3dzKVxuICAgICAgICAgICAgLy8gd2hlcmUgdGhlIG1vdXNlbW92ZSBldmVudCBvY2N1cnMgZXZlbiBpZiB0aGVyZSdzIG5vIG1vdmVtZW50IGFmdGVyIG1vdXNlZG93blxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTYxNDY0XG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03MjEzNDFcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9xdWFzYXJmcmFtZXdvcmsvcXVhc2FyL2lzc3Vlcy8xMDcyMVxuICAgICAgICAgICAgaWYgKGRpc3RYID09PSAwICYmIGRpc3RZID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHgubGFzdEV2dCA9IGV2dFxuXG4gICAgICAgICAgICBjb25zdCBpc01vdXNlRXZ0ID0gY3R4LmV2ZW50Lm1vdXNlID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZ0LCBpc01vdXNlRXZ0KVxuXG4gICAgICAgICAgICAgIGxldCBjdXJzb3JcbiAgICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5wcmVzZXJ2ZUN1cnNvciAhPT0gdHJ1ZSAmJiBtb2RpZmllcnMucHJlc2VydmVjdXJzb3IgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yIHx8ICcnXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdncmFiYmluZydcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzTW91c2VFdnQgPT09IHRydWUgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB3aXRoRGVsYXllZEZuID0+IHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3JcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICAgICAgICAgIGlmIChpc01vdXNlRXZ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIHdpdGhEZWxheWVkRm4oKVxuICAgICAgICAgICAgICAgICAgICB9LCA1MClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgd2l0aERlbGF5ZWRGbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGV0ZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgIT09IHRydWUgJiYgaGFuZGxlRXZlbnQoZXZ0LCBjdHguZXZlbnQubW91c2UpXG5cbiAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkLCBzeW50aGV0aWMgfSA9IGdldENoYW5nZXMoZXZ0LCBjdHgsIGZhbHNlKVxuXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmhhbmRsZXIocGF5bG9hZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY3R4LnN0eWxlQ2xlYW51cCA9PT0gdm9pZCAwICYmIGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3RYID0gcGF5bG9hZC5wb3NpdGlvbi5sZWZ0XG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQubGFzdFkgPSBwYXlsb2FkLnBvc2l0aW9uLnRvcFxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3REaXIgPSBzeW50aGV0aWMgPT09IHRydWUgPyB2b2lkIDAgOiBwYXlsb2FkLmRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uYWxsID09PSB0cnVlXG4gICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgICAgIHx8IChpc01vdXNlRXZ0ID09PSB0cnVlICYmIChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyID09PSB0cnVlIHx8IGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgPT09IHRydWUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRldGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBhYnNYID0gTWF0aC5hYnMoZGlzdFgpLFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChhYnNYICE9PSBhYnNZKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoY3R4LmRpcmVjdGlvbi5ob3Jpem9udGFsID09PSB0cnVlICYmIGFic1ggPiBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlICYmIGFic1ggPCBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZID4gMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGFic1ggPiBhYnNZICYmIGRpc3RYIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSAmJiBkaXN0WCA+IDApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGN0eC5ldmVudC5kZXRlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LmVuZChldnQsIHRydWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQsIGFib3J0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG5cbiAgICAgICAgICAgIGlmIChhYm9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDAgJiYgY3R4LnN0eWxlQ2xlYW51cCgpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCAhPT0gdHJ1ZSAmJiBjdHguaW5pdGlhbEV2ZW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGN0eC5pbml0aWFsRXZlbnQuZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihnZXRDaGFuZ2VzKGV2dCA9PT0gdm9pZCAwID8gY3R4Lmxhc3RFdnQgOiBldnQsIGN0eCkucGF5bG9hZClcblxuICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGdldENoYW5nZXMoZXZ0ID09PSB2b2lkIDAgPyBjdHgubGFzdEV2dCA6IGV2dCwgY3R4LCB0cnVlKVxuICAgICAgICAgICAgICBjb25zdCBmbiA9ICgpID0+IHsgY3R4LmhhbmRsZXIocGF5bG9hZCkgfVxuXG4gICAgICAgICAgICAgIGlmIChjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwKGZuKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZuKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hwYW4gPSBjdHhcblxuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMubW91c2VjYXB0dXJlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdDYXB0dXJlJ1xuICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgICBbIGVsLCAnbW91c2Vkb3duJywgJ21vdXNlU3RhcnQnLCBgcGFzc2l2ZSR7IGNhcHR1cmUgfWAgXVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0gLy8gY2Fubm90IGJlIHBhc3NpdmUgKGV4OiBpT1Mgc2Nyb2xsKVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNocGFuXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKGJpbmRpbmdzLm9sZFZhbHVlICE9PSBiaW5kaW5ncy52YWx1ZSkge1xuICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIGN0eC5lbmQoKVxuICAgICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5ncy52YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0eC5kaXJlY3Rpb24gPSBnZXRNb2RpZmllckRpcmVjdGlvbnMoYmluZGluZ3MubW9kaWZpZXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHBhblxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIC8vIGVtaXQgdGhlIGVuZCBldmVudCB3aGVuIHRoZSBkaXJlY3RpdmUgaXMgZGVzdHJveWVkIHdoaWxlIGFjdGl2ZVxuICAgICAgICAgIC8vIHRoaXMgaXMgb25seSBuZWVkZWQgaW4gVG91Y2hQYW4gYmVjYXVzZSB0aGUgcmVzdCBvZiB0aGUgdG91Y2ggZGlyZWN0aXZlcyBkbyBub3QgZW1pdCBhbiBlbmQgZXZlbnRcbiAgICAgICAgICAvLyB0aGUgY29uZGl0aW9uIGlzIGFsc28gY2hlY2tlZCBpbiB0aGUgc3RhcnQgb2YgZnVuY3Rpb24gYnV0IHdlIGF2b2lkIHRoZSBjYWxsXG4gICAgICAgICAgY3R4LmV2ZW50ICE9PSB2b2lkIDAgJiYgY3R4LmVuZCgpXG5cbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHBhblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgcmV0dXJuIHtcbiAgICBnZXRDYWNoZTogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgICA/IChfLCBkZWZhdWx0VmFsdWUpID0+IChcbiAgICAgICAgICB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGRlZmF1bHRWYWx1ZSgpXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZVxuICAgICAgICApXG4gICAgICA6IChrZXksIGRlZmF1bHRWYWx1ZSkgPT4gKFxuICAgICAgICAgIGNhY2hlWyBrZXkgXSA9PT0gdm9pZCAwXG4gICAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgICBjYWNoZVsga2V5IF0gPSAoXG4gICAgICAgICAgICAgICAgICB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgID8gZGVmYXVsdFZhbHVlKClcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogY2FjaGVbIGtleSBdXG4gICAgICAgICksXG5cbiAgICBzZXRDYWNoZSAoa2V5LCBvYmopIHtcbiAgICAgIGNhY2hlWyBrZXkgXSA9IG9ialxuICAgIH0sXG5cbiAgICBoYXNDYWNoZSAoa2V5KSB7XG4gICAgICByZXR1cm4gY2FjaGUuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgIH0sXG5cbiAgICBjbGVhckNhY2hlIChrZXkpIHtcbiAgICAgIGlmIChrZXkgIT09IHZvaWQgMCkge1xuICAgICAgICBkZWxldGUgY2FjaGVbIGtleSBdXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FjaGUgPSB7fVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFsYWFsaS9qYWxhYWxpLWpzXG5cbi8qXG4gIEphbGFhbGkgeWVhcnMgc3RhcnRpbmcgdGhlIDMzLXllYXIgcnVsZS5cbiovXG5jb25zdCBicmVha3MgPSBbXG4gIC02MSwgOSwgMzgsIDE5OSwgNDI2LCA2ODYsIDc1NiwgODE4LCAxMTExLCAxMTgxLCAxMjEwLFxuICAxNjM1LCAyMDYwLCAyMDk3LCAyMTkyLCAyMjYyLCAyMzI0LCAyMzk0LCAyNDU2LCAzMTc4XG5dXG5cbi8qXG4gIENvbnZlcnRzIGEgR3JlZ29yaWFuIGRhdGUgdG8gSmFsYWFsaS5cbiovXG5leHBvcnQgZnVuY3Rpb24gdG9KYWxhYWxpIChneSwgZ20sIGdkKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZ3kpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICBnZCA9IGd5LmdldERhdGUoKVxuICAgIGdtID0gZ3kuZ2V0TW9udGgoKSArIDFcbiAgICBneSA9IGd5LmdldEZ1bGxZZWFyKClcbiAgfVxuICByZXR1cm4gZDJqKGcyZChneSwgZ20sIGdkKSlcbn1cblxuLypcbiAgQ29udmVydHMgYSBKYWxhYWxpIGRhdGUgdG8gR3JlZ29yaWFuLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbiAoanksIGptLCBqZCkge1xuICByZXR1cm4gZDJnKGoyZChqeSwgam0sIGpkKSlcbn1cblxuLypcbiAgSXMgdGhpcyBhIGxlYXAgeWVhciBvciBub3Q/XG4qL1xuZnVuY3Rpb24gaXNMZWFwSmFsYWFsaVllYXIgKGp5KSB7XG4gIHJldHVybiBqYWxDYWxMZWFwKGp5KSA9PT0gMFxufVxuXG4vKlxuICBOdW1iZXIgb2YgZGF5cyBpbiBhIGdpdmVuIG1vbnRoIGluIGEgSmFsYWFsaSB5ZWFyLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBqYWxhYWxpTW9udGhMZW5ndGggKGp5LCBqbSkge1xuICBpZiAoam0gPD0gNikgcmV0dXJuIDMxXG4gIGlmIChqbSA8PSAxMSkgcmV0dXJuIDMwXG4gIGlmIChpc0xlYXBKYWxhYWxpWWVhcihqeSkpIHJldHVybiAzMFxuICByZXR1cm4gMjlcbn1cblxuLypcbiAgICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgICBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpXG5cbiAgICBAcGFyYW0gankgSmFsYWFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcbiAgICBAcmV0dXJucyBudW1iZXIgb2YgeWVhcnMgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyICgwIHRvIDQpXG4gKi9cbmZ1bmN0aW9uIGphbENhbExlYXAgKGp5KSB7XG4gIGNvbnN0IGJsID0gYnJlYWtzLmxlbmd0aFxuICBsZXRcbiAgICBqcCA9IGJyZWFrc1sgMCBdLFxuICAgIGptLFxuICAgIGp1bXAsXG4gICAgbGVhcCxcbiAgICBuLFxuICAgIGlcblxuICBpZiAoankgPCBqcCB8fCBqeSA+PSBicmVha3NbIGJsIC0gMSBdKSB7IHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhYWxpIHllYXIgJyArIGp5KSB9XG5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgaWYgKGp1bXAgLSBuIDwgNikgeyBuID0gbiAtIGp1bXAgKyBkaXYoanVtcCArIDQsIDMzKSAqIDMzIH1cbiAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gIGlmIChsZWFwID09PSAtMSkge1xuICAgIGxlYXAgPSA0XG4gIH1cblxuICByZXR1cm4gbGVhcFxufVxuXG4vKlxuICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKSwgYW5kXG4gIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XG4gIGRheSBvZiB0aGUgSmFsYWFsaSB5ZWFyIChqeSkuXG5cbiAgQHBhcmFtIGp5IEphbGFhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gIEBwYXJhbSB3aXRob3V0TGVhcCB3aGVuIGRvbid0IG5lZWQgbGVhcCAodHJ1ZSBvciBmYWxzZSkgZGVmYXVsdCBpcyBmYWxzZVxuICBAcmV0dXJuXG4gICAgbGVhcDogbnVtYmVyIG9mIHllYXJzIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhciAoMCB0byA0KVxuICAgIGd5OiBHcmVnb3JpYW4geWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIEphbGFhbGkgeWVhclxuICAgIG1hcmNoOiB0aGUgTWFyY2ggZGF5IG9mIEZhcnZhcmRpbiB0aGUgMXN0ICgxc3QgZGF5IG9mIGp5KVxuICBAc2VlOiBodHRwOi8vd3d3LmFzdHJvLnVuaS50b3J1bi5wbC9+a2IvUGFwZXJzL0VNUC9QZXJzaWFuQy1FTVAuaHRtXG4gIEBzZWU6IGh0dHA6Ly93d3cuZm91cm1pbGFiLmNoL2RvY3VtZW50cy9jYWxlbmRhci9cbiovXG5mdW5jdGlvbiBqYWxDYWwgKGp5LCB3aXRob3V0TGVhcCkge1xuICBjb25zdFxuICAgIGJsID0gYnJlYWtzLmxlbmd0aCxcbiAgICBneSA9IGp5ICsgNjIxXG4gIGxldFxuICAgIGxlYXBKID0gLTE0LFxuICAgIGpwID0gYnJlYWtzWyAwIF0sXG4gICAgam0sXG4gICAganVtcCxcbiAgICBsZWFwLFxuICAgIG4sXG4gICAgaVxuXG4gIGlmIChqeSA8IGpwIHx8IGp5ID49IGJyZWFrc1sgYmwgLSAxIF0pIHsgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEphbGFhbGkgeWVhciAnICsgankpIH1cblxuICAvLyBGaW5kIHRoZSBsaW1pdGluZyB5ZWFycyBmb3IgdGhlIEphbGFhbGkgeWVhciBqeS5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAgbGVhcEogPSBsZWFwSiArIGRpdihqdW1wLCAzMykgKiA4ICsgZGl2KG1vZChqdW1wLCAzMyksIDQpXG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xuICAvLyBvZiB0aGUgY3VycmVudCBKYWxhYWxpIHllYXIgaW4gdGhlIFBlcnNpYW4gY2FsZW5kYXIuXG4gIGxlYXBKID0gbGVhcEogKyBkaXYobiwgMzMpICogOCArIGRpdihtb2QobiwgMzMpICsgMywgNClcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHsgbGVhcEogKz0gMSB9XG5cbiAgLy8gQW5kIHRoZSBzYW1lIGluIHRoZSBHcmVnb3JpYW4gY2FsZW5kYXIgKHVudGlsIHRoZSB5ZWFyIGd5KS5cbiAgY29uc3QgbGVhcEcgPSBkaXYoZ3ksIDQpIC0gZGl2KChkaXYoZ3ksIDEwMCkgKyAxKSAqIDMsIDQpIC0gMTUwXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cbiAgY29uc3QgbWFyY2ggPSAyMCArIGxlYXBKIC0gbGVhcEdcblxuICAvLyBGaW5kIGhvdyBtYW55IHllYXJzIGhhdmUgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhci5cbiAgaWYgKCF3aXRob3V0TGVhcCkge1xuICAgIGlmIChqdW1wIC0gbiA8IDYpIHsgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMyB9XG4gICAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gICAgaWYgKGxlYXAgPT09IC0xKSB7XG4gICAgICBsZWFwID0gNFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbGVhcCxcbiAgICBneSxcbiAgICBtYXJjaFxuICB9XG59XG5cbi8qXG4gIENvbnZlcnRzIGEgZGF0ZSBvZiB0aGUgSmFsYWFsaSBjYWxlbmRhciB0byB0aGUgSnVsaWFuIERheSBudW1iZXIuXG5cbiAgQHBhcmFtIGp5IEphbGFhbGkgeWVhciAoMSB0byAzMTAwKVxuICBAcGFyYW0gam0gSmFsYWFsaSBtb250aCAoMSB0byAxMilcbiAgQHBhcmFtIGpkIEphbGFhbGkgZGF5ICgxIHRvIDI5LzMxKVxuICBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXG4qL1xuZnVuY3Rpb24gajJkIChqeSwgam0sIGpkKSB7XG4gIGNvbnN0IHIgPSBqYWxDYWwoanksIHRydWUpXG4gIHJldHVybiBnMmQoci5neSwgMywgci5tYXJjaCkgKyAoam0gLSAxKSAqIDMxIC0gZGl2KGptLCA3KSAqIChqbSAtIDcpICsgamQgLSAxXG59XG5cbi8qXG4gIENvbnZlcnRzIHRoZSBKdWxpYW4gRGF5IG51bWJlciB0byBhIGRhdGUgaW4gdGhlIEphbGFhbGkgY2FsZW5kYXIuXG5cbiAgQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxuICBAcmV0dXJuXG4gICAgank6IEphbGFhbGkgeWVhciAoMSB0byAzMTAwKVxuICAgIGptOiBKYWxhYWxpIG1vbnRoICgxIHRvIDEyKVxuICAgIGpkOiBKYWxhYWxpIGRheSAoMSB0byAyOS8zMSlcbiovXG5mdW5jdGlvbiBkMmogKGpkbikge1xuICBjb25zdCBneSA9IGQyZyhqZG4pLmd5IC8vIENhbGN1bGF0ZSBHcmVnb3JpYW4geWVhciAoZ3kpLlxuICBsZXRcbiAgICBqeSA9IGd5IC0gNjIxLFxuICAgIGpkLFxuICAgIGptLFxuICAgIGtcbiAgY29uc3RcbiAgICByID0gamFsQ2FsKGp5LCBmYWxzZSksXG4gICAgamRuMWYgPSBnMmQoZ3ksIDMsIHIubWFyY2gpXG5cbiAgLy8gRmluZCBudW1iZXIgb2YgZGF5cyB0aGF0IHBhc3NlZCBzaW5jZSAxIEZhcnZhcmRpbi5cbiAgayA9IGpkbiAtIGpkbjFmXG4gIGlmIChrID49IDApIHtcbiAgICBpZiAoayA8PSAxODUpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCA2IG1vbnRocy5cbiAgICAgIGptID0gMSArIGRpdihrLCAzMSlcbiAgICAgIGpkID0gbW9kKGssIDMxKSArIDFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGp5LFxuICAgICAgICBqbSxcbiAgICAgICAgamRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBUaGUgcmVtYWluaW5nIG1vbnRocy5cbiAgICAgIGsgLT0gMTg2XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIFByZXZpb3VzIEphbGFhbGkgeWVhci5cbiAgICBqeSAtPSAxXG4gICAgayArPSAxNzlcbiAgICBpZiAoci5sZWFwID09PSAxKSB7IGsgKz0gMSB9XG4gIH1cbiAgam0gPSA3ICsgZGl2KGssIDMwKVxuICBqZCA9IG1vZChrLCAzMCkgKyAxXG4gIHJldHVybiB7XG4gICAganksXG4gICAgam0sXG4gICAgamRcbiAgfVxufVxuXG4vKlxuICBDYWxjdWxhdGVzIHRoZSBKdWxpYW4gRGF5IG51bWJlciBmcm9tIEdyZWdvcmlhbiBvciBKdWxpYW5cbiAgY2FsZW5kYXIgZGF0ZXMuIFRoaXMgaW50ZWdlciBudW1iZXIgY29ycmVzcG9uZHMgdG8gdGhlIG5vb24gb2ZcbiAgdGhlIGRhdGUgKGkuZS4gMTIgaG91cnMgb2YgVW5pdmVyc2FsIFRpbWUpLlxuICBUaGUgcHJvY2VkdXJlIHdhcyB0ZXN0ZWQgdG8gYmUgZ29vZCBzaW5jZSAxIE1hcmNoLCAtMTAwMTAwIChvZiBib3RoXG4gIGNhbGVuZGFycykgdXAgdG8gYSBmZXcgbWlsbGlvbiB5ZWFycyBpbnRvIHRoZSBmdXR1cmUuXG5cbiAgQHBhcmFtIGd5IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxuICBAcGFyYW0gZ20gQ2FsZW5kYXIgbW9udGggKDEgdG8gMTIpXG4gIEBwYXJhbSBnZCBDYWxlbmRhciBkYXkgb2YgdGhlIG1vbnRoICgxIHRvIDI4LzI5LzMwLzMxKVxuICBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXG4qL1xuZnVuY3Rpb24gZzJkIChneSwgZ20sIGdkKSB7XG4gIGxldCBkID0gZGl2KChneSArIGRpdihnbSAtIDgsIDYpICsgMTAwMTAwKSAqIDE0NjEsIDQpXG4gICAgICArIGRpdigxNTMgKiBtb2QoZ20gKyA5LCAxMikgKyAyLCA1KVxuICAgICAgKyBnZCAtIDM0ODQwNDA4XG4gIGQgPSBkIC0gZGl2KGRpdihneSArIDEwMDEwMCArIGRpdihnbSAtIDgsIDYpLCAxMDApICogMywgNCkgKyA3NTJcbiAgcmV0dXJuIGRcbn1cblxuLypcbiAgQ2FsY3VsYXRlcyBHcmVnb3JpYW4gYW5kIEp1bGlhbiBjYWxlbmRhciBkYXRlcyBmcm9tIHRoZSBKdWxpYW4gRGF5IG51bWJlclxuICAoamRuKSBmb3IgdGhlIHBlcmlvZCBzaW5jZSBqZG49LTM0ODM5NjU1IChpLmUuIHRoZSB5ZWFyIC0xMDAxMDAgb2YgYm90aFxuICBjYWxlbmRhcnMpIHRvIHNvbWUgbWlsbGlvbnMgeWVhcnMgYWhlYWQgb2YgdGhlIHByZXNlbnQuXG5cbiAgQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxuICBAcmV0dXJuXG4gICAgZ3k6IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxuICAgIGdtOiBDYWxlbmRhciBtb250aCAoMSB0byAxMilcbiAgICBnZDogQ2FsZW5kYXIgZGF5IG9mIHRoZSBtb250aCBNICgxIHRvIDI4LzI5LzMwLzMxKVxuKi9cbmZ1bmN0aW9uIGQyZyAoamRuKSB7XG4gIGxldCBqID0gNCAqIGpkbiArIDEzOTM2MTYzMVxuICBqID0gaiArIGRpdihkaXYoNCAqIGpkbiArIDE4MzE4NzcyMCwgMTQ2MDk3KSAqIDMsIDQpICogNCAtIDM5MDhcbiAgY29uc3RcbiAgICBpID0gZGl2KG1vZChqLCAxNDYxKSwgNCkgKiA1ICsgMzA4LFxuICAgIGdkID0gZGl2KG1vZChpLCAxNTMpLCA1KSArIDEsXG4gICAgZ20gPSBtb2QoZGl2KGksIDE1MyksIDEyKSArIDEsXG4gICAgZ3kgPSBkaXYoaiwgMTQ2MSkgLSAxMDAxMDAgKyBkaXYoOCAtIGdtLCA2KVxuICByZXR1cm4ge1xuICAgIGd5LFxuICAgIGdtLFxuICAgIGdkXG4gIH1cbn1cblxuLypcbiAgVXRpbGl0eSBoZWxwZXIgZnVuY3Rpb25zLlxuKi9cblxuZnVuY3Rpb24gZGl2IChhLCBiKSB7XG4gIHJldHVybiB+fihhIC8gYilcbn1cblxuZnVuY3Rpb24gbW9kIChhLCBiKSB7XG4gIHJldHVybiBhIC0gfn4oYSAvIGIpICogYlxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHRvSmFsYWFsaSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzJ1xuaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuXG5jb25zdCBjYWxlbmRhcnMgPSBbICdncmVnb3JpYW4nLCAncGVyc2lhbicgXVxuXG5leHBvcnQgY29uc3QgdXNlRGF0ZXRpbWVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG5cbiAgbWFzazoge1xuICAgIHR5cGU6IFN0cmluZ1xuICB9LFxuICBsb2NhbGU6IE9iamVjdCxcblxuICBjYWxlbmRhcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gY2FsZW5kYXJzLmluY2x1ZGVzKHYpLFxuICAgIGRlZmF1bHQ6ICdncmVnb3JpYW4nXG4gIH0sXG5cbiAgbGFuZHNjYXBlOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuXG4gIHNxdWFyZTogQm9vbGVhbixcbiAgZmxhdDogQm9vbGVhbixcbiAgYm9yZGVyZWQ6IEJvb2xlYW4sXG5cbiAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IHVzZURhdGV0aW1lRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5SGFzaCAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS55ZWFyICsgJy8nICsgcGFkKGRhdGUubW9udGgpICsgJy8nICsgcGFkKGRhdGUuZGF5KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsICRxKSB7XG4gIGNvbnN0IGVkaXRhYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gIH0pXG5cbiAgY29uc3QgdGFiaW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIGVkaXRhYmxlLnZhbHVlID09PSB0cnVlID8gMCA6IC0xXG4gIH0pXG5cbiAgY29uc3QgaGVhZGVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgY2xzID0gW11cbiAgICBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIGNscy5wdXNoKGBiZy0keyBwcm9wcy5jb2xvciB9YClcbiAgICBwcm9wcy50ZXh0Q29sb3IgIT09IHZvaWQgMCAmJiBjbHMucHVzaChgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWApXG4gICAgcmV0dXJuIGNscy5qb2luKCcgJylcbiAgfSlcblxuICBmdW5jdGlvbiBnZXRMb2NhbGUgKCkge1xuICAgIHJldHVybiBwcm9wcy5sb2NhbGUgIT09IHZvaWQgMFxuICAgICAgPyB7IC4uLiRxLmxhbmcuZGF0ZSwgLi4ucHJvcHMubG9jYWxlIH1cbiAgICAgIDogJHEubGFuZy5kYXRlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50RGF0ZSAoZGF0ZU9ubHkpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IHRpbWVGaWxsID0gZGF0ZU9ubHkgPT09IHRydWUgPyBudWxsIDogMFxuXG4gICAgaWYgKHByb3BzLmNhbGVuZGFyID09PSAncGVyc2lhbicpIHtcbiAgICAgIGNvbnN0IGpEYXRlID0gdG9KYWxhYWxpKGQpXG4gICAgICByZXR1cm4ge1xuICAgICAgICB5ZWFyOiBqRGF0ZS5qeSxcbiAgICAgICAgbW9udGg6IGpEYXRlLmptLFxuICAgICAgICBkYXk6IGpEYXRlLmpkXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IGQuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG1vbnRoOiBkLmdldE1vbnRoKCkgKyAxLFxuICAgICAgZGF5OiBkLmdldERhdGUoKSxcbiAgICAgIGhvdXI6IHRpbWVGaWxsLFxuICAgICAgbWludXRlOiB0aW1lRmlsbCxcbiAgICAgIHNlY29uZDogdGltZUZpbGwsXG4gICAgICBtaWxsaXNlY29uZDogdGltZUZpbGxcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVkaXRhYmxlLFxuICAgIHRhYmluZGV4LFxuICAgIGhlYWRlckNsYXNzLFxuXG4gICAgZ2V0TG9jYWxlLFxuICAgIGdldEN1cnJlbnREYXRlXG4gIH1cbn1cbiIsIi8qIGVzbGludCBuby1mYWxsdGhyb3VnaDogMCAqL1xuXG5pbXBvcnQgeyBpc0RhdGUgfSBmcm9tICcuL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi9mb3JtYXQuanMnXG5pbXBvcnQgeyBqYWxhYWxpTW9udGhMZW5ndGggfSBmcm9tICcuL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzJ1xuaW1wb3J0IGxhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi9sYW5nLmpzJ1xuXG5jb25zdFxuICBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMCxcbiAgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwLFxuICBkZWZhdWx0TWFzayA9ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onLFxuICB0b2tlbiA9IC9cXFsoKD86W15cXF1cXFxcXXxcXFxcXXxcXFxcKSopXFxdfGR7MSw0fXxNezEsNH18bXsxLDJ9fHd7MSwyfXxRb3xEb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF0vZyxcbiAgcmV2ZXJzZVRva2VuID0gLyhcXFtbXlxcXV0qXFxdKXxkezEsNH18TXsxLDR9fG17MSwyfXx3ezEsMn18UW98RG98RHsxLDR9fFlZKD86WVkpP3xIezEsMn18aHsxLDJ9fHN7MSwyfXxTezEsM318WnsxLDJ9fGF7MSwyfXxbQVFFeFhdfChbLiorOj9eLFxccyR7fSgpfFxcXFxdKykvZyxcbiAgcmVnZXhTdG9yZSA9IHt9XG5cbmZ1bmN0aW9uIGdldFJlZ2V4RGF0YSAobWFzaywgZGF0ZUxvY2FsZSkge1xuICBjb25zdFxuICAgIGRheXMgPSAnKCcgKyBkYXRlTG9jYWxlLmRheXMuam9pbignfCcpICsgJyknLFxuICAgIGtleSA9IG1hc2sgKyBkYXlzXG5cbiAgaWYgKHJlZ2V4U3RvcmVbIGtleSBdICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gcmVnZXhTdG9yZVsga2V5IF1cbiAgfVxuXG4gIGNvbnN0XG4gICAgZGF5c1Nob3J0ID0gJygnICsgZGF0ZUxvY2FsZS5kYXlzU2hvcnQuam9pbignfCcpICsgJyknLFxuICAgIG1vbnRocyA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzLmpvaW4oJ3wnKSArICcpJyxcbiAgICBtb250aHNTaG9ydCA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzU2hvcnQuam9pbignfCcpICsgJyknXG5cbiAgY29uc3QgbWFwID0ge31cbiAgbGV0IGluZGV4ID0gMFxuXG4gIGNvbnN0IHJlZ2V4VGV4dCA9IG1hc2sucmVwbGFjZShyZXZlcnNlVG9rZW4sIG1hdGNoID0+IHtcbiAgICBpbmRleCsrXG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgY2FzZSAnWVknOlxuICAgICAgICBtYXAuWVkgPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnWVlZWSc6XG4gICAgICAgIG1hcC5ZWVlZID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHsxLDR9KSdcbiAgICAgIGNhc2UgJ00nOlxuICAgICAgICBtYXAuTSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBtYXAuTSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gTVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICBtYXAuTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0XG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgbWFwLk1NTU0gPSBpbmRleFxuICAgICAgICByZXR1cm4gbW9udGhzXG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0RvJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleCsrIC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICdERCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXggLy8gYnVtcGluZyB0byBEXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICBtYXAuSCA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBtYXAuSCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gSFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleCAvLyBidW1waW5nIHRvIGhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdtbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXggLy8gYnVtcGluZyB0byBtXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gc1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgbWFwLlMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezN9KSdcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBtYXAuQSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKEFNfFBNKSdcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBtYXAuYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFtfHBtKSdcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgbWFwLmFhID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLiknXG5cbiAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIHJldHVybiBkYXlzU2hvcnRcbiAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1xuICAgICAgY2FzZSAnUSc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdRbyc6XG4gICAgICAgIHJldHVybiAnKDFzdHwybmR8M3JkfDR0aCknXG4gICAgICBjYXNlICdEREQnOlxuICAgICAgY2FzZSAnRERERCc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsM30pJ1xuICAgICAgY2FzZSAndyc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnd3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG5cbiAgICAgIGNhc2UgJ1onOiAvLyB0byBzcGxpdDogKD86KFopKCkoKXwoWystXSk/KFxcXFxkezJ9KTo/KFxcXFxkezJ9KSlcbiAgICAgICAgbWFwLlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfTpcXFxcZHsyfSknXG4gICAgICBjYXNlICdaWic6XG4gICAgICAgIG1hcC5aWiA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFp8WystXVxcXFxkezJ9XFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgbWFwLlggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkKyknXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgbWFwLnggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezQsfSknXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGluZGV4LS1cbiAgICAgICAgaWYgKG1hdGNoWyAwIF0gPT09ICdbJykge1xuICAgICAgICAgIG1hdGNoID0gbWF0Y2guc3Vic3RyaW5nKDEsIG1hdGNoLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgcmVzID0geyBtYXAsIHJlZ2V4OiBuZXcgUmVnRXhwKCdeJyArIHJlZ2V4VGV4dCkgfVxuICByZWdleFN0b3JlWyBrZXkgXSA9IHJlc1xuXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUxvY2FsZSAocGFyYW1EYXRlTG9jYWxlLCBsYW5nUHJvcHMpIHtcbiAgcmV0dXJuIHBhcmFtRGF0ZUxvY2FsZSAhPT0gdm9pZCAwXG4gICAgPyBwYXJhbURhdGVMb2NhbGVcbiAgICA6IChcbiAgICAgICAgbGFuZ1Byb3BzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGxhbmdQcm9wcy5kYXRlXG4gICAgICAgICAgOiBkZWZhdWx0TGFuZy5kYXRlXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlciA9ICcnKSB7XG4gIGNvbnN0XG4gICAgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKycsXG4gICAgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KSxcbiAgICBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLFxuICAgIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuXG4gIHJldHVybiBzaWduICsgcGFkKGhvdXJzKSArIGRlbGltZXRlciArIHBhZChtaW51dGVzKVxufVxuXG5mdW5jdGlvbiBhcHBseVllYXJNb250aERheUNoYW5nZSAoZGF0ZSwgbW9kLCBzaWduKSB7XG4gIGxldFxuICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgbW9udGggPSBkYXRlLmdldE1vbnRoKClcblxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIGlmIChtb2QueWVhciAhPT0gdm9pZCAwKSB7XG4gICAgeWVhciArPSBzaWduICogbW9kLnllYXJcbiAgICBkZWxldGUgbW9kLnllYXJcbiAgfVxuXG4gIGlmIChtb2QubW9udGggIT09IHZvaWQgMCkge1xuICAgIG1vbnRoICs9IHNpZ24gKiBtb2QubW9udGhcbiAgICBkZWxldGUgbW9kLm1vbnRoXG4gIH1cblxuICBkYXRlLnNldERhdGUoMSlcbiAgZGF0ZS5zZXRNb250aCgyKVxuXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgZGF0ZS5zZXRNb250aChtb250aClcbiAgZGF0ZS5zZXREYXRlKE1hdGgubWluKGRheSwgZGF5c0luTW9udGgoZGF0ZSkpKVxuXG4gIGlmIChtb2QuZGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc2lnbiAqIG1vZC5kYXRlKVxuICAgIGRlbGV0ZSBtb2QuZGF0ZVxuICB9XG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXkgKGRhdGUsIG1vZCwgbWlkZGxlKSB7XG4gIGNvbnN0XG4gICAgeWVhciA9IG1vZC55ZWFyICE9PSB2b2lkIDAgPyBtb2QueWVhciA6IGRhdGVbIGBnZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKCksXG4gICAgbW9udGggPSBtb2QubW9udGggIT09IHZvaWQgMCA/IG1vZC5tb250aCAtIDEgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1Nb250aGAgXSgpLFxuICAgIG1heERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApKS5nZXREYXRlKCksXG4gICAgZGF5ID0gTWF0aC5taW4obWF4RGF5LCBtb2QuZGF0ZSAhPT0gdm9pZCAwID8gbW9kLmRhdGUgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1EYXRlYCBdKCkpXG5cbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXSgxKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXSgyKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKHllYXIpXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfU1vbnRoYCBdKG1vbnRoKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1EYXRlYCBdKGRheSlcblxuICBkZWxldGUgbW9kLnllYXJcbiAgZGVsZXRlIG1vZC5tb250aFxuICBkZWxldGUgbW9kLmRhdGVcblxuICByZXR1cm4gZGF0ZVxufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2UgKGRhdGUsIHJhd01vZCwgc2lnbikge1xuICBjb25zdFxuICAgIG1vZCA9IG5vcm1hbGl6ZU1vZChyYXdNb2QpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5Q2hhbmdlKGQsIG1vZCwgc2lnbikgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBjYXBpdGFsaXplKGtleSlcbiAgICB0WyBgc2V0JHsgb3AgfWAgXSh0WyBgZ2V0JHsgb3AgfWAgXSgpICsgc2lnbiAqIG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb2QgKG1vZCkge1xuICBjb25zdCBhY2MgPSB7IC4uLm1vZCB9XG5cbiAgaWYgKG1vZC55ZWFycyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLnllYXIgPSBtb2QueWVhcnNcbiAgICBkZWxldGUgYWNjLnllYXJzXG4gIH1cblxuICBpZiAobW9kLm1vbnRocyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1vbnRoID0gbW9kLm1vbnRoc1xuICAgIGRlbGV0ZSBhY2MubW9udGhzXG4gIH1cblxuICBpZiAobW9kLmRheXMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheXNcbiAgICBkZWxldGUgYWNjLmRheXNcbiAgfVxuICBpZiAobW9kLmRheSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmRhdGUgPSBtb2QuZGF5XG4gICAgZGVsZXRlIGFjYy5kYXlcbiAgfVxuXG4gIGlmIChtb2QuaG91ciAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmhvdXJzID0gbW9kLmhvdXJcbiAgICBkZWxldGUgYWNjLmhvdXJcbiAgfVxuXG4gIGlmIChtb2QubWludXRlICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWludXRlcyA9IG1vZC5taW51dGVcbiAgICBkZWxldGUgYWNjLm1pbnV0ZVxuICB9XG5cbiAgaWYgKG1vZC5zZWNvbmQgIT09IHZvaWQgMCkge1xuICAgIGFjYy5zZWNvbmRzID0gbW9kLnNlY29uZFxuICAgIGRlbGV0ZSBhY2Muc2Vjb25kXG4gIH1cblxuICBpZiAobW9kLm1pbGxpc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWlsbGlzZWNvbmRzID0gbW9kLm1pbGxpc2Vjb25kXG4gICAgZGVsZXRlIGFjYy5taWxsaXNlY29uZFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0RGF0ZSAoZGF0ZSwgcmF3TW9kLCB1dGMpIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBtaWRkbGUgPSB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5KGQsIG1vZCwgbWlkZGxlKSAvLyByZW1vdmVzIHllYXIvbW9udGgvZGF5XG4gICAgICA6IGRcblxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2QpIHtcbiAgICBjb25zdCBvcCA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKVxuICAgIHRbIGBzZXQkeyBtaWRkbGUgfSR7IG9wIH1gIF0obW9kWyBrZXkgXSlcbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0IGQgPSBfX3NwbGl0RGF0ZShzdHIsIG1hc2ssIGRhdGVMb2NhbGUpXG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKFxuICAgIGQueWVhcixcbiAgICBkLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGQubW9udGggLSAxLFxuICAgIGQuZGF5ID09PSBudWxsID8gMSA6IGQuZGF5LFxuICAgIGQuaG91cixcbiAgICBkLm1pbnV0ZSxcbiAgICBkLnNlY29uZCxcbiAgICBkLm1pbGxpc2Vjb25kXG4gIClcblxuICBjb25zdCB0ek9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiBkLnRpbWV6b25lT2Zmc2V0ID09PSBudWxsIHx8IGQudGltZXpvbmVPZmZzZXQgPT09IHR6T2Zmc2V0XG4gICAgPyBkYXRlXG4gICAgOiBnZXRDaGFuZ2UoZGF0ZSwgeyBtaW51dGVzOiBkLnRpbWV6b25lT2Zmc2V0IC0gdHpPZmZzZXQgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3BsaXREYXRlIChzdHIsIG1hc2ssIGRhdGVMb2NhbGUsIGNhbGVuZGFyLCBkZWZhdWx0TW9kZWwpIHtcbiAgY29uc3QgZGF0ZSA9IHtcbiAgICB5ZWFyOiBudWxsLFxuICAgIG1vbnRoOiBudWxsLFxuICAgIGRheTogbnVsbCxcbiAgICBob3VyOiBudWxsLFxuICAgIG1pbnV0ZTogbnVsbCxcbiAgICBzZWNvbmQ6IG51bGwsXG4gICAgbWlsbGlzZWNvbmQ6IG51bGwsXG4gICAgdGltZXpvbmVPZmZzZXQ6IG51bGwsXG4gICAgZGF0ZUhhc2g6IG51bGwsXG4gICAgdGltZUhhc2g6IG51bGxcbiAgfVxuXG4gIGRlZmF1bHRNb2RlbCAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24oZGF0ZSwgZGVmYXVsdE1vZGVsKVxuXG4gIGlmIChcbiAgICBzdHIgPT09IHZvaWQgMFxuICAgIHx8IHN0ciA9PT0gbnVsbFxuICAgIHx8IHN0ciA9PT0gJydcbiAgICB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3RcbiAgICBsYW5nT3B0cyA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgbGFuZy5wcm9wcyksXG4gICAgbW9udGhzID0gbGFuZ09wdHMubW9udGhzLFxuICAgIG1vbnRoc1Nob3J0ID0gbGFuZ09wdHMubW9udGhzU2hvcnRcblxuICBjb25zdCB7IHJlZ2V4LCBtYXAgfSA9IGdldFJlZ2V4RGF0YShtYXNrLCBsYW5nT3B0cylcblxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWdleClcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgbGV0IHR6U3RyaW5nID0gJydcblxuICBpZiAobWFwLlggIT09IHZvaWQgMCB8fCBtYXAueCAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc3RhbXAgPSBwYXJzZUludChtYXRjaFsgbWFwLlggIT09IHZvaWQgMCA/IG1hcC5YIDogbWFwLnggXSwgMTApXG5cbiAgICBpZiAoaXNOYU4oc3RhbXApID09PSB0cnVlIHx8IHN0YW1wIDwgMCkge1xuICAgICAgcmV0dXJuIGRhdGVcbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RhbXAgKiAobWFwLlggIT09IHZvaWQgMCA/IDEwMDAgOiAxKSlcblxuICAgIGRhdGUueWVhciA9IGQuZ2V0RnVsbFllYXIoKVxuICAgIGRhdGUubW9udGggPSBkLmdldE1vbnRoKCkgKyAxXG4gICAgZGF0ZS5kYXkgPSBkLmdldERhdGUoKVxuICAgIGRhdGUuaG91ciA9IGQuZ2V0SG91cnMoKVxuICAgIGRhdGUubWludXRlID0gZC5nZXRNaW51dGVzKClcbiAgICBkYXRlLnNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG4gICAgZGF0ZS5taWxsaXNlY29uZCA9IGQuZ2V0TWlsbGlzZWNvbmRzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAobWFwLllZWVkgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS55ZWFyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5ZWVlZIF0sIDEwKVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuWVkgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVkgXSwgMTApXG4gICAgICBkYXRlLnllYXIgPSB5IDwgMCA/IHkgOiAyMDAwICsgeVxuICAgIH1cblxuICAgIGlmIChtYXAuTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5NIF0sIDEwKVxuICAgICAgaWYgKGRhdGUubW9udGggPCAxIHx8IGRhdGUubW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubW9udGggPSBtb250aHNTaG9ydC5pbmRleE9mKG1hdGNoWyBtYXAuTU1NIF0pICsgMVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzLmluZGV4T2YobWF0Y2hbIG1hcC5NTU1NIF0pICsgMVxuICAgIH1cblxuICAgIGlmIChtYXAuRCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmRheSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuRCBdLCAxMClcblxuICAgICAgaWYgKGRhdGUueWVhciA9PT0gbnVsbCB8fCBkYXRlLm1vbnRoID09PSBudWxsIHx8IGRhdGUuZGF5IDwgMSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXhEYXkgPSBjYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICA6IGphbGFhbGlNb250aExlbmd0aChkYXRlLnllYXIsIGRhdGUubW9udGgpXG5cbiAgICAgIGlmIChkYXRlLmRheSA+IG1heERheSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXAuSCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmhvdXIgPSBwYXJzZUludChtYXRjaFsgbWFwLkggXSwgMTApICUgMjRcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLmggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5oIF0sIDEwKSAlIDEyXG4gICAgICBpZiAoXG4gICAgICAgIChtYXAuQSAmJiBtYXRjaFsgbWFwLkEgXSA9PT0gJ1BNJylcbiAgICAgICAgfHwgKG1hcC5hICYmIG1hdGNoWyBtYXAuYSBdID09PSAncG0nKVxuICAgICAgICB8fCAobWFwLmFhICYmIG1hdGNoWyBtYXAuYWEgXSA9PT0gJ3AubS4nKVxuICAgICAgKSB7XG4gICAgICAgIGRhdGUuaG91ciArPSAxMlxuICAgICAgfVxuICAgICAgZGF0ZS5ob3VyID0gZGF0ZS5ob3VyICUgMjRcbiAgICB9XG5cbiAgICBpZiAobWFwLm0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taW51dGUgPSBwYXJzZUludChtYXRjaFsgbWFwLm0gXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLnMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5zZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLnMgXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLlMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuUyBdLCAxMCkgKiAxMCAqKiAoMyAtIG1hdGNoWyBtYXAuUyBdLmxlbmd0aClcbiAgICB9XG5cbiAgICBpZiAobWFwLlogIT09IHZvaWQgMCB8fCBtYXAuWlogIT09IHZvaWQgMCkge1xuICAgICAgdHpTdHJpbmcgPSAobWFwLlogIT09IHZvaWQgMCA/IG1hdGNoWyBtYXAuWiBdLnJlcGxhY2UoJzonLCAnJykgOiBtYXRjaFsgbWFwLlpaIF0pXG4gICAgICBkYXRlLnRpbWV6b25lT2Zmc2V0ID0gKHR6U3RyaW5nWyAwIF0gPT09ICcrJyA/IC0xIDogMSkgKiAoNjAgKiB0elN0cmluZy5zbGljZSgxLCAzKSArIDEgKiB0elN0cmluZy5zbGljZSgzLCA1KSlcbiAgICB9XG4gIH1cblxuICBkYXRlLmRhdGVIYXNoID0gcGFkKGRhdGUueWVhciwgNikgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG4gIGRhdGUudGltZUhhc2ggPSBwYWQoZGF0ZS5ob3VyKSArICc6JyArIHBhZChkYXRlLm1pbnV0ZSkgKyAnOicgKyBwYWQoZGF0ZS5zZWNvbmQpICsgdHpTdHJpbmdcblxuICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCAoZGF0ZSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInXG4gICAgPyB0cnVlXG4gICAgOiBpc05hTihEYXRlLnBhcnNlKGRhdGUpKSA9PT0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0ZSAobW9kLCB1dGMpIHtcbiAgcmV0dXJuIGFkanVzdERhdGUobmV3IERhdGUoKSwgbW9kLCB1dGMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWsgKGRhdGUpIHtcbiAgY29uc3QgZG93ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KClcbiAgcmV0dXJuIGRvdyA9PT0gMCA/IDcgOiBkb3dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtPZlllYXIgKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIGNvbnN0IHRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICB0aHVyc2RheS5zZXREYXRlKHRodXJzZGF5LmdldERhdGUoKSAtICgodGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgY29uc3QgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpXG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKVxuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgY29uc3QgZHMgPSB0aHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHRodXJzZGF5LnNldEhvdXJzKHRodXJzZGF5LmdldEhvdXJzKCkgLSBkcylcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIGNvbnN0IHdlZWtEaWZmID0gKHRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoTUlMTElTRUNPTkRTX0lOX0RBWSAqIDcpXG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZilcbn1cblxuZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyBkYXRlLmdldE1vbnRoKCkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXREYXRlSWRlbnRpZmllciAoZGF0ZSwgb25seURhdGUgLyogPSBmYWxzZSAqLykge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgcmV0dXJuIG9ubHlEYXRlID09PSB0cnVlID8gZ2V0RGF5SWRlbnRpZmllcihkKSA6IGQuZ2V0VGltZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW5EYXRlcyAoZGF0ZSwgZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICBjb25zdFxuICAgIGQxID0gZ2V0RGF0ZUlkZW50aWZpZXIoZnJvbSwgb3B0cy5vbmx5RGF0ZSksXG4gICAgZDIgPSBnZXREYXRlSWRlbnRpZmllcih0bywgb3B0cy5vbmx5RGF0ZSksXG4gICAgY3VyID0gZ2V0RGF0ZUlkZW50aWZpZXIoZGF0ZSwgb3B0cy5vbmx5RGF0ZSlcblxuICByZXR1cm4gKGN1ciA+IGQxIHx8IChvcHRzLmluY2x1c2l2ZUZyb20gPT09IHRydWUgJiYgY3VyID09PSBkMSkpXG4gICAgJiYgKGN1ciA8IGQyIHx8IChvcHRzLmluY2x1c2l2ZVRvID09PSB0cnVlICYmIGN1ciA9PT0gZDIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRlIChkYXRlLCBtb2QpIHtcbiAgcmV0dXJuIGdldENoYW5nZShkYXRlLCBtb2QsIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RGcm9tRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAtMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgwKVxuICAgIGNhc2UgJ21vbnRoJzpcbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9RGF0ZWAgXSgxKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgwKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oMClcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9U2Vjb25kc2AgXSgwKVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oMClcbiAgfVxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgxMSlcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oZGF5c0luTW9udGgodCkpXG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfUhvdXJzYCBdKDIzKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oNTkpXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oNTkpXG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbGxpc2Vjb25kc2AgXSg5OTkpXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heERhdGUgKGRhdGUgLyogLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1heCh0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkRhdGUgKGRhdGUgLyosIC4uLmFyZ3MgKi8pIHtcbiAgbGV0IHQgPSBuZXcgRGF0ZShkYXRlKVxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZCA9PiB7XG4gICAgdCA9IE1hdGgubWluKHQsIG5ldyBEYXRlKGQpKVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBnZXREaWZmICh0LCBzdWIsIGludGVydmFsKSB7XG4gIHJldHVybiAoXG4gICAgKHQuZ2V0VGltZSgpIC0gdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgICAtIChzdWIuZ2V0VGltZSgpIC0gc3ViLmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICApIC8gaW50ZXJ2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVEaWZmIChkYXRlLCBzdWJ0cmFjdCwgdW5pdCA9ICdkYXlzJykge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBzdWIgPSBuZXcgRGF0ZShzdWJ0cmFjdClcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKVxuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICBjYXNlICdtb250aCc6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKSAqIDEyICsgdC5nZXRNb250aCgpIC0gc3ViLmdldE1vbnRoKClcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnZGF5JyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2RheScpLCBNSUxMSVNFQ09ORFNfSU5fREFZKVxuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2hvdXInKSwgc3RhcnRPZkRhdGUoc3ViLCAnaG91cicpLCBNSUxMSVNFQ09ORFNfSU5fSE9VUilcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnbWludXRlJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ21pbnV0ZScpLCBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdzZWNvbmQnKSwgc3RhcnRPZkRhdGUoc3ViLCAnc2Vjb25kJyksIDEwMDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhciAoZGF0ZSkge1xuICByZXR1cm4gZ2V0RGF0ZURpZmYoZGF0ZSwgc3RhcnRPZkRhdGUoZGF0ZSwgJ3llYXInKSwgJ2RheXMnKSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZmVyRGF0ZUZvcm1hdCAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyAnZGF0ZSdcbiAgICA6ICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUJldHdlZW4gKGRhdGUsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZShkYXRlKVxuXG4gIGlmIChtaW4pIHtcbiAgICBjb25zdCBsb3cgPSBuZXcgRGF0ZShtaW4pXG4gICAgaWYgKHQgPCBsb3cpIHtcbiAgICAgIHJldHVybiBsb3dcbiAgICB9XG4gIH1cblxuICBpZiAobWF4KSB7XG4gICAgY29uc3QgaGlnaCA9IG5ldyBEYXRlKG1heClcbiAgICBpZiAodCA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBoaWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURhdGUgKGRhdGUsIGRhdGUyLCB1bml0KSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlMilcblxuICBpZiAodW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHQuZ2V0VGltZSgpID09PSBkLmdldFRpbWUoKVxuICB9XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIGlmICh0LmdldFNlY29uZHMoKSAhPT0gZC5nZXRTZWNvbmRzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnbWludXRlJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICBpZiAodC5nZXRNaW51dGVzKCkgIT09IGQuZ2V0TWludXRlcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2hvdXInOiAvLyBpbnRlbnRpb25hbCBmYWxsLXRocm91Z2hcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICBpZiAodC5nZXRIb3VycygpICE9PSBkLmdldEhvdXJzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnZGF5JzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICBpZiAodC5nZXREYXRlKCkgIT09IGQuZ2V0RGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21vbnRoJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIGlmICh0LmdldE1vbnRoKCkgIT09IGQuZ2V0TW9udGgoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICd5ZWFyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgaWYgKHQuZ2V0RnVsbFllYXIoKSAhPT0gZC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBkYXRlIGlzU2FtZURhdGUgdW5rbm93biB1bml0ICR7IHVuaXQgfWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luTW9udGggKGRhdGUpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApKS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0T3JkaW5hbCAobikge1xuICBpZiAobiA+PSAxMSAmJiBuIDw9IDEzKSB7XG4gICAgcmV0dXJuIGAkeyBuIH10aGBcbiAgfVxuICBzd2l0Y2ggKG4gJSAxMCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGAkeyBuIH1zdGBcbiAgICBjYXNlIDI6IHJldHVybiBgJHsgbiB9bmRgXG4gICAgY2FzZSAzOiByZXR1cm4gYCR7IG4gfXJkYFxuICB9XG4gIHJldHVybiBgJHsgbiB9dGhgXG59XG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgLy8gWWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gIFlZIChkYXRlLCBkYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIGNvbnN0IHkgPSB0aGlzLllZWVkoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikgJSAxMDBcbiAgICByZXR1cm4geSA+PSAwXG4gICAgICA/IHBhZCh5KVxuICAgICAgOiAnLScgKyBwYWQoTWF0aC5hYnMoeSkpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gIFlZWVkgKGRhdGUsIF9kYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIHJldHVybiBmb3JjZWRZZWFyICE9PSB2b2lkIDAgJiYgZm9yY2VkWWVhciAhPT0gbnVsbFxuICAgICAgPyBmb3JjZWRZZWFyXG4gICAgICA6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gIE0gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICB9LFxuXG4gIC8vIE1vbnRoOiAwMSwgMDIsIC4uLiwgMTJcbiAgTU0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIH0sXG5cbiAgLy8gTW9udGggU2hvcnQgTmFtZTogSmFuLCBGZWIsIC4uLlxuICBNTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNTaG9ydFsgZGF0ZS5nZXRNb250aCgpIF1cbiAgfSxcblxuICAvLyBNb250aCBOYW1lOiBKYW51YXJ5LCBGZWJydWFyeSwgLi4uXG4gIE1NTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gUXVhcnRlcjogMSwgMiwgMywgNFxuICBRIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDFzdCwgMm5kLCAzcmQsIDR0aFxuICBRbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKHRoaXMuUShkYXRlKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgRCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMXN0LCAybmQsIC4uLiwgMzFzdFxuICBEbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMDEsIDAyLCAuLi4sIDMxXG4gIEREIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMSwgMiwgLi4uLCAzNjZcbiAgREREIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldERheU9mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIERheSBvZiB5ZWFyOiAwMDEsIDAwMiwgLi4uLCAzNjZcbiAgRERERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZ2V0RGF5T2ZZZWFyKGRhdGUpLCAzKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwLCAxLCAuLi4sIDZcbiAgZCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1LCBNbywgLi4uXG4gIGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGRkZChkYXRlLCBkYXRlTG9jYWxlKS5zbGljZSgwLCAyKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW4sIE1vbiwgLi4uXG4gIGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNTaG9ydFsgZGF0ZS5nZXREYXkoKSBdXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1bmRheSwgTW9uZGF5LCAuLi5cbiAgZGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNbIGRhdGUuZ2V0RGF5KCkgXVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gIEUgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKSB8fCA3XG4gIH0sXG5cbiAgLy8gV2VlayBvZiBZZWFyOiAxIDIgLi4uIDUyIDUzXG4gIHcgKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0V2Vla09mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMDEgMDIgLi4uIDUyIDUzXG4gIHd3IChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICBIIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICBISCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRIb3VycygpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgaCAoZGF0ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgcmV0dXJuIGhvdXJzID09PSAwXG4gICAgICA/IDEyXG4gICAgICA6IChob3VycyA+IDEyID8gaG91cnMgJSAxMiA6IGhvdXJzKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICBoaCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQodGhpcy5oKGRhdGUpKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICBtIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwMCwgMDEsIC4uLiwgNTlcbiAgbW0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICBzIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwMCwgMDEsIC4uLiwgNTlcbiAgc3MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0U2Vjb25kcygpKVxuICB9LFxuXG4gIC8vIDEvMTAgb2Ygc2Vjb25kOiAwLCAxLCAuLi4sIDlcbiAgUyAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDApXG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwKSlcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gIFNTUyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMylcbiAgfSxcblxuICAvLyBNZXJpZGllbTogQU0sIFBNXG4gIEEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhbSwgcG1cbiAgYSAoZGF0ZSkge1xuICAgIHJldHVybiB0aGlzLkgoZGF0ZSkgPCAxMiA/ICdhbScgOiAncG0nXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IGEubS4sIHAubS5cbiAgYWEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnYS5tLicgOiAncC5tLidcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldCwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICBaWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldClcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gIFggKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gIHggKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAodmFsLCBtYXNrLCBkYXRlTG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgaWYgKFxuICAgICh2YWwgIT09IDAgJiYgIXZhbClcbiAgICB8fCB2YWwgPT09IEluZmluaXR5XG4gICAgfHwgdmFsID09PSAtSW5maW5pdHlcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsKVxuXG4gIGlmIChpc05hTihkYXRlKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3QgbG9jYWxlID0gZ2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlLCBsYW5nLnByb3BzKVxuXG4gIHJldHVybiBtYXNrLnJlcGxhY2UoXG4gICAgdG9rZW4sXG4gICAgKG1hdGNoLCB0ZXh0KSA9PiAoXG4gICAgICBtYXRjaCBpbiBmb3JtYXR0ZXJcbiAgICAgICAgPyBmb3JtYXR0ZXJbIG1hdGNoIF0oZGF0ZSwgbG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpXG4gICAgICAgIDogKHRleHQgPT09IHZvaWQgMCA/IG1hdGNoIDogdGV4dC5zcGxpdCgnXFxcXF0nKS5qb2luKCddJykpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSlcbiAgICA6IGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1ZhbGlkLFxuICBleHRyYWN0RGF0ZSxcbiAgYnVpbGREYXRlLFxuICBnZXREYXlPZldlZWssXG4gIGdldFdlZWtPZlllYXIsXG4gIGlzQmV0d2VlbkRhdGVzLFxuICBhZGRUb0RhdGUsXG4gIHN1YnRyYWN0RnJvbURhdGUsXG4gIGFkanVzdERhdGUsXG4gIHN0YXJ0T2ZEYXRlLFxuICBlbmRPZkRhdGUsXG4gIGdldE1heERhdGUsXG4gIGdldE1pbkRhdGUsXG4gIGdldERhdGVEaWZmLFxuICBnZXREYXlPZlllYXIsXG4gIGluZmVyRGF0ZUZvcm1hdCxcbiAgZ2V0RGF0ZUJldHdlZW4sXG4gIGlzU2FtZURhdGUsXG4gIGRheXNJbk1vbnRoLFxuICBmb3JtYXREYXRlLFxuICBjbG9uZVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIFRyYW5zaXRpb24sIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVJlbmRlckNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1BdHRycywgdXNlRm9ybUluamVjdCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRGF0ZXRpbWUsIHsgdXNlRGF0ZXRpbWVQcm9wcywgdXNlRGF0ZXRpbWVFbWl0cywgZ2V0RGF5SGFzaCB9IGZyb20gJy4vdXNlLWRhdGV0aW1lLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBmb3JtYXREYXRlLCBfX3NwbGl0RGF0ZSwgZ2V0RGF0ZURpZmYgfSBmcm9tICcuLi8uLi91dGlscy9kYXRlLmpzJ1xuaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgamFsYWFsaU1vbnRoTGVuZ3RoLCB0b0dyZWdvcmlhbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzJ1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9pcy5qcydcblxuY29uc3QgeWVhcnNJbnRlcnZhbCA9IDIwXG5jb25zdCB2aWV3cyA9IFsgJ0NhbGVuZGFyJywgJ1llYXJzJywgJ01vbnRocycgXVxuY29uc3Qgdmlld0lzVmFsaWQgPSB2ID0+IHZpZXdzLmluY2x1ZGVzKHYpXG5jb25zdCB5ZWFyTW9udGhWYWxpZGF0b3IgPSB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZCQvLnRlc3QodilcbmNvbnN0IGxpbmVTdHIgPSAnIFxcdTIwMTQgJ1xuXG5mdW5jdGlvbiBnZXRNb250aEhhc2ggKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUueWVhciArICcvJyArIHBhZChkYXRlLm1vbnRoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUURhdGUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGF0ZXRpbWVQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgcmFuZ2U6IEJvb2xlYW4sXG5cbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIHN1YnRpdGxlOiBTdHJpbmcsXG5cbiAgICBtYXNrOiB7XG4gICAgICAvLyB0aGlzIG1hc2sgaXMgZm9yY2VkXG4gICAgICAvLyB3aGVuIHVzaW5nIHBlcnNpYW4gY2FsZW5kYXJcbiAgICAgIGRlZmF1bHQ6ICdZWVlZL01NL0REJ1xuICAgIH0sXG5cbiAgICBkZWZhdWx0WWVhck1vbnRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHllYXJNb250aFZhbGlkYXRvclxuICAgIH0sXG5cbiAgICB5ZWFyc0luTW9udGhWaWV3OiBCb29sZWFuLFxuXG4gICAgZXZlbnRzOiBbIEFycmF5LCBGdW5jdGlvbiBdLFxuICAgIGV2ZW50Q29sb3I6IFsgU3RyaW5nLCBGdW5jdGlvbiBdLFxuXG4gICAgZW1pdEltbWVkaWF0ZWx5OiBCb29sZWFuLFxuXG4gICAgb3B0aW9uczogWyBBcnJheSwgRnVuY3Rpb24gXSxcblxuICAgIG5hdmlnYXRpb25NaW5ZZWFyTW9udGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogeWVhck1vbnRoVmFsaWRhdG9yXG4gICAgfSxcblxuICAgIG5hdmlnYXRpb25NYXhZZWFyTW9udGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogeWVhck1vbnRoVmFsaWRhdG9yXG4gICAgfSxcblxuICAgIG5vVW5zZXQ6IEJvb2xlYW4sXG5cbiAgICBmaXJzdERheU9mV2VlazogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIHRvZGF5QnRuOiBCb29sZWFuLFxuICAgIG1pbmltYWw6IEJvb2xlYW4sXG4gICAgZGVmYXVsdFZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdDYWxlbmRhcicsXG4gICAgICB2YWxpZGF0b3I6IHZpZXdJc1ZhbGlkXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRGF0ZXRpbWVFbWl0cyxcbiAgICAncmFuZ2VTdGFydCcsICdyYW5nZUVuZCcsICduYXZpZ2F0aW9uJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBnZXRDYWNoZSB9ID0gdXNlUmVuZGVyQ2FjaGUoKVxuICAgIGNvbnN0IHsgdGFiaW5kZXgsIGhlYWRlckNsYXNzLCBnZXRMb2NhbGUsIGdldEN1cnJlbnREYXRlIH0gPSB1c2VEYXRldGltZShwcm9wcywgJHEpXG5cbiAgICBsZXQgbGFzdEVtaXRWYWx1ZVxuXG4gICAgY29uc3QgZm9ybUF0dHJzID0gdXNlRm9ybUF0dHJzKHByb3BzKVxuICAgIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGlubmVyTWFzayA9IHJlZihnZXRNYXNrKCkpXG4gICAgY29uc3QgaW5uZXJMb2NhbGUgPSByZWYoZ2V0TG9jYWxlKCkpXG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWQoKCkgPT4gZ2V0TWFzaygpKVxuICAgIGNvbnN0IGxvY2FsZSA9IGNvbXB1dGVkKCgpID0+IGdldExvY2FsZSgpKVxuXG4gICAgY29uc3QgdG9kYXkgPSBjb21wdXRlZCgoKSA9PiBnZXRDdXJyZW50RGF0ZSgpKVxuXG4gICAgLy8gbW9kZWwgb2YgY3VycmVudCBjYWxlbmRhciB2aWV3OlxuICAgIGNvbnN0IHZpZXdNb2RlbCA9IHJlZihnZXRWaWV3TW9kZWwoaW5uZXJNYXNrLnZhbHVlLCBpbm5lckxvY2FsZS52YWx1ZSkpXG5cbiAgICBjb25zdCB2aWV3ID0gcmVmKHByb3BzLmRlZmF1bHRWaWV3KVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnXG4gICAgY29uc3QgbW9udGhEaXJlY3Rpb24gPSByZWYoZGlyZWN0aW9uLnZhbHVlKVxuICAgIGNvbnN0IHllYXJEaXJlY3Rpb24gPSByZWYoZGlyZWN0aW9uLnZhbHVlKVxuXG4gICAgY29uc3QgeWVhciA9IHZpZXdNb2RlbC52YWx1ZS55ZWFyXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVmKHllYXIgLSAoeWVhciAlIHllYXJzSW50ZXJ2YWwpIC0gKHllYXIgPCAwID8geWVhcnNJbnRlcnZhbCA6IDApKVxuICAgIGNvbnN0IGVkaXRSYW5nZSA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBwcm9wcy5sYW5kc2NhcGUgPT09IHRydWUgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCdcbiAgICAgIHJldHVybiBgcS1kYXRlIHEtZGF0ZS0tJHsgdHlwZSB9IHEtZGF0ZS0tJHsgdHlwZSB9LSR7IHByb3BzLm1pbmltYWwgPT09IHRydWUgPyAnbWluaW1hbCcgOiAnc3RhbmRhcmQnIH1gXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtZGF0ZS0tYm9yZGVyZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1zcXVhcmUgbm8tYm9yZGVyLXJhZGl1cycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1mbGF0IG5vLXNoYWRvdycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWRhdGUtLXJlYWRvbmx5JyA6ICcnKSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29tcHV0ZWRDb2xvciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5jb2xvciB8fCAncHJpbWFyeSdcbiAgICB9KVxuXG4gICAgY29uc3QgY29tcHV0ZWRUZXh0Q29sb3IgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMudGV4dENvbG9yIHx8ICd3aGl0ZSdcbiAgICB9KVxuXG4gICAgY29uc3QgaXNJbW1lZGlhdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZW1pdEltbWVkaWF0ZWx5ID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMucmFuZ2UgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBub3JtYWxpemVkTW9kZWwgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA6IChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IHZvaWQgMCA/IFsgcHJvcHMubW9kZWxWYWx1ZSBdIDogW10pXG4gICAgKSlcblxuICAgIGNvbnN0IGRheXNNb2RlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBub3JtYWxpemVkTW9kZWwudmFsdWVcbiAgICAgICAgLmZpbHRlcihkYXRlID0+IHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJylcbiAgICAgICAgLm1hcChkYXRlID0+IGRlY29kZVN0cmluZyhkYXRlLCBpbm5lck1hc2sudmFsdWUsIGlubmVyTG9jYWxlLnZhbHVlKSlcbiAgICAgICAgLmZpbHRlcihkYXRlID0+XG4gICAgICAgICAgZGF0ZS5kYXRlSGFzaCAhPT0gbnVsbFxuICAgICAgICAgICYmIGRhdGUuZGF5ICE9PSBudWxsXG4gICAgICAgICAgJiYgZGF0ZS5tb250aCAhPT0gbnVsbFxuICAgICAgICAgICYmIGRhdGUueWVhciAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgcmFuZ2VNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGZuID0gZGF0ZSA9PiBkZWNvZGVTdHJpbmcoZGF0ZSwgaW5uZXJNYXNrLnZhbHVlLCBpbm5lckxvY2FsZS52YWx1ZSlcbiAgICAgIHJldHVybiBub3JtYWxpemVkTW9kZWwudmFsdWVcbiAgICAgICAgLmZpbHRlcihkYXRlID0+IGlzT2JqZWN0KGRhdGUpID09PSB0cnVlICYmIGRhdGUuZnJvbSAhPT0gdm9pZCAwICYmIGRhdGUudG8gIT09IHZvaWQgMClcbiAgICAgICAgLm1hcChyYW5nZSA9PiAoeyBmcm9tOiBmbihyYW5nZS5mcm9tKSwgdG86IGZuKHJhbmdlLnRvKSB9KSlcbiAgICAgICAgLmZpbHRlcihyYW5nZSA9PiByYW5nZS5mcm9tLmRhdGVIYXNoICE9PSBudWxsICYmIHJhbmdlLnRvLmRhdGVIYXNoICE9PSBudWxsICYmIHJhbmdlLmZyb20uZGF0ZUhhc2ggPCByYW5nZS50by5kYXRlSGFzaClcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0TmF0aXZlRGF0ZUZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY2FsZW5kYXIgIT09ICdwZXJzaWFuJ1xuICAgICAgICA/IG1vZGVsID0+IG5ldyBEYXRlKG1vZGVsLnllYXIsIG1vZGVsLm1vbnRoIC0gMSwgbW9kZWwuZGF5KVxuICAgICAgICA6IG1vZGVsID0+IHtcbiAgICAgICAgICBjb25zdCBnRGF0ZSA9IHRvR3JlZ29yaWFuKG1vZGVsLnllYXIsIG1vZGVsLm1vbnRoLCBtb2RlbC5kYXkpXG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGdEYXRlLmd5LCBnRGF0ZS5nbSAtIDEsIGdEYXRlLmdkKVxuICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IGVuY29kZU9iamVjdEZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY2FsZW5kYXIgPT09ICdwZXJzaWFuJ1xuICAgICAgICA/IGdldERheUhhc2hcbiAgICAgICAgOiAoZGF0ZSwgbWFzaywgbG9jYWxlKSA9PiBmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoXG4gICAgICAgICAgICAgIGRhdGUueWVhcixcbiAgICAgICAgICAgICAgZGF0ZS5tb250aCAtIDEsXG4gICAgICAgICAgICAgIGRhdGUuZGF5LFxuICAgICAgICAgICAgICBkYXRlLmhvdXIsXG4gICAgICAgICAgICAgIGRhdGUubWludXRlLFxuICAgICAgICAgICAgICBkYXRlLnNlY29uZCxcbiAgICAgICAgICAgICAgZGF0ZS5taWxsaXNlY29uZFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hc2sgPT09IHZvaWQgMCA/IGlubmVyTWFzay52YWx1ZSA6IG1hc2ssXG4gICAgICAgICAgICBsb2NhbGUgPT09IHZvaWQgMCA/IGlubmVyTG9jYWxlLnZhbHVlIDogbG9jYWxlLFxuICAgICAgICAgICAgZGF0ZS55ZWFyLFxuICAgICAgICAgICAgZGF0ZS50aW1lem9uZU9mZnNldFxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgZGF5c0luTW9kZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgZGF5c01vZGVsLnZhbHVlLmxlbmd0aCArIHJhbmdlTW9kZWwudmFsdWUucmVkdWNlKFxuICAgICAgICAoYWNjLCByYW5nZSkgPT4gYWNjICsgMSArIGdldERhdGVEaWZmKFxuICAgICAgICAgIGdldE5hdGl2ZURhdGVGbi52YWx1ZShyYW5nZS50byksXG4gICAgICAgICAgZ2V0TmF0aXZlRGF0ZUZuLnZhbHVlKHJhbmdlLmZyb20pXG4gICAgICAgICksXG4gICAgICAgIDBcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJUaXRsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50aXRsZSAhPT0gdm9pZCAwICYmIHByb3BzLnRpdGxlICE9PSBudWxsICYmIHByb3BzLnRpdGxlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gcHJvcHMudGl0bGVcbiAgICAgIH1cblxuICAgICAgaWYgKGVkaXRSYW5nZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IGVkaXRSYW5nZS52YWx1ZS5pbml0XG4gICAgICAgIGNvbnN0IGRhdGUgPSBnZXROYXRpdmVEYXRlRm4udmFsdWUobW9kZWwpXG5cbiAgICAgICAgcmV0dXJuIGlubmVyTG9jYWxlLnZhbHVlLmRheXNTaG9ydFsgZGF0ZS5nZXREYXkoKSBdICsgJywgJ1xuICAgICAgICAgICsgaW5uZXJMb2NhbGUudmFsdWUubW9udGhzU2hvcnRbIG1vZGVsLm1vbnRoIC0gMSBdICsgJyAnXG4gICAgICAgICAgKyBtb2RlbC5kYXkgKyBsaW5lU3RyICsgJz8nXG4gICAgICB9XG5cbiAgICAgIGlmIChkYXlzSW5Nb2RlbC52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbGluZVN0clxuICAgICAgfVxuXG4gICAgICBpZiAoZGF5c0luTW9kZWwudmFsdWUgPiAxKSB7XG4gICAgICAgIHJldHVybiBgJHsgZGF5c0luTW9kZWwudmFsdWUgfSAkeyBpbm5lckxvY2FsZS52YWx1ZS5wbHVyYWxEYXkgfWBcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9kZWwgPSBkYXlzTW9kZWwudmFsdWVbIDAgXVxuICAgICAgY29uc3QgZGF0ZSA9IGdldE5hdGl2ZURhdGVGbi52YWx1ZShtb2RlbClcblxuICAgICAgaWYgKGlzTmFOKGRhdGUudmFsdWVPZigpKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gbGluZVN0clxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJMb2NhbGUudmFsdWUuaGVhZGVyVGl0bGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJMb2NhbGUudmFsdWUuaGVhZGVyVGl0bGUoZGF0ZSwgbW9kZWwpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbm5lckxvY2FsZS52YWx1ZS5kYXlzU2hvcnRbIGRhdGUuZ2V0RGF5KCkgXSArICcsICdcbiAgICAgICAgKyBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNTaG9ydFsgbW9kZWwubW9udGggLSAxIF0gKyAnICdcbiAgICAgICAgKyBtb2RlbC5kYXlcbiAgICB9KVxuXG4gICAgY29uc3QgbWluU2VsZWN0ZWRNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gZGF5c01vZGVsLnZhbHVlLmNvbmNhdChyYW5nZU1vZGVsLnZhbHVlLm1hcChyYW5nZSA9PiByYW5nZS5mcm9tKSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEueWVhciAtIGIueWVhciB8fCBhLm1vbnRoIC0gYi5tb250aClcblxuICAgICAgcmV0dXJuIG1vZGVsWyAwIF1cbiAgICB9KVxuXG4gICAgY29uc3QgbWF4U2VsZWN0ZWRNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gZGF5c01vZGVsLnZhbHVlLmNvbmNhdChyYW5nZU1vZGVsLnZhbHVlLm1hcChyYW5nZSA9PiByYW5nZS50bykpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLnllYXIgLSBhLnllYXIgfHwgYi5tb250aCAtIGEubW9udGgpXG5cbiAgICAgIHJldHVybiBtb2RlbFsgMCBdXG4gICAgfSlcblxuICAgIGNvbnN0IGhlYWRlclN1YnRpdGxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnN1YnRpdGxlICE9PSB2b2lkIDAgJiYgcHJvcHMuc3VidGl0bGUgIT09IG51bGwgJiYgcHJvcHMuc3VidGl0bGUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5zdWJ0aXRsZVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF5c0luTW9kZWwudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGxpbmVTdHJcbiAgICAgIH1cblxuICAgICAgaWYgKGRheXNJbk1vZGVsLnZhbHVlID4gMSkge1xuICAgICAgICBjb25zdCBmcm9tID0gbWluU2VsZWN0ZWRNb2RlbC52YWx1ZVxuICAgICAgICBjb25zdCB0byA9IG1heFNlbGVjdGVkTW9kZWwudmFsdWVcbiAgICAgICAgY29uc3QgbW9udGggPSBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNTaG9ydFxuXG4gICAgICAgIHJldHVybiBtb250aFsgZnJvbS5tb250aCAtIDEgXSArIChcbiAgICAgICAgICBmcm9tLnllYXIgIT09IHRvLnllYXJcbiAgICAgICAgICAgID8gJyAnICsgZnJvbS55ZWFyICsgbGluZVN0ciArIG1vbnRoWyB0by5tb250aCAtIDEgXSArICcgJ1xuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgZnJvbS5tb250aCAhPT0gdG8ubW9udGhcbiAgICAgICAgICAgICAgICAgID8gbGluZVN0ciArIG1vbnRoWyB0by5tb250aCAtIDEgXVxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICkgKyAnICcgKyB0by55ZWFyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXlzTW9kZWwudmFsdWVbIDAgXS55ZWFyXG4gICAgfSlcblxuICAgIGNvbnN0IGRhdGVBcnJvdyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IFsgJHEuaWNvblNldC5kYXRldGltZS5hcnJvd0xlZnQsICRxLmljb25TZXQuZGF0ZXRpbWUuYXJyb3dSaWdodCBdXG4gICAgICByZXR1cm4gJHEubGFuZy5ydGwgPT09IHRydWUgPyB2YWwucmV2ZXJzZSgpIDogdmFsXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbXB1dGVkRmlyc3REYXlPZldlZWsgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5maXJzdERheU9mV2VlayAhPT0gdm9pZCAwXG4gICAgICAgID8gTnVtYmVyKHByb3BzLmZpcnN0RGF5T2ZXZWVrKVxuICAgICAgICA6IGlubmVyTG9jYWxlLnZhbHVlLmZpcnN0RGF5T2ZXZWVrXG4gICAgKSlcblxuICAgIGNvbnN0IGRheXNPZldlZWsgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBkYXlzID0gaW5uZXJMb2NhbGUudmFsdWUuZGF5c1Nob3J0LFxuICAgICAgICBmaXJzdCA9IGNvbXB1dGVkRmlyc3REYXlPZldlZWsudmFsdWVcblxuICAgICAgcmV0dXJuIGZpcnN0ID4gMFxuICAgICAgICA/IGRheXMuc2xpY2UoZmlyc3QsIDcpLmNvbmNhdChkYXlzLnNsaWNlKDAsIGZpcnN0KSlcbiAgICAgICAgOiBkYXlzXG4gICAgfSlcblxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IHZpZXdNb2RlbC52YWx1ZVxuICAgICAgcmV0dXJuIHByb3BzLmNhbGVuZGFyICE9PSAncGVyc2lhbidcbiAgICAgICAgPyAobmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCAwKSkuZ2V0RGF0ZSgpXG4gICAgICAgIDogamFsYWFsaU1vbnRoTGVuZ3RoKGRhdGUueWVhciwgZGF0ZS5tb250aClcbiAgICB9KVxuXG4gICAgY29uc3QgZXZ0Q29sb3IgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlb2YgcHJvcHMuZXZlbnRDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHByb3BzLmV2ZW50Q29sb3JcbiAgICAgICAgOiAoKSA9PiBwcm9wcy5ldmVudENvbG9yXG4gICAgKSlcblxuICAgIGNvbnN0IG1pbk5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYXZpZ2F0aW9uTWluWWVhck1vbnRoID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHByb3BzLm5hdmlnYXRpb25NaW5ZZWFyTW9udGguc3BsaXQoJy8nKVxuICAgICAgcmV0dXJuIHsgeWVhcjogcGFyc2VJbnQoZGF0YVsgMCBdLCAxMCksIG1vbnRoOiBwYXJzZUludChkYXRhWyAxIF0sIDEwKSB9XG4gICAgfSlcblxuICAgIGNvbnN0IG1heE5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYXZpZ2F0aW9uTWF4WWVhck1vbnRoID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHByb3BzLm5hdmlnYXRpb25NYXhZZWFyTW9udGguc3BsaXQoJy8nKVxuICAgICAgcmV0dXJuIHsgeWVhcjogcGFyc2VJbnQoZGF0YVsgMCBdLCAxMCksIG1vbnRoOiBwYXJzZUludChkYXRhWyAxIF0sIDEwKSB9XG4gICAgfSlcblxuICAgIGNvbnN0IG5hdkJvdW5kYXJpZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBtb250aDogeyBwcmV2OiB0cnVlLCBuZXh0OiB0cnVlIH0sXG4gICAgICAgIHllYXI6IHsgcHJldjogdHJ1ZSwgbmV4dDogdHJ1ZSB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtaW5OYXYudmFsdWUgIT09IG51bGwgJiYgbWluTmF2LnZhbHVlLnllYXIgPj0gdmlld01vZGVsLnZhbHVlLnllYXIpIHtcbiAgICAgICAgZGF0YS55ZWFyLnByZXYgPSBmYWxzZVxuICAgICAgICBpZiAobWluTmF2LnZhbHVlLnllYXIgPT09IHZpZXdNb2RlbC52YWx1ZS55ZWFyICYmIG1pbk5hdi52YWx1ZS5tb250aCA+PSB2aWV3TW9kZWwudmFsdWUubW9udGgpIHtcbiAgICAgICAgICBkYXRhLm1vbnRoLnByZXYgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhOYXYudmFsdWUgIT09IG51bGwgJiYgbWF4TmF2LnZhbHVlLnllYXIgPD0gdmlld01vZGVsLnZhbHVlLnllYXIpIHtcbiAgICAgICAgZGF0YS55ZWFyLm5leHQgPSBmYWxzZVxuICAgICAgICBpZiAobWF4TmF2LnZhbHVlLnllYXIgPT09IHZpZXdNb2RlbC52YWx1ZS55ZWFyICYmIG1heE5hdi52YWx1ZS5tb250aCA8PSB2aWV3TW9kZWwudmFsdWUubW9udGgpIHtcbiAgICAgICAgICBkYXRhLm1vbnRoLm5leHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSlcblxuICAgIGNvbnN0IGRheXNNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBtYXAgPSB7fVxuXG4gICAgICBkYXlzTW9kZWwudmFsdWUuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBnZXRNb250aEhhc2goZW50cnkpXG5cbiAgICAgICAgaWYgKG1hcFsgaGFzaCBdID09PSB2b2lkIDApIHtcbiAgICAgICAgICBtYXBbIGhhc2ggXSA9IFtdXG4gICAgICAgIH1cblxuICAgICAgICBtYXBbIGhhc2ggXS5wdXNoKGVudHJ5LmRheSlcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBtYXBcbiAgICB9KVxuXG4gICAgY29uc3QgcmFuZ2VNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBtYXAgPSB7fVxuXG4gICAgICByYW5nZU1vZGVsLnZhbHVlLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBjb25zdCBoYXNoRnJvbSA9IGdldE1vbnRoSGFzaChlbnRyeS5mcm9tKVxuICAgICAgICBjb25zdCBoYXNoVG8gPSBnZXRNb250aEhhc2goZW50cnkudG8pXG5cbiAgICAgICAgaWYgKG1hcFsgaGFzaEZyb20gXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgbWFwWyBoYXNoRnJvbSBdID0gW11cbiAgICAgICAgfVxuXG4gICAgICAgIG1hcFsgaGFzaEZyb20gXS5wdXNoKHtcbiAgICAgICAgICBmcm9tOiBlbnRyeS5mcm9tLmRheSxcbiAgICAgICAgICB0bzogaGFzaEZyb20gPT09IGhhc2hUbyA/IGVudHJ5LnRvLmRheSA6IHZvaWQgMCxcbiAgICAgICAgICByYW5nZTogZW50cnlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaGFzaEZyb20gPCBoYXNoVG8pIHtcbiAgICAgICAgICBsZXQgaGFzaFxuICAgICAgICAgIGNvbnN0IHsgeWVhciwgbW9udGggfSA9IGVudHJ5LmZyb21cbiAgICAgICAgICBjb25zdCBjdXIgPSBtb250aCA8IDEyXG4gICAgICAgICAgICA/IHsgeWVhciwgbW9udGg6IG1vbnRoICsgMSB9XG4gICAgICAgICAgICA6IHsgeWVhcjogeWVhciArIDEsIG1vbnRoOiAxIH1cblxuICAgICAgICAgIHdoaWxlICgoaGFzaCA9IGdldE1vbnRoSGFzaChjdXIpKSA8PSBoYXNoVG8pIHtcbiAgICAgICAgICAgIGlmIChtYXBbIGhhc2ggXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIG1hcFsgaGFzaCBdID0gW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWFwWyBoYXNoIF0ucHVzaCh7XG4gICAgICAgICAgICAgIGZyb206IHZvaWQgMCxcbiAgICAgICAgICAgICAgdG86IGhhc2ggPT09IGhhc2hUbyA/IGVudHJ5LnRvLmRheSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgcmFuZ2U6IGVudHJ5XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjdXIubW9udGgrK1xuICAgICAgICAgICAgaWYgKGN1ci5tb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgIGN1ci55ZWFyKytcbiAgICAgICAgICAgICAgY3VyLm1vbnRoID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG1hcFxuICAgIH0pXG5cbiAgICBjb25zdCByYW5nZVZpZXcgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAoZWRpdFJhbmdlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGluaXQsIGluaXRIYXNoLCBmaW5hbCwgZmluYWxIYXNoIH0gPSBlZGl0UmFuZ2UudmFsdWVcblxuICAgICAgY29uc3QgWyBmcm9tLCB0byBdID0gaW5pdEhhc2ggPD0gZmluYWxIYXNoXG4gICAgICAgID8gWyBpbml0LCBmaW5hbCBdXG4gICAgICAgIDogWyBmaW5hbCwgaW5pdCBdXG5cbiAgICAgIGNvbnN0IGZyb21IYXNoID0gZ2V0TW9udGhIYXNoKGZyb20pXG4gICAgICBjb25zdCB0b0hhc2ggPSBnZXRNb250aEhhc2godG8pXG5cbiAgICAgIGlmIChmcm9tSGFzaCAhPT0gdmlld01vbnRoSGFzaC52YWx1ZSAmJiB0b0hhc2ggIT09IHZpZXdNb250aEhhc2gudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZpZXcgPSB7fVxuXG4gICAgICBpZiAoZnJvbUhhc2ggPT09IHZpZXdNb250aEhhc2gudmFsdWUpIHtcbiAgICAgICAgdmlldy5mcm9tID0gZnJvbS5kYXlcbiAgICAgICAgdmlldy5pbmNsdWRlRnJvbSA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2aWV3LmZyb20gPSAxXG4gICAgICB9XG5cbiAgICAgIGlmICh0b0hhc2ggPT09IHZpZXdNb250aEhhc2gudmFsdWUpIHtcbiAgICAgICAgdmlldy50byA9IHRvLmRheVxuICAgICAgICB2aWV3LmluY2x1ZGVUbyA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2aWV3LnRvID0gZGF5c0luTW9udGgudmFsdWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZpZXdcbiAgICB9KVxuXG4gICAgY29uc3Qgdmlld01vbnRoSGFzaCA9IGNvbXB1dGVkKCgpID0+IGdldE1vbnRoSGFzaCh2aWV3TW9kZWwudmFsdWUpKVxuXG4gICAgY29uc3Qgc2VsZWN0aW9uRGF5c01hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1hcCA9IHt9XG5cbiAgICAgIGlmIChwcm9wcy5vcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGF5c0luTW9udGgudmFsdWU7IGkrKykge1xuICAgICAgICAgIG1hcFsgaSBdID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbiA9IHR5cGVvZiBwcm9wcy5vcHRpb25zID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcHJvcHMub3B0aW9uc1xuICAgICAgICA6IGRhdGUgPT4gcHJvcHMub3B0aW9ucy5pbmNsdWRlcyhkYXRlKVxuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXlzSW5Nb250aC52YWx1ZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRheUhhc2ggPSB2aWV3TW9udGhIYXNoLnZhbHVlICsgJy8nICsgcGFkKGkpXG4gICAgICAgIG1hcFsgaSBdID0gZm4oZGF5SGFzaClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcFxuICAgIH0pXG5cbiAgICBjb25zdCBldmVudERheXNNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBtYXAgPSB7fVxuXG4gICAgICBpZiAocHJvcHMuZXZlbnRzID09PSB2b2lkIDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGF5c0luTW9udGgudmFsdWU7IGkrKykge1xuICAgICAgICAgIG1hcFsgaSBdID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGZuID0gdHlwZW9mIHByb3BzLmV2ZW50cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gcHJvcHMuZXZlbnRzXG4gICAgICAgICAgOiBkYXRlID0+IHByb3BzLmV2ZW50cy5pbmNsdWRlcyhkYXRlKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGRheXNJbk1vbnRoLnZhbHVlOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkYXlIYXNoID0gdmlld01vbnRoSGFzaC52YWx1ZSArICcvJyArIHBhZChpKVxuICAgICAgICAgIG1hcFsgaSBdID0gZm4oZGF5SGFzaCkgPT09IHRydWUgJiYgZXZ0Q29sb3IudmFsdWUoZGF5SGFzaClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFwXG4gICAgfSlcblxuICAgIGNvbnN0IHZpZXdEYXlzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGRhdGUsIGVuZERheVxuICAgICAgY29uc3QgeyB5ZWFyLCBtb250aCB9ID0gdmlld01vZGVsLnZhbHVlXG5cbiAgICAgIGlmIChwcm9wcy5jYWxlbmRhciAhPT0gJ3BlcnNpYW4nKSB7XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDEpXG4gICAgICAgIGVuZERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDApKS5nZXREYXRlKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBnRGF0ZSA9IHRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCAxKVxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZ0RhdGUuZ3ksIGdEYXRlLmdtIC0gMSwgZ0RhdGUuZ2QpXG4gICAgICAgIGxldCBwcmV2Sk0gPSBtb250aCAtIDFcbiAgICAgICAgbGV0IHByZXZKWSA9IHllYXJcbiAgICAgICAgaWYgKHByZXZKTSA9PT0gMCkge1xuICAgICAgICAgIHByZXZKTSA9IDEyXG4gICAgICAgICAgcHJldkpZLS1cbiAgICAgICAgfVxuICAgICAgICBlbmREYXkgPSBqYWxhYWxpTW9udGhMZW5ndGgocHJldkpZLCBwcmV2Sk0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRheXM6IGRhdGUuZ2V0RGF5KCkgLSBjb21wdXRlZEZpcnN0RGF5T2ZXZWVrLnZhbHVlIC0gMSxcbiAgICAgICAgZW5kRGF5XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGRheXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgY29uc3QgeyBkYXlzLCBlbmREYXkgfSA9IHZpZXdEYXlzLnZhbHVlXG5cbiAgICAgIGNvbnN0IGxlbiA9IGRheXMgPCAwID8gZGF5cyArIDcgOiBkYXlzXG4gICAgICBpZiAobGVuIDwgNikge1xuICAgICAgICBmb3IgKGxldCBpID0gZW5kRGF5IC0gbGVuOyBpIDw9IGVuZERheTsgaSsrKSB7XG4gICAgICAgICAgcmVzLnB1c2goeyBpLCBmaWxsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSByZXMubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGRheXNJbk1vbnRoLnZhbHVlOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF5ID0geyBpLCBldmVudDogZXZlbnREYXlzTWFwLnZhbHVlWyBpIF0sIGNsYXNzZXM6IFtdIH1cblxuICAgICAgICBpZiAoc2VsZWN0aW9uRGF5c01hcC52YWx1ZVsgaSBdID09PSB0cnVlKSB7XG4gICAgICAgICAgZGF5LmluID0gdHJ1ZVxuICAgICAgICAgIGRheS5mbGF0ID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzLnB1c2goZGF5KVxuICAgICAgfVxuXG4gICAgICAvLyBpZiBjdXJyZW50IHZpZXcgaGFzIGRheXMgaW4gbW9kZWxcbiAgICAgIGlmIChkYXlzTWFwLnZhbHVlWyB2aWV3TW9udGhIYXNoLnZhbHVlIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBkYXlzTWFwLnZhbHVlWyB2aWV3TW9udGhIYXNoLnZhbHVlIF0uZm9yRWFjaChkYXkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSBpbmRleCArIGRheSAtIDFcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc1sgaSBdLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgIHVuZWxldmF0ZWQ6IHRydWUsXG4gICAgICAgICAgICBmbGF0OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb21wdXRlZENvbG9yLnZhbHVlLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBjb21wdXRlZFRleHRDb2xvci52YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGN1cnJlbnQgdmlldyBoYXMgcmFuZ2VzIGluIG1vZGVsXG4gICAgICBpZiAocmFuZ2VNYXAudmFsdWVbIHZpZXdNb250aEhhc2gudmFsdWUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJhbmdlTWFwLnZhbHVlWyB2aWV3TW9udGhIYXNoLnZhbHVlIF0uZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmZyb20gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGluZGV4ICsgZW50cnkuZnJvbSAtIDFcbiAgICAgICAgICAgIGNvbnN0IHRvID0gaW5kZXggKyAoZW50cnkudG8gfHwgZGF5c0luTW9udGgudmFsdWUpIC0gMVxuXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgPSBmcm9tOyBkYXkgPD0gdG87IGRheSsrKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzWyBkYXkgXSwge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBlbnRyeS5yYW5nZSxcbiAgICAgICAgICAgICAgICB1bmVsZXZhdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb21wdXRlZENvbG9yLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogY29tcHV0ZWRUZXh0Q29sb3IudmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXNbIGZyb20gXSwge1xuICAgICAgICAgICAgICByYW5nZUZyb206IHRydWUsXG4gICAgICAgICAgICAgIGZsYXQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBlbnRyeS50byAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocmVzWyB0byBdLCB7XG4gICAgICAgICAgICAgIHJhbmdlVG86IHRydWUsXG4gICAgICAgICAgICAgIGZsYXQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbnRyeS50byAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjb25zdCB0byA9IGluZGV4ICsgZW50cnkudG8gLSAxXG5cbiAgICAgICAgICAgIGZvciAobGV0IGRheSA9IGluZGV4OyBkYXkgPD0gdG87IGRheSsrKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzWyBkYXkgXSwge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBlbnRyeS5yYW5nZSxcbiAgICAgICAgICAgICAgICB1bmVsZXZhdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb21wdXRlZENvbG9yLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogY29tcHV0ZWRUZXh0Q29sb3IudmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXNbIHRvIF0sIHtcbiAgICAgICAgICAgICAgZmxhdDogZmFsc2UsXG4gICAgICAgICAgICAgIHJhbmdlVG86IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdG8gPSBpbmRleCArIGRheXNJbk1vbnRoLnZhbHVlIC0gMVxuICAgICAgICAgICAgZm9yIChsZXQgZGF5ID0gaW5kZXg7IGRheSA8PSB0bzsgZGF5KyspIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXNbIGRheSBdLCB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IGVudHJ5LnJhbmdlLFxuICAgICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbXB1dGVkQ29sb3IudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiBjb21wdXRlZFRleHRDb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHJhbmdlVmlldy52YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSBpbmRleCArIHJhbmdlVmlldy52YWx1ZS5mcm9tIC0gMVxuICAgICAgICBjb25zdCB0byA9IGluZGV4ICsgcmFuZ2VWaWV3LnZhbHVlLnRvIC0gMVxuXG4gICAgICAgIGZvciAobGV0IGRheSA9IGZyb207IGRheSA8PSB0bzsgZGF5KyspIHtcbiAgICAgICAgICByZXNbIGRheSBdLmNvbG9yID0gY29tcHV0ZWRDb2xvci52YWx1ZVxuICAgICAgICAgIHJlc1sgZGF5IF0uZWRpdFJhbmdlID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhbmdlVmlldy52YWx1ZS5pbmNsdWRlRnJvbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlc1sgZnJvbSBdLmVkaXRSYW5nZUZyb20gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlVmlldy52YWx1ZS5pbmNsdWRlVG8gPT09IHRydWUpIHtcbiAgICAgICAgICByZXNbIHRvIF0uZWRpdFJhbmdlVG8gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHZpZXdNb2RlbC52YWx1ZS55ZWFyID09PSB0b2RheS52YWx1ZS55ZWFyICYmIHZpZXdNb2RlbC52YWx1ZS5tb250aCA9PT0gdG9kYXkudmFsdWUubW9udGgpIHtcbiAgICAgICAgcmVzWyBpbmRleCArIHRvZGF5LnZhbHVlLmRheSAtIDEgXS50b2RheSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVmdCA9IHJlcy5sZW5ndGggJSA3XG4gICAgICBpZiAobGVmdCA+IDApIHtcbiAgICAgICAgY29uc3QgYWZ0ZXJEYXlzID0gNyAtIGxlZnRcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYWZ0ZXJEYXlzOyBpKyspIHtcbiAgICAgICAgICByZXMucHVzaCh7IGksIGZpbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXMuZm9yRWFjaChkYXkgPT4ge1xuICAgICAgICBsZXQgY2xzID0gJ3EtZGF0ZV9fY2FsZW5kYXItaXRlbSAnXG5cbiAgICAgICAgaWYgKGRheS5maWxsID09PSB0cnVlKSB7XG4gICAgICAgICAgY2xzICs9ICdxLWRhdGVfX2NhbGVuZGFyLWl0ZW0tLWZpbGwnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2xzICs9IGBxLWRhdGVfX2NhbGVuZGFyLWl0ZW0tLSR7IGRheS5pbiA9PT0gdHJ1ZSA/ICdpbicgOiAnb3V0JyB9YFxuXG4gICAgICAgICAgaWYgKGRheS5yYW5nZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjbHMgKz0gYCBxLWRhdGVfX3JhbmdlJHsgZGF5LnJhbmdlVG8gPT09IHRydWUgPyAnLXRvJyA6IChkYXkucmFuZ2VGcm9tID09PSB0cnVlID8gJy1mcm9tJyA6ICcnKSB9YFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkYXkuZWRpdFJhbmdlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbHMgKz0gYCBxLWRhdGVfX2VkaXQtcmFuZ2UkeyBkYXkuZWRpdFJhbmdlRnJvbSA9PT0gdHJ1ZSA/ICctZnJvbScgOiAnJyB9JHsgZGF5LmVkaXRSYW5nZVRvID09PSB0cnVlID8gJy10bycgOiAnJyB9YFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkYXkucmFuZ2UgIT09IHZvaWQgMCB8fCBkYXkuZWRpdFJhbmdlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbHMgKz0gYCB0ZXh0LSR7IGRheS5jb2xvciB9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRheS5jbGFzc2VzID0gY2xzXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSlcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICAgID8geyAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAobGFzdEVtaXRWYWx1ZSA9PT0gdikge1xuICAgICAgICBsYXN0RW1pdFZhbHVlID0gMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZ2V0Vmlld01vZGVsKGlubmVyTWFzay52YWx1ZSwgaW5uZXJMb2NhbGUudmFsdWUpXG4gICAgICAgIHVwZGF0ZVZpZXdNb2RlbChtb2RlbC55ZWFyLCBtb2RlbC5tb250aCwgbW9kZWwpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKHZpZXcsICgpID0+IHtcbiAgICAgIGlmIChibHVyVGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHByb3h5LiRlbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gdmlld01vZGVsLnZhbHVlLnllYXIgKyAnfCcgKyB2aWV3TW9kZWwudmFsdWUubW9udGgsICgpID0+IHtcbiAgICAgIGVtaXQoJ25hdmlnYXRpb24nLCB7IHllYXI6IHZpZXdNb2RlbC52YWx1ZS55ZWFyLCBtb250aDogdmlld01vZGVsLnZhbHVlLm1vbnRoIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKG1hc2ssIHZhbCA9PiB7XG4gICAgICB1cGRhdGVWYWx1ZSh2YWwsIGlubmVyTG9jYWxlLnZhbHVlLCAnbWFzaycpXG4gICAgICBpbm5lck1hc2sudmFsdWUgPSB2YWxcbiAgICB9KVxuXG4gICAgd2F0Y2gobG9jYWxlLCB2YWwgPT4ge1xuICAgICAgdXBkYXRlVmFsdWUoaW5uZXJNYXNrLnZhbHVlLCB2YWwsICdsb2NhbGUnKVxuICAgICAgaW5uZXJMb2NhbGUudmFsdWUgPSB2YWxcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0VG9kYXkgKCkge1xuICAgICAgY29uc3QgeyB5ZWFyLCBtb250aCwgZGF5IH0gPSB0b2RheS52YWx1ZVxuXG4gICAgICBjb25zdCBkYXRlID0ge1xuICAgICAgICAvLyBjb250YWlucyBtb3JlIHByb3BzIHRoYW4gbmVlZGVkIChob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQpXG4gICAgICAgIC8vIGJ1dCB0aG9zZSBhcmVuJ3QgdXNlZCBpbiB0aGUgcHJvY2Vzc2luZyBvZiB0aGlzIFwiZGF0ZVwiIHZhcmlhYmxlXG4gICAgICAgIC4uLnZpZXdNb2RlbC52YWx1ZSxcblxuICAgICAgICAvLyBvdmVyd3JpdGluZyB3aXRoIHRvZGF5J3MgZGF0ZVxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vbnRoTWFwID0gZGF5c01hcC52YWx1ZVsgZ2V0TW9udGhIYXNoKGRhdGUpIF1cblxuICAgICAgaWYgKG1vbnRoTWFwID09PSB2b2lkIDAgfHwgbW9udGhNYXAuaW5jbHVkZXMoZGF0ZS5kYXkpID09PSBmYWxzZSkge1xuICAgICAgICBhZGRUb01vZGVsKGRhdGUpXG4gICAgICB9XG5cbiAgICAgIHNldENhbGVuZGFyVG8oZGF0ZS55ZWFyLCBkYXRlLm1vbnRoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFZpZXcgKHZpZXdNb2RlKSB7XG4gICAgICBpZiAodmlld0lzVmFsaWQodmlld01vZGUpID09PSB0cnVlKSB7XG4gICAgICAgIHZpZXcudmFsdWUgPSB2aWV3TW9kZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9mZnNldENhbGVuZGFyICh0eXBlLCBkZXNjZW5kaW5nKSB7XG4gICAgICBpZiAoWyAnbW9udGgnLCAneWVhcicgXS5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICBjb25zdCBmbiA9IHR5cGUgPT09ICdtb250aCcgPyBnb1RvTW9udGggOiBnb1RvWWVhclxuICAgICAgICBmbihkZXNjZW5kaW5nID09PSB0cnVlID8gLTEgOiAxKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldENhbGVuZGFyVG8gKHllYXIsIG1vbnRoKSB7XG4gICAgICB2aWV3LnZhbHVlID0gJ0NhbGVuZGFyJ1xuICAgICAgdXBkYXRlVmlld01vZGVsKHllYXIsIG1vbnRoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEVkaXRpbmdSYW5nZSAoZnJvbSwgdG8pIHtcbiAgICAgIGlmIChwcm9wcy5yYW5nZSA9PT0gZmFsc2UgfHwgIWZyb20pIHtcbiAgICAgICAgZWRpdFJhbmdlLnZhbHVlID0gbnVsbFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5pdCA9IE9iamVjdC5hc3NpZ24oeyAuLi52aWV3TW9kZWwudmFsdWUgfSwgZnJvbSlcbiAgICAgIGNvbnN0IGZpbmFsID0gdG8gIT09IHZvaWQgMFxuICAgICAgICA/IE9iamVjdC5hc3NpZ24oeyAuLi52aWV3TW9kZWwudmFsdWUgfSwgdG8pXG4gICAgICAgIDogaW5pdFxuXG4gICAgICBlZGl0UmFuZ2UudmFsdWUgPSB7XG4gICAgICAgIGluaXQsXG4gICAgICAgIGluaXRIYXNoOiBnZXREYXlIYXNoKGluaXQpLFxuICAgICAgICBmaW5hbCxcbiAgICAgICAgZmluYWxIYXNoOiBnZXREYXlIYXNoKGZpbmFsKVxuICAgICAgfVxuXG4gICAgICBzZXRDYWxlbmRhclRvKGluaXQueWVhciwgaW5pdC5tb250aClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNYXNrICgpIHtcbiAgICAgIHJldHVybiBwcm9wcy5jYWxlbmRhciA9PT0gJ3BlcnNpYW4nID8gJ1lZWVkvTU0vREQnIDogcHJvcHMubWFza1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlY29kZVN0cmluZyAoZGF0ZSwgbWFzaywgbG9jYWxlKSB7XG4gICAgICByZXR1cm4gX19zcGxpdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgcHJvcHMuY2FsZW5kYXIsXG4gICAgICAgIHtcbiAgICAgICAgICBob3VyOiAwLFxuICAgICAgICAgIG1pbnV0ZTogMCxcbiAgICAgICAgICBzZWNvbmQ6IDAsXG4gICAgICAgICAgbWlsbGlzZWNvbmQ6IDBcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpZXdNb2RlbCAobWFzaywgbG9jYWxlKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgIDogKHByb3BzLm1vZGVsVmFsdWUgPyBbIHByb3BzLm1vZGVsVmFsdWUgXSA6IFtdKVxuXG4gICAgICBpZiAobW9kZWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBnZXREZWZhdWx0Vmlld01vZGVsKClcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0ID0gbW9kZWxbIG1vZGVsLmxlbmd0aCAtIDEgXVxuICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZVN0cmluZyhcbiAgICAgICAgdGFyZ2V0LmZyb20gIT09IHZvaWQgMCA/IHRhcmdldC5mcm9tIDogdGFyZ2V0LFxuICAgICAgICBtYXNrLFxuICAgICAgICBsb2NhbGVcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGRlY29kZWQuZGF0ZUhhc2ggPT09IG51bGxcbiAgICAgICAgPyBnZXREZWZhdWx0Vmlld01vZGVsKClcbiAgICAgICAgOiBkZWNvZGVkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFZpZXdNb2RlbCAoKSB7XG4gICAgICBsZXQgeWVhciwgbW9udGhcblxuICAgICAgaWYgKHByb3BzLmRlZmF1bHRZZWFyTW9udGggIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBkID0gcHJvcHMuZGVmYXVsdFllYXJNb250aC5zcGxpdCgnLycpXG4gICAgICAgIHllYXIgPSBwYXJzZUludChkWyAwIF0sIDEwKVxuICAgICAgICBtb250aCA9IHBhcnNlSW50KGRbIDEgXSwgMTApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gbWF5IGNvbWUgZnJvbSBkYXRhKCkgd2hlcmUgY29tcHV0ZWRcbiAgICAgICAgLy8gcHJvcHMgYXJlIG5vdCB5ZXQgYXZhaWxhYmxlXG4gICAgICAgIGNvbnN0IGQgPSB0b2RheS52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyB0b2RheS52YWx1ZVxuICAgICAgICAgIDogZ2V0Q3VycmVudERhdGUoKVxuXG4gICAgICAgIHllYXIgPSBkLnllYXJcbiAgICAgICAgbW9udGggPSBkLm1vbnRoXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXk6IDEsXG4gICAgICAgIGhvdXI6IDAsXG4gICAgICAgIG1pbnV0ZTogMCxcbiAgICAgICAgc2Vjb25kOiAwLFxuICAgICAgICBtaWxsaXNlY29uZDogMCxcbiAgICAgICAgZGF0ZUhhc2g6IHllYXIgKyAnLycgKyBwYWQobW9udGgpICsgJy8wMSdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb1RvTW9udGggKG9mZnNldCkge1xuICAgICAgbGV0IHllYXIgPSB2aWV3TW9kZWwudmFsdWUueWVhclxuICAgICAgbGV0IG1vbnRoID0gTnVtYmVyKHZpZXdNb2RlbC52YWx1ZS5tb250aCkgKyBvZmZzZXRcblxuICAgICAgaWYgKG1vbnRoID09PSAxMykge1xuICAgICAgICBtb250aCA9IDFcbiAgICAgICAgeWVhcisrXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtb250aCA9PT0gMCkge1xuICAgICAgICBtb250aCA9IDEyXG4gICAgICAgIHllYXItLVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVWaWV3TW9kZWwoeWVhciwgbW9udGgpXG4gICAgICBpc0ltbWVkaWF0ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBlbWl0SW1tZWRpYXRlbHkoJ21vbnRoJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb1RvWWVhciAob2Zmc2V0KSB7XG4gICAgICBjb25zdCB5ZWFyID0gTnVtYmVyKHZpZXdNb2RlbC52YWx1ZS55ZWFyKSArIG9mZnNldFxuICAgICAgdXBkYXRlVmlld01vZGVsKHllYXIsIHZpZXdNb2RlbC52YWx1ZS5tb250aClcbiAgICAgIGlzSW1tZWRpYXRlLnZhbHVlID09PSB0cnVlICYmIGVtaXRJbW1lZGlhdGVseSgneWVhcicpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0WWVhciAoeWVhcikge1xuICAgICAgdXBkYXRlVmlld01vZGVsKHllYXIsIHZpZXdNb2RlbC52YWx1ZS5tb250aClcbiAgICAgIHZpZXcudmFsdWUgPSBwcm9wcy5kZWZhdWx0VmlldyA9PT0gJ1llYXJzJyA/ICdNb250aHMnIDogJ0NhbGVuZGFyJ1xuICAgICAgaXNJbW1lZGlhdGUudmFsdWUgPT09IHRydWUgJiYgZW1pdEltbWVkaWF0ZWx5KCd5ZWFyJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRNb250aCAobW9udGgpIHtcbiAgICAgIHVwZGF0ZVZpZXdNb2RlbCh2aWV3TW9kZWwudmFsdWUueWVhciwgbW9udGgpXG4gICAgICB2aWV3LnZhbHVlID0gJ0NhbGVuZGFyJ1xuICAgICAgaXNJbW1lZGlhdGUudmFsdWUgPT09IHRydWUgJiYgZW1pdEltbWVkaWF0ZWx5KCdtb250aCcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGF0ZSAoZGF0ZSwgbW9udGhIYXNoKSB7XG4gICAgICBjb25zdCBtb250aCA9IGRheXNNYXAudmFsdWVbIG1vbnRoSGFzaCBdXG4gICAgICBjb25zdCBmbiA9IG1vbnRoICE9PSB2b2lkIDAgJiYgbW9udGguaW5jbHVkZXMoZGF0ZS5kYXkpID09PSB0cnVlXG4gICAgICAgID8gcmVtb3ZlRnJvbU1vZGVsXG4gICAgICAgIDogYWRkVG9Nb2RlbFxuXG4gICAgICBmbihkYXRlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNob3J0RGF0ZSAoZGF0ZSkge1xuICAgICAgcmV0dXJuIHsgeWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheSB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlld01vZGVsICh5ZWFyLCBtb250aCwgdGltZSkge1xuICAgICAgaWYgKG1pbk5hdi52YWx1ZSAhPT0gbnVsbCAmJiB5ZWFyIDw9IG1pbk5hdi52YWx1ZS55ZWFyKSB7XG4gICAgICAgIGlmIChtb250aCA8IG1pbk5hdi52YWx1ZS5tb250aCB8fCB5ZWFyIDwgbWluTmF2LnZhbHVlLnllYXIpIHtcbiAgICAgICAgICBtb250aCA9IG1pbk5hdi52YWx1ZS5tb250aFxuICAgICAgICB9XG4gICAgICAgIHllYXIgPSBtaW5OYXYudmFsdWUueWVhclxuICAgICAgfVxuXG4gICAgICBpZiAobWF4TmF2LnZhbHVlICE9PSBudWxsICYmIHllYXIgPj0gbWF4TmF2LnZhbHVlLnllYXIpIHtcbiAgICAgICAgaWYgKG1vbnRoID4gbWF4TmF2LnZhbHVlLm1vbnRoIHx8IHllYXIgPiBtYXhOYXYudmFsdWUueWVhcikge1xuICAgICAgICAgIG1vbnRoID0gbWF4TmF2LnZhbHVlLm1vbnRoXG4gICAgICAgIH1cbiAgICAgICAgeWVhciA9IG1heE5hdi52YWx1ZS55ZWFyXG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgeyBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQsIHRpbWV6b25lT2Zmc2V0LCB0aW1lSGFzaCB9ID0gdGltZVxuICAgICAgICBPYmplY3QuYXNzaWduKHZpZXdNb2RlbC52YWx1ZSwgeyBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQsIHRpbWV6b25lT2Zmc2V0LCB0aW1lSGFzaCB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdIYXNoID0geWVhciArICcvJyArIHBhZChtb250aCkgKyAnLzAxJ1xuXG4gICAgICBpZiAobmV3SGFzaCAhPT0gdmlld01vZGVsLnZhbHVlLmRhdGVIYXNoKSB7XG4gICAgICAgIG1vbnRoRGlyZWN0aW9uLnZhbHVlID0gKHZpZXdNb2RlbC52YWx1ZS5kYXRlSGFzaCA8IG5ld0hhc2gpID09PSAoJHEubGFuZy5ydGwgIT09IHRydWUpID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgICAgICBpZiAoeWVhciAhPT0gdmlld01vZGVsLnZhbHVlLnllYXIpIHtcbiAgICAgICAgICB5ZWFyRGlyZWN0aW9uLnZhbHVlID0gbW9udGhEaXJlY3Rpb24udmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzdGFydFllYXIudmFsdWUgPSB5ZWFyIC0geWVhciAlIHllYXJzSW50ZXJ2YWwgLSAoeWVhciA8IDAgPyB5ZWFyc0ludGVydmFsIDogMClcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHZpZXdNb2RlbC52YWx1ZSwge1xuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF5OiAxLFxuICAgICAgICAgICAgZGF0ZUhhc2g6IG5ld0hhc2hcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBhY3Rpb24sIGRhdGUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsICE9PSBudWxsICYmIHZhbC5sZW5ndGggPT09IDEgJiYgcHJvcHMubXVsdGlwbGUgPT09IGZhbHNlXG4gICAgICAgID8gdmFsWyAwIF1cbiAgICAgICAgOiB2YWxcblxuICAgICAgbGFzdEVtaXRWYWx1ZSA9IHZhbHVlXG5cbiAgICAgIGNvbnN0IHsgcmVhc29uLCBkZXRhaWxzIH0gPSBnZXRFbWl0UGFyYW1zKGFjdGlvbiwgZGF0ZSlcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUsIHJlYXNvbiwgZGV0YWlscylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0SW1tZWRpYXRlbHkgKHJlYXNvbikge1xuICAgICAgY29uc3QgZGF0ZSA9IGRheXNNb2RlbC52YWx1ZVsgMCBdICE9PSB2b2lkIDAgJiYgZGF5c01vZGVsLnZhbHVlWyAwIF0uZGF0ZUhhc2ggIT09IG51bGxcbiAgICAgICAgPyB7IC4uLmRheXNNb2RlbC52YWx1ZVsgMCBdIH1cbiAgICAgICAgOiB7IC4uLnZpZXdNb2RlbC52YWx1ZSB9IC8vIGluaGVyaXQgZGF5LCBob3VycywgbWludXRlcywgbWlsbGlzZWNvbmRzLi4uXG5cbiAgICAgIC8vIG5leHRUaWNrIHJlcXVpcmVkIGJlY2F1c2Ugb2YgYW5pbWF0aW9uIGRlbGF5IGluIHZpZXdNb2RlbFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBkYXRlLnllYXIgPSB2aWV3TW9kZWwudmFsdWUueWVhclxuICAgICAgICBkYXRlLm1vbnRoID0gdmlld01vZGVsLnZhbHVlLm1vbnRoXG5cbiAgICAgICAgY29uc3QgbWF4RGF5ID0gcHJvcHMuY2FsZW5kYXIgIT09ICdwZXJzaWFuJ1xuICAgICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICAgIDogamFsYWFsaU1vbnRoTGVuZ3RoKGRhdGUueWVhciwgZGF0ZS5tb250aClcblxuICAgICAgICBkYXRlLmRheSA9IE1hdGgubWluKE1hdGgubWF4KDEsIGRhdGUuZGF5KSwgbWF4RGF5KVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZW5jb2RlRW50cnkoZGF0ZSlcbiAgICAgICAgbGFzdEVtaXRWYWx1ZSA9IHZhbHVlXG5cbiAgICAgICAgY29uc3QgeyBkZXRhaWxzIH0gPSBnZXRFbWl0UGFyYW1zKCcnLCBkYXRlKVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbHVlLCByZWFzb24sIGRldGFpbHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVtaXRQYXJhbXMgKGFjdGlvbiwgZGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGUuZnJvbSAhPT0gdm9pZCAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgcmVhc29uOiBgJHsgYWN0aW9uIH0tcmFuZ2VgLFxuICAgICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5nZXRTaG9ydERhdGUoZGF0ZS50YXJnZXQpLFxuICAgICAgICAgICAgICBmcm9tOiBnZXRTaG9ydERhdGUoZGF0ZS5mcm9tKSxcbiAgICAgICAgICAgICAgdG86IGdldFNob3J0RGF0ZShkYXRlLnRvKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICByZWFzb246IGAkeyBhY3Rpb24gfS1kYXlgLFxuICAgICAgICAgICAgZGV0YWlsczogZ2V0U2hvcnREYXRlKGRhdGUpXG4gICAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuY29kZUVudHJ5IChkYXRlLCBtYXNrLCBsb2NhbGUpIHtcbiAgICAgIHJldHVybiBkYXRlLmZyb20gIT09IHZvaWQgMFxuICAgICAgICA/IHsgZnJvbTogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZS5mcm9tLCBtYXNrLCBsb2NhbGUpLCB0bzogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZS50bywgbWFzaywgbG9jYWxlKSB9XG4gICAgICAgIDogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZSwgbWFzaywgbG9jYWxlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvTW9kZWwgKGRhdGUpIHtcbiAgICAgIGxldCB2YWx1ZVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGRhdGUuZnJvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIGZpbHRlciBvdXQgaW50ZXJzZWN0aW9uc1xuXG4gICAgICAgICAgY29uc3QgZnJvbUhhc2ggPSBnZXREYXlIYXNoKGRhdGUuZnJvbSlcbiAgICAgICAgICBjb25zdCB0b0hhc2ggPSBnZXREYXlIYXNoKGRhdGUudG8pXG5cbiAgICAgICAgICBjb25zdCBkYXlzID0gZGF5c01vZGVsLnZhbHVlXG4gICAgICAgICAgICAuZmlsdGVyKGRheSA9PiBkYXkuZGF0ZUhhc2ggPCBmcm9tSGFzaCB8fCBkYXkuZGF0ZUhhc2ggPiB0b0hhc2gpXG5cbiAgICAgICAgICBjb25zdCByYW5nZXMgPSByYW5nZU1vZGVsLnZhbHVlXG4gICAgICAgICAgICAuZmlsdGVyKCh7IGZyb20sIHRvIH0pID0+IHRvLmRhdGVIYXNoIDwgZnJvbUhhc2ggfHwgZnJvbS5kYXRlSGFzaCA+IHRvSGFzaClcblxuICAgICAgICAgIHZhbHVlID0gZGF5cy5jb25jYXQocmFuZ2VzKS5jb25jYXQoZGF0ZSkubWFwKGVudHJ5ID0+IGVuY29kZUVudHJ5KGVudHJ5KSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IG5vcm1hbGl6ZWRNb2RlbC52YWx1ZS5zbGljZSgpXG4gICAgICAgICAgbW9kZWwucHVzaChlbmNvZGVFbnRyeShkYXRlKSlcbiAgICAgICAgICB2YWx1ZSA9IG1vZGVsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGVuY29kZUVudHJ5KGRhdGUpXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZSh2YWx1ZSwgJ2FkZCcsIGRhdGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRnJvbU1vZGVsIChkYXRlKSB7XG4gICAgICBpZiAocHJvcHMubm9VbnNldCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IG1vZGVsID0gbnVsbFxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB2YWwgPSBlbmNvZGVFbnRyeShkYXRlKVxuXG4gICAgICAgIGlmIChkYXRlLmZyb20gIT09IHZvaWQgMCkge1xuICAgICAgICAgIG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5maWx0ZXIoXG4gICAgICAgICAgICBkYXRlID0+IChcbiAgICAgICAgICAgICAgZGF0ZS5mcm9tICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IChkYXRlLmZyb20gIT09IHZhbC5mcm9tICYmIGRhdGUudG8gIT09IHZhbC50bylcbiAgICAgICAgICAgICAgICA6IHRydWVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLmZpbHRlcihkYXRlID0+IGRhdGUgIT09IHZhbClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtb2RlbCA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWUobW9kZWwsICdyZW1vdmUnLCBkYXRlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZhbHVlIChtYXNrLCBsb2NhbGUsIHJlYXNvbikge1xuICAgICAgY29uc3QgbW9kZWwgPSBkYXlzTW9kZWwudmFsdWVcbiAgICAgICAgLmNvbmNhdChyYW5nZU1vZGVsLnZhbHVlKVxuICAgICAgICAubWFwKGVudHJ5ID0+IGVuY29kZUVudHJ5KGVudHJ5LCBtYXNrLCBsb2NhbGUpKVxuICAgICAgICAuZmlsdGVyKGVudHJ5ID0+IHtcbiAgICAgICAgICByZXR1cm4gZW50cnkuZnJvbSAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IGVudHJ5LmZyb20uZGF0ZUhhc2ggIT09IG51bGwgJiYgZW50cnkudG8uZGF0ZUhhc2ggIT09IG51bGxcbiAgICAgICAgICAgIDogZW50cnkuZGF0ZUhhc2ggIT09IG51bGxcbiAgICAgICAgfSlcblxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBtb2RlbCA6IG1vZGVsWyAwIF0pIHx8IG51bGwsIHJlYXNvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXIgKCkge1xuICAgICAgaWYgKHByb3BzLm1pbmltYWwgPT09IHRydWUpIHJldHVyblxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZGF0ZV9faGVhZGVyICcgKyBoZWFkZXJDbGFzcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdyZWxhdGl2ZS1wb3NpdGlvbidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICB9LCAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICAgICAgICBrZXk6ICdoLXlyLScgKyBoZWFkZXJTdWJ0aXRsZS52YWx1ZSxcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19oZWFkZXItc3VidGl0bGUgcS1kYXRlX19oZWFkZXItbGluayAnXG4gICAgICAgICAgICAgICsgKHZpZXcudmFsdWUgPT09ICdZZWFycycgPyAncS1kYXRlX19oZWFkZXItbGluay0tYWN0aXZlJyA6ICdjdXJzb3ItcG9pbnRlcicpLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3ZZJywge1xuICAgICAgICAgICAgICBvbkNsaWNrICgpIHsgdmlldy52YWx1ZSA9ICdZZWFycycgfSxcbiAgICAgICAgICAgICAgb25LZXl1cCAoZSkgeyBlLmtleUNvZGUgPT09IDEzICYmICh2aWV3LnZhbHVlID0gJ1llYXJzJykgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LCBbIGhlYWRlclN1YnRpdGxlLnZhbHVlIF0pKVxuICAgICAgICBdKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX2hlYWRlci10aXRsZSByZWxhdGl2ZS1wb3NpdGlvbiBmbGV4IG5vLXdyYXAnXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3JlbGF0aXZlLXBvc2l0aW9uIGNvbCdcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaC1zdWInICsgaGVhZGVyVGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19oZWFkZXItdGl0bGUtbGFiZWwgcS1kYXRlX19oZWFkZXItbGluayAnXG4gICAgICAgICAgICAgICAgKyAodmlldy52YWx1ZSA9PT0gJ0NhbGVuZGFyJyA/ICdxLWRhdGVfX2hlYWRlci1saW5rLS1hY3RpdmUnIDogJ2N1cnNvci1wb2ludGVyJyksXG4gICAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3ZDJywge1xuICAgICAgICAgICAgICAgIG9uQ2xpY2sgKCkgeyB2aWV3LnZhbHVlID0gJ0NhbGVuZGFyJyB9LFxuICAgICAgICAgICAgICAgIG9uS2V5dXAgKGUpIHsgZS5rZXlDb2RlID09PSAxMyAmJiAodmlldy52YWx1ZSA9ICdDYWxlbmRhcicpIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIFsgaGVhZGVyVGl0bGUudmFsdWUgXSkpXG4gICAgICAgICAgXSksXG5cbiAgICAgICAgICBwcm9wcy50b2RheUJ0biA9PT0gdHJ1ZSA/IGgoUUJ0biwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX2hlYWRlci10b2RheSBzZWxmLXN0YXJ0JyxcbiAgICAgICAgICAgIGljb246ICRxLmljb25TZXQuZGF0ZXRpbWUudG9kYXksXG4gICAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgb25DbGljazogc2V0VG9kYXlcbiAgICAgICAgICB9KSA6IG51bGxcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TmF2aWdhdGlvbiAoeyBsYWJlbCwgdHlwZSwga2V5LCBkaXIsIGdvVG8sIGJvdW5kYXJpZXMsIGNscyB9KSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdyb3cgaXRlbXMtY2VudGVyIHEtZGF0ZV9fYXJyb3cnXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAnc20nLFxuICAgICAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgICAgIGljb246IGRhdGVBcnJvdy52YWx1ZVsgMCBdLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgZGlzYWJsZTogYm91bmRhcmllcy5wcmV2ID09PSBmYWxzZSxcbiAgICAgICAgICAgIC4uLmdldENhY2hlKCdnby0jJyArIHR5cGUsIHsgb25DbGljayAoKSB7IGdvVG8oLTEpIH0gfSlcbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdyZWxhdGl2ZS1wb3NpdGlvbiBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNlbnRlcicgKyBjbHNcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tanVtcC0nICsgZGlyXG4gICAgICAgICAgfSwgKCkgPT4gaCgnZGl2JywgeyBrZXkgfSwgW1xuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBub0NhcHM6IHRydWUsXG4gICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICAgIC4uLmdldENhY2hlKCd2aWV3IycgKyB0eXBlLCB7IG9uQ2xpY2s6ICgpID0+IHsgdmlldy52YWx1ZSA9IHR5cGUgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncm93IGl0ZW1zLWNlbnRlciBxLWRhdGVfX2Fycm93J1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBpY29uOiBkYXRlQXJyb3cudmFsdWVbIDEgXSxcbiAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGU6IGJvdW5kYXJpZXMubmV4dCA9PT0gZmFsc2UsXG4gICAgICAgICAgICAuLi5nZXRDYWNoZSgnZ28rIycgKyB0eXBlLCB7IG9uQ2xpY2sgKCkgeyBnb1RvKDEpIH0gfSlcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgXVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclZpZXdzID0ge1xuICAgICAgQ2FsZW5kYXI6ICgpID0+IChbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdjYWxlbmRhci12aWV3JyxcbiAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9fdmlldyBxLWRhdGVfX2NhbGVuZGFyJ1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX25hdmlnYXRpb24gcm93IGl0ZW1zLWNlbnRlciBuby13cmFwJ1xuICAgICAgICAgIH0sIGdldE5hdmlnYXRpb24oe1xuICAgICAgICAgICAgbGFiZWw6IGlubmVyTG9jYWxlLnZhbHVlLm1vbnRoc1sgdmlld01vZGVsLnZhbHVlLm1vbnRoIC0gMSBdLFxuICAgICAgICAgICAgdHlwZTogJ01vbnRocycsXG4gICAgICAgICAgICBrZXk6IHZpZXdNb2RlbC52YWx1ZS5tb250aCxcbiAgICAgICAgICAgIGRpcjogbW9udGhEaXJlY3Rpb24udmFsdWUsXG4gICAgICAgICAgICBnb1RvOiBnb1RvTW9udGgsXG4gICAgICAgICAgICBib3VuZGFyaWVzOiBuYXZCb3VuZGFyaWVzLnZhbHVlLm1vbnRoLFxuICAgICAgICAgICAgY2xzOiAnIGNvbCdcbiAgICAgICAgICB9KS5jb25jYXQoZ2V0TmF2aWdhdGlvbih7XG4gICAgICAgICAgICBsYWJlbDogdmlld01vZGVsLnZhbHVlLnllYXIsXG4gICAgICAgICAgICB0eXBlOiAnWWVhcnMnLFxuICAgICAgICAgICAga2V5OiB2aWV3TW9kZWwudmFsdWUueWVhcixcbiAgICAgICAgICAgIGRpcjogeWVhckRpcmVjdGlvbi52YWx1ZSxcbiAgICAgICAgICAgIGdvVG86IGdvVG9ZZWFyLFxuICAgICAgICAgICAgYm91bmRhcmllczogbmF2Qm91bmRhcmllcy52YWx1ZS55ZWFyLFxuICAgICAgICAgICAgY2xzOiAnJ1xuICAgICAgICAgIH0pKSksXG5cbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9fY2FsZW5kYXItd2Vla2RheXMgcm93IGl0ZW1zLWNlbnRlciBuby13cmFwJ1xuICAgICAgICAgIH0sIGRheXNPZldlZWsudmFsdWUubWFwKGRheSA9PiBoKCdkaXYnLCB7IGNsYXNzOiAncS1kYXRlX19jYWxlbmRhci1pdGVtJyB9LCBbIGgoJ2RpdicsIGRheSkgXSkpKSxcblxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19jYWxlbmRhci1kYXlzLWNvbnRhaW5lciByZWxhdGl2ZS1wb3NpdGlvbiBvdmVyZmxvdy1oaWRkZW4nXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaChUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgICAgIG5hbWU6ICdxLXRyYW5zaXRpb24tLXNsaWRlLScgKyBtb250aERpcmVjdGlvbi52YWx1ZVxuICAgICAgICAgICAgfSwgKCkgPT4gaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6IHZpZXdNb250aEhhc2gudmFsdWUsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19jYWxlbmRhci1kYXlzIGZpdCdcbiAgICAgICAgICAgIH0sIGRheXMudmFsdWUubWFwKGRheSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBkYXkuY2xhc3NlcyB9LCBbXG4gICAgICAgICAgICAgIGRheS5pbiA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gaChcbiAgICAgICAgICAgICAgICAgIFFCdG4sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGRheS50b2RheSA9PT0gdHJ1ZSA/ICdxLWRhdGVfX3RvZGF5JyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmxhdDogZGF5LmZsYXQsXG4gICAgICAgICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IGRheS51bmVsZXZhdGVkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogZGF5LmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6IGRheS50ZXh0Q29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkYXkuaSxcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAuLi5nZXRDYWNoZSgnZGF5IycgKyBkYXkuaSwge1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgb25EYXlDbGljayhkYXkuaSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlb3ZlcjogKCkgPT4geyBvbkRheU1vdXNlb3ZlcihkYXkuaSkgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRheS5ldmVudCAhPT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgPyAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiAncS1kYXRlX19ldmVudCBiZy0nICsgZGF5LmV2ZW50IH0pXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IGgoJ2RpdicsICcnICsgZGF5LmkpXG4gICAgICAgICAgICBdKSkpKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKSxcblxuICAgICAgTW9udGhzICgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSB2aWV3TW9kZWwudmFsdWUueWVhciA9PT0gdG9kYXkudmFsdWUueWVhclxuICAgICAgICBjb25zdCBpc0Rpc2FibGVkID0gbW9udGggPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAobWluTmF2LnZhbHVlICE9PSBudWxsICYmIHZpZXdNb2RlbC52YWx1ZS55ZWFyID09PSBtaW5OYXYudmFsdWUueWVhciAmJiBtaW5OYXYudmFsdWUubW9udGggPiBtb250aClcbiAgICAgICAgICAgIHx8IChtYXhOYXYudmFsdWUgIT09IG51bGwgJiYgdmlld01vZGVsLnZhbHVlLnllYXIgPT09IG1heE5hdi52YWx1ZS55ZWFyICYmIG1heE5hdi52YWx1ZS5tb250aCA8IG1vbnRoKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNTaG9ydC5tYXAoKG1vbnRoLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gdmlld01vZGVsLnZhbHVlLm1vbnRoID09PSBpICsgMVxuXG4gICAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19tb250aHMtaXRlbSBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBjbGFzczogY3VycmVudFllYXIgPT09IHRydWUgJiYgdG9kYXkudmFsdWUubW9udGggPT09IGkgKyAxID8gJ3EtZGF0ZV9fdG9kYXknIDogbnVsbCxcbiAgICAgICAgICAgICAgZmxhdDogYWN0aXZlICE9PSB0cnVlLFxuICAgICAgICAgICAgICBsYWJlbDogbW9udGgsXG4gICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IGFjdGl2ZSxcbiAgICAgICAgICAgICAgY29sb3I6IGFjdGl2ZSA9PT0gdHJ1ZSA/IGNvbXB1dGVkQ29sb3IudmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgICB0ZXh0Q29sb3I6IGFjdGl2ZSA9PT0gdHJ1ZSA/IGNvbXB1dGVkVGV4dENvbG9yLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0Rpc2FibGVkKGkgKyAxKSxcbiAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ21vbnRoIycgKyBpLCB7IG9uQ2xpY2s6ICgpID0+IHsgc2V0TW9udGgoaSArIDEpIH0gfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcblxuICAgICAgICBwcm9wcy55ZWFyc0luTW9udGhWaWV3ID09PSB0cnVlICYmIGNvbnRlbnQudW5zaGlmdChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncm93IG5vLXdyYXAgZnVsbC13aWR0aCcgfSwgW1xuICAgICAgICAgICAgZ2V0TmF2aWdhdGlvbih7XG4gICAgICAgICAgICAgIGxhYmVsOiB2aWV3TW9kZWwudmFsdWUueWVhcixcbiAgICAgICAgICAgICAgdHlwZTogJ1llYXJzJyxcbiAgICAgICAgICAgICAga2V5OiB2aWV3TW9kZWwudmFsdWUueWVhcixcbiAgICAgICAgICAgICAgZGlyOiB5ZWFyRGlyZWN0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICBnb1RvOiBnb1RvWWVhcixcbiAgICAgICAgICAgICAgYm91bmRhcmllczogbmF2Qm91bmRhcmllcy52YWx1ZS55ZWFyLFxuICAgICAgICAgICAgICBjbHM6ICcgY29sJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdtb250aHMtdmlldycsXG4gICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX3ZpZXcgcS1kYXRlX19tb250aHMgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgfSwgY29udGVudClcbiAgICAgIH0sXG5cbiAgICAgIFllYXJzICgpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBzdGFydCA9IHN0YXJ0WWVhci52YWx1ZSxcbiAgICAgICAgICBzdG9wID0gc3RhcnQgKyB5ZWFyc0ludGVydmFsLFxuICAgICAgICAgIHllYXJzID0gW11cblxuICAgICAgICBjb25zdCBpc0Rpc2FibGVkID0geWVhciA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChtaW5OYXYudmFsdWUgIT09IG51bGwgJiYgbWluTmF2LnZhbHVlLnllYXIgPiB5ZWFyKVxuICAgICAgICAgICAgfHwgKG1heE5hdi52YWx1ZSAhPT0gbnVsbCAmJiBtYXhOYXYudmFsdWUueWVhciA8IHllYXIpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IHN0b3A7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHZpZXdNb2RlbC52YWx1ZS55ZWFyID09PSBpXG5cbiAgICAgICAgICB5ZWFycy5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9feWVhcnMtaXRlbSBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd5cicgKyBpLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB0b2RheS52YWx1ZS55ZWFyID09PSBpID8gJ3EtZGF0ZV9fdG9kYXknIDogbnVsbCxcbiAgICAgICAgICAgICAgICBmbGF0OiAhYWN0aXZlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBpLFxuICAgICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IGFjdGl2ZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogYWN0aXZlID09PSB0cnVlID8gY29tcHV0ZWRDb2xvci52YWx1ZSA6IG51bGwsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiBhY3RpdmUgPT09IHRydWUgPyBjb21wdXRlZFRleHRDb2xvci52YWx1ZSA6IG51bGwsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGU6IGlzRGlzYWJsZWQoaSksXG4gICAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3lyIycgKyBpLCB7IG9uQ2xpY2s6ICgpID0+IHsgc2V0WWVhcihpKSB9IH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX3ZpZXcgcS1kYXRlX195ZWFycyBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdjb2wtYXV0bydcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgICAgICBpY29uOiBkYXRlQXJyb3cudmFsdWVbIDAgXSxcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0Rpc2FibGVkKHN0YXJ0KSxcbiAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3ktJywgeyBvbkNsaWNrOiAoKSA9PiB7IHN0YXJ0WWVhci52YWx1ZSAtPSB5ZWFyc0ludGVydmFsIH0gfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG5cbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9feWVhcnMtY29udGVudCBjb2wgc2VsZi1zdHJldGNoIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICAgICAgfSwgeWVhcnMpLFxuXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdjb2wtYXV0bydcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgICAgICBpY29uOiBkYXRlQXJyb3cudmFsdWVbIDEgXSxcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0Rpc2FibGVkKHN0b3ApLFxuICAgICAgICAgICAgICAuLi5nZXRDYWNoZSgneSsnLCB7IG9uQ2xpY2s6ICgpID0+IHsgc3RhcnRZZWFyLnZhbHVlICs9IHllYXJzSW50ZXJ2YWwgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGF5Q2xpY2sgKGRheUluZGV4KSB7XG4gICAgICBjb25zdCBkYXkgPSB7IC4uLnZpZXdNb2RlbC52YWx1ZSwgZGF5OiBkYXlJbmRleCB9XG5cbiAgICAgIGlmIChwcm9wcy5yYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlRGF0ZShkYXksIHZpZXdNb250aEhhc2gudmFsdWUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdFJhbmdlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRheVByb3BzID0gZGF5cy52YWx1ZS5maW5kKGRheSA9PiBkYXkuZmlsbCAhPT0gdHJ1ZSAmJiBkYXkuaSA9PT0gZGF5SW5kZXgpXG5cbiAgICAgICAgaWYgKHByb3BzLm5vVW5zZXQgIT09IHRydWUgJiYgZGF5UHJvcHMucmFuZ2UgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJlbW92ZUZyb21Nb2RlbCh7IHRhcmdldDogZGF5LCBmcm9tOiBkYXlQcm9wcy5yYW5nZS5mcm9tLCB0bzogZGF5UHJvcHMucmFuZ2UudG8gfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXlQcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlbW92ZUZyb21Nb2RlbChkYXkpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbml0SGFzaCA9IGdldERheUhhc2goZGF5KVxuXG4gICAgICAgIGVkaXRSYW5nZS52YWx1ZSA9IHtcbiAgICAgICAgICBpbml0OiBkYXksXG4gICAgICAgICAgaW5pdEhhc2gsXG4gICAgICAgICAgZmluYWw6IGRheSxcbiAgICAgICAgICBmaW5hbEhhc2g6IGluaXRIYXNoXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdyYW5nZVN0YXJ0JywgZ2V0U2hvcnREYXRlKGRheSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBpbml0SGFzaCA9IGVkaXRSYW5nZS52YWx1ZS5pbml0SGFzaCxcbiAgICAgICAgICBmaW5hbEhhc2ggPSBnZXREYXlIYXNoKGRheSksXG4gICAgICAgICAgcGF5bG9hZCA9IGluaXRIYXNoIDw9IGZpbmFsSGFzaFxuICAgICAgICAgICAgPyB7IGZyb206IGVkaXRSYW5nZS52YWx1ZS5pbml0LCB0bzogZGF5IH1cbiAgICAgICAgICAgIDogeyBmcm9tOiBkYXksIHRvOiBlZGl0UmFuZ2UudmFsdWUuaW5pdCB9XG5cbiAgICAgICAgZWRpdFJhbmdlLnZhbHVlID0gbnVsbFxuICAgICAgICBhZGRUb01vZGVsKGluaXRIYXNoID09PSBmaW5hbEhhc2ggPyBkYXkgOiB7IHRhcmdldDogZGF5LCAuLi5wYXlsb2FkIH0pXG5cbiAgICAgICAgZW1pdCgncmFuZ2VFbmQnLCB7XG4gICAgICAgICAgZnJvbTogZ2V0U2hvcnREYXRlKHBheWxvYWQuZnJvbSksXG4gICAgICAgICAgdG86IGdldFNob3J0RGF0ZShwYXlsb2FkLnRvKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGF5TW91c2VvdmVyIChkYXlJbmRleCkge1xuICAgICAgaWYgKGVkaXRSYW5nZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmaW5hbCA9IHsgLi4udmlld01vZGVsLnZhbHVlLCBkYXk6IGRheUluZGV4IH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGVkaXRSYW5nZS52YWx1ZSwge1xuICAgICAgICAgIGZpbmFsLFxuICAgICAgICAgIGZpbmFsSGFzaDogZ2V0RGF5SGFzaChmaW5hbClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBzZXRUb2RheSwgc2V0Vmlldywgb2Zmc2V0Q2FsZW5kYXIsIHNldENhbGVuZGFyVG8sIHNldEVkaXRpbmdSYW5nZVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19jb250ZW50IGNvbCByZWxhdGl2ZS1wb3NpdGlvbidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICB9LCByZW5kZXJWaWV3c1sgdmlldy52YWx1ZSBdKVxuICAgICAgICBdKVxuICAgICAgXVxuXG4gICAgICBjb25zdCBkZWYgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgZGVmICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1kYXRlX19hY3Rpb25zJyB9LCBkZWYpXG4gICAgICApXG5cbiAgICAgIGlmIChwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RGb3JtSW5wdXQoY29udGVudCwgJ3B1c2gnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBnZXRIZWFkZXIoKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19tYWluIGNvbCBjb2x1bW4nLFxuICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICB9LCBjb250ZW50KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUURpYWxvZyBmcm9tICcuLi9kaWFsb2cvUURpYWxvZy5qcydcbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQb3B1cFByb3h5JyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFuY2hvclByb3BzLFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzaG93JywgJ2hpZGUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBwb3B1cFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5icmVha3BvaW50LCAxMCkpXG5cbiAgICBjb25zdCB7IGNhblNob3cgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcgfSlcblxuICAgIGZ1bmN0aW9uIGdldFR5cGUgKCkge1xuICAgICAgcmV0dXJuICRxLnNjcmVlbi53aWR0aCA8IGJyZWFrcG9pbnQudmFsdWUgfHwgJHEuc2NyZWVuLmhlaWdodCA8IGJyZWFrcG9pbnQudmFsdWVcbiAgICAgICAgPyAnZGlhbG9nJ1xuICAgICAgICA6ICdtZW51J1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSByZWYoZ2V0VHlwZSgpKVxuXG4gICAgY29uc3QgcG9wdXBQcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHR5cGUudmFsdWUgPT09ICdtZW51JyA/IHsgbWF4SGVpZ2h0OiAnOTl2aCcgfSA6IHt9KVxuICAgIClcblxuICAgIHdhdGNoKCgpID0+IGdldFR5cGUoKSwgdmFsID0+IHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHR5cGUudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25TaG93IChldnQpIHtcbiAgICAgIHNob3dpbmcudmFsdWUgPSB0cnVlXG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSGlkZSAoZXZ0KSB7XG4gICAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIHR5cGUudmFsdWUgPSBnZXRUeXBlKClcbiAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvdyAoZXZ0KSB7IGNhblNob3coZXZ0KSA9PT0gdHJ1ZSAmJiBwb3B1cFJlZi52YWx1ZS5zaG93KGV2dCkgfSxcbiAgICAgIGhpZGUgKGV2dCkgeyBwb3B1cFJlZi52YWx1ZS5oaWRlKGV2dCkgfSxcbiAgICAgIHRvZ2dsZSAoZXZ0KSB7IHBvcHVwUmVmLnZhbHVlLnRvZ2dsZShldnQpIH1cbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ2N1cnJlbnRDb21wb25lbnQnLCAoKSA9PiAoe1xuICAgICAgdHlwZTogdHlwZS52YWx1ZSxcbiAgICAgIHJlZjogcG9wdXBSZWYudmFsdWVcbiAgICB9KSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IHBvcHVwUmVmLFxuICAgICAgICAuLi5wb3B1cFByb3BzLnZhbHVlLFxuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgb25TaG93LFxuICAgICAgICBvbkhpZGVcbiAgICAgIH1cblxuICAgICAgbGV0IGNvbXBvbmVudFxuXG4gICAgICBpZiAodHlwZS52YWx1ZSA9PT0gJ2RpYWxvZycpIHtcbiAgICAgICAgY29tcG9uZW50ID0gUURpYWxvZ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudCA9IFFNZW51XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0LFxuICAgICAgICAgIGNvbnRleHRNZW51OiBwcm9wcy5jb250ZXh0TWVudSxcbiAgICAgICAgICBub1BhcmVudEV2ZW50OiB0cnVlLFxuICAgICAgICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChjb21wb25lbnQsIGRhdGEsIHNsb3RzLmRlZmF1bHQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIHdpdGhEaXJlY3RpdmVzLCBUcmFuc2l0aW9uLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcbmltcG9ydCBUb3VjaFBhbiBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RvdWNoLXBhbi9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUF0dHJzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcbmltcG9ydCB1c2VEYXRldGltZSwgeyB1c2VEYXRldGltZVByb3BzLCB1c2VEYXRldGltZUVtaXRzLCBnZXREYXlIYXNoIH0gZnJvbSAnLi4vZGF0ZS91c2UtZGF0ZXRpbWUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGZvcm1hdERhdGUsIF9fc3BsaXREYXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZGF0ZS5qcydcbmltcG9ydCB7IHBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBwYWQgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZnVuY3Rpb24gZ2V0Vmlld0J5TW9kZWwgKG1vZGVsLCB3aXRoU2Vjb25kcykge1xuICBpZiAobW9kZWwuaG91ciAhPT0gbnVsbCkge1xuICAgIGlmIChtb2RlbC5taW51dGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnbWludXRlJ1xuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoU2Vjb25kcyA9PT0gdHJ1ZSAmJiBtb2RlbC5zZWNvbmQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnc2Vjb25kJ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnaG91cidcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUgKCkge1xuICBjb25zdCBkID0gbmV3IERhdGUoKVxuXG4gIHJldHVybiB7XG4gICAgaG91cjogZC5nZXRIb3VycygpLFxuICAgIG1pbnV0ZTogZC5nZXRNaW51dGVzKCksXG4gICAgc2Vjb25kOiBkLmdldFNlY29uZHMoKSxcbiAgICBtaWxsaXNlY29uZDogZC5nZXRNaWxsaXNlY29uZHMoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGltZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuICAgIC4uLnVzZURhdGV0aW1lUHJvcHMsXG5cbiAgICBtYXNrOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIGZvcm1hdDI0aDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgZGVmYXVsdERhdGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAvXi0/W1xcZF0rXFwvWzAtMV1cXGRcXC9bMC0zXVxcZCQvLnRlc3QodilcbiAgICB9LFxuXG4gICAgb3B0aW9uczogRnVuY3Rpb24sXG4gICAgaG91ck9wdGlvbnM6IEFycmF5LFxuICAgIG1pbnV0ZU9wdGlvbnM6IEFycmF5LFxuICAgIHNlY29uZE9wdGlvbnM6IEFycmF5LFxuXG4gICAgd2l0aFNlY29uZHM6IEJvb2xlYW4sXG4gICAgbm93QnRuOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IHVzZURhdGV0aW1lRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gdm0ucHJveHlcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgdGFiaW5kZXgsIGhlYWRlckNsYXNzLCBnZXRMb2NhbGUsIGdldEN1cnJlbnREYXRlIH0gPSB1c2VEYXRldGltZShwcm9wcywgJHEpXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSB1c2VGb3JtQXR0cnMocHJvcHMpXG4gICAgY29uc3QgaW5qZWN0Rm9ybUlucHV0ID0gdXNlRm9ybUluamVjdChmb3JtQXR0cnMpXG5cbiAgICBsZXQgZHJhZ2dpbmdDbG9ja1JlY3QsIGRyYWdDYWNoZVxuXG4gICAgY29uc3QgY2xvY2tSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG1hc2sgPSBjb21wdXRlZCgoKSA9PiBnZXRNYXNrKCkpXG4gICAgY29uc3QgbG9jYWxlID0gY29tcHV0ZWQoKCkgPT4gZ2V0TG9jYWxlKCkpXG5cbiAgICBjb25zdCBkZWZhdWx0RGF0ZU1vZGVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0RGVmYXVsdERhdGVNb2RlbCgpKVxuXG4gICAgY29uc3QgbW9kZWwgPSBfX3NwbGl0RGF0ZShcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUsXG4gICAgICBtYXNrLnZhbHVlLCAvLyBpbml0aWFsIG1hc2tcbiAgICAgIGxvY2FsZS52YWx1ZSwgLy8gaW5pdGlhbCBsb2NhbGVcbiAgICAgIHByb3BzLmNhbGVuZGFyLFxuICAgICAgZGVmYXVsdERhdGVNb2RlbC52YWx1ZVxuICAgIClcblxuICAgIGNvbnN0IHZpZXcgPSByZWYoZ2V0Vmlld0J5TW9kZWwobW9kZWwpKVxuICAgIGNvbnN0IGlubmVyTW9kZWwgPSByZWYobW9kZWwpXG4gICAgY29uc3QgaXNBTSA9IHJlZihtb2RlbC5ob3VyID09PSBudWxsIHx8IG1vZGVsLmhvdXIgPCAxMilcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtdGltZSBxLXRpbWUtLSR7IHByb3BzLmxhbmRzY2FwZSA9PT0gdHJ1ZSA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JyB9YFxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRpbWUtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLXRpbWUtLXJlYWRvbmx5JyA6ICcnKSlcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLXRpbWUtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRpbWUtLXNxdWFyZSBuby1ib3JkZXItcmFkaXVzJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS10aW1lLS1mbGF0IG5vLXNoYWRvdycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHJpbmdNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWUgPSBpbm5lck1vZGVsLnZhbHVlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhvdXI6IHRpbWUuaG91ciA9PT0gbnVsbFxuICAgICAgICAgID8gJy0tJ1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBjb21wdXRlZEZvcm1hdDI0aC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gcGFkKHRpbWUuaG91cilcbiAgICAgICAgICAgICAgICA6IFN0cmluZyhcbiAgICAgICAgICAgICAgICAgIGlzQU0udmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgPyAodGltZS5ob3VyID09PSAwID8gMTIgOiB0aW1lLmhvdXIpXG4gICAgICAgICAgICAgICAgICAgIDogKHRpbWUuaG91ciA+IDEyID8gdGltZS5ob3VyIC0gMTIgOiB0aW1lLmhvdXIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgbWludXRlOiB0aW1lLm1pbnV0ZSA9PT0gbnVsbFxuICAgICAgICAgID8gJy0tJ1xuICAgICAgICAgIDogcGFkKHRpbWUubWludXRlKSxcbiAgICAgICAgc2Vjb25kOiB0aW1lLnNlY29uZCA9PT0gbnVsbFxuICAgICAgICAgID8gJy0tJ1xuICAgICAgICAgIDogcGFkKHRpbWUuc2Vjb25kKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjb21wdXRlZEZvcm1hdDI0aCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmZvcm1hdDI0aCAhPT0gbnVsbFxuICAgICAgICA/IHByb3BzLmZvcm1hdDI0aFxuICAgICAgICA6ICRxLmxhbmcuZGF0ZS5mb3JtYXQyNGhcbiAgICApKVxuXG4gICAgY29uc3QgcG9pbnRlclN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgZm9ySG91ciA9IHZpZXcudmFsdWUgPT09ICdob3VyJyxcbiAgICAgICAgZGl2aWRlciA9IGZvckhvdXIgPT09IHRydWUgPyAxMiA6IDYwLFxuICAgICAgICBhbW91bnQgPSBpbm5lck1vZGVsLnZhbHVlWyB2aWV3LnZhbHVlIF0sXG4gICAgICAgIGRlZ3JlZXMgPSBNYXRoLnJvdW5kKGFtb3VudCAqICgzNjAgLyBkaXZpZGVyKSkgLSAxODBcblxuICAgICAgbGV0IHRyYW5zZm9ybSA9IGByb3RhdGUoJHsgZGVncmVlcyB9ZGVnKSB0cmFuc2xhdGVYKC01MCUpYFxuXG4gICAgICBpZiAoXG4gICAgICAgIGZvckhvdXIgPT09IHRydWVcbiAgICAgICAgJiYgY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgaW5uZXJNb2RlbC52YWx1ZS5ob3VyID49IDEyXG4gICAgICApIHtcbiAgICAgICAgdHJhbnNmb3JtICs9ICcgc2NhbGUoLjcpJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyB0cmFuc2Zvcm0gfVxuICAgIH0pXG5cbiAgICBjb25zdCBtaW5MaW5rID0gY29tcHV0ZWQoKCkgPT4gaW5uZXJNb2RlbC52YWx1ZS5ob3VyICE9PSBudWxsKVxuICAgIGNvbnN0IHNlY0xpbmsgPSBjb21wdXRlZCgoKSA9PiBtaW5MaW5rLnZhbHVlID09PSB0cnVlICYmIGlubmVyTW9kZWwudmFsdWUubWludXRlICE9PSBudWxsKVxuXG4gICAgY29uc3QgaG91ckluU2VsZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaG91ck9wdGlvbnMgIT09IHZvaWQgMFxuICAgICAgICA/IHZhbCA9PiBwcm9wcy5ob3VyT3B0aW9ucy5pbmNsdWRlcyh2YWwpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcHJvcHMub3B0aW9ucyAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gdmFsID0+IHByb3BzLm9wdGlvbnModmFsLCBudWxsLCBudWxsKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgKSlcblxuICAgIGNvbnN0IG1pbnV0ZUluU2VsZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMubWludXRlT3B0aW9ucyAhPT0gdm9pZCAwXG4gICAgICAgID8gdmFsID0+IHByb3BzLm1pbnV0ZU9wdGlvbnMuaW5jbHVkZXModmFsKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLm9wdGlvbnMgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/IHZhbCA9PiBwcm9wcy5vcHRpb25zKGlubmVyTW9kZWwudmFsdWUuaG91ciwgdmFsLCBudWxsKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgKSlcblxuICAgIGNvbnN0IHNlY29uZEluU2VsZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2Vjb25kT3B0aW9ucyAhPT0gdm9pZCAwXG4gICAgICAgID8gdmFsID0+IHByb3BzLnNlY29uZE9wdGlvbnMuaW5jbHVkZXModmFsKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLm9wdGlvbnMgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/IHZhbCA9PiBwcm9wcy5vcHRpb25zKGlubmVyTW9kZWwudmFsdWUuaG91ciwgaW5uZXJNb2RlbC52YWx1ZS5taW51dGUsIHZhbClcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB2YWxpZEhvdXJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKGhvdXJJblNlbGVjdGlvbi52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBhbSA9IGdldFZhbGlkVmFsdWVzKDAsIDExLCBob3VySW5TZWxlY3Rpb24udmFsdWUpXG4gICAgICBjb25zdCBwbSA9IGdldFZhbGlkVmFsdWVzKDEyLCAxMSwgaG91ckluU2VsZWN0aW9uLnZhbHVlKVxuICAgICAgcmV0dXJuIHsgYW0sIHBtLCB2YWx1ZXM6IGFtLnZhbHVlcy5jb25jYXQocG0udmFsdWVzKSB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbGlkTWludXRlcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIG1pbnV0ZUluU2VsZWN0aW9uLnZhbHVlICE9PSBudWxsXG4gICAgICAgID8gZ2V0VmFsaWRWYWx1ZXMoMCwgNTksIG1pbnV0ZUluU2VsZWN0aW9uLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdmFsaWRTZWNvbmRzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Vjb25kSW5TZWxlY3Rpb24udmFsdWUgIT09IG51bGxcbiAgICAgICAgPyBnZXRWYWxpZFZhbHVlcygwLCA1OSwgc2Vjb25kSW5TZWxlY3Rpb24udmFsdWUpXG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCB2aWV3VmFsaWRPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgc3dpdGNoICh2aWV3LnZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgIHJldHVybiB2YWxpZEhvdXJzLnZhbHVlXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuIHZhbGlkTWludXRlcy52YWx1ZVxuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiB2YWxpZFNlY29uZHMudmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcG9zaXRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IHN0YXJ0LCBlbmQsIG9mZnNldCA9IDAsIHN0ZXAgPSAxXG4gICAgICBjb25zdCB2YWx1ZXMgPSB2aWV3VmFsaWRPcHRpb25zLnZhbHVlICE9PSBudWxsXG4gICAgICAgID8gdmlld1ZhbGlkT3B0aW9ucy52YWx1ZS52YWx1ZXNcbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgaWYgKHZpZXcudmFsdWUgPT09ICdob3VyJykge1xuICAgICAgICBpZiAoY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBzdGFydCA9IDBcbiAgICAgICAgICBlbmQgPSAyM1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHN0YXJ0ID0gMFxuICAgICAgICAgIGVuZCA9IDExXG5cbiAgICAgICAgICBpZiAoaXNBTS52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDEyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhcnQgPSAwXG4gICAgICAgIGVuZCA9IDU1XG4gICAgICAgIHN0ZXAgPSA1XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvcyA9IFtdXG5cbiAgICAgIGZvciAobGV0IHZhbCA9IHN0YXJ0LCBpbmRleCA9IHN0YXJ0OyB2YWwgPD0gZW5kOyB2YWwgKz0gc3RlcCwgaW5kZXgrKykge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIGFjdHVhbFZhbCA9IHZhbCArIG9mZnNldCxcbiAgICAgICAgICBkaXNhYmxlID0gdmFsdWVzICE9PSB2b2lkIDAgJiYgdmFsdWVzLmluY2x1ZGVzKGFjdHVhbFZhbCkgPT09IGZhbHNlLFxuICAgICAgICAgIGxhYmVsID0gdmlldy52YWx1ZSA9PT0gJ2hvdXInICYmIHZhbCA9PT0gMFxuICAgICAgICAgICAgPyAoY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgPT09IHRydWUgPyAnMDAnIDogJzEyJylcbiAgICAgICAgICAgIDogdmFsXG5cbiAgICAgICAgcG9zLnB1c2goeyB2YWw6IGFjdHVhbFZhbCwgaW5kZXgsIGRpc2FibGUsIGxhYmVsIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwb3NcbiAgICB9KVxuXG4gICAgY29uc3QgY2xvY2tEaXJlY3RpdmVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgb25QYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3A6IHRydWUsXG4gICAgICAgICAgcHJldmVudDogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBjb25zdCBtb2RlbCA9IF9fc3BsaXREYXRlKFxuICAgICAgICB2LFxuICAgICAgICBtYXNrLnZhbHVlLFxuICAgICAgICBsb2NhbGUudmFsdWUsXG4gICAgICAgIHByb3BzLmNhbGVuZGFyLFxuICAgICAgICBkZWZhdWx0RGF0ZU1vZGVsLnZhbHVlXG4gICAgICApXG5cbiAgICAgIGlmIChcbiAgICAgICAgbW9kZWwuZGF0ZUhhc2ggIT09IGlubmVyTW9kZWwudmFsdWUuZGF0ZUhhc2hcbiAgICAgICAgfHwgbW9kZWwudGltZUhhc2ggIT09IGlubmVyTW9kZWwudmFsdWUudGltZUhhc2hcbiAgICAgICkge1xuICAgICAgICBpbm5lck1vZGVsLnZhbHVlID0gbW9kZWxcblxuICAgICAgICBpZiAobW9kZWwuaG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgIHZpZXcudmFsdWUgPSAnaG91cidcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpc0FNLnZhbHVlID0gbW9kZWwuaG91ciA8IDEyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goWyBtYXNrLCBsb2NhbGUgXSwgKCkgPT4ge1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB1cGRhdGVWYWx1ZSgpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBzZXROb3cgKCkge1xuICAgICAgY29uc3QgZGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Q3VycmVudERhdGUoKSxcbiAgICAgICAgLi4uZ2V0Q3VycmVudFRpbWUoKVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVWYWx1ZShkYXRlKVxuICAgICAgT2JqZWN0LmFzc2lnbihpbm5lck1vZGVsLnZhbHVlLCBkYXRlKSAvLyByZXNldCBhbnkgcGVuZGluZyBjaGFuZ2VzIHRvIGlubmVyTW9kZWxcblxuICAgICAgdmlldy52YWx1ZSA9ICdob3VyJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZhbGlkVmFsdWVzIChzdGFydCwgY291bnQsIHRlc3RGbikge1xuICAgICAgY29uc3QgdmFsdWVzID0gQXJyYXkuYXBwbHkobnVsbCwgeyBsZW5ndGg6IGNvdW50ICsgMSB9KVxuICAgICAgICAubWFwKChfLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSBpbmRleCArIHN0YXJ0XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgdmFsOiB0ZXN0Rm4oaSkgPT09IHRydWUgLy8gZm9yY2UgYm9vbGVhblxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcih2ID0+IHYudmFsID09PSB0cnVlKVxuICAgICAgICAubWFwKHYgPT4gdi5pbmRleClcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluOiB2YWx1ZXNbIDAgXSxcbiAgICAgICAgbWF4OiB2YWx1ZXNbIHZhbHVlcy5sZW5ndGggLSAxIF0sXG4gICAgICAgIHZhbHVlcyxcbiAgICAgICAgdGhyZXNob2xkOiBjb3VudCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXaGVlbERpc3QgKGEsIGIsIHRocmVzaG9sZCkge1xuICAgICAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGEgLSBiKVxuICAgICAgcmV0dXJuIE1hdGgubWluKGRpZmYsIHRocmVzaG9sZCAtIGRpZmYpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZENsb2NrVmFsdWUgKHZhbCwgeyBtaW4sIG1heCwgdmFsdWVzLCB0aHJlc2hvbGQgfSkge1xuICAgICAgaWYgKHZhbCA9PT0gbWluKSB7XG4gICAgICAgIHJldHVybiBtaW5cbiAgICAgIH1cblxuICAgICAgaWYgKHZhbCA8IG1pbiB8fCB2YWwgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIGdldFdoZWVsRGlzdCh2YWwsIG1pbiwgdGhyZXNob2xkKSA8PSBnZXRXaGVlbERpc3QodmFsLCBtYXgsIHRocmVzaG9sZClcbiAgICAgICAgICA/IG1pblxuICAgICAgICAgIDogbWF4XG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGluZGV4ID0gdmFsdWVzLmZpbmRJbmRleCh2ID0+IHZhbCA8PSB2KSxcbiAgICAgICAgYmVmb3JlID0gdmFsdWVzWyBpbmRleCAtIDEgXSxcbiAgICAgICAgYWZ0ZXIgPSB2YWx1ZXNbIGluZGV4IF1cblxuICAgICAgcmV0dXJuIHZhbCAtIGJlZm9yZSA8PSBhZnRlciAtIHZhbFxuICAgICAgICA/IGJlZm9yZVxuICAgICAgICA6IGFmdGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWFzayAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMuY2FsZW5kYXIgIT09ICdwZXJzaWFuJyAmJiBwcm9wcy5tYXNrICE9PSBudWxsXG4gICAgICAgID8gcHJvcHMubWFza1xuICAgICAgICA6IGBISDptbSR7IHByb3BzLndpdGhTZWNvbmRzID09PSB0cnVlID8gJzpzcycgOiAnJyB9YFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERlZmF1bHREYXRlTW9kZWwgKCkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy5kZWZhdWx0RGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGdldEN1cnJlbnREYXRlKHRydWUpXG4gICAgICAgIGRhdGUuZGF0ZUhhc2ggPSBnZXREYXlIYXNoKGRhdGUpXG4gICAgICAgIHJldHVybiBkYXRlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfX3NwbGl0RGF0ZShwcm9wcy5kZWZhdWx0RGF0ZSwgJ1lZWVkvTU0vREQnLCB2b2lkIDAsIHByb3BzLmNhbGVuZGFyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEFib3J0SW50ZXJhY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZtSXNEZXN0cm95ZWQodm0pID09PSB0cnVlXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgbGltaXRlZCBvcHRpb25zLCBjYW4gd2UgYWN0dWFsbHkgc2V0IGFueT9cbiAgICAgICAgfHwgKFxuICAgICAgICAgIHZpZXdWYWxpZE9wdGlvbnMudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiAoXG4gICAgICAgICAgICB2aWV3VmFsaWRPcHRpb25zLnZhbHVlLnZhbHVlcy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgIHx8IChcbiAgICAgICAgICAgICAgdmlldy52YWx1ZSA9PT0gJ2hvdXInICYmIGNvbXB1dGVkRm9ybWF0MjRoLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICAgICAgICYmIHZhbGlkSG91cnMudmFsdWVbIGlzQU0udmFsdWUgPT09IHRydWUgPyAnYW0nIDogJ3BtJyBdLnZhbHVlcy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDbG9ja1JlY3QgKCkge1xuICAgICAgY29uc3RcbiAgICAgICAgY2xvY2sgPSBjbG9ja1JlZi52YWx1ZSxcbiAgICAgICAgeyB0b3AsIGxlZnQsIHdpZHRoIH0gPSBjbG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgZGlzdCA9IHdpZHRoIC8gMlxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRvcCArIGRpc3QsXG4gICAgICAgIGxlZnQ6IGxlZnQgKyBkaXN0LFxuICAgICAgICBkaXN0OiBkaXN0ICogMC43XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYW4gKGV2ZW50KSB7XG4gICAgICBpZiAoc2hvdWxkQWJvcnRJbnRlcmFjdGlvbigpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBkcmFnZ2luZ0Nsb2NrUmVjdCA9IGdldENsb2NrUmVjdCgpXG4gICAgICAgIGRyYWdDYWNoZSA9IHVwZGF0ZUNsb2NrKGV2ZW50LmV2dCwgZHJhZ2dpbmdDbG9ja1JlY3QpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBkcmFnQ2FjaGUgPSB1cGRhdGVDbG9jayhldmVudC5ldnQsIGRyYWdnaW5nQ2xvY2tSZWN0LCBkcmFnQ2FjaGUpXG5cbiAgICAgIGlmIChldmVudC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGRyYWdnaW5nQ2xvY2tSZWN0ID0gZmFsc2VcbiAgICAgICAgZHJhZ0NhY2hlID0gbnVsbFxuICAgICAgICBnb1RvTmV4dFZpZXcoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvVG9OZXh0VmlldyAoKSB7XG4gICAgICBpZiAodmlldy52YWx1ZSA9PT0gJ2hvdXInKSB7XG4gICAgICAgIHZpZXcudmFsdWUgPSAnbWludXRlJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMud2l0aFNlY29uZHMgJiYgdmlldy52YWx1ZSA9PT0gJ21pbnV0ZScpIHtcbiAgICAgICAgdmlldy52YWx1ZSA9ICdzZWNvbmQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xvY2sgKGV2dCwgY2xvY2tSZWN0LCBjYWNoZVZhbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgcG9zID0gcG9zaXRpb24oZXZ0KSxcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMocG9zLnRvcCAtIGNsb2NrUmVjdC50b3ApLFxuICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICBNYXRoLnBvdyhNYXRoLmFicyhwb3MudG9wIC0gY2xvY2tSZWN0LnRvcCksIDIpXG4gICAgICAgICAgKyBNYXRoLnBvdyhNYXRoLmFicyhwb3MubGVmdCAtIGNsb2NrUmVjdC5sZWZ0KSwgMilcbiAgICAgICAgKVxuXG4gICAgICBsZXRcbiAgICAgICAgdmFsLFxuICAgICAgICBhbmdsZSA9IE1hdGguYXNpbihoZWlnaHQgLyBkaXN0YW5jZSkgKiAoMTgwIC8gTWF0aC5QSSlcblxuICAgICAgaWYgKHBvcy50b3AgPCBjbG9ja1JlY3QudG9wKSB7XG4gICAgICAgIGFuZ2xlID0gY2xvY2tSZWN0LmxlZnQgPCBwb3MubGVmdCA/IDkwIC0gYW5nbGUgOiAyNzAgKyBhbmdsZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFuZ2xlID0gY2xvY2tSZWN0LmxlZnQgPCBwb3MubGVmdCA/IGFuZ2xlICsgOTAgOiAyNzAgLSBhbmdsZVxuICAgICAgfVxuXG4gICAgICBpZiAodmlldy52YWx1ZSA9PT0gJ2hvdXInKSB7XG4gICAgICAgIHZhbCA9IGFuZ2xlIC8gMzBcblxuICAgICAgICBpZiAodmFsaWRIb3Vycy52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGFtID0gY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgIT09IHRydWVcbiAgICAgICAgICAgID8gaXNBTS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgdmFsaWRIb3Vycy52YWx1ZS5hbS52YWx1ZXMubGVuZ3RoICE9PSAwICYmIHZhbGlkSG91cnMudmFsdWUucG0udmFsdWVzLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgICAgICAgPyBkaXN0YW5jZSA+PSBjbG9ja1JlY3QuZGlzdFxuICAgICAgICAgICAgICAgICAgOiB2YWxpZEhvdXJzLnZhbHVlLmFtLnZhbHVlcy5sZW5ndGggIT09IDBcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgdmFsID0gZ2V0Tm9ybWFsaXplZENsb2NrVmFsdWUoXG4gICAgICAgICAgICB2YWwgKyAoYW0gPT09IHRydWUgPyAwIDogMTIpLFxuICAgICAgICAgICAgdmFsaWRIb3Vycy52YWx1ZVsgYW0gPT09IHRydWUgPyAnYW0nIDogJ3BtJyBdXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbCA9IE1hdGgucm91bmQodmFsKVxuXG4gICAgICAgICAgaWYgKGNvbXB1dGVkRm9ybWF0MjRoLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBjbG9ja1JlY3QuZGlzdCkge1xuICAgICAgICAgICAgICBpZiAodmFsIDwgMTIpIHtcbiAgICAgICAgICAgICAgICB2YWwgKz0gMTJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsID09PSAxMikge1xuICAgICAgICAgICAgICB2YWwgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGlzQU0udmFsdWUgPT09IHRydWUgJiYgdmFsID09PSAxMikge1xuICAgICAgICAgICAgdmFsID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChpc0FNLnZhbHVlID09PSBmYWxzZSAmJiB2YWwgIT09IDEyKSB7XG4gICAgICAgICAgICB2YWwgKz0gMTJcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBpc0FNLnZhbHVlID0gdmFsIDwgMTJcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhbCA9IE1hdGgucm91bmQoYW5nbGUgLyA2KSAlIDYwXG5cbiAgICAgICAgaWYgKHZpZXcudmFsdWUgPT09ICdtaW51dGUnICYmIHZhbGlkTWludXRlcy52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhbCA9IGdldE5vcm1hbGl6ZWRDbG9ja1ZhbHVlKHZhbCwgdmFsaWRNaW51dGVzLnZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZXcudmFsdWUgPT09ICdzZWNvbmQnICYmIHZhbGlkU2Vjb25kcy52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhbCA9IGdldE5vcm1hbGl6ZWRDbG9ja1ZhbHVlKHZhbCwgdmFsaWRTZWNvbmRzLnZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWNoZVZhbCAhPT0gdmFsKSB7XG4gICAgICAgIHNldE1vZGVsWyB2aWV3LnZhbHVlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuXG4gICAgY29uc3Qgc2V0VmlldyA9IHtcbiAgICAgIGhvdXIgKCkgeyB2aWV3LnZhbHVlID0gJ2hvdXInIH0sXG4gICAgICBtaW51dGUgKCkgeyB2aWV3LnZhbHVlID0gJ21pbnV0ZScgfSxcbiAgICAgIHNlY29uZCAoKSB7IHZpZXcudmFsdWUgPSAnc2Vjb25kJyB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QW1PbktleSAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiBzZXRBbSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UG1PbktleSAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiBzZXRQbSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZXZ0KSB7XG4gICAgICBpZiAoc2hvdWxkQWJvcnRJbnRlcmFjdGlvbigpICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIG9uTW91c2Vkb3duKCkgaGFzIGFscmVhZHkgdXBkYXRlZCB0aGUgb2Zmc2V0XG4gICAgICAgIC8vIChvbiBkZXNrdG9wIG9ubHksIHRocm91Z2ggbW91c2Vkb3duIGV2ZW50KVxuICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuZGVza3RvcCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHVwZGF0ZUNsb2NrKGV2dCwgZ2V0Q2xvY2tSZWN0KCkpXG4gICAgICAgIH1cblxuICAgICAgICBnb1RvTmV4dFZpZXcoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2Vkb3duIChldnQpIHtcbiAgICAgIGlmIChzaG91bGRBYm9ydEludGVyYWN0aW9uKCkgIT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlQ2xvY2soZXZ0LCBnZXRDbG9ja1JlY3QoKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleXVwSG91ciAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgLy8gRU5URVJcbiAgICAgICAgdmlldy52YWx1ZSA9ICdob3VyJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoWyAzNywgMzkgXS5pbmNsdWRlcyhlLmtleUNvZGUpKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBlLmtleUNvZGUgPT09IDM3ID8gLTEgOiAxXG5cbiAgICAgICAgaWYgKHZhbGlkSG91cnMudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBjb21wdXRlZEZvcm1hdDI0aC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB2YWxpZEhvdXJzLnZhbHVlLnZhbHVlc1xuICAgICAgICAgICAgOiB2YWxpZEhvdXJzLnZhbHVlWyBpc0FNLnZhbHVlID09PSB0cnVlID8gJ2FtJyA6ICdwbScgXS52YWx1ZXNcblxuICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAgICAgICAgIGlmIChpbm5lck1vZGVsLnZhbHVlLmhvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNldEhvdXIodmFsdWVzWyAwIF0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAoXG4gICAgICAgICAgICAgIHZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgKyB2YWx1ZXMuaW5kZXhPZihpbm5lck1vZGVsLnZhbHVlLmhvdXIpXG4gICAgICAgICAgICAgICsgcGF5bG9hZFxuICAgICAgICAgICAgKSAlIHZhbHVlcy5sZW5ndGhcblxuICAgICAgICAgICAgc2V0SG91cih2YWx1ZXNbIGluZGV4IF0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICB3cmFwID0gY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgPT09IHRydWUgPyAyNCA6IDEyLFxuICAgICAgICAgICAgb2Zmc2V0ID0gY29tcHV0ZWRGb3JtYXQyNGgudmFsdWUgIT09IHRydWUgJiYgaXNBTS52YWx1ZSA9PT0gZmFsc2UgPyAxMiA6IDAsXG4gICAgICAgICAgICB2YWwgPSBpbm5lck1vZGVsLnZhbHVlLmhvdXIgPT09IG51bGwgPyAtcGF5bG9hZCA6IGlubmVyTW9kZWwudmFsdWUuaG91clxuXG4gICAgICAgICAgc2V0SG91cihvZmZzZXQgKyAoMjQgKyB2YWwgKyBwYXlsb2FkKSAlIHdyYXApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleXVwTWludXRlIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAvLyBFTlRFUlxuICAgICAgICB2aWV3LnZhbHVlID0gJ21pbnV0ZSdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKFsgMzcsIDM5IF0uaW5jbHVkZXMoZS5rZXlDb2RlKSkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gZS5rZXlDb2RlID09PSAzNyA/IC0xIDogMVxuXG4gICAgICAgIGlmICh2YWxpZE1pbnV0ZXMudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB2YWxpZE1pbnV0ZXMudmFsdWUudmFsdWVzXG5cbiAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgICAgICAgICBpZiAoaW5uZXJNb2RlbC52YWx1ZS5taW51dGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNldE1pbnV0ZSh2YWx1ZXNbIDAgXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IChcbiAgICAgICAgICAgICAgdmFsdWVzLmxlbmd0aFxuICAgICAgICAgICAgICArIHZhbHVlcy5pbmRleE9mKGlubmVyTW9kZWwudmFsdWUubWludXRlKVxuICAgICAgICAgICAgICArIHBheWxvYWRcbiAgICAgICAgICAgICkgJSB2YWx1ZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIHNldE1pbnV0ZSh2YWx1ZXNbIGluZGV4IF0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IGlubmVyTW9kZWwudmFsdWUubWludXRlID09PSBudWxsID8gLXBheWxvYWQgOiBpbm5lck1vZGVsLnZhbHVlLm1pbnV0ZVxuICAgICAgICAgIHNldE1pbnV0ZSgoNjAgKyB2YWwgKyBwYXlsb2FkKSAlIDYwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cFNlY29uZCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgLy8gRU5URVJcbiAgICAgICAgdmlldy52YWx1ZSA9ICdzZWNvbmQnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChbIDM3LCAzOSBdLmluY2x1ZGVzKGUua2V5Q29kZSkpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGUua2V5Q29kZSA9PT0gMzcgPyAtMSA6IDFcblxuICAgICAgICBpZiAodmFsaWRTZWNvbmRzLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gdmFsaWRTZWNvbmRzLnZhbHVlLnZhbHVlc1xuXG4gICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gICAgICAgICAgaWYgKGlubmVyTW9kZWwudmFsdWUuc2Vjb25kcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0U2Vjb25kKHZhbHVlc1sgMCBdKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKFxuICAgICAgICAgICAgICB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICsgdmFsdWVzLmluZGV4T2YoaW5uZXJNb2RlbC52YWx1ZS5zZWNvbmQpXG4gICAgICAgICAgICAgICsgcGF5bG9hZFxuICAgICAgICAgICAgKSAlIHZhbHVlcy5sZW5ndGhcblxuICAgICAgICAgICAgc2V0U2Vjb25kKHZhbHVlc1sgaW5kZXggXSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgdmFsID0gaW5uZXJNb2RlbC52YWx1ZS5zZWNvbmQgPT09IG51bGwgPyAtcGF5bG9hZCA6IGlubmVyTW9kZWwudmFsdWUuc2Vjb25kXG4gICAgICAgICAgc2V0U2Vjb25kKCg2MCArIHZhbCArIHBheWxvYWQpICUgNjApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRIb3VyIChob3VyKSB7XG4gICAgICBpZiAoaW5uZXJNb2RlbC52YWx1ZS5ob3VyICE9PSBob3VyKSB7XG4gICAgICAgIGlubmVyTW9kZWwudmFsdWUuaG91ciA9IGhvdXJcbiAgICAgICAgdmVyaWZ5QW5kVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRNaW51dGUgKG1pbnV0ZSkge1xuICAgICAgaWYgKGlubmVyTW9kZWwudmFsdWUubWludXRlICE9PSBtaW51dGUpIHtcbiAgICAgICAgaW5uZXJNb2RlbC52YWx1ZS5taW51dGUgPSBtaW51dGVcbiAgICAgICAgdmVyaWZ5QW5kVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWNvbmQgKHNlY29uZCkge1xuICAgICAgaWYgKGlubmVyTW9kZWwudmFsdWUuc2Vjb25kICE9PSBzZWNvbmQpIHtcbiAgICAgICAgaW5uZXJNb2RlbC52YWx1ZS5zZWNvbmQgPSBzZWNvbmRcbiAgICAgICAgdmVyaWZ5QW5kVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRNb2RlbCA9IHtcbiAgICAgIGhvdXI6IHNldEhvdXIsXG4gICAgICBtaW51dGU6IHNldE1pbnV0ZSxcbiAgICAgIHNlY29uZDogc2V0U2Vjb25kXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QW0gKCkge1xuICAgICAgaWYgKGlzQU0udmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlzQU0udmFsdWUgPSB0cnVlXG5cbiAgICAgICAgaWYgKGlubmVyTW9kZWwudmFsdWUuaG91ciAhPT0gbnVsbCkge1xuICAgICAgICAgIGlubmVyTW9kZWwudmFsdWUuaG91ciAtPSAxMlxuICAgICAgICAgIHZlcmlmeUFuZFVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQbSAoKSB7XG4gICAgICBpZiAoaXNBTS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpc0FNLnZhbHVlID0gZmFsc2VcblxuICAgICAgICBpZiAoaW5uZXJNb2RlbC52YWx1ZS5ob3VyICE9PSBudWxsKSB7XG4gICAgICAgICAgaW5uZXJNb2RlbC52YWx1ZS5ob3VyICs9IDEyXG4gICAgICAgICAgdmVyaWZ5QW5kVXBkYXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvVG9WaWV3V2hlbkhhc01vZGVsIChuZXdWaWV3KSB7XG4gICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIGlmIChcbiAgICAgICAgdmlldy52YWx1ZSAhPT0gbmV3Vmlld1xuICAgICAgICAmJiBtb2RlbCAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1vZGVsICE9PSBudWxsXG4gICAgICAgICYmIG1vZGVsICE9PSAnJ1xuICAgICAgICAmJiB0eXBlb2YgbW9kZWwgIT09ICdzdHJpbmcnXG4gICAgICApIHtcbiAgICAgICAgdmlldy52YWx1ZSA9IG5ld1ZpZXdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlBbmRVcGRhdGUgKCkge1xuICAgICAgaWYgKGhvdXJJblNlbGVjdGlvbi52YWx1ZSAhPT0gbnVsbCAmJiBob3VySW5TZWxlY3Rpb24udmFsdWUoaW5uZXJNb2RlbC52YWx1ZS5ob3VyKSAhPT0gdHJ1ZSkge1xuICAgICAgICBpbm5lck1vZGVsLnZhbHVlID0gX19zcGxpdERhdGUoKVxuICAgICAgICBnb1RvVmlld1doZW5IYXNNb2RlbCgnaG91cicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobWludXRlSW5TZWxlY3Rpb24udmFsdWUgIT09IG51bGwgJiYgbWludXRlSW5TZWxlY3Rpb24udmFsdWUoaW5uZXJNb2RlbC52YWx1ZS5taW51dGUpICE9PSB0cnVlKSB7XG4gICAgICAgIGlubmVyTW9kZWwudmFsdWUubWludXRlID0gbnVsbFxuICAgICAgICBpbm5lck1vZGVsLnZhbHVlLnNlY29uZCA9IG51bGxcbiAgICAgICAgZ29Ub1ZpZXdXaGVuSGFzTW9kZWwoJ21pbnV0ZScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMud2l0aFNlY29uZHMgPT09IHRydWUgJiYgc2Vjb25kSW5TZWxlY3Rpb24udmFsdWUgIT09IG51bGwgJiYgc2Vjb25kSW5TZWxlY3Rpb24udmFsdWUoaW5uZXJNb2RlbC52YWx1ZS5zZWNvbmQpICE9PSB0cnVlKSB7XG4gICAgICAgIGlubmVyTW9kZWwudmFsdWUuc2Vjb25kID0gbnVsbFxuICAgICAgICBnb1RvVmlld1doZW5IYXNNb2RlbCgnc2Vjb25kJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbm5lck1vZGVsLnZhbHVlLmhvdXIgPT09IG51bGwgfHwgaW5uZXJNb2RlbC52YWx1ZS5taW51dGUgPT09IG51bGwgfHwgKHByb3BzLndpdGhTZWNvbmRzID09PSB0cnVlICYmIGlubmVyTW9kZWwudmFsdWUuc2Vjb25kID09PSBudWxsKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlVmFsdWUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZhbHVlIChvYmopIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBPYmplY3QuYXNzaWduKHsgLi4uaW5uZXJNb2RlbC52YWx1ZSB9LCBvYmopXG5cbiAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmNhbGVuZGFyID09PSAncGVyc2lhbidcbiAgICAgICAgPyBwYWQoZGF0ZS5ob3VyKSArICc6J1xuICAgICAgICAgICsgcGFkKGRhdGUubWludXRlKVxuICAgICAgICAgICsgKHByb3BzLndpdGhTZWNvbmRzID09PSB0cnVlID8gJzonICsgcGFkKGRhdGUuc2Vjb25kKSA6ICcnKVxuICAgICAgICA6IGZvcm1hdERhdGUoXG4gICAgICAgICAgbmV3IERhdGUoXG4gICAgICAgICAgICBkYXRlLnllYXIsXG4gICAgICAgICAgICBkYXRlLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGRhdGUubW9udGggLSAxLFxuICAgICAgICAgICAgZGF0ZS5kYXksXG4gICAgICAgICAgICBkYXRlLmhvdXIsXG4gICAgICAgICAgICBkYXRlLm1pbnV0ZSxcbiAgICAgICAgICAgIGRhdGUuc2Vjb25kLFxuICAgICAgICAgICAgZGF0ZS5taWxsaXNlY29uZFxuICAgICAgICAgICksXG4gICAgICAgICAgbWFzay52YWx1ZSxcbiAgICAgICAgICBsb2NhbGUudmFsdWUsXG4gICAgICAgICAgZGF0ZS55ZWFyLFxuICAgICAgICAgIGRhdGUudGltZXpvbmVPZmZzZXRcbiAgICAgICAgKVxuXG4gICAgICBkYXRlLmNoYW5nZWQgPSB2YWwgIT09IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsLCBkYXRlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlciAoKSB7XG4gICAgICBjb25zdCBsYWJlbCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10aW1lX19saW5rICdcbiAgICAgICAgICAgICsgKHZpZXcudmFsdWUgPT09ICdob3VyJyA/ICdxLXRpbWVfX2xpbmstLWFjdGl2ZScgOiAnY3Vyc29yLXBvaW50ZXInKSxcbiAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgb25DbGljazogc2V0Vmlldy5ob3VyLFxuICAgICAgICAgIG9uS2V5dXA6IG9uS2V5dXBIb3VyXG4gICAgICAgIH0sIHN0cmluZ01vZGVsLnZhbHVlLmhvdXIpLFxuXG4gICAgICAgIGgoJ2RpdicsICc6JyksXG5cbiAgICAgICAgaChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICBtaW5MaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtdGltZV9fbGluayAnXG4gICAgICAgICAgICAgICAgKyAodmlldy52YWx1ZSA9PT0gJ21pbnV0ZScgPyAncS10aW1lX19saW5rLS1hY3RpdmUnIDogJ2N1cnNvci1wb2ludGVyJyksXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICAgIG9uS2V5dXA6IG9uS2V5dXBNaW51dGUsXG4gICAgICAgICAgICAgICAgb25DbGljazogc2V0Vmlldy5taW51dGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7IGNsYXNzOiAncS10aW1lX19saW5rJyB9LFxuICAgICAgICAgIHN0cmluZ01vZGVsLnZhbHVlLm1pbnV0ZVxuICAgICAgICApXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy53aXRoU2Vjb25kcyA9PT0gdHJ1ZSkge1xuICAgICAgICBsYWJlbC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsICc6JyksXG5cbiAgICAgICAgICBoKFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICBzZWNMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdxLXRpbWVfX2xpbmsgJ1xuICAgICAgICAgICAgICAgICAgKyAodmlldy52YWx1ZSA9PT0gJ3NlY29uZCcgPyAncS10aW1lX19saW5rLS1hY3RpdmUnIDogJ2N1cnNvci1wb2ludGVyJyksXG4gICAgICAgICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICAgICAgICBvbktleXVwOiBvbktleXVwU2Vjb25kLFxuICAgICAgICAgICAgICAgICAgb25DbGljazogc2V0Vmlldy5zZWNvbmRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogeyBjbGFzczogJ3EtdGltZV9fbGluaycgfSxcbiAgICAgICAgICAgIHN0cmluZ01vZGVsLnZhbHVlLnNlY29uZFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10aW1lX19oZWFkZXItbGFiZWwgcm93IGl0ZW1zLWNlbnRlciBuby13cmFwJyxcbiAgICAgICAgICBkaXI6ICdsdHInXG4gICAgICAgIH0sIGxhYmVsKVxuICAgICAgXVxuXG4gICAgICBjb21wdXRlZEZvcm1hdDI0aC52YWx1ZSA9PT0gZmFsc2UgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10aW1lX19oZWFkZXItYW1wbSBjb2x1bW4gaXRlbXMtYmV0d2VlbiBuby13cmFwJ1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXRpbWVfX2xpbmsgJ1xuICAgICAgICAgICAgICArIChpc0FNLnZhbHVlID09PSB0cnVlID8gJ3EtdGltZV9fbGluay0tYWN0aXZlJyA6ICdjdXJzb3ItcG9pbnRlcicpLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgb25DbGljazogc2V0QW0sXG4gICAgICAgICAgICBvbktleXVwOiBzZXRBbU9uS2V5XG4gICAgICAgICAgfSwgJ0FNJyksXG5cbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdGltZV9fbGluayAnXG4gICAgICAgICAgICAgICsgKGlzQU0udmFsdWUgIT09IHRydWUgPyAncS10aW1lX19saW5rLS1hY3RpdmUnIDogJ2N1cnNvci1wb2ludGVyJyksXG4gICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICBvbkNsaWNrOiBzZXRQbSxcbiAgICAgICAgICAgIG9uS2V5dXA6IHNldFBtT25LZXlcbiAgICAgICAgICB9LCAnUE0nKVxuICAgICAgICBdKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtdGltZV9faGVhZGVyIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCAnICsgaGVhZGVyQ2xhc3MudmFsdWVcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENsb2NrICgpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBpbm5lck1vZGVsLnZhbHVlWyB2aWV3LnZhbHVlIF1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXRpbWVfX2NvbnRlbnQgY29sIHJlbGF0aXZlLXBvc2l0aW9uJ1xuICAgICAgfSwgW1xuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1zY2FsZSdcbiAgICAgICAgfSwgKCkgPT4gaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2Nsb2NrJyArIHZpZXcudmFsdWUsXG4gICAgICAgICAgY2xhc3M6ICdxLXRpbWVfX2NvbnRhaW5lci1wYXJlbnQgYWJzb2x1dGUtZnVsbCdcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogY2xvY2tSZWYsXG4gICAgICAgICAgICBjbGFzczogJ3EtdGltZV9fY29udGFpbmVyLWNoaWxkIGZpdCBvdmVyZmxvdy1oaWRkZW4nXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtdGltZV9fY2xvY2sgY3Vyc29yLXBvaW50ZXIgbm9uLXNlbGVjdGFibGUnLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgb25Nb3VzZWRvd25cbiAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRpbWVfX2Nsb2NrLWNpcmNsZSBmaXQnIH0sIFtcbiAgICAgICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdxLXRpbWVfX2Nsb2NrLXBvaW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgKyAoaW5uZXJNb2RlbC52YWx1ZVsgdmlldy52YWx1ZSBdID09PSBudWxsID8gJyBoaWRkZW4nIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJykpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogcG9pbnRlclN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnZhbHVlLm1hcChwb3MgPT4gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgICBjbGFzczogYHEtdGltZV9fY2xvY2stcG9zaXRpb24gcm93IGZsZXgtY2VudGVyIHEtdGltZV9fY2xvY2stcG9zLSR7IHBvcy5pbmRleCB9YFxuICAgICAgICAgICAgICAgICAgICAgICsgKHBvcy52YWwgPT09IGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJyBxLXRpbWVfX2Nsb2NrLXBvc2l0aW9uLS1hY3RpdmUgJyArIGhlYWRlckNsYXNzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChwb3MuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS10aW1lX19jbG9jay1wb3NpdGlvbi0tZGlzYWJsZScgOiAnJykpXG4gICAgICAgICAgICAgICAgICB9LCBbIGgoJ3NwYW4nLCBwb3MubGFiZWwpIF0pKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBjbG9ja0RpcmVjdGl2ZXMudmFsdWVcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdKSksXG5cbiAgICAgICAgcHJvcHMubm93QnRuID09PSB0cnVlID8gaChRQnRuLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRpbWVfX25vdy1idXR0b24gYWJzb2x1dGUnLFxuICAgICAgICAgIGljb246ICRxLmljb25TZXQuZGF0ZXRpbWUubm93LFxuICAgICAgICAgIHVuZWxldmF0ZWQ6IHRydWUsXG4gICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgdGV4dENvbG9yOiBwcm9wcy50ZXh0Q29sb3IsXG4gICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHNldE5vd1xuICAgICAgICB9KSA6IG51bGxcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RcbiAgICB2bS5wcm94eS5zZXROb3cgPSBzZXROb3dcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFsgZ2V0Q2xvY2soKSBdXG5cbiAgICAgIGNvbnN0IGRlZiA9IGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICBkZWYgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10aW1lX19hY3Rpb25zJyB9LCBkZWYpXG4gICAgICApXG5cbiAgICAgIGlmIChwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RGb3JtSW5wdXQoY2hpbGQsICdwdXNoJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgW1xuICAgICAgICBnZXRIZWFkZXIoKSxcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGltZV9fbWFpbiBjb2wgb3ZlcmZsb3ctYXV0bycgfSwgY2hpbGQpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxzLCBnZXRQb3J0YWxQcm94eSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG4vKlxuICogZGVwdGhcbiAqICAgPCAwICAtLT4gY2xvc2UgYWxsIGNoYWluXG4gKiAgIDAgICAgLS0+IGRpc2FibGVkXG4gKiAgID4gMCAgLS0+IGNsb3NlIGNoYWluIHVwIHRvIE4gcGFyZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVwdGggKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNvbnN0IGRlcHRoID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuICByZXR1cm4gaXNOYU4oZGVwdGgpID8gMCA6IGRlcHRoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdjbG9zZS1wb3B1cCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnY2xvc2UtcG9wdXAnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgZGVwdGg6IGdldERlcHRoKHZhbHVlKSxcblxuICAgICAgICAgIGhhbmRsZXIgKGV2dCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgQGNsaWNrIHRvIGJlIGVtaXR0ZWRcbiAgICAgICAgICAgIGN0eC5kZXB0aCAhPT0gMCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBnZXRQb3J0YWxQcm94eShlbClcbiAgICAgICAgICAgICAgaWYgKHByb3h5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcnRhbHMocHJveHksIGV2dCwgY3R4LmRlcHRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBoYW5kbGVyS2V5IChldnQpIHtcbiAgICAgICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xY2xvc2Vwb3B1cCA9IGN0eFxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgZWwuX19xY2xvc2Vwb3B1cC5kZXB0aCA9IGdldERlcHRoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICAgIGRlbGV0ZSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgZmxleCBmbGV4LXJvdyBnYXAtMlwiPlxyXG4gICAgPHEtaW5wdXQgOmRlbnNlPVwiZGVuc2VcIiBmbGF0IHYtbW9kZWw9XCJ2YWxcIiA6bGFiZWw9XCJsYWJlbFwiIGNsYXNzPVwidy1mdWxsXCI+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cclxuICAgICAgICA8cS1pY29uIG5hbWU9XCJldmVudFwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgIDxxLXBvcHVwLXByb3h5IGNvdmVyIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCIgdHJhbnNpdGlvbi1oaWRlPVwic2NhbGVcIj5cclxuICAgICAgICAgICAgPHEtZGF0ZVxyXG4gICAgICAgICAgICAgIHRvZGF5LWJ0blxyXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ2YWxcIlxyXG4gICAgICAgICAgICAgIG1hc2s9XCJZWVlZLU1NLUREIEhIOm1tXCJcclxuICAgICAgICAgICAgICA6b3B0aW9ucz1cIlxyXG4gICAgICAgICAgICAgICAgKGRhdGUpID0+IGRhdGUgPiBtaW5pbXVtICYmIChtYXhpbXVtID09ICcnIHx8IGRhdGUgPCBtYXhpbXVtKVxyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHEtYnRuIHYtY2xvc2UtcG9wdXAgbGFiZWw9XCJDbG9zZVwiIGNvbG9yPVwicHJpbWFyeVwiIGZsYXQgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9xLWRhdGU+XHJcbiAgICAgICAgICA8L3EtcG9wdXAtcHJveHk+XHJcbiAgICAgICAgPC9xLWljb24+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICA8cS1pY29uIG5hbWU9XCJhY2Nlc3NfdGltZVwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cclxuICAgICAgICAgIDxxLXBvcHVwLXByb3h5IGNvdmVyIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCIgdHJhbnNpdGlvbi1oaWRlPVwic2NhbGVcIj5cclxuICAgICAgICAgICAgPHEtdGltZSB2LW1vZGVsPVwidmFsXCIgbWFzaz1cIllZWVktTU0tREQgSEg6bW1cIiBmb3JtYXQyNGg+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgICAgICAgIDxxLWJ0biB2LWNsb3NlLXBvcHVwIGxhYmVsPVwiQ2xvc2VcIiBjb2xvcj1cInByaW1hcnlcIiBmbGF0IC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcS10aW1lPlxyXG4gICAgICAgICAgPC9xLXBvcHVwLXByb3h5PlxyXG4gICAgICAgIDwvcS1pY29uPlxyXG4gICAgICAgIDxxLWljb24gQGNsaWNrPVwidmFsID0gJydcIiBuYW1lPVwiY2xvc2VcIj48L3EtaWNvbj5cclxuICAgICAgPC90ZW1wbGF0ZT5cclxuICAgIDwvcS1pbnB1dD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7XHJcbiAgY29udmVydEpTT05Ub0RhdGUsXHJcbiAgY29udmVydERhdGVUb0pTT04sXHJcbiAgY29udmVydEpTT05Ub01pbmltdW1EYXRlLFxyXG59IGZyb20gXCIuLi9jb252ZXJ0RGF0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiBcInZhbHVlXCIsXHJcbiAgICBldmVudDogXCJpbnB1dFwiLFxyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiB7XHJcbiAgICAgIHR5cGU6IFtTdHJpbmcsIG51bGxdLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBsYWJlbDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICB9LFxyXG4gICAgbWluOiB7XHJcbiAgICAgIHR5cGU6IFtTdHJpbmcsIG51bGxdLFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgfSxcclxuICAgIG1heDoge1xyXG4gICAgICB0eXBlOiBbU3RyaW5nLCBudWxsXSxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgIH0sXHJcbiAgICBkZW5zZToge1xyXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWw6IGNvbnZlcnRKU09OVG9EYXRlKHRoaXMudmFsdWUpLFxyXG4gICAgICBtaW5pbXVtOiBjb252ZXJ0SlNPTlRvTWluaW11bURhdGUodGhpcy5taW4pLFxyXG4gICAgICBtYXhpbXVtOiBjb252ZXJ0SlNPTlRvTWluaW11bURhdGUodGhpcy5tYXgpLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICB2YWw6IHtcclxuICAgICAgaGFuZGxlcih2KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvb2hcIik7XHJcbiAgICAgICAgdGhpcy4kZW1pdChcImlucHV0XCIsIGNvbnZlcnREYXRlVG9KU09OKHYpKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgICAvL3RoaXMudmFsID0gY29udmVydEpTT05Ub0RhdGUodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIG1pbih2KSB7XHJcbiAgICAgIHRoaXMubWluaW11bSA9IGNvbnZlcnRKU09OVG9NaW5pbXVtRGF0ZSh2KTtcclxuICAgIH0sXHJcbiAgICBtYXgodikge1xyXG4gICAgICB0aGlzLm1heGltdW0gPSBjb252ZXJ0SlNPTlRvTWluaW11bURhdGUodik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG4iLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fZTczOTQwNjBfX1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzcwZDFmMDk5X19cIiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX182MGM1NmY1MF9fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fMjkyNmI0YzJfX1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzI0YWY0OTQ5X19cIiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX18xNGQyYWI4ZV9fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fYTVkY2U3NjBfX1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzI3ZGQ3NWM5X19cIiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX181ODZmOGY4Ml9fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fYjQ2ZWUxZTZfX1wiIl0sIm5hbWVzIjpbIm1vZCIsInZhbHVlIiwibGFuZyIsIm1hc2siLCJsb2NhbGUiLCJtb2RlbCIsImRhdGUiLCJkYXlzIiwieWVhciIsInZpZXciLCJzdG9wIiwiZGF5IiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNLGVBQWU7QUFBQSxFQUNuQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxJQUFJO0FBQUEsRUFDSixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQ1o7QUFFQSxNQUFNLGdCQUFnQixPQUFPLEtBQUssWUFBWTtBQUU5QyxhQUFhLE1BQU07QUFFWixTQUFTLHNCQUF1QkEsTUFBSztBQUMxQyxRQUFNLE1BQU0sQ0FBRTtBQUVkLGFBQVcsYUFBYSxlQUFlO0FBQ3JDLFFBQUlBLEtBQUssZUFBZ0IsTUFBTTtBQUM3QixVQUFLLGFBQWM7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFFRCxNQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUs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
