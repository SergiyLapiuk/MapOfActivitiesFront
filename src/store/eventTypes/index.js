import { getEventTypes, getEventTypesTree } from "../../api/apiServices";

export default {
  state: {
    eventTypes: [],
    eventTypesStatus: "",
  },
  mutations: {
    getEventTypesRequest: (state) => {
      state.eventTypesStatus = "loading";
    },
    getEventTypesSuccess: (state, res) => {
      state.eventTypesStatus = "success";
      state.eventTypes = res;
    },
    getEventTypesError: (state, error) => {
      state.eventTypesStatus = "error" + error;
    },
    clearEventTypes: (state) => {
      state.eventTypes = [];
      state.eventTypesWithoutAll = [];
      state.eventTypesStatus = "";
    },
  },
  actions: {
    async GET_EVENT_TYPES_TREE({ dispatch, commit }, payload) {
      commit("getEventTypesRequest");
      await getEventTypesTree()
        .then((res) => {
          commit("getEventTypesSuccess", res.data);
        })
        .catch((e) => {
          commit("getEventTypesError", e);
        });
    },
  },
  getters: {
    getEventTypesStatus: (state) => state.eventTypesStatus || [],
    getEventTypesTree: (state) => state.eventTypes || [],

    getLeafTypes: (state) => {
      let tree = state.eventTypes;
      let res = [];

      function addKids(res, t) {
        if (t.children == null || t.children.length == 0) {
          res.push(t);
          return;
        } else {
          for (const tc of t.children) {
            addKids(res, tc);
          }
        }
      }

      for (const t of tree) {
        addKids(res, t);
      }
      return res;
    },
  },
};
