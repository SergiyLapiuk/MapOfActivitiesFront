import {
  getUsersGoToTheEvent,
  getIsJoiner,
  createVisiting,
  deleteVisiting,
} from "../../api/apiServices";
export default {
  state: {
    eventUsers: [],
    usersStatus: "",
    joined: false,
    joinedStatus: "",
  },
  mutations: {
    getUsersGoToTheEventRequest: (state) => {
      state.usersStatus = "loading";
    },
    getUsersGoToTheEventSuccess: (state, res) => {
      state.usersStatus = "success";
      state.eventUsers = res;
    },
    getUsersGoToTheEventError: (state) => {
      state.usersStatus = "error";
    },
    getIsJoinerRequest: (state) => {
      state.joinedStatus = "loading";
    },
    getIsJoinerSuccess: (state, res) => {
      state.joinedStatus = "success";
      state.joined = res.data;
    },
    getIsJoinerError: (state) => {
      state.joinedStatus = "error";
    },
  },
  actions: {
    async GET_USERS_GO_TO_THE_EVENT({ dispatch, commit }, payload) {
      commit("getUsersGoToTheEventRequest");
      await getUsersGoToTheEvent(payload.eventId)
        .then((res) => {
          commit("getUsersGoToTheEventSuccess", res.data);
        })
        .catch((e) => {
          commit("getUsersGoToTheEventError");
        });
    },
    async GET_IS_JOINER({ dispatch, commit }, payload) {
      commit("getIsJoinerRequest");
      await getIsJoiner(payload.id, payload.eventId)
        .then((res) => {
          commit("getIsJoinerSuccess", res);
        })
        .catch((e) => {
          commit("getIsJoinerError");
        });
    },
    async CREATE_VISITING({ dispatch, commit }, payload) {
      await createVisiting(payload.id, payload.eventId, payload.conId)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
    async DELETE_VISITING({ dispatch, commit }, payload) {
      await deleteVisiting(payload.id, payload.eventId)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
  },
  getters: {
    getVisitingUsersStatus: (state) => state.usersStatus || "",
    getEventUsers: (state) => state.eventUsers || [],
    getJoinedStatus: (state) => state.joinedStatus || "",
    getJoined: (state) => state.joined || false,
  },
};
