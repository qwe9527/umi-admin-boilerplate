import produce from 'immer';

export default {

  namespace: 'user',

  state: {
    isLogin: false
  },

  reducers: {
    change: produce((draft, {payload}) => {
      Object.keys(payload).forEach((value) => draft[value] = payload[value]);
      return draft;
    }),
    deepChange: produce((draft, {payload}) => {
      Object.keys(payload.data).forEach((value) => draft[payload.attr][value] = payload.data[value]);
      return draft;
    }),
  },

  effects: {

  },

  subscriptions: {

  }

};
