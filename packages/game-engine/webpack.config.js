const path = require("path");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, 'build'),
}

// Custom plugin to display server info after compilation
class ServerInfoPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('ServerInfoPlugin', (stats) => {
      if (stats.hasErrors()) {
        return;
      }
      
      const { port } = compiler.options.devServer;
      console.log('\n');
      console.log('\x1b[32m%s\x1b[0m', '  ➜ Game Engine (DOT) ready!');
      console.log('\x1b[32m%s\x1b[0m', '  ➜ Served directory: ' + path.basename(__dirname));
      console.log('\n  \x1b[1m%s\x1b[0m', 'Local:');
      console.log('    \x1b[36m%s\x1b[0m', `http://localhost:${port}/`);
      console.log('\n  \x1b[1m%s\x1b[0m', 'Examples:');
      console.log('    \x1b[36m%s\x1b[0m', `http://localhost:${port}/examples/01-hello-world/`);
      console.log('\n');
    });
  }
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
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'DOT',
    umdNamedDefine: true,
    publicPath: '/build'
  },
  // Add resolve for `tsx` and `ts` files, otherwise Webpack would
  // only look for common JavaScript file extension (.js)
  resolve: {
    extensions: ['.ts', '.js']
  },
  // Activate source maps for the bundles in order to preserve the original
  // source when the user debugs the application
  devtool: 'source-map',
  plugins: [
    new ServerInfoPlugin()
  ],
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
    contentBase: path.join(__dirname),
    contentBasePublicPath: '/',
    watchContentBase: false,
    writeToDisk: true,
    quiet: false,
    stats: 'minimal',
    noInfo: false
  }
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {

    config.output.filename = '[name].js';
  }

  if (argv.mode === 'production') {
    config.output.filename = '[name].min.js';
    config.plugins.push(new TypedocWebpackPlugin({out: '../docs'}, './src'));
  }

  return config;
}