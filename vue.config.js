module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/stylesheets/index.scss";`,
      },
    },
  },
};
