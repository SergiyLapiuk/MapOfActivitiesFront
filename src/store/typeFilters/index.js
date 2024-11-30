export default {
  state: {
    selectedTypes: {},
    selectedLeafTypes: {},
  },
  mutations: {
    switchType(state, { type, bool }) {
      function switchType(type, bool) {
//        console.log(type.id, bool)
        if (bool == true) {
          state.selectedTypes[type.id] = true;
        } else if (bool == false) {
          state.selectedTypes[type.id] = false;
        }
        for (const c of type.children) {
          switchType(c, bool);
        }
        if (type.children.length == 0) {
          if (bool == true) {
            state.selectedLeafTypes[type.id] = true;
          } else {
            state.selectedLeafTypes[type.id] = false;
          }
        }
      }
      switchType(type, bool);
    },
    getFilters(state) {
      let obj = JSON.parse(localStorage.getItem("typesFilters"));
      console.log("getFilters: "+obj.selectedTypes)
      if (obj.selectedLeafTypes) {
        state.selectedLeafTypes = obj.selectedLeafTypes;
        state.selectedTypes = obj.selectedTypes;
      }
    },
    saveFilters(state) {
      console.log("saveFilters: "+state.selectedTypes)
      let obj = {};
      obj.selectedTypes = state.selectedTypes;
      obj.selectedLeafTypes = state.selectedTypes;
      localStorage.setItem("typesFilters", JSON.stringify(obj));
    },
  },
  actions: {
    async SELECT_TYPE({ dispatch, commit }, payload) {
      commit("switchType", { type: payload.type, bool: true });
      console.log("switchType " + this.state)
    },
    async DESELECT_TYPE({ dispatch, commit }, payload) {
      commit("switchType", { type: payload.type, bool: false });
    },
    async GET_TYPE_FILTERS(
      { dispatch, commit, getters, rootGetters },
      payload
    ) {
      if (localStorage.getItem("typesFilters")) {
        commit("getFilters");
      } else {
        let types = getters.getEventTypesTree;
        if (types.length == 0) {
          await dispatch("GET_EVENT_TYPES_TREE");
        }
        types = getters.getEventTypesTree;
        let type = { id: 0, children: [...types] };
        commit("switchType", { type: type, bool: true });
      }
    },
    async SAVE_TYPE_FILTERS({ dispatch, commit }, payload) {
      commit("saveFilters");
    },
  },
  getters: {
    getSelectedTypes: (state) => state.selectedTypes,
    isTypeSelected: (state) => (id) => state.selectedTypes[id] == true,
    getSelectedLeafTypes: function (state) {
      let res = [];
      for (const [key, value] of Object.entries(state.selectedLeafTypes)) {
        if (value == true) {
          res.push(key);
        }
      }
      return res;
    },
  },
};
