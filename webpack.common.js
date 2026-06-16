const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const basePath = process.env.NODE_ENV === 'production' ? '/KARAMBOL/' : '/'

const makeTemplateParams = (compilation, assets, assetTags, options) => ({
  compilation,
  webpackConfig: compilation.options,
  htmlWebpackPlugin: { tags: assetTags, files: assets, options },
  basePath
})

// Динамически читаем статьи из папки articles
const articlesDir = path.join(__dirname, 'src/javascript/data/articles')
const articleFiles = fs.existsSync(articlesDir)
  ? fs.readdirSync(articlesDir).filter((file) => file.endsWith('.json'))
  : []

const articlePages = articleFiles.map((file) => {
  const id = file.replace('.json', '')
  const articleData = JSON.parse(
    fs.readFileSync(path.join(articlesDir, file), 'utf-8')
  )
  const title = articleData.blocks?.[0]?.title || 'Статья'

  return new HtmlWebpackPlugin({
    hash: true,
    scriptLoading: 'blocking',
    template: './src/article.html',
    filename: `./article/${id}.html`,
    chunks: ['index', 'mobileMenu', 'article', 'search'],
    articleId: id,
    title: title,
    templateParameters: makeTemplateParams
  })
})

module.exports = {
  entry: {
    index: './src/index.js',
    mobileMenu: './src/javascript/mobileMenu.js',
    swipeCards: './src/javascript/swipeCards.js',
    articles: './src/javascript/articlesApp.jsx',
    tests: './src/javascript/testsApp.jsx',
    testsPage: './src/javascript/testsPageApp.jsx',
    map: './src/javascript/mapApp.jsx',
    articlesPage: './src/javascript/articlesPageApp.jsx',
    article: './src/javascript/articleApp.jsx',
    search: './src/javascript/searchApp.jsx',
    searchPage: './src/javascript/searchPageApp.jsx',
    special: './src/javascript/specialDrag.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/KARAMBOL/'
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.html$/i,
        exclude: /article\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index', 'mobileMenu', 'swipeCards', 'articles', 'tests', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Internal pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/page.html',
      filename: './pages/page.html',
      chunks: ['mobileMenu'],
      templateParameters: makeTemplateParams
    }),

    // 404 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/404.html',
      filename: './404.html',
      chunks: ['index', 'mobileMenu', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Map page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/map.html',
      filename: './map.html',
      chunks: ['index', 'mobileMenu', 'map', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Articles page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/articles.html',
      filename: './articles.html',
      chunks: ['index', 'mobileMenu', 'articlesPage', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Tests page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/tests.html',
      filename: './tests.html',
      chunks: ['index', 'mobileMenu', 'testsPage', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Search results page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/search.html',
      filename: './search.html',
      chunks: ['index', 'mobileMenu', 'searchPage', 'search'],
      templateParameters: makeTemplateParams
    }),

    ...articlePages,

    // Special page — «Счастливые собакены»
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/special.html',
      filename: './special.html',
      chunks: ['index', 'mobileMenu', 'special', 'search'],
      templateParameters: makeTemplateParams
    }),

    // Styleguide
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/styleguide.html',
      filename: './styleguide.html',
      chunks: ['index', 'mobileMenu'],
      templateParameters: makeTemplateParams
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/navbar.html'),
        location: 'navbar',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        location: 'footer',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images',
          noErrorOnMissing: true
        },
        {
          from: 'src/fonts',
          to: 'fonts',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  }
}
