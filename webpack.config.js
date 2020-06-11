const path = require("path");

const PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, 'dist'),
}

const config = {
  // These are the entry point of our library. We tell webpack to use
  // the name we assign later, when creating the bundle. We also use
  // the name to filter the second entry point for applying code
  // minification via UglifyJS
  entry: {
    'dot': [PATHS.entryPoint]
  },
  // The output defines how and where we want the bundles. The special
  // value `[name]` in `filename` tell Webpack to use the name we defined above.
  // We target a UMD and name it MyLib. When including the bundle in the browser
  // it will be accessible at `window.MyLib`
  output: {
    path: PATHS.bundles,
    libraryTarget: 'umd',
    library: 'DOT',
    umdNamedDefine: true,
    publicPath: '/dist'
  },
  // Add resolve for `tsx` and `ts` files, otherwise Webpack would
  // only look for common JavaScript file extension (.js)
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  // Activate source maps for the bundles in order to preserve the original
  // source when the user debugs the application
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 4200,
    contentBase: path.join(__dirname, 'examples'),
    contentBasePublicPath: '/examples',
    watchContentBase: true,
    writeToDisk: true
  }
}



module.exports = (env, argv) => {

  if (argv.mode === 'development') {

    config.output.filename = '[name].js';
  }

  if (argv.mode === 'production') {
    config.output.filename = '[name].min.js';

  }

  return config;
}