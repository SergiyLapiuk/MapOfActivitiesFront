import { c as createComponent, i as useSizeProps, j as useSize, k as hDir, Q as QIcon, q as hMergeSlotSafely, R as Ripple } from "./uid.627d4ed7.js";
import { u as useDarkProps, a as useDark } from "./QBtn.a363fc1a.js";
import { c as computed, h, g as getCurrentInstance, x as stopAndPrevent } from "./index.6764d851.js";
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false)
        return;
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
export { QChip as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUNoaXAuOGZhMWRmYmEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaGlwJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGljb246IFN0cmluZyxcbiAgICBpY29uUmlnaHQ6IFN0cmluZyxcbiAgICBpY29uUmVtb3ZlOiBTdHJpbmcsXG4gICAgaWNvblNlbGVjdGVkOiBTdHJpbmcsXG4gICAgbGFiZWw6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIGNsaWNrYWJsZTogQm9vbGVhbixcbiAgICByZW1vdmFibGU6IEJvb2xlYW4sXG5cbiAgICByZW1vdmVBcmlhTGFiZWw6IFN0cmluZyxcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ3VwZGF0ZTpzZWxlY3RlZCcsICdyZW1vdmUnLCAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBoYXNMZWZ0SWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNlbGVjdGVkID09PSB0cnVlIHx8IHByb3BzLmljb24gIT09IHZvaWQgMClcblxuICAgIGNvbnN0IGxlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2VsZWN0ZWQgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5pY29uU2VsZWN0ZWQgfHwgJHEuaWNvblNldC5jaGlwLnNlbGVjdGVkXG4gICAgICAgIDogcHJvcHMuaWNvblxuICAgICkpXG5cbiAgICBjb25zdCByZW1vdmVJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuaWNvblJlbW92ZSB8fCAkcS5pY29uU2V0LmNoaXAucmVtb3ZlKVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2VcbiAgICAgICYmIChwcm9wcy5jbGlja2FibGUgPT09IHRydWUgfHwgcHJvcHMuc2VsZWN0ZWQgIT09IG51bGwpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgICAgIDogcHJvcHMudGV4dENvbG9yXG5cbiAgICAgIHJldHVybiAncS1jaGlwIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IGZhbHNlICYmIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICsgKHRleHQgPyBgIHRleHQtJHsgdGV4dCB9IHEtY2hpcC0tY29sb3JlZGAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWNoaXAtLWRlbnNlJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5vdXRsaW5lID09PSB0cnVlID8gJyBxLWNoaXAtLW91dGxpbmUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNlbGVjdGVkID09PSB0cnVlID8gJyBxLWNoaXAtLXNlbGVjdGVkJyA6ICcnKVxuICAgICAgICArIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1jbGlja2FibGUgY3Vyc29yLXBvaW50ZXIgbm9uLXNlbGVjdGFibGUgcS1ob3ZlcmFibGUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1zcXVhcmUnIDogJycpXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNoaXAgPSBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICAgID8geyB0YWJpbmRleDogLTEsICdhcmlhLWRpc2FibGVkJzogJ3RydWUnIH1cbiAgICAgICAgOiB7IHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCB8fCAwIH1cbiAgICAgIGNvbnN0IHJlbW92ZSA9IHtcbiAgICAgICAgLi4uY2hpcCxcbiAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMucmVtb3ZlQXJpYUxhYmVsIHx8ICRxLmxhbmcubGFiZWwucmVtb3ZlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IGNoaXAsIHJlbW92ZSB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgLyogRU5URVIgKi8gJiYgb25DbGljayhlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmICghcHJvcHMuZGlzYWJsZSkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6c2VsZWN0ZWQnLCAhcHJvcHMuc2VsZWN0ZWQpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlbW92ZSAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gdm9pZCAwIHx8IGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgICAgICBlbWl0KCdyZW1vdmUnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicgfSlcbiAgICAgIClcblxuICAgICAgaGFzTGVmdEljb24udmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tbGVmdCcsXG4gICAgICAgICAgbmFtZTogbGVmdEljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgY29uc3QgbGFiZWwgPSBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBoKCdkaXYnLCB7IGNsYXNzOiAnZWxsaXBzaXMnIH0sIFsgcHJvcHMubGFiZWwgXSkgXVxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2NvbnRlbnQgY29sIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5kZWZhdWx0LCBsYWJlbCkpXG4gICAgICApXG5cbiAgICAgIHByb3BzLmljb25SaWdodCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1yaWdodCcsXG4gICAgICAgICAgbmFtZTogcHJvcHMuaWNvblJpZ2h0XG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHByb3BzLnJlbW92YWJsZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1yZW1vdmUgY3Vyc29yLXBvaW50ZXInLFxuICAgICAgICAgIG5hbWU6IHJlbW92ZUljb24udmFsdWUsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZS5yZW1vdmUsXG4gICAgICAgICAgb25DbGljazogb25SZW1vdmUsXG4gICAgICAgICAgb25LZXl1cDogb25SZW1vdmVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGF0dHJpYnV0ZXMudmFsdWUuY2hpcCxcbiAgICAgICAgeyBvbkNsaWNrLCBvbktleXVwIH1cbiAgICAgIClcblxuICAgICAgcmV0dXJuIGhEaXIoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBnZXRDb250ZW50KCksXG4gICAgICAgICdyaXBwbGUnLFxuICAgICAgICBwcm9wcy5yaXBwbGUgIT09IGZhbHNlICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUsXG4gICAgICAgICgpID0+IFsgWyBSaXBwbGUsIHByb3BzLnJpcHBsZSBdIF1cbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBYU8sTUFBTSxlQUFlO0FBQUEsRUFDMUIsSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUNOO0FBRUEsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUVILE9BQU87QUFBQSxJQUVQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLE9BQU8sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUV6QixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFFWCxZQUFZO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUVYLGlCQUFpQjtBQUFBLElBRWpCLFVBQVUsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUM1QixTQUFTO0FBQUEsSUFFVCxRQUFRO0FBQUEsTUFDTixNQUFNLENBQUUsU0FBUyxNQUFRO0FBQUEsTUFDekIsU0FBUztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLENBQUUscUJBQXFCLG1CQUFtQixVQUFVLE9BQVM7QUFBQSxFQUVwRSxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUU5QyxVQUFNLFNBQVMsUUFBUSxPQUFPLEVBQUU7QUFDaEMsVUFBTSxZQUFZLFFBQVEsT0FBTyxZQUFZO0FBRTdDLFVBQU0sY0FBYyxTQUFTLE1BQU0sTUFBTSxhQUFhLFFBQVEsTUFBTSxTQUFTLE1BQU07QUFFbkYsVUFBTSxXQUFXLFNBQVMsTUFDeEIsTUFBTSxhQUFhLE9BQ2YsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEtBQUssV0FDdEMsTUFBTSxJQUNYO0FBRUQsVUFBTSxhQUFhLFNBQVMsTUFBTSxNQUFNLGNBQWMsR0FBRyxRQUFRLEtBQUssTUFBTTtBQUU1RSxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLE1BQU0sWUFBWSxVQUNkLE1BQU0sY0FBYyxRQUFRLE1BQU0sYUFBYTtBQUFBLElBQ3BEO0FBRUQsVUFBTSxVQUFVLFNBQVMsTUFBTTtBQUM3QixZQUFNLE9BQU8sTUFBTSxZQUFZLE9BQzNCLE1BQU0sU0FBUyxNQUFNLFlBQ3JCLE1BQU07QUFFVixhQUFPLDRDQUNGLE1BQU0sWUFBWSxTQUFTLE1BQU0sVUFBVSxTQUFTLE9BQVEsTUFBTSxVQUFXLE9BQzdFLE9BQU8sU0FBVSx5QkFBMEIsT0FDM0MsTUFBTSxZQUFZLE9BQU8sY0FBYyxPQUN2QyxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsT0FDMUMsTUFBTSxZQUFZLE9BQU8scUJBQXFCLE9BQzlDLE1BQU0sYUFBYSxPQUFPLHNCQUFzQixPQUNoRCxZQUFZLFVBQVUsT0FBTyxpRUFBaUUsT0FDOUYsTUFBTSxXQUFXLE9BQU8sb0JBQW9CLE9BQzVDLE9BQU8sVUFBVSxPQUFPLHlCQUF5QjtBQUFBLElBQzVELENBQUs7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQU0sT0FBTyxNQUFNLFlBQVksT0FDM0IsRUFBRSxVQUFVLElBQUksaUJBQWlCLE9BQVEsSUFDekMsRUFBRSxVQUFVLE1BQU0sWUFBWSxFQUFHO0FBQ3JDLFlBQU0sU0FBUztBQUFBLFFBQ2IsR0FBRztBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sZUFBZTtBQUFBLFFBQ2YsY0FBYyxNQUFNLG1CQUFtQixHQUFHLEtBQUssTUFBTTtBQUFBLE1BQ3REO0FBRUQsYUFBTyxFQUFFLE1BQU0sT0FBUTtBQUFBLElBQzdCLENBQUs7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixRQUFFLFlBQVksTUFBa0IsUUFBUSxDQUFDO0FBQUEsSUFDMUM7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLENBQUMsTUFBTSxTQUFTO0FBQ2xCLGFBQUssbUJBQW1CLENBQUMsTUFBTSxRQUFRO0FBQ3ZDLGFBQUssU0FBUyxDQUFDO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBRUQsYUFBUyxTQUFVLEdBQUc7QUFDcEIsVUFBSSxFQUFFLFlBQVksVUFBVSxFQUFFLFlBQVksSUFBSTtBQUM1Qyx1QkFBZSxDQUFDO0FBQ2hCLFlBQUksTUFBTSxZQUFZLE9BQU87QUFDM0IsZUFBSyxxQkFBcUIsS0FBSztBQUMvQixlQUFLLFFBQVE7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLGFBQWM7QUFDckIsWUFBTSxRQUFRLENBQUU7QUFFaEIsa0JBQVksVUFBVSxRQUFRLE1BQU07QUFBQSxRQUNsQyxFQUFFLE9BQU8sRUFBRSxPQUFPLGlCQUFnQixDQUFFO0FBQUEsTUFDckM7QUFFRCxrQkFBWSxVQUFVLFFBQVEsTUFBTTtBQUFBLFFBQ2xDLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsTUFBTSxTQUFTO0FBQUEsUUFDekIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxZQUFNLFFBQVEsTUFBTSxVQUFVLFNBQzFCLENBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxXQUFVLEdBQUksQ0FBRSxNQUFNLEtBQUssQ0FBRSxDQUFHLElBQ3BEO0FBRUosWUFBTTtBQUFBLFFBQ0osRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDUixHQUFFLGlCQUFpQixNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQUEsTUFDMUM7QUFFRCxZQUFNLGFBQWEsTUFBTTtBQUFBLFFBQ3ZCLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsTUFBTSxNQUFNO0FBQUEsUUFDdEIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxZQUFNLGNBQWMsUUFBUSxNQUFNO0FBQUEsUUFDaEMsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxNQUFNLFdBQVc7QUFBQSxVQUNqQixHQUFHLFdBQVcsTUFBTTtBQUFBLFVBQ3BCLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBQUEsTUFDRjtBQUVELGFBQU87QUFBQSxJQUNSO0FBRUQsV0FBTyxNQUFNO0FBQ1gsVUFBSSxNQUFNLGVBQWU7QUFBTztBQUVoQyxZQUFNLE9BQU87QUFBQSxRQUNYLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsTUFDbEI7QUFFRCxrQkFBWSxVQUFVLFFBQVEsT0FBTztBQUFBLFFBQ25DO0FBQUEsUUFDQSxXQUFXLE1BQU07QUFBQSxRQUNqQixFQUFFLFNBQVMsUUFBUztBQUFBLE1BQ3JCO0FBRUQsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTSxXQUFXLFNBQVMsTUFBTSxZQUFZO0FBQUEsUUFDNUMsTUFBTSxDQUFFLENBQUUsUUFBUSxNQUFNLE1BQU0sQ0FBSTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDSCxDQUFDOzsifQ==
