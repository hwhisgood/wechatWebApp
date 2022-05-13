
// postcss.config.js
module.exports = {
  "autoprefixer": {
    overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
  },
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,  //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'],
      minPixelValue: 1, //px小于12的不会被转换
      unitPrecision: 5, //保留rem小数点多少位
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
    },
  },
};