import {
  forgotPassword,
  resetPassword,
} from "../../api/apiServices";

export default {
  actions: {
    async FORGOT_PASSWORD({ dispatch, commit }, payload) {
      await forgotPassword(payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
    async RESET_PASSWORD({ dispatch, commit }, payload) {
      await resetPassword(payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
  },
};
