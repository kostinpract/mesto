// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов <%=require('./favicon.ico')%>
      // {
      //   // регулярное выражение, которое ищет все файлы с такими расширениями
      //   test: /\.(ico|png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      //   type: 'asset/resource'
      // },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            // добавьте объект options
            options: { importLoaders: 1 }
          },
          // Добавьте postcss-loader
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ],
  devtool: 'source-map'
}

