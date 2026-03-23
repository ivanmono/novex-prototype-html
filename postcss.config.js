const path = require('path');

module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-inline-svg')({
      paths: [path.resolve(__dirname, 'src/assets/icons')],
    }),
    ...(ctx.env === 'production' ? [require('cssnano')({ preset: 'default' })] : []),
  ],
});
