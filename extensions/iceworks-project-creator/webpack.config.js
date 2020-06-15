const path = require('path');

const tsConfigPath = path.join(__dirname, 'tsconfig.json');
const config = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
    '@iceworks/vscode-webview': 'commonjs @iceworks/vscode-webview'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: tsConfigPath,
            },
          }
        ]
      }
    ]
  }
};

module.exports = config;