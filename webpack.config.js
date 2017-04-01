const { getVersion } = require("./build/server/versioning")
const webpack = require("webpack")

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
    plugins: [
        new webpack.DefinePlugin({
            "process.env.ASSETS_VERSION": JSON.stringify(getVersion())
        })
    ]
}