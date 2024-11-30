const units = ["B", "KB", "MB", "GB", "TB", "PB"];
function humanStorageSize(bytes) {
  let u = 0;
  while (parseInt(bytes, 10) >= 1024 && u < units.length - 1) {
    bytes /= 1024;
    ++u;
  }
  return `${bytes.toFixed(1)}${units[u]}`;
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min;
  }
  const size = max - min + 1;
  let index = min + (v - min) % size;
  if (index < min) {
    index = size + index;
  }
  return index === 0 ? 0 : index;
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
export { between as b, humanStorageSize as h, normalizeToInterval as n, pad as p };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LjNlMzJiOGQ5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9mb3JtYXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdW5pdHMgPSBbICdCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiBodW1hblN0b3JhZ2VTaXplIChieXRlcykge1xuICBsZXQgdSA9IDBcblxuICB3aGlsZSAocGFyc2VJbnQoYnl0ZXMsIDEwKSA+PSAxMDI0ICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKSB7XG4gICAgYnl0ZXMgLz0gMTAyNFxuICAgICsrdVxuICB9XG5cbiAgcmV0dXJuIGAkeyBieXRlcy50b0ZpeGVkKDEpIH0keyB1bml0c1sgdSBdIH1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmV0d2VlbiAodiwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIG1heCA8PSBtaW5cbiAgICA/IG1pblxuICAgIDogTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHYpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVG9JbnRlcnZhbCAodiwgbWluLCBtYXgpIHtcbiAgaWYgKG1heCA8PSBtaW4pIHtcbiAgICByZXR1cm4gbWluXG4gIH1cblxuICBjb25zdCBzaXplID0gKG1heCAtIG1pbiArIDEpXG5cbiAgbGV0IGluZGV4ID0gbWluICsgKHYgLSBtaW4pICUgc2l6ZVxuICBpZiAoaW5kZXggPCBtaW4pIHtcbiAgICBpbmRleCA9IHNpemUgKyBpbmRleFxuICB9XG5cbiAgcmV0dXJuIGluZGV4ID09PSAwID8gMCA6IGluZGV4IC8vIGZpeCBmb3IgKC1hICUgYSkgPT4gLTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAodiwgbGVuZ3RoID0gMiwgY2hhciA9ICcwJykge1xuICBpZiAodiA9PT0gdm9pZCAwIHx8IHYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgY29uc3QgdmFsID0gJycgKyB2XG4gIHJldHVybiB2YWwubGVuZ3RoID49IGxlbmd0aFxuICAgID8gdmFsXG4gICAgOiBuZXcgQXJyYXkobGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oY2hhcikgKyB2YWxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBodW1hblN0b3JhZ2VTaXplLFxuICBjYXBpdGFsaXplLFxuICBiZXR3ZWVuLFxuICBub3JtYWxpemVUb0ludGVydmFsLFxuICBwYWRcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsQ0FBRSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sSUFBTTtBQUU1QyxTQUFTLGlCQUFrQixPQUFPO0FBQ3ZDLE1BQUksSUFBSTtBQUVSLFNBQU8sU0FBUyxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksTUFBTSxTQUFTLEdBQUc7QUFDMUQsYUFBUztBQUNULE1BQUU7QUFBQSxFQUNIO0FBRUQsU0FBTyxHQUFJLE1BQU0sUUFBUSxDQUFDLElBQU0sTUFBTztBQUN6QztBQU1PLFNBQVMsUUFBUyxHQUFHLEtBQUssS0FBSztBQUNwQyxTQUFPLE9BQU8sTUFDVixNQUNBLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQztBQUNwQztBQUVPLFNBQVMsb0JBQXFCLEdBQUcsS0FBSyxLQUFLO0FBQ2hELE1BQUksT0FBTyxLQUFLO0FBQ2QsV0FBTztBQUFBLEVBQ1I7QUFFRCxRQUFNLE9BQVEsTUFBTSxNQUFNO0FBRTFCLE1BQUksUUFBUSxPQUFPLElBQUksT0FBTztBQUM5QixNQUFJLFFBQVEsS0FBSztBQUNmLFlBQVEsT0FBTztBQUFBLEVBQ2hCO0FBRUQsU0FBTyxVQUFVLElBQUksSUFBSTtBQUMzQjtBQUVPLFNBQVMsSUFBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLEtBQUs7QUFDOUMsTUFBSSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQzlCLFdBQU87QUFBQSxFQUNSO0FBRUQsUUFBTSxNQUFNLEtBQUs7QUFDakIsU0FBTyxJQUFJLFVBQVUsU0FDakIsTUFDQSxJQUFJLE1BQU0sU0FBUyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJO0FBQ3REOzsifQ==
