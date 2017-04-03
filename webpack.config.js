const webpack = require("webpack")
const webpackFailPlugin = require("webpack-fail-plugin") 
const { getVersion } = require("./build/server/versioning")

let plugins = [
    webpackFailPlugin,
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.APP_VERSION": JSON.stringify(getVersion())
    })
] 

if (process.env.NODE_ENV === "production") {
    plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    )
}

module.exports = {
    entry: "./src/client/client.js",
    output: {
        filename: "public/js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015", "stage-2", "stage-3"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js"]
    },
    plugins
}