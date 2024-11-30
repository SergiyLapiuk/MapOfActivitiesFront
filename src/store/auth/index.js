import {
  postUserLogin,
  postRefreshToken,
  postRegister,
  confirmEmail,
  getUserId,
} from "src/api/apiServices";
import { jwtDecode } from "jwt-decode";

export default {
  state: {
    userId: localStorage.getItem("id") ?? null,
    role: localStorage.getItem("role") ?? null,
    token: localStorage.getItem("token") ?? null,
    refreshToken: localStorage.getItem("refreshToken") ?? null,
    confirmStatus: "",
    status: "",
  },

  mutations: {
    setCredentials(state, { token, refreshToken, data }) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      state.userId = data.id;
      state.role = decoded["roles"];
      state.token = token;
      state.refreshToken = refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("id", state.userId);
      localStorage.setItem("role", state.role);
      state.status = "active";
    },

    updateTokens(state, { token, refreshToken }) {
      state.token = token;
      state.refreshToken = refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },

    updateUserId(state, { userId, role }) {
      state.userId = userId;
      state.role = role;
      state.status = "active";
    },

    logOut(state) {
      state.userId = null;
      state.token = null;
      state.refreshToken = null;
      state.confirmStatus = "";
      state.role = null;
      state.status = "";

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
    },
    getConfirmRequest: (state) => {
      state.confirmStatus = "loading";
    },
    getConfirmSuccess: (state, res) => {
      state.confirmStatus = "success";
    },
    getConfirmError: (state) => {
      state.confirmStatus = "error";
    },
    getAuthorizationError: (state) => {
      state.status = "error";
    },
  },

  actions: {
    async POST_REGISTER({ dispatch, commit }, payload) {
      try {
        const res = await postRegister(payload.formData);
        payload.handler(res);
      } catch (e) {
        payload.handlerError(e);
      }
    },

    async POST_USER_LOGIN({ dispatch, commit }, payload) {
      try {
        const res = await postUserLogin(payload.formData);
        commit("setCredentials", {
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          data: {
            id: res.data.userId,
          },
        });
        payload.handler(res);
      } catch (e) {
        payload.handlerError(e);
      }
    },

    async POST_REFRESH_TOKEN({ dispatch, commit }, payload) {
      try {
        const res = await postRefreshToken(payload.formData);
        commit("updateTokens", {
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        payload.handler(res);
      } catch (e) {
        commit("getAuthorizationError");
        payload.handlerError(e);
      }
    },

    async POST_USERID({ dispatch, commit }, payload) {
      try {
        const res = await getUserId(payload.formData);
        commit("updateUserId", {
          userId: res.data.userId,
          role: res.data.roles,
        });
        payload.handler(res);
      } catch (e) {
        commit("getAuthorizationError");
        payload.handlerError(e);
      }
    },

    async GET_CONFIRM({ dispatch, commit }, payload) {
      commit("getConfirmRequest");
      await confirmEmail(payload.id, payload.code)
        .then((res) => {
          commit("getConfirmSuccess", res.data);
        })
        .catch((e) => {
          commit("getConfirmError");
        });
    },
  },
  getters: {
    getConfirmStatus: (state) => state.confirmStatus || "",
    getCurrentUser: (state) => state.userId,
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refreshToken,
    getStatus: (state) => state.status,
    getCurrentRole: (state) => state.role,
  },
};
