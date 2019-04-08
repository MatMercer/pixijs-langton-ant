const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
    entry: [
        path.join(__dirname, '/src/ant-closure-exports.js')
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'langton-ant.min.js'
    },
    plugins: [
        new ClosureCompilerPlugin({
          compiler: {
            jar: path.join(__dirname, '/closure-compiler-v20190325.jar'),
            language_in: 'ECMASCRIPT6',
            language_out: 'ECMASCRIPT5',
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          },
          concurrency: 4,
        })
    ]
};
