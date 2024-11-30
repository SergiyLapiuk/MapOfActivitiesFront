import { getUserProfile, putProfile } from "../../api/apiServices";

export default {
  state: {
    id: null,
    profile: {},
    profileStatus: "",
  },
  mutations: {
    getProfileRequest: (state) => {
      state.profileStatus = "loading";
    },
    getProfileSuccess: (state, res) => {
      state.profileStatus = "success";
      state.profile = res;
      state.id = res.id;
    },
    getProfileError: (state) => {
      state.profileStatus = "error";
    },
    clearProfile: (state) => {
      state.profile = {};
      state.profileStatus = "";
    },
  },
  actions: {
    async GET_PROFILE({ dispatch, commit }, payload) {
      commit("getProfileRequest");
      await getUserProfile(payload.id)
        .then((res) => {
          commit("getProfileSuccess", res.data);
          console.log("getProfileSuccess" + res.data.id);
        })
        .catch((e) => {
          commit("getProfileError");
        });
    },

    async PUT_PROFILE({ dispatch, commit }, payload) {
      console.log(payload.id, payload.formData)
      await putProfile(payload.id, payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
  },

  getters: {
    getProfileStatus: (state) => state.profileStatus || "",
    getProfile: (state) => state.profile || "",
  },
};
