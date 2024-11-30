export function user() {
  let res = localStorage.getItem("role") != null;
  return res;
}

export function guest() {
  return !user();
}

export function admin() {
  let res = localStorage.getItem("role") == "Admin";
  return res;
}

export function canEditEvent(id) {
  let userId = localStorage.getItem("id") != null;
  return id == userId || admin();
}
