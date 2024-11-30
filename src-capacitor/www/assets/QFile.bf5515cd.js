import { Q as QChip } from "./QChip.8fa1dfba.js";
import { k as useFieldProps, b as useFormProps, l as useFieldEmits, n as useFieldState, o as useFormInputNameAttr, s as useFileFormDomProps, m as useField, p as fieldValueIsFilled } from "./QBtn.a363fc1a.js";
import { r as ref, c as computed, g as getCurrentInstance, V as stop, x as stopAndPrevent, a7 as client, h, a3 as injectProp, a5 as prevent } from "./index.6764d851.js";
import { c as createComponent } from "./uid.627d4ed7.js";
import { h as humanStorageSize } from "./format.3e32b8d9.js";
function filterFiles(files, rejectedFiles, failedPropValidation, filterFn) {
  const acceptedFiles = [];
  files.forEach((file) => {
    if (filterFn(file) === true) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push({ failedPropValidation, file });
    }
  });
  return acceptedFiles;
}
function stopAndPreventDrag(e) {
  e && e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
  stopAndPrevent(e);
}
const useFileProps = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
};
const useFileEmits = ["rejected"];
function useFile({
  editable,
  dnd,
  getFileInput,
  addFilesToQueue
}) {
  const { props, emit, proxy } = getCurrentInstance();
  const dndRef = ref(null);
  const extensions = computed(() => props.accept !== void 0 ? props.accept.split(",").map((ext) => {
    ext = ext.trim();
    if (ext === "*") {
      return "*/";
    } else if (ext.endsWith("/*")) {
      ext = ext.slice(0, ext.length - 1);
    }
    return ext.toUpperCase();
  }) : null);
  const maxFilesNumber = computed(() => parseInt(props.maxFiles, 10));
  const maxTotalSizeNumber = computed(() => parseInt(props.maxTotalSize, 10));
  function pickFiles(e) {
    if (editable.value) {
      if (e !== Object(e)) {
        e = { target: null };
      }
      if (e.target !== null && e.target.matches('input[type="file"]') === true) {
        e.clientX === 0 && e.clientY === 0 && stop(e);
      } else {
        const input = getFileInput();
        input && input !== e.target && input.click(e);
      }
    }
  }
  function addFiles(files) {
    if (editable.value && files) {
      addFilesToQueue(null, files);
    }
  }
  function processFiles(e, filesToProcess, currentFileList, append) {
    let files = Array.from(filesToProcess || e.target.files);
    const rejectedFiles = [];
    const done = () => {
      if (rejectedFiles.length !== 0) {
        emit("rejected", rejectedFiles);
      }
    };
    if (props.accept !== void 0 && extensions.value.indexOf("*/") === -1) {
      files = filterFiles(files, rejectedFiles, "accept", (file) => {
        return extensions.value.some((ext) => file.type.toUpperCase().startsWith(ext) || file.name.toUpperCase().endsWith(ext));
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.maxFileSize !== void 0) {
      const maxFileSize = parseInt(props.maxFileSize, 10);
      files = filterFiles(files, rejectedFiles, "max-file-size", (file) => {
        return file.size <= maxFileSize;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.multiple !== true && files.length !== 0) {
      files = [files[0]];
    }
    files.forEach((file) => {
      file.__key = file.webkitRelativePath + file.lastModified + file.name + file.size;
    });
    if (append === true) {
      const filenameMap = currentFileList.map((entry) => entry.__key);
      files = filterFiles(files, rejectedFiles, "duplicate", (file) => {
        return filenameMap.includes(file.__key) === false;
      });
    }
    if (files.length === 0) {
      return done();
    }
    if (props.maxTotalSize !== void 0) {
      let size = append === true ? currentFileList.reduce((total, file) => total + file.size, 0) : 0;
      files = filterFiles(files, rejectedFiles, "max-total-size", (file) => {
        size += file.size;
        return size <= maxTotalSizeNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (typeof props.filter === "function") {
      const filteredFiles = props.filter(files);
      files = filterFiles(files, rejectedFiles, "filter", (file) => {
        return filteredFiles.includes(file);
      });
    }
    if (props.maxFiles !== void 0) {
      let filesNumber = append === true ? currentFileList.length : 0;
      files = filterFiles(files, rejectedFiles, "max-files", () => {
        filesNumber++;
        return filesNumber <= maxFilesNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    done();
    if (files.length !== 0) {
      return files;
    }
  }
  function onDragover(e) {
    stopAndPreventDrag(e);
    dnd.value !== true && (dnd.value = true);
  }
  function onDragleave(e) {
    stopAndPrevent(e);
    const gone = e.relatedTarget !== null || client.is.safari !== true ? e.relatedTarget !== dndRef.value : document.elementsFromPoint(e.clientX, e.clientY).includes(dndRef.value) === false;
    gone === true && (dnd.value = false);
  }
  function onDrop(e) {
    stopAndPreventDrag(e);
    const files = e.dataTransfer.files;
    if (files.length !== 0) {
      addFilesToQueue(null, files);
    }
    dnd.value = false;
  }
  function getDndNode(type) {
    if (dnd.value === true) {
      return h("div", {
        ref: dndRef,
        class: `q-${type}__dnd absolute-full`,
        onDragenter: stopAndPreventDrag,
        onDragover: stopAndPreventDrag,
        onDragleave,
        onDrop
      });
    }
  }
  Object.assign(proxy, { pickFiles, addFiles });
  return {
    pickFiles,
    addFiles,
    onDragover,
    onDragleave,
    processFiles,
    getDndNode,
    maxFilesNumber,
    maxTotalSizeNumber
  };
}
var QFile = createComponent({
  name: "QFile",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useFormProps,
    ...useFileProps,
    modelValue: [File, FileList, Array],
    append: Boolean,
    useChips: Boolean,
    displayValue: [String, Number],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    counterLabel: Function,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    ...useFileEmits
  ],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const state = useFieldState();
    const inputRef = ref(null);
    const dnd = ref(false);
    const nameProp = useFormInputNameAttr(props);
    const {
      pickFiles,
      onDragover,
      onDragleave,
      processFiles,
      getDndNode
    } = useFile({ editable: state.editable, dnd, getFileInput, addFilesToQueue });
    const formDomProps = useFileFormDomProps(props);
    const innerValue = computed(() => Object(props.modelValue) === props.modelValue ? "length" in props.modelValue ? Array.from(props.modelValue) : [props.modelValue] : []);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const selectedString = computed(
      () => innerValue.value.map((file) => file.name).join(", ")
    );
    const totalSize = computed(
      () => humanStorageSize(
        innerValue.value.reduce((acc, file) => acc + file.size, 0)
      )
    );
    const counterProps = computed(() => ({
      totalSize: totalSize.value,
      filesNumber: innerValue.value.length,
      maxFiles: props.maxFiles
    }));
    const inputAttrs = computed(() => ({
      tabindex: -1,
      type: "file",
      title: "",
      accept: props.accept,
      capture: props.capture,
      name: nameProp.value,
      ...attrs,
      id: state.targetUid.value,
      disabled: state.editable.value !== true
    }));
    const fieldClass = computed(
      () => "q-file q-field--auto-height" + (dnd.value === true ? " q-file--dnd" : "")
    );
    const isAppending = computed(
      () => props.multiple === true && props.append === true
    );
    function removeAtIndex(index) {
      const files = innerValue.value.slice();
      files.splice(index, 1);
      emitValue(files);
    }
    function removeFile(file) {
      const index = innerValue.value.indexOf(file);
      if (index !== -1) {
        removeAtIndex(index);
      }
    }
    function emitValue(files) {
      emit("update:modelValue", props.multiple === true ? files : files[0]);
    }
    function onKeydown(e) {
      e.keyCode === 13 && prevent(e);
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        pickFiles(e);
      }
    }
    function getFileInput() {
      return inputRef.value;
    }
    function addFilesToQueue(e, fileList) {
      const files = processFiles(e, fileList, innerValue.value, isAppending.value);
      const fileInput = getFileInput();
      if (fileInput !== void 0 && fileInput !== null) {
        fileInput.value = "";
      }
      if (files === void 0)
        return;
      if (props.multiple === true ? props.modelValue && files.every((f) => innerValue.value.includes(f)) : props.modelValue === files[0]) {
        return;
      }
      emitValue(
        isAppending.value === true ? innerValue.value.concat(files) : files
      );
    }
    function getFiller() {
      return [
        h("input", {
          class: [props.inputClass, "q-file__filler"],
          style: props.inputStyle
        })
      ];
    }
    function getSelection() {
      if (slots.file !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map(
          (file, index) => slots.file({ index, file, ref: this })
        );
      }
      if (slots.selected !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : slots.selected({ files: innerValue.value, ref: this });
      }
      if (props.useChips === true) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map((file, i) => h(QChip, {
          key: "file-" + i,
          removable: state.editable.value,
          dense: true,
          textColor: props.color,
          tabindex: props.tabindex,
          onRemove: () => {
            removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          textContent: file.name
        })));
      }
      const textContent = props.displayValue !== void 0 ? props.displayValue : selectedString.value;
      return textContent.length !== 0 ? [
        h("div", {
          class: props.inputClass,
          style: props.inputStyle,
          textContent
        })
      ] : getFiller();
    }
    function getInput() {
      const data = {
        ref: inputRef,
        ...inputAttrs.value,
        ...formDomProps.value,
        class: "q-field__input fit absolute-full cursor-pointer",
        onChange: addFilesToQueue
      };
      if (props.multiple === true) {
        data.multiple = true;
      }
      return h("input", data);
    }
    Object.assign(state, {
      fieldClass,
      emitValue,
      hasValue,
      inputRef,
      innerValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      computedCounter: computed(() => {
        if (props.counterLabel !== void 0) {
          return props.counterLabel(counterProps.value);
        }
        const max = props.maxFiles;
        return `${innerValue.value.length}${max !== void 0 ? " / " + max : ""} (${totalSize.value})`;
      }),
      getControlChild: () => getDndNode("file"),
      getControl: () => {
        const data = {
          ref: state.targetRef,
          class: "q-field__native row items-center cursor-pointer",
          tabindex: props.tabindex
        };
        if (state.editable.value === true) {
          Object.assign(data, { onDragover, onDragleave, onKeydown, onKeyup });
        }
        return h("div", data, [getInput()].concat(getSelection()));
      }
    });
    Object.assign(proxy, {
      removeAtIndex,
      removeFile,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return useField(state);
  }
});
export { QFile as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUZpbGUuYmY1NTE1Y2QuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpbGUvUUZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgc3RvcCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gZmlsdGVyRmlsZXMgKGZpbGVzLCByZWplY3RlZEZpbGVzLCBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsdGVyRm4pIHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IFtdXG5cbiAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBpZiAoZmlsdGVyRm4oZmlsZSkgPT09IHRydWUpIHtcbiAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCh7IGZhaWxlZFByb3BWYWxpZGF0aW9uLCBmaWxlIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBhY2NlcHRlZEZpbGVzXG59XG5cbmZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50RHJhZyAoZSkge1xuICBlICYmIGUuZGF0YVRyYW5zZmVyICYmIChlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknKVxuICBzdG9wQW5kUHJldmVudChlKVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmlsZVByb3BzID0ge1xuICBtdWx0aXBsZTogQm9vbGVhbixcbiAgYWNjZXB0OiBTdHJpbmcsXG4gIGNhcHR1cmU6IFN0cmluZyxcbiAgbWF4RmlsZVNpemU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgbWF4VG90YWxTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heEZpbGVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGZpbHRlcjogRnVuY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVFbWl0cyA9IFsgJ3JlamVjdGVkJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIGVkaXRhYmxlLFxuICBkbmQsXG4gIGdldEZpbGVJbnB1dCxcbiAgYWRkRmlsZXNUb1F1ZXVlXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGRuZFJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuYWNjZXB0ICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuYWNjZXB0LnNwbGl0KCcsJykubWFwKGV4dCA9PiB7XG4gICAgICAgIGV4dCA9IGV4dC50cmltKClcbiAgICAgICAgaWYgKGV4dCA9PT0gJyonKSB7IC8vIHN1cHBvcnQgXCIqXCJcbiAgICAgICAgICByZXR1cm4gJyovJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dC5lbmRzV2l0aCgnLyonKSkgeyAvLyBzdXBwb3J0IFwiaW1hZ2UvKlwiIG9yIFwiKi8qXCJcbiAgICAgICAgICBleHQgPSBleHQuc2xpY2UoMCwgZXh0Lmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dC50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgbWF4RmlsZXNOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhGaWxlcywgMTApKVxuICBjb25zdCBtYXhUb3RhbFNpemVOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhUb3RhbFNpemUsIDEwKSlcblxuICBmdW5jdGlvbiBwaWNrRmlsZXMgKGUpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUpIHtcbiAgICAgIGlmIChlICE9PSBPYmplY3QoZSkpIHtcbiAgICAgICAgZSA9IHsgdGFyZ2V0OiBudWxsIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBudWxsICYmIGUudGFyZ2V0Lm1hdGNoZXMoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykgPT09IHRydWUpIHtcbiAgICAgICAgLy8gc3RvcCBwcm9wYWdhdGlvbiBpZiBpdCdzIG5vdCBhIHJlYWwgcG9pbnRlciBldmVudFxuICAgICAgICBlLmNsaWVudFggPT09IDAgJiYgZS5jbGllbnRZID09PSAwICYmIHN0b3AoZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldEZpbGVJbnB1dCgpXG4gICAgICAgIGlucHV0ICYmIGlucHV0ICE9PSBlLnRhcmdldCAmJiBpbnB1dC5jbGljayhlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZpbGVzIChmaWxlcykge1xuICAgIGlmIChlZGl0YWJsZS52YWx1ZSAmJiBmaWxlcykge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyAoZSwgZmlsZXNUb1Byb2Nlc3MsIGN1cnJlbnRGaWxlTGlzdCwgYXBwZW5kKSB7XG4gICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShmaWxlc1RvUHJvY2VzcyB8fCBlLnRhcmdldC5maWxlcylcbiAgICBjb25zdCByZWplY3RlZEZpbGVzID0gW11cblxuICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICBpZiAocmVqZWN0ZWRGaWxlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgZW1pdCgncmVqZWN0ZWQnLCByZWplY3RlZEZpbGVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBmaWxlIHR5cGVzXG4gICAgaWYgKHByb3BzLmFjY2VwdCAhPT0gdm9pZCAwICYmIGV4dGVuc2lvbnMudmFsdWUuaW5kZXhPZignKi8nKSA9PT0gLTEpIHtcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdhY2NlcHQnLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbnMudmFsdWUuc29tZShleHQgPT4gKFxuICAgICAgICAgIGZpbGUudHlwZS50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoZXh0KVxuICAgICAgICAgIHx8IGZpbGUubmFtZS50b1VwcGVyQ2FzZSgpLmVuZHNXaXRoKGV4dClcbiAgICAgICAgKSlcbiAgICAgIH0pXG5cbiAgICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIG1heCBmaWxlIHNpemVcbiAgICBpZiAocHJvcHMubWF4RmlsZVNpemUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbWF4RmlsZVNpemUgPSBwYXJzZUludChwcm9wcy5tYXhGaWxlU2l6ZSwgMTApXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LWZpbGUtc2l6ZScsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZmlsZS5zaXplIDw9IG1heEZpbGVTaXplXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIENvcmRvdmEvaU9TIGFsbG93cyBzZWxlY3RpbmcgbXVsdGlwbGUgZmlsZXMgZXZlbiB3aGVuIHRoZVxuICAgIC8vIG11bHRpcGxlIGF0dHJpYnV0ZSBpcyBub3Qgc3BlY2lmaWVkLiBXZSBhbHNvIG5vcm1hbGl6ZSBkcmFnJ24nZHJvcHBlZFxuICAgIC8vIGZpbGVzIGhlcmU6XG4gICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlICYmIGZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgZmlsZXMgPSBbIGZpbGVzWyAwIF0gXVxuICAgIH1cblxuICAgIC8vIENvbXB1dGUga2V5IHRvIHVzZSBmb3IgZWFjaCBmaWxlXG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGZpbGUuX19rZXkgPSBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aCArIGZpbGUubGFzdE1vZGlmaWVkICsgZmlsZS5uYW1lICsgZmlsZS5zaXplXG4gICAgfSlcblxuICAgIGlmIChhcHBlbmQgPT09IHRydWUpIHtcbiAgICAgIC8vIEF2b2lkIGR1cGxpY2F0ZSBmaWxlc1xuICAgICAgY29uc3QgZmlsZW5hbWVNYXAgPSBjdXJyZW50RmlsZUxpc3QubWFwKGVudHJ5ID0+IGVudHJ5Ll9fa2V5KVxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ2R1cGxpY2F0ZScsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWVNYXAuaW5jbHVkZXMoZmlsZS5fX2tleSkgPT09IGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG5cbiAgICBpZiAocHJvcHMubWF4VG90YWxTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBzaXplID0gYXBwZW5kID09PSB0cnVlXG4gICAgICAgID8gY3VycmVudEZpbGVMaXN0LnJlZHVjZSgodG90YWwsIGZpbGUpID0+IHRvdGFsICsgZmlsZS5zaXplLCAwKVxuICAgICAgICA6IDBcblxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC10b3RhbC1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHNpemUgKz0gZmlsZS5zaXplXG4gICAgICAgIHJldHVybiBzaXplIDw9IG1heFRvdGFsU2l6ZU51bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGN1c3RvbSBmaWx0ZXIgZnVuY3Rpb24/XG4gICAgaWYgKHR5cGVvZiBwcm9wcy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkRmlsZXMgPSBwcm9wcy5maWx0ZXIoZmlsZXMpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZmlsdGVyJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEZpbGVzLmluY2x1ZGVzKGZpbGUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tYXhGaWxlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBsZXQgZmlsZXNOdW1iZXIgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QubGVuZ3RoXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LWZpbGVzJywgKCkgPT4ge1xuICAgICAgICBmaWxlc051bWJlcisrXG4gICAgICAgIHJldHVybiBmaWxlc051bWJlciA8PSBtYXhGaWxlc051bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybiBmaWxlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ292ZXIgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudERyYWcoZSlcbiAgICBkbmQudmFsdWUgIT09IHRydWUgJiYgKGRuZC52YWx1ZSA9IHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdsZWF2ZSAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAvLyBTYWZhcmkgYnVnOiByZWxhdGVkVGFyZ2V0IGlzIG51bGwgZm9yIG92ZXIgMTAgeWVhcnNcbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjY1NDdcbiAgICBjb25zdCBnb25lID0gZS5yZWxhdGVkVGFyZ2V0ICE9PSBudWxsIHx8IGNsaWVudC5pcy5zYWZhcmkgIT09IHRydWVcbiAgICAgID8gZS5yZWxhdGVkVGFyZ2V0ICE9PSBkbmRSZWYudmFsdWVcbiAgICAgIDogZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpLmluY2x1ZGVzKGRuZFJlZi52YWx1ZSkgPT09IGZhbHNlXG5cbiAgICBnb25lID09PSB0cnVlICYmIChkbmQudmFsdWUgPSBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcCAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50RHJhZyhlKVxuICAgIGNvbnN0IGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDApIHtcbiAgICAgIGFkZEZpbGVzVG9RdWV1ZShudWxsLCBmaWxlcylcbiAgICB9XG5cbiAgICBkbmQudmFsdWUgPSBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RG5kTm9kZSAodHlwZSkge1xuICAgIGlmIChkbmQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogZG5kUmVmLFxuICAgICAgICBjbGFzczogYHEtJHsgdHlwZSB9X19kbmQgYWJzb2x1dGUtZnVsbGAsXG4gICAgICAgIG9uRHJhZ2VudGVyOiBzdG9wQW5kUHJldmVudERyYWcsXG4gICAgICAgIG9uRHJhZ292ZXI6IHN0b3BBbmRQcmV2ZW50RHJhZyxcbiAgICAgICAgb25EcmFnbGVhdmUsXG4gICAgICAgIG9uRHJvcFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBwaWNrRmlsZXMsIGFkZEZpbGVzIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXMsXG4gICAgb25EcmFnb3ZlcixcbiAgICBvbkRyYWdsZWF2ZSxcbiAgICBwcm9jZXNzRmlsZXMsXG4gICAgZ2V0RG5kTm9kZSxcblxuICAgIG1heEZpbGVzTnVtYmVyLFxuICAgIG1heFRvdGFsU2l6ZU51bWJlclxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQ2hpcCBmcm9tICcuLi9jaGlwL1FDaGlwLmpzJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbnB1dE5hbWVBdHRyIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcbmltcG9ydCB1c2VGaWxlLCB7IHVzZUZpbGVQcm9wcywgdXNlRmlsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS5qcydcbmltcG9ydCB1c2VGaWxlRm9ybURvbVByb3BzIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGh1bWFuU3RvcmFnZVNpemUgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5pbXBvcnQgeyBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRmlsZScsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuICAgIC4uLnVzZUZpbGVQcm9wcyxcblxuICAgIC8qIFNTUiBkb2VzIG5vdCBrbm93IGFib3V0IEZpbGUgJiBGaWxlTGlzdCAqL1xuICAgIG1vZGVsVmFsdWU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyB7fVxuICAgICAgOiBbIEZpbGUsIEZpbGVMaXN0LCBBcnJheSBdLFxuXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHVzZUNoaXBzOiBCb29sZWFuLFxuICAgIGRpc3BsYXlWYWx1ZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgdGFiaW5kZXg6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgY291bnRlckxhYmVsOiBGdW5jdGlvbixcblxuICAgIGlucHV0Q2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaW5wdXRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRmllbGRFbWl0cyxcbiAgICAuLi51c2VGaWxlRW1pdHNcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZG5kID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCB7XG4gICAgICBwaWNrRmlsZXMsXG4gICAgICBvbkRyYWdvdmVyLFxuICAgICAgb25EcmFnbGVhdmUsXG4gICAgICBwcm9jZXNzRmlsZXMsXG4gICAgICBnZXREbmROb2RlXG4gICAgfSA9IHVzZUZpbGUoeyBlZGl0YWJsZTogc3RhdGUuZWRpdGFibGUsIGRuZCwgZ2V0RmlsZUlucHV0LCBhZGRGaWxlc1RvUXVldWUgfSlcblxuICAgIGNvbnN0IGZvcm1Eb21Qcm9wcyA9IHVzZUZpbGVGb3JtRG9tUHJvcHMocHJvcHMpXG5cbiAgICBjb25zdCBpbm5lclZhbHVlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgT2JqZWN0KHByb3BzLm1vZGVsVmFsdWUpID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgID8gKCdsZW5ndGgnIGluIHByb3BzLm1vZGVsVmFsdWUgPyBBcnJheS5mcm9tKHByb3BzLm1vZGVsVmFsdWUpIDogWyBwcm9wcy5tb2RlbFZhbHVlIF0pXG4gICAgICAgIDogW11cbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgdG90YWxTaXplID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGh1bWFuU3RvcmFnZVNpemUoXG4gICAgICAgIGlubmVyVmFsdWUudmFsdWUucmVkdWNlKChhY2MsIGZpbGUpID0+IGFjYyArIGZpbGUuc2l6ZSwgMClcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBjb3VudGVyUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgdG90YWxTaXplOiB0b3RhbFNpemUudmFsdWUsXG4gICAgICBmaWxlc051bWJlcjogaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGgsXG4gICAgICBtYXhGaWxlczogcHJvcHMubWF4RmlsZXNcbiAgICB9KSlcblxuICAgIGNvbnN0IGlucHV0QXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgdGl0bGU6ICcnLCAvLyB0cnkgdG8gcmVtb3ZlIGRlZmF1bHQgdG9vbHRpcCxcbiAgICAgIGFjY2VwdDogcHJvcHMuYWNjZXB0LFxuICAgICAgY2FwdHVyZTogcHJvcHMuY2FwdHVyZSxcbiAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgLi4uYXR0cnMsXG4gICAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgZGlzYWJsZWQ6IHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlXG4gICAgfSkpXG5cbiAgICBjb25zdCBmaWVsZENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWZpbGUgcS1maWVsZC0tYXV0by1oZWlnaHQnXG4gICAgICArIChkbmQudmFsdWUgPT09IHRydWUgPyAnIHEtZmlsZS0tZG5kJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGlzQXBwZW5kaW5nID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIHByb3BzLmFwcGVuZCA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXggKGluZGV4KSB7XG4gICAgICBjb25zdCBmaWxlcyA9IGlubmVyVmFsdWUudmFsdWUuc2xpY2UoKVxuICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgZW1pdFZhbHVlKGZpbGVzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZpbGUgKGZpbGUpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaW5uZXJWYWx1ZS52YWx1ZS5pbmRleE9mKGZpbGUpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJlbW92ZUF0SW5kZXgoaW5kZXgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdFZhbHVlIChmaWxlcykge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IGZpbGVzIDogZmlsZXNbIDAgXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICAgIC8vIHByZXZlbnQgZm9ybSBzdWJtaXQgaWYgRU5URVIgaXMgcHJlc3NlZFxuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiBwcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgLy8gb25seSBvbiBFTlRFUiBhbmQgU1BBQ0UgdG8gbWF0Y2ggbmF0aXZlIGlucHV0IGZpZWxkXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHBpY2tGaWxlcyhlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpbGVJbnB1dCAoKSB7XG4gICAgICByZXR1cm4gaW5wdXRSZWYudmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRGaWxlc1RvUXVldWUgKGUsIGZpbGVMaXN0KSB7XG4gICAgICBjb25zdCBmaWxlcyA9IHByb2Nlc3NGaWxlcyhlLCBmaWxlTGlzdCwgaW5uZXJWYWx1ZS52YWx1ZSwgaXNBcHBlbmRpbmcudmFsdWUpXG4gICAgICBjb25zdCBmaWxlSW5wdXQgPSBnZXRGaWxlSW5wdXQoKVxuXG4gICAgICBpZiAoZmlsZUlucHV0ICE9PSB2b2lkIDAgJiYgZmlsZUlucHV0ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVJbnB1dC52YWx1ZSA9ICcnXG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG5vdGhpbmcgdG8gZG8uLi5cbiAgICAgIGlmIChmaWxlcyA9PT0gdm9pZCAwKSByZXR1cm5cblxuICAgICAgLy8gcHJvdGVjdCBhZ2FpbnN0IGlucHV0IEBjaGFuZ2UgYmVpbmcgY2FsbGVkIGluIGEgbG9vcFxuICAgICAgLy8gbGlrZSBpdCBoYXBwZW5zIG9uIFNhZmFyaSwgc28gZG9uJ3QgZW1pdCBzYW1lIHRoaW5nOlxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMubW9kZWxWYWx1ZSAmJiBmaWxlcy5ldmVyeShmID0+IGlubmVyVmFsdWUudmFsdWUuaW5jbHVkZXMoZikpXG4gICAgICAgICAgOiBwcm9wcy5tb2RlbFZhbHVlID09PSBmaWxlc1sgMCBdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZShcbiAgICAgICAgaXNBcHBlbmRpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGlubmVyVmFsdWUudmFsdWUuY29uY2F0KGZpbGVzKVxuICAgICAgICAgIDogZmlsZXNcbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxsZXIgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgY2xhc3M6IFsgcHJvcHMuaW5wdXRDbGFzcywgJ3EtZmlsZV9fZmlsbGVyJyBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgICAgIGlmIChzbG90cy5maWxlICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBnZXRGaWxsZXIoKVxuICAgICAgICAgIDogaW5uZXJWYWx1ZS52YWx1ZS5tYXAoXG4gICAgICAgICAgICAoZmlsZSwgaW5kZXgpID0+IHNsb3RzLmZpbGUoeyBpbmRleCwgZmlsZSwgcmVmOiB0aGlzIH0pXG4gICAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuc2VsZWN0ZWQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IGdldEZpbGxlcigpXG4gICAgICAgICAgOiBzbG90cy5zZWxlY3RlZCh7IGZpbGVzOiBpbm5lclZhbHVlLnZhbHVlLCByZWY6IHRoaXMgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnVzZUNoaXBzID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gZ2V0RmlsbGVyKClcbiAgICAgICAgICA6IGlubmVyVmFsdWUudmFsdWUubWFwKChmaWxlLCBpKSA9PiBoKFFDaGlwLCB7XG4gICAgICAgICAgICBrZXk6ICdmaWxlLScgKyBpLFxuICAgICAgICAgICAgcmVtb3ZhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgICAgIG9uUmVtb3ZlOiAoKSA9PiB7IHJlbW92ZUF0SW5kZXgoaSkgfVxuICAgICAgICAgIH0sICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICBjbGFzczogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBmaWxlLm5hbWVcbiAgICAgICAgICB9KSkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gcHJvcHMuZGlzcGxheVZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgICAgOiBzZWxlY3RlZFN0cmluZy52YWx1ZVxuXG4gICAgICByZXR1cm4gdGV4dENvbnRlbnQubGVuZ3RoICE9PSAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogcHJvcHMuaW5wdXRDbGFzcyxcbiAgICAgICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgICAgIHRleHRDb250ZW50XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBnZXRGaWxsZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElucHV0ICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgIC4uLmZvcm1Eb21Qcm9wcy52YWx1ZSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbnB1dCBmaXQgYWJzb2x1dGUtZnVsbCBjdXJzb3ItcG9pbnRlcicsXG4gICAgICAgIG9uQ2hhbmdlOiBhZGRGaWxlc1RvUXVldWVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEubXVsdGlwbGUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgZmllbGRDbGFzcyxcbiAgICAgIGVtaXRWYWx1ZSxcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgaW5wdXRSZWYsXG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgY29tcHV0ZWRDb3VudGVyOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy5jb3VudGVyTGFiZWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5jb3VudGVyTGFiZWwoY291bnRlclByb3BzLnZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4ID0gcHJvcHMubWF4RmlsZXNcbiAgICAgICAgcmV0dXJuIGAkeyBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCB9JHsgbWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnIH0gKCR7IHRvdGFsU2l6ZS52YWx1ZSB9KWBcbiAgICAgIH0pLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IGdldERuZE5vZGUoJ2ZpbGUnKSxcbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cgaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkRyYWdvdmVyLCBvbkRyYWdsZWF2ZSwgb25LZXlkb3duLCBvbktleXVwIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgWyBnZXRJbnB1dCgpIF0uY29uY2F0KGdldFNlbGVjdGlvbigpKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgcmVtb3ZlQXRJbmRleCxcbiAgICAgIHJlbW92ZUZpbGUsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZSAvLyBkZXByZWNhdGVkXG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICduYXRpdmVFbCcsICgpID0+IGlucHV0UmVmLnZhbHVlKVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsU0FBUyxZQUFhLE9BQU8sZUFBZSxzQkFBc0IsVUFBVTtBQUMxRSxRQUFNLGdCQUFnQixDQUFFO0FBRXhCLFFBQU0sUUFBUSxVQUFRO0FBQ3BCLFFBQUksU0FBUyxJQUFJLE1BQU0sTUFBTTtBQUMzQixvQkFBYyxLQUFLLElBQUk7QUFBQSxJQUN4QixPQUNJO0FBQ0gsb0JBQWMsS0FBSyxFQUFFLHNCQUFzQixLQUFJLENBQUU7QUFBQSxJQUNsRDtBQUFBLEVBQ0wsQ0FBRztBQUVELFNBQU87QUFDVDtBQUVBLFNBQVMsbUJBQW9CLEdBQUc7QUFDOUIsT0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsYUFBYTtBQUNwRCxpQkFBZSxDQUFDO0FBQ2xCO0FBRU8sTUFBTSxlQUFlO0FBQUEsRUFDMUIsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsYUFBYSxDQUFFLFFBQVEsTUFBUTtBQUFBLEVBQy9CLGNBQWMsQ0FBRSxRQUFRLE1BQVE7QUFBQSxFQUNoQyxVQUFVLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDNUIsUUFBUTtBQUNWO0FBRU8sTUFBTSxlQUFlLENBQUUsVUFBWTtBQUUzQixTQUFBLFFBQVU7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQUc7QUFDRCxRQUFNLEVBQUUsT0FBTyxNQUFNLE1BQUssSUFBSyxtQkFBb0I7QUFFbkQsUUFBTSxTQUFTLElBQUksSUFBSTtBQUV2QixRQUFNLGFBQWEsU0FBUyxNQUMxQixNQUFNLFdBQVcsU0FDYixNQUFNLE9BQU8sTUFBTSxHQUFHLEVBQUUsSUFBSSxTQUFPO0FBQ25DLFVBQU0sSUFBSSxLQUFNO0FBQ2hCLFFBQUksUUFBUSxLQUFLO0FBQ2YsYUFBTztBQUFBLElBQ1IsV0FDUSxJQUFJLFNBQVMsSUFBSSxHQUFHO0FBQzNCLFlBQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFBQSxJQUNsQztBQUNELFdBQU8sSUFBSSxZQUFhO0FBQUEsRUFDaEMsQ0FBTyxJQUNDLElBQ0w7QUFFRCxRQUFNLGlCQUFpQixTQUFTLE1BQU0sU0FBUyxNQUFNLFVBQVUsRUFBRSxDQUFDO0FBQ2xFLFFBQU0scUJBQXFCLFNBQVMsTUFBTSxTQUFTLE1BQU0sY0FBYyxFQUFFLENBQUM7QUFFMUUsV0FBUyxVQUFXLEdBQUc7QUFDckIsUUFBSSxTQUFTLE9BQU87QUFDbEIsVUFBSSxNQUFNLE9BQU8sQ0FBQyxHQUFHO0FBQ25CLFlBQUksRUFBRSxRQUFRLEtBQU07QUFBQSxNQUNyQjtBQUVELFVBQUksRUFBRSxXQUFXLFFBQVEsRUFBRSxPQUFPLFFBQVEsb0JBQW9CLE1BQU0sTUFBTTtBQUV4RSxVQUFFLFlBQVksS0FBSyxFQUFFLFlBQVksS0FBSyxLQUFLLENBQUM7QUFBQSxNQUM3QyxPQUNJO0FBQ0gsY0FBTSxRQUFRLGFBQWM7QUFDNUIsaUJBQVMsVUFBVSxFQUFFLFVBQVUsTUFBTSxNQUFNLENBQUM7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUQsV0FBUyxTQUFVLE9BQU87QUFDeEIsUUFBSSxTQUFTLFNBQVMsT0FBTztBQUMzQixzQkFBZ0IsTUFBTSxLQUFLO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBRUQsV0FBUyxhQUFjLEdBQUcsZ0JBQWdCLGlCQUFpQixRQUFRO0FBQ2pFLFFBQUksUUFBUSxNQUFNLEtBQUssa0JBQWtCLEVBQUUsT0FBTyxLQUFLO0FBQ3ZELFVBQU0sZ0JBQWdCLENBQUU7QUFFeEIsVUFBTSxPQUFPLE1BQU07QUFDakIsVUFBSSxjQUFjLFdBQVcsR0FBRztBQUM5QixhQUFLLFlBQVksYUFBYTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUdELFFBQUksTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDcEUsY0FBUSxZQUFZLE9BQU8sZUFBZSxVQUFVLFVBQVE7QUFDMUQsZUFBTyxXQUFXLE1BQU0sS0FBSyxTQUMzQixLQUFLLEtBQUssY0FBYyxXQUFXLEdBQUcsS0FDbkMsS0FBSyxLQUFLLGNBQWMsU0FBUyxHQUFHLENBQ3hDO0FBQUEsTUFDVCxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUdELFFBQUksTUFBTSxnQkFBZ0IsUUFBUTtBQUNoQyxZQUFNLGNBQWMsU0FBUyxNQUFNLGFBQWEsRUFBRTtBQUNsRCxjQUFRLFlBQVksT0FBTyxlQUFlLGlCQUFpQixVQUFRO0FBQ2pFLGVBQU8sS0FBSyxRQUFRO0FBQUEsTUFDNUIsQ0FBTztBQUVELFVBQUksTUFBTSxXQUFXLEdBQUc7QUFBRSxlQUFPLEtBQUk7QUFBQSxNQUFJO0FBQUEsSUFDMUM7QUFLRCxRQUFJLE1BQU0sYUFBYSxRQUFRLE1BQU0sV0FBVyxHQUFHO0FBQ2pELGNBQVEsQ0FBRSxNQUFPLEVBQUs7QUFBQSxJQUN2QjtBQUdELFVBQU0sUUFBUSxVQUFRO0FBQ3BCLFdBQUssUUFBUSxLQUFLLHFCQUFxQixLQUFLLGVBQWUsS0FBSyxPQUFPLEtBQUs7QUFBQSxJQUNsRixDQUFLO0FBRUQsUUFBSSxXQUFXLE1BQU07QUFFbkIsWUFBTSxjQUFjLGdCQUFnQixJQUFJLFdBQVMsTUFBTSxLQUFLO0FBQzVELGNBQVEsWUFBWSxPQUFPLGVBQWUsYUFBYSxVQUFRO0FBQzdELGVBQU8sWUFBWSxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQUEsTUFDcEQsQ0FBTztBQUFBLElBQ0Y7QUFFRCxRQUFJLE1BQU0sV0FBVyxHQUFHO0FBQUUsYUFBTyxLQUFJO0FBQUEsSUFBSTtBQUV6QyxRQUFJLE1BQU0saUJBQWlCLFFBQVE7QUFDakMsVUFBSSxPQUFPLFdBQVcsT0FDbEIsZ0JBQWdCLE9BQU8sQ0FBQyxPQUFPLFNBQVMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUM1RDtBQUVKLGNBQVEsWUFBWSxPQUFPLGVBQWUsa0JBQWtCLFVBQVE7QUFDbEUsZ0JBQVEsS0FBSztBQUNiLGVBQU8sUUFBUSxtQkFBbUI7QUFBQSxNQUMxQyxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUdELFFBQUksT0FBTyxNQUFNLFdBQVcsWUFBWTtBQUN0QyxZQUFNLGdCQUFnQixNQUFNLE9BQU8sS0FBSztBQUN4QyxjQUFRLFlBQVksT0FBTyxlQUFlLFVBQVUsVUFBUTtBQUMxRCxlQUFPLGNBQWMsU0FBUyxJQUFJO0FBQUEsTUFDMUMsQ0FBTztBQUFBLElBQ0Y7QUFFRCxRQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLFVBQUksY0FBYyxXQUFXLE9BQ3pCLGdCQUFnQixTQUNoQjtBQUVKLGNBQVEsWUFBWSxPQUFPLGVBQWUsYUFBYSxNQUFNO0FBQzNEO0FBQ0EsZUFBTyxlQUFlLGVBQWU7QUFBQSxNQUM3QyxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUVELFNBQU07QUFFTixRQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3RCLGFBQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVELFdBQVMsV0FBWSxHQUFHO0FBQ3RCLHVCQUFtQixDQUFDO0FBQ3BCLFFBQUksVUFBVSxTQUFTLElBQUksUUFBUTtBQUFBLEVBQ3BDO0FBRUQsV0FBUyxZQUFhLEdBQUc7QUFDdkIsbUJBQWUsQ0FBQztBQUloQixVQUFNLE9BQU8sRUFBRSxrQkFBa0IsUUFBUSxPQUFPLEdBQUcsV0FBVyxPQUMxRCxFQUFFLGtCQUFrQixPQUFPLFFBQzNCLFNBQVMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLE9BQU8sS0FBSyxNQUFNO0FBRWhGLGFBQVMsU0FBUyxJQUFJLFFBQVE7QUFBQSxFQUMvQjtBQUVELFdBQVMsT0FBUSxHQUFHO0FBQ2xCLHVCQUFtQixDQUFDO0FBQ3BCLFVBQU0sUUFBUSxFQUFFLGFBQWE7QUFFN0IsUUFBSSxNQUFNLFdBQVcsR0FBRztBQUN0QixzQkFBZ0IsTUFBTSxLQUFLO0FBQUEsSUFDNUI7QUFFRCxRQUFJLFFBQVE7QUFBQSxFQUNiO0FBRUQsV0FBUyxXQUFZLE1BQU07QUFDekIsUUFBSSxJQUFJLFVBQVUsTUFBTTtBQUN0QixhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFNO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxNQUNSLENBQU87QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUdELFNBQU8sT0FBTyxPQUFPLEVBQUUsV0FBVyxTQUFRLENBQUU7QUFFNUMsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsRUFDRDtBQUNIO0FDaE9BLElBQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixjQUFjO0FBQUEsRUFFZCxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFHSCxZQUVJLENBQUUsTUFBTSxVQUFVLEtBQU87QUFBQSxJQUU3QixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixjQUFjLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFFaEMsVUFBVTtBQUFBLE1BQ1IsTUFBTSxDQUFFLFFBQVEsTUFBUTtBQUFBLE1BQ3hCLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxjQUFjO0FBQUEsSUFFZCxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxJQUNyQyxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxFQUN0QztBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLEVBQ0o7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLE9BQU8sTUFBTSxNQUFLLEdBQUk7QUFDcEMsVUFBTSxFQUFFLE1BQU8sSUFBRyxtQkFBb0I7QUFFdEMsVUFBTSxRQUFRLGNBQWU7QUFFN0IsVUFBTSxXQUFXLElBQUksSUFBSTtBQUN6QixVQUFNLE1BQU0sSUFBSSxLQUFLO0FBQ3JCLFVBQU0sV0FBVyxxQkFBcUIsS0FBSztBQUUzQyxVQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsUUFBUSxFQUFFLFVBQVUsTUFBTSxVQUFVLEtBQUssY0FBYyxpQkFBaUI7QUFFNUUsVUFBTSxlQUFlLG9CQUFvQixLQUFLO0FBRTlDLFVBQU0sYUFBYSxTQUFTLE1BQzFCLE9BQU8sTUFBTSxVQUFVLE1BQU0sTUFBTSxhQUM5QixZQUFZLE1BQU0sYUFBYSxNQUFNLEtBQUssTUFBTSxVQUFVLElBQUksQ0FBRSxNQUFNLFVBQVksSUFDbkYsQ0FBRSxDQUNQO0FBRUQsVUFBTSxXQUFXLFNBQVMsTUFBTSxtQkFBbUIsV0FBVyxLQUFLLENBQUM7QUFFcEUsVUFBTSxpQkFBaUI7QUFBQSxNQUFTLE1BQzlCLFdBQVcsTUFDUixJQUFJLFVBQVEsS0FBSyxJQUFJLEVBQ3JCLEtBQUssSUFBSTtBQUFBLElBQ2I7QUFFRCxVQUFNLFlBQVk7QUFBQSxNQUFTLE1BQ3pCO0FBQUEsUUFDRSxXQUFXLE1BQU0sT0FBTyxDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBRUQsVUFBTSxlQUFlLFNBQVMsT0FBTztBQUFBLE1BQ25DLFdBQVcsVUFBVTtBQUFBLE1BQ3JCLGFBQWEsV0FBVyxNQUFNO0FBQUEsTUFDOUIsVUFBVSxNQUFNO0FBQUEsSUFDdEIsRUFBTTtBQUVGLFVBQU0sYUFBYSxTQUFTLE9BQU87QUFBQSxNQUNqQyxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRLE1BQU07QUFBQSxNQUNkLFNBQVMsTUFBTTtBQUFBLE1BQ2YsTUFBTSxTQUFTO0FBQUEsTUFDZixHQUFHO0FBQUEsTUFDSCxJQUFJLE1BQU0sVUFBVTtBQUFBLE1BQ3BCLFVBQVUsTUFBTSxTQUFTLFVBQVU7QUFBQSxJQUN6QyxFQUFNO0FBRUYsVUFBTSxhQUFhO0FBQUEsTUFBUyxNQUMxQixpQ0FDRyxJQUFJLFVBQVUsT0FBTyxpQkFBaUI7QUFBQSxJQUMxQztBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsTUFBTSxhQUFhLFFBQVEsTUFBTSxXQUFXO0FBQUEsSUFDN0M7QUFFRCxhQUFTLGNBQWUsT0FBTztBQUM3QixZQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU87QUFDdEMsWUFBTSxPQUFPLE9BQU8sQ0FBQztBQUNyQixnQkFBVSxLQUFLO0FBQUEsSUFDaEI7QUFFRCxhQUFTLFdBQVksTUFBTTtBQUN6QixZQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsSUFBSTtBQUMzQyxVQUFJLFVBQVUsSUFBSTtBQUNoQixzQkFBYyxLQUFLO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBRUQsYUFBUyxVQUFXLE9BQU87QUFDekIsV0FBSyxxQkFBcUIsTUFBTSxhQUFhLE9BQU8sUUFBUSxNQUFPLEVBQUc7QUFBQSxJQUN2RTtBQUVELGFBQVMsVUFBVyxHQUFHO0FBRXJCLFFBQUUsWUFBWSxNQUFNLFFBQVEsQ0FBQztBQUFBLElBQzlCO0FBRUQsYUFBUyxRQUFTLEdBQUc7QUFFbkIsVUFBSSxFQUFFLFlBQVksTUFBTSxFQUFFLFlBQVksSUFBSTtBQUN4QyxrQkFBVSxDQUFDO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFFRCxhQUFTLGVBQWdCO0FBQ3ZCLGFBQU8sU0FBUztBQUFBLElBQ2pCO0FBRUQsYUFBUyxnQkFBaUIsR0FBRyxVQUFVO0FBQ3JDLFlBQU0sUUFBUSxhQUFhLEdBQUcsVUFBVSxXQUFXLE9BQU8sWUFBWSxLQUFLO0FBQzNFLFlBQU0sWUFBWSxhQUFjO0FBRWhDLFVBQUksY0FBYyxVQUFVLGNBQWMsTUFBTTtBQUM5QyxrQkFBVSxRQUFRO0FBQUEsTUFDbkI7QUFHRCxVQUFJLFVBQVU7QUFBUTtBQUl0QixVQUNFLE1BQU0sYUFBYSxPQUNmLE1BQU0sY0FBYyxNQUFNLE1BQU0sT0FBSyxXQUFXLE1BQU0sU0FBUyxDQUFDLENBQUMsSUFDakUsTUFBTSxlQUFlLE1BQU8sSUFDaEM7QUFDQTtBQUFBLE1BQ0Q7QUFFRDtBQUFBLFFBQ0UsWUFBWSxVQUFVLE9BQ2xCLFdBQVcsTUFBTSxPQUFPLEtBQUssSUFDN0I7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUVELGFBQVMsWUFBYTtBQUNwQixhQUFPO0FBQUEsUUFDTCxFQUFFLFNBQVM7QUFBQSxVQUNULE9BQU8sQ0FBRSxNQUFNLFlBQVksZ0JBQWtCO0FBQUEsVUFDN0MsT0FBTyxNQUFNO0FBQUEsUUFDdkIsQ0FBUztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUQsYUFBUyxlQUFnQjtBQUN2QixVQUFJLE1BQU0sU0FBUyxRQUFRO0FBQ3pCLGVBQU8sV0FBVyxNQUFNLFdBQVcsSUFDL0IsVUFBVyxJQUNYLFdBQVcsTUFBTTtBQUFBLFVBQ2pCLENBQUMsTUFBTSxVQUFVLE1BQU0sS0FBSyxFQUFFLE9BQU8sTUFBTSxLQUFLLE1BQU07QUFBQSxRQUN2RDtBQUFBLE1BQ0o7QUFFRCxVQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLGVBQU8sV0FBVyxNQUFNLFdBQVcsSUFDL0IsVUFBVyxJQUNYLE1BQU0sU0FBUyxFQUFFLE9BQU8sV0FBVyxPQUFPLEtBQUssTUFBTTtBQUFBLE1BQzFEO0FBRUQsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixlQUFPLFdBQVcsTUFBTSxXQUFXLElBQy9CLFVBQVcsSUFDWCxXQUFXLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTSxFQUFFLE9BQU87QUFBQSxVQUMzQyxLQUFLLFVBQVU7QUFBQSxVQUNmLFdBQVcsTUFBTSxTQUFTO0FBQUEsVUFDMUIsT0FBTztBQUFBLFVBQ1AsV0FBVyxNQUFNO0FBQUEsVUFDakIsVUFBVSxNQUFNO0FBQUEsVUFDaEIsVUFBVSxNQUFNO0FBQUUsMEJBQWMsQ0FBQztBQUFBLFVBQUc7QUFBQSxRQUNoRCxHQUFhLE1BQU0sRUFBRSxRQUFRO0FBQUEsVUFDakIsT0FBTztBQUFBLFVBQ1AsYUFBYSxLQUFLO0FBQUEsUUFDbkIsQ0FBQSxDQUFDLENBQUM7QUFBQSxNQUNOO0FBRUQsWUFBTSxjQUFjLE1BQU0saUJBQWlCLFNBQ3ZDLE1BQU0sZUFDTixlQUFlO0FBRW5CLGFBQU8sWUFBWSxXQUFXLElBQzFCO0FBQUEsUUFDRSxFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU8sTUFBTTtBQUFBLFVBQ2IsT0FBTyxNQUFNO0FBQUEsVUFDYjtBQUFBLFFBQ2QsQ0FBYTtBQUFBLE1BQ0YsSUFDRCxVQUFXO0FBQUEsSUFDaEI7QUFFRCxhQUFTLFdBQVk7QUFDbkIsWUFBTSxPQUFPO0FBQUEsUUFDWCxLQUFLO0FBQUEsUUFDTCxHQUFHLFdBQVc7QUFBQSxRQUNkLEdBQUcsYUFBYTtBQUFBLFFBQ2hCLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBRUQsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixhQUFLLFdBQVc7QUFBQSxNQUNqQjtBQUVELGFBQU8sRUFBRSxTQUFTLElBQUk7QUFBQSxJQUN2QjtBQUVELFdBQU8sT0FBTyxPQUFPO0FBQUEsTUFDbkI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFFQSxlQUFlO0FBQUEsUUFBUyxNQUN0QixTQUFTLFVBQVUsUUFDaEIsbUJBQW1CLE1BQU0sWUFBWTtBQUFBLE1BQ3pDO0FBQUEsTUFFRCxpQkFBaUIsU0FBUyxNQUFNO0FBQzlCLFlBQUksTUFBTSxpQkFBaUIsUUFBUTtBQUNqQyxpQkFBTyxNQUFNLGFBQWEsYUFBYSxLQUFLO0FBQUEsUUFDN0M7QUFFRCxjQUFNLE1BQU0sTUFBTTtBQUNsQixlQUFPLEdBQUksV0FBVyxNQUFNLFNBQVcsUUFBUSxTQUFTLFFBQVEsTUFBTSxPQUFTLFVBQVU7QUFBQSxNQUNqRyxDQUFPO0FBQUEsTUFFRCxpQkFBaUIsTUFBTSxXQUFXLE1BQU07QUFBQSxNQUN4QyxZQUFZLE1BQU07QUFDaEIsY0FBTSxPQUFPO0FBQUEsVUFDWCxLQUFLLE1BQU07QUFBQSxVQUNYLE9BQU87QUFBQSxVQUNQLFVBQVUsTUFBTTtBQUFBLFFBQ2pCO0FBRUQsWUFBSSxNQUFNLFNBQVMsVUFBVSxNQUFNO0FBQ2pDLGlCQUFPLE9BQU8sTUFBTSxFQUFFLFlBQVksYUFBYSxXQUFXLFNBQVM7QUFBQSxRQUNwRTtBQUVELGVBQU8sRUFBRSxPQUFPLE1BQU0sQ0FBRSxTQUFRLEdBQUssT0FBTyxhQUFZLENBQUUsQ0FBQztBQUFBLE1BQzVEO0FBQUEsSUFDUCxDQUFLO0FBR0QsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGtCQUFrQixNQUFNLFNBQVM7QUFBQSxJQUN2QyxDQUFLO0FBRUQsZUFBVyxPQUFPLFlBQVksTUFBTSxTQUFTLEtBQUs7QUFFbEQsV0FBTyxTQUFTLEtBQUs7QUFBQSxFQUN0QjtBQUNILENBQUM7OyJ9
