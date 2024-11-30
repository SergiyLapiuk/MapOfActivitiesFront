import { 
  getUsers, 
  banUser, 
  unBanUser, 
  deleteUser, 
  getAllUsersComplaints, 
  getAllEventsComplaints, 
  reportEvent, 
  reportUser,
  putStatusComplaint,
  getAllWebLogs
} 
from "src/api/apiServices";

export default {
  state: {
    users: [],
    usersStatus: "",
    usersComplaints: [],
    eventsComplaints: [],
    webLogs: [],
  },
  mutations: {
    getUsersSuccess: (state, res) => {
      state.usersStatus = "success";
      state.users = res;
    },
    getUsersError: (state) => {
      state.usersStatus = "error";
    },
    banUserSuccess: (state) => {
      state.usersStatus = "success";
    },
    banUserError: (state) => {
      state.usersStatus = "error";
    },
    unBanUserSuccess: (state) => {
      state.usersStatus = "success";
    },
    unBanUserError: (state) => {
      state.usersStatus = "error";
    },
    deleteUserSuccess: (state) => {
      state.usersStatus = "success";
    },
    deleteUserError: (state) => {
      state.usersStatus = "error";
    },
    getUsersRequest: (state) => {
      state.usersStatus = "loading";
    },

    getAllUsersComplaintsSuccess: (state, res) => {
      state.usersComplaints = res;
    },

    getAllEventsComplaintsSuccess: (state, res) => {
      state.eventsComplaints = res;
    },

    getAllWebLogsSuccess: (state, res) => {
      state.webLogs = res;
    },

  },
  actions: {
    async GET_USERS({ dispatch, commit }, payload) {
      commit("getUsersRequest");
      await getUsers(payload)
        .then((res) => {
          commit("getUsersSuccess", res.data);
        })
        .catch((e) => {
          commit("getUsersError");
        });
    },

    async BAN_USER({ dispatch, commit }, payload) {
      await banUser(payload.userId, payload.adminEmail)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },

    async UNBAN_USER({ dispatch, commit }, payload) {
      await unBanUser(payload.userId, payload.adminEmail)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },

    async DELETE_USER({ dispatch, commit }, payload) {
      await deleteUser(payload.userId, payload.adminEmail)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },

    async GET_ALL_USERS_COMPLAINTS({ dispatch, commit }, payload) {
      await getAllUsersComplaints(payload)
        .then((res) => {
          commit("getAllUsersComplaintsSuccess", res.data);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },    

    async GET_ALL_EVENTS_COMPLAINTS({ dispatch, commit }, payload) {
      await getAllEventsComplaints(payload)
        .then((res) => {
          commit("getAllEventsComplaintsSuccess", res.data);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },  

    async REPORT_EVENT({ dispatch, commit }, payload) {
      console.log(payload.formData);
      await reportEvent(payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },  


    async REPORT_USER({ dispatch, commit }, payload) {
      console.log(payload.userId);
      console.log(payload.formData);
      console.log(payload.authorId);
      await reportUser(payload.userId, payload.authorId, payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },  

    async PUT_STATUS_COMPLAINT({ dispatch, commit }, payload) {
      console.log(payload.formData);
      await putStatusComplaint(payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },

    async GET_ALL_WEB_LOGS({ dispatch, commit }, payload) {
      await getAllWebLogs(payload)
        .then((res) => {
          commit("getAllWebLogsSuccess", res.data);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
  },

  getters: {
    getUsers: (state) => state.users || [],
    getUsersStatus: (state) => state.usersStatus || [],
    getAllUsersComplaints: (state) => state.usersComplaints || [],
    getAllEventsComplaints: (state) => state.eventsComplaints || [],
    getAllWebLogs: (state) => state.webLogs || [],
  },
};
