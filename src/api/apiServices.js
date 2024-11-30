import axios from "axios";
import store from "src/store/index";

const API_URL = import.meta.env.VITE_API_URL;

const timeOutMilliseconds = 600 * 1000;
const config = {
  baseURL: API_URL,
  timeout: timeOutMilliseconds, // Timeout
};
const Axios = axios.create(config);

function getParams(obj) {
  let params = new URLSearchParams(obj);
  let keysForDel = [];
  params.forEach((value, key) => {
    if (
      value == "null" ||
      value == "undefined" ||
      value == "" ||
      value == null
    ) {
      keysForDel.push(key);
    }
  });

  keysForDel.forEach((key) => {
    params.delete(key);
  });
  return params;
}

export function getEvents(filters) {
  let params = "";
  if (filters.types != null) {
    console.log("getEvents "+filters)
    let types = [...filters.types];
    delete filters.types;
    params = getParams(filters).toString();
    for (const type of types) {
      params += "&types=" + type;
    }
  } else {
    params = getParams(filters).toString();
  }
  const url = `${API_URL}/events/filter?${params}`;
  return Axios.get(url);
}

export function getEvent(id) {
  const url = `${API_URL}/events/` + id;
  return Axios.get(url);
}

export function postEvent(data) {
  const url = `${API_URL}/events`;
  return Axios.post(url, data);
}

export function getEventTypes(data) {
  const url = `${API_URL}/types`;
  return Axios.get(url, { params: data });
}
export function getEventTypesTree(data) {
  const url = `${API_URL}/types/GetAllTypesAsTree`;
  return Axios.get(url, { params: data });
}

export function deleteEvent(id) {
  const url = `${API_URL}/events/${id}`;
  return Axios.delete(url);
}

export function putEvent(id, data) {
  const url = `${API_URL}/events/${id}`;
  return Axios.put(url, data);
}

export function postUserLogin(data) {
  const url = `${API_URL}/account/userlogin`;
  return Axios.post(url, data);
}

export function postRegister(data) {
  const url = `${API_URL}/account/register`;
  return Axios.post(url, data);
}

export function postRefreshToken(data) {
  const url = `${API_URL}/tokens/refresh-token`;
  return Axios.post(url, data);
}

export function confirmEmail(id, code) {
  const url = `${API_URL}/account/confirm-email`;
  return Axios.get(url, { params: { userId: id, code: code } });
}

export function forgotPassword(data) {
  const url = `${API_URL}/account/forgot-password`;
  return Axios.post(url, data);
}

export function resetPassword(data) {
  const url = `${API_URL}/account/reset-password`;
  return Axios.post(url, data);
}

export function getUserProfile(id) {
  const url = `${API_URL}/users/profiles/` + id;
  return Axios.get(url);
}

export function putProfile(id, data) {
  const url = `${API_URL}/users/profiles/` + id;
  return Axios.put(url, data);
}

export function getUsersGoToTheEvent(eventId) {
  const url = `${API_URL}/visitings/users-go-to-the-event`;
  return Axios.get(url, { params: { eventId: eventId } });
}

export function getIsJoiner(id, eventId) {
  const url = `${API_URL}/visitings/is-joiner`;
  return Axios.get(url, { params: { userId: id, eventId: eventId } });
}

export function createVisiting(id, eventId, conId) {
  const url = `${API_URL}/visitings/add-visiting`;
  return Axios.post(url, null, { params: { userId: id, eventId: eventId } });
}

export function deleteVisiting(id, eventId) {
  const url = `${API_URL}/visitings/delete-visiting`;
  return Axios.post(url, null, { params: { userId: id, eventId: eventId } });
}

export function getUsers(data) {
  const url = `${API_URL}/users/with-roles`;
  return Axios.get(url, data);
}

export function banUser(userId, adminEmail) {
  console.log(adminEmail);
  const url = `${API_URL}/users/ban/${userId}/${adminEmail}`;
  return Axios.post(url);
}

export function unBanUser(userId, adminEmail) {
  console.log(adminEmail);
  const url = `${API_URL}/users/unban/${userId}/${adminEmail}`;
  return Axios.post(url);
}

export function deleteUser(userId, adminEmail) {
  console.log(adminEmail);
  const url = `${API_URL}/users/${userId}/${adminEmail}`;
  return Axios.delete(url);
}

export function getUserId(data) {
  const url = `${API_URL}/account/userid-from-token`;
  return Axios.post(url, data);
}

export function getUserEvents(userId) {
  const url = `${API_URL}/events/user-events/` + userId;
  return Axios.get(url, userId);
}

export function getAuthorEvents(userId) {
  const url = `${API_URL}/events/author-events/` + userId;
  return Axios.get(url, userId);
}

export function getAllUsersComplaints(data) {
  const url = `${API_URL}/complaints/all-users-complaints`;
  return Axios.get(url, data);
}

export function getAllEventsComplaints(data) {
  const url = `${API_URL}/complaints/all-events-complaints`;
  return Axios.get(url, data);
}

export function reportEvent(data) {
  console.log(data);
  const url = `${API_URL}/complaints/event-complaint`;
  return Axios.post(url, data);
}

export function reportUser(userId, authorId, data) {
  console.log(data);
  const url = `${API_URL}/complaints/user-complaint/${userId}/${authorId}`;
  return Axios.post(url, data);
}

export function putStatusComplaint(data) {
  console.log(data);
  const url = `${API_URL}/complaints/status-complaint`;
  return Axios.put(url, data);
}

export function getAllWebLogs(data) {
  const url = `${API_URL}/weblog/all-web-logs`;
  return Axios.get(url, data);
}

Axios.interceptors.request.use(
  (config) => {
    let token;
    try {
      token = store.getters["auth/getToken"];
    } catch (e) {}
    if (token == null) {
      token = localStorage.getItem("token") ?? null;
    }

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios.interceptors.response.use(
//   (res) => {
//     console.log("aaa");
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     console.log("TOKEN: " + store.getters.getToken());
//     const accessToken =
//       store.getters.getToken() || localStorage.getItem("token");
//     const refreshToken =
//       store.getters.getToken() || localStorage.getItem("refreshToken");

//     //if (originalConfig.url !== "/auth/signin" && err.response) {
//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           await store.dispatch("POST_REFRESH_TOKEN", {
//             formData: {
//               accessToken,
//               refreshToken,
//             },
//             handler: (res) => {
//               store.commit("updateTokens", {
//                 token: res.data.accessToken,
//                 refreshToken: res.data.refreshToken,
//               });
//             },
//             handlerError: (errors) => {
//               console.log("Error: " + errors.response);
//             },
//           });

//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           сonsole.log(_error);
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

//export default Axios;
export default Axios;
