const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = [
  'index',
  'home-standby',
  'home-error',
  'login',
  'menu',
  'manage-users',
  'manage-users-edit',
  'manage-users-password',
  'manage-users-password-keyboard',
  'manage-users-password-keyboard-num',
  'playground',
  'playground-dropdown',
  'playground-date',
  'playground-role',
  'playground-inputs',
  'chart',
  'chart-2',
  'chart-3',
];

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/js/main.js',

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/bundle.js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(svg|png|jpg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]',
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/styles.css',
      }),

      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' },
        ],
      }),

      ...pages.map((page) =>
        new HtmlWebpackPlugin({
          template: `!!posthtml-loader!./src/html/${page}.html`,
          filename: `${page}.html`,
          scriptLoading: 'defer',
          inject: 'body',
        })
      ),
    ],

    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      port: 3000,
      open: true,
      hot: false,
    },

    devtool: isProd ? false : 'source-map',
  };
};
