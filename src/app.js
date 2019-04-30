import createLoading from 'dva-loading';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.msg);
    },
  },
  plugins: [
    createLoading()
  ]
};
